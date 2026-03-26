import type { Metadata } from 'next';
import Link from 'next/link';
import {
  Brain,
  FlaskConical,
  HeartHandshake,
  Lock,
  LucideIcon,
  PawPrint,
  Shuffle,
  Smile,
  Sparkles,
  Utensils,
} from 'lucide-react';

export const metadata: Metadata = {
  title: '전체 콘텐츠',
  description: '심랩의 모든 콘텐츠를 한눈에 — AI 사주, 메뉴 추천, 심리 테스트 등 9가지 서비스.',
};

// ── 활성 콘텐츠 ──
interface ActiveItem {
  type: 'active';
  id: string;
  title: string;
  subtitle: string;
  href: string;
  tag: string;
  tagStyle: string;
  gradient: string;
  Icon: LucideIcon;
  coverImage?: string;
}

// ── 잠금(예정) 콘텐츠 ──
interface LockedItem {
  type: 'locked';
  id: string;
  title: string;
  gradient: string;
}

type CardItem = ActiveItem | LockedItem;

const ITEMS: CardItem[] = [
  // ── 활성 6개 ──
  {
    type: 'active',
    id: 'fortune',
    title: 'AI 사주풀이',
    subtitle: 'AI가 분석하는 나의 운세',
    href: '/fortune',
    tag: '인기',
    tagStyle: 'bg-white/90 text-violet-700',
    gradient: 'from-violet-500 via-purple-500 to-indigo-600',
    Icon: Sparkles,
  },
  {
    type: 'active',
    id: 'menu',
    title: '오늘 뭐 먹지?',
    subtitle: '기분에 맞는 메뉴 추천',
    href: '/menu/select',
    tag: '추천',
    tagStyle: 'bg-white/90 text-orange-600',
    gradient: 'from-orange-400 via-amber-400 to-rose-500',
    Icon: Utensils,
  },
  {
    type: 'active',
    id: 'mymood',
    title: '감정 점수화',
    subtitle: '오늘의 내 감정 측정',
    href: '/mymood',
    tag: 'NEW',
    tagStyle: 'bg-white/90 text-blue-600',
    gradient: 'from-blue-500 via-indigo-500 to-violet-600',
    Icon: Smile,
  },
  {
    type: 'active',
    id: 'animal-test',
    title: '이상형 동물상 테스트',
    subtitle: '나의 동물상은 무엇?',
    href: '/animal-test',
    tag: '',
    tagStyle: '',
    gradient: 'from-emerald-500 via-green-500 to-teal-600',
    Icon: PawPrint,
  },
  {
    type: 'active',
    id: 'ideal-type',
    title: '이상형 성향 테스트',
    subtitle: '나의 이상형 성향 분석',
    href: '/ideal-type',
    tag: '',
    tagStyle: '',
    gradient: 'from-pink-500 via-rose-400 to-red-400',
    Icon: HeartHandshake,
  },
  {
    type: 'active',
    id: 'mbti',
    title: 'MBTI 테스트',
    subtitle: '16가지 성격 유형 · 비율 그래프',
    href: '/mbti',
    tag: 'NEW',
    tagStyle: 'bg-white/90 text-indigo-600',
    gradient: 'from-indigo-500 via-violet-500 to-purple-600',
    Icon: Brain,
  },
  {
    type: 'active',
    id: 'tarot',
    title: '심봉이 타로',
    subtitle: '카드 3장으로 보는 나의 흐름',
    href: '/tarot',
    tag: 'NEW',
    tagStyle: 'bg-white/90 text-purple-700',
    gradient: 'from-purple-900 via-violet-800 to-indigo-900',
    Icon: Shuffle,
    coverImage: '/images/tarot/cover.png',
  },
  // ── 잠금 2개 — 업데이트 예정 ──
  {
    type: 'locked',
    id: 'locked-1',
    title: '업데이트 예정',
    gradient: 'from-slate-300 to-slate-400',
  },
  {
    type: 'locked',
    id: 'locked-2',
    title: '업데이트 예정',
    gradient: 'from-slate-300 to-slate-400',
  },
  {
    type: 'locked',
    id: 'locked-3',
    title: '업데이트 예정',
    gradient: 'from-slate-300 to-slate-400',
  },
];

