import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: '면책고지',
  robots: { index: false },
};

const EFFECTIVE_DATE = '2026년 4월 3일';

export default function DisclaimerPage() {
  return (
    <article>
      <h1 className="text-xl font-black text-[#1A1A2E] mb-1">면책고지</h1>
      <p className="text-xs text-[#6B7280] mb-8">시행일: {EFFECTIVE_DATE}</p>

      <AlertBox>
        본 서비스의 모든 콘텐츠는 <strong>오락 및 참고 목적</strong>으로만
        제공됩니다. 전문적인 조언(의료, 법률, 재정 등)을 대체하지 않습니다.
      </AlertBox>

      <Section title="1. AI 생성 콘텐츠 (사주풀이)">
        <p>
          심랩의 AI 사주풀이 서비스는 OpenAI의 GPT 모델을 활용하여 생성된
          텍스트를 제공합니다.
        </p>
        <ul>
          <li>
            AI가 생성한 사주풀이 결과는 <strong>통계적 언어 모델</strong>에
            기반한 창작물이며, 실제 점술이나 운명을 예측하지 않습니다.
          </li>
          <li>결과의 정확성, 완전성, 신뢰성을 보장하지 않습니다.</li>
          <li>결과를 믿고 내린 결정으로 발생한 손해에 대해 책임을 지지 않습니다.</li>
          <li>동일한 입력에 대해 매번 다른 결과가 나올 수 있습니다.</li>
        </ul>
      </Section>

      <Section title="2. 타로 서비스 (심봉이 타로)">
        <p>
          심봉이 타로는 사전 정의된 카드 해설 데이터를 기반으로 결과를 제공하는
          엔터테인먼트 콘텐츠입니다.
        </p>
        <ul>
          <li>
            타로 결과는 카드 선택과 사전 작성된 해설의 조합으로 생성되며,
            외부 AI 서비스를 사용하지 않습니다.
          </li>
          <li>결과는 오락 목적으로만 제공되며, 미래 예측이나 운명을 보장하지 않습니다.</li>
          <li>결과를 바탕으로 내린 결정으로 발생한 손해에 대해 책임을 지지 않습니다.</li>
        </ul>
      </Section>

      <Section title="3. 메뉴 추천 서비스">
        <p>
          오늘 뭐 먹지? 서비스는 알고리즘 기반 메뉴 추천과 카카오맵 주변 식당 검색을 제공합니다.
        </p>
        <ul>
          <li>
            표시되는 영양 정보는 참고용 추정치로, 실제 음식의 영양 성분과
            다를 수 있습니다.
          </li>
          <li>
            알레르기, 질환 등 특수한 식이 요건이 있는 경우 전문 의료인과
            상담하시기 바랍니다.
          </li>
          <li>
            주변 식당 정보는 카카오맵 API 데이터를 기반으로 하며, 영업 시간·위치·정보는
            실제와 다를 수 있습니다. 방문 전 반드시 확인하시기 바랍니다.
          </li>
        </ul>
      </Section>

      <Section title="4. 심리·성향 테스트">
        <p>
          이상형 동물상 테스트, 이상형 성향 테스트, MBTI 테스트, 감정 점수화 등
          심리 관련 콘텐츠에 대해 다음을 고지합니다.
        </p>
        <ul>
          <li>
            본 테스트들은 공인된 심리 검사 도구가 아닌 엔터테인먼트 목적의
            콘텐츠입니다.
          </li>
          <li>결과가 개인의 성격, 심리 상태, 이상형을 정확하게 반영하지 않을 수 있습니다.</li>
          <li>
            심리적 문제가 있다고 판단되는 경우 전문 심리 상담사의 도움을
            받으시기 바랍니다.
          </li>
        </ul>
      </Section>

      <Section title="5. 개인정보 및 위치 정보">
        <ul>
          <li>
            심랩은 이용자가 입력한 개인정보(생년월일 등)를 서버에 저장하지
            않습니다.
          </li>
          <li>
            오늘 뭐 먹지? 서비스의 주변 식당 검색 기능은 브라우저 Geolocation API를 통해
            현재 위치를 일시적으로 수집합니다. 수집된 위치 정보는 카카오맵 검색에만 사용되며
            심랩 서버에 저장되지 않습니다.
          </li>
          <li>위치 권한을 허용하지 않아도 서비스 이용이 가능하며, 이 경우 기본 위치(서울시청)를 기준으로 검색됩니다.</li>
        </ul>
      </Section>

      <Section title="6. 외부 링크 및 제3자 서비스">
        <p>
          심랩은 외부 웹사이트 링크를 포함할 수 있습니다. 외부 링크에서
          발생하는 문제에 대해 심랩은 책임을 지지 않으며, 각 사이트의 별도
          약관이 적용됩니다.
        </p>
      </Section>

      <Section title="7. 서비스 가용성">
        <p>
          심랩은 서비스의 무중단 운영을 위해 노력하지만, 시스템 점검, 외부
          API 장애, 천재지변 등의 이유로 서비스가 중단될 수 있습니다. 이로
          인한 손해에 대해 심랩은 책임을 지지 않습니다.
        </p>
      </Section>

      <Section title="8. 콘텐츠 변경">
        <p>
          심랩은 사전 고지 없이 서비스 콘텐츠를 변경, 추가, 삭제할 수
          있습니다. 최신 버전의 본 고지 내용은 항상 서비스 내에서 확인하실 수
          있습니다.
        </p>
      </Section>

      <Section title="문의">
        <p>
          면책고지 관련 문의나 콘텐츠 오류 신고: yimjunsu@gmail.com
        </p>
      </Section>
    </article>
  );
}

function AlertBox({ children }: { children: React.ReactNode }) {
  return (
    <div className="bg-amber-50 border border-amber-200 rounded-xl px-4 py-4 mb-8 text-sm text-amber-900 leading-relaxed">
      ⚠️ {children}
    </div>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
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
