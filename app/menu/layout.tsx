// 오늘 뭐 먹지? 공통 레이아웃 — SEO Metadata 선언

import { Metadata } from 'next';

export const metadata: Metadata = {
  title: '오늘 뭐 먹지? | 컨디션에 맞는 메뉴 추천 — 심랩',
  description:
    '오늘 내 컨디션에 딱 맞는 메뉴를 찾아드려요. 숙취 해소, 다이어트, 스트레스 해소까지 — 지금 바로 뽑아보세요!',
  keywords: [
    '점심 메뉴 추천',
    '오늘 뭐 먹을까',
    '메뉴 추천',
    '숙취 해장 메뉴',
    '다이어트 메뉴 추천',
    '혼밥 메뉴',
    '메뉴 결정',
    '컨디션 맞춤 메뉴',
  ],
  openGraph: {
    title: '오늘 뭐 먹지? | 컨디션에 맞는 메뉴 추천',
    description: '룰렛으로 오늘 메뉴를 뽑아보세요!',
    images: ['/images/menu/cover.png'],
  },
};

export default function MenuLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
