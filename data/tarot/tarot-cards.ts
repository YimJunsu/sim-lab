// 타로 카드 정적 데이터 — 메이저 아르카나 22장
//
// ── API 정보 (ekelen/tarot-api) ──
// 메타데이터: https://tarotapi.dev/api/v1 (JSON ONLY — 이미지 미제공)
// 카드 식별자: ar00(바보) ~ ar21(세계), value_int 기준
// 이미지: API가 이미지를 제공하지 않으므로 자체 호스팅 사용
//
// ── 이미지 호스팅 ──
// 라이더-웨이트 덱(1909)은 퍼블릭 도메인
// 이미지 다운로드: scripts/download-tarot-images.sh 실행
// 저장 경로: /public/images/tarot/ar00.jpg ~ ar21.jpg
// 파일명 규칙: name_short + '.jpg' (tarotapi.dev 식별자와 동일)

// 카드 이미지 베이스 경로 (로컬 자체 호스팅)
export const TAROT_IMAGE_BASE = '/images/tarot'

// 카드 이미지 로딩 실패 시 fallback 이미지
export const TAROT_FALLBACK_IMAGE = '/images/tarot/card-back.svg'

export interface TarotCard {
  id: number           // 카드 번호 (value_int 기준, 0~21)
  nameShort: string    // tarotapi.dev name_short (ar00 ~ ar21)
  nameEn: string       // 영문 이름
  nameKo: string       // 한글 이름
  arcana: string       // 아르카나 번호 표기 (로마 숫자)
  keywords: string[]   // 핵심 키워드 (3~4개)
  upright: string      // 정방향 기본 의미 (한 줄)
  imageFile: string    // 이미지 파일명 = nameShort + '.jpg'
}

