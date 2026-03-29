'use client';

// 메뉴 결과 클라이언트 컴포넌트
// URL 파라미터: menu(메뉴 ID), mode(condition|category|random), tag(컨디션/카테고리 ID)
// 구조: 룰렛 로딩(2.5초) → 결과 화면(메뉴명 + 영양정보 + 카카오맵 + 공유/재시도)

import { useState, useEffect, useCallback } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import {
  Share2, RotateCcw, Link2, Check,
  Flame, Wheat, Dumbbell, Droplets,
} from 'lucide-react';
import { getMenuById, ROULETTE_ITEMS, MenuItem } from '@/lib/menu-utils';
import KakaoMapSection from './KakaoMapSection';

// ── 칼로리 전체 너비 카드 ──
// 칼로리는 영양소 중 가장 중요 지표 — 독립 카드로 강조 표시
function CaloriesCard({ calories }: { calories: number }) {
  // 1일 권장 칼로리 2000kcal 기준 비율 계산
  const percent = Math.min(100, Math.round((calories / 2000) * 100));

  return (
    <div className="bg-white rounded-2xl px-5 py-4 border border-orange-100 shadow-sm mb-3">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-xl bg-orange-50 flex items-center justify-center flex-shrink-0">
            <Flame size={16} className="text-orange-500" strokeWidth={2} />
          </div>
          <span className="text-sm font-bold text-muted">칼로리</span>
        </div>
        <span className="text-[11px] text-gray-400 bg-orange-50 px-2 py-0.5 rounded-full">
          1일 권장량의 {percent}%
        </span>
      </div>
      {/* 칼로리 수치 — 크게 표시 */}
      <div className="flex items-end gap-1.5 mb-3">
        <span className="text-4xl font-extrabold text-ink leading-none">
          {calories.toLocaleString()}
        </span>
        <span className="text-base font-medium text-muted mb-0.5">kcal</span>
      </div>
      {/* CSS 바 차트 */}
      <div className="h-2 bg-orange-50 rounded-full overflow-hidden">
        <div
          className="h-full bg-orange-400 rounded-full transition-all duration-700"
          style={{ width: `${percent}%` }}
        />
      </div>
    </div>
  );
}

// ── 영양소 카드 (2×2 그리드용) ——————————————————————
// 탄수화물·단백질·지방·나트륨 공통 카드
// isHigh: 나트륨 권장량 초과 시 빨간 경고 스타일 적용
function NutrientCard({
  icon: Icon,
  label,
  value,
  unit,
  max,
  color,
  bgColor,
  isHigh,
}: {
  icon: React.ElementType;
  label: string;
  value: number;
  unit: string;
  max: number;
  color: string;
  bgColor: string;
  isHigh?: boolean;
}) {
  // 권장량 대비 비율 계산
  const percent = Math.min(100, Math.round((value / max) * 100));
  // 경고 상태일 때 색상 오버라이드
  const activeColor = isHigh ? 'text-red-400' : color;
  const activeBg = isHigh ? 'bg-red-50' : bgColor;
  const barColor = isHigh ? 'bg-red-400' : color.replace('text-', 'bg-');

  return (
    <div
      className={`rounded-2xl px-3 py-3 border shadow-sm ${
        isHigh ? 'bg-red-50 border-red-100' : 'bg-white border-indigo-50'
      }`}
    >
      {/* 아이콘 + 레이블 행 */}
      <div className="flex items-center gap-1.5 mb-2">
        <div className={`w-7 h-7 rounded-lg ${activeBg} flex items-center justify-center flex-shrink-0`}>
          <Icon size={13} className={activeColor} strokeWidth={2} />
        </div>
        <span className="text-[10px] font-bold text-muted">{label}</span>
        {/* 나트륨 높음 경고 배지 */}
        {isHigh && (
          <span className="text-[9px] font-bold text-red-500 bg-red-100 px-1.5 py-0.5 rounded-full leading-none">
            높음
          </span>
        )}
      </div>
      {/* 수치 */}
      <p className={`text-base font-extrabold mt-0.5 ${isHigh ? 'text-red-600' : 'text-ink'}`}>
        {value.toLocaleString()}
        <span className="text-[10px] font-medium text-muted ml-0.5">{unit}</span>
      </p>
      {/* CSS 바 차트 */}
      <div className="h-1 bg-gray-100 rounded-full overflow-hidden mt-1.5">
        <div
          className={`h-full rounded-full transition-all duration-700 ${barColor}`}
          style={{ width: `${percent}%` }}
        />
      </div>
    </div>
  );
}

