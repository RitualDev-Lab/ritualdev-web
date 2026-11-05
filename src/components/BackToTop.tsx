"use client";

import { useEffect, useState } from "react";
import { ArrowUp } from "lucide-react";

export default function BackToTop() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 320) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    // Check initial scroll position
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <button
      type="button"
      onClick={scrollToTop}
      aria-label="Scroll back to top"
      title="Back to top"
      className={`fixed bottom-6 right-6 sm:bottom-8 sm:right-8 z-40 flex items-center gap-2 px-3.5 py-2.5 rounded-full bg-[#090D17]/90 backdrop-blur-md border border-slate-700/80 hover:border-purple-500/80 text-slate-300 hover:text-white shadow-2xl shadow-black/80 text-xs font-mono transition-all duration-300 ease-out group ${
        isVisible
          ? "opacity-100 translate-y-0 pointer-events-auto scale-100"
          : "opacity-0 translate-y-4 pointer-events-none scale-95"
      }`}
    >
      <div className="p-1 rounded-full bg-purple-500/10 group-hover:bg-purple-500/20 text-purple-400 group-hover:text-purple-300 transition-colors">
        <ArrowUp className="w-3.5 h-3.5 group-hover:-translate-y-0.5 transition-transform" />
      </div>
      <span className="hidden sm:inline font-semibold tracking-wide pr-1">Top</span>
    </button>
  );
}
