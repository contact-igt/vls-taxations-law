import { Reveal } from "../ui/Reveal";
import { Eyebrow } from "../ui/Eyebrow";
import { Container } from "../ui/Container";

export function CourseObjective() {
  return (
    <section id="why-this-course" className="bg-white py-20">
      <Container className="max-w-3xl">
        <Reveal>
          <Eyebrow>Course Objective</Eyebrow>
          <h2 className="mt-3 font-serif text-[32px] font-medium leading-tight text-vls-black md:text-[40px]">
            Learn Taxation as an Area of Legal Practice.
          </h2>
          <p className="mt-5 text-[17px] leading-relaxed text-vls-muted">
            The programme begins by building the constitutional and institutional foundations
            of Direct and Indirect Taxation and then moves into the practical structure of
            assessment disputes, appeals, specialised tribunals and High Court tax practice.
          </p>
          <p className="mt-4 text-[17px] leading-relaxed text-vls-muted">
            The objective is not merely to know what the provision says.
          </p>
          <p className="mt-4 font-serif text-[20px] font-medium italic text-vls-black">
            The practical question is: when a taxation dispute arises, where does the matter go
            next?
          </p>
        </Reveal>
      </Container>
    </section>
  );
}
