// 이상형 성향 테스트 — 질문 데이터
// 총 14문항: Q1~Q12 (기본, 모든 사용자) + Q13~Q14 (적응형, 독립주의형/청순형 분기)
//
// 점수 방식: 각 선택지 → Partial<IdealTypeScore>로 가중치 점수 부여
// 한 선택지가 여러 유형에 점수를 줄 수 있음
// Q12: 타이브레이커 — 각 선택지가 특정 유형 +2 단독 부여

import type { IdealTypeId } from './ideal-type-data';

export type IdealTypeScore = Record<IdealTypeId, number>;

export interface IdealTypeChoice {
  text: string;
  scores: Partial<IdealTypeScore>;
}

export interface IdealTypeQuestion {
  id: number;
  question: string;
  isAdaptive: boolean; // true: Q13~Q14 (독립주의형/청순형 분기)
  choices: IdealTypeChoice[]; // 항상 4개
}

// 기본 점수 초기화
export function createInitialScore(): IdealTypeScore {
  return {
    protector: 0,
    romantic: 0,
    bestfriend: 0,
    explorer: 0,
    independent: 0,
    pure: 0,
  };
}

export const IDEAL_TYPE_QUESTIONS: IdealTypeQuestion[] = [
  // ── Q1~Q12: 기본 문항 (전체 공통) ──────────────────────────────────────────

  {
    id: 1,
    isAdaptive: false,
    question: '처음 만난 자리에서 가장 끌리는 포인트는?',
    choices: [
      { text: '말수는 적지만 분위기에서 묵직한 안정감이 느껴진다', scores: { protector: 2 } },
      { text: '작은 것도 챙겨주는 세심한 배려가 느껴진다', scores: { romantic: 2, pure: 1 } },
      { text: '자연스럽게 웃음을 만들어내는 유쾌한 에너지', scores: { bestfriend: 2 } },
      { text: '대화할수록 빠져드는 깊이 있는 생각', scores: { explorer: 2, independent: 1 } },
    ],
  },

  {
    id: 2,
    isAdaptive: false,
    question: '이상형의 연락 스타일 중 더 편한 것은?',
    choices: [
      { text: '자주 연락하지 않지만 필요할 때 항상 거기 있다', scores: { protector: 2, independent: 1 } },
      { text: '하루에 한 번은 꼭 안부를 묻고 세심하게 챙긴다', scores: { romantic: 2, pure: 1 } },
      { text: '수시로 연락하고 일상 소소한 것도 다 공유한다', scores: { bestfriend: 2 } },
      { text: '바쁠 때 뜸하지만 만나면 깊은 대화로 채워진다', scores: { independent: 2, explorer: 1 } },
    ],
  },

  {
    id: 3,
    isAdaptive: false,
    question: '함께하고 싶은 데이트 스타일은?',
    choices: [
      { text: '집에서 편하게 좋아하는 것 하며 같이 있기', scores: { protector: 2, independent: 1 } },
      { text: '분위기 좋은 레스토랑, 야경 드라이브 등 설레는 코스', scores: { romantic: 2 } },
      { text: '놀이공원, 게임, 어디든 신나게 즐기기', scores: { bestfriend: 2 } },
      { text: '전시회, 독립영화, 잘 모르는 골목 탐방', scores: { explorer: 2, independent: 1 } },
    ],
  },

  {
    id: 4,
    isAdaptive: false,
    question: '싸웠을 때 상대가 해줬으면 하는 것은?',
    choices: [
      { text: '먼저 다가와서 조용히 사과하고 안아준다', scores: { protector: 2, pure: 1 } },
      { text: '정성스러운 메시지나 작은 이벤트로 화해를 시도한다', scores: { romantic: 2 } },
      { text: '유머로 분위기를 풀어주며 자연스럽게 화해한다', scores: { bestfriend: 2 } },
      { text: '왜 싸웠는지 차분하게 대화로 풀어나간다', scores: { explorer: 2, independent: 1 } },
    ],
  },

  {
    id: 5,
    isAdaptive: false,
    question: '가장 감동받는 애정 표현 방식은?',
    choices: [
      { text: '말은 없어도 힘들 때 말없이 곁에 있어준다', scores: { protector: 2 } },
      { text: '기억해뒀다가 깜짝 이벤트나 선물로 표현한다', scores: { romantic: 2 } },
      { text: '"좋아해"를 솔직하게 직접 말해준다', scores: { bestfriend: 2, pure: 1 } },
      { text: '작은 것도 기억하고 의미 있는 방식으로 챙긴다', scores: { pure: 2, romantic: 1 } },
    ],
  },

  {
    id: 6,
    isAdaptive: false,
    question: '힘들 때 이상형이 해줬으면 하는 것은?',
    choices: [
      { text: '직접 해결해주거나 실질적인 도움을 준다', scores: { protector: 2 } },
      { text: '옆에서 끝까지 들어주며 공감해준다', scores: { romantic: 2, pure: 1 } },
      { text: '웃기게 기분 전환시켜주며 기운을 낸다', scores: { bestfriend: 2 } },
      { text: '원인을 분석하고 함께 해결책을 찾는다', scores: { explorer: 2, independent: 1 } },
    ],
  },

  {
    id: 7,
    isAdaptive: false,
    question: '이상형의 일상 에너지는 어떤 스타일인가요?',
    choices: [
      { text: '어디서나 중심이 되는 밝고 활기찬 스타일', scores: { bestfriend: 2 } },
      { text: '묵직하고 안정적인 존재감', scores: { protector: 2 } },
      { text: '조용하지만 자기 세계가 뚜렷한 스타일', scores: { independent: 2, explorer: 1 } },
      { text: '잔잔하고 따뜻한 온기가 느껴지는 스타일', scores: { pure: 2, romantic: 1 } },
    ],
  },

  {
    id: 8,
    isAdaptive: false,
    question: '함께 있을 때 가장 중요한 것은?',
    choices: [
      { text: '흔들리지 않는 안정감과 신뢰', scores: { protector: 2 } },
      { text: '매일 설레게 해주는 감성과 표현', scores: { romantic: 2 } },
      { text: '서로의 삶을 존중하는 개인 공간', scores: { independent: 2 } },
      { text: '언제든 편하게 웃을 수 있는 분위기', scores: { bestfriend: 2, pure: 1 } },
    ],
  },

  {
    id: 9,
    isAdaptive: false,
    question: '이상형과 꿈꾸는 미래의 모습은?',
    choices: [
      { text: '안정적인 일상을 함께하는 든든한 파트너', scores: { protector: 2 } },
      { text: '매일 설레고 특별한 순간을 만들어가는 관계', scores: { romantic: 2 } },
      { text: '서로의 꿈과 삶을 응원하며 각자 성장하는 관계', scores: { independent: 2, explorer: 1 } },
      { text: '함께하면 더 넓은 세상을 탐험하는 동반자', scores: { explorer: 2, bestfriend: 1 } },
    ],
  },

  {
    id: 10,
    isAdaptive: false,
    question: '이상형이 바쁠 때 연락이 없다면?',
    choices: [
      { text: '당연히 기다린다. 있을 때 더 집중하면 된다', scores: { protector: 2, independent: 1 } },
      { text: '걱정되어 먼저 안부를 묻는다', scores: { pure: 2, romantic: 1 } },
      { text: '각자의 시간이 있는 게 자연스러운 일', scores: { independent: 2 } },
      { text: '안부 문자 한 통만 보내고 기다린다', scores: { bestfriend: 2, explorer: 1 } },
    ],
  },

  {
    id: 11,
    isAdaptive: false,
    question: '이상형의 어떤 점에 가장 끌리나요?',
    choices: [
      { text: '말보다 행동으로 보여주는 믿음직한 모습', scores: { protector: 2 } },
      { text: '나를 특별하게 만들어주는 세심한 배려', scores: { romantic: 2, pure: 1 } },
      { text: '같이 있으면 절로 웃게 되는 긍정 에너지', scores: { bestfriend: 2, pure: 1 } },
      { text: '대화할수록 더 알고 싶어지는 깊이', scores: { explorer: 2, independent: 1 } },
    ],
  },

  {
    id: 12,
    isAdaptive: false,
    question: '나의 이상형을 한 마디로 고르면?',
    choices: [
      { text: '곁에 있으면 든든한 사람', scores: { protector: 2 } },
      { text: '매일 설레게 해주는 사람', scores: { romantic: 2 } },
      { text: '같이 있으면 배꼽 빠지는 사람', scores: { bestfriend: 2 } },
      { text: '대화할수록 더 알고 싶은 사람', scores: { explorer: 2 } },
    ],
  },

  // ── Q13~Q14: 적응형 문항 (독립주의형/청순형 분기) ─────────────────────────
  // 이 두 문항은 Q12 완료 후 1위 유형이 independent 또는 pure일 때만 표시됨

  {
    id: 13,
    isAdaptive: true,
    question: '연인과 하루를 보낸다면 어떤 형태가 이상적인가요?',
    choices: [
      { text: '각자 하고 싶은 걸 하다가 저녁에 만나 함께한다', scores: { independent: 2 } },
      { text: '하루 종일 붙어서 같이 뭐든 한다', scores: { pure: 2 } },
      { text: '오전은 각자, 오후는 같이 — 반반이 딱 좋다', scores: { independent: 1, explorer: 1 } },
      { text: '잠깐 혼자 있어도 금방 보고 싶어서 달려간다', scores: { pure: 2, romantic: 1 } },
    ],
  },

  {
    id: 14,
    isAdaptive: true,
    question: '이상형이 처음 내게 다가올 때 어떻게 해줬으면 하나요?',
    choices: [
      { text: '자기 페이스대로 자연스럽게, 쿨하게 친구처럼 먼저', scores: { independent: 2 } },
      { text: '조심스럽게 천천히, 부담 안 가게 다가와 준다', scores: { pure: 2 } },
      { text: '적당한 거리를 유지하며 내가 다가오길 기다린다', scores: { independent: 2 } },
      { text: '따뜻하게 챙겨주면서 자연스럽게 가까워진다', scores: { pure: 2, romantic: 1 } },
    ],
  },
];

// 기본 12문항 (isAdaptive=false)
export const BASE_QUESTIONS = IDEAL_TYPE_QUESTIONS.filter((q) => !q.isAdaptive);

// 적응형 2문항 (isAdaptive=true)
export const ADAPTIVE_QUESTIONS = IDEAL_TYPE_QUESTIONS.filter((q) => q.isAdaptive);

// 기본 질문 총 수
export const BASE_QUESTION_COUNT = BASE_QUESTIONS.length; // 12

// 전체 질문 총 수 (적응형 포함)
export const TOTAL_QUESTION_COUNT = IDEAL_TYPE_QUESTIONS.length; // 14
