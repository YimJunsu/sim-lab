import type { Metadata } from 'next';
import './globals.css';
import Header from '@/components/common/Header';
import Footer from '@/components/common/Footer';

export const metadata: Metadata = {
  metadataBase: new URL('https://simlab.kr'),
  title: {
    default: '심랩 — 심심할 때 찾는 연구소',
    template: '%s | 심랩',
  },
  description:
    '심심할 때 찾는 연구소. AI 사주풀이, 오늘 뭐 먹지?, 동물상 MBTI 테스트 등 재미있는 콘텐츠를 제공합니다.',
  keywords: ['심랩', '사주풀이', 'MBTI 테스트', '음식 추천', '심리 테스트', 'MBTI'],
  authors: [{ name: '심랩' }],
  openGraph: {
    type: 'website',
    locale: 'ko_KR',
    url: 'https://simlab.kr',
    siteName: '심랩',
    title: '심랩 — 심심할 때 찾는 연구소',
    description: '심심할 때 찾는 연구소. AI 사주풀이, 오늘 뭐 먹지?, 동물상 MBTI 테스트.',
    images: [
      {
        url: '/og/simlab-default-og.png',
        width: 1200,
        height: 630,
        alt: '심랩',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: '심랩 — 심심할 때 찾는 연구소',
    description: '심심할 때 찾는 연구소. AI 사주풀이, 음식 추천, MBTI 테스트.',
    images: ['/og/simlab-default-og.png'],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body className="min-h-screen flex flex-col">
        {/* 데스크탑에서 양쪽 사이드는 body 배경색(연보라)으로 처리됨 */}
        <div className="mobile-container flex flex-col flex-1">
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
