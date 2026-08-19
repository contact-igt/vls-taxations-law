import { Container } from "../ui/Container";
import { PrimaryLink } from "../ui/Button";

export function EarlyCtaBand() {
  return (
    <section className="bg-vls-near-black py-6">
      <Container className="flex flex-wrap items-center justify-between gap-5">
        <div>
          <p className="text-[11px] font-extrabold uppercase tracking-[1.6px] text-vls-gold">
            Taxation Laws &amp; Practice
          </p>
          <p className="mt-1.5 text-[14px] text-[#c8c8c4]">
            28 August 2026 · 6 PM–9 PM · Online &nbsp;·&nbsp; Tamil + English · 3 Hours &nbsp;·
            &nbsp;
            <span className="font-semibold text-white">₹499</span>
          </p>
        </div>
        <PrimaryLink href="#waitlist">Reserve Your Seat</PrimaryLink>
      </Container>
    </section>
  );
}
