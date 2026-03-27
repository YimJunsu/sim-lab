import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: '이상형 동물상 테스트',
  description:
    '내 이상형은 고양이상? 곰상? 토끼상? 5지선다 10문항으로 이상형 동물상을 찾아보세요. 성별에 따라 이상형 동물상이 달라집니다.',
  keywords: [
    '이상형 테스트', '동물상 테스트', '이상형 동물상', '이상형 찾기',
    '고양이상', '토끼상', '여우상', '사슴상', '강아지상',
    '곰상', '늑대상', '사자상', '심리 테스트',
  ],
  openGraph: {
    title: '이상형 동물상 테스트 | 심랩',
    description: '당신의 이상형은 어떤 동물상일까요? 5지선다 10문항으로 지금 바로 확인해보세요!',
    images: [{ url: '/og/simlab-default-og.png', width: 1200, height: 630 }],
  },
};

export default function AnimalTypeLayout({ children }: { children: React.ReactNode }) {
  return children;
}
