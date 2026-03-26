'use client'

import { Heart, Briefcase, Sun, MessageCircle, LucideIcon } from 'lucide-react'
import type { TarotCategory } from '@/types/tarot'

interface CategorySelectProps {
  selected: TarotCategory | null
  onSelect: (category: TarotCategory) => void
}

const CATEGORIES: Array<{ id: TarotCategory; Icon: LucideIcon; label: string; desc: string }> = [
  { id: 'love',   Icon: Heart,         label: '연애',      desc: '관계와 감정' },
  { id: 'career', Icon: Briefcase,     label: '커리어',    desc: '일과 방향' },
  { id: 'daily',  Icon: Sun,           label: '오늘의 운', desc: '지금 이 순간' },
  { id: 'etc',    Icon: MessageCircle, label: '그 외',     desc: '다른 고민들' },
]

export default function CategorySelect({ selected, onSelect }: CategorySelectProps) {
  return (
    <div className="w-full">
      <p className="text-[10px] font-medium text-[#C9A96E]/55 mb-4 uppercase tracking-[0.18em] text-center">
        주제 선택
      </p>
      <div className="grid grid-cols-2 gap-2.5">
        {CATEGORIES.map(({ id, Icon, label, desc }) => {
          const isSelected = selected === id
          return (
            <button
              key={id}
              onClick={() => onSelect(id)}
              className={[
                'flex items-center gap-3 px-4 py-3.5 rounded-xl border transition-all duration-200 active:scale-[0.97] text-left',
                isSelected
                  ? 'bg-[#C9A96E]/10 border-[#C9A96E]/40'
                  : 'bg-white/[0.03] border-white/[0.07] hover:bg-white/[0.055]',
              ].join(' ')}
            >
              <Icon
                size={17}
                strokeWidth={1.6}
                className={isSelected ? 'text-[#C9A96E]' : 'text-[#F0EBE0]/30'}
              />
              <div>
                <p className={`text-sm font-semibold leading-tight ${isSelected ? 'text-[#C9A96E]' : 'text-[#F0EBE0]/70'}`}>
                  {label}
                </p>
                <p className="text-[10px] text-[#F0EBE0]/28 leading-tight mt-0.5">{desc}</p>
              </div>
            </button>
          )
        })}
      </div>
    </div>
  )
}
