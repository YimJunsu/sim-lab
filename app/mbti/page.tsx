// MBTI 테스트 인트로 페이지 (Server Component)
// 구조: 헤더 → 설명 카드 → 시작 버튼

import Link from 'next/link';
import { Brain, ChevronRight, Shuffle, BarChart3, Heart } from 'lucide-react';

const FEATURES = [
  {
    Icon: Shuffle,
    title: '12문항 랜덤 선별',
    desc: '48개 문항 중 12개가 무작위로 출제됩니다',
  },
  {
    Icon: BarChart3,
    title: '비율 그래프 제공',
    desc: 'E/I · N/S · T/F · J/P 각 차원 비율을 시각화',
  },
  {
    Icon: Heart,
    title: '궁합 유형 확인',
    desc: '나와 잘 맞는 MBTI 유형을 알려드립니다',
  },
];

export default function MBTIIntroPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-indigo-50 to-white px-5 py-10 flex flex-col">
      {/* 아이콘 + 타이틀 */}
      <div className="flex flex-col items-center text-center mb-8">
        <div className="w-20 h-20 rounded-3xl bg-brand flex items-center justify-center shadow-lg mb-5">
          <Brain size={40} className="text-white" strokeWidth={1.5} />
        </div>
        <h1 className="text-2xl font-extrabold text-ink mb-2">MBTI 테스트</h1>
        <p className="text-sm text-muted leading-relaxed">
          16가지 성격 유형 중 나는 어디에 속할까?
          <br />
          12문항으로 빠르게 확인해보세요
        </p>
      </div>

      {/* 특징 카드 */}
      <div className="flex flex-col gap-3 mb-8">
        {FEATURES.map(({ Icon, title, desc }) => (
          <div
            key={title}
            className="flex items-start gap-4 bg-white rounded-2xl px-4 py-4 shadow-sm border border-indigo-50"
          >
            <div className="w-10 h-10 rounded-xl bg-indigo-50 flex items-center justify-center flex-shrink-0">
              <Icon size={20} className="text-indigo-600" strokeWidth={1.8} />
            </div>
            <div>
              <p className="text-sm font-bold text-ink">{title}</p>
              <p className="text-xs text-muted mt-0.5">{desc}</p>
            </div>
          </div>
        ))}
      </div>

      {/* 안내 문구 */}
      <p className="text-center text-xs text-gray-400 mb-6 leading-relaxed">
        정답은 없어요. 평소 느끼는 대로 솔직하게 선택해 주세요.
        <br />
        약 2~3분 소요됩니다.
      </p>

      {/* 시작 버튼 */}
      <Link
        href="/mbti/test"
        className="flex items-center justify-center gap-2 w-full py-4 rounded-2xl bg-brand text-white font-bold text-base shadow-md active:scale-[0.98] transition-transform"
      >
        테스트 시작하기
        <ChevronRight size={20} strokeWidth={2.5} />
      </Link>

      {/* 면책 고지 */}
      <p className="text-center text-[10px] text-gray-400 mt-5">
        본 테스트는 오락 목적으로 제공되며 전문적인 심리 진단이 아닙니다.
        <br />
        개인 정보는 수집·저장되지 않습니다.
      </p>
    </div>
  );
}
