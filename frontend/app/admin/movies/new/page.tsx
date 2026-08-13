"use client";

import { searchMovieByTitle, addMovie as addMovieApi } from "@/lib/movieAddApi";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

interface User {
  _id: string;
  username: string;
  email: string;
  role: "admin" | "user";
}
function NewMovie() {
  const [title, setTitle] = useState("");
  const [loader, setLoader] = useState(false);
  const [isMoved, setIsMoved] = useState(false);
  const [addLoader, setAddLoader] = useState(false);
  const [movies, setMovies] = useState<any[]>([]);
  const [message, setMessage] = useState("");
  const [user, setUser] = useState<User | null>(null);
  const router = useRouter();

  useEffect(() => {
    const storedUser = sessionStorage.getItem("user");

    if (!storedUser) {
      router.push("/");
      return;
    }

    const parsedUser: User = JSON.parse(storedUser);
    console.log(parsedUser);
    if (parsedUser.role !== "admin") {
      router.push("/");
      return;
    }

    setUser(parsedUser);
  }, [router]);
  async function searchMovieByTitleValidator() {
    setLoader(true);

    const response = await searchMovieByTitle(title);

    setMovies(response);
    if (response.length === 0) {
      setIsMoved(false);
    }

    setLoader(false);
  }

  async function addMovie(id: number) {
    setAddLoader(true);

    const response = await addMovieApi(id);

    console.log(response);

    setMessage(response.message);
    alert(response.message);

    setAddLoader(false);
  }

  function displayMovie() {
    if (movies.length === 0 && isMoved) {
      return (
        <p className="mt-8 text-2xl font-bold text-gray-500">No movie found</p>
      );
    } else {
      return (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 mt-6">
          {movies?.map((movie) => (
            <div
              key={movie.tmdbId}
              className="flex items-center p-2 border border-black/10 hover:border-black/20 transition-colors rounded-xl w-sm sm:w-[420px]"
            >
              <img
                src={movie.imagPath}
                alt={movie.title}
                className="w-[118px] rounded-lg object-cover"
              />

              <div className="ml-4">
                <h3 className="text-lg font-semibold">{movie.title}</h3>

                <p className="text-sm text-gray-600 line-clamp-3">
                  {movie.description}
                </p>

                <button
                  onClick={() => addMovie(movie.tmdbId)}
                  className="mt-3 px-6 py-2 bg-blue-500 rounded text-white text-sm"
                >
                  {addLoader ? "Adding..." : "+ Add"}
                </button>
              </div>
            </div>
          ))}
        </div>
      );
    }
  }

  return (
    
     <div className="flex flex-col flex-1 items-center justify-center bg-zinc-50 dark:bg-black p-4">

    <div className="w-full max-w-md mb-4">
      <Link
        href="/admin/dashboard"
        className="inline-flex items-center gap-2 text-sm text-gray-600 hover:text-black transition"
      >
        ← Retour au dashboard
      </Link>
    </div>
      <div className="flex items-center border pl-4 gap-2 bg-white border-gray-500/30 h-[46px] rounded-full overflow-hidden max-w-md w-full">
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full h-full outline-none text-sm text-gray-500"
          placeholder="Search movie..."
        />

        <button
          onClick={searchMovieByTitleValidator}
          className="bg-indigo-500 w-32 h-9 rounded-full text-sm text-white mr-[5px]"
        >
          {loader ? "Loading..." : "Search"}
        </button>
      </div>
      <div>
        <h1 className="mt-8 text-2xl font-bold text-gray-500">New Movie</h1>

        {displayMovie()}
      </div>
    </div>
  );
}

export default NewMovie;
