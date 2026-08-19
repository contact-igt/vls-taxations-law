import { Container } from "../ui/Container";
import { Reveal } from "../ui/Reveal";
import { WaitlistForm } from "../WaitlistForm";
import { DisputeJourneyVisual } from "../ui/DisputeJourneyVisual";

export function FinalCta() {
  return (
    <section className="bg-vls-near-black py-20">
      <Container className="grid gap-10 md:grid-cols-2 md:gap-16">
        <Reveal>
          <p className="text-[11px] font-extrabold uppercase tracking-[1.8px] text-vls-gold">
            Early Access Enrollment
          </p>
          <h2 className="mt-4 font-serif text-[34px] font-medium leading-tight text-white md:text-[42px]">
            When a Tax Dispute Comes to You, Know Where It Goes Next.
          </h2>
          <p className="mt-5 text-[16px] leading-relaxed text-[#c8c8c4]">
            Understand the taxation framework. Understand the authorities. Understand the
            appellate forums. Understand the tribunals. Understand the High Court pathway.
          </p>
          <div className="mt-8 border-t border-white/10 pt-8">
            <DisputeJourneyVisual compact />
          </div>
        </Reveal>

        <Reveal delayMs={100} className="bg-white p-7 sm:p-8">
          <WaitlistForm formId="final" />
        </Reveal>
      </Container>
    </section>
  );
}
