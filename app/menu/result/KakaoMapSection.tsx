'use client';

// 카카오맵 주변 식당 섹션 컴포넌트
// 역할: 카카오맵 SDK 동적 로드 → 현재 위치 기반 키워드 검색 → 지도 렌더링 + 장소 목록
// 데스크탑: 최대 5곳 / 모바일: 3곳 + 더보기 버튼

import { useEffect, useRef, useState, useCallback } from 'react';
import {
  MapPin, ChevronDown, AlertTriangle, Loader2,
  ExternalLink, LocateFixed, LocateOff, Info,
} from 'lucide-react';

// 카카오 SDK 전역 타입 선언
declare global {
  interface Window {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    kakao: any;
  }
}

// 카카오 장소 검색 결과 타입
interface KakaoPlace {
  id: string;
  place_name: string;
  address_name: string;
  road_address_name: string;
  phone: string;
  distance: string;
  place_url: string;
  x: string;
  y: string;
}

// 위치 권한 상태
type LocationStatus = 'requesting' | 'granted' | 'denied' | 'fallback';

// 거리 포맷팅 — 미터 → 읽기 좋은 형태
function formatDistance(distanceStr: string): string {
  const distance = Number(distanceStr);
  if (!distanceStr || isNaN(distance)) return '';
  if (distance < 1000) return `${distance}m`;
  return `${(distance / 1000).toFixed(1)}km`;
}

interface KakaoMapSectionProps {
  keyword: string;
}