// ── 활성 카드 ──
function ActiveCard({ item }: { item: ActiveItem }) {
  const { Icon } = item;
  return (
    <Link
      href={item.href}
      className="group block rounded-2xl overflow-hidden bg-white shadow-sm hover:shadow-md active:scale-[0.98] transition-[box-shadow,transform] duration-200"
    >
      <div
        className={`relative aspect-[3/4] overflow-hidden ${
          item.coverImage
            ? ''
            : `bg-gradient-to-br ${item.gradient} flex items-center justify-center`
        }`}
      >
        {item.coverImage ? (
          <img
            src={item.coverImage}
            alt={item.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        ) : (
          <>
            <div className="absolute -bottom-6 -right-6 w-24 h-24 rounded-full bg-white/10" />
            <div className="absolute -top-4 -left-4 w-16 h-16 rounded-full bg-white/10" />
            <Icon
              size={44}
              className="relative text-white drop-shadow-lg group-hover:scale-110 transition-transform duration-300"
              strokeWidth={1.5}
            />
          </>
        )}

        {item.tag && (
          <span
            className={`absolute top-2 left-2 text-[10px] font-extrabold px-2 py-0.5 rounded-full shadow-sm ${item.tagStyle}`}
          >
            {item.tag}
          </span>
        )}
      </div>

      <div className="px-3 pt-2.5 pb-3">
        <p className="text-[10px] text-muted leading-tight truncate">{item.subtitle}</p>
        <p className="text-[13px] font-bold text-ink mt-0.5 leading-tight truncate">{item.title}</p>
      </div>
    </Link>
  );
}

// ── 잠금 카드 ──
function LockedCard({ item }: { item: LockedItem }) {
  return (
    <div className="block rounded-2xl overflow-hidden bg-white shadow-sm opacity-60 cursor-not-allowed select-none">
      <div
        className={`relative aspect-[3/4] bg-gradient-to-br ${item.gradient} flex flex-col items-center justify-center overflow-hidden`}
      >
        <div className="absolute -bottom-6 -right-6 w-24 h-24 rounded-full bg-white/10" />
        <div className="absolute -top-4 -left-4 w-16 h-16 rounded-full bg-white/10" />

        <Lock size={36} className="text-white/70 drop-shadow mb-2" strokeWidth={1.5} />
        <span className="text-white/70 text-[11px] font-semibold text-center px-3 leading-snug">
          준비 중
        </span>
      </div>

      <div className="px-3 pt-2.5 pb-3">
        <p className="text-[10px] text-gray-400 leading-tight">곧 만나요</p>
        <p className="text-[13px] font-bold text-gray-400 mt-0.5 leading-tight">{item.title}</p>
      </div>
    </div>
  );
}

// ── 페이지 ──
export default function AllPage() {
  return (
    <div className="px-4 py-8">
      {/* 헤더 */}
      <div className="flex items-center gap-2 mb-6 px-1">
        <FlaskConical size={20} className="text-brand" strokeWidth={2} />
        <h1 className="text-lg font-bold text-ink">전체 콘텐츠</h1>
        <span className="ml-auto text-[11px] text-muted">
          {ITEMS.filter((i) => i.type === 'active').length}개 운영 중
        </span>
      </div>

      {/* 3×3 그리드 — 모바일/데스크탑 동일 */}
      <div className="grid grid-cols-3 gap-3">
        {ITEMS.map((item) =>
          item.type === 'active' ? (
            <ActiveCard key={item.id} item={item} />
          ) : (
            <LockedCard key={item.id} item={item} />
          )
        )}
      </div>
    </div>
  );
}
