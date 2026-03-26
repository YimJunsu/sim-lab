// 타로 콘텐츠 타입 정의

// 고민 카테고리 (taro-result.ts와 동기화)
export type TarotCategory = 'love' | 'career' | 'daily' | 'etc'

// 카드 포지션
export type TarotPosition = 'past' | 'present' | 'future'

// 카드 선택 화면에서 사용할 선택 상태
export interface SelectedCard {
  cardId: number
  position: TarotPosition
  positionLabel: string  // '과거' | '현재' | '미래'
  isRevealed: boolean    // flip 애니메이션 완료 여부
}

// 결과 페이지 렌더링용 데이터 (taro-result.ts 조회 결과)
export interface TarotResultData {
  category: TarotCategory
  cards: Array<{
    cardId: number
    position: TarotPosition
    positionLabel: string
    reading: string
  }>
  categoryMessage: string
  combinationMessage: string
}

// URL 쿼리스트링 파라미터
export interface TarotResultParams {
  cards: string       // '0,7,18' (뽑은 순서: 과거, 현재, 미래)
  category: TarotCategory
}

// TarotIntroClient 내부 step 상태
export type TarotStep = 'category' | 'fan-select' | 'reveal' | 'loading'
