// 이상형 동물상 결과 페이지 — Suspense 래퍼 + 동적 SEO 메타 (Server Component)

import { Suspense } from 'react';
import type { Metadata } from 'next';
import { ANIMAL_DATA } from '@/data/animal-type/animal-type-data';
import AnimalTypeResultClient from './AnimalTypeResultClient';

interface Props {
  searchParams: Promise<{ gender?: string; result?: string }>;
}

export async function generateMetadata({ searchParams }: Props): Promise<Metadata> {
  const params = await searchParams;
  const animal = params.result ? ANIMAL_DATA[params.result] : null;

  if (!animal) {
    return { title: '이상형 동물상 결과 | 심랩' };
  }

  return {
    title: `내 이상형은 ${animal.name}! — 이상형 동물상 테스트`,
    description: `${animal.summary} ${animal.keywords.join(' · ')} — 나의 이상형 동물상 결과를 확인해보세요!`,
    openGraph: {
      title: `내 이상형은 ${animal.name}! ${animal.emoji}`,
      description: `${animal.summary} — 이상형 동물상 테스트 결과`,
      images: [{ url: '/og/simlab-default-og.png', width: 1200, height: 630 }],
    },
    twitter: {
      card: 'summary_large_image',
      title: `내 이상형은 ${animal.name}! ${animal.emoji}`,
      description: animal.summary,
    },
  };
}

function ResultLoading() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="w-10 h-10 rounded-full border-4 border-pink-200 border-t-pink-500 animate-spin" />
    </div>
  );
}

export default function AnimalTypeResultPage() {
  return (
    <Suspense fallback={<ResultLoading />}>
      <AnimalTypeResultClient />
    </Suspense>
  );
}