// 메이저 아르카나 22장 데이터
// nameShort는 tarotapi.dev API 응답의 name_short 값과 정확히 일치
export const TAROT_CARDS: TarotCard[] = [
  {
    id: 0,
    nameShort: 'ar00',
    nameEn: 'The Fool',
    nameKo: '바보',
    arcana: '0',
    keywords: ['새로운 시작', '순수함', '모험', '자유'],
    upright: '두려움 없이 새로운 여정을 시작하는 순수한 에너지',
    imageFile: 'ar00.jpg',
  },
  {
    id: 1,
    nameShort: 'ar01',
    nameEn: 'The Magician',
    nameKo: '마법사',
    arcana: 'I',
    keywords: ['의지력', '창조력', '집중', '실현'],
    upright: '가진 모든 자원을 활용해 원하는 것을 현실로 만드는 능력',
    imageFile: 'ar01.jpg',
  },
  {
    id: 2,
    nameShort: 'ar02',
    nameEn: 'The High Priestess',
    nameKo: '여사제',
    arcana: 'II',
    keywords: ['직관', '내면의 목소리', '신비', '잠재력'],
    upright: '이성보다 직관을 믿고 내면 깊숙한 진실에 귀를 기울이는 것',
    imageFile: 'ar02.jpg',
  },
  {
    id: 3,
    nameShort: 'ar03',
    nameEn: 'The Empress',
    nameKo: '여황제',
    arcana: 'III',
    keywords: ['풍요', '창조', '돌봄', '성장'],
    upright: '풍요로운 에너지가 넘치며 무언가를 키우고 꽃피우는 시기',
    imageFile: 'ar03.jpg',
  },
  {
    id: 4,
    nameShort: 'ar04',
    nameEn: 'The Emperor',
    nameKo: '황제',
    arcana: 'IV',
    keywords: ['권위', '안정', '구조', '리더십'],
    upright: '확고한 의지와 체계적인 접근으로 상황을 주도하는 에너지',
    imageFile: 'ar04.jpg',
  },
  {
    id: 5,
    nameShort: 'ar05',
    nameEn: 'The Hierophant',
    nameKo: '교황',
    arcana: 'V',
    keywords: ['전통', '가르침', '신뢰', '관습'],
    upright: '검증된 길을 따르거나 믿을 만한 조언자에게 지혜를 구하는 것',
    imageFile: 'ar05.jpg',
  },
  {
    id: 6,
    nameShort: 'ar06',
    nameEn: 'The Lovers',
    nameKo: '연인',
    arcana: 'VI',
    keywords: ['선택', '사랑', '조화', '가치관'],
    upright: '중요한 선택의 기로에서 자신의 진짜 가치관과 마음을 따르는 것',
    imageFile: 'ar06.jpg',
  },
  {
    id: 7,
    nameShort: 'ar07',
    nameEn: 'The Chariot',
    nameKo: '전차',
    arcana: 'VII',
    keywords: ['의지', '승리', '자기통제', '추진력'],
    upright: '강한 의지로 상반된 욕구를 통제하며 목표를 향해 전진하는 힘',
    imageFile: 'ar07.jpg',
  },
  {
    id: 8,
    nameShort: 'ar08',
    // API에서는 'Fortitude'로 표기 (A.E. Waite 원본 명칭)
    // 일반적으로 'Strength'(힘)으로 통용됨
    nameEn: 'Strength',
    nameKo: '힘',
    arcana: 'VIII',
    keywords: ['용기', '인내', '내면의 힘', '자기수용'],
    upright: '두려움이나 충동을 억누르지 않고 부드럽게 다스리는 내면의 강함',
    imageFile: 'ar08.jpg',
  },
  {
    id: 9,
    nameShort: 'ar09',
    nameEn: 'The Hermit',
    nameKo: '은둔자',
    arcana: 'IX',
    keywords: ['고독', '내면 탐색', '지혜', '성찰'],
    upright: '혼자만의 시간 속에서 진정한 자신을 발견하고 내면의 빛을 찾는 것',
    imageFile: 'ar09.jpg',
  },
  {
    id: 10,
    nameShort: 'ar10',
    nameEn: 'Wheel of Fortune',
    nameKo: '운명의 수레바퀴',
    arcana: 'X',
    keywords: ['변화', '운명', '순환', '기회'],
    upright: '삶의 사이클이 바뀌는 전환점, 지금이 바로 그 변화의 순간',
    imageFile: 'ar10.jpg',
  },
  {
    id: 11,
    nameShort: 'ar11',
    nameEn: 'Justice',
    nameKo: '정의',
    arcana: 'XI',
    keywords: ['균형', '공정', '진실', '인과'],
    upright: '행동에는 반드시 결과가 따르며 진실과 균형이 상황을 정리해 줌',
    imageFile: 'ar11.jpg',
  },
  {
    id: 12,
    nameShort: 'ar12',
    nameEn: 'The Hanged Man',
    nameKo: '매달린 남자',
    arcana: 'XII',
    keywords: ['희생', '기다림', '다른 시각', '전환'],
    upright: '잠시 멈추고 다른 각도에서 바라볼 때 새로운 통찰이 열림',
    imageFile: 'ar12.jpg',
  },
  {
    id: 13,
    nameShort: 'ar13',
    nameEn: 'Death',
    nameKo: '죽음',
    arcana: 'XIII',
    keywords: ['끝과 시작', '변환', '놓아버림', '전환'],
    upright: '두려운 이름과 달리 낡은 것의 끝과 새로운 시작을 의미하는 변환',
    imageFile: 'ar13.jpg',
  },
  {
    id: 14,
    nameShort: 'ar14',
    nameEn: 'Temperance',
    nameKo: '절제',
    arcana: 'XIV',
    keywords: ['균형', '인내', '조화', '중용'],
    upright: '극단 없이 흐름을 조율하며 내면과 외면의 균형을 맞춰가는 것',
    imageFile: 'ar14.jpg',
  },
  {
    id: 15,
    nameShort: 'ar15',
    nameEn: 'The Devil',
    nameKo: '악마',
    arcana: 'XV',
    keywords: ['속박', '집착', '욕망', '그림자'],
    upright: '스스로를 옥죄는 믿음이나 습관을 직면하고 인식하는 것',
    imageFile: 'ar15.jpg',
  },
  {
    id: 16,
    nameShort: 'ar16',
    nameEn: 'The Tower',
    nameKo: '탑',
    arcana: 'XVI',
    keywords: ['급변', '붕괴', '각성', '해방'],
    upright: '갑작스러운 변화나 충격이 오히려 억눌렸던 것을 해방시키는 계기',
    imageFile: 'ar16.jpg',
  },
  {
    id: 17,
    nameShort: 'ar17',
    nameEn: 'The Star',
    nameKo: '별',
    arcana: 'XVII',
    keywords: ['희망', '치유', '영감', '신뢰'],
    upright: '폭풍 뒤의 고요함 속에서 다시 피어나는 희망과 내면의 빛',
    imageFile: 'ar17.jpg',
  },
  {
    id: 18,
    nameShort: 'ar18',
    nameEn: 'The Moon',
    nameKo: '달',
    arcana: 'XVIII',
    keywords: ['무의식', '두려움', '환상', '직관'],
    upright: '보이지 않는 두려움과 환상이 현실을 왜곡하고 있을 가능성',
    imageFile: 'ar18.jpg',
  },
  {
    id: 19,
    nameShort: 'ar19',
    nameEn: 'The Sun',
    nameKo: '태양',
    arcana: 'XIX',
    keywords: ['기쁨', '성공', '활력', '자신감'],
    upright: '밝고 따뜻한 에너지가 넘치며 모든 것이 명확하게 빛나는 시기',
    imageFile: 'ar19.jpg',
  },
  {
    id: 20,
    nameShort: 'ar20',
    // API에서는 'The Last Judgment'로 표기
    nameEn: 'Judgement',
    nameKo: '심판',
    arcana: 'XX',
    keywords: ['각성', '부활', '소명', '자기평가'],
    upright: '과거를 돌아보고 진정한 자신의 소명과 마주하는 각성의 순간',
    imageFile: 'ar20.jpg',
  },
  {
    id: 21,
    nameShort: 'ar21',
    nameEn: 'The World',
    nameKo: '세계',
    arcana: 'XXI',
    keywords: ['완성', '통합', '성취', '새 단계'],
    upright: '하나의 사이클이 완전히 완성되어 다음 단계로 나아갈 준비가 됨',
    imageFile: 'ar21.jpg',
  },
]

// 카드 ID로 카드 데이터를 조회하는 헬퍼 함수
export function getTarotCardById(id: number): TarotCard | undefined {
  return TAROT_CARDS.find((card) => card.id === id)
}

// 카드 이미지 URL을 반환하는 헬퍼 함수
export function getTarotImageUrl(imageFile: string): string {
  return `${TAROT_IMAGE_BASE}/${imageFile}`
}
