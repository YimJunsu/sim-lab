// 타로 진입 페이지 (Server Component)
// 실제 인터랙션은 TarotIntroClient에 위임

import TarotIntroClient from '@/components/tarot/TarotIntroClient'

export default function TarotPage() {
  return <TarotIntroClient />
}
