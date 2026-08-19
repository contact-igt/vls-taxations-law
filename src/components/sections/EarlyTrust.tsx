import Image from "next/image";
import { Container } from "../ui/Container";
import { Reveal } from "../ui/Reveal";
import { Eyebrow } from "../ui/Eyebrow";
import { SecondaryLink } from "../ui/Button";

const TRUST_ROW = ["Direct Tax", "Indirect Tax", "GST", "Tax Adjudication"];

const PHOTOS = [
  {
    src: "/assets/vls/classroom/classroom-faculty-teaching.jpg",
    alt: "Dr. Sivakumar actively teaching a VLS Law Academy class",
  },
  {
    src: "/assets/vls/classroom/classroom-students-notes.jpg",
    alt: "VLS Law Academy students engaged and taking notes in class",
  },
];

export function EarlyTrust() {
  return (
    <section className="bg-white py-16 md:py-20">
      <Container>
        <Reveal className="max-w-2xl">
          <Eyebrow>Practical Legal Training</Eyebrow>
          <h2 className="mt-3 font-serif text-[28px] font-medium leading-tight text-vls-black md:text-[34px]">
            Learn Taxation Beyond the Textbook.
          </h2>
          <p className="mt-4 text-[16px] leading-relaxed text-vls-muted">
            Tax practice is not only about knowing the provision. It is about understanding the
            authority, the appellate forum, the tribunal and the legal pathway a dispute can
            take.
          </p>
          <p className="mt-3 text-[16px] leading-relaxed text-vls-muted">
            At VLS Law Academy, the focus is on connecting legal concepts with the way advocates
            encounter them in practice.
          </p>

          <ul className="mt-6 flex flex-wrap items-center divide-x divide-vls-border border-y border-vls-border py-3">
            {TRUST_ROW.map((label) => (
              <li
                key={label}
                className="px-5 py-1 text-[12px] font-bold uppercase tracking-[1.2px] text-vls-black first:pl-0 last:pr-0"
              >
                {label}
              </li>
            ))}
          </ul>
        </Reveal>

        <Reveal delayMs={80} className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5">
          {PHOTOS.map((photo) => (
            <div key={photo.src} className="aspect-[4/3] overflow-hidden">
              <Image
                src={photo.src}
                alt={photo.alt}
                width={2568}
                height={1444}
                className="h-full w-full object-cover"
                sizes="(min-width: 640px) 50vw, 100vw"
                priority
              />
            </div>
          ))}
        </Reveal>

        <div className="mt-8">
          <SecondaryLink href="#curriculum">Explore What You&apos;ll Learn ↓</SecondaryLink>
        </div>
      </Container>
    </section>
  );
}
