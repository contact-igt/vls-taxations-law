"use client";

import Image from "next/image";

interface TestimonialCardProps {
  imageSrc: string;
  name?: string;
  onPlay: () => void;
}

export function TestimonialCard({ imageSrc, name, onPlay }: TestimonialCardProps) {
  return (
    <button
      type="button"
      onClick={onPlay}
      aria-label={`Play ${name ? name + "'s" : "student"} testimonial video`}
      className="group relative block h-[480px] w-full overflow-hidden shadow-[0_4px_20px_rgba(0,0,0,0.18)] transition-transform duration-300 ease-out hover:scale-[1.02] focus-visible:outline focus-visible:outline-2 focus-visible:outline-vls-red sm:h-[500px]"
    >
      {/* Thumbnail */}
      <Image
        src={imageSrc}
        alt={name ? `${name} — VLS student testimonial` : "VLS student testimonial"}
        fill
        sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 90vw"
        className="object-cover"
      />

      {/* Dark gradient overlay — bottom 90% */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-0 h-[90%] bg-gradient-to-t from-black/82 to-transparent"
      />

      {/* Play button — SVG circle, immune to global border-radius:0 */}
      <span aria-hidden="true" className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 transition-transform duration-200 group-hover:scale-110">
        <svg
          width="72"
          height="72"
          viewBox="0 0 72 72"
          fill="none"
        >
          <circle cx="36" cy="36" r="36" fill="white" />
          <path d="M29 22l22 14-22 14V22z" fill="#a51f24" />
        </svg>
      </span>

      {/* Student name badge — bottom left */}
      {name && (
        <span className="absolute bottom-5 left-5 text-[13px] font-semibold text-white drop-shadow">
          {name}
        </span>
      )}
    </button>
  );
}
