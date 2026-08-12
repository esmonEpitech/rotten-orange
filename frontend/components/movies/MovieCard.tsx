"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import Image from "next/image";
import { BsFillHeartFill } from "react-icons/bs";
import { FaPlay, FaStar } from "react-icons/fa6";
import { addFavorit, getFavorits } from "@/lib/favoriesApi";
import { useRouter } from "next/navigation";
import { calculateAverageRatingForMovie } from "@/lib/ratingApi";

interface MovieCardProps {
  _id: string;
  title: string;
  imagPath: string;
  criticScore: number;
  isInWatchlist?: boolean;
  onWatchlistToggle?: (id: string) => void;
}

interface Favoris {
  _id: string;
  userId: string;
  movieId: string;
}

export default function MovieCard({
  _id,
  title,
  imagPath,
  criticScore,
  isInWatchlist = false,
  onWatchlistToggle,
}: MovieCardProps) {
  const router = useRouter();

  const [inWatchlist, setInWatchlist] = useState(isInWatchlist);
  const [favoris, setFavoris] = useState<Favoris[]>([]);
  const [userId, setUserId] = useState<string | null>(null);
  const [averageRating, setAverageRating] = useState<number>(0);
  const [loadingRating, setLoadingRating] = useState(true);

  useEffect(() => {
    const storedUser = sessionStorage.getItem("user");

    if (storedUser) {
      const user = JSON.parse(storedUser);
      setUserId(user._id);
    }
  }, []);

  useEffect(() => {
    if (userId) {
      userFavorit();
    }
  }, [userId]);

  const userFavorit = async () => {
    if (!userId) return;

    try {
      const favorits = await getFavorits(userId);
      setFavoris(favorits);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const loadRating = async () => {
      try {
        setLoadingRating(true);

        const rating = await calculateAverageRatingForMovie(_id);
        setAverageRating(rating ?? 0);
      } catch (error) {
        console.log(error);
        setAverageRating(0);
      } finally {
        setLoadingRating(false);
      }
    };

    loadRating();
  }, [_id]);

  const handleWatchlist = async () => {
    if (!userId) {
      router.push("/auth/login");
      return;
    }

    setInWatchlist(!inWatchlist);
    onWatchlistToggle?.(_id);

    try {
      await addFavorit(userId, _id);
      await userFavorit();
    } catch (error) {
      console.log(error);
    }
  };

  const isFavorite = favoris.some((fav) => fav.movieId === _id);

  return (
    <div className="w-40 rounded-xl overflow-hidden border border-orange-100 bg-white flex flex-col">
      <Link href={`/movies/${_id}`}>
        <div className="relative w-full h-52">
          <Image src={imagPath} alt={title} fill className="object-cover" />

          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-9 h-9 rounded-full bg-black/50 flex items-center justify-center">
              <FaPlay className="text-orange-500" />
            </div>
          </div>
        </div>
      </Link>

      <div className="flex items-center gap-2 px-2.5 pt-2 pb-1">
      <FaStar className="text-yellow-400 text-base" />
        <span className="text-sm font-semibold text-[#591F0A]">
          {loadingRating ? "..." : `${averageRating.toFixed(1)}`}
        </span>
      </div>

      <p className="text-xs font-medium text-gray-800 px-2.5 pb-2">{title}</p>

      <button
        onClick={handleWatchlist}
        className="mx-2.5 mb-2.5 border border-gray-300 rounded-full py-1.5 text-xs font-semibold flex items-center justify-center gap-1.5 hover:bg-gray-50 transition-colors"
      >
        {isFavorite ? "✓ AJOUTÉ" : "+ FAVORITS LIST"}
      </button>
    </div>
  );
}
