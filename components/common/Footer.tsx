import Link from 'next/link';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-ink text-muted">
      <div className="mobile-container">
        <div className="px-5 py-8">
          {/* 브랜드 */}
          <div className="mb-5">
            <span className="text-lg font-bold text-brand-dark">심랩</span>
            <p className="mt-1 text-xs leading-relaxed">
              심심할 때 찾는 연구소 · 마음을 연구하는 연구소
            </p>
          </div>

          {/* 링크 */}
          <div className="flex flex-wrap gap-x-4 gap-y-2 text-xs mb-6">
            <Link href="/legal/privacy" className="hover:text-brand-light transition-colors">
              개인정보처리방침
            </Link>
            <Link href="/legal/terms" className="hover:text-brand-light transition-colors">
              이용약관
            </Link>
            <Link href="/legal/disclaimer" className="hover:text-brand-light transition-colors">
              면책고지
            </Link>
          </div>

          {/* 고지사항 */}
          <p className="text-[10px] leading-relaxed mb-4">
            본 서비스의 콘텐츠(사주풀이, 테스트 결과 등)는 오락·참고 목적으로만 제공되며
            전문적인 조언을 대체하지 않습니다. 위치 정보 및 개인 데이터는 서버에 저장되지 않습니다.
          </p>

          {/* 저작권 */}
          <p className="text-[11px]">
            © {currentYear} 심랩 (SIMLAB). All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
