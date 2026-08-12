"use client";

import Image from "next/image";
import { bungee } from "@/app/layout";
import MovieTrailer from "@/components/movies/MovieTrailer";
import CommentSection from "@/components/comments/CommentSection";
import { getMovieById } from "@/lib/movieAddApi";
import { use, useEffect, useState } from "react";

interface Movie {
  _id: string;
  title: string;
  description: string;
  genre: string[];
  releaseDate: string;
  productCompanies: string[];
  productionBudget: number;
  imagPath: string;
  trailerPath: string;
  tmdbId: number;
  criticScore?: number;
  producer: {
    name: string;
    profilePath: string | null;
  }[];
  director: {
    name: string;
    profilePath: string | null;
  }[];
  cast: string[];
}

export default function MovieDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const [movie, setMovie] = useState<Movie | null>(null);
  const { id } = use(params);
  useEffect(() => {
    const fetchMovie = async () => {
      try {
        const data = await getMovieById(id);
        setMovie(data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchMovie();
  }, [id]);

  if (!movie) {
    return <div>Ce film n'existe pas désolé</div>;
  }

  return (
    <div>
      <section className="w-full bg-gradient-to-br from-[#591F0A] to-[#D65108] text-white py-10 px-8">
        <div className="max-w-5xl mx-auto flex gap-20 justify-center items-center">

          <div className="relative flex-shrink-0 w-64 h-96 rounded-xl overflow-hidden border-2 border-white/20">
            <Image
              src={movie.imagPath}
              alt={movie.title}
              fill
              sizes="200px"
              className="object-cover"
            />
          </div>

          <div className="flex flex-col gap-3 flex-1">

            <span className="w-fit bg-black/30 border border-white/20 text-xs font-medium px-3 py-1 rounded">
              {movie.genre.join(", ")}
            </span>

            <h1 className={`${bungee.className} text-5xl leading-tight`}>
              {movie.title}
            </h1>

            <p className="text-sm leading-relaxed opacity-90 max-w-lg">
              {movie.description}
            </p>
          </div>
        </div>
      </section>

      <MovieTrailer movieId={id} trailerUrl={movie.trailerPath} />

      <CommentSection movieId={id} movieTitle={movie.title} />
    </div>
  );
}