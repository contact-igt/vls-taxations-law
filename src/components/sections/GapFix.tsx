import { Container } from "../ui/Container";
import { Reveal } from "../ui/Reveal";

const GAP_POINTS = [
  "No practical forum roadmap",
  "Uncertainty about assessment-level disputes",
  "Confusion about the appellate hierarchy",
  "Limited exposure to specialised tribunals",
  "Uncertainty about High Court tax proceedings",
];

const FIX_POINTS = [
  "Understand the taxation foundation",
  "Identify the relevant authority",
  "Understand assessment proceedings",
  "Understand appellate authorities",
  "Understand specialised tribunals",
  "Understand the High Court pathway",
];

export function GapFix() {
  return (
    <section className="bg-vls-off-white py-20">
      <Container className="grid gap-10 md:grid-cols-2 md:gap-12">
        <Reveal>
          <p className="text-[11px] font-extrabold uppercase tracking-[1.8px] text-vls-muted">
            The Gap
          </p>
          <h3 className="mt-3 font-serif text-[24px] font-medium leading-snug text-vls-black">
            Knowing taxation provisions is not the same as understanding tax practice.
          </h3>
          <ul className="mt-6 flex flex-col">
            {GAP_POINTS.map((point) => (
              <li
                key={point}
                className="flex items-start gap-3 border-t border-vls-border py-4 text-[15px] text-vls-muted first:border-t-0"
              >
                <span aria-hidden="true" className="mt-1 text-vls-red">
                  ×
                </span>
                {point}
              </li>
            ))}
          </ul>
        </Reveal>

        <Reveal delayMs={100}>
          <p className="eyebrow">The Fix</p>
          <h3 className="mt-3 font-serif text-[24px] font-medium leading-snug text-vls-black">
            A structured view of the complete taxation dispute pathway.
          </h3>
          <ul className="mt-6 flex flex-col">
            {FIX_POINTS.map((point) => (
              <li
                key={point}
                className="flex items-start gap-3 border-t border-vls-border py-4 text-[15px] text-vls-black first:border-t-0"
              >
                <span aria-hidden="true" className="mt-1 text-vls-red">
                  ✓
                </span>
                {point}
              </li>
            ))}
          </ul>
        </Reveal>
      </Container>
    </section>
  );
}
