'use client'

// 타로 결과 클라이언트 컴포넌트
// URL 파라미터: cards (예: '0,7,18'), category (예: 'love')
// 구조: 카드 3장 + 포지션 해설 → 심봉이 종합 메시지 → 공유 버튼 → 추천 콘텐츠

import { useState, useCallback } from 'react'
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { RotateCcw, Link2, Check, Quote, Brain, Home, Sparkles } from 'lucide-react'
import { getTarotCardById, getTarotImageUrl } from '@/data/tarot/tarot-cards'
import { getTarotSummary, CATEGORY_LABELS, POSITION_LABELS } from '@/data/tarot/taro-result'
import type { TarotCategory } from '@/types/tarot'

// 유효한 카테고리 목록
const VALID_CATEGORIES: TarotCategory[] = ['love', 'career', 'daily', 'etc']

export default function TarotResultClient() {
  const searchParams = useSearchParams()
  const [copied, setCopied] = useState(false)

  // URL 파라미터 파싱
  const cardsParam = searchParams.get('cards') ?? ''
  const categoryParam = searchParams.get('category') ?? ''

  // cardIds 파싱 및 유효성 검증
  const cardIds = cardsParam.split(',').map(Number)
  const isValid =
    cardIds.length === 3 &&
    cardIds.every((id) => Number.isInteger(id) && id >= 0 && id <= 21) &&
    new Set(cardIds).size === 3 &&
    VALID_CATEGORIES.includes(categoryParam as TarotCategory)

  // 유효하지 않은 파라미터 — 에러 UI 표시
  if (!isValid) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-[#09111F] to-[#0D1A2A] flex flex-col items-center justify-center px-5">
        <p className="text-[#F0EBE0]/45 text-sm mb-4">카드 정보가 올바르지 않아요.</p>
        <Link href="/tarot" className="text-[#C9A96E] text-sm font-semibold">
          다시 뽑기
        </Link>
      </div>
    )
  }

  const category = categoryParam as TarotCategory
  const [pastId, presentId, futureId] = cardIds

  // taro-result.ts에서 해설 조회
  const summary = getTarotSummary(pastId, presentId, futureId, category)
  const readings = [summary.pastReading, summary.presentReading, summary.futureReading]
  const positionKeys = ['past', 'present', 'future'] as const

  // 링크 복사 핸들러
  const handleCopyLink = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(window.location.href)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      // clipboard API 미지원 시 무시
    }
  }, [])

  // 카카오톡 공유 핸들러
  const handleKakaoShare = useCallback(() => {
    // TODO: 카카오 SDK 연동 — 우선 링크 복사로 대체
    handleCopyLink()
  }, [handleCopyLink])

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#09111F] to-[#0D1A2A] px-5 py-8 flex flex-col">

      {/* 헤더 */}
      <div className="flex flex-col items-center text-center mb-6">
        <div className="flex items-center gap-1.5 mb-3">
          <Sparkles size={13} strokeWidth={1.5} className="text-[#C9A96E]/60" />
          <p className="text-[10px] font-medium text-[#C9A96E]/55 uppercase tracking-[0.18em]">
            타로 결과
          </p>
          <Sparkles size={13} strokeWidth={1.5} className="text-[#C9A96E]/60" />
        </div>
        <span className="inline-block px-3 py-1 rounded-full bg-[#C9A96E]/12 text-[#C9A96E] text-xs font-semibold border border-[#C9A96E]/20">
          {CATEGORY_LABELS[category]}
        </span>
      </div>

      {/* 카드 + 해설 통합 블록 */}
      <div className="flex flex-col gap-3 mb-5">
        {cardIds.map((cardId, index) => {
          const card = getTarotCardById(cardId)
          const positionKey = positionKeys[index]
          const reading = readings[index]

          return (
            <div
              key={cardId}
              className="flex gap-3.5 bg-white/[0.03] rounded-2xl p-3.5 border border-white/[0.06]"
            >
              {/* 카드 썸네일 */}
              <div className="flex-shrink-0 w-[78px]">
                <div className="w-full aspect-[2/3.5] rounded-lg overflow-hidden border border-[#C9A96E]/20 bg-[#0D1A2A] relative">
                  {card && (
                    <img
                      src={getTarotImageUrl(card.imageFile)}
                      alt={`${card.nameKo} 타로카드`}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.currentTarget.style.display = 'none'
                        const fallback = e.currentTarget.nextElementSibling as HTMLElement | null
                        if (fallback) fallback.classList.remove('hidden')
                      }}
                    />
                  )}
                  <div className="hidden absolute inset-0 flex items-center justify-center p-1">
                    <span className="text-[#C9A96E]/50 text-[8px] text-center leading-tight">
                      {card?.nameKo}
                    </span>
                  </div>
                </div>
              </div>

              {/* 해설 */}
              <div className="flex-1 min-w-0 py-0.5">
                <p className="text-[11px] text-[#C9A96E]/85 font-semibold mb-2 tracking-wide">
                  {POSITION_LABELS[positionKey]} · {card?.nameKo}
                </p>
                <p className="text-[13px] text-[#F0EBE0]/65 leading-relaxed">{reading}</p>
              </div>
            </div>
          )
        })}
      </div>

      {/* 종합 메시지 */}
      <div className="bg-[#C9A96E]/[0.07] rounded-2xl px-5 py-4 border border-[#C9A96E]/15 mb-5">
        <div className="flex items-center gap-1.5 mb-2.5">
          <Quote size={13} strokeWidth={1.8} className="text-[#C9A96E]/70" />
          <p className="text-[10px] text-[#C9A96E]/70 font-semibold tracking-wide">종합 메시지</p>
        </div>
        <p className="text-sm text-[#F0EBE0]/80 leading-relaxed mb-2.5">
          {summary.categoryMessage}
        </p>
        <p className="text-xs text-[#F0EBE0]/40 leading-relaxed">
          {summary.combinationMessage}
        </p>
      </div>

      {/* 공유 버튼 */}
      <div className="flex gap-3 mb-4">
        <button
          onClick={handleKakaoShare}
          className="flex-1 py-3.5 rounded-2xl bg-[#FEE500] text-[#3C1E1E] text-sm font-bold active:scale-[0.98] transition-transform"
        >
          카카오톡 공유
        </button>
        <button
          onClick={handleCopyLink}
          className="flex items-center justify-center gap-1.5 flex-1 py-3.5 rounded-2xl bg-white/[0.06] text-[#F0EBE0]/70 text-sm font-medium active:scale-[0.98] transition-all border border-white/[0.07]"
        >
          {copied ? (
            <>
              <Check size={14} />
              복사됨
            </>
          ) : (
            <>
              <Link2 size={14} />
              링크 복사
            </>
          )}
        </button>
      </div>

      {/* 다시 뽑기 */}
      <Link
        href="/tarot"
        className="flex items-center justify-center gap-2 w-full py-3.5 rounded-2xl border border-[#F0EBE0]/10 text-[#F0EBE0]/40 text-sm font-medium mb-8 active:scale-[0.98] transition-transform"
      >
        <RotateCcw size={14} />
        다시 뽑기
      </Link>

      {/* 이미지 출처 */}
      <p className="text-[9px] text-[#F0EBE0]/20 text-center mb-6 leading-relaxed">
        카드 이미지: Rider-Waite Tarot (1909) · A.E. Waite &amp; P.C. Smith
      </p>

      {/* 다른 콘텐츠 */}
      <div>
        <p className="text-[10px] text-[#F0EBE0]/25 font-medium mb-3 text-center uppercase tracking-[0.15em]">
          다른 콘텐츠
        </p>
        <div className="flex gap-3">
          <Link
            href="/mbti"
            className="flex items-center justify-center gap-1.5 flex-1 py-3 rounded-2xl bg-white/[0.03] border border-white/[0.07] text-[#F0EBE0]/45 text-xs font-medium active:scale-[0.98] transition-transform"
          >
            <Brain size={13} strokeWidth={1.6} />
            MBTI 테스트
          </Link>
          <Link
            href="/"
            className="flex items-center justify-center gap-1.5 flex-1 py-3 rounded-2xl bg-white/[0.03] border border-white/[0.07] text-[#F0EBE0]/45 text-xs font-medium active:scale-[0.98] transition-transform"
          >
            <Home size={13} strokeWidth={1.6} />
            홈으로
          </Link>
        </div>
      </div>
    </div>
  )
}
