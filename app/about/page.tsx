import type { Metadata } from 'next';
import Link from 'next/link';
import {
  ArrowRight,
  Brain,
  FlaskConical,
  HeartHandshake,
  LockKeyhole,
  PawPrint,
  Smile,
  Sparkles,
  Utensils,
  Zap,
  type LucideIcon,
} from 'lucide-react';

export const metadata: Metadata = {
  title: '서비스 소개',
  description: '심랩은 AI 사주, 메뉴 추천, 심리 테스트 등 재미있는 라이트 콘텐츠를 무료로 즐길 수 있는 연구소입니다.',
};

/* ── 핵심 가치 ── */
interface Feature {
  Icon: LucideIcon;
  title: string;
  desc: string;
  gradient: string;
}

const FEATURES: Feature[] = [
  {
    Icon: Zap,
    title: '회원가입 없이 무료',
    desc: '로그인, 결제, 구독 없이 모든 콘텐츠를 바로 이용할 수 있습니다.',
    gradient: 'from-amber-400 to-orange-500',
  },
  {
    Icon: Sparkles,
    title: 'AI 기반 콘텐츠',
    desc: 'OpenAI GPT 모델을 활용한 고품질 AI 사주풀이를 제공합니다.',
    gradient: 'from-violet-500 to-indigo-600',
  },
  {
    Icon: LockKeyhole,
    title: '개인정보 미저장',
    desc: '입력한 정보는 처리 후 즉시 파기되며 서버에 저장되지 않습니다.',
    gradient: 'from-emerald-500 to-teal-600',
  },
  {
    Icon: FlaskConical,
    title: '계속 업데이트 중',
    desc: '새로운 콘텐츠와 기능이 지속적으로 추가되는 성장 중인 연구소입니다.',
    gradient: 'from-brand to-brand-light',
  },
];

/* ── 콘텐츠 목록 ── */
interface ContentItem {
  Icon: LucideIcon;
  title: string;
  desc: string;
  href: string;
  gradient: string;
}

const CONTENTS: ContentItem[] = [
  {
    Icon: Sparkles,
    title: 'AI 사주풀이',
    desc: 'AI가 분석하는 오늘의 운세',
    href: '/fortune',
    gradient: 'from-violet-500 to-indigo-600',
  },
  {
    Icon: Utensils,
    title: '오늘 뭐 먹지?',
    desc: '기분에 맞는 메뉴 추천',
    href: '/menu/select',
    gradient: 'from-orange-400 to-rose-500',
  },
  {
    Icon: Smile,
    title: '감정 점수화',
    desc: '오늘의 내 감정 측정',
    href: '/mymood',
    gradient: 'from-blue-500 to-indigo-500',
  },
  {
    Icon: PawPrint,
    title: '이상형 동물상 테스트',
    desc: '나의 동물상은 무엇?',
    href: '/animal-test',
    gradient: 'from-emerald-500 to-teal-600',
  },
  {
    Icon: HeartHandshake,
    title: '이상형 성향 테스트',
    desc: '나의 이상형 성향 분석',
    href: '/ideal-type',
    gradient: 'from-pink-500 to-rose-500',
  },
  {
    Icon: Brain,
    title: 'MBTI 테스트',
    desc: '16가지 성격 유형 · 비율 그래프',
    href: '/mbti',
    gradient: 'from-indigo-500 to-violet-600',
  },
];

