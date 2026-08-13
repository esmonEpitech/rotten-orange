import { bungee } from "@/app/layout";
import { MOCK_MOVIES } from "@/lib/mockMovies";
import CommentCard from "@/components/comments/CommentCard";
import Link from "next/link";

const MOCK_COMMENTS = [
  {
    _id: "1",
    username: "Nailah",
    userId: "user-1",
    movieId: "1",
    comment: "It was okay... something was missing.",
  },
  {
    _id: "2",
    username: "Roxanne",
    userId: "user-2",
    movieId: "1",
    comment: "The theater was closed due to power outage.",
  },
  {
    _id: "3",
    username: "Ezekiel",
    userId: "user-3",
    movieId: "1",
    comment: "Vraiment bien réalisé, je recommande !",
  },
  {
    _id: "4",
    username: "Mory",
    userId: "user-4",
    movieId: "1",
    comment: "Trop court, pas assez de développement.",
  },
  {
    _id: "5",
    username: "Samuel",
    userId: "user-5",
    movieId: "1",
    comment: "Chef-d'œuvre absolu. Je l'ai vu deux fois en salle.",
  },
  {
    _id: "6",
    username: "Amina",
    userId: "user-6",
    movieId: "1",
    comment: "Correct sans plus, le scénario manque de profondeur.",
  },
];

export default async function CommentsPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const movie = MOCK_MOVIES.find((m) => m.id === id);

  if (!movie) return <div className="p-10">Film introuvable</div>;

  return (
    <main className="px-10 py-8 max-w-3xl mx-auto">

      <Link href={`/movies/${id}`} className="text-sm text-[#D65108] font-semibold hover:underline flex items-center gap-1 mb-6">
        Retour au film
      </Link>

      <h1 className={`${bungee.className} text-3xl text-[#591F0A] mb-1`}>
        {movie.title}
      </h1>
      <p className="text-sm text-gray-400 mb-8">{MOCK_COMMENTS.length} avis du public</p>

      <div className="flex flex-col gap-4">
        {MOCK_COMMENTS.map((c) => (
          <CommentCard key={c._id} {...c} />
        ))}
      </div>

    </main>
  );
}