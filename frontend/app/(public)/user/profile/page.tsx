"use client";

import { useEffect, useState } from "react";
import MovieList from "@/components/movies/MovieList";
import { bungee } from "@/app/layout";
import { getMovies } from "@/lib/movieAddApi";
import { getFavorits } from "@/lib/favoriesApi";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { updateUser, updateUserProfile } from "@/lib/userApi";

interface User {
  _id: string;
  username: string;
  email: string;
  profile?: string;
}

interface Movie {
  _id: string;
  title: string;
  imagPath: string;
  criticScore: number;
}

interface Favorite {
  movieId: string;
}
function EditModal({ user, onClose, onSuccess }: { user: User; onClose: () => void; onSuccess: (updatedUser: User) => void }) {
  const [username, setUsername] = useState(user.username);
  const [email, setEmail] = useState(user.email);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [profile, setProfile] = useState<File | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setError("");

    if (password && password !== confirmPassword) {
      setError("Les mots de passe ne correspondent pas");
      return;
    }

    try {
      const payload: Record<string, string> = { username, email };
      if (password) payload.password = password;

      const updated = await updateUser(user._id, payload);

      let updatedProfile = user.profile;
      if (profile) {
        const profileData = await updateUserProfile(user._id, profile);
        console.log("profileData:", profileData);
        updatedProfile = profileData.profile;
      }

      const newUser = { ...user, username: updated.username, email: updated.email, profile: updatedProfile };
      sessionStorage.setItem("user", JSON.stringify(newUser));
      window.dispatchEvent(new Event("auth-change"));

      onSuccess(newUser);
      setSuccess(true);
      setTimeout(() => onClose(), 1500);

    } catch (err: any) {
      setError(err.message);
    }
  };

  //   console.log({
  //     username,
  //     email,
  //     password,
  //   });

  //   setSuccess(true);

  //   setTimeout(() => {
  //     onClose();
  //   }, 1500);
  // };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-2xl shadow-xl w-full max-w-md mx-4 p-6"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-bold text-[#591F0A]">
            Modifier le profil
          </h2>

          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 text-2xl leading-none"
          >
            ×
          </button>
        </div>

        {success ? (
          <p className="text-center text-green-600 font-semibold py-6">
            Profil mis à jour !
          </p>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <div className="flex flex-col gap-1">
              <label className="text-sm font-semibold text-[#591F0A]">
                Nom d'utilisateur
              </label>

              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="h-10 px-4 border-2 border-orange-200 rounded-full text-sm outline-none focus:border-[#EFA00B]"
                required
              />
            </div>

            <div className="flex flex-col gap-1">
              <label className="text-sm font-semibold text-[#591F0A]">
                Email
              </label>

              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="h-10 px-4 border-2 border-orange-200 rounded-full text-sm outline-none focus:border-[#EFA00B]"
                required
              />
            </div>

            <div className="flex flex-col gap-1">
              <label className="text-sm font-semibold text-[#591F0A]">
                Nouveau mot de passe
              </label>

              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Votre nouveau mot de passe"
                className="h-10 px-4 border-2 border-orange-200 rounded-full text-sm outline-none focus:border-[#EFA00B]"
              />
            </div>

            <div className="flex flex-col gap-1">
              <label className="text-sm font-semibold text-[#591F0A]">
                Confirmer le mot de passe
              </label>

              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="h-10 px-4 border-2 border-orange-200 rounded-full text-sm outline-none focus:border-[#EFA00B]"
              />
            </div>

            <div className="flex flex-col gap-1">
              <label className="text-sm font-semibold text-[#591F0A]">Photo de profil</label>
              <input
                type="file"
                accept="image/*"
                onChange={(e) => setProfile(e.target.files?.[0] || null)}
                className="h-10 px-4 border-2 border-orange-200 rounded-full text-sm outline-none focus:border-[#EFA00B]"
              />
            </div>

            {error && <p className="text-sm text-red-500">{error}</p>}

            <div className="flex gap-3 mt-2">
              <button
                type="button"
                onClick={onClose}
                className="flex-1 h-10 rounded-full border-2 border-gray-200 text-gray-500 text-sm font-semibold hover:bg-gray-50"
              >
                Annuler
              </button>

              <button
                type="submit"
                className="flex-1 h-10 rounded-full bg-[#EFA00B] hover:bg-[#D65108] text-white text-sm font-semibold"
              >
                Sauvegarder
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}

export default function ProfilePage() {
  const [user, setUser] = useState<User | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [movies, setMovies] = useState<Movie[]>([]);

  const router = useRouter();

  useEffect(() => {
    const storedUser = sessionStorage.getItem("user");

    if (storedUser) {
      setUser(JSON.parse(storedUser));
    } else {
      router.push("/");
    }
  }, [router]);

  useEffect(() => {
    if (!user?._id) return;

    const getMoviesByUserFavorite = async () => {
      try {
        const moviesData = await getMovies();
        const favorites: Favorite[] = await getFavorits(user._id);

        const filtered = moviesData.filter((movie: Movie) =>
          favorites.some((fav) => fav.movieId === movie._id),
        );
        setMovies(filtered);
      } catch (error) {
        console.log(error);
      }
    };

    getMoviesByUserFavorite();
  }, [user]);

  const handleLogout = () => {
    sessionStorage.removeItem("user");
    sessionStorage.removeItem("token");
    router.push("/");
  };

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Chargement...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4">
      <div className="max-w-3xl mx-auto">
        <div className="bg-white rounded-2xl border border-orange-100 p-6 mb-6 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-full bg-[#EFA00B] flex items-center justify-center text-white text-2xl font-bold overflow-hidden">
              {user.profile ? (

                <img
                  src={`http://localhost:5000/uploads/${user.profile}`}
                  alt="profile"
                  className="w-full h-full object-cover"
                />
              ) : (
                user.username?.charAt(0).toUpperCase()
              )}
            </div>

            <div>
              <h1 className="text-xl font-bold text-[#591F0A]">
                {user.username}
              </h1>
              <p className="text-sm text-gray-400">{user.email}</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setShowModal(true)}
              className="px-5 py-2 rounded-full border-2 border-[#EFA00B] text-[#EFA00B] text-sm font-semibold hover:bg-[#EFA00B] hover:text-white"
            >
              Modifier
            </button>

            <button
              onClick={handleLogout}
              className="px-5 py-2 rounded-full bg-red-500 hover:bg-red-600 text-white text-sm font-semibold"
            >
              Déconnexion
            </button>
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-orange-100 p-6">
          <h2 className={`${bungee.className} text-base text-[#591F0A] mb-4`}>
            Films favoris
          </h2>

          <MovieList title="Films Favoris" movies={movies} />
        </div>
      </div>

      {showModal && (
        <EditModal user={user} onClose={() => setShowModal(false)} onSuccess={(updatedUser) => setUser(updatedUser)} />
      )}
    </div>
  );
}
