// 이상형 동물상 테스트 — 동물 유형 데이터
// userGender: 이 동물을 결과로 받게 되는 사용자의 성별
//   male   → 이상형 여성 동물상 (고양이·토끼·여우·사슴·강아지)
//   female → 이상형 남성 동물상 (곰·늑대·사자·강아지·고양이)

export type UserGender = 'male' | 'female';

export interface AnimalType {
  id: string;
  userGender: UserGender;
  name: string;       // '고양이상'
  emoji: string;      // '🐱'
  keywords: string[]; // ['도도함', '섹시함', '자존감']
  summary: string;    // 한 줄 요약
  description: string;
  traits: string[];   // 특징 3~4개
  loveStyle: string;  // 연애 스타일
  // Tailwind 클래스
  gradientFrom: string;
  gradientTo: string;
  accentBg: string;
  accentText: string;
  badgeBg: string;
  badgeText: string;
  iconBg: string;
  iconText: string;
}

// 여성 동물상 (남성 사용자 결과)
const FEMALE_ANIMALS: AnimalType[] = [
  {
    id: 'cat-f',
    userGender: 'male',
    name: '고양이상',
    emoji: '🐱',
    keywords: ['도도함', '신비로움', '희귀한 애교'],
    summary: '차갑지만 가까워질수록 빠져드는, 도도한 매력의 소유자',
    description:
      '평소엔 쿨하고 자기 주관이 뚜렷하지만, 단둘이 있을 때만 보이는 애교가 치명적입니다. 혼자서도 잘 지내는 독립적인 성격 덕에 집착하지 않고 각자의 공간을 존중해줍니다.',
    traits: ['희귀한 애교가 더 소중함', '자존감이 높고 독립적', '눈빛과 분위기로 설레게 함', '가까워질수록 다른 사람'],
    loveStyle:
      '연락이 뜸할 때도 있지만, 보고 싶을 때 불쑥 나타나 모든 것을 보상합니다. 독점욕은 강하지만 표현은 은근합니다.',
    gradientFrom: 'from-violet-50',
    gradientTo: 'to-white',
    accentBg: 'bg-violet-600',
    accentText: 'text-violet-600',
    badgeBg: 'bg-violet-50',
    badgeText: 'text-violet-700',
    iconBg: 'bg-violet-100',
    iconText: 'text-violet-600',
  },
  {
    id: 'rabbit-f',
    userGender: 'male',
    name: '토끼상',
    emoji: '🐰',
    keywords: ['순수함', '청순함', '보호본능'],
    summary: '눈이 마주칠 때마다 설레는, 세상 순수한 매력의 소유자',
    description:
      '볼이 빨개지는 수줍은 미소가 상대의 보호본능을 자극합니다. 자신의 감정에 솔직하고 맑아서, 함께 있으면 자연스럽게 지켜주고 싶어집니다.',
    traits: ['수줍은 미소가 치명적', '감정 표현이 솔직하고 맑음', '상대를 편안하게 해주는 분위기', '순수한 설렘을 유지'],
    loveStyle:
      '자주 연락하고 답장이 늦으면 걱정합니다. 달달한 일상을 만들어가는 것을 좋아하고, 함께하는 모든 순간을 소중히 여깁니다.',
    gradientFrom: 'from-pink-50',
    gradientTo: 'to-white',
    accentBg: 'bg-pink-500',
    accentText: 'text-pink-500',
    badgeBg: 'bg-pink-50',
    badgeText: 'text-pink-700',
    iconBg: 'bg-pink-100',
    iconText: 'text-pink-600',
  },
  {
    id: 'fox-f',
    userGender: 'male',
    name: '여우상',
    emoji: '🦊',
    keywords: ['영리함', '센스', '전략적 매력'],
    summary: '대화가 재밌고 눈치가 빨라 함께 있으면 시간이 빨리 가는 타입',
    description:
      '상황 파악이 빠르고 센스 있는 리액션으로 어디서든 빛납니다. 자신을 어떻게 보여줄지 알고, 매력을 전략적으로 활용하는 능력이 탁월합니다.',
    traits: ['상황에 맞는 완벽한 리액션', '어딜 가도 분위기 주도', '대화 주제가 다양하고 재밌음', '적당한 밀당의 달인'],
    loveStyle:
      '적당한 밀당으로 상대를 설레게 합니다. 먼저 사과할 줄 알고, 연애도 전략적으로 잘 이끌어 나갑니다.',
    gradientFrom: 'from-orange-50',
    gradientTo: 'to-white',
    accentBg: 'bg-orange-500',
    accentText: 'text-orange-500',
    badgeBg: 'bg-orange-50',
    badgeText: 'text-orange-700',
    iconBg: 'bg-orange-100',
    iconText: 'text-orange-600',
  },
  {
    id: 'deer-f',
    userGender: 'male',
    name: '사슴상',
    emoji: '🦌',
    keywords: ['청순함', '우아함', '고요한 매력'],
    summary: '말없이 옆에 있어도 편안한, 은은하게 깊은 매력의 소유자',
    description:
      '조용하고 차분한 분위기 속에 깊은 감성을 품고 있습니다. 떠들썩하지 않아도 존재 자체로 공간을 채우는 우아함이 있습니다.',
    traits: ['말이 없어도 편안한 존재감', '섬세하고 감수성이 풍부함', '자연스럽고 꾸밈없는 매력', '깊이 사랑하면 전부를 줌'],
    loveStyle:
      '조용하지만 하루에 한 번은 꼭 안부를 묻습니다. 화려하진 않아도 오래갈수록 진가가 드러나는 사랑을 합니다.',
    gradientFrom: 'from-emerald-50',
    gradientTo: 'to-white',
    accentBg: 'bg-emerald-600',
    accentText: 'text-emerald-600',
    badgeBg: 'bg-emerald-50',
    badgeText: 'text-emerald-700',
    iconBg: 'bg-emerald-100',
    iconText: 'text-emerald-700',
  },
  {
    id: 'dog-f',
    userGender: 'male',
    name: '강아지상',
    emoji: '🐶',
    keywords: ['활발함', '다정함', '에너지'],
    summary: '함께 있으면 자연스럽게 웃게 되는, 에너지 넘치는 매력의 소유자',
    description:
      '먼저 다가오고 잘 웃는 성격으로 분위기를 밝게 만듭니다. 애교가 많고 감정 표현이 솔직해서 함께할수록 편안하고 즐거워집니다.',
    traits: ['리액션이 크고 잘 웃음', '먼저 연락하고 챙겨줌', '같이 있으면 에너지가 전염됨', '솔직한 감정 표현으로 신뢰감'],
    loveStyle:
      '하루에도 수십 번 연락하고 같이 있고 싶어합니다. 연인의 일상을 함께하고 싶어하고, 같이 웃는 순간을 소중히 여깁니다.',
    gradientFrom: 'from-yellow-50',
    gradientTo: 'to-white',
    accentBg: 'bg-yellow-500',
    accentText: 'text-yellow-600',
    badgeBg: 'bg-yellow-50',
    badgeText: 'text-yellow-700',
    iconBg: 'bg-yellow-100',
    iconText: 'text-yellow-600',
  },
];

