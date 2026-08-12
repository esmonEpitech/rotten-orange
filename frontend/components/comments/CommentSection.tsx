"use client";

import { useEffect, useRef, useState } from "react";
import CommentCard from "./CommentCard";
import Link from "next/link"; 
import { addComment, getCommentsByMovie } from "@/lib/commentApi";
import { useRouter } from "next/navigation";

interface CommentSectionProps {
  movieId: string;
  movieTitle: string;
}

interface Comment {
  _id: string;
  username: string;
  userId: string;
  movieId: string;
  comment: string;
}

export default function CommentSection({
  movieId,
  movieTitle,
}: CommentSectionProps) {
  const rowRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  const [modalOpen, setModalOpen] = useState(false);
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState<Comment[]>([]);
  const [userId, setUserId] = useState<string | null>(null);

  useEffect(() => {
    const storedUser = sessionStorage.getItem("user");

    if (storedUser) {
      const user = JSON.parse(storedUser);
      setUserId(user._id);
    }
  }, []);

  const getComments = async () => {
    try {
      const data = await getCommentsByMovie(movieId);
      const list = Array.isArray(data) ? data : (data?.comments ?? []);

      setComments(list);
    } catch (error) {
      console.log(error);
      setComments([]);
    }
  };

  const addCommentValid = async () => {
    if (!userId) {
      router.push("/auth/login");
      return;
    }

    try {
      await addComment(userId, movieId, comment);

      setComment("");
      setModalOpen(false);

      await getComments();
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getComments();
  }, [movieId]);

  return (
    <section className="bg-white">
      <div className="px-8 py-10">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-bold text-gray-900">Avis du public</h2>

          <span className="text-xs font-bold tracking-widest uppercase text-[#D65108] cursor-pointer">
            VIEW
          </span>
        </div>

        <div className="relative">
          <button
            onClick={() =>
              rowRef.current?.scrollBy({ left: -280, behavior: "smooth" })
            }
            className="absolute left-0 top-1/2 -translate-y-1/2 z-10 w-8 h-8 rounded-full bg-white border border-gray-200 shadow-sm flex items-center justify-center"
          >
            ‹
          </button>

          <button
            onClick={() =>
              rowRef.current?.scrollBy({ left: 280, behavior: "smooth" })
            }
            className="absolute right-0 top-1/2 -translate-y-1/2 z-10 w-8 h-8 rounded-full bg-white border border-gray-200 shadow-sm flex items-center justify-center"
          >
            ›
          </button>

          <div
            ref={rowRef}
            className="flex gap-3 overflow-x-auto scroll-smooth px-6 pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          >
            {comments.map((c) => (
              <CommentCard key={c._id} {...c} />
            ))}
          </div>
        </div>
      </div>

      <div className="px-8 pb-10 border-t border-gray-100 pt-6 flex flex-col items-center">
        <h3 className="text-base font-bold text-gray-900">
          Apporter ma critique
        </h3>

        <p className="text-xs text-gray-400 mt-1 mb-4">
          Partagez votre avis et aidez la communauté
        </p>

        <button
          onClick={() => setModalOpen(true)}
          className="bg-[#591F0A] text-white text-xs font-bold px-6 py-2.5 rounded-full hover:opacity-85 transition-opacity"
        >
          Écrire une critique
        </button>
      </div>

      {modalOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center"
          onClick={(e) => e.target === e.currentTarget && setModalOpen(false)}
        >
          <div className="bg-white rounded-2xl p-6 w-full max-w-md mx-4 flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <p className="font-bold text-gray-900">
                {movieTitle} <br /> Ma critique
              </p>

              <button
                onClick={() => setModalOpen(false)}
                className="text-gray-400 hover:text-gray-600 text-xl"
              >
                ✕
              </button>
            </div>

            <textarea
              rows={5}
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="Partagez votre avis sur ce film..."
              className="w-full border border-gray-200 rounded-xl p-3 text-sm resize-none outline-none focus:border-[#EFA00B]"
            />

            <div className="flex justify-end">
              <button
                className="bg-[#EFA00B] text-[#2a0d00] font-bold px-6 py-2.5 rounded-full text-sm hover:opacity-85"
                onClick={addCommentValid}
              >
                Publier
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
