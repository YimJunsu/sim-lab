// MBTI 질문 데이터
// 총 32문항 (E-I·N-S·T-F·J-P 각 8개)
// 각 질문은 4개 선택지 (A=100, B=67, C=33, D=0점 → 첫 번째 성향 기준)
// getRandomQuestions()로 차원별 3개씩 총 12문항 랜덤 선택
//
// 점수 계산:
//   dimScore = 선택한 답변의 점수 합산 (0~300)
//   score(%) = Math.round(dimScore / 300 * 100)
//   → 가능한 결과값: 0 · 11 · 22 · 33 · 44 · 56 · 67 · 78 · 89 · 100 (10단계)
//
// 질문 출처: 16Personalities, TypeFinder(Truity), Humanmetrics 등
// 인기 MBTI 서비스의 핵심 문항 패턴을 기반으로 구성

export type MBTIDimension = 'EI' | 'NS' | 'TF' | 'JP';

export interface MBTIQuestion {
  id: number;
  dimension: MBTIDimension;
  question: string;
  optionA: string; // 100점: 강하게 첫 번째 성향 (E/N/T/J)
  optionB: string; //  67점: 약하게 첫 번째 성향
  optionC: string; //  33점: 약하게 두 번째 성향
  optionD: string; //   0점: 강하게 두 번째 성향 (I/S/F/P)
}

