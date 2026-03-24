'use client';

// MBTI 결과 클라이언트 컴포넌트
// URL 파라미터: type(MBTI 유형), e(E 비율), n(N 비율), t(T 비율), j(J 비율)
// 구조: 타입 헤더 → 비율 그래프 → MBTI 설명 → 공유 → 잘 맞는 궁합 → 재테스트

import { useState, useCallback } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import {
  RotateCcw, Heart, ChevronRight, ChevronDown, Share2, Link2, Check, Twitter,
  Landmark, FlaskConical, Trophy, Zap, Moon, Leaf, Star, Palette,
  ClipboardList, Shield, Scale, Handshake, Wrench, Paintbrush, Rocket, Music,
  type LucideIcon,
} from 'lucide-react';
import { MBTI_TYPES, DIMENSION_LABELS, DIMENSION_COLORS, getCompatibleReason } from '@/data/mbti-data';

// MBTI 유형 → lucide-react 아이콘 매핑
const TYPE_ICONS: Record<string, LucideIcon> = {
  INTJ: Landmark, INTP: FlaskConical, ENTJ: Trophy, ENTP: Zap,
  INFJ: Moon,     INFP: Leaf,        ENFJ: Star,   ENFP: Palette,
  ISTJ: ClipboardList, ISFJ: Shield, ESTJ: Scale,  ESFJ: Handshake,
  ISTP: Wrench,   ISFP: Paintbrush,  ESTP: Rocket, ESFP: Music,
};

// ── 차원 비율 바 컴포넌트 ──
function DimensionBar({
  dimension,
  scoreA, // A(첫 번째 글자) 비율 0~100
}: {
  dimension: keyof typeof DIMENSION_LABELS;
  scoreA: number;
}) {
  const scoreB = 100 - scoreA;
  const labels = DIMENSION_LABELS[dimension];
  const colors = DIMENSION_COLORS[dimension];
  const dominant = scoreA >= scoreB ? 'A' : 'B';

  return (
    <div className="mb-6">
      {/* 레이블 행: 양쪽 트레이트 이름 */}
      <div className="flex justify-between items-center mb-2.5">
        {/* A쪽 */}
        <div className="flex items-center gap-2">
          <span className={`text-sm font-extrabold ${dominant === 'A' ? colors.textA : 'text-gray-400'}`}>
            {labels.A}
          </span>
          <span className={`text-xs font-medium ${dominant === 'A' ? 'text-gray-600' : 'text-gray-400'}`}>
            {labels.nameA}
          </span>
        </div>
        {/* B쪽 */}
        <div className="flex items-center gap-2">
          <span className={`text-xs font-medium ${dominant === 'B' ? 'text-gray-600' : 'text-gray-400'}`}>
            {labels.nameB}
          </span>
          <span className={`text-sm font-extrabold ${dominant === 'B' ? colors.textB : 'text-gray-400'}`}>
            {labels.B}
          </span>
        </div>
      </div>

      {/* 바 트랙: flex 레이아웃으로 A/B 바가 정확히 맞붙음 */}
      <div className="relative h-9 bg-gray-100 rounded-full overflow-hidden flex">
        {/* A 쪽 (왼쪽) — 외곽 rounding은 부모 overflow-hidden이 처리 */}
        <div
          className={`h-full ${colors.barA} transition-all duration-700 flex items-center justify-end pr-2.5`}
          style={{ width: `${scoreA}%` }}
        >
          {scoreA > 20 && (
            <span className="text-white text-xs font-bold drop-shadow-sm">{scoreA}%</span>
          )}
        </div>
        {/* B 쪽 (오른쪽) */}
        <div
          className={`h-full ${colors.barB} transition-all duration-700 flex items-center justify-start pl-2.5`}
          style={{ width: `${scoreB}%` }}
        >
          {scoreB > 20 && (
            <span className="text-white text-xs font-bold drop-shadow-sm">{scoreB}%</span>
          )}
        </div>
        {/* 중앙 기준선 (50% 위치) */}
        <div className="absolute left-1/2 top-1 bottom-1 w-px bg-white/50 z-10 -translate-x-1/2" />
      </div>

      {/* 바깥 수치: 바가 좁아 내부 표시 불가능한 경우 fallback */}
      <div className="flex justify-between mt-1.5">
        <span className={`text-xs font-semibold ${dominant === 'A' ? colors.textA : 'text-gray-400'}`}>
          {scoreA <= 18 ? `${scoreA}%` : ''}
        </span>
        <span className={`text-xs font-semibold ${dominant === 'B' ? colors.textB : 'text-gray-400'}`}>
          {scoreB <= 18 ? `${scoreB}%` : ''}
        </span>
      </div>
    </div>
  );
}

