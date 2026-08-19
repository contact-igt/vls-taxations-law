import { Container } from "../ui/Container";
import { Reveal } from "../ui/Reveal";

const ITEMS = [
  {
    n: "01",
    title: "Understand the Tax Framework",
    body: "Direct Tax, Indirect Tax, GST and constitutional taxation.",
  },
  {
    n: "02",
    title: "Identify the Authority",
    body: "Understand where the matter is currently being dealt with.",
  },
  {
    n: "03",
    title: "Understand the Appeal",
    body: "Identify the next appellate stage.",
  },
  {
    n: "04",
    title: "Understand the Tribunal",
    body: "Know the role of ITAT, CESTAT and GST appellate forums.",
  },
  {
    n: "05",
    title: "Understand the Court Pathway",
    body: "Recognise the role of High Court proceedings in appropriate taxation matters.",
  },
];

export function PracticalFramework() {
  return (
    <section className="bg-vls-off-white py-20">
      <Container>
        <Reveal className="max-w-2xl">
          <h2 className="font-serif text-[32px] font-medium leading-tight text-vls-black md:text-[40px]">
            Every Tax Dispute Has a Journey.
          </h2>
        </Reveal>

        <div className="mt-10 grid gap-x-10 md:grid-cols-2">
          {ITEMS.map((item, i) => (
            <Reveal key={item.n} delayMs={i * 70}>
              <div className="flex gap-5 border-t border-vls-border py-6">
                <span className="font-serif text-[20px] font-medium text-vls-red">
                  {item.n}
                </span>
                <div>
                  <p className="text-[16px] font-semibold text-vls-black">{item.title}</p>
                  <p className="mt-1.5 text-[15px] leading-relaxed text-vls-muted">
                    {item.body}
                  </p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
