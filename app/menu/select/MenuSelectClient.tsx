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

  // URL 파라미터로 모드 구분 (condition / category)
  const mode = searchParams.get('mode') as 'condition' | 'category';
  const isConditionMode = mode === 'condition';

  // 선택된 항목 ID 상태
  const [selected, setSelected] = useState<string | null>(null);
  const [isNavigating, setIsNavigating] = useState(false);

  // 표시할 데이터 — 모드에 따라 컨디션 또는 카테고리
  const items = isConditionMode ? ALL_CONDITIONS : ALL_CATEGORIES;

  // 항목 선택 핸들러 — 선택 후 0.3초 딜레이로 결과 페이지 이동
  const handleSelect = (itemId: string) => {
    if (isNavigating) return;
    setSelected(itemId);
    setIsNavigating(true);

    // 선택된 항목에 해당하는 메뉴 추출
    const menu = isConditionMode
      ? getMenuByCondition(itemId)
      : getMenuByCategory(itemId);

    // 메뉴 추출 실패 시 전체 랜덤으로 폴백
    if (!menu) {
      router.push(`/menu/result?menu=kimchi-jjigae&mode=${mode}&tag=${itemId}`);
      return;
    }

    // 선택 피드백 후 결과 페이지로 이동
    setTimeout(() => {
      router.push(`/menu/result?menu=${menu.id}&mode=${mode}&tag=${itemId}`);
    }, 300);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-indigo-50 to-white px-5 py-8 mobile-container mx-auto">

      {/* 뒤로가기 버튼 */}
      <button
        onClick={() => router.back()}
        className="flex items-center gap-1.5 text-indigo-600 text-sm font-semibold mb-8 active:opacity-70"
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
                  ? 'border-brand bg-indigo-50 shadow-md'
                  : 'border-indigo-100 bg-white hover:border-indigo-300 hover:bg-indigo-50'
                }
                ${isNavigating && !isActive ? 'opacity-50' : ''}
              `}
              aria-label={item.label}
              aria-pressed={isActive}
            >
              {/* 이모지 */}
              <span className="text-3xl leading-none">{item.emoji}</span>
              {/* 레이블 */}
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
