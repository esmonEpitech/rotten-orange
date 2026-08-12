"use client";

import { useRef } from "react";
import MovieCard from "./MovieCard";
import Link from "next/link";

interface Movie {
  _id: string;
  title: string;
  imagPath: string;
  criticScore: number;
}

interface MovieListProps {
  title: string;
  movies: Movie[];
  viewLink?: string;
}

export default function MovieList({ title, movies, viewLink }: MovieListProps) {
  const rowRef = useRef<HTMLDivElement | null>(null);

  const scroll = (dir: "left" | "right") => {
    if (!rowRef.current) return;

    rowRef.current.scrollBy({
      left: dir === "right" ? 320 : -320,
      behavior: "smooth",
    });
  };

  return (
    <section className="py-6">
      <div className="flex items-center justify-between px-10 mb-3">
        <h2 className="text-lg font-bold text-[#591F0A]">{title}</h2>

        {viewLink && (
          <Link
            href={viewLink}
            className="text-sm text-[#D65108] font-semibold hover:underline"
          >
            VIEW
          </Link>
        )}
      </div>

      <div className="relative">
        <button
          onClick={() => scroll("left")}
          className="absolute left-2 top-1/2 -translate-y-1/2 z-10 w-8 h-8 rounded-full bg-white border border-gray-200 flex items-center justify-center shadow-sm hover:bg-gray-50 transition-colors"
          aria-label="Précédent"
        >
          ‹
        </button>

        <button
          onClick={() => scroll("right")}
          className="absolute right-2 top-1/2 -translate-y-1/2 z-10 w-8 h-8 rounded-full bg-white border border-gray-200 flex items-center justify-center shadow-sm hover:bg-gray-50 transition-colors"
          aria-label="Suivant"
        >
          ›
        </button>

        <div
          ref={rowRef}
          className="flex gap-3 mx-3 justify-start overflow-x-auto scroll-smooth px-10 pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          {movies.map((movie) => (
            <div key={movie._id} className="flex-shrink-0">
              <MovieCard {...movie} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}