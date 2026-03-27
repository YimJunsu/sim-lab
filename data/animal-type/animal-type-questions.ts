// 이상형 동물상 테스트 — 질문 데이터
// forGender: 이 질문을 보게 되는 사용자의 성별
//   'male'   → 10문항, 여성 동물상 5종 (cat-f / rabbit-f / fox-f / deer-f / dog-f)
//   'female' → 10문항, 남성 동물상 5종 (bear-m / wolf-m / lion-m / dog-m / cat-m)
//
// 각 질문의 선택지는 동물 ID와 1:1 매핑 (순서 고정, 셔플 없음)

import type { UserGender } from './animal-type-data';

export interface AnimalChoice {
  text: string;
  animalId: string;
}

export interface AnimalQuestion {
  id: number;
  question: string;
  forGender: UserGender;
  choices: AnimalChoice[]; // 5개, 순서: 설계 문서 기준
}

// ── 남성 사용자 질문 10문항 ──────────────────────────────────────────────
// 선택지 순서: cat-f / rabbit-f / fox-f / deer-f / dog-f
const MALE_USER_QUESTIONS: AnimalQuestion[] = [
  {
    id: 1,
    forGender: 'male',
    question: '처음 눈이 마주쳤을 때 내 이상형의 반응은?',
    choices: [
      { animalId: 'cat-f',    text: '잠깐 눈을 맞추다 도도하게 시선을 돌린다' },
      { animalId: 'rabbit-f', text: '깜짝 놀라 수줍게 고개를 숙인다' },
      { animalId: 'fox-f',    text: '살짝 미소 지으며 자연스럽게 시선을 받아준다' },
      { animalId: 'deer-f',   text: '순하게 웃으며 조용히 눈을 마주친다' },
      { animalId: 'dog-f',    text: '활짝 웃으며 먼저 손을 흔든다' },
    ],
  },
  {
    id: 2,
    forGender: 'male',
    question: '연인이 된다면 이상형의 연락 스타일은?',
    choices: [
      { animalId: 'cat-f',    text: '바쁠 땐 뜸하지만 보고 싶을 때 불쑥 연락한다' },
      { animalId: 'rabbit-f', text: '자주 연락하고 답장이 조금만 늦어도 걱정한다' },
      { animalId: 'fox-f',    text: '적당히 연락하되 답장은 센스 있게 한다' },
      { animalId: 'deer-f',   text: '조용하지만 하루에 한 번은 꼭 안부를 묻는다' },
      { animalId: 'dog-f',    text: '하루에도 수십 번, 보낸 연락만큼 받고 싶어한다' },
    ],
  },
  {
    id: 3,
    forGender: 'male',
    question: '내가 힘들어 보일 때 이상형이 해줬으면 하는 행동은?',
    choices: [
      { animalId: 'cat-f',    text: '말없이 옆에 앉아 있어준다 (말하면 들어줄 것 같음)' },
      { animalId: 'rabbit-f', text: '걱정 가득한 눈으로 "무슨 일 있어요?" 묻는다' },
      { animalId: 'fox-f',    text: '분위기 파악하고 상황에 맞는 위로를 해준다' },
      { animalId: 'deer-f',   text: '잔잔하게 등을 쓸어주며 기다려준다' },
      { animalId: 'dog-f',    text: '좋아하는 음식 사들고 달려온다' },
    ],
  },
  {
    id: 4,
    forGender: 'male',
    question: '주말 데이트 스타일 중 이상형이 좋아할 것 같은 건?',
    choices: [
      { animalId: 'cat-f',    text: '조용한 카페에서 각자 책 읽다가 커피 한 모금' },
      { animalId: 'rabbit-f', text: '놀이공원 가서 같이 소리 지르며 놀기' },
      { animalId: 'fox-f',    text: '힙한 팝업스토어나 전시회 투어' },
      { animalId: 'deer-f',   text: '한적한 공원 산책 후 벤치에서 도시락' },
      { animalId: 'dog-f',    text: '운동 같이 하고 땀 흘린 후 삼겹살' },
    ],
  },
  {
    id: 5,
    forGender: 'male',
    question: '싸움 후 이상형의 화해 방식은?',
    choices: [
      { animalId: 'cat-f',    text: '며칠 후 아무 일 없다는 듯 먼저 연락한다' },
      { animalId: 'rabbit-f', text: '금세 울먹이며 "우리 싸운 거야?" 물어본다' },
      { animalId: 'fox-f',    text: '상황을 분석하고 먼저 논리적으로 사과한다' },
      { animalId: 'deer-f',   text: '조용히 참다가 결국 먼저 다가와 손 잡는다' },
      { animalId: 'dog-f',    text: '참지 못하고 먼저 문자 보낸다 "나 삐쳤어"' },
    ],
  },
  {
    id: 6,
    forGender: 'male',
    question: '이상형이 가장 매력적으로 보이는 순간은?',
    choices: [
      { animalId: 'cat-f',    text: '평소엔 차갑다가 둘만 있을 때 살짝 애교 부릴 때' },
      { animalId: 'rabbit-f', text: '맛있는 거 먹고 너무 행복해서 눈이 빛날 때' },
      { animalId: 'fox-f',    text: '처음 보는 상황에서도 분위기를 주도할 때' },
      { animalId: 'deer-f',   text: '노을 앞에서 아무 말 없이 나란히 걸을 때' },
      { animalId: 'dog-f',    text: '내 얘기에 리액션 폭발하며 깔깔 웃을 때' },
    ],
  },
  {
    id: 7,
    forGender: 'male',
    question: '이상형의 패션 스타일은?',
    choices: [
      { animalId: 'cat-f',    text: '올블랙 or 미니멀한 시크 룩' },
      { animalId: 'rabbit-f', text: '파스텔톤 원피스나 러블리 캐주얼' },
      { animalId: 'fox-f',    text: '트렌디하고 눈에 띄는 포인트 아이템' },
      { animalId: 'deer-f',   text: '내추럴하고 편안한 린넨·코튼 스타일' },
      { animalId: 'dog-f',    text: '스포티하고 활동적인 애슬레저' },
    ],
  },
  {
    id: 8,
    forGender: 'male',
    question: '이상형의 말버릇이나 표현 방식은?',
    choices: [
      { animalId: 'cat-f',    text: '말이 별로 없고 짧게 답하지만 묘하게 끌림' },
      { animalId: 'rabbit-f', text: '"진짜요?" "헉 어떡해" 귀여운 리액션이 많음' },
      { animalId: 'fox-f',    text: '재치 있는 드립과 눈치 빠른 대화가 특기' },
      { animalId: 'deer-f',   text: '조용조용하지만 할 말은 다 하는 스타일' },
      { animalId: 'dog-f',    text: '감탄사가 많고 리액션이 항상 과장되게 큼' },
    ],
  },
  {
    id: 9,
    forGender: 'male',
    question: '이상형과 처음 사귀었을 때 기대되는 것은?',
    choices: [
      { animalId: 'cat-f',    text: '평소엔 차갑던 그 사람의 다른 모습 발견하기' },
      { animalId: 'rabbit-f', text: '항상 설레고 두근거리는 달달한 일상' },
      { animalId: 'fox-f',    text: '어딜 가도 빛나는 파트너와 함께라는 자부심' },
      { animalId: 'deer-f',   text: '말 없어도 편안한 그 사람 옆의 고요함' },
      { animalId: 'dog-f',    text: '매일 웃게 해주는 에너지 넘치는 연애' },
    ],
  },
  {
    id: 10,
    forGender: 'male',
    question: '10년 후에도 함께하고 싶은 이상형의 모습은?',
    choices: [
      { animalId: 'cat-f',    text: '세월이 지나도 자기 자신을 잃지 않는 사람' },
      { animalId: 'rabbit-f', text: '내 곁에서 여전히 수줍게 웃어주는 사람' },
      { animalId: 'fox-f',    text: '나이가 들수록 더 우아하고 매력적인 사람' },
      { animalId: 'deer-f',   text: '말없이 옆에 앉아 차 한 잔 함께 마시는 사람' },
      { animalId: 'dog-f',    text: '여전히 큰 소리로 웃으며 내 편인 사람' },
    ],
  },
];

