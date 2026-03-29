// 이상형 성향 테스트 결과 페이지 — Suspense 래퍼 + 동적 SEO (Server Component)
// type query param 기반으로 동적 메타데이터 생성

import { Suspense } from 'react';
import type { Metadata } from 'next';
import { IDEAL_TYPE_DATA, type IdealTypeId } from '@/data/ideal-type/ideal-type-data';
import IdealTypeResultClient from './IdealTypeResultClient';

interface Props {
  searchParams: Promise<{ type?: string }>;
}

// 결과 유형에 따른 동적 메타데이터
export async function generateMetadata({ searchParams }: Props): Promise<Metadata> {
  const params = await searchParams;
  const info = params.type ? IDEAL_TYPE_DATA[params.type as IdealTypeId] : null;

  if (!info) {
    return { title: '이상형 성향 테스트 결과 | 심랩' };
  }

  return {
    title: `내 이상형은 ${info.name}! — 이상형 성향 테스트 | 심랩`,
    description: `${info.summary} ${info.keywords.join(' · ')} — 나의 이상형 성향 결과를 확인해보세요!`,
    openGraph: {
      title: `내 이상형은 ${info.name}! ${info.emoji}`,
      description: `${info.summary} — 이상형 성향 테스트 결과`,
      images: [{ url: '/og/simlab-default-og.png', width: 1200, height: 630 }],
    },
    twitter: {
      card: 'summary_large_image',
      title: `내 이상형은 ${info.name}! ${info.emoji}`,
      description: info.summary,
    },
  };
}

// 결과 로딩 스피너
function ResultLoading() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-rose-50 to-white">
      <div className="w-10 h-10 rounded-full border-4 border-rose-200 border-t-rose-500 animate-spin" />
    </div>
  );
}

export default function IdealTypeResultPage() {
  return (
    <Suspense fallback={<ResultLoading />}>
      <IdealTypeResultClient />
    </Suspense>
  );
}
