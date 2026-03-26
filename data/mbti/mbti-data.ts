export interface MBTITypeInfo {
  type: string;
  title: string;        // 공식 별칭
  iconName: string;     // lucide-react 아이콘 이름
  description: string;  // 한 줄 설명
  traits: string[];     // 핵심 특징 키워드
  compatible: string[]; // 최상의 궁합 상위 2개
  color: string;        // 디자인 가이드용 그라디언트
}

export const MBTI_TYPES: Record<string, MBTITypeInfo> = {
  INTJ: {
    type: 'INTJ',
    title: '용의주도한 전략가',
    iconName: 'Landmark',
    description: '전략적 사고와 치밀한 계획으로 미래를 설계하는 독립적인 혁신가입니다.',
    traits: ['전략적', '독립적', '논리적', '통찰력'],
    compatible: ['ENFP', 'ENTP'],
    color: 'from-slate-700 to-slate-900',
  },
  INTP: {
    type: 'INTP',
    title: '논리적인 사색가',
    iconName: 'FlaskConical',
    description: '끊임없이 새로운 아이디어를 탐구하고 분석하는 지적 호기심이 넘치는 사색가입니다.',
    traits: ['분석적', '독창적', '객관적', '수평적'],
    compatible: ['ENTJ', 'ENFJ'],
    color: 'from-blue-600 to-indigo-800',
  },
  ENTJ: {
    type: 'ENTJ',
    title: '대담한 통솔자',
    iconName: 'Trophy',
    description: '명확한 비전으로 목표를 달성하며 팀을 효율적으로 이끄는 카리스마 리더입니다.',
    traits: ['결단력', '통솔력', '체계적', '야망'],
    compatible: ['INTP', 'INFP'],
    color: 'from-amber-600 to-orange-800',
  },
  ENTP: {
    type: 'ENTP',
    title: '뜨거운 논쟁을 즐기는 변론가',
    iconName: 'Zap',
    description: '고정관념을 깨는 새로운 시각으로 지적 도전을 즐기는 재치 있는 전략가입니다.',
    traits: ['창의적', '다재다능', '논쟁적', '자유로움'],
    compatible: ['INTJ', 'INFJ'],
    color: 'from-yellow-500 to-amber-700',
  },
  INFJ: {
    type: 'INFJ',
    title: '선의의 옹호자',
    iconName: 'Moon',
    description: '강한 통찰력과 이상주의를 바탕으로 타인의 성장을 돕는 신비로운 조력자입니다.',
    traits: ['통찰력', '헌신적', '이상주의', '섬세함'],
    compatible: ['ENTP', 'ENFP'],
    color: 'from-violet-600 to-purple-900',
  },
  INFP: {
    type: 'INFP',
    title: '열정적인 중재자',
    iconName: 'Leaf',
    description: '자신만의 가치를 소중히 여기며 타인에게 깊이 공감하는 따뜻한 이상주의자입니다.',
    traits: ['공감능력', '창의적', '유연함', '순수함'],
    compatible: ['ENTJ', 'ENFJ'],
    color: 'from-green-500 to-teal-700',
  },
  ENFJ: {
    type: 'ENFJ',
    title: '정의로운 사회운동가',
    iconName: 'Star',
    description: '타인의 잠재력을 이끌어내며 더 나은 사회를 위해 헌신하는 따뜻한 리더입니다.',
    traits: ['이타적', '카리스마', '사교적', '공감'],
    compatible: ['INTP', 'INFP'],
    color: 'from-rose-500 to-pink-700',
  },
  ENFP: {
    type: 'ENFP',
    title: '재기발랄한 활동가',
    iconName: 'Palette',
    description: '풍부한 상상력과 활기찬 에너지로 주변 사람들에게 영감을 주는 자유로운 영혼입니다.',
    traits: ['낙천적', '창의적', '열정적', '에너자이저'],
    compatible: ['INTJ', 'INFJ'],
    color: 'from-orange-400 to-rose-600',
  },
  ISTJ: {
    type: 'ISTJ',
    title: '청렴결백한 논리주의자',
    iconName: 'ClipboardList',
    description: '철저한 현실 감각과 책임감으로 맡은 바 임무를 완수하는 신뢰할 수 있는 실무자입니다.',
    traits: ['책임감', '질서정연', '현실적', '신중함'],
    compatible: ['ESFP', 'ESTP'],
    color: 'from-stone-600 to-stone-800',
  },
  ISFJ: {
    type: 'ISFJ',
    title: '용감한 수호자',
    iconName: 'Shield',
    description: '주변 사람들을 세심하게 배려하고 전통과 규칙을 소중히 여기는 헌신적인 보호자입니다.',
    traits: ['헌신적', '안정적', '인내심', '세심함'],
    compatible: ['ESFP', 'ESTP'],
    color: 'from-sky-500 to-cyan-700',
  },
  ESTJ: {
    type: 'ESTJ',
    title: '엄격한 관리자',
    iconName: 'Scale',
    description: '정해진 원칙에 따라 조직을 효율적으로 운영하며 실질적인 성과를 내는 관리자입니다.',
    traits: ['현실적', '리더십', '추진력', '솔직함'],
    compatible: ['ISFP', 'ISTP'],
    color: 'from-indigo-600 to-blue-800',
  },
  ESFJ: {
    type: 'ESFJ',
    title: '사교적인 외교관',
    iconName: 'Handshake',
    description: '친절하고 사교적인 성격으로 주변 사람들을 연결하며 화합을 도모하는 협력가입니다.',
    traits: ['사교적', '친절함', '협조적', '책임감'],
    compatible: ['ISFP', 'ISTP'],
    color: 'from-pink-400 to-rose-600',
  },
  ISTP: {
    type: 'ISTP',
    title: '만능 재주꾼',
    iconName: 'Wrench',
    description: '냉철한 분석력과 실질적인 기술을 바탕으로 상황에 유연하게 대응하는 해결사입니다.',
    traits: ['실용적', '관찰력', '적응력', '독립적'],
    compatible: ['ESTJ', 'ESFJ'],
    color: 'from-zinc-600 to-slate-800',
  },
  ISFP: {
    type: 'ISFP',
    title: '호기심 많은 예술가',
    iconName: 'Paintbrush',
    description: '현재의 감각에 충실하며 따뜻한 감성과 예술적 영감을 자유롭게 표현하는 예술가입니다.',
    traits: ['예술적', '온화함', '자유로움', '감수성'],
    compatible: ['ESTJ', 'ESFJ'],
    color: 'from-fuchsia-500 to-purple-700',
  },
  ESTP: {
    type: 'ESTP',
    title: '모험을 즐기는 사업가',
    iconName: 'Rocket',
    description: '빠른 판단력과 대담한 행동으로 현실의 문제를 즉각 해결해 나가는 활동가입니다.',
    traits: ['활동적', '적응력', '사교적', '실용적'],
    compatible: ['ISTJ', 'ISFJ'],
    color: 'from-red-500 to-orange-700',
  },
  ESFP: {
    type: 'ESFP',
    title: '자유로운 영혼의 연예인',
    iconName: 'Music',
    description: '어디서나 에너지가 넘치며 주변 사람들에게 즐거움을 선사하는 타고난 엔터테이너입니다.',
    traits: ['낙천적', '사교적', '즉흥적', '감각적'],
    compatible: ['ISTJ', 'ISFJ'],
    color: 'from-yellow-400 to-orange-500',
  },
};