// 유형별 카드 액센트 (차분한 단색 팔레트)
const TYPE_ACCENTS: Record<string, { bar: string; iconBg: string; iconText: string; badge: string }> = {
  INTJ: { bar: 'bg-slate-400',   iconBg: 'bg-slate-50',   iconText: 'text-slate-500',   badge: 'bg-slate-100 text-slate-600'   },
  INTP: { bar: 'bg-blue-400',    iconBg: 'bg-blue-50',    iconText: 'text-blue-500',    badge: 'bg-blue-50 text-blue-700'      },
  ENTJ: { bar: 'bg-amber-500',   iconBg: 'bg-amber-50',   iconText: 'text-amber-600',   badge: 'bg-amber-50 text-amber-700'    },
  ENTP: { bar: 'bg-yellow-400',  iconBg: 'bg-yellow-50',  iconText: 'text-yellow-600',  badge: 'bg-yellow-50 text-yellow-700'  },
  INFJ: { bar: 'bg-violet-400',  iconBg: 'bg-violet-50',  iconText: 'text-violet-500',  badge: 'bg-violet-50 text-violet-700'  },
  INFP: { bar: 'bg-emerald-400', iconBg: 'bg-emerald-50', iconText: 'text-emerald-600', badge: 'bg-emerald-50 text-emerald-700'},
  ENFJ: { bar: 'bg-rose-400',    iconBg: 'bg-rose-50',    iconText: 'text-rose-500',    badge: 'bg-rose-50 text-rose-700'      },
  ENFP: { bar: 'bg-orange-400',  iconBg: 'bg-orange-50',  iconText: 'text-orange-600',  badge: 'bg-orange-50 text-orange-700'  },
  ISTJ: { bar: 'bg-stone-400',   iconBg: 'bg-stone-50',   iconText: 'text-stone-500',   badge: 'bg-stone-100 text-stone-600'   },
  ISFJ: { bar: 'bg-sky-400',     iconBg: 'bg-sky-50',     iconText: 'text-sky-500',     badge: 'bg-sky-50 text-sky-700'        },
  ESTJ: { bar: 'bg-indigo-400',  iconBg: 'bg-indigo-50',  iconText: 'text-indigo-500',  badge: 'bg-indigo-50 text-indigo-700'  },
  ESFJ: { bar: 'bg-pink-400',    iconBg: 'bg-pink-50',    iconText: 'text-pink-500',    badge: 'bg-pink-50 text-pink-700'      },
  ISTP: { bar: 'bg-zinc-400',    iconBg: 'bg-zinc-50',    iconText: 'text-zinc-500',    badge: 'bg-zinc-100 text-zinc-600'     },
  ISFP: { bar: 'bg-fuchsia-400', iconBg: 'bg-fuchsia-50', iconText: 'text-fuchsia-500', badge: 'bg-fuchsia-50 text-fuchsia-700'},
  ESTP: { bar: 'bg-red-400',     iconBg: 'bg-red-50',     iconText: 'text-red-500',     badge: 'bg-red-50 text-red-700'        },
  ESFP: { bar: 'bg-yellow-400',  iconBg: 'bg-yellow-50',  iconText: 'text-yellow-600',  badge: 'bg-yellow-50 text-yellow-700'  },
};