// ── 룰렛 로딩 화면 ──
function RouletteLoading() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-brand to-indigo-800 flex flex-col items-center justify-center px-5">
      <p className="text-white/70 text-sm font-medium mb-4 tracking-wide">잠깐만요...</p>
      <h2 className="text-white text-2xl font-extrabold mb-8">메뉴가 생성중이에요!</h2>

      {/* 룰렛 컨테이너 — overflow-hidden으로 스크롤 텍스트 마스킹 */}
      <div
        className="w-64 h-16 overflow-hidden rounded-2xl bg-white/10 border border-white/20 flex items-center justify-center relative mb-8"
        aria-hidden="true"
      >
        {/* 상하단 그라디언트 페이드 */}
        <div className="absolute inset-x-0 top-0 h-5 bg-gradient-to-b from-brand to-transparent z-10 pointer-events-none" />
        <div className="absolute inset-x-0 bottom-0 h-5 bg-gradient-to-t from-indigo-800 to-transparent z-10 pointer-events-none" />

        {/* 세로 스크롤 룰렛 텍스트 — CSS @keyframes 처리 */}
        <div className="roulette-scroll flex flex-col items-center">
          {[...ROULETTE_ITEMS, ...ROULETTE_ITEMS].map((name, i) => (
            <span
              key={i}
              className="text-white font-bold text-lg leading-8 h-8 text-center whitespace-nowrap"
            >
              {name}
            </span>
          ))}
        </div>
      </div>

      {/* 점 3개 로딩 인디케이터 */}
      <div className="flex gap-2">
        {[0, 1, 2].map((i) => (
          <div
            key={i}
            className="w-2 h-2 rounded-full bg-white/60 animate-bounce"
            style={{ animationDelay: `${i * 0.15}s` }}
          />
        ))}
      </div>

      {/* 룰렛 CSS 애니메이션 */}
      <style>{`
        .roulette-scroll {
          animation: rouletteScroll 2.5s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards;
        }
        @keyframes rouletteScroll {
          0%   { transform: translateY(0); }
          60%  { transform: translateY(-${ROULETTE_ITEMS.length * 28}px); }
          80%  { transform: translateY(-${(ROULETTE_ITEMS.length - 2) * 28}px); }
          90%  { transform: translateY(-${(ROULETTE_ITEMS.length - 1) * 28}px); }
          100% { transform: translateY(-${(ROULETTE_ITEMS.length - 1) * 28}px); }
        }
      `}</style>
    </div>
  );
}

