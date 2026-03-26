// MBTI 결과 페이지 — Suspense 래퍼 (Server Component)
// generateMetadata: MBTI 유형별 동적 OG 메타태그 생성

import type { Metadata } from 'next';
import { Suspense } from 'react';
import MBTIResultClient from './MBTIResultClient';
import { MBTI_TYPES } from '@/data/mbti/mbti-data';

// Next.js 16 — searchParams는 Promise 타입
type Props = {
  searchParams: Promise<{ type?: string; e?: string; n?: string; t?: string; j?: string }>;
};

// MBTI 유형별 동적 메타태그 생성
export async function generateMetadata({ searchParams }: Props): Promise<Metadata> {
  const { type = '' } = await searchParams;
  const typeInfo = MBTI_TYPES[type.toUpperCase()];

  if (!typeInfo) {
    return {
      title: 'MBTI 테스트 결과 | 심랩',
      description: '심랩에서 나의 MBTI 유형을 확인해보세요.',
    };
  }

  const title = `나는 ${typeInfo.type} — ${typeInfo.title} | 심랩`;
  const description = `${typeInfo.description} 심랩에서 나도 테스트해봐!`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url: `https://simlab.kr/mbti/result?type=${typeInfo.type}`,
      images: [
        {
          url: '/og/simlab-default-og.png',
          width: 1200,
          height: 630,
          alt: `심랩 MBTI ${typeInfo.type}`,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: ['/og/simlab-default-og.png'],
    },
  };
}

function ResultLoading() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="w-10 h-10 rounded-full border-4 border-indigo-200 border-t-indigo-600 animate-spin" />
    </div>
  );
}

export default function MBTIResultPage() {
  return (
    <Suspense fallback={<ResultLoading />}>
      <MBTIResultClient />
    </Suspense>
  );
}
