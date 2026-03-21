'use client';

// PopularCards (SecondHero) — 인기 콘텐츠 트럼프 카드 팬
// 2장의 카드가 V자 형태로 펼쳐지며, 뒷장 클릭 시 앞장으로 스왑
// 카드 크기: ContentGrid와 동일한 3:4 비율 (w-44 = 176px, h ≈ 236px)
// TODO: mock data → 추후 DB 연결 후 실제 인기도 데이터로 교체

import Link from 'next/link';
import { LucideIcon, Sparkles, Trophy, Utensils } from 'lucide-react';
import { type CSSProperties, useState } from 'react';

interface PopularItem {
  rank: number;
  title: string;
  Icon: LucideIcon;
  href: string;
  description: string;
  plays: string;
  gradient: string;
}

const POPULAR_ITEMS: PopularItem[] = [
  {
    rank: 1,
    title: 'AI 사주풀이',
    Icon: Sparkles,
    href: '/fortune',
    description: 'AI가 풀어주는 나의 운세',
    plays: '12,400',
    gradient: 'from-violet-600 via-purple-600 to-indigo-700',
  },
  {
    rank: 2,
    title: '오늘 뭐 먹지?',
    Icon: Utensils,
    href: '/menu/select',
    description: '기분에 맞는 메뉴 추천',
    plays: '9,800',
    gradient: 'from-orange-400 via-rose-400 to-red-500',
  },
];

// 카드 크기 상수 — ContentGrid aspect-[3/4]와 동일 비율 (176 * 4/3 ≈ 236)
const CARD_W = 176; // px, Tailwind w-44
const CARD_H = 236; // px, 3:4 비율

export default function PopularCards() {
  const [frontIndex, setFrontIndex] = useState(0);

  // V자 팬 — 하단 기준점(bottom center) 회전, 카드 중앙 정렬은 marginLeft로 명시
  const getCardStyle = (index: number): CSSProperties => {
    const isFront = index === frontIndex;
    return {
      position: 'absolute',
      bottom: 8,
      left: '50%',
      marginLeft: -CARD_W / 2,
      width: CARD_W,
      height: CARD_H,
      transform: isFront
        ? 'rotate(-10deg) scale(1.04)'
        : 'rotate(12deg) scale(0.96)',
      transformOrigin: 'bottom center',
      zIndex: isFront ? 2 : 1,
      transition: 'transform 0.45s cubic-bezier(0.34, 1.56, 0.64, 1)',
    };
  };

  return (
    <section className="px-5 py-8 bg-[#f9f8ff]">
      {/* 섹션 헤더 */}
      <div className="flex items-center gap-2 mb-6">
        <Trophy size={20} className="text-[#1A1A2E]" strokeWidth={2} />
        <h2 className="text-lg font-bold text-[#1A1A2E]">인기 콘텐츠</h2>
        <span className="ml-auto text-[10px] text-[#6B7280] bg-white border border-[#E5E7EB] px-2 py-0.5 rounded-full">
          mock · 업데이트 예정
        </span>
      </div>

      {/* V자 카드 팬 영역 */}
      <div className="relative h-[300px]">
        {POPULAR_ITEMS.map((item, index) => {
          const isFront = index === frontIndex;
          return (
            <div key={item.rank} style={getCardStyle(index)}>
              {isFront ? (
                /* 앞장 — Link로 이동 가능 */
                <Link
                  href={item.href}
                  className={`
                    relative block w-full h-full rounded-2xl bg-gradient-to-br ${item.gradient}
                    flex flex-col items-center justify-center
                    shadow-2xl shadow-black/20
                    hover:brightness-105 active:scale-95 transition-[filter,transform]
                    select-none cursor-pointer
                  `}
                >
                  <CardContent item={item} isFront />
                </Link>
              ) : (
                /* 뒷장 — 클릭 시 앞으로 스왑 */
                <button
                  type="button"
                  onClick={() => setFrontIndex(index)}
                  aria-label={`${item.title} 앞으로 가져오기`}
                  className={`
                    relative w-full h-full rounded-2xl bg-gradient-to-br ${item.gradient}
                    flex flex-col items-center justify-center
                    shadow-lg shadow-black/15
                    hover:brightness-110 active:scale-95 transition-[filter,transform]
                    select-none cursor-pointer
                  `}
                >
                  <CardContent item={item} isFront={false} />
                </button>
              )}
            </div>
          );
        })}
      </div>

      {/* 인터랙션 힌트 */}
      <p className="text-center text-xs text-[#6B7280] mt-4">
        뒤 카드를 탭하면 앞으로 와요 ✨ &nbsp;|&nbsp; 앞 카드 탭 시 이동
      </p>
    </section>
  );
}

// 카드 내부 콘텐츠 (앞/뒷장 공통)
function CardContent({
  item,
  isFront,
}: {
  item: PopularItem;
  isFront: boolean;
}) {
  const { Icon } = item;
  return (
    <>
      {/* 순위 배지 */}
      <span className="absolute top-3 left-3 bg-white/25 backdrop-blur-sm text-white text-[11px] font-extrabold px-2 py-0.5 rounded-full">
        #{item.rank}
      </span>

      {/* lucide-react 아이콘 */}
      <Icon size={60} className="text-white drop-shadow-lg mb-2" strokeWidth={1.5} />

      {/* 타이틀 */}
      <span className="text-white font-bold text-sm text-center px-3 leading-tight">
        {item.title}
      </span>

      {/* 설명 (앞장만 표시) */}
      {isFront && (
        <span className="text-white/80 text-xs mt-1 text-center px-3">
          {item.description}
        </span>
      )}

      {/* 이용자 수 (앞장만 표시) */}
      {isFront && (
        <span className="text-white/60 text-[10px] mt-2">
          {item.plays}명 이용
        </span>
      )}

      {/* 뒷장 힌트 */}
      {!isFront && (
        <span className="absolute bottom-3 text-white/55 text-[10px] font-medium">
          탭하여 앞으로 →
        </span>
      )}
    </>
  );
}