// ── 여성 사용자 질문 10문항 ──────────────────────────────────────────────
// 선택지 순서: bear-m / wolf-m / lion-m / dog-m / cat-m
const FEMALE_USER_QUESTIONS: AnimalQuestion[] = [
  {
    id: 1,
    forGender: 'female',
    question: '마음에 드는 남자가 내게 다가올 때 어떤 스타일이 설레나요?',
    choices: [
      { animalId: 'bear-m', text: '말없이 슬쩍 다가와 "뭐 마실 것 가져다드릴까요?" 하는 스타일' },
      { animalId: 'wolf-m', text: '눈빛만으로 "관심 있다"는 걸 전달하는 쿨한 스타일' },
      { animalId: 'lion-m', text: '자신감 있게 먼저 대화를 이끌어나가는 스타일' },
      { animalId: 'dog-m',  text: '활짝 웃으며 "안녕하세요! 저 ○○인데요~" 하는 스타일' },
      { animalId: 'cat-m',  text: '무심코 지나갔는데 나중에 알고 보니 관심 있던 스타일' },
    ],
  },
  {
    id: 2,
    forGender: 'female',
    question: '이상형 남자의 연락 스타일은?',
    choices: [
      { animalId: 'bear-m', text: '매일 아침 "잘 잤어?" 하나씩 꾸준히 보낸다' },
      { animalId: 'wolf-m', text: '연락이 잦진 않지만 볼 때마다 완전히 집중한다' },
      { animalId: 'lion-m', text: '바쁜 와중에도 짧게 체크인한다 ("밥 먹었어?")' },
      { animalId: 'dog-m',  text: '하루에도 수십 번, 이모티콘 가득 답장이 빠르다' },
      { animalId: 'cat-m',  text: '보고 싶을 때만 불쑥 연락하지만 만나면 완전히 다른 사람' },
    ],
  },
  {
    id: 3,
    forGender: 'female',
    question: '힘든 날 이상형이 해줬으면 하는 행동은?',
    choices: [
      { animalId: 'bear-m', text: '말없이 옆에 앉아서 어깨 내어주기' },
      { animalId: 'wolf-m', text: '원인을 찾아서 직접 해결해 주려고 나서기' },
      { animalId: 'lion-m', text: '"내가 다 해결해줄게" 하고 적극적으로 나서기' },
      { animalId: 'dog-m',  text: '좋아하는 음식 들고 달려오며 "다 말해봐!" 하기' },
      { animalId: 'cat-m',  text: '조용히 내 옆에 앉아 가볍게 손 잡아주기' },
    ],
  },
  {
    id: 4,
    forGender: 'female',
    question: '함께 있을 때 가장 설레는 순간은?',
    choices: [
      { animalId: 'bear-m', text: '큰 손으로 내 머리를 쓰다듬어 줄 때' },
      { animalId: 'wolf-m', text: '사람 많은 곳에서 내 앞에 서서 막아줄 때' },
      { animalId: 'lion-m', text: '자신감 넘치게 내 손 잡고 앞장서서 걸을 때' },
      { animalId: 'dog-m',  text: '내 말에 과하게 공감하며 깔깔 같이 웃을 때' },
      { animalId: 'cat-m',  text: '평소엔 차갑다가 둘만 있을 때 소곤소곤 말할 때' },
    ],
  },
  {
    id: 5,
    forGender: 'female',
    question: '싸움 후 이상형의 화해 방식은?',
    choices: [
      { animalId: 'bear-m', text: '며칠 후 아무 일 없던 듯 맛있는 거 사온다' },
      { animalId: 'wolf-m', text: '전화해서 단 한 마디 "미안해" 하고 끊는다' },
      { animalId: 'lion-m', text: '정중하게 잘못을 인정하고 해결책을 제시한다' },
      { animalId: 'dog-m',  text: '못 참고 먼저 연락해서 사과하고 달래기' },
      { animalId: 'cat-m',  text: '아무 말 없이 옆에 와서 슬쩍 기댄다' },
    ],
  },
  {
    id: 6,
    forGender: 'female',
    question: '이상형 남자가 가장 멋있어 보이는 순간은?',
    choices: [
      { animalId: 'bear-m', text: '무거운 짐 들어줄 때 별거 아닌 듯 해줄 때' },
      { animalId: 'wolf-m', text: '무리 속에서 조용히 중심을 잡고 있을 때' },
      { animalId: 'lion-m', text: '발표나 회의에서 자신감 있게 이끌어 나갈 때' },
      { animalId: 'dog-m',  text: '어린 아이나 동물 보며 눈이 반짝거릴 때' },
      { animalId: 'cat-m',  text: '뭔가에 집중할 때 옆모습이 섬세하고 아름다울 때' },
    ],
  },
  {
    id: 7,
    forGender: 'female',
    question: '이상형의 패션·분위기는?',
    choices: [
      { animalId: 'bear-m', text: '캐주얼하고 편안한 무드, 후드+청바지도 멋있음' },
      { animalId: 'wolf-m', text: '올블랙 or 간결한 시크함, 눈빛이 핵심' },
      { animalId: 'lion-m', text: '정장도 잘 어울리고 어딜 가도 눈에 띄는 존재감' },
      { animalId: 'dog-m',  text: '밝고 트렌디한 컬러, 항상 깔끔하고 친근한 느낌' },
      { animalId: 'cat-m',  text: '예술적 감각 있는 빈티지 or 무드 있는 코디' },
    ],
  },
  {
    id: 8,
    forGender: 'female',
    question: '연인 관계에서 가장 중요하게 생각하는 것은?',
    choices: [
      { animalId: 'bear-m', text: '안정감과 믿음 — 어떤 상황에서도 내 편이어야 함' },
      { animalId: 'wolf-m', text: '신비로움과 긴장감 — 항상 궁금하고 빠져드는 느낌' },
      { animalId: 'lion-m', text: '함께 성장 — 서로 더 나은 사람으로 만들어주는 관계' },
      { animalId: 'dog-m',  text: '웃음과 소통 — 매일 웃고 뭐든 다 얘기할 수 있는 사이' },
      { animalId: 'cat-m',  text: '독립과 배려 — 각자의 공간을 존중하며 깊이 연결되는 관계' },
    ],
  },
  {
    id: 9,
    forGender: 'female',
    question: '이상형과 10년 후에도 하고 싶은 것은?',
    choices: [
      { animalId: 'bear-m', text: '아무 말 없이 나란히 앉아 TV 보기' },
      { animalId: 'wolf-m', text: '새벽에 드라이브하며 별 보기' },
      { animalId: 'lion-m', text: '함께 세운 목표를 이뤄가며 성장하기' },
      { animalId: 'dog-m',  text: '같이 웃고 떠들며 여행 다니기' },
      { animalId: 'cat-m',  text: '각자의 취향을 공유하며 조용히 취미 즐기기' },
    ],
  },
  {
    id: 10,
    forGender: 'female',
    question: '이상형이 내게 가장 해줬으면 하는 말은?',
    choices: [
      { animalId: 'bear-m', text: '"내가 다 지켜줄게"' },
      { animalId: 'wolf-m', text: '"너밖에 없어" (말이 없는 사람이라 더 설렘)' },
      { animalId: 'lion-m', text: '"너랑 있으면 더 잘하고 싶어져"' },
      { animalId: 'dog-m',  text: '"오늘도 네 덕분에 웃었어"' },
      { animalId: 'cat-m',  text: '"사실 너한테 계속 신경 쓰였어"' },
    ],
  },
];

export const QUESTIONS_BY_GENDER: Record<UserGender, AnimalQuestion[]> = {
  male:   MALE_USER_QUESTIONS,
  female: FEMALE_USER_QUESTIONS,
};

export const TOTAL_QUESTIONS = 10;
