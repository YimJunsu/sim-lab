// MBTI 16개 타입 설명 및 궁합 데이터

export interface MBTITypeInfo {
  type: string;
  title: string;        // 공식 별칭
  iconName: string;     // lucide-react 아이콘 이름 (컴포넌트에서 매핑)
  description: string;  // 한 줄 설명
  traits: string[];     // 특징 키워드 3~4개
  compatible: string[]; // 잘 맞는 유형 상위 2개
  color: string;        // Tailwind gradient class
}

export const MBTI_TYPES: Record<string, MBTITypeInfo> = {
  INTJ: {
    type: 'INTJ',
    title: '용의주도한 전략가',
    iconName: 'Landmark',
    description: '먼 미래를 내다보며 치밀한 계획을 세우는 독립적인 전략가. 논리와 효율을 최우선으로 생각합니다.',
    traits: ['독립적', '전략적', '완벽주의', '냉철함'],
    compatible: ['ENFP', 'ENTP'],
    color: 'from-slate-700 to-slate-900',
  },
  INTP: {
    type: 'INTP',
    title: '논리적인 사색가',
    iconName: 'FlaskConical',
    description: '세상의 원리를 탐구하는 것을 좋아하는 분석적 사색가. 복잡한 문제를 풀 때 가장 빛납니다.',
    traits: ['분석적', '호기심', '논리적', '독창적'],
    compatible: ['ENTJ', 'ENFJ'],
    color: 'from-blue-600 to-indigo-800',
  },
  ENTJ: {
    type: 'ENTJ',
    title: '대담한 통솔자',
    iconName: 'Trophy',
    description: '카리스마 넘치는 천생 리더. 명확한 목표를 향해 팀을 이끌며 불가능을 가능으로 만듭니다.',
    traits: ['리더십', '결단력', '카리스마', '야심'],
    compatible: ['INTP', 'INFP'],
    color: 'from-amber-600 to-orange-800',
  },
  ENTP: {
    type: 'ENTP',
    title: '뜨거운 논쟁을 즐기는 변론가',
    iconName: 'Zap',
    description: '지적 도전을 즐기는 창의적인 논쟁가. 새로운 아이디어를 발전시키는 데 탁월한 능력을 발휘합니다.',
    traits: ['창의적', '논쟁적', '영리함', '열정적'],
    compatible: ['INTJ', 'INFJ'],
    color: 'from-yellow-500 to-amber-700',
  },
  INFJ: {
    type: 'INFJ',
    title: '선의의 옹호자',
    iconName: 'Moon',
    description: '희귀하고 신비로운 이상주의자. 사람들의 내면을 꿰뚫어 보는 통찰력으로 세상을 더 나은 곳으로 만들고자 합니다.',
    traits: ['통찰력', '이상주의', '공감', '헌신적'],
    compatible: ['ENTP', 'ENFP'],
    color: 'from-violet-600 to-purple-900',
  },
  INFP: {
    type: 'INFP',
    title: '열정적인 중재자',
    iconName: 'Leaf',
    description: '깊은 내면세계를 가진 이상적인 몽상가. 진정한 가치와 의미를 추구하며 타인의 감정에 깊이 공감합니다.',
    traits: ['공감능력', '이상주의', '창의적', '성실함'],
    compatible: ['ENTJ', 'ENFJ'],
    color: 'from-green-500 to-teal-700',
  },
  ENFJ: {
    type: 'ENFJ',
    title: '정의로운 사회운동가',
    iconName: 'Star',
    description: '타고난 멘토이자 리더. 타인의 성장을 돕는 데서 기쁨을 얻으며 강한 카리스마로 사람들을 이끕니다.',
    traits: ['카리스마', '따뜻함', '리더십', '공감'],
    compatible: ['INTP', 'INFP'],
    color: 'from-rose-500 to-pink-700',
  },
  ENFP: {
    type: 'ENFP',
    title: '재기발랄한 활동가',
    iconName: 'Palette',
    description: '열정과 창의력이 넘치는 자유로운 영혼. 사람들에게 영감을 주고 새로운 가능성을 발견하는 데 탁월합니다.',
    traits: ['열정적', '창의적', '사교적', '낙천적'],
    compatible: ['INTJ', 'INFJ'],
    color: 'from-orange-400 to-rose-600',
  },
  ISTJ: {
    type: 'ISTJ',
    title: '청렴결백한 논리주의자',
    iconName: 'ClipboardList',
    description: '책임감이 강하고 신뢰할 수 있는 실용주의자. 규칙과 전통을 중시하며 맡은 일은 반드시 완수합니다.',
    traits: ['책임감', '신뢰성', '체계적', '성실함'],
    compatible: ['ESFP', 'ESTP'],
    color: 'from-stone-600 to-stone-800',
  },
  ISFJ: {
    type: 'ISFJ',
    title: '용감한 수호자',
    iconName: 'Shield',
    description: '따뜻하고 헌신적인 보호자. 사랑하는 사람들을 위해 조용히 헌신하며 섬세하게 배려합니다.',
    traits: ['헌신적', '따뜻함', '세심함', '신뢰성'],
    compatible: ['ESFP', 'ESTP'],
    color: 'from-sky-500 to-cyan-700',
  },
  ESTJ: {
    type: 'ESTJ',
    title: '엄격한 관리자',
    iconName: 'Scale',
    description: '질서와 규칙을 중시하는 관리자. 명확한 원칙을 바탕으로 조직을 효율적으로 이끕니다.',
    traits: ['체계적', '리더십', '책임감', '결단력'],
    compatible: ['ISFP', 'ISTP'],
    color: 'from-indigo-600 to-blue-800',
  },
  ESFJ: {
    type: 'ESFJ',
    title: '사교적인 외교관',
    iconName: 'Handshake',
    description: '따뜻한 마음으로 주변을 돌보는 사교적 외교관. 사람들을 연결하고 조화로운 환경을 만드는 데 뛰어납니다.',
    traits: ['사교적', '배려심', '따뜻함', '협력적'],
    compatible: ['ISFP', 'ISTP'],
    color: 'from-pink-400 to-rose-600',
  },
  ISTP: {
    type: 'ISTP',
    title: '만능 재주꾼',
    iconName: 'Wrench',
    description: '조용하지만 대담한 탐구자. 손으로 직접 만들고 분석하는 것을 즐기며 위기 상황에서 빛납니다.',
    traits: ['분석적', '실용적', '독립적', '냉정함'],
    compatible: ['ESTJ', 'ESFJ'],
    color: 'from-zinc-600 to-slate-800',
  },
  ISFP: {
    type: 'ISFP',
    title: '호기심 많은 예술가',
    iconName: 'Paintbrush',
    description: '자유롭고 매력적인 예술가. 자신만의 방식으로 아름다움을 표현하며 현재의 순간을 소중히 여깁니다.',
    traits: ['예술적', '자유로움', '온화함', '감수성'],
    compatible: ['ESTJ', 'ESFJ'],
    color: 'from-fuchsia-500 to-purple-700',
  },
  ESTP: {
    type: 'ESTP',
    title: '모험을 즐기는 사업가',
    iconName: 'Rocket',
    description: '에너지 넘치는 행동파. 위험을 감수하고 현재를 즐기며 위기 상황을 기회로 바꾸는 능력이 탁월합니다.',
    traits: ['행동력', '대담함', '현실적', '사교적'],
    compatible: ['ISTJ', 'ISFJ'],
    color: 'from-red-500 to-orange-700',
  },
  ESFP: {
    type: 'ESFP',
    title: '자유로운 영혼의 연예인',
    iconName: 'Music',
    description: '주변을 환하게 밝히는 타고난 엔터테이너. 삶을 즐기는 방법을 알고 사람들에게 기쁨을 선사합니다.',
    traits: ['활발함', '낙천적', '사교적', '즉흥적'],
    compatible: ['ISTJ', 'ISFJ'],
    color: 'from-yellow-400 to-orange-500',
  },
};

// 각 차원별 레이블
export const DIMENSION_LABELS = {
  EI: { A: 'E', B: 'I', nameA: '외향형', nameB: '내향형' },
  NS: { A: 'N', B: 'S', nameA: '직관형', nameB: '감각형' },
  TF: { A: 'T', B: 'F', nameA: '사고형', nameB: '감정형' },
  JP: { A: 'J', B: 'P', nameA: '판단형', nameB: '인식형' },
} as const;

// 차원별 컬러 (텍스트 + 바)
export const DIMENSION_COLORS = {
  EI: { barA: 'bg-blue-500',   barB: 'bg-slate-400',   textA: 'text-blue-600',   textB: 'text-slate-500'   },
  NS: { barA: 'bg-violet-500', barB: 'bg-amber-500',   textA: 'text-violet-600', textB: 'text-amber-600'   },
  TF: { barA: 'bg-teal-500',   barB: 'bg-rose-500',    textA: 'text-teal-600',   textB: 'text-rose-600'    },
  JP: { barA: 'bg-indigo-500', barB: 'bg-emerald-500', textA: 'text-indigo-600', textB: 'text-emerald-600' },
} as const;
