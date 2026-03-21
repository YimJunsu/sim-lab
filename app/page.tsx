// 심랩 메인 페이지
// 구조: Hero → PopularCards(인기 콘텐츠 V자 카드) → ContentGrid(이미지 기반 카드 그리드)

import Hero from '@/components/home/Hero';
import PopularCards from '@/components/home/PopularCards';
import ContentGrid from '@/components/home/ContentGrid';

export default function Home() {
  return (
    <>
      {/* 1. 브랜드 헤드라인 + CTA */}
      <Hero />

      {/* 2. 인기 콘텐츠 — 트럼프 카드 V자 팬 (mock data, 추후 DB 교체) */}
      <PopularCards />

      {/* 3. 전체 콘텐츠 — 이미지 기반 2열/3열 카드 그리드 */}
      <ContentGrid />
    </>
  );
}
