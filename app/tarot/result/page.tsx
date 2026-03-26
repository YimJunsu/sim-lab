// 타로 결과 페이지 (Server Component)
// URL: /tarot/result?cards=0,7,18&category=love
// generateMetadata: 카드 3장 이름 기반 동적 OG 태그 생성

import type { Metadata } from 'next'
import { Suspense } from 'react'
import { redirect } from 'next/navigation'
import TarotResultClient from '@/components/tarot/TarotResultClient'
import { getTarotCardById } from '@/data/tarot/tarot-cards'
import { CATEGORY_LABELS } from '@/data/tarot/taro-result'
import type { TarotCategory } from '@/types/tarot'

// Next.js 15+ — searchParams는 Promise 타입
type Props = {
  searchParams: Promise<{ cards?: string; category?: string }>
}

// 유효한 카테고리 목록
const VALID_CATEGORIES: TarotCategory[] = ['love', 'career', 'daily', 'etc']

// 쿼리스트링 유효성 검증 함수
function parseAndValidate(
  cardsParam: string | undefined,
  categoryParam: string | undefined
): { cardIds: [number, number, number]; category: TarotCategory } | null {
  if (!cardsParam || !categoryParam) return null
  if (!VALID_CATEGORIES.includes(categoryParam as TarotCategory)) return null

  const cardIds = cardsParam.split(',').map(Number)
  if (
    cardIds.length !== 3 ||
    cardIds.some((id) => !Number.isInteger(id) || id < 0 || id > 21) ||
    new Set(cardIds).size !== 3
  ) {
    return null
  }

  return {
    cardIds: cardIds as [number, number, number],
    category: categoryParam as TarotCategory,
  }
}

// 카드 3장 이름 기반 동적 메타태그 생성
export async function generateMetadata({ searchParams }: Props): Promise<Metadata> {
  const { cards, category } = await searchParams
  const parsed = parseAndValidate(cards, category)

  if (!parsed) {
    return {
      title: '타로 결과 | 심봉이의 타로상담소',
      description: '심봉이의 타로상담소에서 카드를 뽑아보세요.',
    }
  }

  const cardNames = parsed.cardIds
    .map((id) => getTarotCardById(id)?.nameKo ?? '')
    .join(', ')
  const categoryLabel = CATEGORY_LABELS[parsed.category]

  const title = `${categoryLabel} 타로 결과 | ${cardNames} | 심랩`
  const description = `${cardNames} 카드가 나왔어요. 심봉이의 해석을 확인해보세요!`
  const ogImageUrl = `/api/og?type=tarot&cards=${cards}&category=${category}`

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      images: [{ url: ogImageUrl, width: 1200, height: 630 }],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [ogImageUrl],
    },
  }
}

// 결과 로딩 fallback
function ResultLoading() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#1A0A2E] to-[#2D1B4E] flex items-center justify-center">
      <div className="w-10 h-10 rounded-full border-4 border-[#C084FC]/20 border-t-[#C084FC] animate-spin" />
    </div>
  )
}

export default async function TarotResultPage({ searchParams }: Props) {
  const { cards, category } = await searchParams
  const parsed = parseAndValidate(cards, category)

  // 유효하지 않은 파라미터 → 진입 페이지로 리다이렉트
  if (!parsed) {
    redirect('/tarot')
  }

  return (
    <Suspense fallback={<ResultLoading />}>
      <TarotResultClient />
    </Suspense>
  )
}
