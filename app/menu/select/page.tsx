// 컨디션/카테고리 상세 선택 페이지 — Server Component (SEO 보장)
// useSearchParams는 Client 컴포넌트로 위임

import { Suspense } from 'react';
import MenuSelectClient from './MenuSelectClient';

// 로딩 스켈레톤
function MenuSelectSkeleton() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-indigo-50 to-white px-5 py-8 animate-pulse">
      <div className="h-6 w-32 bg-indigo-100 rounded-xl mb-8" />
      <div className="h-8 w-48 bg-indigo-100 rounded-xl mb-6" />
      <div className="grid grid-cols-2 gap-3">
        {Array.from({ length: 8 }).map((_, i) => (
          <div key={i} className="h-24 bg-indigo-50 rounded-2xl" />
        ))}
      </div>
    </div>
  );
}

export default function MenuSelectPage() {
  return (
    <Suspense fallback={<MenuSelectSkeleton />}>
      <MenuSelectClient />
    </Suspense>
  );
}
