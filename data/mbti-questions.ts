// MBTI 질문 데이터
// 총 48문항 (E-I·N-S·T-F·J-P 각 12개)
// getRandomQuestions()로 각 차원별 3개씩 총 12문항 랜덤 선택

export type MBTIDimension = 'EI' | 'NS' | 'TF' | 'JP';

export interface MBTIQuestion {
  id: number;
  dimension: MBTIDimension;
  question: string;
  optionA: string; // 첫 번째 글자 (E, N, T, J)
  optionB: string; // 두 번째 글자 (I, S, F, P)
}

export const MBTI_QUESTIONS: MBTIQuestion[] = [
  // ── E-I (외향 vs 내향) 1~12 ──
  {
    id: 1,
    dimension: 'EI',
    question: '주말에 가장 하고 싶은 것은?',
    optionA: '친구들과 신나게 놀기',
    optionB: '집에서 조용히 쉬기',
  },
  {
    id: 2,
    dimension: 'EI',
    question: '새로운 사람을 만나면 나는?',
    optionA: '먼저 다가가 말을 건다',
    optionB: '상대방이 먼저 다가오길 기다린다',
  },
  {
    id: 3,
    dimension: 'EI',
    question: '에너지를 얻는 방법은?',
    optionA: '사람들과 어울리며 활기차게',
    optionB: '혼자만의 고요한 시간',
  },
  {
    id: 4,
    dimension: 'EI',
    question: '모임에서 나는?',
    optionA: '자연스럽게 대화를 주도한다',
    optionB: '주로 듣고 관찰한다',
  },
  {
    id: 5,
    dimension: 'EI',
    question: '파티에서 나는?',
    optionA: '모든 사람과 이야기하며 돌아다닌다',
    optionB: '친한 몇 명과 깊은 대화를 나눈다',
  },
  {
    id: 6,
    dimension: 'EI',
    question: '생각을 정리할 때 나는?',
    optionA: '말하면서 정리된다',
    optionB: '혼자 충분히 생각한 뒤 말한다',
  },
  {
    id: 7,
    dimension: 'EI',
    question: '낯선 환경에 놓이면?',
    optionA: '빠르게 적응하고 친구를 사귄다',
    optionB: '익숙해지는 데 시간이 걸린다',
  },
  {
    id: 8,
    dimension: 'EI',
    question: '선호하는 소통 방식은?',
    optionA: '직접 통화하기',
    optionB: '문자나 메신저',
  },
  {
    id: 9,
    dimension: 'EI',
    question: '혼자 있는 시간이 길어지면?',
    optionA: '심심하고 누군가 만나고 싶다',
    optionB: '오히려 편안하고 충전된다',
  },
  {
    id: 10,
    dimension: 'EI',
    question: '발표나 무대에 서면?',
    optionA: '오히려 에너지가 충전된다',
    optionB: '긴장되고 빨리 끝내고 싶다',
  },
  {
    id: 11,
    dimension: 'EI',
    question: '모르는 사람과 단둘이 있을 때?',
    optionA: '자연스럽게 대화를 시작한다',
    optionB: '어색해서 조용히 있는다',
  },
  {
    id: 12,
    dimension: 'EI',
    question: '내 인간관계 스타일은?',
    optionA: '다양한 사람들과 폭넓게',
    optionB: '소수와 깊고 오래',
  },

  // ── N-S (직관 vs 감각) 13~24 ──
  {
    id: 13,
    dimension: 'NS',
    question: '새 프로젝트를 시작할 때 나는?',
    optionA: '미래 가능성과 큰 그림을 본다',
    optionB: '구체적인 단계와 실행 계획을 세운다',
  },
  {
    id: 14,
    dimension: 'NS',
    question: '일상적인 일을 할 때 나는?',
    optionA: '더 나은 방법을 찾으려 한다',
    optionB: '검증된 방법을 그대로 따른다',
  },
  {
    id: 15,
    dimension: 'NS',
    question: '대화할 때 즐거운 주제는?',
    optionA: '아이디어, 가능성, 미래 이야기',
    optionB: '실제 경험, 사실, 현실적인 이야기',
  },
  {
    id: 16,
    dimension: 'NS',
    question: '미래를 생각할 때 나는?',
    optionA: '다양한 시나리오를 상상한다',
    optionB: '현실적이고 가능한 것에 집중한다',
  },
  {
    id: 17,
    dimension: 'NS',
    question: '문제를 해결할 때 나는?',
    optionA: '직관적으로 해답이 떠오른다',
    optionB: '체계적으로 하나씩 분석한다',
  },
  {
    id: 18,
    dimension: 'NS',
    question: '즐겨 보는 콘텐츠 장르는?',
    optionA: 'SF · 판타지 · 철학 · 심리',
    optionB: '실용서 · 역사 · 다큐 · 실화',
  },
  {
    id: 19,
    dimension: 'NS',
    question: '디테일과 큰 그림 중 더 중요한 것은?',
    optionA: '큰 그림과 맥락',
    optionB: '세부 사항과 정확성',
  },
  {
    id: 20,
    dimension: 'NS',
    question: '아이디어는 어디서 오는가?',
    optionA: '갑자기 번뜩 떠오른다',
    optionB: '경험과 관찰에서 나온다',
  },
  {
    id: 21,
    dimension: 'NS',
    question: '처음 보는 물건을 보면?',
    optionA: '이것으로 뭘 할 수 있을지 상상한다',
    optionB: '어떻게 작동하는지 파악한다',
  },
  {
    id: 22,
    dimension: 'NS',
    question: '나에 더 가까운 표현은?',
    optionA: '몽상가, 상상력이 풍부하다',
    optionB: '현실주의자, 실용적이다',
  },
  {
    id: 23,
    dimension: 'NS',
    question: '여행지에서 나는?',
    optionA: '알려지지 않은 새로운 곳을 탐험한다',
    optionB: '유명하고 검증된 곳을 먼저 간다',
  },
  {
    id: 24,
    dimension: 'NS',
    question: '계획을 세울 때 나는?',
    optionA: '방향만 대략 잡는다',
    optionB: '세부 일정까지 꼼꼼히 짠다',
  },

  // ── T-F (사고 vs 감정) 25~36 ──
  {
    id: 25,
    dimension: 'TF',
    question: '친구가 고민을 털어놓으면?',
    optionA: '해결책과 조언을 준다',
    optionB: '공감하며 감정을 함께 나눈다',
  },
  {
    id: 26,
    dimension: 'TF',
    question: '결정을 내릴 때 기준은?',
    optionA: '논리와 객관적 데이터',
    optionB: '감정과 가치관, 사람',
  },
  {
    id: 27,
    dimension: 'TF',
    question: '비판이나 지적을 받으면?',
    optionA: '내용이 맞으면 담담하게 받아들인다',
    optionB: '말투나 방식에 상처받기도 한다',
  },
  {
    id: 28,
    dimension: 'TF',
    question: '갈등 상황에서 나는?',
    optionA: '옳고 그름을 객관적으로 따진다',
    optionB: '모두의 감정과 입장을 고려한다',
  },
  {
    id: 29,
    dimension: 'TF',
    question: '영화를 볼 때 나는?',
    optionA: '스토리 구조와 논리성을 분석한다',
    optionB: '감정이입하며 울거나 웃는다',
  },
  {
    id: 30,
    dimension: 'TF',
    question: '더 자연스럽게 나오는 것은?',
    optionA: '정확하고 직접적인 피드백',
    optionB: '따뜻한 위로와 칭찬',
  },
  {
    id: 31,
    dimension: 'TF',
    question: '규칙에 대한 생각은?',
    optionA: '이유가 있으니 지켜야 한다',
    optionB: '상황에 따라 유연하게 적용해야 한다',
  },
  {
    id: 32,
    dimension: 'TF',
    question: '일할 때 더 중요한 것은?',
    optionA: '결과와 효율',
    optionB: '팀 분위기와 관계',
  },
  {
    id: 33,
    dimension: 'TF',
    question: '누군가 잘못했을 때 나는?',
    optionA: '사실을 직접적으로 말한다',
    optionB: '상대방 감정을 배려해 부드럽게 말한다',
  },
  {
    id: 34,
    dimension: 'TF',
    question: '내 강점이라면?',
    optionA: '냉철한 판단력과 분석력',
    optionB: '따뜻한 공감 능력과 배려심',
  },
  {
    id: 35,
    dimension: 'TF',
    question: '타인이 감정적으로 반응할 때?',
    optionA: '다소 이해하기 어렵다',
    optionB: '자연스럽게 감정을 받아준다',
  },
  {
    id: 36,
    dimension: 'TF',
    question: '더 중요한 것은?',
    optionA: '진실과 정확성',
    optionB: '조화와 배려',
  },

  // ── J-P (판단 vs 인식) 37~48 ──
  {
    id: 37,
    dimension: 'JP',
    question: '일정 관리는?',
    optionA: '계획대로 진행해야 안심된다',
    optionB: '그날그날 유연하게 한다',
  },
  {
    id: 38,
    dimension: 'JP',
    question: '마감 기한이 있을 때 나는?',
    optionA: '미리미리 여유 있게 완료한다',
    optionB: '마감 직전 집중력이 폭발한다',
  },
  {
    id: 39,
    dimension: 'JP',
    question: '내 방·책상 상태는?',
    optionA: '항상 정리정돈이 되어 있다',
    optionB: '나만의 방식으로 정리되어 있다',
  },
  {
    id: 40,
    dimension: 'JP',
    question: '여행 계획은?',
    optionA: '교통·숙박·일정을 미리 예약한다',
    optionB: '대략적인 계획만 세우고 즉흥적으로',
  },
  {
    id: 41,
    dimension: 'JP',
    question: '결정을 내리는 것은?',
    optionA: '빠르게 결정하고 실행한다',
    optionB: '여러 선택지를 열어두다가 결정한다',
  },
  {
    id: 42,
    dimension: 'JP',
    question: '할 일 목록(To-do list)에 대해?',
    optionA: '없으면 불안하다',
    optionB: '머릿속으로 관리하거나 쓰지 않는다',
  },
  {
    id: 43,
    dimension: 'JP',
    question: '예상치 못한 변화가 생기면?',
    optionA: '스트레스를 받고 계획을 다시 세운다',
    optionB: '오히려 설레고 적응을 즐긴다',
  },
  {
    id: 44,
    dimension: 'JP',
    question: '식당에서 메뉴를 고를 때?',
    optionA: '빠르게 결정한다',
    optionB: '오랫동안 고민한다',
  },
  {
    id: 45,
    dimension: 'JP',
    question: '주말은?',
    optionA: '미리 계획해두는 편',
    optionB: '그날 기분 따라 결정',
  },
  {
    id: 46,
    dimension: 'JP',
    question: '여러 일이 동시에 생기면?',
    optionA: '우선순위를 정해 하나씩 처리한다',
    optionB: '여러 일을 동시에 처리한다',
  },
  {
    id: 47,
    dimension: 'JP',
    question: '쇼핑할 때 나는?',
    optionA: '필요한 것 목록대로만 산다',
    optionB: '눈에 띄는 것을 충동적으로 산다',
  },
  {
    id: 48,
    dimension: 'JP',
    question: '나에 더 가까운 표현은?',
    optionA: '체계적이고 계획적인 사람',
    optionB: '자유롭고 유연한 사람',
  },
];

// 각 차원별 3문항 랜덤 선택 → 총 12문항 섞어서 반환
export function getRandomQuestions(): MBTIQuestion[] {
  const byDimension: Record<MBTIDimension, MBTIQuestion[]> = {
    EI: [],
    NS: [],
    TF: [],
    JP: [],
  };

  for (const q of MBTI_QUESTIONS) {
    byDimension[q.dimension].push(q);
  }

  const selected: MBTIQuestion[] = [];
  for (const dim of ['EI', 'NS', 'TF', 'JP'] as MBTIDimension[]) {
    // Fisher-Yates shuffle
    const arr = [...byDimension[dim]];
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    selected.push(...arr.slice(0, 3));
  }

  // 12문항 전체 섞기
  for (let i = selected.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [selected[i], selected[j]] = [selected[j], selected[i]];
  }

  return selected;
}
