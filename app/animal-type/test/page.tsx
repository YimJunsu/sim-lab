// 이상형 동물상 테스트 페이지 — Suspense 래퍼 (Server Component)

import { Suspense } from 'react';
import AnimalTypeTestClient from './AnimalTypeTestClient';

function TestLoading() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="w-10 h-10 rounded-full border-4 border-pink-200 border-t-pink-500 animate-spin" />
    </div>
  );
}

export default function AnimalTypeTestPage() {
  return (
    <Suspense fallback={<TestLoading />}>
      <AnimalTypeTestClient />
    </Suspense>
  );
}