// ── 궁합 유형 카드 ──
function CompatibleCard({ type, myType }: { type: string; myType: string }) {
  const info = MBTI_TYPES[type];
  if (!info) return null;

  const Icon = TYPE_ICONS[type] ?? Star;
  const reason = getCompatibleReason(myType, type);
  const accent = TYPE_ACCENTS[type] ?? {
    bar: 'bg-gray-300', iconBg: 'bg-gray-50', iconText: 'text-gray-500', badge: 'bg-gray-100 text-gray-600',
  };

  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden flex">
      {/* 좌측 컬러 액센트 바 */}
      <div className={`w-1 flex-shrink-0 ${accent.bar}`} />

      {/* 카드 콘텐츠 */}
      <div className="flex-1 px-4 py-4">
        {/* 아이콘 + 유형 정보 */}
        <div className="flex items-center gap-3 mb-3">
          <div className={`w-10 h-10 rounded-xl ${accent.iconBg} flex items-center justify-center flex-shrink-0`}>
            <Icon size={20} className={accent.iconText} strokeWidth={1.8} />
          </div>
          <div>
            <div className="flex items-center gap-2 mb-0.5">
              <span className="text-base font-extrabold text-ink tracking-wide">{info.type}</span>
              <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${accent.badge}`}>
                {info.title}
              </span>
            </div>
            {/* 특징 태그 */}
            <div className="flex gap-1 flex-wrap">
              {info.traits.slice(0, 3).map((trait) => (
                <span key={trait} className="text-[10px] text-gray-400 font-medium">
                  #{trait}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* 궁합 이유 블록 */}
        <div className="bg-gray-50 rounded-xl px-3 py-2.5">
          <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1">잘 맞는 이유</p>
          <p className="text-xs text-gray-600 leading-relaxed">{reason}</p>
        </div>
      </div>
    </div>
  );
}

// ── 공유 섹션 ──
function ShareSection({
  type,
  title,
  eScore,
  nScore,
  tScore,
  jScore,
}: {
  type: string;
  title: string;
  eScore: number;
  nScore: number;
  tScore: number;
  jScore: number;
}) {
  const [copied, setCopied] = useState(false);

  // 현재 페이지 URL 생성
  const getShareUrl = () => {
    if (typeof window === 'undefined') return '';
    return window.location.href;
  };

  // 공유 텍스트 생성
  const getShareText = () => {
    const e = eScore >= 50 ? `E ${eScore}%` : `I ${100 - eScore}%`;
    const n = nScore >= 50 ? `N ${nScore}%` : `S ${100 - nScore}%`;
    const t = tScore >= 50 ? `T ${tScore}%` : `F ${100 - tScore}%`;
    const j = jScore >= 50 ? `J ${jScore}%` : `P ${100 - jScore}%`;
    return `나의 MBTI는 ${type}!\n${title}\n\n${e} · ${n} · ${t} · ${j}\n\n심랩에서 나도 테스트해봐!`;
  };

  // Web Share API 공유 (모바일 네이티브 시트 — KakaoTalk 포함)
  const handleNativeShare = useCallback(async () => {
    const url = getShareUrl();
    const text = getShareText();

    if (navigator.share) {
      try {
        await navigator.share({ title: `나는 ${type}!`, text, url });
      } catch {
        // 사용자가 공유 취소한 경우 등 — 에러 무시
      }
    } else {
      // Web Share API 미지원 환경 → 링크 복사로 대체
      handleCopyLink();
    }
  }, [type, eScore, nScore, tScore, jScore]);

  // 링크 복사
  const handleCopyLink = useCallback(async () => {
    const url = getShareUrl();
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // clipboard API 미지원 환경 (구형 브라우저) — execCommand 폴백
      const input = document.createElement('input');
      input.value = url;
      document.body.appendChild(input);
      input.select();
      document.execCommand('copy');
      document.body.removeChild(input);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  }, []);

  // X(트위터) 공유
  const handleTwitterShare = useCallback(() => {
    const url = getShareUrl();
    const text = getShareText();
    const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`;
    window.open(twitterUrl, '_blank', 'noopener,noreferrer');
  }, [type, eScore, nScore, tScore, jScore]);

  return (
    <section className="bg-white rounded-3xl shadow-sm border border-indigo-50 px-5 py-6 mb-5">
      <div className="flex items-center gap-2 mb-4">
        <Share2 size={16} className="text-indigo-500" strokeWidth={2} />
        <h2 className="text-sm font-extrabold text-ink">결과 공유하기</h2>
      </div>

      {/* 공유 텍스트 미리보기 */}
      <div className="bg-indigo-50 rounded-2xl px-4 py-3 mb-4">
        <p className="text-xs text-indigo-700 leading-relaxed whitespace-pre-line">
          {getShareText()}
        </p>
      </div>

      {/* 공유 버튼들 */}
      <div className="flex flex-col gap-2">
        {/* Web Share API — 모바일에서 KakaoTalk 포함 네이티브 시트 표시 */}
        <button
          onClick={handleNativeShare}
          className="flex items-center justify-center gap-2 w-full py-3.5 rounded-2xl bg-brand text-white font-bold text-sm shadow-sm active:scale-[0.98] transition-transform"
        >
          <Share2 size={16} strokeWidth={2.5} />
          공유하기
          <span className="text-white/70 text-[10px] font-normal">(카카오톡·인스타 등)</span>
        </button>

        {/* 링크 복사 + X 공유 */}
        <div className="flex gap-2">
          <button
            onClick={handleCopyLink}
            className={`flex flex-1 items-center justify-center gap-2 py-3 rounded-2xl border-2 text-sm font-semibold transition-all active:scale-[0.98] ${
              copied
                ? 'border-emerald-400 text-emerald-600 bg-emerald-50'
                : 'border-indigo-200 text-indigo-600 bg-white'
            }`}
          >
            {copied ? (
              <>
                <Check size={15} strokeWidth={2.5} />
                복사됨!
              </>
            ) : (
              <>
                <Link2 size={15} strokeWidth={2} />
                링크 복사
              </>
            )}
          </button>

          <button
            onClick={handleTwitterShare}
            className="flex items-center justify-center gap-2 px-4 py-3 rounded-2xl border-2 border-slate-200 text-slate-600 bg-white text-sm font-semibold active:scale-[0.98] transition-transform"
            aria-label="X(트위터)에 공유"
          >
            <Twitter size={15} strokeWidth={2} />
            X
          </button>
        </div>
      </div>
    </section>
  );
}

