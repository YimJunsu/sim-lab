// MBTI 테스트 페이지 — Suspense 래퍼 (Server Component)

import { Suspense } from 'react';
import MBTITestClient from './MBTITestClient';

function TestLoading() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="w-10 h-10 rounded-full border-4 border-indigo-200 border-t-indigo-600 animate-spin" />
    </div>
  );
}

export default function MBTITestPage() {
  return (
    <Suspense fallback={<TestLoading />}>
      <MBTITestClient />
    </Suspense>
  );
}
