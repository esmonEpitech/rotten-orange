"use client";

import { addRating, getbyMovieAndUser } from "@/lib/ratingApi";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

interface MovieTrailerProps {
  movieId: string;
  trailerUrl: string;
}

interface RatingData {
  score: number;
}

export default function MovieTrailer({
  movieId,
  trailerUrl,
}: MovieTrailerProps) {
  const router = useRouter();

  const [rating, setRating] = useState(0);
  const [hovered, setHovered] = useState(0);
  const [isRating, setIsRating] = useState(false);
  const [userId, setUserId] = useState<string | null>(null);

  useEffect(() => {
    const storedUser = sessionStorage.getItem("user");

    if (storedUser) {
      const user = JSON.parse(storedUser);
      setUserId(user._id);
    }
  }, []);

  const ratingEvaluation = async () => {
    if (!userId) {
      router.push("/auth/login");
      return;
    }

    try {
      await addRating(userId, movieId, rating);
      setIsRating(true);
    } catch (error) {
      console.log(error);
    }
  };

  const getbyMovieAndUserRating = async () => {
    try {
      if (!userId) return;

      const data: RatingData = await getbyMovieAndUser(movieId, userId);

      if (data) {
        setRating(data.score);
        setIsRating(true);
      } else {
        setIsRating(false);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (userId) {
      getbyMovieAndUserRating();
    }
  }, [movieId, userId]);

  return (
    <section className="py-12 px-8 bg-white">
      <p className="text-center text-2xl font-bold tracking-[0.15em] uppercase text-gray-400 mb-6">
        Trailer
      </p>

      <div className="relative max-w-3xl mx-auto rounded-2xl overflow-hidden border-[3px] border-[#EFA00B] shadow-[9px_9px_0px_#D65108] bg-[#1a0800] aspect-video flex items-center justify-center">
        {trailerUrl ? (
          <iframe
            src={`https://www.youtube.com/embed/${trailerUrl}`}
            title="Trailer"
            allowFullScreen
            className="w-full h-full"
          />
        ) : (
          <p className="text-white/50 text-sm">
            Trailer non disponible
          </p>
        )}
      </div>

      <div className="max-w-3xl mx-auto mt-8 flex items-center justify-between px-4 py-3 bg-gray-50 rounded-xl border border-gray-100">
        <div className="flex items-center gap-4">
          <div className="flex gap-1">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                onClick={() => setRating(star)}
                onMouseEnter={() => setHovered(star)}
                onMouseLeave={() => setHovered(0)}
                className="text-2xl"
              >
                <span
                  className={
                    (hovered || rating) >= star
                      ? "text-[#EFA00B]"
                      : "text-gray-300"
                  }
                >
                  ★
                </span>
              </button>
            ))}
          </div>

          <span className="text-xs text-gray-400">
            {rating > 0 ? `${rating} / 5` : "Votre note"}
          </span>
        </div>

        {!isRating && (
          <button
            onClick={ratingEvaluation}
            className="bg-[#591F0A] text-white text-xs font-bold px-5 py-2 rounded-full hover:opacity-85"
          >
            Noter
          </button>
        )}
      </div>
    </section>
  );
}