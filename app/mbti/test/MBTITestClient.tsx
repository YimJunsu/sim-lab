'use client';

// MBTI 테스트 클라이언트 컴포넌트
// 흐름: 질문 초기화(랜덤 12개) → 질문 1개씩 표시 → 전체 완료 → 결과 페이지 이동
// 편향 방지: 차원 뱃지 미표시
//
// 답변 구조: A/B/C/D 4지선다
//   A = 100점 (강하게 첫 번째 성향)
//   B =  67점 (약하게 첫 번째 성향)
//   C =  33점 (약하게 두 번째 성향)
//   D =   0점 (강하게 두 번째 성향)
//
// 점수 계산: 차원별 누적점수 / (문항 수 × 100) × 100%

import { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { ChevronLeft } from 'lucide-react';
import {
  getRandomQuestions,
  CHOICE_SCORES,
  type MBTIQuestion,
  type MBTIDimension,
  type Choice,
} from '@/data/mbti/mbti-questions';

// 차원별 답변 점수 합산 (0~300: 문항당 0~100 × 3문항)
interface DimScores {
  EI: number;
  NS: number;
  TF: number;
  JP: number;
}

const TOTAL = 12;
const QUESTIONS_PER_DIM = 3;
const MAX_DIM_SCORE = QUESTIONS_PER_DIM * 100; // 300

// 선택지 레이블 배열 (순서 고정)
const CHOICES: Choice[] = ['A', 'B', 'C', 'D'];

export default function MBTITestClient() {
  const router = useRouter();
  const [questions, setQuestions] = useState<MBTIQuestion[]>([]);
  const [currentIdx, setCurrentIdx] = useState(0);
  const [scores, setScores] = useState<DimScores>({ EI: 0, NS: 0, TF: 0, JP: 0 });
  const [animating, setAnimating] = useState(false);
  const [isReady, setIsReady] = useState(false);

  // 마운트 시 랜덤 12문항 선택
  useEffect(() => {
    setQuestions(getRandomQuestions());
    setIsReady(true);
  }, []);

  // 응답 선택 핸들러
  const handleAnswer = useCallback(
    (choice: Choice) => {
      if (animating) return;

      const q = questions[currentIdx];
      const newScores = { ...scores };
      newScores[q.dimension as MBTIDimension] += CHOICE_SCORES[choice];

      const nextIdx = currentIdx + 1;

      if (nextIdx >= TOTAL) {
        // 모든 문항 완료 → 점수 계산 및 결과 이동
        // score(%) = round(dimScore / MAX_DIM_SCORE * 100)
        const eScore = Math.round((newScores.EI / MAX_DIM_SCORE) * 100);
        const nScore = Math.round((newScores.NS / MAX_DIM_SCORE) * 100);
        const tScore = Math.round((newScores.TF / MAX_DIM_SCORE) * 100);
        const jScore = Math.round((newScores.JP / MAX_DIM_SCORE) * 100);

        const type =
          (eScore >= 50 ? 'E' : 'I') +
          (nScore >= 50 ? 'N' : 'S') +
          (tScore >= 50 ? 'T' : 'F') +
          (jScore >= 50 ? 'J' : 'P');

        router.push(`/mbti/result?type=${type}&e=${eScore}&n=${nScore}&t=${tScore}&j=${jScore}`);
        return;
      }

      // 다음 문항으로 전환 (페이드 애니메이션)
      setAnimating(true);
      setTimeout(() => {
        setScores(newScores);
        setCurrentIdx(nextIdx);
        setAnimating(false);
      }, 180);
    },
    [animating, currentIdx, questions, router, scores],
  );

  if (!isReady || questions.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-10 h-10 rounded-full border-4 border-indigo-200 border-t-brand animate-spin" />
      </div>
    );
  }

  const progress = (currentIdx / TOTAL) * 100;
  const q = questions[currentIdx];

  // 현재 질문의 선택지 텍스트 매핑
  const optionText: Record<Choice, string> = {
    A: q.optionA,
    B: q.optionB,
    C: q.optionC,
    D: q.optionD,
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-indigo-50 to-white flex flex-col px-5 py-6">

      {/* 상단 — 뒤로가기 + 진행률 */}
      <div className="flex items-center gap-3 mb-8">
        <button
          onClick={() => (currentIdx > 0 ? setCurrentIdx((i) => i - 1) : router.push('/mbti'))}
          className="w-9 h-9 rounded-xl bg-white border border-border flex items-center justify-center shadow-sm flex-shrink-0"
          aria-label="이전"
        >
          <ChevronLeft size={18} className="text-muted" />
        </button>

        <div className="flex-1">
          {/* 진행률 텍스트 */}
          <div className="flex justify-between text-xs text-muted mb-1.5">
            <span>{currentIdx + 1} / {TOTAL}</span>
            <span>{Math.round(progress)}%</span>
          </div>
          {/* 진행률 바 */}
          <div className="h-2 bg-indigo-100 rounded-full overflow-hidden">
            <div
              className="h-full bg-brand rounded-full transition-all duration-500"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      </div>

      {/* 질문 + 선택지 (페이드 애니메이션) */}
      <div
        className="flex-1 flex flex-col"
        style={{ opacity: animating ? 0 : 1, transition: 'opacity 0.18s ease' }}
      >
        {/* 질문 카드 */}
        <div className="bg-white rounded-3xl shadow-sm border border-indigo-50 px-6 py-8 mb-5 flex items-center justify-center">
          <p className="text-lg font-bold text-ink leading-relaxed text-center">{q.question}</p>
        </div>

        {/* 선택지 A / B / C / D */}
        <div className="flex flex-col gap-2.5">
          {CHOICES.map((choice) => (
            <button
              key={choice}
              onClick={() => handleAnswer(choice)}
              className="group w-full bg-white border-2 border-indigo-100 hover:border-brand hover:bg-indigo-50 active:scale-[0.98] rounded-2xl px-5 py-4 text-left transition-all duration-150 shadow-sm"
            >
              <div className="flex items-start gap-3">
                <span className="w-7 h-7 rounded-lg bg-indigo-100 group-hover:bg-indigo-200 flex items-center justify-center text-xs font-extrabold text-brand flex-shrink-0 mt-0.5 transition-colors flex-shrink-0">
                  {choice}
                </span>
                <span className="text-sm font-semibold text-ink leading-relaxed">
                  {optionText[choice]}
                </span>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* 면책 */}
      <p className="text-center text-[10px] text-gray-400 mt-6">
        개인 정보는 수집·저장되지 않습니다
      </p>
    </div>
  );
}
