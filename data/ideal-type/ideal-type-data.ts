// 이상형 성향 테스트 — 결과 유형 데이터
// 6종 (반반 믹스): protector / romantic / bestfriend / explorer / independent / pure
// userGender 무관 — 누구나 어떤 유형이든 결과로 받을 수 있음

export type IdealTypeId =
  | 'protector'    // 🐻 든든한 보호자형
  | 'romantic'     // 💝 설레는 로맨티스트형
  | 'bestfriend'   // 🐶 유쾌한 절친형
  | 'explorer'     // 🦁 지적인 탐험가형
  | 'independent'  // 🐱 쿨한 독립주의형
  | 'pure';        // 🐰 따뜻한 청순형

export interface CompatibleMBTI {
  type: string;    // 'INFP'
  stars: number;   // 3 | 4 | 5
  reason: string;  // 궁합 이유 한 줄
}

export interface IdealTypeInfo {
  id: IdealTypeId;
  name: string;
  emoji: string;
  keywords: string[];
  summary: string;
  description: string;
  traits: string[];
  loveStyle: string;
  compatibleMBTI: CompatibleMBTI[]; // 3개, stars 내림차순
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

export const IDEAL_TYPE_DATA: Record<IdealTypeId, IdealTypeInfo> = {
  protector: {
    id: 'protector',
    name: '든든한 보호자형',
    emoji: '🐻',
    keywords: ['안정감', '믿음직함', '묵직한 리더십'],
    summary: '곁에 있으면 세상 무서울 게 없는, 든든한 울타리 같은 사람',
    description:
      '화려한 말보다 묵묵한 행동으로 사랑을 표현합니다. 위기 상황에서 더욱 빛나며, 상대를 지키려는 본능이 강합니다. 처음엔 무뚝뚝해 보여도 가까워질수록 깊은 신뢰가 쌓이는 타입입니다.',
    traits: [
      '말보다 행동으로 사랑을 증명한다',
      '위기 상황에서 가장 빛난다',
      '한번 마음 주면 끝까지 책임진다',
      '안정감 자체가 최고의 매력이다',
    ],
    loveStyle:
      '자주 연락하진 않지만 항상 거기 있습니다. 기념일보단 일상의 안정감으로 사랑을 표현하고, 상대가 힘들 때 말없이 옆에 있어주는 타입입니다.',
    compatibleMBTI: [
      {
        type: 'INFP',
        stars: 5,
        reason:
          '감성적인 INFP의 순수함이 보호자형의 보호본능을 가장 강하게 자극. INFP의 이상주의를 현실적으로 지탱해주는 완벽한 조합',
      },
      {
        type: 'ISFP',
        stars: 4,
        reason:
          '조용하고 섬세한 ISFP가 보호자형의 묵직함에 편안함을 느낌. 서로 말이 없어도 통하는 관계',
      },
      {
        type: 'ENFP',
        stars: 3,
        reason:
          'ENFP의 에너지가 보호자형의 일상에 활력을 주고, 보호자형의 안정감이 ENFP를 현실에 착지시킴',
      },
    ],
    gradientFrom: 'from-amber-50',
    gradientTo: 'to-white',
    accentBg: 'bg-amber-600',
    accentText: 'text-amber-600',
    badgeBg: 'bg-amber-50',
    badgeText: 'text-amber-700',
    iconBg: 'bg-amber-100',
    iconText: 'text-amber-600',
  },

  romantic: {
    id: 'romantic',
    name: '설레는 로맨티스트형',
    emoji: '💝',
    keywords: ['감성', '이벤트', '세심한 배려'],
    summary: '작은 것도 기억하고, 매일을 특별하게 만드는 감성의 달인',
    description:
      '"오늘 뭐 먹고 싶어?"가 아니라 "네가 좋아하는 거 예약해뒀어"인 사람입니다. 기념일, 깜짝 이벤트, 손편지가 어색하지 않고 자연스러운 타입으로, 상대가 사랑받고 있다는 걸 매일 느끼게 해줍니다.',
    traits: [
      '작은 것도 기억하고 큰 감동을 준다',
      '기념일과 이벤트에 진심이다',
      '감정 표현이 자연스럽고 풍부하다',
      '상대의 기분 변화를 가장 먼저 캐치한다',
    ],
    loveStyle:
      '감정 표현에 적극적이며 상대의 작은 변화도 놓치지 않습니다. 함께하는 모든 순간을 특별하게 만들려는 노력이 진심에서 우러납니다.',
    compatibleMBTI: [
      {
        type: 'INTJ',
        stars: 5,
        reason:
          '표현에 서툰 INTJ가 로맨티스트의 적극적인 감정 표현으로 처음으로 사랑의 온기를 느낌. INTJ의 깊은 내면이 로맨티스트에게 탐구 욕구를 자극하는 최고의 대비 케미',
      },
      {
        type: 'INFP',
        stars: 5,
        reason:
          '감성 대 감성의 시너지. 둘 다 낭만과 감정 표현을 중시해 서로 깊이 공명하는 관계',
      },
      {
        type: 'ISTP',
        stars: 4,
        reason:
          '현실적인 ISTP가 로맨티스트의 이벤트에 내심 감동하면서도 티 안 내는 반응이 로맨티스트를 더 설레게 함',
      },
    ],
    gradientFrom: 'from-rose-50',
    gradientTo: 'to-white',
    accentBg: 'bg-rose-500',
    accentText: 'text-rose-500',
    badgeBg: 'bg-rose-50',
    badgeText: 'text-rose-700',
    iconBg: 'bg-rose-100',
    iconText: 'text-rose-500',
  },

  bestfriend: {
    id: 'bestfriend',
    name: '유쾌한 절친형',
    emoji: '🐶',
    keywords: ['웃음', '편안함', '솔직한 에너지'],
    summary: '연인이자 평생 단짝, 같이 있으면 배꼽 빠지는 에너자이저',
    description:
      '데이트가 아니라 그냥 같이 있는 게 행복한 타입입니다. 말 안 해도 눈빛으로 웃고, 어디서든 재미를 만들어냅니다. 장거리·명절·위기도 웃음으로 넘기는 밝은 에너지의 소유자.',
    traits: [
      '어디서든 재미를 만들어낸다',
      '싸워도 금방 풀고 솔직하게 털어낸다',
      '같이 있으면 시간 가는 줄 모른다',
      '연인이자 가장 편한 친구 같은 존재',
    ],
    loveStyle:
      '솔직하게 다 말하는 스타일입니다. 연애가 아닌 것 같아도 누구보다 깊이 연결된 관계를 만들고, 일상 속 작은 순간들을 최고의 추억으로 만들어줍니다.',
    compatibleMBTI: [
      {
        type: 'ISFJ',
        stars: 5,
        reason:
          '차분한 ISFJ가 절친형의 에너지를 묵묵히 받아주면서 뒤에서 챙겨주는 역할. 조용한 안정과 활기의 황금 밸런스',
      },
      {
        type: 'INFJ',
        stars: 4,
        reason:
          '깊이 있는 INFJ가 절친형의 유머 뒤에 숨겨진 진심을 꿰뚫어 봄. 서로 다른 에너지가 오히려 신선한 자극',
      },
      {
        type: 'ISTJ',
        stars: 3,
        reason:
          '신뢰 기반으로 쌓이는 관계. 처음엔 차이가 크지만 시간이 지날수록 서로에게 없는 것을 채워주는 구조',
      },
    ],
    gradientFrom: 'from-orange-50',
    gradientTo: 'to-white',
    accentBg: 'bg-orange-500',
    accentText: 'text-orange-500',
    badgeBg: 'bg-orange-50',
    badgeText: 'text-orange-700',
    iconBg: 'bg-orange-100',
    iconText: 'text-orange-500',
  },

  explorer: {
    id: 'explorer',
    name: '지적인 탐험가형',
    emoji: '🦁',
    keywords: ['대화', '성장', '지적 자극'],
    summary: '같이 있으면 세상이 더 넓어지는, 끝없는 지적 자극의 원천',
    description:
      '"그거 알아?"로 시작하는 대화가 몇 시간이 지나는 타입입니다. 새로운 것에 대한 호기심이 넘쳐 함께하면 계속 성장하는 느낌을 받습니다. 데이트 장소로 전시회·독립영화·낯선 골목을 고릅니다.',
    traits: [
      '대화가 연애의 90%를 차지한다',
      '새로운 곳, 새로운 경험을 사랑한다',
      '함께 있으면 계속 성장하게 만든다',
      '가볍게 노는 것보다 깊이 파고드는 관계를 원한다',
    ],
    loveStyle:
      '가볍게 노는 것보다 깊은 곳까지 파고드는 관계를 선호합니다. 서로의 세계관을 넓혀주는 파트너로서, 함께할수록 더 큰 사람이 되는 관계를 만들어갑니다.',
    compatibleMBTI: [
      {
        type: 'ENFJ',
        stars: 5,
        reason:
          '따뜻한 ENFJ가 탐험가형의 냉철한 논리에 감성을 불어넣어 줌. ENFJ는 탐험가의 지적 깊이에 매료되고, 탐험가는 ENFJ의 사람 이해력에 배움을 얻음',
      },
      {
        type: 'INFJ',
        stars: 5,
        reason:
          '직관형끼리의 철학적 대화가 끝이 없음. 서로의 세계관을 넓혀주는 최고의 지적 파트너',
      },
      {
        type: 'ENFP',
        stars: 4,
        reason:
          'ENFP의 아이디어 폭격을 탐험가가 논리로 정리해주는 시너지. 서로에게서 새로운 시각을 계속 발견',
      },
    ],
    gradientFrom: 'from-teal-50',
    gradientTo: 'to-white',
    accentBg: 'bg-teal-600',
    accentText: 'text-teal-600',
    badgeBg: 'bg-teal-50',
    badgeText: 'text-teal-700',
    iconBg: 'bg-teal-100',
    iconText: 'text-teal-600',
  },

  independent: {
    id: 'independent',
    name: '쿨한 독립주의형',
    emoji: '🐱',
    keywords: ['자존감', '개인 공간 존중', '신비로운 매력'],
    summary: '사귀어도 각자의 삶이 있고, 그래서 더 오래가는 성숙한 관계',
    description:
      '집착하지 않고 개인 공간을 지켜줍니다. 연락이 뜸해도 불안하지 않게 해주는 묘한 안정감이 있습니다. 가까워지기 어렵지만 한번 마음을 열면 전부를 보여주는 타입입니다.',
    traits: [
      '"보고 싶으면 보고, 안 보고 싶으면 안 봐도 돼"가 진심',
      '서로의 성장을 응원하는 성숙한 연애',
      '가까워질수록 더 깊어지는 관계',
      '자존감이 높고 자기 세계가 뚜렷하다',
    ],
    loveStyle:
      '"보고 싶으면 보고, 안 보고 싶으면 안 봐도 돼"가 진심인 관계입니다. 서로의 성장을 응원하는 성숙한 연애를 지향하며, 함께할수록 더 자유로워지는 관계를 만들어갑니다.',
    compatibleMBTI: [
      {
        type: 'ENFP',
        stars: 5,
        reason:
          '자유로운 영혼의 ENFP만이 도도한 독립주의형의 마음을 자연스럽게 열 수 있음. ENFP는 집착하지 않으면서도 진심 어린 관심을 보내는 유일한 타입. 밀당 없이도 설레는 관계',
      },
      {
        type: 'ENTP',
        stars: 5,
        reason:
          '지적 대등함으로 자존심을 건드리지 않고 매력을 발산. 독립주의형이 "이 사람은 나를 이해한다"고 느끼는 순간 마음을 여는 구조',
      },
      {
        type: 'INTP',
        stars: 4,
        reason:
          '비슷한 독립적 성향끼리 서로를 가장 이해. 사생활 존중이 당연한 관계, 침묵도 어색하지 않음',
      },
    ],
    gradientFrom: 'from-violet-50',
    gradientTo: 'to-white',
    accentBg: 'bg-violet-600',
    accentText: 'text-violet-600',
    badgeBg: 'bg-violet-50',
    badgeText: 'text-violet-700',
    iconBg: 'bg-violet-100',
    iconText: 'text-violet-600',
  },

  pure: {
    id: 'pure',
    name: '따뜻한 청순형',
    emoji: '🐰',
    keywords: ['순수함', '따뜻한 배려', '보호본능 자극'],
    summary: '지키고 싶은 맑음과 세상 가장 따뜻한 온기를 가진 사람',
    description:
      '나쁜 마음이 없고 솔직해서, 함께 있으면 자연스럽게 지켜주고 싶어집니다. 작은 것에 크게 감동하고, 그 감동이 진심인 줄 누구나 알게 됩니다. 주변 사람들을 밝게 만드는 긍정 에너지의 원천.',
    traits: [
      '작은 것에도 진심으로 감동한다',
      '나쁜 마음이 없어 보호본능을 자극한다',
      '함께 있으면 자연스럽게 웃게 된다',
      '어둡고 힘든 상황도 맑게 만드는 에너지',
    ],
    loveStyle:
      '화려한 이벤트보다 소소한 일상의 따뜻함으로 사랑을 표현합니다. 상대를 밝게 만들어주는 긍정 에너지가 가장 큰 매력이며, 함께할수록 세상이 더 좋아 보이게 만드는 사람입니다.',
    compatibleMBTI: [
      {
        type: 'ESTJ',
        stars: 5,
        reason:
          '현실적이고 책임감 있는 ESTJ가 청순형을 현실에서 실질적으로 보호. 청순형의 따뜻함이 ESTJ의 업무적 경직을 녹여주는 최고의 온도 차 케미',
      },
      {
        type: 'ENTJ',
        stars: 5,
        reason:
          '카리스마 넘치는 ENTJ의 리더십이 청순형의 보호본능을 강하게 자극. 청순형의 순수한 감동 반응이 ENTJ를 무장 해제시키는 관계',
      },
      {
        type: 'ESFJ',
        stars: 4,
        reason:
          '비슷한 따뜻함을 가진 둘의 조합. 서로 배려하고 챙기는 안정적인 연애. 둘 다 따뜻해 온기가 가득한 관계',
      },
    ],
    gradientFrom: 'from-pink-50',
    gradientTo: 'to-white',
    accentBg: 'bg-pink-500',
    accentText: 'text-pink-500',
    badgeBg: 'bg-pink-50',
    badgeText: 'text-pink-700',
    iconBg: 'bg-pink-100',
    iconText: 'text-pink-500',
  },
};

// 결과 페이지에서 유효한 id 검증용
export const IDEAL_TYPE_IDS: IdealTypeId[] = [
  'protector',
  'romantic',
  'bestfriend',
  'explorer',
  'independent',
  'pure',
];

// 적응형 분기 트리거 유형 (Q12 완료 후 1위이면 Q13~Q14 표시)
export const ADAPTIVE_TRIGGER_TYPES: IdealTypeId[] = ['independent', 'pure'];
