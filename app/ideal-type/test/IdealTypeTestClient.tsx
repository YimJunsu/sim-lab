'use client';

// 이상형 성향 테스트 클라이언트 컴포넌트
// 흐름: Q1~Q12 (기본) → 점수 계산 → 1위가 independent/pure이면 Q13~Q14 추가 → 결과 페이지 이동
//
// 점수 계산:
//   - 각 선택지의 scores 가중치를 누적
//   - Q12 이후 1위 유형 확인 → 적응형 분기 여부 결정
//   - 동점(1점 이내) 시 마지막 선택 유형 우선

import { useState, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { ChevronLeft } from 'lucide-react';
import {
  BASE_QUESTIONS,
  ADAPTIVE_QUESTIONS,
  BASE_QUESTION_COUNT,
  TOTAL_QUESTION_COUNT,
  createInitialScore,
  type IdealTypeScore,
} from '@/data/ideal-type/ideal-type-questions';
import {
  ADAPTIVE_TRIGGER_TYPES,
  type IdealTypeId,
} from '@/data/ideal-type/ideal-type-data';

type AnimPhase = 'exit-forward' | 'enter-forward' | 'exit-backward' | 'enter-backward' | null;

const CHOICE_LABELS = ['A', 'B', 'C', 'D'] as const;

export default function IdealTypeTestClient() {
  const router = useRouter();

  // 현재 질문 인덱스 (0 기반)
  const [currentIdx, setCurrentIdx] = useState(0);

  // 점수 누적 객체
  const [scores, setScores] = useState<IdealTypeScore>(createInitialScore);

  // 적응형 분기 진입 여부 (Q12 이후 결정)
  const [isAdaptive, setIsAdaptive] = useState(false);

  // 동점 처리용 — 마지막 선택한 유형 추적
  const [lastPickedType, setLastPickedType] = useState<IdealTypeId | null>(null);

  // 슬라이드 애니메이션 상태
  const [animPhase, setAnimPhase] = useState<AnimPhase>(null);

  // 적응형 진입 안내 배너 표시 여부
  const [showAdaptiveBanner, setShowAdaptiveBanner] = useState(false);

  // 현재 표시 중인 질문 목록 (기본 or 기본+적응형)
  const questions = isAdaptive
    ? [...BASE_QUESTIONS, ...ADAPTIVE_QUESTIONS]
    : BASE_QUESTIONS;

  // 전체 문항 수 (진행률 계산용) — 적응형 진입 후에는 14로 변경
  const totalQuestions = isAdaptive ? TOTAL_QUESTION_COUNT : BASE_QUESTION_COUNT;

  // 현재 진행률 (%)
  const progress = (currentIdx / totalQuestions) * 100;

  // 최종 결과 계산 — 최고 점수 유형 반환, 동점 시 lastPickedType 우선
  const calculateResult = useCallback(
    (finalScores: IdealTypeScore, picked: IdealTypeId | null): IdealTypeId => {
      const sorted = (Object.entries(finalScores) as [IdealTypeId, number][]).sort(
        ([, a], [, b]) => b - a,
      );
      const [topId, topScore] = sorted[0];
      const [, secondScore] = sorted[1];

      // 동점(차이 1점 이하) 시 마지막 선택 유형 우선
      if (topScore - secondScore <= 1 && picked) {
        return picked;
      }
      return topId;
    },
    [],
  );

  // 선택지 클릭 핸들러
  const handleAnswer = useCallback(
    (choiceScores: Partial<IdealTypeScore>, primaryType: IdealTypeId) => {
      if (animPhase !== null) return;

      // 점수 누적
      const newScores = { ...scores };
      (Object.entries(choiceScores) as [IdealTypeId, number][]).forEach(([type, pts]) => {
        newScores[type] = (newScores[type] ?? 0) + pts;
      });

      const nextIdx = currentIdx + 1;

      // Q12(기본 마지막) 완료 시 적응형 분기 판단
      if (!isAdaptive && nextIdx >= BASE_QUESTION_COUNT) {
        const sorted = (Object.entries(newScores) as [IdealTypeId, number][]).sort(
          ([, a], [, b]) => b - a,
        );
        const topId = sorted[0][0] as IdealTypeId;

        if (ADAPTIVE_TRIGGER_TYPES.includes(topId)) {
          // 적응형 분기: Q13~Q14 추가 표시
          setScores(newScores);
          setLastPickedType(primaryType);
          setIsAdaptive(true);
          setShowAdaptiveBanner(true);

          // 0.3초 배너 표시 후 다음 문항으로 진행
          setTimeout(() => {
            setShowAdaptiveBanner(false);
            setAnimPhase('exit-forward');
            setTimeout(() => {
              setCurrentIdx(nextIdx);
              setAnimPhase('enter-forward');
              setTimeout(() => setAnimPhase(null), 220);
            }, 200);
          }, 1200);
          return;
        } else {
          // 바로 결과 페이지로 이동
          const result = calculateResult(newScores, primaryType);
          router.push(`/ideal-type/result?type=${result}`);
          return;
        }
      }

      // 적응형 Q14(마지막) 완료 시 결과 페이지로 이동
      if (isAdaptive && nextIdx >= TOTAL_QUESTION_COUNT) {
        const result = calculateResult(newScores, primaryType);
        router.push(`/ideal-type/result?type=${result}`);
        return;
      }

      // 일반 다음 문항으로 이동
      setAnimPhase('exit-forward');
      setTimeout(() => {
        setScores(newScores);
        setLastPickedType(primaryType);
        setCurrentIdx(nextIdx);
        setAnimPhase('enter-forward');
        setTimeout(() => setAnimPhase(null), 220);
      }, 200);
    },
    [animPhase, currentIdx, isAdaptive, scores, calculateResult, router],
  );

  // 이전 문항으로 이동
  const handleBack = useCallback(() => {
    if (animPhase !== null || showAdaptiveBanner) return;

    // 첫 문항에서 뒤로가기 → 인트로 페이지
    if (currentIdx === 0) {
      router.push('/ideal-type');
      return;
    }

    setAnimPhase('exit-backward');
    setTimeout(() => {
      setCurrentIdx((i) => i - 1);
      setAnimPhase('enter-backward');
      setTimeout(() => setAnimPhase(null), 220);
    }, 200);
  }, [animPhase, currentIdx, router, showAdaptiveBanner]);

  const q = questions[currentIdx];

  // 선택지에서 대표 유형 추출 (가장 높은 점수 유형)
  const getPrimaryType = (choiceScores: Partial<IdealTypeScore>): IdealTypeId => {
    const entries = Object.entries(choiceScores) as [IdealTypeId, number][];
    return entries.sort(([, a], [, b]) => b - a)[0][0];
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-rose-50 to-white flex flex-col px-5 py-6">
      {/* 상단 — 뒤로가기 + 진행률 바 */}
      <div className="flex items-center gap-3 mb-8">
        <button
          onClick={handleBack}
          className="w-9 h-9 rounded-xl bg-white border border-border flex items-center justify-center shadow-sm flex-shrink-0"
          aria-label="이전 문항"
        >
          <ChevronLeft size={18} className="text-muted" />
        </button>

        <div className="flex-1">
          <div className="flex justify-between text-xs text-muted mb-1.5">
            <span>{currentIdx + 1} / {totalQuestions}</span>
            <span>{Math.round(progress)}%</span>
          </div>
          <div className="h-2 bg-rose-100 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-rose-400 to-pink-500 rounded-full transition-all duration-500"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      </div>

      {/* 적응형 분기 진입 배너 */}
      {showAdaptiveBanner && (
        <div className="mb-4 px-4 py-3 bg-rose-50 border border-rose-200 rounded-2xl text-center">
          <p className="text-sm font-semibold text-rose-600">
            거의 다 왔어요! 💕
          </p>
          <p className="text-xs text-rose-400 mt-0.5">
            조금 더 정확한 결과를 위해 2문항만 더 답해주세요
          </p>
        </div>
      )}

      {/* 질문 + 선택지 */}
      <div className="flex-1 overflow-hidden">
        <div className={`flex-1 flex flex-col${animPhase ? ` mbti-page-${animPhase}` : ''}`}>
          {/* 질문 카드 */}
          <div className="bg-white rounded-3xl shadow-sm border border-rose-50 px-6 py-8 mb-5 flex items-center justify-center min-h-[96px]">
            <p className="text-lg font-bold text-ink leading-relaxed text-center">
              {q.question}
            </p>
          </div>

          {/* 선택지 A~D */}
          <div className="flex flex-col gap-2.5">
            {q.choices.map((choice, i) => {
              const primaryType = getPrimaryType(choice.scores);
              return (
                <button
                  key={i}
                  onClick={() => handleAnswer(choice.scores, primaryType)}
                  className="group w-full bg-white border-2 border-rose-100 hover:border-rose-400 hover:bg-rose-50 active:scale-[0.98] rounded-2xl px-5 py-4 text-left transition-all duration-150 shadow-sm"
                >
                  <div className="flex items-start gap-3">
                    <span className="w-7 h-7 rounded-lg bg-rose-100 group-hover:bg-rose-200 flex items-center justify-center text-xs font-extrabold text-rose-600 flex-shrink-0 mt-0.5 transition-colors">
                      {CHOICE_LABELS[i]}
                    </span>
                    <span className="text-sm font-semibold text-ink leading-relaxed">
                      {choice.text}
                    </span>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      <p className="text-center text-[10px] text-gray-400 mt-6">
        개인 정보는 수집·저장되지 않습니다
      </p>
    </div>
  );
}
