'use client';

// 이상형 성향 테스트 결과 클라이언트 컴포넌트
// 섹션: 결과 헤더 → 상세 설명 → 궁합 MBTI → 공유 → 다른 테스트 추천 → 면책 고지

import { useEffect, useState, useCallback } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { Check, Copy, Heart, Sparkles, ChevronRight } from 'lucide-react';
import { IDEAL_TYPE_DATA, IDEAL_TYPE_IDS, type IdealTypeId } from '@/data/ideal-type/ideal-type-data';

// 다른 테스트 추천 카드 데이터
const RELATED_TESTS = [
  {
    href: '/animal-type',
    emoji: '🐾',
    name: '이상형 동물상 테스트',
    desc: '어떤 동물상에 끌리는지 알아보세요',
  },
  {
    href: '/mbti',
    emoji: '🧠',
    name: 'MBTI 테스트',
    desc: '나의 MBTI 유형을 직접 확인해보세요',
  },
];

export default function IdealTypeResultClient() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const typeParam = searchParams.get('type');

  // 링크 복사 완료 상태
  const [isCopied, setIsCopied] = useState(false);

  // 유효하지 않은 type param → 테스트 페이지로 리다이렉트
  useEffect(() => {
    if (!typeParam || !IDEAL_TYPE_IDS.includes(typeParam as IdealTypeId)) {
      router.replace('/ideal-type/test');
    }
  }, [typeParam, router]);

  // 결과 URL 복사
  const handleCopy = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    } catch {
      // clipboard API 미지원 환경 대응
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    }
  }, []);

  const info = typeParam ? IDEAL_TYPE_DATA[typeParam as IdealTypeId] : null;
  if (!info) return null;

  return (
    <main className="min-h-screen bg-gradient-to-b from-rose-50 to-white px-5 py-10 flex flex-col gap-5">

      {/* ── 섹션 1: 결과 헤더 ───────────────────────────────────────── */}
      <div className="flex flex-col items-center text-center">
        {/* 유형 이모지 */}
        <div className={`w-24 h-24 rounded-3xl ${info.iconBg} flex items-center justify-center shadow-sm mb-5 text-5xl`}>
          {info.emoji}
        </div>

        {/* 결과 레이블 + 유형명 */}
        <p className="text-xs text-muted mb-1">내 이상형은</p>
        <h1 className="text-2xl font-extrabold text-ink mb-3">{info.name}</h1>

        {/* 키워드 뱃지 */}
        <div className="flex flex-wrap justify-center gap-2 mb-4">
          {info.keywords.map((kw) => (
            <span
              key={kw}
              className={`text-xs font-semibold px-3 py-1 rounded-full ${info.badgeBg} ${info.badgeText}`}
            >
              {kw}
            </span>
          ))}
        </div>

        {/* 한 줄 요약 */}
        <p className="text-sm text-muted leading-relaxed">{info.summary}</p>
      </div>

      {/* ── 섹션 2: 상세 설명 카드 ──────────────────────────────────── */}
      <div className={`bg-gradient-to-b ${info.gradientFrom} ${info.gradientTo} rounded-3xl p-5 border border-rose-50 shadow-sm`}>
        {/* 설명 텍스트 */}
        <p className="text-sm text-ink leading-relaxed mb-5">{info.description}</p>

        {/* 특징 체크리스트 */}
        <div className="flex flex-col gap-2.5 mb-5">
          {info.traits.map((trait) => (
            <div key={trait} className="flex items-start gap-2.5">
              <div className={`w-5 h-5 rounded-full ${info.iconBg} flex items-center justify-center flex-shrink-0 mt-0.5`}>
                <Check size={11} className={info.iconText} strokeWidth={2.5} />
              </div>
              <span className="text-sm text-ink">{trait}</span>
            </div>
          ))}
        </div>

        {/* 연애 스타일 */}
        <div className={`flex items-start gap-2.5 pt-4 border-t border-rose-100`}>
          <div className={`w-5 h-5 rounded-full ${info.iconBg} flex items-center justify-center flex-shrink-0 mt-0.5`}>
            <Heart size={11} className={info.iconText} strokeWidth={2.5} />
          </div>
          <p className="text-sm text-muted leading-relaxed">{info.loveStyle}</p>
        </div>
      </div>

      {/* ── 섹션 3: 궁합 MBTI ───────────────────────────────────────── */}
      <div className="bg-white rounded-3xl p-5 border border-rose-50 shadow-sm">
        {/* 제목 */}
        <div className="flex items-center gap-2 mb-4">
          <div className={`w-8 h-8 rounded-xl ${info.iconBg} flex items-center justify-center`}>
            <Sparkles size={15} className={info.iconText} strokeWidth={1.8} />
          </div>
          <h2 className="text-sm font-bold text-ink">궁합 MBTI</h2>
        </div>

        {/* MBTI 궁합 목록 */}
        <div className="flex flex-col divide-y divide-rose-50">
          {info.compatibleMBTI.map((mbti) => (
            <div key={mbti.type} className="py-3 first:pt-0 last:pb-0">
              <div className="flex items-center justify-between mb-1.5">
                {/* MBTI 타입 + 별점 */}
                <div className="flex items-center gap-2">
                  <span className={`text-sm font-extrabold ${info.accentText}`}>
                    {mbti.type}
                  </span>
                  <span className="text-amber-400 text-sm leading-none">
                    {'★'.repeat(mbti.stars)}
                    <span className="text-gray-200">{'★'.repeat(5 - mbti.stars)}</span>
                  </span>
                </div>
                {/* 궁합도 레이블 */}
                <span className="text-[10px] text-muted">
                  {mbti.stars === 5 ? '최고의 조합' : mbti.stars === 4 ? '좋은 조합' : '나쁘지 않아요'}
                </span>
              </div>
              <p className="text-xs text-muted leading-relaxed">{mbti.reason}</p>
            </div>
          ))}
        </div>

        {/* 면책 */}
        <p className="text-[10px] text-gray-400 text-center mt-4">
          재미로 보는 궁합이에요 😊 절대적인 기준이 아니에요
        </p>
      </div>

      {/* ── 섹션 4: 공유 버튼 ───────────────────────────────────────── */}
      <div className="bg-white rounded-3xl p-5 border border-rose-50 shadow-sm">
        <h2 className="text-sm font-bold text-ink mb-3 text-center">결과 공유하기</h2>

        <button
          onClick={handleCopy}
          className={`w-full flex items-center justify-center gap-2 py-3.5 rounded-2xl font-semibold text-sm transition-all duration-200 ${
            isCopied
              ? 'bg-green-50 text-green-600 border-2 border-green-200'
              : 'bg-rose-50 text-rose-600 border-2 border-rose-200 hover:bg-rose-100 active:scale-[0.98]'
          }`}
        >
          {isCopied ? (
            <>
              <Check size={16} strokeWidth={2.5} />
              링크 복사 완료!
            </>
          ) : (
            <>
              <Copy size={16} strokeWidth={1.8} />
              링크 복사하기
            </>
          )}
        </button>

        <p className="text-[10px] text-gray-400 text-center mt-2">
          친구에게 공유하고 서로의 이상형을 비교해보세요 💕
        </p>
      </div>

      {/* ── 섹션 5: 다른 테스트 추천 ────────────────────────────────── */}
      <div>
        <h2 className="text-sm font-bold text-ink mb-3">이것도 해보세요</h2>
        <div className="flex flex-col gap-2.5">
          {RELATED_TESTS.map(({ href, emoji, name, desc }) => (
            <Link
              key={href}
              href={href}
              className="flex items-center gap-3 bg-white rounded-2xl px-4 py-3.5 border border-rose-50 shadow-sm hover:border-rose-200 active:scale-[0.98] transition-all"
            >
              <span className="text-2xl">{emoji}</span>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-bold text-ink">{name}</p>
                <p className="text-xs text-muted mt-0.5">{desc}</p>
              </div>
              <ChevronRight size={16} className="text-muted flex-shrink-0" />
            </Link>
          ))}
        </div>
      </div>

      {/* ── 면책 고지 ─────────────────────────────────────────────────── */}
      <p className="text-center text-[10px] text-gray-400 leading-relaxed pb-4">
        본 테스트는 오락 목적으로 제공되며 전문적인 심리 진단이 아닙니다.
        <br />
        개인 정보는 수집·저장되지 않습니다.
      </p>
    </main>
  );
}