// 궁합 이유 맵: 키는 두 유형을 알파벳순 정렬 후 '+' 연결 (양방향 조회 가능)
// getCompatibleReason(typeA, typeB) 함수로 사용
const COMPATIBLE_REASON_MAP: Record<string, string> = {
  'ENFJ+INTP': 'ENFJ의 따뜻한 공감이 INTP의 냉철한 논리와 균형을 이루며 서로의 약점을 채워줍니다.',
  'ENFJ+INFP': 'ENFJ의 이끌어주는 리더십이 INFP의 섬세한 감성을 지지하며 깊은 유대를 형성합니다.',
  'ENFP+INTJ': 'INTJ의 전략적 사고가 ENFP의 창의적 에너지에 방향성을 부여하며 강한 시너지를 냅니다.',
  'ENFP+INFJ': 'INFJ의 깊은 통찰과 ENFP의 낙관적 에너지가 공명하며 서로에게 영감을 줍니다.',
  'ENTJ+INTP': 'ENTJ의 실행력이 INTP의 분석적 통찰을 현실로 이끌어 강력한 파트너십을 형성합니다.',
  'ENTJ+INFP': 'INFP의 가치 중심적 시각이 ENTJ의 목표 지향성에 인간적 깊이를 더해줍니다.',
  'ENTP+INFJ': 'INFJ의 깊은 통찰과 ENTP의 논리적 탐구가 서로를 자극하며 지적 교감을 나눕니다.',
  'ENTP+INTJ': '두 유형 모두 지적 깊이를 추구하며, ENTP의 발산적 아이디어를 INTJ가 체계화합니다.',
  'ESFJ+ISFP': 'ISFP의 예술적 감성이 ESFJ의 사교적 따뜻함과 어우러져 자연스러운 조화를 이룹니다.',
  'ESFJ+ISTP': 'ISTP의 독립적 문제 해결이 ESFJ의 사회적 조화 추구와 균형을 맞추며 보완합니다.',
  'ESFP+ISFJ': '두 유형 모두 현재에 충실하며, ESFP의 개방성이 ISFJ의 헌신적 배려와 조화롭습니다.',
  'ESFP+ISTJ': 'ESFP의 활기찬 에너지가 ISTJ의 안정적인 기반 위에서 더욱 빛을 발합니다.',
  'ESTJ+ISFP': 'ISFP의 감성적 유연함이 ESTJ의 구조적 사고에 부드러운 균형을 제공합니다.',
  'ESTJ+ISTP': 'ISTP의 실용적 기술력과 ESTJ의 체계적 추진력이 효율적으로 맞아떨어집니다.',
  'ESTP+ISFJ': 'ESTP의 대담한 행동력이 ISFJ의 따뜻한 지지를 받으며 서로를 성장시킵니다.',
  'ESTP+ISTJ': 'ESTP의 즉흥적 실행력이 ISTJ의 체계적 지원과 만나 더욱 강해집니다.',
};

