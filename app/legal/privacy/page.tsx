import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: '개인정보처리방침',
  robots: { index: false },
};

const EFFECTIVE_DATE = '2026년 4월 3일';

export default function PrivacyPage() {
  return (
    <article className="prose-legal">
      <h1 className="text-xl font-black text-[#1A1A2E] mb-1">
        개인정보처리방침
      </h1>
      <p className="text-xs text-[#6B7280] mb-8">시행일: {EFFECTIVE_DATE}</p>

      <Section title="1. 개요">
        <p>
          심랩(이하 &quot;서비스&quot;)은 이용자의 개인정보를 중요하게 생각합니다.
          본 방침은 서비스 이용 과정에서 수집되는 정보의 종류, 이용 목적,
          보호 방법을 안내합니다.
        </p>
        <Highlight>
          심랩은 <strong>서버에 개인정보를 저장하지 않습니다.</strong> AI
          사주풀이에 입력된 생년월일 등 정보는 API 처리 후 즉시 파기되며,
          위치 정보는 주변 식당 검색 용도로만 일시 사용됩니다.
        </Highlight>
      </Section>

      <Section title="2. 수집하는 정보">
        <p>서비스는 다음과 같은 최소한의 정보만 수집합니다.</p>
        <Table
          headers={['구분', '수집 항목', '수집 방법']}
          rows={[
            ['필수', '없음 (회원가입 없음)', '—'],
            ['자동 수집', 'IP 주소, 브라우저 종류, 방문 페이지', '웹서버 로그 (익명)'],
            ['선택 (AI 사주)', '생년월일, 성별, 이름 (입력 시)', '이용자 직접 입력'],
            ['선택 (위치정보)', '현재 위치 (위도·경도)', '브라우저 Geolocation API (오늘 뭐먹지 주변 식당 검색 시)'],
          ]}
        />
        <p className="text-xs text-[#6B7280]">
          * 자동 수집 정보는 서비스 운영 통계 목적으로만 활용되며 개인 식별에
          사용되지 않습니다.
        </p>
      </Section>

      <Section title="3. 개인정보 이용 목적">
        <ul>
          <li>AI 사주풀이 결과 생성 (입력 즉시 처리, 저장 없음)</li>
          <li>오늘 뭐먹지? 주변 식당 검색 (위치 정보 — 카카오맵 API 호출 후 미저장)</li>
          <li>서비스 이용 통계 분석 (익명화된 데이터)</li>
          <li>서비스 오류 감지 및 개선</li>
        </ul>
      </Section>

      <Section title="4. 개인정보 보유 및 파기">
        <p>
          수집된 정보는 이용 목적 달성 즉시 파기합니다. AI 서비스 입력값은
          API 호출 후 당사 서버에 저장되지 않으며, OpenAI 등 외부 API의 처리
          정책에 따릅니다.
        </p>
        <Table
          headers={['항목', '보유 기간']}
          rows={[
            ['생년월일 등 입력값 (AI 사주)', '처리 후 즉시 파기 (미저장)'],
            ['현재 위치 정보 (주변 식당 검색)', '처리 후 즉시 파기 (미저장)'],
            ['익명 방문 로그', '최대 30일'],
          ]}
        />
      </Section>

      <Section title="5. 제3자 제공 및 위탁">
        <p>심랩은 이용자의 개인정보를 제3자에게 제공하지 않습니다. 단, 아래 기능은 외부 API를 활용하며 해당 정책을 따릅니다.</p>
        <Table
          headers={['수탁사', '위탁 내용', '관련 서비스']}
          rows={[
            ['OpenAI', '텍스트 생성 API 처리 (생년월일 등 입력값)', 'AI 사주풀이'],
            ['카카오', '장소 검색 API 처리 (현재 위치 좌표)', '오늘 뭐먹지? 주변 식당 검색'],
          ]}
        />
        <p className="text-xs text-[#6B7280]">
          * 심봉이 타로, MBTI 테스트, 이상형 테스트 등 나머지 서비스는 외부 API를 사용하지 않습니다.
        </p>
      </Section>

      <Section title="6. 쿠키 및 유사 기술">
        <p>
          심랩은 서비스 개선을 위해 Google Analytics 등의 분석 도구를 사용할
          수 있습니다. 브라우저 설정에서 쿠키를 비활성화할 수 있습니다.
        </p>
      </Section>

      <Section title="7. 이용자 권리">
        <p>이용자는 언제든지 다음 권리를 행사할 수 있습니다.</p>
        <ul>
          <li>개인정보 처리 현황 열람 요청</li>
          <li>개인정보 정정·삭제 요청</li>
          <li>개인정보 처리 정지 요청</li>
        </ul>
        <p>문의: yimjunsu@gmail.com</p>
      </Section>

      <Section title="8. 개인정보 보호책임자">
        <Table
          headers={['항목', '내용']}
          rows={[
            ['책임자', '심랩 운영팀'],
            ['이메일', 'yimjunsu@gmail.com'],
            ['처리 기간', '7영업일 이내'],
          ]}
        />
      </Section>

      <Section title="9. 방침 변경 안내">
        <p>
          본 방침이 변경될 경우 서비스 내 공지사항을 통해 사전 안내합니다.
          변경 내용은 공지일로부터 7일 후 효력이 발생합니다.
        </p>
      </Section>
    </article>
  );
}

// ── 재사용 UI 컴포넌트 ──────────────────────────────────

function Section({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section className="mb-8">
      <h2 className="text-[15px] font-bold text-[#1A1A2E] mb-3 pb-1 border-b border-[#E5E7EB]">
        {title}
      </h2>
      <div className="text-sm text-[#374151] leading-relaxed space-y-2">
        {children}
      </div>
    </section>
  );
}

function Highlight({ children }: { children: ReactNode }) {
  return (
    <div className="bg-[#eef2ff] border-l-4 border-[#312E81] rounded-r-lg px-4 py-3 my-3 text-sm text-[#1A1A2E]">
      {children}
    </div>
  );
}

function Table({
  headers,
  rows,
}: {
  headers: string[];
  rows: string[][];
}) {
  return (
    <div className="overflow-x-auto my-3">
      <table className="w-full text-xs border-collapse">
        <thead>
          <tr className="bg-[#f9fafb]">
            {headers.map((h) => (
              <th
                key={h}
                className="border border-[#E5E7EB] px-3 py-2 text-left font-semibold text-[#374151]"
              >
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => (
            <tr key={i} className="even:bg-[#f9fafb]">
              {row.map((cell, j) => (
                <td
                  key={j}
                  className="border border-[#E5E7EB] px-3 py-2 text-[#374151]"
                >
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

// ReactNode 타입 import
import type { ReactNode } from 'react';
