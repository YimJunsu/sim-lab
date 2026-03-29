// 이상형 성향 테스트 페이지 — Suspense 래퍼 (Server Component)
// SEO 보장을 위해 Server Component로 래핑

import { Suspense } from 'react';
import IdealTypeTestClient from './IdealTypeTestClient';

// 로딩 스피너 — 테스트 클라이언트 로드 중
function TestLoading() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-rose-50 to-white">
      <div className="w-10 h-10 rounded-full border-4 border-rose-200 border-t-rose-500 animate-spin" />
    </div>
  );
}

export default function IdealTypeTestPage() {
  return (
    <Suspense fallback={<TestLoading />}>
      <IdealTypeTestClient />
    </Suspense>
  );
}
