"use client";

import MovieCard from "@/components/movies/MovieCard";
import { bungee } from "@/app/layout";
import { getMovies } from "@/lib/movieAddApi";
import { Suspense, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";

interface Movie {
  _id: string;
  title: string;
  imagPath: string;
  criticScore: number;
}

function MoviesContent() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const searchParams = useSearchParams();

  const search = searchParams.get("search")?.toLowerCase() || "";

  async function getMovesData() {
    const response = await getMovies();
    setMovies(response);
  }

  useEffect(() => {
    getMovesData();
  }, []);

  const filteredMovies = movies.filter((movie) =>
    movie.title.toLowerCase().includes(search)
  );

  return (
    <main className="px-10 py-8">
      <h1 className={`${bungee.className} text-4xl text-[#591F0A] mb-2`}>
        Tous les films
      </h1>

      <p className="text-sm text-gray-400 mb-8">
        {filteredMovies.length} films disponibles
      </p>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
        {filteredMovies.map((movie) => (
          <div key={movie._id} className="flex-shrink-0">
            <MovieCard {...movie} />
          </div>
        ))}
      </div>
    </main>
  );
}

export default function MoviesPage() {
  return (
    <Suspense fallback={<div>Chargement des films...</div>}>
      <MoviesContent />
    </Suspense>
  );
}