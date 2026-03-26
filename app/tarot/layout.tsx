import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: '심봉이의 타로상담소 | 심랩',
  description:
    '심봉이가 타로 카드 3장으로 당신의 고민을 풀어드려요. 연애, 진로, 오늘의 운세까지. 결과를 카카오톡으로 공유해보세요.',
  keywords: ['타로', '타로 카드', '타로 점', '타로 운세', '심리 테스트', '심봉이', '심랩'],
  openGraph: {
    title: '심봉이의 타로상담소 | 심랩',
    description: '카드 3장으로 지금 당신의 흐름을 읽어드려요.',
    images: [{ url: '/og/simlab-default-og.png', width: 1200, height: 630 }],
  },
}

export default function TarotLayout({ children }: { children: React.ReactNode }) {
  return children
}
