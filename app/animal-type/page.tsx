// 이상형 동물상 테스트 인트로 페이지 (Server Component)
// 구조: 헤더(이모지 순환) → 설명 카드 → 시작 버튼
// SEO: JSON-LD Quiz 구조화 데이터 포함

import Link from 'next/link';
import { ChevronRight, Users, Sparkles, Share2 } from 'lucide-react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: '이상형 동물상 테스트 — 나의 이상형은 어떤 동물상?',
};

const FEATURES = [
  {
    Icon: Users,
    title: '성별 맞춤 10문항',
    desc: '내 성별에 따라 이상형의 동물상이 달라집니다',
  },
  {
    Icon: Sparkles,
    title: '10가지 동물상',
    desc: '고양이·토끼·여우·사슴·강아지 / 곰·늑대·사자·강아지·고양이',
  },
  {
    Icon: Share2,
    title: '결과 공유',
    desc: '친구에게 내 이상형 결과를 공유해보세요',
  },
];

// JSON-LD 구조화 데이터
const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Quiz',
  name: '이상형 동물상 테스트',
  description: '내 이상형의 동물상을 찾아주는 5지선다 심리 테스트. 성별에 따라 이상형 동물상이 달라집니다.',
  url: 'https://simlab.kr/animal-type',
  educationalAlignment: {
    '@type': 'AlignmentObject',
    alignmentType: 'educationalSubject',
    targetName: '심리 테스트',
  },
};

export default function AnimalTypeIntroPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <main className="min-h-screen bg-gradient-to-b from-pink-50 to-white px-5 py-10 flex flex-col">
        {/* 이모지 + 타이틀 */}
        <div className="flex flex-col items-center text-center mb-8">
          <div className="w-20 h-20 rounded-3xl bg-gradient-to-br from-pink-400 to-violet-500 flex items-center justify-center shadow-lg mb-5 text-4xl">
            🐾
          </div>
          <h1 className="text-2xl font-extrabold text-ink mb-2">이상형 동물상 테스트</h1>
          <p className="text-sm text-muted leading-relaxed">
            나의 이상형은 어떤 동물상일까?
            <br />
            5지선다 10문항으로 지금 바로 확인해보세요
          </p>
        </div>

        {/* 동물 이모지 프리뷰 */}
        <div className="flex justify-center gap-3 mb-8">
          {['🐱', '🐰', '🦊', '🦌', '🐶', '🐻', '🐺', '🦁'].map((emoji) => (
            <span
              key={emoji}
              className="w-10 h-10 bg-white rounded-2xl shadow-sm border border-gray-100 flex items-center justify-center text-xl"
            >
              {emoji}
            </span>
          ))}
        </div>

        {/* 특징 카드 */}
        <div className="flex flex-col gap-3 mb-8">
          {FEATURES.map(({ Icon, title, desc }) => (
            <div
              key={title}
              className="flex items-start gap-4 bg-white rounded-2xl px-4 py-4 shadow-sm border border-pink-50"
            >
              <div className="w-10 h-10 rounded-xl bg-pink-50 flex items-center justify-center flex-shrink-0">
                <Icon size={20} className="text-pink-500" strokeWidth={1.8} />
              </div>
              <div>
                <p className="text-sm font-bold text-ink">{title}</p>
                <p className="text-xs text-muted mt-0.5">{desc}</p>
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
          href="/animal-type/test"
          className="flex items-center justify-center gap-2 w-full py-4 rounded-2xl bg-gradient-to-r from-pink-500 to-violet-500 text-white font-bold text-base shadow-md active:scale-[0.98] transition-transform"
        >
          테스트 시작하기
          <ChevronRight size={20} strokeWidth={2.5} />
        </Link>

        {/* 면책 고지 */}
        <p className="text-center text-[10px] text-gray-400 mt-5">
          본 테스트는 오락 목적으로 제공되며 전문적인 심리 진단이 아닙니다.
          <br />
          개인 정보는 수집·저장되지 않습니다.
        </p>
      </main>
    </>
  );
}
