import { Container } from "../ui/Container";
import { Reveal } from "../ui/Reveal";
import { Eyebrow } from "../ui/Eyebrow";
import { DisputeJourneyVisual } from "../ui/DisputeJourneyVisual";

const OUTCOMES = [
  "Understand Direct and Indirect Tax fundamentals",
  "Understand the constitutional foundations of taxation",
  "Understand GST and the GST Council",
  "Understand tax authorities and assessment disputes",
  "Understand Income Tax appellate proceedings",
  "Understand Customs, Excise and Service Tax appellate proceedings",
  "Understand ITAT matters",
  "Understand CESTAT matters",
  "Understand GST appellate matters",
  "Understand tax-related Writs and Writ Appeals before the High Court",
];

export function Outcomes() {
  return (
    <section className="bg-white py-20">
      <Container>
        <Reveal className="max-w-2xl">
          <Eyebrow>Your Outcome</Eyebrow>
          <h2 className="mt-3 font-serif text-[32px] font-medium leading-tight text-vls-black md:text-[40px]">
            Understand How Tax Disputes Move Through the Legal System.
          </h2>
        </Reveal>

        <div className="mt-12 grid gap-x-10 sm:grid-cols-2">
          {OUTCOMES.map((outcome, i) => (
            <Reveal key={outcome} delayMs={(i % 5) * 60}>
              <div className="flex gap-4 border-t border-vls-border py-5">
                <span className="font-serif text-[16px] font-medium text-vls-red">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <p className="text-[15px] leading-relaxed text-vls-black">{outcome}</p>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal className="mt-14 bg-vls-near-black py-10 text-center">
          <DisputeJourneyVisual compact />
        </Reveal>
      </Container>
    </section>
  );
}
