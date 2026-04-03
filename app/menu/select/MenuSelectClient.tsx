'use client';

// 컨디션/카테고리 상세 선택 클라이언트 컴포넌트
// mode=condition: 10개 컨디션 태그 그리드 표시
// mode=category: 8개 카테고리 그리드 표시
// 선택 후 → 메뉴 추출 → 결과 페이지 이동

import { useState } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { ArrowLeft } from 'lucide-react';
import {
  ALL_CONDITIONS,
  ALL_CATEGORIES,
  getMenuByCondition,
  getMenuByCategory,
} from '@/lib/menu-utils';

export default function MenuSelectClient() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const mode = searchParams.get('mode') as 'condition' | 'category';
  const isConditionMode = mode === 'condition';

  const [selected, setSelected] = useState<string | null>(null);
  const [isNavigating, setIsNavigating] = useState(false);

  const items = isConditionMode ? ALL_CONDITIONS : ALL_CATEGORIES;

  const handleSelect = (itemId: string) => {
    if (isNavigating) return;
    setSelected(itemId);
    setIsNavigating(true);

    const menu = isConditionMode
      ? getMenuByCondition(itemId)
      : getMenuByCategory(itemId);

    if (!menu) {
      router.push(`/menu/result?menu=kimchi-jjigae&mode=${mode}&tag=${itemId}`);
      return;
    }

    setTimeout(() => {
      router.push(`/menu/result?menu=${menu.id}&mode=${mode}&tag=${itemId}`);
    }, 300);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white px-5 py-8 mobile-container mx-auto">

      {/* 뒤로가기 버튼 */}
      <button
        onClick={() => router.back()}
        className="flex items-center gap-1.5 text-gray-600 text-sm font-semibold mb-8 active:opacity-70"
        aria-label="이전 화면으로"
      >
        <ArrowLeft size={16} strokeWidth={2.5} />
        돌아가기
      </button>

      {/* 타이틀 */}
      <div className="mb-6">
        <h1 className="text-xl font-extrabold text-ink mb-1">
          {isConditionMode ? '지금 컨디션은 어때요?' : '어떤 메뉴가 당기세요?'}
        </h1>
        <p className="text-sm text-muted">
          {isConditionMode
            ? '컨디션을 선택하면 맞는 메뉴를 추천해드려요'
            : '원하는 종류를 선택해보세요'}
        </p>
      </div>

      {/* 선택 그리드 (2열) */}
      <div className="grid grid-cols-2 gap-3">
        {items.map((item) => {
          const isActive = selected === item.id;
          return (
            <button
              key={item.id}
              onClick={() => handleSelect(item.id)}
              disabled={isNavigating}
              className={`
                flex flex-col items-center justify-center gap-2
                rounded-2xl px-4 py-5 border-2 transition-all
                active:scale-[0.97]
                ${isActive
                  ? 'border-brand bg-gray-50 shadow-md'
                  : 'border-gray-200 bg-white hover:border-gray-300 hover:bg-gray-50'
                }
                ${isNavigating && !isActive ? 'opacity-50' : ''}
              `}
              aria-label={item.label}
              aria-pressed={isActive}
            >
              <span className="text-3xl leading-none">{item.emoji}</span>
              <span className={`text-xs font-bold text-center leading-snug ${isActive ? 'text-brand' : 'text-ink'}`}>
                {item.label}
              </span>
            </button>
          );
        })}
      </div>

      {/* 선택 안내 */}
      <p className="text-center text-xs text-gray-400 mt-6">
        하나를 선택하면 바로 메뉴가 추천됩니다
      </p>
    </div>
  );
}
