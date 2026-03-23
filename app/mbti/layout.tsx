import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'MBTI 테스트',
  description:
    '48개 문항 중 12개를 무작위로 선별하는 MBTI 성격 유형 테스트. E/I·N/S·T/F·J/P 비율 그래프와 궁합 유형까지 확인하세요.',
  keywords: ['MBTI', 'MBTI 테스트', '성격 유형', 'MBTI 궁합', '심리 테스트', '16가지 성격'],
  openGraph: {
    title: 'MBTI 테스트 | 심랩',
    description: '나의 MBTI 유형을 알아보세요. 비율 그래프와 궁합 유형 제공.',
    images: [{ url: '/og/simlab-default-og.png', width: 1200, height: 630 }],
  },
};

export default function MBTILayout({ children }: { children: React.ReactNode }) {
  return children;
}
