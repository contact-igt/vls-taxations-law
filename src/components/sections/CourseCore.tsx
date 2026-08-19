import { Container } from "../ui/Container";
import { Reveal } from "../ui/Reveal";

export function CourseCore() {
  return (
    <section className="bg-white py-20">
      <Container className="max-w-3xl text-center">
        <Reveal>
          <p className="text-[11px] font-extrabold uppercase tracking-[1.8px] text-vls-red">
            Core / 01 · Course core message
          </p>
          <h2 className="mt-4 font-serif text-[30px] font-medium leading-tight text-vls-black md:text-[36px]">
            Tax practice begins where the law meets the forum.
          </h2>
          <p className="mt-5 text-[16px] leading-relaxed text-vls-muted">
            Understanding taxation practice requires more than knowing provisions. An advocate
            must understand where a matter begins, which authority is dealing with it, what
            appellate forum is available and how the dispute progresses through tribunals and
            courts.
          </p>
        </Reveal>
      </Container>
    </section>
  );
}
