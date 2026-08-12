"use client";

import Link from "next/link";

interface Director {
  name: string;
  profilePath: string | null;
}

interface Movie {
  _id: string | number;
  title: string;
  genre: string[];
  producer: Director[];
  productionBudget: number;
  id: string;
}

export default function Listmovies({ movies }: { movies: Movie[] }) {
  const store = {
    paginationMovies: movies as Movie[],

    movies: [] as Movie[],
    itemsPerPage: 10,
    currentPage: 1,

    openEditModal: (movie: Movie) => console.log("edit:", movie),
    deleteMovie: (movieid: string | number) => console.log("delete:", movieid),
  };

  const totalPages = Math.ceil(store.movies.length / store.itemsPerPage);

  return (
    <div className="w-full">
      <div className="flex justify-end mb-4">
  <Link
    href="/admin/movies/new"
    className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition"
  >
    + Ajouter un film
  </Link>
</div>
      <div className="overflow-x-auto bg-white rounded-lg shadow">
        <table className="w-full table-auto">
          <thead>
            <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
              <th className="py-3 px-6 text-left">Titre</th>
              <th className="py-3 px-6 text-left">Genre</th>
              <th className="py-3 px-6 text-left">Réalisateur</th>
              <th className="py-3 px-6 text-left">Budget</th>
              <th className="py-3 px-6 text-center">Actions</th>
            </tr>
          </thead>

          <tbody className="text-gray-600 text-sm">
            {store.paginationMovies.map((movie) => (
              <tr
                key={movie._id}
                className="border-b border-gray-200 hover:bg-gray-100 transition-colors"
              >
                <td className="py-3 px-6 font-medium text-gray-900">
                  {movie.title}
                </td>

                <td className="py-3 px-6">{movie.genre.join(", ")}</td>

                <td className="py-3 px-6">
                  {movie.producer.map((d) => d.name).join(", ")}
                </td>

                <td className="py-3 px-6">
                  {movie.productionBudget.toLocaleString()}
                </td>

                <td className="py-3 px-6 text-center">
                  <div className="flex items-center justify-center gap-3">
                    {/* EDIT */}
                    <button
                      onClick={() => store.openEditModal(movie)}
                      className="hover:text-blue-500 hover:scale-110 transition-transform"
                      aria-label="Modifier"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        className="w-5 h-5"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
                        />
                      </svg>
                    </button>

                    {/* DELETE */}
                    <button
                      onClick={() => store.deleteMovie(movie._id)}
                      className="hover:text-red-500 hover:scale-110 transition-transform"
                      aria-label="Supprimer"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        className="w-5 h-5"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                        />
                      </svg>
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex justify-center mt-7 space-x-2 items-center">
        <button disabled className="px-3 py-1 bg-gray-200 rounded">
          «
        </button>

        <button disabled className="px-3 py-1 bg-gray-200 rounded">
          Précédent
        </button>

        <span className="text-sm text-gray-600 px-2">
          Page <strong>{store.currentPage}</strong> sur {totalPages || 1}
        </span>

        <button disabled className="px-3 py-1 bg-gray-200 rounded">
          Suivant
        </button>

        <button disabled className="px-3 py-1 bg-gray-200 rounded">
          »
        </button>
      </div>
    </div>
  );
}
