import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: '이용약관',
  robots: { index: false },
};

const EFFECTIVE_DATE = '2026년 3월 21일';

export default function TermsPage() {
  return (
    <article>
      <h1 className="text-xl font-black text-[#1A1A2E] mb-1">이용약관</h1>
      <p className="text-xs text-[#6B7280] mb-8">시행일: {EFFECTIVE_DATE}</p>

      <Section title="제1조 (목적)">
        <p>
          본 약관은 심랩(simlab.kr, 이하 &quot;서비스&quot;)이 제공하는 웹
          서비스의 이용 조건과 절차, 이용자와 서비스 간의 권리·의무 및 책임에
          관한 사항을 규정함을 목적으로 합니다.
        </p>
      </Section>

      <Section title="제2조 (정의)">
        <ul>
          <li>
            <strong>&quot;서비스&quot;</strong>: 심랩이 운영하는 AI 사주풀이,
            메뉴 추천, 심리 테스트 등 웹 기반 콘텐츠 일체
          </li>
          <li>
            <strong>&quot;이용자&quot;</strong>: 별도 회원 가입 없이 서비스에
            접속하여 콘텐츠를 이용하는 자
          </li>
          <li>
            <strong>&quot;콘텐츠&quot;</strong>: 서비스 내 제공되는 텍스트,
            이미지, AI 생성 결과물 등 일체
          </li>
        </ul>
      </Section>

      <Section title="제3조 (약관의 효력 및 변경)">
        <p>
          본 약관은 서비스 화면에 게시하거나 기타 방법으로 이용자에게
          공지함으로써 효력이 발생합니다. 약관 변경 시 변경 내용을 7일 전
          공지하며, 변경된 약관에 동의하지 않는 경우 서비스 이용을 중단할 수
          있습니다.
        </p>
      </Section>

      <Section title="제4조 (서비스 이용)">
        <ul>
          <li>서비스는 별도 회원 가입 없이 무료로 이용 가능합니다.</li>
          <li>
            서비스는 24시간 365일 제공을 원칙으로 하나, 시스템 점검·장애·기타
            사유로 일시 중단될 수 있습니다.
          </li>
          <li>
            AI 서비스(사주풀이 등)의 결과는 오락 목적으로만 제공되며 정확성을
            보장하지 않습니다.
          </li>
        </ul>
      </Section>

      <Section title="제5조 (이용자의 의무)">
        <p>이용자는 다음 행위를 해서는 안 됩니다.</p>
        <ul>
          <li>서비스의 정상적인 운영을 방해하는 행위</li>
          <li>타인의 개인정보를 도용하거나 허위 정보를 입력하는 행위</li>
          <li>서비스 콘텐츠를 무단으로 복제·배포·상업적으로 이용하는 행위</li>
          <li>자동화된 수단(봇, 스크래퍼 등)으로 서비스를 과도하게 이용하는 행위</li>
          <li>관련 법령 또는 공서양속에 위반되는 행위</li>
        </ul>
      </Section>

      <Section title="제6조 (서비스 제공의 제한 및 중단)">
        <p>
          심랩은 다음 경우 사전 통보 없이 서비스를 일시 중단할 수 있습니다.
        </p>
        <ul>
          <li>시스템 점검·교체·수리 등 기술적 필요가 있는 경우</li>
          <li>외부 API(OpenAI 등) 장애 발생 시</li>
          <li>천재지변, 국가 비상사태 등 불가항력적 사유가 발생한 경우</li>
        </ul>
      </Section>

      <Section title="제7조 (지식재산권)">
        <p>
          서비스 내 콘텐츠(텍스트, 이미지, UI 디자인 등)의 지식재산권은
          심랩에 귀속됩니다. 이용자는 서비스를 통해 얻은 정보를 심랩의 사전
          동의 없이 상업적으로 이용하거나 제3자에게 제공할 수 없습니다.
        </p>
      </Section>

      <Section title="제8조 (면책 조항)">
        <p>
          심랩은 AI가 생성한 사주풀이, 메뉴 추천, 심리 테스트 결과의 정확성을
          보장하지 않으며, 이를 신뢰하여 발생한 손해에 대해 책임을 지지
          않습니다. 서비스는 오락 및 참고 목적으로만 이용하시기 바랍니다.
        </p>
      </Section>

      <Section title="제9조 (준거법 및 관할법원)">
        <p>
          본 약관은 대한민국 법률에 따라 규율되며, 서비스와 관련하여 발생하는
          분쟁에 대해서는 대한민국 법원을 관할 법원으로 합니다.
        </p>
      </Section>

      <Section title="문의">
        <p>이용약관에 관한 문의: yimjunsu@gmail.com</p>
      </Section>
    </article>
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
