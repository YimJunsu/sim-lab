'use client'

import { useState, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import { ArrowRight, Sparkles } from 'lucide-react'
import CategorySelect from './CategorySelect'
import CardFanSelect from './CardFanSelect'
import CardReveal from './CardReveal'
import type { TarotCategory, TarotStep } from '@/types/tarot'

export default function TarotIntroClient() {
  const router = useRouter()

  const [step, setStep] = useState<TarotStep>('category')
  const [category, setCategory] = useState<TarotCategory | null>(null)
  const [selectedCardIds, setSelectedCardIds] = useState<number[]>([])

  const handleCardSelect = useCallback((cardId: number) => {
    setSelectedCardIds((prev) => {
      if (prev.includes(cardId)) return prev.filter((id) => id !== cardId)
      if (prev.length >= 3) return prev
      return [...prev, cardId]
    })
  }, [])

  const handleFanConfirm = useCallback(() => {
    if (selectedCardIds.length < 3) return
    setStep('reveal')
  }, [selectedCardIds])

  const handleRevealComplete = useCallback(() => {
    if (!category || selectedCardIds.length < 3) return
    router.push(`/tarot/result?cards=${selectedCardIds.join(',')}&category=${category}`)
  }, [category, selectedCardIds, router])

  if (step === 'reveal' && selectedCardIds.length === 3) {
    return (
      // body 배경(#eef2ff) 플래시 방지용 래퍼
      <div className="min-h-screen bg-[#09111F]">
        <CardReveal
          cardIds={selectedCardIds as [number, number, number]}
          category={category!}
          onComplete={handleRevealComplete}
        />
      </div>
    )
  }

  if (step === 'fan-select') {
    return (
      <div className="min-h-screen bg-[#09111F]">
        <CardFanSelect
          selectedIds={selectedCardIds}
          onCardSelect={handleCardSelect}
          onConfirm={handleFanConfirm}
        />
      </div>
    )
  }

  // ── 카테고리 선택 화면 ──
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#09111F] to-[#0D1A2A] px-5 pt-16 pb-10 flex flex-col">

      {/* 헤더 */}
      <div className="flex flex-col items-center text-center mb-12">
        <div className="w-14 h-14 rounded-2xl bg-[#C9A96E]/10 border border-[#C9A96E]/20 flex items-center justify-center mb-5">
          <Sparkles size={26} strokeWidth={1.3} className="text-[#C9A96E]" />
        </div>
        <h1 className="text-[22px] font-bold text-[#F0EBE0] tracking-tight mb-2">
          타로 상담
        </h1>
        <p className="text-sm text-[#F0EBE0]/38 leading-relaxed">
          3장의 카드로 지금의 흐름을 읽어드려요
        </p>
      </div>

      {/* 카테고리 선택 */}
      <CategorySelect selected={category} onSelect={setCategory} />

      {/* CTA */}
      <div className="mt-auto pt-10">
        <button
          onClick={() => setStep('fan-select')}
          disabled={!category}
          className={[
            'flex items-center justify-center gap-2 w-full py-4 rounded-2xl font-semibold text-[15px] transition-all duration-200 active:scale-[0.98]',
            category
              ? 'bg-[#C9A96E] text-[#09111F] shadow-lg shadow-[#C9A96E]/20'
              : 'bg-white/[0.04] text-[#F0EBE0]/20 cursor-not-allowed',
          ].join(' ')}
        >
          카드 뽑기
          <ArrowRight size={17} strokeWidth={2.2} />
        </button>

        <p className="text-center text-[10px] text-[#F0EBE0]/18 mt-5 leading-relaxed">
          본 콘텐츠는 오락 목적으로 제공되며 전문적인 심리 진단이 아닙니다.
        </p>
      </div>
    </div>
  )
}
