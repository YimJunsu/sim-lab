'use client'

// 카드 공개 컴포넌트 — 탭 인터랙션으로 순서대로 공개 후 결과로 이동

import { useState } from 'react'
import { getTarotCardById, getTarotImageUrl } from '@/data/tarot/tarot-cards'
import type { TarotCategory } from '@/types/tarot'

interface CardRevealProps {
  cardIds: [number, number, number]   // [과거, 현재, 미래] 순서
  category: TarotCategory
  onComplete: () => void
}

const POSITION_LABELS = ['과거', '현재', '미래']

export default function CardReveal({ cardIds, category, onComplete }: CardRevealProps) {
  const [revealedCount, setRevealedCount] = useState(0)

  const handleTap = (index: number) => {
    if (index === revealedCount) {
      setRevealedCount(index + 1)
    }
  }

  const allRevealed = revealedCount === 3

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#09111F] to-[#0D1A2A] flex flex-col px-5 pt-12 pb-10">

      {/* 상단 힌트 + 카운터 */}
      <div className="flex items-center justify-between mb-8 shrink-0">
        <p className="text-xs text-[#F0EBE0]/45 font-medium tracking-wide transition-all duration-500">
          {!allRevealed ? '카드를 순서대로 탭해주세요' : '모든 카드가 공개되었습니다'}
        </p>
        <span className="text-xs font-bold text-[#C9A96E] tabular-nums">
          {revealedCount}/3
        </span>
      </div>

      {/* 카드 3장 */}
      <div className="flex gap-2 justify-center mb-10 shrink-0 px-1">
        {cardIds.map((cardId, index) => {
          const card = getTarotCardById(cardId)
          const isFlipped = revealedCount > index
          const isNext = index === revealedCount  // 다음 공개 대상

          return (
            <div key={cardId} className="flex flex-col items-center gap-2.5 flex-1 min-w-0">
              {/* 포지션 레이블 */}
              <span className="text-[10px] text-[#F0EBE0]/35 font-medium tracking-wide">
                {POSITION_LABELS[index]}
              </span>

              {/* 카드 flip 컨테이너 */}
              <div
                className={[
                  'relative tarot-card-wrapper w-full rounded-xl',
                  isNext ? 'cursor-pointer' : '',
                  isNext && !isFlipped ? 'ring-1 ring-[#C9A96E]/50' : '',
                ].join(' ')}
                style={{ aspectRatio: '2/3.5', minHeight: '280px' }}
                onClick={() => handleTap(index)}
              >
                <div className={`tarot-card-inner w-full h-full ${isFlipped ? 'flipped' : ''}`}>

                  {/* tarot-card-front = 초기 표시 → 뒷면 이미지 */}
                  <div className="tarot-card-front w-full h-full rounded-xl overflow-hidden shadow-lg">
                    <img
                      src="/images/tarot/card-back.svg"
                      alt=""
                      className="w-full h-full object-cover"
                    />
                  </div>

                  {/* tarot-card-back = flip 후 표시 → 실제 카드 앞면 */}
                  <div className="tarot-card-back w-full h-full rounded-xl overflow-hidden border border-[#C9A96E]/30 shadow-lg shadow-black/30">
                    {card ? (
                      <img
                        src={getTarotImageUrl(card.imageFile)}
                        alt={`${card.nameKo} 타로카드`}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          e.currentTarget.style.display = 'none'
                          e.currentTarget.nextElementSibling?.classList.remove('hidden')
                        }}
                      />
                    ) : null}
                    <div className="hidden w-full h-full bg-[#0D1A2A] flex items-center justify-center p-2">
                      <span className="text-[#C9A96E]/60 text-xs text-center leading-tight">
                        {card?.nameKo ?? ''}
                      </span>
                    </div>
                  </div>
                </div>

                {/* 탭 힌트 오버레이 — 다음 카드에만 표시 */}
                {isNext && !isFlipped && (
                  <div className="absolute inset-0 flex items-center justify-center z-10 pointer-events-none">
                    <span className="text-[10px] text-[#C9A96E] font-semibold bg-[#09111F]/70 px-2.5 py-1 rounded-full border border-[#C9A96E]/30">
                      탭
                    </span>
                  </div>
                )}
              </div>

              {/* 카드명 — 공개 후 */}
              <span
                className={[
                  'text-[11px] font-medium text-center transition-all duration-500 leading-tight px-1',
                  isFlipped ? 'text-[#F0EBE0]/60 opacity-100' : 'opacity-0',
                ].join(' ')}
              >
                {card?.nameKo ?? ''}
              </span>
            </div>
          )
        })}
      </div>

      {/* 결과 확인 버튼 — 전부 공개 후 */}
      <div
        className={[
          'w-full transition-all duration-500 shrink-0',
          allRevealed ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none',
        ].join(' ')}
      >
        <button
          onClick={onComplete}
          className="w-full py-4 rounded-2xl bg-[#C9A96E] text-[#09111F] font-bold text-[15px] shadow-lg shadow-[#C9A96E]/20 active:scale-[0.98] transition-transform"
        >
          결과 확인하기
        </button>
      </div>

      {/* 진행 도트 */}
      <div className="flex gap-2 mt-6 justify-center shrink-0">
        {[0, 1, 2].map((i) => (
          <div
            key={i}
            className={[
              'rounded-full transition-all duration-300',
              revealedCount > i
                ? 'w-4 h-1.5 bg-[#C9A96E]'
                : 'w-1.5 h-1.5 bg-[#F0EBE0]/15',
            ].join(' ')}
          />
        ))}
      </div>
    </div>
  )
}