export const MBTI_QUESTIONS: MBTIQuestion[] = [

  // ── E-I (외향 vs 내향) ──────────────────────────────────────────────
  {
    id: 1,
    dimension: 'EI',
    question: '긴 하루를 보낸 후 에너지를 회복하는 방법은?',
    optionA: '친구나 동료들과 어울리며 신나게 시간을 보낸다',
    optionB: '소수의 친한 사람과 가벼운 대화를 나눈다',
    optionC: '주로 혼자 조용히 쉬며 에너지를 충전한다',
    optionD: '완전히 혼자만의 공간에서 아무것도 하지 않는다',
  },
  {
    id: 2,
    dimension: 'EI',
    question: '새로운 사람들이 많은 자리에서 나는?',
    optionA: '모르는 사람들에게 먼저 다가가 활발히 어울린다',
    optionB: '어울리지만 중간중간 혼자 있고 싶은 순간이 생긴다',
    optionC: '아는 사람 위주로만 교류하며 일찍 자리를 뜬다',
    optionD: '가능하면 참석하지 않거나 가도 최대한 조용히 있는다',
  },
  {
    id: 3,
    dimension: 'EI',
    question: '생각이나 아이디어를 정리할 때 나는?',
    optionA: '말하면서 정리되고 대화를 통해 아이디어가 발전한다',
    optionB: '대화도 도움이 되지만 어느 정도 혼자 생각할 시간도 필요하다',
    optionC: '주로 혼자 정리한 후 결론만 공유하는 편이다',
    optionD: '반드시 혼자 충분히 생각한 뒤에야 말할 수 있다',
  },
  {
    id: 4,
    dimension: 'EI',
    question: '혼자 보내는 시간이 길어지면?',
    optionA: '지루하고 누군가를 빨리 만나고 싶어진다',
    optionB: '어느 정도는 괜찮지만 슬슬 사람이 그리워진다',
    optionC: '편안하고 큰 불편함이 없다',
    optionD: '오히려 충전되고 더 집중이 잘 된다',
  },
  {
    id: 5,
    dimension: 'EI',
    question: '그룹 토론이나 회의에서 나는?',
    optionA: '먼저 의견을 꺼내고 토론 방향을 자연스럽게 이끈다',
    optionB: '필요할 때 의견을 내며 다른 사람 말도 경청한다',
    optionC: '주로 듣고 꼭 필요한 말만 하는 편이다',
    optionD: '웬만하면 의견을 속으로만 갖고 발언을 최소화한다',
  },
  {
    id: 6,
    dimension: 'EI',
    question: '주말에 아무 계획이 없다면?',
    optionA: '친구에게 연락해 모임이나 약속을 만들어낸다',
    optionB: '만남도 좋고 혼자도 괜찮아 그날그날 결정한다',
    optionC: '주로 집에서 쉬지만 연락이 오면 나간다',
    optionD: '완전히 혼자 조용히 보내는 게 가장 편하다',
  },
  {
    id: 7,
    dimension: 'EI',
    question: '여러 사람과 오랜 시간 함께 있으면?',
    optionA: '시간이 갈수록 더 신나고 에너지가 넘친다',
    optionB: '즐겁지만 중간중간 혼자만의 시간이 필요하다',
    optionC: '점점 피로해지고 혼자 있고 싶어진다',
    optionD: '꽤 지치고 빨리 혼자가 되고 싶다',
  },
  {
    id: 8,
    dimension: 'EI',
    question: '처음 만나는 자리에서 나는?',
    optionA: '자연스럽게 대화를 시작하고 분위기를 주도한다',
    optionB: '편안하게 어울리지만 먼저 다가가기는 약간 조심스럽다',
    optionC: '말을 걸면 응하지만 먼저 시작하기는 어렵다',
    optionD: '어색하고 빨리 자리가 끝났으면 한다',
  },

  // ── N-S (직관 vs 감각) ──────────────────────────────────────────────
  {
    id: 9,
    dimension: 'NS',
    question: '새 프로젝트를 시작할 때 나는?',
    optionA: '전체적인 가능성과 비전을 먼저 그려본다',
    optionB: '큰 방향을 그리되 실행 방법도 함께 고민한다',
    optionC: '실행 계획을 중심으로 접근하며 가능성은 나중에 본다',
    optionD: '당장 해야 할 구체적인 첫 단계부터 파악한다',
  },
  {
    id: 10,
    dimension: 'NS',
    question: '대화할 때 더 즐거운 주제는?',
    optionA: '철학, 미래, 아이디어, 가능성에 관한 이야기',
    optionB: '이론과 현실을 오가는 넓은 범위의 주제',
    optionC: '최근 일어난 일이나 현실적인 경험 이야기',
    optionD: '구체적인 사실, 실용적인 정보와 경험 이야기',
  },
  {
    id: 11,
    dimension: 'NS',
    question: '문제를 해결할 때 나는?',
    optionA: '직관적으로 번뜩 해결책이 떠오르는 편이다',
    optionB: '직관과 분석을 함께 활용한다',
    optionC: '경험과 데이터를 주로 활용한다',
    optionD: '사실과 데이터를 체계적으로 검토하며 답을 찾는다',
  },
  {
    id: 12,
    dimension: 'NS',
    question: '자신을 표현하는 말로 더 가까운 것은?',
    optionA: '몽상가, 상상력이 풍부하고 가능성을 즐긴다',
    optionB: '창의적이지만 현실 감각도 있다',
    optionC: '현실적이지만 가끔 상상도 즐긴다',
    optionD: '현실주의자, 있는 그대로를 보고 실용적이다',
  },
  {
    id: 13,
    dimension: 'NS',
    question: '새로운 정보를 접할 때 나는?',
    optionA: '그 안에 담긴 의미·패턴·가능성을 먼저 본다',
    optionB: '큰 그림도 보지만 구체적인 사실도 함께 파악한다',
    optionC: '주로 실용적이고 현실적인 정보에 집중한다',
    optionD: '구체적인 사실과 세부 사항을 정확하게 파악한다',
  },
  {
    id: 14,
    dimension: 'NS',
    question: '무언가를 배울 때 더 선호하는 방식은?',
    optionA: '전체 원리와 개념을 이해해야 만족스럽다',
    optionB: '원리도 알고 싶고 구체적인 예시도 필요하다',
    optionC: '구체적인 예시를 통해 개념을 익히는 것이 편하다',
    optionD: '직접 해보며 익히는 실습이 가장 효과적이다',
  },
  {
    id: 15,
    dimension: 'NS',
    question: '일상에서 나는?',
    optionA: '일어나는 모든 일에서 의미와 패턴을 찾으려 한다',
    optionB: '의미 찾기도 좋지만 현실에도 잘 집중한다',
    optionC: '주로 현재에 집중하지만 가끔 깊이 생각하기도 한다',
    optionD: '눈앞에 있는 현실에 충실하며 지금 여기에 집중한다',
  },
  {
    id: 16,
    dimension: 'NS',
    question: '여행지를 선택할 때 나는?',
    optionA: '잘 알려지지 않은 독특한 새 곳을 찾아간다',
    optionB: '색다른 곳도 좋지만 기본 정보는 먼저 확인한다',
    optionC: '추천받은 곳을 가되 여유가 생기면 탐험한다',
    optionD: '리뷰가 좋고 검증된 명소를 선택한다',
  },

  // ── T-F (사고 vs 감정) ──────────────────────────────────────────────
  {
    id: 17,
    dimension: 'TF',
    question: '친구가 심각한 고민을 털어놓으면?',
    optionA: '원인을 분석하고 실질적인 해결책을 제안한다',
    optionB: '조언도 하지만 먼저 감정을 이해하려 노력한다',
    optionC: '공감하며 위로하되 원하면 조언도 건넨다',
    optionD: '판단이나 조언 없이 감정을 충분히 들어주는 데 집중한다',
  },
  {
    id: 18,
    dimension: 'TF',
    question: '중요한 결정을 내릴 때 나는?',
    optionA: '논리와 데이터로 가장 합리적인 선택을 한다',
    optionB: '주로 논리적이지만 감정도 어느 정도 반영한다',
    optionC: '감정과 논리를 고루 반영하되 느낌이 좀 더 크다',
    optionD: '내 감정과 관련된 사람들의 입장을 가장 중시한다',
  },
  {
    id: 19,
    dimension: 'TF',
    question: '누군가에게 피드백을 줄 때 나는?',
    optionA: '솔직하고 직접적으로 문제점을 짚어준다',
    optionB: '솔직하게 말하되 표현 방식에 약간 신경 쓴다',
    optionC: '칭찬을 먼저 하고 부드럽게 개선점을 말한다',
    optionD: '상대가 상처받지 않도록 매우 조심스럽게 말한다',
  },
  {
    id: 20,
    dimension: 'TF',
    question: '갈등 상황에서 나는?',
    optionA: '감정을 배제하고 사실과 논리로 해결하려 한다',
    optionB: '논리적이지만 상대방 입장도 함께 고려한다',
    optionC: '상대 감정을 배려하면서 합의점을 찾는다',
    optionD: '모두의 감정이 다치지 않는 방향을 최우선으로 한다',
  },
  {
    id: 21,
    dimension: 'TF',
    question: '일에서 더 중요하게 생각하는 것은?',
    optionA: '결과와 효율, 논리적인 업무 처리',
    optionB: '성과를 추구하되 팀원 의견도 반영한다',
    optionC: '팀 분위기와 관계를 중요하게 생각하며 협력한다',
    optionD: '모두가 편안하게 참여할 수 있는 분위기 조성',
  },
  {
    id: 22,
    dimension: 'TF',
    question: '타인에게 감정적인 반응이 보이면?',
    optionA: '이해하기 어렵고 논리적으로 접근하게 된다',
    optionB: '이해하려 하지만 어떻게 반응해야 할지 고민된다',
    optionC: '자연스럽게 감정을 받아주고 공감하는 편이다',
    optionD: '즉시 감정적으로 연결되고 함께 느끼는 편이다',
  },
  {
    id: 23,
    dimension: 'TF',
    question: '나의 강점에 더 가까운 것은?',
    optionA: '냉철한 판단력과 객관적인 분석 능력',
    optionB: '합리적이면서도 상황을 균형 있게 바라본다',
    optionC: '공감 능력이 좋고 사람들과 잘 어울린다',
    optionD: '따뜻한 배려심과 뛰어난 공감 능력',
  },
  {
    id: 24,
    dimension: 'TF',
    question: '옳다고 생각하는 것에 반대 의견이 나오면?',
    optionA: '논리로 반박하고 틀린 부분을 명확히 짚는다',
    optionB: '반박하되 상대 의견도 충분히 경청한다',
    optionC: '내 의견을 부드럽게 말하되 마찰은 피하려 한다',
    optionD: '분위기가 나빠질까봐 의견 충돌을 최대한 피한다',
  },

  // ── J-P (판단 vs 인식) ──────────────────────────────────────────────
  {
    id: 25,
    dimension: 'JP',
    question: '마감이 있는 과제를 받으면?',
    optionA: '마감 훨씬 전에 계획을 세워 여유 있게 완료한다',
    optionB: '미리 시작하지만 완료는 마감 가까이에 한다',
    optionC: '마감이 가까워져야 본격적으로 시작한다',
    optionD: '마감 직전 집중력이 폭발하며 최고의 결과를 낸다',
  },
  {
    id: 26,
    dimension: 'JP',
    question: '여행을 갈 때 나는?',
    optionA: '교통·숙박·세부 일정까지 사전에 모두 확정한다',
    optionB: '큰 일정은 잡되 세부 내용은 현지에서 결정한다',
    optionC: '방향만 정하고 즉흥적으로 결정하는 것을 즐긴다',
    optionD: '계획 없이 떠나도 전혀 불안하지 않고 오히려 설렌다',
  },
  {
    id: 27,
    dimension: 'JP',
    question: '예상치 못한 변화가 생기면?',
    optionA: '스트레스를 받으며 즉시 새로운 계획을 세운다',
    optionB: '불편하지만 빠르게 적응하며 조정한다',
    optionC: '큰 불편 없이 유연하게 상황에 맞춰 대처한다',
    optionD: '오히려 흥미롭고 새로운 상황을 즐긴다',
  },
  {
    id: 28,
    dimension: 'JP',
    question: '결정을 내릴 때 나는?',
    optionA: '필요한 정보가 갖춰지면 빠르게 결정하고 실행한다',
    optionB: '결정하고 움직이지만 필요하면 수정한다',
    optionC: '더 나은 선택지가 있을까봐 결정을 미루는 편이다',
    optionD: '가능한 한 오래 모든 선택지를 열어두다가 결정한다',
  },
  {
    id: 29,
    dimension: 'JP',
    question: '나의 일상은?',
    optionA: '정해진 루틴이 있고 계획대로 하루를 보낸다',
    optionB: '어느 정도 구조가 있지만 유연하게 조정한다',
    optionC: '비교적 자유롭게 그날그날 상황에 맞춰 움직인다',
    optionD: '즉흥적으로 흘러가는 것이 훨씬 자연스럽다',
  },
  {
    id: 30,
    dimension: 'JP',
    question: '중요한 업무나 공부를 시작할 때?',
    optionA: '계획을 먼저 세운 뒤 순서대로 진행한다',
    optionB: '대략적인 방향을 잡고 시작하며 조정해간다',
    optionC: '시작하면서 방향을 잡는 편이다',
    optionD: '바로 뛰어들어 진행하며 계획은 나중에 생각한다',
  },
  {
    id: 31,
    dimension: 'JP',
    question: '내 방이나 책상 상태는?',
    optionA: '항상 깔끔하게 정리되어 있어야 마음이 편하다',
    optionB: '보통은 정돈되어 있지만 가끔 어지러워지기도 한다',
    optionC: '어느 정도 어질러져 있고 필요할 때 정리한다',
    optionD: '나만의 방식이 있어 남이 보기엔 어지러워 보인다',
  },
  {
    id: 32,
    dimension: 'JP',
    question: '여러 선택지 중에 골라야 할 때?',
    optionA: '빠르게 하나를 정하고 그것에 집중한다',
    optionB: '결정하지만 시간이 있으면 더 검토한다',
    optionC: '좀 더 탐색하다가 최대한 늦게 결정한다',
    optionD: '어쩔 수 없을 때까지 모든 선택지를 열어둔다',
  },
];

// 선택지 → 점수 매핑 (첫 번째 성향 기준)
export const CHOICE_SCORES = { A: 100, B: 67, C: 33, D: 0 } as const;
export type Choice = keyof typeof CHOICE_SCORES;

// 차원별 3문항 랜덤 선택 → 총 12문항 섞어서 반환
export function getRandomQuestions(): MBTIQuestion[] {
  const byDim: Record<MBTIDimension, MBTIQuestion[]> = { EI: [], NS: [], TF: [], JP: [] };

  for (const q of MBTI_QUESTIONS) {
    byDim[q.dimension].push(q);
  }

  function shuffle<T>(arr: T[]): T[] {
    const a = [...arr];
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  }

  const selected: MBTIQuestion[] = [];
  for (const dim of ['EI', 'NS', 'TF', 'JP'] as MBTIDimension[]) {
    selected.push(...shuffle(byDim[dim]).slice(0, 3));
  }

  return shuffle(selected);
}
