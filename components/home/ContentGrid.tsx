// ContentGrid — 카테고리별 콘텐츠 카드
// 카테고리: 빠른 서비스 (사주·메뉴) / 테스트 (감정·동물상·이상형·MBTI)
// 모바일: 가로 캐러셀 / 데스크탑(sm+): 그리드

import Link from 'next/link';
import {
  Brain,
  FlaskConical,
  HeartHandshake,
  LucideIcon,
  PawPrint,
  Shuffle,
  Smile,
  Sparkles,
  Utensils,
  Zap,
} from 'lucide-react';

interface ContentItem {
  id: string;
  title: string;
  subtitle: string;
  href: string;
  tag: string;
  tagStyle: string;
  gradient: string;
  Icon: LucideIcon;
  coverImage?: string; // 커버 이미지 경로 (있으면 gradient+icon 대신 표시)
}

// ── 빠른 서비스 — 결과 빠른 콘텐츠 ──
const QUICK_SERVICES: ContentItem[] = [
  {
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
  {
    id: 'menu',
    title: '오늘 뭐 먹지?',
    subtitle: '컨디션에 맞는 메뉴 추천',
    href: '/menu',
    tag: '추천',
    tagStyle: 'bg-white/90 text-orange-600',
    gradient: 'from-orange-400 via-amber-400 to-rose-500',
    Icon: Utensils,
  },
];

// ── 테스트 — 심리·성향 분석 ──
const TESTS: ContentItem[] = [
  {
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
    id: 'animal-type',
    title: '이상형 동물상 테스트',
    subtitle: '내 이상형은 어떤 동물상?',
    href: '/animal-type',
    tag: 'NEW',
    tagStyle: 'bg-white/90 text-pink-600',
    gradient: 'from-pink-400 via-rose-400 to-violet-500',
    Icon: PawPrint,
  },
  {
    id: 'ideal-type',
    title: '이상형 성향 테스트',
    subtitle: '나의 이상형 성향 분석',
    href: '/ideal-type',
    tag: '',
    tagStyle: '',
    gradient: 'from-pink-500 via-rose-400 to-red-400',
    Icon: HeartHandshake,
    coverImage: '/images/ideal-type/cover.png',
  },
  {
    id: 'mbti',
    title: 'MBTI 테스트',
    subtitle: '16가지 성격 유형 · 비율 그래프',
    href: '/mbti',
    tag: 'NEW',
    tagStyle: 'bg-white/90 text-indigo-600',
    gradient: 'from-indigo-500 via-violet-500 to-purple-600',
    Icon: Brain,
  },
];

// ── 카드 컴포넌트 ──
function ContentCard({ Icon, ...item }: ContentItem) {
  return (
    <Link
      href={item.href}
      className="group block rounded-2xl overflow-hidden bg-white shadow-sm hover:shadow-md active:scale-[0.98] transition-[box-shadow,transform] duration-200"
    >
      {/* 이미지 영역 */}
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

      {/* 텍스트 영역 */}
      <div className="px-3 pt-2.5 pb-3">
        <p className="text-[10px] text-muted leading-tight truncate">{item.subtitle}</p>
        <p className="text-[13px] font-bold text-ink mt-0.5 leading-tight truncate">{item.title}</p>
      </div>
    </Link>
  );
}

// ── 카테고리 섹션 ──
// 모바일: carousel-track (CSS 터치 스크롤) / 데스크탑: CSS grid
interface CategorySectionProps {
  HeaderIcon: LucideIcon;
  title: string;
  items: ContentItem[];
  gridCols?: string; // sm+ 그리드 컬럼 클래스
}

function CategorySection({
  HeaderIcon,
  title,
  items,
  gridCols = 'sm:grid-cols-3',
}: CategorySectionProps) {
  return (
    <div className="mb-7 last:mb-0">
      {/* 카테고리 헤더 */}
      <div className="flex items-center gap-1.5 mb-3 px-1">
        <HeaderIcon size={16} className="text-brand" strokeWidth={2.2} />
        <h3 className="text-[14px] font-bold text-ink">{title}</h3>
        <span className="text-[11px] text-gray-400 ml-1">{items.length}개</span>
      </div>

      {/* 모바일: 가로 캐러셀 */}
      <div className="sm:hidden">
        <div className="carousel-track">
          {items.map((item) => (
            // carousel-card: flex-shrink-0 + scroll-snap-align
            <div key={item.id} className="carousel-card w-36">
              <ContentCard {...item} />
            </div>
          ))}
          {/* 마지막 카드 우측 여백 — right-padding 브라우저 버그 우회 */}
          <div className="flex-shrink-0 w-4" aria-hidden="true" />
        </div>
      </div>

      {/* 데스크탑: 그리드 */}
      <div className={`hidden sm:grid ${gridCols} gap-3`}>
        {items.map((item) => (
          <ContentCard key={item.id} {...item} />
        ))}
      </div>
    </div>
  );
}

// ── 메인 섹션 ──
export default function ContentGrid() {
  return (
    <section id="contents" className="px-4 py-8">
      {/* 섹션 헤더 */}
      <div className="flex items-center justify-between mb-6 px-1">
        <div className="flex items-center gap-2">
          <FlaskConical size={20} className="text-brand" strokeWidth={2} />
          <h2 className="text-lg font-bold text-ink">모든 콘텐츠</h2>
        </div>
        <Link
          href="/all"
          className="text-[12px] text-brand font-medium hover:underline underline-offset-2"
        >
          전체보기 →
        </Link>
      </div>

      {/* 빠른 서비스 */}
      <CategorySection
        HeaderIcon={Zap}
        title="빠른 서비스"
        items={QUICK_SERVICES}
        gridCols="sm:grid-cols-3"
      />

      {/* 테스트 */}
      <CategorySection
        HeaderIcon={FlaskConical}
        title="테스트"
        items={TESTS}
        gridCols="sm:grid-cols-3"
      />
    </section>
  );
}
