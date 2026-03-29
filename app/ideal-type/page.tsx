// 이상형 성향 테스트 인트로 페이지 (Server Component)
// 구조: 이모지 헤더 → 6종 유형 프리뷰 → 특징 카드 → 시작 버튼
// SEO: JSON-LD Quiz 구조화 데이터 포함

import Link from 'next/link';
import { Heart, Sparkles, Share2 } from 'lucide-react';
import { ChevronRight } from 'lucide-react';

// 테스트 특징 카드 데이터
const FEATURES = [
  {
    Icon: Heart,
    title: '성별 무관 6가지 성향',
    desc: '보호자·로맨티스트·절친·탐험가·독립주의·청순형 — 누구나 어떤 유형이든 가능해요',
  },
  {
    Icon: Sparkles,
    title: '적응형 12~14문항',
    desc: '나의 성향에 맞게 질문이 조정되어 더 정확한 결과를 드려요',
  },
  {
    Icon: Share2,
    title: '궁합 MBTI + 결과 공유',
    desc: '내 이상형과 찰떡인 MBTI까지 알려드려요. 친구에게 공유해보세요',
  },
];

// JSON-LD 구조화 데이터
const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Quiz',
  name: '이상형 성향 테스트',
  description:
    '12문항으로 알아보는 나의 이상형 성향. 보호자형·로맨티스트형·절친형·탐험가형·독립주의형·청순형 6가지 결과와 궁합 MBTI까지 제공.',
  url: 'https://simlab.kr/ideal-type',
  educationalAlignment: {
    '@type': 'AlignmentObject',
    alignmentType: 'educationalSubject',
    targetName: '심리 테스트',
  },
};

export default function IdealTypeIntroPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <main className="min-h-screen bg-gradient-to-b from-rose-50 to-white px-5 py-10 flex flex-col">
        {/* 이모지 아이콘 + 타이틀 */}
        <div className="flex flex-col items-center text-center mb-8">
          <div className="w-20 h-20 rounded-3xl bg-gradient-to-br from-rose-400 to-pink-500 flex items-center justify-center shadow-lg mb-5 text-4xl">
            💝
          </div>
          <h1 className="text-2xl font-extrabold text-ink mb-2">이상형 성향 테스트</h1>
          <p className="text-sm text-muted leading-relaxed">
            나는 어떤 사람에게 끌릴까?
            <br />
            12문항으로 나의 이상형 성향을 찾아보세요
          </p>
        </div>

        {/* 6종 유형 이모지 프리뷰 */}
        <div className="flex justify-center gap-2.5 mb-8">
          {['🐻', '💝', '🐶', '🦁', '🐱', '🐰'].map((emoji) => (
            <span
              key={emoji}
              className="w-10 h-10 bg-white rounded-2xl shadow-sm border border-rose-100 flex items-center justify-center text-xl"
            >
              {emoji}
            </span>
          ))}
        </div>

        {/* 특징 카드 3개 */}
        <div className="flex flex-col gap-3 mb-8">
          {FEATURES.map(({ Icon, title, desc }) => (
            <div
              key={title}
              className="flex items-start gap-4 bg-white rounded-2xl px-4 py-4 shadow-sm border border-rose-50"
            >
              <div className="w-10 h-10 rounded-xl bg-rose-50 flex items-center justify-center flex-shrink-0">
                <Icon size={20} className="text-rose-500" strokeWidth={1.8} />
              </div>
              <div>
                <p className="text-sm font-bold text-ink">{title}</p>
                <p className="text-xs text-muted mt-0.5 leading-relaxed">{desc}</p>
              </div>
            </div>
          ))}
        </div>

        {/* 안내 문구 */}
        <p className="text-center text-xs text-gray-400 mb-6 leading-relaxed">
          정답은 없어요. 평소 느끼는 대로 솔직하게 선택해 주세요.
          <br />약 2~3분 소요됩니다.
        </p>

        {/* 시작 버튼 */}
        <Link
          href="/ideal-type/test"
          className="flex items-center justify-center gap-2 w-full py-4 rounded-2xl bg-gradient-to-r from-rose-500 to-pink-500 text-white font-bold text-base shadow-md active:scale-[0.98] transition-transform"
        >
          테스트 시작하기
          <ChevronRight size={20} strokeWidth={2.5} />
        </Link>

        {/* 면책 고지 */}
        <p className="text-center text-[10px] text-gray-400 mt-5 leading-relaxed">
          본 테스트는 오락 목적으로 제공되며 전문적인 심리 진단이 아닙니다.
          <br />
          개인 정보는 수집·저장되지 않습니다.
        </p>
      </main>
    </>
  );
}
