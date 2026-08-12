"use client";
import { aso } from "@/app/layout"

export default function Footer() {
  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  return (
    <footer className="bg-[#EFA00B] px-10 pt-8 pb-6">
      
      <p className={` ${aso.className} text-[#2a0d00] font-black text-7xl tracking-tight leading-none mb-7`}>
        RottenOranges.com
      </p>


      <div className="flex items-end justify-between flex-wrap gap-6">

  
        <nav className="flex flex-col gap-1.5">
          {["Instagram", "LinkedIn", "X", "GitHub"].map((link) => (
            <a
              key={link}
              href="#"
              className="text-[#2a0d00] text-xs font-bold uppercase tracking-widest hover:opacity-60 transition-opacity"
            >
              {link}
            </a>
          ))}
        </nav>

        <div className="flex flex-col items-end gap-3">
          <button
            onClick={scrollToTop}
            className="bg-[#591F0A] text-[#EFA00B] text-xs font-bold uppercase tracking-widest px-4 py-2 rounded-sm hover:opacity-85 transition-opacity"
          >
            Top 
          </button>
          <p className="text-[#2a0d00] text-xs font-semibold uppercase tracking-wide opacity-75 text-right leading-relaxed">
            &copy;2026 Rotten Oranges /<br />All rights reserved
          </p>
          <p className="text-[#2a0d00] text-xs opacity-60 text-right">
            Built with Love by EEME, Esmon, Eze, Mory , Emmanuel
          </p>
        </div>

      </div>
    </footer>
  );
}