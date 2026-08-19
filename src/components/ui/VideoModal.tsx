"use client";

import { useEffect, useRef } from "react";

interface VideoModalProps {
  videoUrl: string | null;
  onClose: () => void;
}

export function VideoModal({ videoUrl, onClose }: VideoModalProps) {
  const videoRef = useRef<HTMLVideoElement>(null);

  // Lock body scroll while open
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  // Keyboard: Escape to close
  useEffect(() => {
    function handleKey(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [onClose]);

  if (!videoUrl) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Student testimonial video"
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-3xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <button
          type="button"
          onClick={onClose}
          aria-label="Close video"
          className="absolute -right-2 -top-10 flex h-9 w-9 items-center justify-center text-white/80 transition-colors hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-white"
        >
          <svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor" aria-hidden="true">
            <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" />
          </svg>
        </button>

        {/* Video player */}
        <video
          ref={videoRef}
          src={videoUrl}
          controls
          autoPlay
          playsInline
          className="h-auto w-full bg-black"
          style={{ maxHeight: "75vh" }}
        >
          Your browser does not support the video tag.
        </video>
      </div>
    </div>
  );
}