// ── 메인 결과 컴포넌트 ──
export default function MenuResultClient() {
  const searchParams = useSearchParams();
  const router = useRouter();

  // URL 파라미터 파싱
  const menuId = searchParams.get('menu') ?? '';

  // 화면 단계: roulette → result
  const [phase, setPhase] = useState<'roulette' | 'result'>('roulette');
  const [copied, setCopied] = useState(false);

  // 메뉴 데이터 조회
  const menu: MenuItem | undefined = getMenuById(menuId);

  // 마운트 후 2.5초 뒤 결과 화면으로 전환
  useEffect(() => {
    const timer = setTimeout(() => {
      setPhase('result');
    }, 2500);
    return () => clearTimeout(timer);
  }, []);

  // 공유하기 — Web Share API 또는 링크 복사 폴백
  const handleShare = useCallback(async () => {
    const url = typeof window !== 'undefined' ? window.location.href : '';
    const title = menu ? `오늘 메뉴는 ${menu.name}!` : '오늘 뭐 먹지?';
    const text = menu
      ? `오늘 컨디션에 맞는 메뉴는 "${menu.name}"!\n지금 바로 뽑아봐 → 심랩`
      : '지금 바로 메뉴를 뽑아봐!';

    if (navigator.share) {
      try {
        await navigator.share({ title, text, url });
      } catch {
        // 사용자 취소 — 무시
      }
    } else {
      // Web Share API 미지원 시 링크 복사
      await handleCopyLink();
    }
  }, [menu]);

  // 링크 복사 — 복사 완료 시 2초 피드백
  const handleCopyLink = useCallback(async () => {
    const url = typeof window !== 'undefined' ? window.location.href : '';
    try {
      await navigator.clipboard.writeText(url);
    } catch {
      // clipboard API 미지원 폴백
      const input = document.createElement('input');
      input.value = url;
      document.body.appendChild(input);
      input.select();
      document.execCommand('copy');
      document.body.removeChild(input);
    }
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }, []);

  // 다시 뽑기 — 인트로 페이지로 이동
  const handleRetry = useCallback(() => {
    router.push('/menu');
  }, [router]);

  // 룰렛 로딩 단계
  if (phase === 'roulette') {
    return <RouletteLoading />;
  }

  // 메뉴 데이터 없을 경우 오류 처리
  if (!menu) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-4 px-5">
        <p className="text-muted text-sm">메뉴 정보를 찾을 수 없어요.</p>
        <Link
          href="/menu"
          className="px-6 py-3 rounded-2xl bg-brand text-white text-sm font-bold"
        >
          다시 뽑기
        </Link>
      </div>
    );
  }

  // 4대 영양소 (탄수화물·단백질·지방·나트륨) 데이터 — 2×2 카드 그리드
  // 나트륨 1회 800mg 초과 시 isHigh 경고 활성
  const NUTRIENT_INFO = [
    { icon: Wheat,    label: '탄수화물', value: menu.nutrition.carbs,   unit: 'g',  max: 300,  color: 'text-yellow-500', bgColor: 'bg-yellow-50' },
    { icon: Dumbbell, label: '단백질',   value: menu.nutrition.protein, unit: 'g',  max: 60,   color: 'text-blue-500',   bgColor: 'bg-blue-50'   },
    { icon: Droplets, label: '지방',     value: menu.nutrition.fat,     unit: 'g',  max: 65,   color: 'text-indigo-400', bgColor: 'bg-indigo-50' },
    { icon: Droplets, label: '나트륨',   value: menu.nutrition.sodium,  unit: 'mg', max: 2000, color: 'text-red-400',    bgColor: 'bg-red-50',   isHigh: menu.nutrition.sodium > 800 },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-indigo-50 to-white px-5 py-8 mobile-container mx-auto">

      {/* 결과 헤더 */}
      <div className="text-center mb-6">
        <p className="text-xs font-bold text-indigo-500 tracking-widest mb-1 uppercase">오늘의 메뉴</p>
        <h1 className="text-3xl font-extrabold text-ink mb-2">{menu.name}</h1>
        {/* 태그 배지 */}
        <div className="flex flex-wrap justify-center gap-1.5 mb-3">
          {menu.tags.map((tag) => (
            <span
              key={tag}
              className="px-3 py-1 rounded-full text-xs font-bold bg-indigo-50 text-indigo-600"
            >
              {tag}
            </span>
          ))}
        </div>
        <p className="text-sm text-muted leading-relaxed">{menu.description}</p>
      </div>

      {/* ── 영양 정보 섹션 ── */}
      <section className="mb-5">
        <div className="flex items-center gap-2 mb-3">
          <Flame size={15} className="text-orange-500" strokeWidth={2} />
          <h2 className="text-sm font-extrabold text-ink">영양 정보</h2>
          <span className="text-[10px] text-gray-400">(1인분 기준 / 추정치)</span>
        </div>

        {/* 칼로리 — 전체 너비 강조 카드 (위치: 영양정보 최상단, 유지) */}
        <CaloriesCard calories={menu.nutrition.calories} />

        {/* 탄수화물·단백질·지방·나트륨 — 2×2 카드 그리드 */}
        <div className="grid grid-cols-2 gap-2">
          {NUTRIENT_INFO.map((info) => (
            <NutrientCard key={info.label} {...info} />
          ))}
        </div>
      </section>

      {/* ── 카카오맵 주변 식당 섹션 ── */}
      {/* 지도 렌더링 + 장소 목록: 데스크탑 5곳, 모바일 3곳 + 더보기 */}
      <KakaoMapSection keyword={menu.kakaoSearchKeyword} />

      {/* ── 액션 버튼 — 공유하기 / 다시 뽑기 ── */}
      <div className="flex gap-3 mb-4">
        {/* 공유하기 — Web Share API(모바일 네이티브) or 링크 복사 */}
        <button
          onClick={handleShare}
          className="flex flex-1 items-center justify-center gap-2 py-4 rounded-2xl bg-brand text-white font-bold text-sm shadow-md active:scale-[0.98] transition-transform"
          aria-label="결과 공유하기"
        >
          {copied ? (
            <>
              <Check size={16} strokeWidth={2.5} />
              복사됨!
            </>
          ) : (
            <>
              <Share2 size={16} strokeWidth={2.5} />
              공유하기
            </>
          )}
        </button>

        {/* 다시 뽑기 */}
        <button
          onClick={handleRetry}
          className="flex flex-1 items-center justify-center gap-2 py-4 rounded-2xl border-2 border-brand text-brand font-bold text-sm active:scale-[0.98] transition-transform"
          aria-label="메뉴 다시 뽑기"
        >
          <RotateCcw size={16} strokeWidth={2.5} />
          다시 뽑기
        </button>
      </div>

      {/* 링크 복사 보조 버튼 */}
      <button
        onClick={handleCopyLink}
        className={`flex items-center justify-center gap-2 w-full py-3 rounded-2xl border text-sm font-semibold transition-all mb-6 ${
          copied
            ? 'border-emerald-400 text-emerald-600 bg-emerald-50'
            : 'border-indigo-200 text-indigo-600 bg-white'
        }`}
        aria-label="결과 링크 복사"
      >
        {copied ? (
          <>
            <Check size={14} strokeWidth={2.5} />
            링크가 복사되었어요!
          </>
        ) : (
          <>
            <Link2 size={14} strokeWidth={2} />
            링크 복사
          </>
        )}
      </button>

      {/* 면책 고지 */}
      <p className="text-center text-[10px] text-gray-400 leading-relaxed">
        영양 정보는 일반적인 추정치이며 실제와 다를 수 있습니다.
        <br />
        건강 관련 결정 시 전문가와 상담하세요.
        <br />
        위치 정보는 수집·저장되지 않습니다.
      </p>
    </div>
  );
}
