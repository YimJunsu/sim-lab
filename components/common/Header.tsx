'use client';

// Header — 심랩 공통 헤더
// 구조: 로고 + 햄버거 버튼
// 메뉴: 서비스소개 · 모든컨텐츠 (직접 링크) + 빠른서비스 · 테스트 (아코디언 드롭다운)

import Link from 'next/link';
import { useState } from 'react';
import {
  Brain,
  ChevronDown,
  FlaskConical,
  HeartHandshake,
  LayoutGrid,
  PawPrint,
  Shuffle,
  Smile,
  Sparkles,
  Utensils,
  Zap,
  type LucideIcon,
} from 'lucide-react';

// ── 직접 이동 링크 ──
const NAV_DIRECT = [
  { href: '/about',  Icon: FlaskConical, label: '서비스 소개' },
  { href: '/all',    Icon: LayoutGrid,   label: '모든 콘텐츠' },
];

// ── 아코디언 그룹 ──
const NAV_GROUPS = [
  {
    id: 'quick',
    Icon: Zap,
    label: '빠른 서비스',
    items: [
      { href: '/fortune',     Icon: Sparkles, label: 'AI 사주풀이' },
      { href: '/tarot',       Icon: Shuffle,  label: '심봉이 타로' },
      { href: '/menu/select', Icon: Utensils, label: '오늘 뭐 먹지?' },
    ],
  },
  {
    id: 'test',
    Icon: FlaskConical,
    label: '테스트',
    items: [
      { href: '/mymood',       Icon: Smile,         label: '감정 점수화' },
      { href: '/animal-type',  Icon: PawPrint,        label: '이상형 동물상 테스트' },
      { href: '/ideal-type',   Icon: HeartHandshake, label: '이상형 성향 테스트' },
      { href: '/mbti',         Icon: Brain,          label: 'MBTI 테스트' },
    ],
  },
];

// ── 아코디언 그룹 컴포넌트 ──
function NavGroup({
                    group,
                    onClose,
                  }: {
  group: (typeof NAV_GROUPS)[number];
  onClose: () => void;
}) {
  const [open, setOpen] = useState(false);
  const { Icon } = group;

  return (
      <li>
        {/* 그룹 헤더 버튼 */}
        <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            className="flex items-center gap-3 w-full px-3 py-2.5 rounded-lg text-ink hover:bg-bg-subtle hover:text-brand transition-colors text-sm font-medium cursor-pointer"
        >
          <Icon size={18} className="text-brand" strokeWidth={1.8} />
          <span className="flex-1 text-left">{group.label}</span>
          <ChevronDown
              size={16}
              className={`text-gray-400 transition-transform duration-200 ${open ? 'rotate-180' : ''}`}
          />
        </button>

        {/* 서브 아이템 */}
        {open && (
            <ul className="mt-0.5 ml-9 flex flex-col gap-0.5">
              {group.items.map((item) => {
                const SubIcon: LucideIcon = item.Icon;
                return (
                    <li key={item.href}>
                      <Link
                          href={item.href}
                          onClick={onClose}
                          className="flex items-center gap-2.5 px-3 py-2 rounded-lg text-gray-600 hover:bg-bg-subtle hover:text-brand transition-colors text-sm cursor-pointer"
                      >
                        <SubIcon size={15} strokeWidth={1.8} />
                        {item.label}
                      </Link>
                    </li>
                );
              })}
            </ul>
        )}
      </li>
  );
}

// ── 메인 헤더 ──
export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const close = () => setMenuOpen(false);

  return (
      <header className="sticky top-0 z-50 bg-white border-b border-border">
        <div className="mobile-container">
          <div className="flex items-center justify-between px-4 h-14">
            {/* 로고 */}
            <Link href="/" className="flex items-center gap-2 cursor-pointer" onClick={close}>
              <span className="text-2xl font-bold text-brand tracking-tight">심랩</span>
              <span className="text-xs text-muted font-medium hidden sm:block">SIMLAB</span>
            </Link>

            {/* 햄버거 버튼 */}
            <button
                onClick={() => setMenuOpen((v) => !v)}
                className="p-2 rounded-lg text-muted hover:bg-bg-subtle transition-colors cursor-pointer"
                aria-label={menuOpen ? '메뉴 닫기' : '메뉴 열기'}
                aria-expanded={menuOpen}
            >
              {menuOpen ? (
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                    <line x1="18" y1="6" x2="6" y2="18" />
                    <line x1="6" y1="6" x2="18" y2="18" />
                  </svg>
              ) : (
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                    <line x1="3" y1="6" x2="21" y2="6" />
                    <line x1="3" y1="12" x2="21" y2="12" />
                    <line x1="3" y1="18" x2="21" y2="18" />
                  </svg>
              )}
            </button>
          </div>
        </div>

        {/* 드롭다운 메뉴 */}
        {menuOpen && (
            <>
              {/* 배경 오버레이 */}
              <div
                  className="fixed inset-0 z-40 cursor-pointer"
                  onClick={close}
                  aria-hidden="true"
              />
              <div className="absolute top-full left-0 right-0 z-50 bg-white border-b border-border shadow-lg">
                <div className="mobile-container">
                  <nav className="px-4 py-3">
                    <ul className="flex flex-col gap-1">

                      {/* 직접 이동 링크 */}
                      {NAV_DIRECT.map((item) => {
                        const NavIcon: LucideIcon = item.Icon;
                        return (
                            <li key={item.href}>
                              <Link
                                  href={item.href}
                                  onClick={close}
                                  className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-ink hover:bg-bg-subtle hover:text-brand transition-colors text-sm font-medium cursor-pointer"
                              >
                                <NavIcon size={18} className="text-brand" strokeWidth={1.8} />
                                {item.label}
                              </Link>
                            </li>
                        );
                      })}

                      {/* 구분선 */}
                      <li aria-hidden="true">
                        <div className="my-1 border-t border-border" />
                      </li>

                      {/* 아코디언 그룹 */}
                      {NAV_GROUPS.map((group) => (
                          <NavGroup key={group.id} group={group} onClose={close} />
                      ))}

                    </ul>
                  </nav>
                </div>
              </div>
            </>
        )}
      </header>
  );
}