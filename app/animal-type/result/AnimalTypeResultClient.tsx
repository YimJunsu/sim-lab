'use client';

// 이상형 동물상 결과 클라이언트 컴포넌트
// URL 파라미터: gender(사용자 성별), result(동물 ID)
// 구조: 동물 헤더 → 키워드 배지 → 설명 → 특징 → 연애스타일 → 공유 → 재테스트

import { useState, useCallback } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { RotateCcw, Share2, Link2, Check } from 'lucide-react';
import { ANIMAL_DATA } from '@/data/animal-type/animal-type-data';

export default function AnimalTypeResultClient() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [copied, setCopied] = useState(false);

  const gender = searchParams.get('gender');
  const resultId = searchParams.get('result');
  const animal = resultId ? ANIMAL_DATA[resultId] : null;

  // 잘못된 파라미터 → 인트로로 리다이렉트
  if (!animal || !gender) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-4 px-5">
        <p className="text-ink font-bold">결과를 찾을 수 없습니다.</p>
        <Link
          href="/animal-type"
          className="px-6 py-3 rounded-2xl bg-pink-500 text-white font-bold text-sm"
        >
          테스트 다시하기
        </Link>
      </div>
    );
  }

  // URL 복사
  const handleCopyLink = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // clipboard API 미지원 폴백
    }
  }, []);

  // 카카오·트위터 공유 (Web Share API 우선)
  const handleShare = useCallback(async () => {
    const shareData = {
      title: `내 이상형은 ${animal.name}! ${animal.emoji}`,
      text: `${animal.summary}\n심랩에서 나의 이상형 동물상을 찾아봐!`,
      url: window.location.href,
    };
    if (navigator.share) {
      try {
        await navigator.share(shareData);
      } catch {
        // 공유 취소
      }
    } else {
      handleCopyLink();
    }
  }, [animal, handleCopyLink]);

  return (
    <div className={`min-h-screen bg-gradient-to-b ${animal.gradientFrom} ${animal.gradientTo} flex flex-col px-5 py-8`}>

      {/* 상단 동물 헤더 */}
      <div className="flex flex-col items-center text-center mb-6">
        {/* 동물 이모지 */}
        <div className={`w-24 h-24 rounded-3xl ${animal.iconBg} flex items-center justify-center shadow-lg mb-4 text-5xl`}>
          {animal.emoji}
        </div>

        {/* 결과 타이틀 */}
        <p className="text-sm font-medium text-muted mb-1">
          {gender === 'male' ? '당신의 이상형 여성은' : '당신의 이상형 남성은'}
        </p>
        <h1 className={`text-3xl font-extrabold ${animal.accentText} mb-1`}>{animal.name}</h1>
        <p className="text-sm text-muted leading-relaxed px-4">{animal.summary}</p>
      </div>

      {/* 키워드 배지 */}
      <div className="flex justify-center gap-2 mb-6 flex-wrap">
        {animal.keywords.map((kw) => (
          <span
            key={kw}
            className={`px-3 py-1 rounded-full text-xs font-bold ${animal.badgeBg} ${animal.badgeText}`}
          >
            {kw}
          </span>
        ))}
      </div>

      {/* 설명 카드 */}
      <div className="bg-white rounded-3xl shadow-sm border border-gray-100 px-5 py-5 mb-4">
        <h2 className={`text-sm font-extrabold ${animal.accentText} mb-2`}>
          {animal.name} 매력 포인트
        </h2>
        <p className="text-sm text-ink leading-relaxed">{animal.description}</p>
      </div>

      {/* 특징 카드 */}
      <div className="bg-white rounded-3xl shadow-sm border border-gray-100 px-5 py-5 mb-4">
        <h2 className={`text-sm font-extrabold ${animal.accentText} mb-3`}>특징</h2>
        <ul className="flex flex-col gap-2">
          {animal.traits.map((trait) => (
            <li key={trait} className="flex items-start gap-2">
              <span className={`mt-0.5 w-4 h-4 rounded-full ${animal.iconBg} ${animal.accentText} flex items-center justify-center flex-shrink-0 text-[10px] font-bold`}>
                ✓
              </span>
              <span className="text-sm text-ink leading-relaxed">{trait}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* 연애 스타일 카드 */}
      <div className="bg-white rounded-3xl shadow-sm border border-gray-100 px-5 py-5 mb-6">
        <h2 className={`text-sm font-extrabold ${animal.accentText} mb-2`}>연애 스타일</h2>
        <p className="text-sm text-ink leading-relaxed">{animal.loveStyle}</p>
      </div>

      {/* 공유 버튼 */}
      <div className="flex gap-3 mb-4">
        <button
          onClick={handleShare}
          className={`flex-1 flex items-center justify-center gap-2 py-3.5 rounded-2xl ${animal.accentBg} text-white font-bold text-sm shadow-md active:scale-[0.98] transition-transform`}
        >
          <Share2 size={16} />
          결과 공유하기
        </button>
        <button
          onClick={handleCopyLink}
          className="w-12 h-12 rounded-2xl bg-white border border-gray-200 flex items-center justify-center shadow-sm active:scale-[0.98] transition-transform flex-shrink-0"
          aria-label="링크 복사"
        >
          {copied ? <Check size={18} className="text-green-500" /> : <Link2 size={18} className="text-muted" />}
        </button>
      </div>

      {/* 다시하기 */}
      <button
        onClick={() => router.push('/animal-type/test')}
        className="flex items-center justify-center gap-2 w-full py-3.5 rounded-2xl bg-white border-2 border-gray-200 text-ink font-bold text-sm active:scale-[0.98] transition-transform"
      >
        <RotateCcw size={16} />
        다시 테스트하기
      </button>

      {/* 면책 */}
      <p className="text-center text-[10px] text-gray-400 mt-5">
        본 테스트는 오락 목적으로 제공되며 전문적인 심리 진단이 아닙니다.
      </p>
    </div>
  );
}
