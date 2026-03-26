'use client'

import { useState } from 'react'
import { TAROT_CARDS } from '@/data/tarot/tarot-cards'

interface CardFanSelectProps {
  selectedIds: number[]
  onCardSelect: (cardId: number) => void
  onConfirm: () => void
}

const TOTAL_ANGLE = 180
const CARD_COUNT = TAROT_CARDS.length  // 22

// 남은 카드 수에 따라 이미지 교체
const PICKUP_IMAGES = [
  'pickup3.png',  // 0 선택 → 3장 남음
  'pickup2.png',  // 1 선택 → 2장 남음
  'pickup1.png',  // 2 선택 → 1장 남음
  'pickup0.png',  // 3 선택 → 완료
]

export default function CardFanSelect({
  selectedIds,
  onCardSelect,
  onConfirm,
}: CardFanSelectProps) {
  const [hoveredId, setHoveredId] = useState<number | null>(null)

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#09111F] to-[#0D1A2A] flex flex-col">

      {/* ── 헤더 ── */}
      <div className="flex items-center justify-between pt-8 pb-3 px-5 shrink-0">
        <p className="text-[10px] font-medium text-[#F0EBE0]/35 uppercase tracking-[0.18em]">
          카드 선택
        </p>
        <div className="flex items-center gap-1.5">
          {[1, 2, 3].map((n) => (
            <div
              key={n}
              className={[
                'h-1 rounded-full transition-all duration-300',
                selectedIds.length >= n
                  ? 'w-6 bg-[#C9A96E]'
                  : 'w-1 bg-[#F0EBE0]/15',
              ].join(' ')}
            />
          ))}
        </div>
      </div>

      {/* ── 심봉이 이미지 (말풍선 내장) — 크로스페이드 전환 ── */}
      <div className="flex justify-center shrink-0 pb-2 px-5">
        <div
          className="relative rounded-3xl overflow-hidden shadow-[0_8px_32px_rgba(0,0,0,0.5)]"
          style={{ width: '230px', aspectRatio: '1024/1536' }}
        >
          {PICKUP_IMAGES.map((src, i) => (
            <img
              key={src}
              src={`/images/tarot/${src}`}
              alt={i === 0 ? '심봉이' : ''}
              className="absolute inset-0 w-full h-full object-cover"
              style={{
                opacity: i === selectedIds.length ? 1 : 0,
                transition: 'opacity 0.35s ease',
              }}
            />
          ))}
        </div>
      </div>

      {/* ── 부채꼴 카드 영역 ──
          top-0 배치 → 말풍선 없이 헤더 바로 아래에서 시작
          pivot(transform-origin center 200px)이 container 아래에 위치 */}
      <div
        className="relative w-full flex justify-center shrink-0"
        style={{ height: '210px' }}
      >
        {TAROT_CARDS.map((card, index) => {
          const angle = -TOTAL_ANGLE / 2 + (TOTAL_ANGLE / (CARD_COUNT - 1)) * index
          const isSelected = selectedIds.includes(card.id)
          const isHovered = hoveredId === card.id
          const isDisabled = selectedIds.length >= 3 && !isSelected

          let translateY = 0
          if (isSelected) translateY = -14
          else if (isHovered && !isDisabled) translateY = -18

          return (
            <button
              key={card.id}
              onClick={() => !isDisabled && onCardSelect(card.id)}
              onMouseEnter={() => !isDisabled && setHoveredId(card.id)}
              onMouseLeave={() => setHoveredId(null)}
              disabled={isDisabled}
              className={[
                'tarot-fan-card w-12 h-[72px] rounded-lg border-2 shadow-lg',
                'relative overflow-hidden',
                isSelected
                  ? 'ring-2 ring-[#C9A96E] border-[#C9A96E]'
                  : 'border-[#C9A96E]/20',
                isDisabled ? 'opacity-25 cursor-not-allowed' : 'cursor-pointer',
              ].join(' ')}
              style={{
                position: 'absolute',
                top: 0,
                left: '50%',
                transformOrigin: 'center 200px',
                transform: `translateX(-50%) rotate(${angle}deg) translateY(${translateY}px)`,
              }}
              aria-label={`카드 ${index + 1} 선택`}
            >
              <img
                src="/images/tarot/card-back.svg"
                alt=""
                className="absolute inset-0 w-full h-full object-cover pointer-events-none"
                aria-hidden="true"
              />
              {isSelected && (
                <div className="absolute inset-0 bg-[#C9A96E]/25 pointer-events-none" />
              )}
            </button>
          )
        })}
      </div>

      {/* ── 하단: 선택 현황 + 버튼 ──
          gradient top이 부채꼴 오버플로우 카드를 자연스럽게 마스킹 */}
      <div
        className="shrink-0 w-full px-5 pb-8 flex flex-col items-center gap-4"
        style={{
          paddingTop: '28px',
          background: 'linear-gradient(to bottom, transparent 0px, #09111F 64px)',
        }}
      >
        {/* 선택 현황 */}
        <div className="flex items-center gap-2.5">
          {[1, 2, 3].map((n) => (
            <div
              key={n}
              className={[
                'w-9 h-9 rounded-full border-2 flex items-center justify-center',
                'text-xs font-bold transition-all duration-300',
                selectedIds.length >= n
                  ? 'bg-[#C9A96E] border-[#C9A96E] text-[#09111F]'
                  : 'bg-transparent border-[#F0EBE0]/15 text-[#F0EBE0]/25',
              ].join(' ')}
            >
              {n}
            </div>
          ))}
          <span className="text-[#F0EBE0]/30 text-xs ml-0.5">
            {selectedIds.length}/3
          </span>
        </div>

        {/* 확인 버튼 */}
        <button
          onClick={onConfirm}
          disabled={selectedIds.length < 3}
          className={[
            'w-full py-4 rounded-2xl font-semibold text-[15px] transition-all duration-200',
            selectedIds.length === 3
              ? 'bg-[#C9A96E] text-[#09111F] shadow-lg shadow-[#C9A96E]/15 active:scale-[0.98]'
              : 'bg-white/[0.04] text-[#F0EBE0]/18 cursor-not-allowed',
          ].join(' ')}
        >
          {selectedIds.length === 3 ? '카드 확인하기' : '3장을 선택해주세요'}
        </button>
      </div>
    </div>
  )
}
