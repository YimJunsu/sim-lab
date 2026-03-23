'use client';

// MBTI 결과 클라이언트 컴포넌트
// URL 파라미터: type(MBTI 유형), e(E 비율), n(N 비율), t(T 비율), j(J 비율)
// 구조: 타입 헤더 → 비율 그래프 → MBTI 설명 → 공유 → 잘 맞는 궁합 → 재테스트

import { useState, useCallback } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import {
  RotateCcw, Heart, ChevronRight, Share2, Link2, Check, Twitter,
  Landmark, FlaskConical, Trophy, Zap, Moon, Leaf, Star, Palette,
  ClipboardList, Shield, Scale, Handshake, Wrench, Paintbrush, Rocket, Music,
  type LucideIcon,
} from 'lucide-react';
import { MBTI_TYPES, DIMENSION_LABELS, DIMENSION_COLORS } from '@/data/mbti-data';

// MBTI 유형 → lucide-react 아이콘 매핑
const TYPE_ICONS: Record<string, LucideIcon> = {
  INTJ: Landmark, INTP: FlaskConical, ENTJ: Trophy, ENTP: Zap,
  INFJ: Moon,     INFP: Leaf,        ENFJ: Star,   ENFP: Palette,
  ISTJ: ClipboardList, ISFJ: Shield, ESTJ: Scale,  ESFJ: Handshake,
  ISTP: Wrench,   ISFP: Paintbrush,  ESTP: Rocket, ESFP: Music,
};

// ── 차원 비율 바 컴포넌트 ──
function DimensionBar({
  dimension,
  scoreA, // A(첫 번째 글자) 비율 0~100
}: {
  dimension: keyof typeof DIMENSION_LABELS;
  scoreA: number;
}) {
  const scoreB = 100 - scoreA;
  const labels = DIMENSION_LABELS[dimension];
  const colors = DIMENSION_COLORS[dimension];
  const dominant = scoreA >= scoreB ? 'A' : 'B';

  return (
    <div className="mb-5">
      {/* 레이블 행 */}
      <div className="flex justify-between items-center mb-2">
        <div className="flex items-center gap-1.5">
          <span className={`text-xs font-extrabold ${dominant === 'A' ? colors.textA : 'text-gray-300'}`}>
            {labels.A}
          </span>
          <span className={`text-[11px] ${dominant === 'A' ? 'text-gray-500' : 'text-gray-300'}`}>
            {labels.nameA}
          </span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className={`text-[11px] ${dominant === 'B' ? 'text-gray-500' : 'text-gray-300'}`}>
            {labels.nameB}
          </span>
          <span className={`text-xs font-extrabold ${dominant === 'B' ? colors.textB : 'text-gray-300'}`}>
            {labels.B}
          </span>
        </div>
      </div>

      {/* 바 트랙 */}
      <div className="relative h-6 bg-gray-100 rounded-full overflow-hidden">
        {/* A 쪽 (왼쪽) */}
        <div
          className={`absolute left-0 top-0 h-full ${colors.barA} rounded-full transition-all duration-700`}
          style={{ width: `${scoreA}%` }}
        />
        {/* B 쪽 (오른쪽) */}
        <div
          className={`absolute right-0 top-0 h-full ${colors.barB} rounded-full transition-all duration-700`}
          style={{ width: `${scoreB}%` }}
        />
        {/* 중앙 구분선 */}
        <div className="absolute left-1/2 top-0 h-full w-0.5 bg-white z-10 -translate-x-1/2" />
      </div>

      {/* 수치 */}
      <div className="flex justify-between text-[11px] mt-1">
        <span className={dominant === 'A' ? colors.textA : 'text-gray-300'}>{scoreA}%</span>
        <span className={dominant === 'B' ? colors.textB : 'text-gray-300'}>{scoreB}%</span>
      </div>
    </div>
  );
}

// ── 궁합 유형 카드 ──
function CompatibleCard({ type }: { type: string }) {
  const info = MBTI_TYPES[type];
  if (!info) return null;

  const Icon = TYPE_ICONS[type] ?? Star;

  return (
    <div className={`flex items-center gap-4 bg-gradient-to-r ${info.color} rounded-2xl px-4 py-4`}>
      {/* 아이콘 원형 */}
      <div className="w-11 h-11 rounded-xl bg-white/20 flex items-center justify-center flex-shrink-0">
        <Icon size={22} className="text-white" strokeWidth={1.8} />
      </div>
      <div>
        <p className="text-sm font-extrabold text-white">{info.type}</p>
        <p className="text-xs text-white/80 mt-0.5">{info.title}</p>
      </div>
    </div>
  );
}