// ── 메인 결과 컴포넌트 ──
export default function MBTIResultClient() {
  const searchParams = useSearchParams();
  const [isCompatibleOpen, setIsCompatibleOpen] = useState(false);

  // URL 파라미터 파싱
  const rawType = searchParams.get('type') ?? '';
  const eScore = Math.min(100, Math.max(0, Number(searchParams.get('e') ?? 50)));
  const nScore = Math.min(100, Math.max(0, Number(searchParams.get('n') ?? 50)));
  const tScore = Math.min(100, Math.max(0, Number(searchParams.get('t') ?? 50)));
  const jScore = Math.min(100, Math.max(0, Number(searchParams.get('j') ?? 50)));

  // 유효한 MBTI 타입인지 확인
  const typeInfo = MBTI_TYPES[rawType.toUpperCase()];

  if (!typeInfo) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-4 px-5">
        <p className="text-muted text-sm">올바른 결과 페이지가 아닙니다.</p>
        <Link
          href="/mbti"
          className="px-6 py-3 rounded-2xl bg-brand text-white text-sm font-bold"
        >
          테스트 시작하기
        </Link>
      </div>
    );
  }

  const TypeIcon = TYPE_ICONS[typeInfo.type] ?? Star;

  return (
    <div className="min-h-screen bg-gradient-to-b from-indigo-50 to-white px-5 py-8">

      {/* ── 타입 헤더 ── */}
      <div className="text-center mb-8">
        {/* 아이콘 배지 */}
        <div
          className={`inline-flex w-24 h-24 rounded-3xl bg-gradient-to-br ${typeInfo.color} items-center justify-center shadow-lg mb-4`}
        >
          <TypeIcon size={44} className="text-white" strokeWidth={1.5} />
        </div>
        <p className="text-xs font-bold text-indigo-500 tracking-widest mb-1 uppercase">당신의 MBTI 유형</p>
        <h1 className="text-4xl font-extrabold text-ink tracking-wider mb-1">{typeInfo.type}</h1>
        <p className="text-base font-semibold text-gray-500">{typeInfo.title}</p>
      </div>

      {/* ── 차원별 비율 그래프 ── */}
      <section className="bg-white rounded-3xl shadow-sm border border-indigo-50 px-5 py-6 mb-5">
        <h2 className="text-sm font-extrabold text-ink mb-6">성향 분포</h2>
        <DimensionBar dimension="EI" scoreA={eScore} />
        <DimensionBar dimension="NS" scoreA={nScore} />
        <DimensionBar dimension="TF" scoreA={tScore} />
        <DimensionBar dimension="JP" scoreA={jScore} />
      </section>

      {/* ── MBTI 설명 ── */}
      <section className="bg-white rounded-3xl shadow-sm border border-indigo-50 px-5 py-6 mb-5">
        <h2 className="text-sm font-extrabold text-ink mb-3">유형 설명</h2>
        <p className="text-sm text-gray-600 leading-relaxed mb-4">{typeInfo.description}</p>

        {/* 특징 태그 */}
        <div className="flex flex-wrap gap-2">
          {typeInfo.traits.map((trait) => (
            <span
              key={trait}
              className="px-3 py-1 rounded-full text-xs font-bold bg-indigo-50 text-indigo-700"
            >
              {trait}
            </span>
          ))}
        </div>
      </section>

      {/* ── 공유하기 ── */}
      <ShareSection
        type={typeInfo.type}
        title={typeInfo.title}
        eScore={eScore}
        nScore={nScore}
        tScore={tScore}
        jScore={jScore}
      />

      {/* ── 잘 맞는 궁합 (토글) ── */}
      <section className="bg-white rounded-3xl shadow-sm border border-indigo-50 mb-8 overflow-hidden">
        {/* 토글 헤더 */}
        <button
          onClick={() => setIsCompatibleOpen((prev) => !prev)}
          className="w-full flex items-center justify-between px-5 py-5 active:bg-gray-50 transition-colors"
          aria-expanded={isCompatibleOpen}
        >
          <div className="flex items-center gap-2">
            <Heart size={16} className="text-rose-500" strokeWidth={2} fill="currentColor" />
            <h2 className="text-sm font-extrabold text-ink">잘 맞는 유형</h2>
            <span className="text-[11px] font-semibold text-rose-400 bg-rose-50 px-2 py-0.5 rounded-full">
              {typeInfo.compatible.length}가지
            </span>
          </div>
          <ChevronDown
            size={18}
            className={`text-gray-400 transition-transform duration-300 ${isCompatibleOpen ? 'rotate-180' : ''}`}
          />
        </button>

        {/* 접히는 콘텐츠 */}
        <div
          className={`transition-all duration-300 ease-in-out overflow-hidden ${
            isCompatibleOpen ? 'max-h-[600px] opacity-100' : 'max-h-0 opacity-0'
          }`}
        >
          <div className="px-5 pb-5 flex flex-col gap-3">
            {typeInfo.compatible.map((compat) => (
              <CompatibleCard key={compat} type={compat} myType={typeInfo.type} />
            ))}
            <p className="text-[10px] text-gray-400 text-center pt-1">
              궁합은 참고용이며 개인차가 있을 수 있습니다
            </p>
          </div>
        </div>
      </section>

      {/* ── 재테스트 버튼 ── */}
      <Link
        href="/mbti/test"
        className="flex items-center justify-center gap-2 w-full py-4 rounded-2xl bg-brand text-white font-bold text-sm shadow-md active:scale-[0.98] transition-transform mb-3"
      >
        <RotateCcw size={16} strokeWidth={2.5} />
        다시 테스트하기
      </Link>

      <Link
        href="/mbti"
        className="flex items-center justify-center gap-1 w-full py-3 rounded-2xl border border-indigo-200 text-indigo-600 text-sm font-semibold"
      >
        테스트 소개 보기
        <ChevronRight size={15} />
      </Link>

      {/* 면책 */}
      <p className="text-center text-[10px] text-gray-400 mt-6">
        본 테스트는 오락 목적으로 제공되며 전문적인 심리 진단이 아닙니다.
        <br />
        개인 정보는 수집·저장되지 않습니다.
      </p>
    </div>
  );
}
