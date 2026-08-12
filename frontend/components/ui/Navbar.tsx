"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";

interface NavbarProps {
  userInitial?: string;
  onFilterChange?: (filter: string) => void;
}

const FILTER_OPTIONS = ["Genre", "Date", "Director"];

interface User {
  _id: string;
  username: string;
  profile?: string;
}

export default function Navbar({
  userInitial = "E",
  onFilterChange,
}: NavbarProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [searchQuery, setSearchQuery] = useState("");
  const [filterOpen, setFilterOpen] = useState(false);
  const [activeFilter, setActiveFilter] = useState<string | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const syncAuth = () => {
      const storedUser = sessionStorage.getItem("user");
      if (storedUser) {
        setUser(JSON.parse(storedUser));
        setIsLoggedIn(true);
      } else {
        setUser(null);
        setIsLoggedIn(false);
      }
    };

    syncAuth();
    window.addEventListener("auth-change", syncAuth);
    return () => window.removeEventListener("auth-change", syncAuth);
  }, []);

  useEffect(() => {
    const q = searchParams.get("search") || "";
    setSearchQuery(q);
  }, [searchParams]);

  const handleSearch = (value: string) => {
    setSearchQuery(value);

    const params = new URLSearchParams(searchParams.toString());

    if (value) {
      params.set("search", value);
    } else {
      params.delete("search");
    }

    router.replace(`/allmovies?${params.toString()}`);
  };

  const handleFilterSelect = (filter: string) => {
    setActiveFilter(filter);
    setFilterOpen(false);
    onFilterChange?.(filter);
  };

  return (
    <nav className="w-full flex items-center px-10 h-16 bg-white border-b border-orange-100 sticky top-0 z-50">
      <Link href="/" className="flex-shrink-0">
        <Image
          src="/rotten_logo.png"
          alt="Rotten Oranges"
          width={140}
          height={44}
          className="object-contain"
          priority
        />
      </Link>

    {/* LE composant de recherche */}
      <div className="flex-1 max-w-2xl mx-auto">
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => handleSearch(e.target.value)}
          placeholder="search..."
          className="w-full h-10 px-5 border-2 border-[#EFA00B] rounded-full text-sm text-[#591F0A] outline-none focus:border-[#D65108] transition-all"
        />
      </div>


      <div className="flex items-center gap-5 flex-shrink-0">
        <div className="relative">
          <button
            onClick={() => setFilterOpen(!filterOpen)}
            className="text-sm font-semibold text-[#D65108]"
          >
            {activeFilter ? `Filter: ${activeFilter}` : "Filter By"}
          </button>

          {filterOpen && (
            <div className="absolute right-0 top-[calc(100%+10px)] bg-white border rounded-xl shadow-lg min-w-[130px] z-50">
              {FILTER_OPTIONS.map((option) => (
                <button
                  key={option}
                  onClick={() => handleFilterSelect(option)}
                  className={`w-full px-4 py-2 text-left text-sm ${
                    activeFilter === option ? "bg-orange-50 text-[#D65108]" : ""
                  }`}
                >
                  {option}
                </button>
              ))}
            </div>
          )}
        </div>


        {isLoggedIn ? (
          <Link href="/user/profile">
            <div className="w-10 h-10 rounded-full bg-[#EFA00B] flex items-center justify-center text-white text-2xl font-bold overflow-hidden">
              {user?.profile ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={`http://localhost:5000/uploads/${user.profile}`}
                  alt="profile"
                  className="w-full h-full object-cover"
                />
              ) : (
                user?.username?.charAt(0).toUpperCase()
              )}
            </div>
          </Link>
        ) : (
          <Link
            href="/auth/login"
            className="px-5 py-2 rounded-full border-2 border-[#EFA00B] text-[#EFA00B] text-sm font-semibold"
          >
            Login
          </Link>
        )}
      </div>
    </nav>
  );
}
