"use client";

import HeroSection from "@/components/ui/HeroSection";
import MovieList from "@/components/movies/MovieList";
import { MOCK_MOVIES } from "@/lib/mockMovies";
import { findTopRatings, getLastMovies, getMovies } from "@/lib/movieAddApi";
import { useEffect, useState } from "react";

export default function HomePage() {

  const [movies, setMovies] = useState([]);
  const [lastMovies, setLastMovies] = useState([]);
  const [topRatings, setTopRatings] = useState([]);

  async function getMovesData() {
    const response = await getMovies();
    setMovies(response);
  }
  async function getLastMovesData() {
    const response = await getLastMovies();
    setLastMovies(response);
    console.log(response);
  }

  async function getTopRatings() {
    const response = await findTopRatings();
    setTopRatings(response);
  }
  useEffect(() => {
    getMovesData();
    getLastMovesData();
    getTopRatings();
  }, []);
  return (
    <main>
      <HeroSection />
      <MovieList title="Nouveaux films" movies={lastMovies} viewLink="/allmovies" />
      <MovieList title="Les mieux notés"   movies={topRatings} viewLink="/allmovies" />
      <MovieList title="Films à l'affiche" movies={movies} viewLink="/allmovies" />
      {/* <MovieList title="Les mieux notés"   movies={movies} /> */}
    </main>
  );
}