// 남성 동물상 (여성 사용자 결과)
const MALE_ANIMALS: AnimalType[] = [
  {
    id: 'bear-m',
    userGender: 'female',
    name: '곰상',
    emoji: '🐻',
    keywords: ['듬직함', '포근함', '믿음직스러움'],
    summary: '큰 품에 안기면 세상 걱정이 사라지는, 든든한 매력의 소유자',
    description:
      '말이 많지 않아도 행동으로 챙기는 타입입니다. 어떤 상황에서도 흔들리지 않는 안정감이 있고, 한 번 마음을 주면 변하지 않는 신뢰를 줍니다.',
    traits: ['말 없이 행동으로 챙겨줌', '흔들리지 않는 안정감', '큰 덩치에 따뜻한 마음', '슬로우 스타터지만 깊은 사랑'],
    loveStyle:
      '매일 아침 "잘 잤어?" 하나씩 꾸준히 챙깁니다. 화려하지 않아도 항상 내 편이 되어주는, 오래갈수록 고마운 사랑을 합니다.',
    gradientFrom: 'from-amber-50',
    gradientTo: 'to-white',
    accentBg: 'bg-amber-700',
    accentText: 'text-amber-700',
    badgeBg: 'bg-amber-50',
    badgeText: 'text-amber-800',
    iconBg: 'bg-amber-100',
    iconText: 'text-amber-700',
  },
  {
    id: 'wolf-m',
    userGender: 'female',
    name: '늑대상',
    emoji: '🐺',
    keywords: ['카리스마', '절제', '강렬한 눈빛'],
    summary: '말이 없을수록 더 궁금해지는, 강렬한 카리스마의 소유자',
    description:
      '평소엔 조용하고 절제된 모습이지만, 한 번 마음을 주면 모든 것을 쏟아붓습니다. 눈빛 하나로 감정을 전달하는 능력이 있어 함께 있으면 저절로 긴장하게 됩니다.',
    traits: ['눈빛이 강렬하고 포스 있음', '말보다 행동으로 감정 표현', '한 번 마음 주면 절대적 신뢰', '무리 속에서도 중심 잡음'],
    loveStyle:
      '연락이 잦진 않지만 만날 때는 완전히 집중합니다. "너밖에 없어" 한 마디가 다른 어떤 달콤한 말보다 진하게 느껴집니다.',
    gradientFrom: 'from-slate-50',
    gradientTo: 'to-white',
    accentBg: 'bg-slate-700',
    accentText: 'text-slate-700',
    badgeBg: 'bg-slate-100',
    badgeText: 'text-slate-700',
    iconBg: 'bg-slate-100',
    iconText: 'text-slate-600',
  },
  {
    id: 'lion-m',
    userGender: 'female',
    name: '사자상',
    emoji: '🦁',
    keywords: ['리더십', '자신감', '존재감'],
    summary: '어딜 가든 눈에 띄는 존재감, 함께 있으면 어깨가 으쓱해지는 타입',
    description:
      '당당하고 추진력 있는 성격으로 주변을 이끕니다. 목표가 분명하고 자기 분야에서 빛나는 모습이 매력적이며, 연인에게도 최선을 다합니다.',
    traits: ['어딜 가도 시선을 끄는 존재감', '목표 지향적이고 추진력 강함', '연인에게 듬직하고 보호적', '자신감 있는 태도가 믿음직스러움'],
    loveStyle:
      '먼저 나서서 계획을 세우고 이끄는 스타일입니다. "내가 다 해결해줄게" 한 마디가 믿음직스럽게 느껴지는 연애를 합니다.',
    gradientFrom: 'from-yellow-50',
    gradientTo: 'to-white',
    accentBg: 'bg-yellow-600',
    accentText: 'text-yellow-600',
    badgeBg: 'bg-yellow-50',
    badgeText: 'text-yellow-800',
    iconBg: 'bg-yellow-100',
    iconText: 'text-yellow-700',
  },
  {
    id: 'dog-m',
    userGender: 'female',
    name: '강아지상',
    emoji: '🐶',
    keywords: ['다정함', '유머', '솔직함'],
    summary: '매일 웃게 해주는, 친구 같은 연인의 매력을 가진 타입',
    description:
      '잘 웃고 애교 있는 성격으로 어디서든 분위기를 만들어냅니다. 감정 표현이 솔직하고 구수한 매력이 있어 함께 있으면 편안함과 웃음이 끊이지 않습니다.',
    traits: ['잘 웃고 애교 많은 매력', '감정 표현이 솔직하고 투명함', '어린 아이/동물 앞에서 무장해제', '친구 같은 편안함이 연인의 온기로'],
    loveStyle:
      '하루에도 수십 번 연락하고 먼저 사과합니다. 매일 웃게 해주는 에너지 넘치는 연애를 하고, 상대를 최고의 친구이자 연인으로 대합니다.',
    gradientFrom: 'from-sky-50',
    gradientTo: 'to-white',
    accentBg: 'bg-sky-500',
    accentText: 'text-sky-600',
    badgeBg: 'bg-sky-50',
    badgeText: 'text-sky-700',
    iconBg: 'bg-sky-100',
    iconText: 'text-sky-600',
  },
  {
    id: 'cat-m',
    userGender: 'female',
    name: '고양이상',
    emoji: '🐱',
    keywords: ['신비로움', '감각적', '독립심'],
    summary: '알면 알수록 새로운 면이 보이는, 감각적인 매력의 소유자',
    description:
      '무뚝뚝하지만 세심하게 챙기는 섬세함이 있습니다. 자신만의 확고한 취향과 예술적 감각으로 곁에 있으면 세상이 다르게 보이는 경험을 선물합니다.',
    traits: ['무심한 듯 섬세하게 챙겨줌', '자기만의 확고한 취향과 감각', '독립적이지만 깊이 연결됨', '평소엔 쿨하다 둘만 있으면 완전히 달라짐'],
    loveStyle:
      '연락이 잦지 않지만 만나면 온전히 집중합니다. 각자의 공간을 존중하며 깊이 연결되는 성숙한 연애를 지향합니다.',
    gradientFrom: 'from-indigo-50',
    gradientTo: 'to-white',
    accentBg: 'bg-indigo-600',
    accentText: 'text-indigo-600',
    badgeBg: 'bg-indigo-50',
    badgeText: 'text-indigo-700',
    iconBg: 'bg-indigo-100',
    iconText: 'text-indigo-600',
  },
];

// 전체 동물 데이터 맵
export const ANIMAL_DATA: Record<string, AnimalType> = Object.fromEntries(
  [...FEMALE_ANIMALS, ...MALE_ANIMALS].map((a) => [a.id, a]),
);

// 성별별 동물 ID 배열 (질문 데이터와 매핑용)
export const ANIMAL_IDS_BY_USER_GENDER: Record<UserGender, string[]> = {
  male:   FEMALE_ANIMALS.map((a) => a.id), // 남성 사용자 → 여성 동물상
  female: MALE_ANIMALS.map((a) => a.id),   // 여성 사용자 → 남성 동물상
};
