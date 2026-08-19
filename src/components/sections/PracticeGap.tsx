import { Reveal } from "../ui/Reveal";
import { Eyebrow } from "../ui/Eyebrow";
import { Container } from "../ui/Container";

const CARDS = [
  {
    n: "01",
    label: "The Foundation",
    q: "Where does the power to tax come from?",
    a: "Understand taxation within India's constitutional and public-finance framework.",
  },
  {
    n: "02",
    label: "The Authority",
    q: "Where does a tax dispute begin?",
    a: "Understand assessment-related disputes under Income Tax and GST laws.",
  },
  {
    n: "03",
    label: "The Appeal",
    q: "Where does the matter go next?",
    a: "Understand Commissioner-level appellate proceedings and specialised tax tribunals.",
  },
  {
    n: "04",
    label: "The Court",
    q: "When does the High Court become relevant?",
    a: "Understand Writ and Writ Appeal proceedings involving taxation matters.",
  },
];

export function PracticeGap() {
  return (
    <section className="bg-vls-off-white py-20">
      <Container>
        <Reveal className="max-w-2xl">
          <Eyebrow>The Practice Gap</Eyebrow>
          <h2 className="mt-3 font-serif text-[32px] font-medium leading-tight text-vls-black md:text-[40px]">
            Studying Taxation Law is one thing.
            <br />
            Handling a Tax Dispute is another.
          </h2>
          <p className="mt-5 text-[17px] leading-relaxed text-vls-muted">
            A taxation dispute does not remain within the pages of an Act. It begins before a
            tax authority, may move into an appellate proceeding, can reach a specialised
            tribunal and, in appropriate cases, proceed before the High Court.
          </p>
        </Reveal>

        <div className="mt-12 grid gap-x-10 md:grid-cols-2">
          {CARDS.map((card, i) => (
            <Reveal key={card.n} delayMs={i * 80}>
              <div className="flex gap-5 border-t border-vls-border py-6">
                <span className="font-serif text-[20px] font-medium text-vls-red">
                  {card.n}
                </span>
                <div>
                  <p className="text-[11px] font-extrabold uppercase tracking-[1.4px] text-vls-red">
                    {card.label}
                  </p>
                  <p className="mt-2 font-serif text-[18px] font-medium text-vls-black">
                    {card.q}
                  </p>
                  <p className="mt-2 text-[15px] leading-relaxed text-vls-muted">{card.a}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
