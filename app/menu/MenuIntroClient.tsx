'use client';

// 오늘 뭐 먹지? 인트로 클라이언트 컴포넌트
// 역할: 3가지 모드 선택 버튼 표시 (컨디션 추천 / 메뉴별 고르기 / 완전 랜덤)
// 완전 랜덤 선택 시 즉시 랜덤 메뉴 추출 후 결과 페이지로 이동

import { useRouter } from 'next/navigation';
import { Smile, UtensilsCrossed, Shuffle, ChevronRight } from 'lucide-react';
import { getRandomMenu } from '@/lib/menu-utils';

// 모드 선택 버튼 데이터
const MODE_BUTTONS = [
  {
    id: 'condition',
    icon: Smile,
    title: '컨디션에 맞는 추천',
    desc: '지금 내 상태에 딱 맞는 메뉴를 찾아드려요',
    href: '/menu/select?mode=condition',
    isRandom: false,
  },
  {
    id: 'category',
    icon: UtensilsCrossed,
    title: '메뉴별로 고르기',
    desc: '한식, 양식, 중식 등 원하는 종류로 선택',
    href: '/menu/select?mode=category',
    isRandom: false,
  },
  {
    id: 'random',
    icon: Shuffle,
    title: '완전 랜덤',
    desc: '고민 없이 바로 뽑아드려요!',
    href: null, // 클릭 시 즉시 랜덤 추출
    isRandom: true,
  },
] as const;

export default function MenuIntroClient() {
  const router = useRouter();

  // 버튼 클릭 핸들러 — 완전 랜덤은 즉시 메뉴 추출 후 이동
  const handleModeSelect = (mode: typeof MODE_BUTTONS[number]) => {
    if (mode.isRandom) {
      // 클라이언트에서 랜덤 메뉴 추출 후 결과 페이지로 바로 이동
      const randomMenu = getRandomMenu();
      router.push(`/menu/result?menu=${randomMenu.id}&mode=random`);
    } else {
      router.push(mode.href!);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-indigo-50 to-white px-5 py-10 flex flex-col mobile-container mx-auto">

      {/* 헤더 섹션 — 아이콘 + 타이틀 + 슬로건 */}
      <div className="flex flex-col items-center text-center mb-10">
        <div className="w-20 h-20 rounded-3xl bg-brand flex items-center justify-center shadow-lg mb-5">
          <UtensilsCrossed size={38} className="text-white" strokeWidth={1.5} />
        </div>
        <h1 className="text-2xl font-extrabold text-ink mb-2">오늘 뭐 먹지?</h1>
        <p className="text-sm text-muted leading-relaxed">
          컨디션에 맞는 메뉴를 찾아드려요
          <br />
          지금 바로 뽑아보세요!
        </p>
      </div>

      {/* 모드 선택 버튼 3개 */}
      <div className="flex flex-col gap-4 mb-8">
        {MODE_BUTTONS.map((mode) => {
          const Icon = mode.icon;
          return (
            <button
              key={mode.id}
              onClick={() => handleModeSelect(mode)}
              className="flex items-center gap-4 bg-white rounded-2xl px-5 py-5 shadow-sm border-2 border-indigo-100 hover:border-brand hover:bg-indigo-50 active:scale-[0.98] transition-all text-left"
              aria-label={mode.title}
            >
              {/* 아이콘 */}
              <div className="w-12 h-12 rounded-xl bg-indigo-50 flex items-center justify-center flex-shrink-0">
                <Icon size={24} className="text-indigo-600" strokeWidth={1.8} />
              </div>
              {/* 텍스트 */}
              <div className="flex-1">
                <p className="text-sm font-bold text-ink">{mode.title}</p>
                <p className="text-xs text-muted mt-0.5">{mode.desc}</p>
              </div>
              {/* 화살표 */}
              <ChevronRight size={18} className="text-indigo-400 flex-shrink-0" />
            </button>
          );
        })}
      </div>

      {/* 안내 문구 */}
      <p className="text-center text-xs text-gray-400 leading-relaxed">
        메뉴 결정을 도와드릴게요. 결과는 참고용이에요 😊
      </p>

      {/* 면책 고지 */}
      <p className="text-center text-[10px] text-gray-400 mt-auto pt-8">
        본 서비스는 오락 목적으로 제공됩니다. 개인 정보는 수집·저장되지 않습니다.
      </p>
    </div>
  );
}
