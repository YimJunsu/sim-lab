// 법적 페이지 공통 레이아웃 — 문서 스타일 래퍼
import type { ReactNode } from 'react';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export default function LegalLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-white">
      {/* 상단 네비게이션 */}
      <div className="sticky top-0 z-10 bg-white border-b border-[#E5E7EB]">
        <div className="px-5 h-12 flex items-center gap-3">
          <Link
            href="/"
            className="flex items-center gap-1.5 text-[#6B7280] hover:text-[#1A1A2E] transition-colors text-sm"
          >
            <ArrowLeft size={16} strokeWidth={2} />
            홈으로
          </Link>
          <span className="text-[#E5E7EB]">|</span>
          <span className="text-[12px] text-[#6B7280]">심랩 법적 고지</span>
        </div>
      </div>

      {/* 본문 */}
      <div className="px-5 py-8 max-w-prose mx-auto">{children}</div>
    </div>
  );
}
