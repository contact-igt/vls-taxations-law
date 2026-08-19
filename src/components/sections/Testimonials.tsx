"use client";

import { useState, useRef } from "react";
import { Container } from "../ui/Container";
import { Reveal } from "../ui/Reveal";
import { TestimonialCard } from "../ui/TestimonialCard";
import { VideoModal } from "../ui/VideoModal";

/* -------------------------------------------------------------------------- */
/*  Testimonial data                                                           */
/*  Thumbnails: already in public/assets/vls/testimonials/                    */
/*  Videos:     Cloudinary MP4 URLs from VLS source project                   */
/* -------------------------------------------------------------------------- */

const TESTIMONIALS = [
  {
    name: "Akshara Prithashini",
    imgSrc: "/assets/vls/testimonials/testimonial-1.jpg",
    videoUrl:
      "https://res.cloudinary.com/dd3olj1ax/video/upload/v1761892348/vls-testimonal3_ajrnrk.mp4",
  },
  {
    name: "Our Students",
    imgSrc: "/assets/vls/testimonials/testimonial-2.png",
    videoUrl:
      "https://res.cloudinary.com/dd3olj1ax/video/upload/v1762343697/vls_testimonal4_fmdamk.mp4",
  },
  {
    name: "R. Jedidiah",
    imgSrc: "/assets/vls/testimonials/testimonial-3.png",
    videoUrl:
      "https://res.cloudinary.com/dd3olj1ax/video/upload/v1761891831/vls-testimoanl1_ddcvpb.mp4",
  },
];

/* -------------------------------------------------------------------------- */
/*  Arrow button                                                               */
/* -------------------------------------------------------------------------- */

function ArrowBtn({
  direction,
  onClick,
  disabled,
}: {
  direction: "prev" | "next";
  onClick: () => void;
  disabled: boolean;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      aria-label={direction === "prev" ? "Previous testimonial" : "Next testimonial"}
      className="flex h-10 w-10 shrink-0 items-center justify-center border border-vls-border bg-white text-vls-black transition-colors hover:bg-vls-card disabled:cursor-not-allowed disabled:opacity-30"
    >
      {direction === "prev" ? (
        <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor" aria-hidden="true">
          <path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z" />
        </svg>
      ) : (
        <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor" aria-hidden="true">
          <path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z" />
        </svg>
      )}
    </button>
  );
}

/* -------------------------------------------------------------------------- */
/*  Main section                                                               */
/* -------------------------------------------------------------------------- */

export function Testimonials() {
  const [selectedVideo, setSelectedVideo] = useState<string | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const trackRef = useRef<HTMLDivElement>(null);

  const total = TESTIMONIALS.length;

  function openModal(url: string) {
    setSelectedVideo(url);
  }

  function closeModal() {
    setSelectedVideo(null);
  }

  function scrollTo(index: number) {
    const track = trackRef.current;
    if (!track) return;
    const slide = track.children[index] as HTMLElement;
    if (!slide) return;
    track.scrollTo({ left: slide.offsetLeft, behavior: "smooth" });
    setCurrentIndex(index);
  }

  return (
    <>
      <section className="overflow-hidden bg-[#f9f2f2] py-20">
        <Container>
          {/* Heading */}
          <Reveal>
            <div className="text-center">
              <p className="text-[11px] font-extrabold uppercase tracking-[1.8px] text-vls-red">
                Student Voices
              </p>
              <h2 className="mt-3 font-serif text-[28px] font-medium leading-tight text-vls-black md:text-[34px]">
                Hear From Our{" "}
                <span className="italic text-vls-gold">Students</span>
              </h2>
              <p className="mx-auto mt-4 max-w-xl text-[15px] leading-relaxed text-vls-muted">
                Real voices from VLS Law Academy participants — advocates and law
                students who joined our practical legal training programmes.
              </p>
            </div>
          </Reveal>

          {/* Carousel track */}
          <Reveal delayMs={100}>
            <div className="relative mt-10">
              {/* Scrollable track */}
              <div
                ref={trackRef}
                className="flex gap-5 overflow-x-auto scroll-smooth pb-2 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
                style={{ scrollSnapType: "x mandatory" }}
                onScroll={(e) => {
                  const track = e.currentTarget;
                  const slideWidth = (track.children[0] as HTMLElement)?.offsetWidth ?? 1;
                  const idx = Math.round(track.scrollLeft / (slideWidth + 20));
                  setCurrentIndex(Math.max(0, Math.min(idx, total - 1)));
                }}
              >
                {TESTIMONIALS.map((item, i) => (
                  <div
                    key={item.videoUrl}
                    className="w-[85vw] shrink-0 sm:w-[calc(50%-10px)] lg:w-[calc(33.333%-14px)]"
                    style={{ scrollSnapAlign: "start" }}
                  >
                    <TestimonialCard
                      imageSrc={item.imgSrc}
                      name={item.name}
                      onPlay={() => openModal(item.videoUrl)}
                    />
                  </div>
                ))}
              </div>

              {/* Prev / Next arrows — shown on mobile/tablet, hidden on lg where all 3 are visible */}
              <div className="mt-5 flex items-center justify-center gap-3 lg:hidden">
                <ArrowBtn
                  direction="prev"
                  onClick={() => scrollTo(Math.max(0, currentIndex - 1))}
                  disabled={currentIndex === 0}
                />
                <span className="text-[13px] text-vls-muted">
                  {currentIndex + 1} / {total}
                </span>
                <ArrowBtn
                  direction="next"
                  onClick={() => scrollTo(Math.min(total - 1, currentIndex + 1))}
                  disabled={currentIndex === total - 1}
                />
              </div>

              {/* Dot indicators — mobile/tablet */}
              <div
                className="mt-4 flex justify-center gap-2 lg:hidden"
                role="tablist"
                aria-label="Testimonial slides"
              >
                {TESTIMONIALS.map((item, i) => (
                  <button
                    key={item.videoUrl}
                    type="button"
                    role="tab"
                    aria-selected={i === currentIndex}
                    aria-label={`Go to slide ${i + 1}`}
                    onClick={() => scrollTo(i)}
                    className={`h-2 transition-all duration-200 ${
                      i === currentIndex
                        ? "w-6 bg-vls-red"
                        : "w-2 bg-vls-border hover:bg-vls-muted"
                    }`}
                    style={{ borderRadius: 0 }}
                  />
                ))}
              </div>
            </div>
          </Reveal>

          {/* CTA */}
          <Reveal delayMs={150}>
            <div className="mt-12 flex justify-center">
              <a
                href="#waitlist"
                className="inline-flex h-12 items-center justify-center gap-2 bg-vls-red px-8 text-[14px] font-bold tracking-tight text-vls-white transition-colors duration-150 hover:bg-vls-red-dark"
              >
                Reserve Your Seat — ₹499
              </a>
            </div>
          </Reveal>
        </Container>
      </section>

      {/* Video modal — portal-like, rendered outside section flow */}
      {selectedVideo && (
        <VideoModal videoUrl={selectedVideo} onClose={closeModal} />
      )}
    </>
  );
}