export default function KakaoMapSection({ keyword }: KakaoMapSectionProps) {
  const mapContainerRef = useRef<HTMLDivElement>(null);

  const [places, setPlaces] = useState<KakaoPlace[]>([]);
  const [showAll, setShowAll] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  // 위치 권한 상태 — UI에 현위치 사용 여부 표시
  const [locationStatus, setLocationStatus] = useState<LocationStatus>('requesting');

  // 도메인이 localhost면 개발용 앱키 사용, 그 외엔 프로덕션 앱키 사용
  const isLocalhost =
    typeof window !== 'undefined' &&
    (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1');
  const apiKey = isLocalhost
    ? process.env.NEXT_PUBLIC_KAKAO_MAP_API_KEY_DEV
    : process.env.NEXT_PUBLIC_KAKAO_MAP_API_KEY;

  // 지도 초기화 + 장소 검색
  const initializeMap = useCallback(
    (lat: number, lng: number) => {
      try {
        if (!window.kakao?.maps) {
          setError('앱키 일치하지 않으면 지도 랜더링 오류발생! 서비스 담당자 문의 필요');
          setIsLoading(false);
          return;
        }

        const container = mapContainerRef.current;
        if (!container) return;

        const map = new window.kakao.maps.Map(container, {
          center: new window.kakao.maps.LatLng(lat, lng),
          level: 4,
        });

        // 현재 위치 파란 점 오버레이
        new window.kakao.maps.CustomOverlay({
          map,
          position: new window.kakao.maps.LatLng(lat, lng),
          content:
            '<div style="width:14px;height:14px;border-radius:50%;background:#4F46E5;border:3px solid white;box-shadow:0 0 0 2px #4F46E5;"></div>',
          zIndex: 10,
        });

        const ps = new window.kakao.maps.services.Places();
        ps.keywordSearch(
          keyword,
          (data: KakaoPlace[], status: string) => {
            if (status === window.kakao.maps.services.Status.OK) {
              const topPlaces = data.slice(0, 5);
              setPlaces(topPlaces);

              const bounds = new window.kakao.maps.LatLngBounds();
              bounds.extend(new window.kakao.maps.LatLng(lat, lng));

              topPlaces.forEach((place, index) => {
                const position = new window.kakao.maps.LatLng(
                  Number(place.y),
                  Number(place.x)
                );
                bounds.extend(position);

                const marker = new window.kakao.maps.Marker({ position, map });
                const infowindow = new window.kakao.maps.InfoWindow({
                  content: `<div style="padding:6px 10px;font-size:12px;font-weight:700;white-space:nowrap;max-width:160px;overflow:hidden;text-overflow:ellipsis">${index + 1}. ${place.place_name}</div>`,
                });
                window.kakao.maps.event.addListener(marker, 'click', () => {
                  infowindow.open(map, marker);
                });
              });

              map.setBounds(bounds);
            } else if (status === window.kakao.maps.services.Status.ZERO_RESULT) {
              setPlaces([]);
            } else {
              setError('주변 식당 검색 중 오류가 발생했어요. 잠시 후 다시 시도해주세요.');
            }
            setIsLoading(false);
          },
          {
            location: new window.kakao.maps.LatLng(lat, lng),
            radius: 2000,
            sort: window.kakao.maps.services.SortBy.DISTANCE,
          }
        );
      } catch {
        setError('앱키 일치하지 않으면 지도 랜더링 오류발생! 서비스 담당자 문의 필요');
        setIsLoading(false);
      }
    },
    [keyword]
  );

  // Geolocation — Permissions API로 권한 상태 확인 후 현위치 획득
  // enableHighAccuracy: true + maximumAge: 0 으로 캐시된 위치 방지
  const loadMapWithGeolocation = useCallback(() => {
    if (!navigator.geolocation) {
      setLocationStatus('fallback');
      initializeMap(37.5665, 126.978);
      return;
    }

    const doGetPosition = () => {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          setLocationStatus('granted');
          initializeMap(pos.coords.latitude, pos.coords.longitude);
        },
        (err) => {
          // err.code 1: PERMISSION_DENIED / 2: POSITION_UNAVAILABLE / 3: TIMEOUT
          setLocationStatus(err.code === 1 ? 'denied' : 'fallback');
          initializeMap(37.5665, 126.978);
        },
        {
          enableHighAccuracy: true, // 고정밀 GPS 요청
          timeout: 10000,           // 10초 대기
          maximumAge: 0,            // 캐시된 위치 사용 금지
        }
      );
    };

    // Permissions API 지원 시 미리 상태 확인 (Chrome/Edge)
    if (navigator.permissions?.query) {
      navigator.permissions
        .query({ name: 'geolocation' as PermissionName })
        .then((result) => {
          if (result.state === 'denied') {
            setLocationStatus('denied');
            initializeMap(37.5665, 126.978);
          } else {
            doGetPosition();
          }
        })
        .catch(() => doGetPosition());
    } else {
      doGetPosition();
    }
  }, [initializeMap]);

  // 카카오맵 SDK 동적 로드
  useEffect(() => {
    if (!apiKey || apiKey === 'your_kakao_javascript_app_key_here') {
      setError('앱키 일치하지 않으면 지도 랜더링 오류발생! 서비스 담당자 문의 필요');
      setIsLoading(false);
      return;
    }

    if (window.kakao?.maps) {
      loadMapWithGeolocation();
      return;
    }

    const script = document.createElement('script');
    script.async = true;
    script.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${apiKey}&libraries=services&autoload=false`;
    script.onload = () => {
      window.kakao.maps.load(() => loadMapWithGeolocation());
    };
    script.onerror = () => {
      setError('앱키 일치하지 않으면 지도 랜더링 오류발생! 서비스 담당자 문의 필요');
      setIsLoading(false);
    };
    document.head.appendChild(script);
  }, [apiKey, loadMapWithGeolocation]);

  // ── 에러 UI ──
  if (error) {
    return (
      <section className="mb-5">
        <div className="flex items-center gap-2 mb-3">
          <MapPin size={15} className="text-brand" strokeWidth={2} />
          <h2 className="text-sm font-extrabold text-ink">주변 식당</h2>
        </div>
        <div className="bg-red-50 border border-red-200 rounded-2xl px-5 py-5 flex items-start gap-3">
          <AlertTriangle size={18} className="text-red-500 flex-shrink-0 mt-0.5" strokeWidth={2} />
          <div>
            <p className="text-sm font-bold text-red-600 mb-1">지도 로드 오류</p>
            <p className="text-xs text-red-500 leading-relaxed">{error}</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="mb-5">
      {/* 섹션 헤더 — 위치 권한 상태 표시 */}
      <div className="flex items-center gap-2 mb-2">
        <MapPin size={15} className="text-brand" strokeWidth={2} />
        <h2 className="text-sm font-extrabold text-ink">주변 식당</h2>

        {/* 위치 상태 배지 */}
        {locationStatus === 'requesting' && (
          <span className="flex items-center gap-1 text-[10px] text-gray-400">
            <Loader2 size={10} className="animate-spin" />
            위치 확인 중
          </span>
        )}
        {locationStatus === 'granted' && (
          <span className="flex items-center gap-1 text-[10px] text-emerald-500 font-semibold">
            <LocateFixed size={10} />
            내 위치 기준
          </span>
        )}
        {(locationStatus === 'denied' || locationStatus === 'fallback') && (
          <span className="flex items-center gap-1 text-[10px] text-orange-400 font-semibold">
            <LocateOff size={10} />
            {locationStatus === 'denied' ? '위치 권한 필요' : '서울시청 기준'}
          </span>
        )}
      </div>

      {/* 위치 권한 거부 안내 — 배경 없이 붉은 글씨 */}
      {locationStatus === 'denied' && (
        <p className="text-[11px] text-red-500 mb-2 pl-1 leading-relaxed">
          브라우저 주소창 왼쪽 자물쇠 → 위치 → 허용 후 새로고침하면 현재 위치로 검색해요.
        </p>
      )}

      {/* 지도 컨테이너 */}
      <div
        ref={mapContainerRef}
        className="w-full h-52 rounded-2xl overflow-hidden border border-indigo-100 bg-indigo-50 mb-2 relative"
        aria-label={`${keyword} 주변 식당 지도`}
      >
        {isLoading && (
          <div className="absolute inset-0 flex items-center justify-center bg-indigo-50 z-10">
            <div className="flex flex-col items-center gap-2">
              <Loader2 size={24} className="animate-spin text-indigo-400" />
              <span className="text-xs text-muted">지도 불러오는 중...</span>
            </div>
          </div>
        )}
      </div>

      {/* 위치 정확도 안내 — 지도 하단 */}
      <p className="flex items-center gap-1 text-[10px] text-gray-400 mb-3 pl-1">
        <Info size={10} className="flex-shrink-0" />
        GPS·네트워크 환경에 따라 표시 위치가 실제와 다를 수 있어요.
      </p>

      {/* 장소 목록 */}
      {!isLoading && places.length > 0 && (
        <>
          <div className="flex flex-col gap-2">
            {places.map((place, index) => (
              <a
                key={place.id}
                href={place.place_url}
                target="_blank"
                rel="noopener noreferrer"
                // 데스크탑(sm+): 5곳 모두 / 모바일: 3곳 + showAll 시 전체
                className={`
                  flex items-start gap-3 bg-white rounded-2xl px-4 py-3.5
                  border border-indigo-50 shadow-sm
                  hover:border-indigo-200 hover:shadow-md
                  active:scale-[0.98] transition-all
                  ${index >= 3 && !showAll ? 'hidden sm:flex' : 'flex'}
                `}
                aria-label={`${place.place_name} 카카오맵에서 보기`}
              >
                {/* 순위 배지 */}
                <span className="w-6 h-6 rounded-full bg-indigo-50 text-indigo-600 text-[11px] font-extrabold flex items-center justify-center flex-shrink-0 mt-0.5">
                  {index + 1}
                </span>

                {/* 장소 정보 */}
                <div className="flex-1 min-w-0">
                  {/* 이름 */}
                  <div className="flex items-center gap-1 mb-0.5">
                    <p className="text-sm font-bold text-ink truncate">{place.place_name}</p>
                    <ExternalLink size={11} className="text-gray-400 flex-shrink-0" />
                  </div>
                  {/* 주소 */}
                  <p className="text-[11px] text-muted truncate">
                    {place.road_address_name || place.address_name}
                  </p>
                  {/* 전화번호 (있을 경우) */}
                  {place.phone && (
                    <p className="text-[11px] text-gray-400 mt-0.5">{place.phone}</p>
                  )}
                </div>

                {/* 거리 배지 */}
                {place.distance && (
                  <span className="text-xs font-bold text-indigo-500 flex-shrink-0 bg-indigo-50 px-2 py-0.5 rounded-full mt-0.5">
                    {formatDistance(place.distance)}
                  </span>
                )}
              </a>
            ))}
          </div>

          {/* 더보기 버튼 — 모바일 전용 */}
          {!showAll && places.length > 3 && (
            <button
              onClick={() => setShowAll(true)}
              className="sm:hidden flex items-center justify-center gap-1.5 w-full mt-2 py-3 rounded-2xl border border-indigo-100 text-indigo-600 text-sm font-semibold hover:bg-indigo-50 active:scale-[0.98] transition-all"
              aria-label={`식당 ${places.length - 3}곳 더보기`}
            >
              <ChevronDown size={15} strokeWidth={2.5} />
              더보기 ({places.length - 3}곳 더)
            </button>
          )}
        </>
      )}

      {/* 검색 결과 없음 */}
      {!isLoading && places.length === 0 && (
        <p className="text-center text-sm text-muted py-3">
          주변 {keyword} 식당을 찾을 수 없어요.
        </p>
      )}
    </section>
  );
}
