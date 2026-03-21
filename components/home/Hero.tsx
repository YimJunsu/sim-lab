'use client';

// Hero 섹션 — 심랩 메인 진입점
// "심심할 때 찾는" 글자별 pop-bounce 스태거 애니메이션
// CTA: 서비스 소개 + 전체보기
import Link from 'next/link';
import { ArrowRight, FlaskConical, LayoutGrid } from 'lucide-react';

// "심심할 때 찾는" 글자를 개별 span으로 분리해 스태거 애니메이션 적용
const HEADLINE = '심심할 때 찾는';

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-white px-5 pt-11 pb-9 text-center">
      {/* 배경 장식 원 */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-16 -right-16 w-64 h-64 rounded-full bg-[#312E81]/8"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-12 -left-12 w-48 h-48 rounded-full bg-[#6366F1]/10"
      />
      {/* 추가 장식 — 우하단 */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute bottom-0 right-0 w-32 h-32 rounded-full bg-[#312E81]/5"
      />

      {/* 메인 아이콘 */}
      <div className="relative mb-5 flex justify-center">
        <div className="w-20 h-20 rounded-2xl bg-[#312E81]/8 flex items-center justify-center">
          <FlaskConical size={44} className="text-[#312E81]" strokeWidth={1.5} />
        </div>
      </div>

      {/* 헤드라인 — 글자별 pop-bounce */}
      <h1 className="relative text-[1.85rem] font-black text-[#1A1A2E] leading-tight mb-2">
        {/* 각 글자에 staggered 딜레이 */}
        <span aria-label={HEADLINE}>
          {HEADLINE.split('').map((char, i) => (
            <span
              key={i}
              className="pop-bounce"
              style={{ animationDelay: `${i * 0.055}s` }}
              aria-hidden="true"
            >
              {char === ' ' ? '\u00A0' : char}
            </span>
          ))}
        </span>
        <br />
        <span
          className="text-[#312E81] pop-bounce"
          style={{ animationDelay: `${HEADLINE.length * 0.055 + 0.05}s` }}
        >
          연구소
        </span>
      </h1>

      {/* 서브카피 */}
      <p className="relative text-sm text-[#6B7280] leading-relaxed mb-8">
        AI 사주, 메뉴 추천, 심리 테스트까지
        <br />
        무료로 즐기는 라이트 콘텐츠
      </p>

      {/* CTA 버튼 */}
      <div className="relative flex gap-3 justify-center">
        {/* 서비스 소개 — 콘텐츠 섹션으로 스크롤 */}
        <a
          href="/about"
          className="flex flex-1 max-w-[160px] items-center justify-center gap-1.5 rounded-xl bg-[#312E81] text-white text-sm font-bold py-3 px-4 shadow-md shadow-[#312E81]/25 hover:bg-[#1E1B4B] active:scale-95 transition-all"
        >
          <FlaskConical size={14} strokeWidth={2} />
          서비스 소개
        </a>
        {/* 전체보기 */}
        <Link
          href="/all"
          className="flex flex-1 max-w-[160px] items-center justify-center gap-1.5 rounded-xl border-2 border-[#312E81] text-[#312E81] text-sm font-bold py-3 px-4 hover:bg-[#eef2ff] active:scale-95 transition-all"
        >
          <LayoutGrid size={14} strokeWidth={2} />
          전체보기
        </Link>
      </div>
    </section>
  );
}
