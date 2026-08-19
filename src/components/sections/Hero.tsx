import { PrimaryLink, SecondaryLink } from "../ui/Button";
import { Container } from "../ui/Container";
import { WaitlistForm } from "../WaitlistForm";

export function Hero() {
  return (
    <section id="top" className="relative overflow-hidden bg-vls-near-black pb-16 pt-14 md:pb-20">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.06]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.4) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.4) 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute right-0 top-0 h-[440px] w-[440px] opacity-30"
        style={{
          background:
            "radial-gradient(440px at 72% 22%, rgba(223,185,120,0.25), transparent 70%)",
        }}
      />

      <Container className="relative grid gap-10 md:grid-cols-2 md:items-start md:gap-8">
        <div>
          <p className="text-[11px] font-extrabold uppercase tracking-[1.8px] text-vls-gold">
            VLS Law Academy · Practical Legal Training
          </p>

          <h1 className="mt-6 font-serif text-[44px] font-medium leading-[1.05] tracking-tight text-white sm:text-[56px] md:text-[64px]">
            Taxation Laws{" "}
            <span className="italic text-vls-gold">&amp; Practice</span>
          </h1>

          <p className="mt-6 max-w-xl text-[19px] font-medium leading-snug text-white">
            Understand the Law. Understand the Forum. Understand the Journey of the Dispute.
          </p>

          <p className="mt-5 max-w-xl text-[16px] leading-relaxed text-[#c8c8c4]">
            Taxation practice is not limited to knowing tax provisions. An advocate must
            understand the constitutional foundation of taxation, Direct and Indirect Taxes,
            the authorities involved in tax proceedings, appellate forums, specialised
            tribunals and remedies before the High Court. Taxation Laws &amp; Practice gives
            legal professionals a structured understanding of taxation from the perspective of
            legal practice and adjudication.
          </p>

          <ul className="mt-9 grid grid-cols-2 gap-x-6 gap-y-4 border-t border-white/10 pt-6 sm:grid-cols-4">
            <InfoChip label="Friday" value="28 Aug 2026" />
            <InfoChip label="3-Hour Live Class" value="6 – 9 PM" />
            <InfoChip label="Join from anywhere" value="Online" />
            <InfoChip label="Bilingual Session" value="Tamil + English" />
          </ul>

          <div className="mt-8 flex flex-wrap items-center gap-6">
            <PrimaryLink href="#waitlist">Reserve Your Seat — ₹499</PrimaryLink>
            <SecondaryLink href="#curriculum" dark>
              Explore the Curriculum ↓
            </SecondaryLink>
          </div>
        </div>

        <div id="waitlist" className="relative bg-white p-7 sm:p-8">
          <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-vls-red to-vls-gold" />
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="eyebrow">Registration Open</p>
              <h2 className="mt-2 font-serif text-[24px] font-medium text-vls-black">
                Reserve Your Seat
              </h2>
            </div>
            <p className="shrink-0 font-serif text-[28px] font-medium text-vls-red">₹499</p>
          </div>
          <p className="mt-2 text-[14px] leading-relaxed text-vls-muted">
            Taxation Laws &amp; Practice · 28 August 2026 · 6 PM – 9 PM · Online · Tamil &amp;
            English.
          </p>
          <div className="mt-6">
            <WaitlistForm
              formId="hero"
              submitLabel="Reserve Your Seat — ₹499"
              successHeading="Your seat is reserved."
              successBody="We'll send joining details for the 28 August 2026 live session shortly."
            />
          </div>
        </div>
      </Container>
    </section>
  );
}

function InfoChip({ label, value }: { label: string; value: string }) {
  return (
    <li>
      <p className="text-[15px] font-semibold text-white">{value}</p>
      <p className="mt-0.5 text-[12px] text-[#9a9a96]">{label}</p>
    </li>
  );
}
