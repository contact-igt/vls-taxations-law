import { Container } from "../ui/Container";
import { Reveal } from "../ui/Reveal";
import { Eyebrow } from "../ui/Eyebrow";

const UNIT_1_TOPICS = [
  "Basics of Direct Taxes",
  "Basics of Indirect Taxes",
  "Constitutional basics of Taxation",
  "Annual Financial Statement",
  "Finance Act",
  "Appropriation Act",
  "Consolidated Fund of India",
  "Public Account of India",
  "Comptroller and Auditor General of India",
  "Finance Commission of India",
  "Centre-State Financial Relations",
  "GST Council",
  "101st Constitutional Amendment Act, 2016",
];

const UNIT_2_SECTIONS = [
  {
    title: "Assessment-Level Matters",
    body: "Income Tax and GST assessment-related disputes.",
  },
  {
    title: "Commissioner of Income Tax (Appeal)",
    body: "Understand Income Tax appellate proceedings.",
  },
  {
    title: "Customs, Excise & Service Tax Appeals",
    body: "Understand relevant Commissioner-level appellate matters.",
  },
  { title: "ITAT", body: "Income Tax Appellate Tribunal." },
  { title: "CESTAT", body: "Customs, Excise and Service Tax Appellate Tribunal." },
  { title: "GST Appellate Tribunal", body: "Understand GST appellate matters." },
  { title: "High Court", body: "Writs and Writ Appeals in tax matters." },
];

export function Curriculum() {
  return (
    <section id="curriculum" className="bg-white py-20">
      <Container>
        <Reveal className="max-w-2xl">
          <Eyebrow>The Curriculum</Eyebrow>
          <h2 className="mt-3 font-serif text-[32px] font-medium leading-tight text-vls-black md:text-[40px]">
            Two Units. From Taxation Fundamentals to Tax Adjudication.
          </h2>
        </Reveal>

        <Reveal className="mt-16">
          <div className="flex flex-col gap-2 border-b border-vls-border pb-6 md:flex-row md:items-baseline md:justify-between">
            <div>
              <p className="text-[11px] font-extrabold uppercase tracking-[1.8px] text-vls-red">
                Unit 01
              </p>
              <h3 className="mt-2 max-w-2xl font-serif text-[24px] font-medium leading-snug text-vls-black">
                Basics of Direct Taxes &amp; Indirect Taxes under the Indian Constitution
              </h3>
            </div>
          </div>
          <p className="mt-5 max-w-2xl text-[15px] leading-relaxed text-vls-muted">
            Build the constitutional, financial and institutional foundation required to
            understand taxation law and its role within India&apos;s legal system.
          </p>

          <ul className="mt-7 flex flex-wrap gap-2.5">
            {UNIT_1_TOPICS.map((topic) => (
              <li
                key={topic}
                className="border border-vls-border bg-vls-off-white px-3.5 py-2 text-[13.5px] text-vls-black"
              >
                {topic}
              </li>
            ))}
          </ul>

          <p className="mt-7 border-t border-vls-border pt-5 text-[14px] text-vls-muted">
            <span className="font-semibold text-vls-black">Outcome — </span>
            Build a clear understanding of the constitutional, financial and institutional
            framework behind taxation in India.
          </p>
        </Reveal>

        <Reveal className="mt-16">
          <div className="border-b border-vls-border pb-6">
            <p className="text-[11px] font-extrabold uppercase tracking-[1.8px] text-vls-red">
              Unit 02
            </p>
            <h3 className="mt-2 max-w-2xl font-serif text-[24px] font-medium leading-snug text-vls-black">
              Tax-Related Adjudications
            </h3>
          </div>
          <p className="mt-5 max-w-2xl text-[15px] leading-relaxed text-vls-muted">
            Move from taxation concepts to the forums in which taxation disputes are actually
            dealt with.
          </p>

          <div className="mt-7 grid gap-x-10 sm:grid-cols-2">
            {UNIT_2_SECTIONS.map((item) => (
              <div key={item.title} className="border-t border-vls-border py-5">
                <p className="font-serif text-[17px] font-medium text-vls-black">
                  {item.title}
                </p>
                <p className="mt-1.5 text-[14.5px] leading-relaxed text-vls-muted">
                  {item.body}
                </p>
              </div>
            ))}
          </div>

          <p className="mt-2 border-t border-vls-border pt-5 text-[14px] text-vls-muted">
            <span className="font-semibold text-vls-black">Outcome — </span>
            Understand how taxation disputes move from departmental proceedings into appeals,
            specialised tribunals and the High Court.
          </p>
        </Reveal>
      </Container>
    </section>
  );
}
