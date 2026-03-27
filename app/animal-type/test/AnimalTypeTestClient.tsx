'use client';

// 이상형 동물상 테스트 클라이언트 컴포넌트
// 흐름: 성별 선택(Step 0) → 질문 10개(Step 1~10) → 결과 페이지 이동
//
// 점수 계산: 각 선택지 → 해당 동물 +1점
// 결과: 가장 높은 점수의 동물, 동점 시 마지막 선택 동물 우선

import { useState, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { ChevronLeft } from 'lucide-react';
import { QUESTIONS_BY_GENDER, TOTAL_QUESTIONS } from '@/data/animal-type/animal-type-questions';
import { ANIMAL_IDS_BY_USER_GENDER, type UserGender } from '@/data/animal-type/animal-type-data';

type Phase = 'gender' | 'quiz';

const CHOICE_LABELS = ['A', 'B', 'C', 'D', 'E'] as const;

export default function AnimalTypeTestClient() {
  const router = useRouter();
  const [phase, setPhase] = useState<Phase>('gender');
  const [gender, setGender] = useState<UserGender | null>(null);
  const [currentIdx, setCurrentIdx] = useState(0);
  const [scores, setScores] = useState<Record<string, number>>({});
  const [lastPicked, setLastPicked] = useState<string>('');
  const [animPhase, setAnimPhase] = useState<'exit-forward' | 'enter-forward' | 'exit-backward' | 'enter-backward' | null>(null);

  // 성별 선택
  const handleGenderSelect = useCallback((g: UserGender) => {
    setGender(g);
    // 초기 점수 설정
    const initial: Record<string, number> = {};
    ANIMAL_IDS_BY_USER_GENDER[g].forEach((id) => { initial[id] = 0; });
    setScores(initial);
    setPhase('quiz');
  }, []);

  // 답변 선택
  const handleAnswer = useCallback(
    (animalId: string) => {
      if (animPhase !== null || gender === null) return;

      const newScores = { ...scores, [animalId]: (scores[animalId] ?? 0) + 1 };
      const nextIdx = currentIdx + 1;

      if (nextIdx >= TOTAL_QUESTIONS) {
        // 결과 계산: 최고 점수 동물 (동점 시 마지막 선택 animalId 우선)
        const sorted = Object.entries(newScores).sort(([, a], [, b]) => b - a);
        const maxScore = sorted[0][1];
        const topAnimals = sorted.filter(([, s]) => s === maxScore).map(([id]) => id);
        const result = topAnimals.length === 1 ? topAnimals[0] : animalId;

        router.push(`/animal-type/result?gender=${gender}&result=${result}`);
        return;
      }

      setAnimPhase('exit-forward');
      setTimeout(() => {
        setScores(newScores);
        setLastPicked(animalId);
        setCurrentIdx(nextIdx);
        setAnimPhase('enter-forward');
        setTimeout(() => setAnimPhase(null), 220);
      }, 200);
    },
    [animPhase, currentIdx, gender, router, scores],
  );

  // 이전 문제
  const handleBack = useCallback(() => {
    if (animPhase !== null) return;

    if (phase === 'quiz' && currentIdx === 0) {
      setPhase('gender');
      setGender(null);
      setScores({});
      setCurrentIdx(0);
      return;
    }
    if (phase === 'quiz' && currentIdx > 0) {
      setAnimPhase('exit-backward');
      setTimeout(() => {
        setCurrentIdx((i) => i - 1);
        setAnimPhase('enter-backward');
        setTimeout(() => setAnimPhase(null), 220);
      }, 200);
      return;
    }
    router.push('/animal-type');
  }, [animPhase, currentIdx, phase, router]);

  // ── 성별 선택 화면 ──
  if (phase === 'gender') {
    return (
      <div className="min-h-screen bg-gradient-to-b from-pink-50 to-white flex flex-col px-5 py-6">
        {/* 상단 뒤로가기 */}
        <button
          onClick={() => router.push('/animal-type')}
          className="w-9 h-9 rounded-xl bg-white border border-border flex items-center justify-center shadow-sm mb-10 flex-shrink-0"
          aria-label="이전"
        >
          <ChevronLeft size={18} className="text-muted" />
        </button>

        {/* 타이틀 */}
        <div className="flex-1 flex flex-col items-center justify-center text-center">
          <div className="text-5xl mb-6">🐾</div>
          <h2 className="text-xl font-extrabold text-ink mb-2">당신의 성별을 선택해주세요</h2>
          <p className="text-sm text-muted mb-10 leading-relaxed">
            성별에 따라 이상형 동물상 종류가 달라져요
          </p>

          <div className="flex gap-4 w-full max-w-xs">
            {/* 남성 */}
            <button
              onClick={() => handleGenderSelect('male')}
              className="flex-1 flex flex-col items-center gap-3 bg-white border-2 border-blue-100 hover:border-blue-400 active:scale-[0.97] rounded-3xl py-8 transition-all shadow-sm"
            >
              <span className="text-4xl">👨</span>
              <span className="text-base font-bold text-ink">남성</span>
              <span className="text-xs text-muted text-center px-2">이상형 여성의<br />동물상을 찾아요</span>
            </button>

            {/* 여성 */}
            <button
              onClick={() => handleGenderSelect('female')}
              className="flex-1 flex flex-col items-center gap-3 bg-white border-2 border-pink-100 hover:border-pink-400 active:scale-[0.97] rounded-3xl py-8 transition-all shadow-sm"
            >
              <span className="text-4xl">👩</span>
              <span className="text-base font-bold text-ink">여성</span>
              <span className="text-xs text-muted text-center px-2">이상형 남성의<br />동물상을 찾아요</span>
            </button>
          </div>
        </div>

        <p className="text-center text-[10px] text-gray-400 mt-6">
          개인 정보는 수집·저장되지 않습니다
        </p>
      </div>
    );
  }

  // ── 퀴즈 화면 ──
  const questions = QUESTIONS_BY_GENDER[gender!];
  const q = questions[currentIdx];
  const progress = (currentIdx / TOTAL_QUESTIONS) * 100;

  return (
    <div className="min-h-screen bg-gradient-to-b from-pink-50 to-white flex flex-col px-5 py-6">
      {/* 상단 — 뒤로가기 + 진행률 */}
      <div className="flex items-center gap-3 mb-8">
        <button
          onClick={handleBack}
          className="w-9 h-9 rounded-xl bg-white border border-border flex items-center justify-center shadow-sm flex-shrink-0"
          aria-label="이전"
        >
          <ChevronLeft size={18} className="text-muted" />
        </button>

        <div className="flex-1">
          <div className="flex justify-between text-xs text-muted mb-1.5">
            <span>{currentIdx + 1} / {TOTAL_QUESTIONS}</span>
            <span>{Math.round(progress)}%</span>
          </div>
          <div className="h-2 bg-pink-100 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-pink-400 to-violet-500 rounded-full transition-all duration-500"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      </div>

      {/* 질문 + 선택지 */}
      <div className="flex-1 overflow-hidden">
        <div className={`flex-1 flex flex-col${animPhase ? ` mbti-page-${animPhase}` : ''}`}>
          {/* 질문 카드 */}
          <div className="bg-white rounded-3xl shadow-sm border border-pink-50 px-6 py-8 mb-5 flex items-center justify-center">
            <p className="text-lg font-bold text-ink leading-relaxed text-center">{q.question}</p>
          </div>

          {/* 선택지 A~E */}
          <div className="flex flex-col gap-2.5">
            {q.choices.map((choice, i) => (
              <button
                key={choice.animalId}
                onClick={() => handleAnswer(choice.animalId)}
                className="group w-full bg-white border-2 border-pink-100 hover:border-pink-400 hover:bg-pink-50 active:scale-[0.98] rounded-2xl px-5 py-4 text-left transition-all duration-150 shadow-sm"
              >
                <div className="flex items-start gap-3">
                  <span className="w-7 h-7 rounded-lg bg-pink-100 group-hover:bg-pink-200 flex items-center justify-center text-xs font-extrabold text-pink-600 flex-shrink-0 mt-0.5 transition-colors">
                    {CHOICE_LABELS[i]}
                  </span>
                  <span className="text-sm font-semibold text-ink leading-relaxed">
                    {choice.text}
                  </span>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>

      <p className="text-center text-[10px] text-gray-400 mt-6">
        개인 정보는 수집·저장되지 않습니다
      </p>
    </div>
  );
}
