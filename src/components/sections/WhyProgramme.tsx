import { Container } from "../ui/Container";
import { Reveal } from "../ui/Reveal";
import { NumberedRow } from "../ui/NumberedRow";
import { SecondaryLink } from "../ui/Button";

const POINTS = [
  { n: "01", title: "Understand the framework" },
  { n: "02", title: "Understand the forum" },
  { n: "03", title: "Understand the remedy pathway" },
];

export function WhyProgramme() {
  return (
    <section className="bg-white py-20">
      <Container className="grid gap-10 md:grid-cols-2 md:gap-16">
        <Reveal>
          <h2 className="font-serif text-[30px] font-medium leading-tight text-vls-black md:text-[36px]">
            Taxation becomes practical when you understand where the dispute goes.
          </h2>
          <p className="mt-5 text-[16px] leading-relaxed text-vls-muted">
            Tax law is not practiced in isolation. A legal professional must understand the
            underlying framework, the authority handling the matter, the available appellate
            forum and the role of tribunals and courts.
          </p>
          <div className="mt-6">
            <SecondaryLink href="#curriculum">See what you&apos;ll learn ↗</SecondaryLink>
          </div>
        </Reveal>
        <Reveal delayMs={100}>
          <div>
            {POINTS.map((p) => (
              <NumberedRow key={p.n} number={p.n} title={p.title} />
            ))}
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
