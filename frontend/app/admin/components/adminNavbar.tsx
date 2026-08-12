"use client";

import { useState } from "react";
// import Link from "next/link";

interface NavbarProps {
  userInitial?: string;
  nom?: string;
  isLoggedIn?: boolean;
  onSearch?: (query: string) => void;
  onFilterChange?: (filter: string) => void;
  onMenuToggle?: () => void;
}

const FILTER_OPTIONS = ["Genre", "Date", "Director"];

export default function AdminNavbar({
  nom = "Mory",
  userInitial = nom.charAt(0),
  isLoggedIn = true,
  onSearch,
  onFilterChange,
  onMenuToggle,
}: NavbarProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [filterOpen, setFilterOpen] = useState(false);
  const [activeFilter, setActiveFilter] = useState<string | null>(null);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    onSearch?.(e.target.value);
  };

  const handleFilterSelect = (filter: string) => {
    setActiveFilter(filter);
    setFilterOpen(false);
    onFilterChange?.(filter);
  };

  return (
    <nav className="w-full flex items-center justify-between px-4 sm:px-10 h-16 bg-white border-b border-blue-100 sticky top-0 z-40 gap-2 sm:gap-5">
      
      <button
        onClick={onMenuToggle}
        type="button"
        className="p-2 rounded-lg text-[#0047AB] hover:bg-blue-50 focus:outline-none lg:hidden flex-shrink-0"
        aria-label="Ouvrir le menu"
      >
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      </button>

      <div className="flex-1 max-w-xl mx-2 sm:mx-auto">
        <input
          type="text"
          value={searchQuery}
          onChange={handleSearch}
          placeholder="search..."
          className="w-full h-10 px-4 sm:px-5 border-2 border-[#0047AB] rounded-full text-xs sm:text-sm text-[#0047AB] placeholder-[#0047AB] outline-none focus:border-[#000080] focus:ring-2 focus:ring-[#0047AB]/20 transition-all duration-200"
        />
      </div>

      <div className="flex items-center gap-3 sm:gap-5 flex-shrink-0">
        <div className="relative">
          <button
            onClick={() => setFilterOpen(!filterOpen)}
            className="flex items-center gap-1 text-xs sm:text-sm font-semibold text-[#0047AB] hover:text-[#00B7EB] transition-colors"
          >
            <span className="whitespace-nowrap">{activeFilter ? `${activeFilter}` : "Filter"}</span>
            <svg className={`w-3 h-3 transition-transform duration-200 ${filterOpen ? "rotate-180" : ""}`} fill="none" viewBox="0 0 14 14" stroke="currentColor" strokeWidth={1.8}>
              <polyline points="2,4.5 7,9.5 12,4.5" />
            </svg>
          </button>

          {filterOpen && (
            <div className="absolute right-0 top-[calc(100%+10px)] bg-white border border-[#0047AB] rounded-xl shadow-lg min-w-[130px] overflow-hidden z-50">
              {FILTER_OPTIONS.map((option) => (
                <button
                  key={option}
                  onClick={() => handleFilterSelect(option)}
                  className={`w-full px-4 py-2.5 text-left text-sm text-[#0047AB] hover:bg-blue-50 hover:text-[#00B7EB] transition-colors ${activeFilter === option ? "bg-blue-50 text-[#00B7EB] font-semibold" : ""}`}
                >
                  {option}
                </button>
              ))}
            </div>
          )}
        </div>

        {isLoggedIn && (
          <button className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-[#0047AB] hover:bg-[#00B7EB] text-white font-bold text-sm sm:text-base transition-all duration-150 hover:scale-105 flex-shrink-0">
            {userInitial.toUpperCase()}
          </button>
        )}
      </div>
    </nav>
  );
}