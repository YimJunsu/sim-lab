// 오늘 뭐 먹지? 메인 페이지 — Server Component (SEO 보장)
// 구조: Suspense 래퍼 → MenuIntroClient (3버튼 선택 화면)

import { Suspense } from 'react';
import MenuIntroClient from './MenuIntroClient';

// 로딩 중 표시할 스켈레톤
function MenuIntroSkeleton() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-indigo-50 to-white px-5 py-10 flex flex-col animate-pulse">
      <div className="flex flex-col items-center mb-10">
        <div className="w-20 h-20 rounded-3xl bg-indigo-100 mb-5" />
        <div className="h-7 w-40 bg-indigo-100 rounded-xl mb-2" />
        <div className="h-4 w-56 bg-indigo-50 rounded-xl" />
      </div>
      <div className="flex flex-col gap-4">
        {[1, 2, 3].map((i) => (
          <div key={i} className="h-24 bg-indigo-50 rounded-2xl" />
        ))}
      </div>
    </div>
  );
}

export default function MenuPage() {
  return (
    <Suspense fallback={<MenuIntroSkeleton />}>
      <MenuIntroClient />
    </Suspense>
  );
}