// ── 공유 섹션 ──
function ShareSection({
  type,
  title,
  eScore,
  nScore,
  tScore,
  jScore,
}: {
  type: string;
  title: string;
  eScore: number;
  nScore: number;
  tScore: number;
  jScore: number;
}) {
  const [copied, setCopied] = useState(false);

  // 현재 페이지 URL 생성
  const getShareUrl = () => {
    if (typeof window === 'undefined') return '';
    return window.location.href;
  };

  // 공유 텍스트 생성
  const getShareText = () => {
    const e = eScore >= 50 ? `E ${eScore}%` : `I ${100 - eScore}%`;
    const n = nScore >= 50 ? `N ${nScore}%` : `S ${100 - nScore}%`;
    const t = tScore >= 50 ? `T ${tScore}%` : `F ${100 - tScore}%`;
    const j = jScore >= 50 ? `J ${jScore}%` : `P ${100 - jScore}%`;
    return `나의 MBTI는 ${type}!\n${title}\n\n${e} · ${n} · ${t} · ${j}\n\n심랩에서 나도 테스트해봐!`;
  };

  // Web Share API 공유 (모바일 네이티브 시트 — KakaoTalk 포함)
  const handleNativeShare = useCallback(async () => {
    const url = getShareUrl();
    const text = getShareText();

    if (navigator.share) {
      try {
        await navigator.share({ title: `나는 ${type}!`, text, url });
      } catch {
        // 사용자가 공유 취소한 경우 등 — 에러 무시
      }
    } else {
      // Web Share API 미지원 환경 → 링크 복사로 대체
      handleCopyLink();
    }
  }, [type, eScore, nScore, tScore, jScore]);

  // 링크 복사
  const handleCopyLink = useCallback(async () => {
    const url = getShareUrl();
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // clipboard API 미지원 환경 (구형 브라우저) — execCommand 폴백
      const input = document.createElement('input');
      input.value = url;
      document.body.appendChild(input);
      input.select();
      document.execCommand('copy');
      document.body.removeChild(input);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  }, []);

  // X(트위터) 공유
  const handleTwitterShare = useCallback(() => {
    const url = getShareUrl();
    const text = getShareText();
    const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`;
    window.open(twitterUrl, '_blank', 'noopener,noreferrer');
  }, [type, eScore, nScore, tScore, jScore]);

  return (
    <section className="bg-white rounded-3xl shadow-sm border border-indigo-50 px-5 py-6 mb-5">
      <div className="flex items-center gap-2 mb-4">
        <Share2 size={16} className="text-indigo-500" strokeWidth={2} />
        <h2 className="text-sm font-extrabold text-ink">결과 공유하기</h2>
      </div>

      {/* 공유 텍스트 미리보기 */}
      <div className="bg-indigo-50 rounded-2xl px-4 py-3 mb-4">
        <p className="text-xs text-indigo-700 leading-relaxed whitespace-pre-line">
          {getShareText()}
        </p>
      </div>

      {/* 공유 버튼들 */}
      <div className="flex flex-col gap-2">
        {/* Web Share API — 모바일에서 KakaoTalk 포함 네이티브 시트 표시 */}
        <button
          onClick={handleNativeShare}
          className="flex items-center justify-center gap-2 w-full py-3.5 rounded-2xl bg-gradient-to-r from-indigo-500 to-violet-600 text-white font-bold text-sm shadow-sm active:scale-[0.98] transition-transform"
        >
          <Share2 size={16} strokeWidth={2.5} />
          공유하기
          <span className="text-white/70 text-[10px] font-normal">(카카오톡·인스타 등)</span>
        </button>

        {/* 링크 복사 + X 공유 */}
        <div className="flex gap-2">
          <button
            onClick={handleCopyLink}
            className={`flex flex-1 items-center justify-center gap-2 py-3 rounded-2xl border-2 text-sm font-semibold transition-all active:scale-[0.98] ${
              copied
                ? 'border-emerald-400 text-emerald-600 bg-emerald-50'
                : 'border-indigo-200 text-indigo-600 bg-white'
            }`}
          >
            {copied ? (
              <>
                <Check size={15} strokeWidth={2.5} />
                복사됨!
              </>
            ) : (
              <>
                <Link2 size={15} strokeWidth={2} />
                링크 복사
              </>
            )}
          </button>

          <button
            onClick={handleTwitterShare}
            className="flex items-center justify-center gap-2 px-4 py-3 rounded-2xl border-2 border-slate-200 text-slate-600 bg-white text-sm font-semibold active:scale-[0.98] transition-transform"
            aria-label="X(트위터)에 공유"
          >
            <Twitter size={15} strokeWidth={2} />
            X
          </button>
        </div>
      </div>
    </section>
  );
}

// ── 메인 결과 컴포넌트 ──
export default function MBTIResultClient() {
  const searchParams = useSearchParams();

  // URL 파라미터 파싱
  const rawType = searchParams.get('type') ?? '';
  const eScore = Math.min(100, Math.max(0, Number(searchParams.get('e') ?? 50)));
  const nScore = Math.min(100, Math.max(0, Number(searchParams.get('n') ?? 50)));
  const tScore = Math.min(100, Math.max(0, Number(searchParams.get('t') ?? 50)));
  const jScore = Math.min(100, Math.max(0, Number(searchParams.get('j') ?? 50)));

  // 유효한 MBTI 타입인지 확인
  const typeInfo = MBTI_TYPES[rawType.toUpperCase()];

  if (!typeInfo) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-4 px-5">
        <p className="text-muted text-sm">올바른 결과 페이지가 아닙니다.</p>
        <Link
          href="/mbti"
          className="px-6 py-3 rounded-2xl bg-brand text-white text-sm font-bold"
        >
          테스트 시작하기
        </Link>
      </div>
    );
  }

  const TypeIcon = TYPE_ICONS[typeInfo.type] ?? Star;

  return (
    <div className="min-h-screen bg-gradient-to-b from-indigo-50 to-white px-5 py-8">

      {/* ── 타입 헤더 ── */}
      <div className="text-center mb-8">
        {/* 아이콘 배지 */}
        <div
          className={`inline-flex w-24 h-24 rounded-3xl bg-gradient-to-br ${typeInfo.color} items-center justify-center shadow-lg mb-4`}
        >
          <TypeIcon size={44} className="text-white" strokeWidth={1.5} />
        </div>
        <p className="text-xs font-bold text-indigo-500 tracking-widest mb-1 uppercase">당신의 MBTI 유형</p>
        <h1 className="text-4xl font-extrabold text-ink tracking-wider mb-1">{typeInfo.type}</h1>
        <p className="text-base font-semibold text-gray-500">{typeInfo.title}</p>
      </div>

      {/* ── 차원별 비율 그래프 ── */}
      <section className="bg-white rounded-3xl shadow-sm border border-indigo-50 px-5 py-6 mb-5">
        <h2 className="text-sm font-extrabold text-ink mb-5">성향 분포</h2>
        <DimensionBar dimension="EI" scoreA={eScore} />
        <DimensionBar dimension="NS" scoreA={nScore} />
        <DimensionBar dimension="TF" scoreA={tScore} />
        <DimensionBar dimension="JP" scoreA={jScore} />
      </section>

      {/* ── MBTI 설명 ── */}
      <section className="bg-white rounded-3xl shadow-sm border border-indigo-50 px-5 py-6 mb-5">
        <h2 className="text-sm font-extrabold text-ink mb-3">유형 설명</h2>
        <p className="text-sm text-gray-600 leading-relaxed mb-4">{typeInfo.description}</p>

        {/* 특징 태그 */}
        <div className="flex flex-wrap gap-2">
          {typeInfo.traits.map((trait) => (
            <span
              key={trait}
              className="px-3 py-1 rounded-full text-xs font-bold bg-indigo-50 text-indigo-700"
            >
              {trait}
            </span>
          ))}
        </div>
      </section>

      {/* ── 공유하기 ── */}
      <ShareSection
        type={typeInfo.type}
        title={typeInfo.title}
        eScore={eScore}
        nScore={nScore}
        tScore={tScore}
        jScore={jScore}
      />

      {/* ── 잘 맞는 궁합 ── */}
      <section className="bg-white rounded-3xl shadow-sm border border-indigo-50 px-5 py-6 mb-8">
        <div className="flex items-center gap-2 mb-4">
          <Heart size={16} className="text-rose-500" strokeWidth={2} fill="currentColor" />
          <h2 className="text-sm font-extrabold text-ink">잘 맞는 유형</h2>
        </div>
        <div className="flex flex-col gap-3">
          {typeInfo.compatible.map((compat) => (
            <CompatibleCard key={compat} type={compat} />
          ))}
        </div>
        <p className="text-[10px] text-gray-400 mt-3 text-center">
          궁합은 참고용이며 개인차가 있을 수 있습니다
        </p>
      </section>

      {/* ── 재테스트 버튼 ── */}
      <Link
        href="/mbti/test"
        className="flex items-center justify-center gap-2 w-full py-4 rounded-2xl bg-gradient-to-r from-indigo-500 to-violet-600 text-white font-bold text-sm shadow-md active:scale-[0.98] transition-transform mb-3"
      >
        <RotateCcw size={16} strokeWidth={2.5} />
        다시 테스트하기
      </Link>

      <Link
        href="/mbti"
        className="flex items-center justify-center gap-1 w-full py-3 rounded-2xl border border-indigo-200 text-indigo-600 text-sm font-semibold"
      >
        테스트 소개 보기
        <ChevronRight size={15} />
      </Link>

      {/* 면책 */}
      <p className="text-center text-[10px] text-gray-400 mt-6">
        본 테스트는 오락 목적으로 제공되며 전문적인 심리 진단이 아닙니다.
        <br />
        개인 정보는 수집·저장되지 않습니다.
      </p>
    </div>
  );
}
