// 이상형 성향 테스트 레이아웃 — SEO 기본 메타데이터
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: '이상형 성향 테스트 — 나는 어떤 사람에게 끌릴까? | 심랩',
  description:
    '12문항으로 알아보는 나의 이상형 성향. 보호자형·로맨티스트형·절친형·탐험가형·독립주의형·청순형 6가지 결과와 궁합 MBTI까지 제공.',
  openGraph: {
    title: '이상형 성향 테스트 | 심랩',
    description: '나는 어떤 사람에게 끌릴까? 6가지 이상형 성향 결과 + 궁합 MBTI',
    images: [{ url: '/og/simlab-default-og.png', width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: '이상형 성향 테스트 | 심랩',
    description: '나는 어떤 사람에게 끌릴까? 6가지 이상형 성향 결과 + 궁합 MBTI',
  },
};

export default function IdealTypeLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