/** 두 유형 간 궁합 이유를 반환합니다 (순서 무관) */
export function getCompatibleReason(typeA: string, typeB: string): string {
  const key = [typeA, typeB].sort().join('+');
  return COMPATIBLE_REASON_MAP[key] ?? '상호 보완적인 성향으로 서로의 강점을 이끌어냅니다.';
}

// 차원별 정의 및 컬러 상수는 기존 데이터가 매우 훌륭하여 그대로 유지합니다.
export const DIMENSION_LABELS = {
  EI: { A: 'E', B: 'I', nameA: '외향형', nameB: '내향형' },
  NS: { A: 'N', B: 'S', nameA: '직관형', nameB: '감각형' },
  TF: { A: 'T', B: 'F', nameA: '사고형', nameB: '감정형' },
  JP: { A: 'J', B: 'P', nameA: '판단형', nameB: '인식형' },
} as const;

export const DIMENSION_COLORS = {
  EI: { barA: 'bg-blue-500',   barB: 'bg-slate-400',   textA: 'text-blue-600',   textB: 'text-slate-500'   },
  NS: { barA: 'bg-violet-500', barB: 'bg-amber-500',   textA: 'text-violet-600', textB: 'text-amber-600'   },
  TF: { barA: 'bg-teal-500',   barB: 'bg-rose-500',    textA: 'text-teal-600',   textB: 'text-rose-600'    },
  JP: { barA: 'bg-indigo-500', barB: 'bg-emerald-500', textA: 'text-indigo-600', textB: 'text-emerald-600' },
} as const;