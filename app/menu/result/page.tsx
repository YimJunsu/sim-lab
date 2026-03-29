// 메뉴 결과 페이지 — Server Component (SEO 보장)
// useSearchParams는 Client 컴포넌트로 위임

import { Suspense } from 'react';
import MenuResultClient from './MenuResultClient';

// 로딩 스켈레톤 (룰렛 시작 전 표시)
function MenuResultSkeleton() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-brand to-indigo-800 flex flex-col items-center justify-center px-5">
      <div className="text-white text-lg font-bold mb-4">메뉴가 생성중이에요!</div>
      <div className="flex gap-1.5">
        {[0, 1, 2].map((i) => (
          <div
            key={i}
            className="w-2 h-2 rounded-full bg-white/60 animate-bounce"
            style={{ animationDelay: `${i * 0.15}s` }}
          />
        ))}
      </div>
    </div>
  );
}

export default function MenuResultPage() {
  return (
    <Suspense fallback={<MenuResultSkeleton />}>
      <MenuResultClient />
    </Suspense>
  );
}