/* ── 페이지 ── */
export default function AboutPage() {
  return (
    <div className="w-full">

      {/* ── 1. Hero — 다크 그라디언트 배경 ── */}
      <section className="relative overflow-hidden bg-brand-dark px-5 py-16 text-center">
        {/* 배경 장식 */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              'radial-gradient(ellipse 90% 70% at 50% -5%, rgba(99,102,241,0.35) 0%, transparent 65%)',
          }}
        />
        <div aria-hidden="true" className="pointer-events-none absolute -bottom-16 -right-16 w-56 h-56 rounded-full bg-brand-light/10" />
        <div aria-hidden="true" className="pointer-events-none absolute -top-8 -left-8 w-40 h-40 rounded-full bg-white/5" />

        {/* 배지 */}
        <span className="relative mb-6 inline-flex items-center gap-1.5 rounded-full border border-brand-light/50 bg-brand-light/15 px-3 py-1 text-xs font-semibold text-indigo-400">
          <FlaskConical size={12} />
          심심할 때 찾는 연구소
        </span>

        {/* 타이틀 */}
        <h1 className="relative mt-3 text-3xl font-black text-white leading-tight">
          놀면서 발견하는
          <br />
          <span className="text-indigo-400">나 자신</span>
        </h1>

        {/* 서브타이틀 */}
        <p className="relative mx-auto mt-4 max-w-xs text-sm text-white/60 leading-relaxed">
          심랩은 AI 사주, 메뉴 추천, 심리 테스트 등<br />
          가볍고 재미있는 콘텐츠를 무료로 즐길 수 있는 공간입니다.
        </p>

        {/* CTA */}
        <div className="relative mt-8 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
          <Link
            href="/#contents"
            className="inline-flex items-center gap-2 rounded-xl bg-white text-brand text-sm font-bold px-6 py-3 hover:bg-bg-subtle active:scale-95 transition-all"
          >
            콘텐츠 둘러보기
            <ArrowRight size={15} />
          </Link>
          <Link
            href="/"
            className="inline-flex items-center gap-2 rounded-xl border border-white/20 text-white/70 text-sm font-medium px-6 py-3 hover:bg-white/10 active:scale-95 transition-all"
          >
            홈으로
          </Link>
        </div>
      </section>

      {/* ── 2. 핵심 가치 ── */}
      <section className="px-5 py-12 bg-white">
        <div className="mb-8 text-center">
          <h2 className="text-xl font-black text-ink">왜 심랩일까요?</h2>
          <p className="mt-2 text-sm text-muted">심심풀이 그 이상의 가치를 담았습니다</p>
        </div>

        <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {FEATURES.map((f) => (
            <FeatureCard key={f.title} feature={f} />
          ))}
        </ul>
      </section>

      {/* ── 3. 콘텐츠 목록 ── */}
      <section className="px-5 py-12 bg-bg-subtle">
        <div className="mb-8 text-center">
          <h2 className="text-xl font-black text-ink">어떤 콘텐츠가 있나요?</h2>
          <p className="mt-2 text-sm text-muted">
            현재 {CONTENTS.length}개 · 계속 추가 중
          </p>
        </div>

        <ul className="flex flex-col gap-3">
          {CONTENTS.map((item) => (
            <ContentRow key={item.title} item={item} />
          ))}
        </ul>
      </section>

      {/* ── 4. 마무리 CTA ── */}
      <section className="px-5 py-14 bg-brand text-center">
        {/* 장식 */}
        <div aria-hidden="true" className="mx-auto mb-5 flex justify-center">
          <div className="w-14 h-14 rounded-2xl bg-white/10 flex items-center justify-center">
            <FlaskConical size={32} className="text-white/80" strokeWidth={1.5} />
          </div>
        </div>

        <h2 className="text-xl font-black text-white">
          지금 심랩을 시작해보세요
        </h2>
        <p className="mt-3 text-sm text-white/60 leading-relaxed">
          회원가입 없이, 무료로, 지금 바로.
        </p>
        <Link
          href="/"
          className="mt-7 inline-flex items-center gap-2 rounded-xl bg-white text-brand text-sm font-bold px-7 py-3 hover:bg-bg-subtle active:scale-95 transition-all"
        >
          심랩 바로가기
          <ArrowRight size={15} />
        </Link>
      </section>

    </div>
  );
}

/* ── 핵심 가치 카드 — 좌측 그라디언트 아이콘 + 우측 텍스트 ── */
function FeatureCard({ feature }: { feature: Feature }) {
  const { Icon } = feature;
  return (
    <li className="flex items-start gap-4 rounded-2xl border border-border bg-white p-5 shadow-sm">
      <div
        className={`flex-shrink-0 w-11 h-11 rounded-xl bg-gradient-to-br ${feature.gradient} flex items-center justify-center shadow-sm`}
      >
        <Icon size={20} className="text-white" strokeWidth={1.8} />
      </div>
      <div>
        <h3 className="text-[14px] font-bold text-ink">{feature.title}</h3>
        <p className="mt-1 text-[12px] text-muted leading-relaxed">{feature.desc}</p>
      </div>
    </li>
  );
}

/* ── 콘텐츠 행 — 리스트 형식 ── */
function ContentRow({ item }: { item: ContentItem }) {
  const { Icon } = item;
  return (
    <li>
      <Link
        href={item.href}
        className="group flex items-center gap-4 rounded-2xl bg-white border border-border px-4 py-3.5 shadow-sm hover:border-brand/30 hover:shadow-md active:scale-[0.99] transition-all"
      >
        <div
          className={`flex-shrink-0 w-10 h-10 rounded-xl bg-gradient-to-br ${item.gradient} flex items-center justify-center`}
        >
          <Icon size={18} className="text-white" strokeWidth={1.8} />
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-[13px] font-bold text-ink">{item.title}</p>
          <p className="text-[11px] text-muted truncate">{item.desc}</p>
        </div>
        <ArrowRight
          size={16}
          className="flex-shrink-0 text-border group-hover:text-brand transition-colors"
        />
      </Link>
    </li>
  );
}
