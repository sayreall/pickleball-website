"use client";

import { useEffect, useState, useCallback } from "react";

export default function GalleryGrid({ images }) {
  const [activeIndex, setActiveIndex] = useState(null);
  const isOpen = activeIndex !== null;

  const close = useCallback(() => setActiveIndex(null), []);

  const next = useCallback(() => {
    setActiveIndex((i) => (i === null ? null : (i + 1) % images.length));
  }, [images.length]);

  const prev = useCallback(() => {
    setActiveIndex((i) =>
      i === null ? null : (i - 1 + images.length) % images.length,
    );
  }, [images.length]);

  useEffect(() => {
    if (!isOpen) return;

    const handleKey = (e) => {
      if (e.key === "Escape") close();
      else if (e.key === "ArrowRight") next();
      else if (e.key === "ArrowLeft") prev();
    };

    document.addEventListener("keydown", handleKey);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleKey);
      document.body.style.overflow = "";
    };
  }, [isOpen, close, next, prev]);

  if (!images || images.length === 0) return null;

  const active = isOpen ? images[activeIndex] : null;

  return (
    <>
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
        {images.map((image, index) => (
          <button
            key={image.id}
            type="button"
            onClick={() => setActiveIndex(index)}
            className="group relative aspect-square overflow-hidden rounded-xl bg-white/5 ring-1 ring-white/10 transition hover:ring-lime focus:outline-none focus:ring-2 focus:ring-lime"
            aria-label={image.title || `Open photo ${index + 1}`}
          >
            <img
              src={image.image_url || "/placeholder.svg"}
              alt={image.title || "Gallery photo"}
              className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
              loading="lazy"
            />
            {(image.title || image.description) && (
              <div className="absolute inset-x-0 bottom-0 translate-y-full bg-gradient-to-t from-navy/95 via-navy/70 to-transparent p-3 text-left transition-transform duration-300 group-hover:translate-y-0">
                {image.title && (
                  <div className="text-sm font-semibold text-white">
                    {image.title}
                  </div>
                )}
                {image.description && (
                  <div className="mt-0.5 line-clamp-2 text-xs text-white/70">
                    {image.description}
                  </div>
                )}
              </div>
            )}
          </button>
        ))}
      </div>

      {isOpen && active && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4"
          role="dialog"
          aria-modal="true"
          onClick={close}
        >
          <button
            type="button"
            onClick={close}
            className="absolute right-4 top-4 rounded-full bg-white/10 p-2 text-white transition hover:bg-white/20"
            aria-label="Close"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>

          {images.length > 1 && (
            <>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  prev();
                }}
                className="absolute left-4 top-1/2 -translate-y-1/2 rounded-full bg-white/10 p-3 text-white transition hover:bg-white/20"
                aria-label="Previous photo"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <polyline points="15 18 9 12 15 6" />
                </svg>
              </button>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  next();
                }}
                className="absolute right-4 top-1/2 -translate-y-1/2 rounded-full bg-white/10 p-3 text-white transition hover:bg-white/20"
                aria-label="Next photo"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <polyline points="9 18 15 12 9 6" />
                </svg>
              </button>
            </>
          )}

          <div
            className="relative flex max-h-full max-w-5xl flex-col items-center"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={active.image_url || "/placeholder.svg"}
              alt={active.title || "Gallery photo"}
              className="max-h-[80vh] w-auto rounded-xl object-contain"
            />
            {(active.title || active.description) && (
              <div className="mt-4 max-w-2xl text-center">
                {active.title && (
                  <div className="text-lg font-semibold text-white">
                    {active.title}
                  </div>
                )}
                {active.description && (
                  <div className="mt-1 text-sm text-white/70">
                    {active.description}
                  </div>
                )}
              </div>
            )}
            <div className="mt-3 text-xs text-white/50">
              {activeIndex + 1} / {images.length}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
