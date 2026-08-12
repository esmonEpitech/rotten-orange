interface Comment {
  _id: string;
  username: string;
  userId: string;
  movieId: string;
  comment: string;
}

export default function CommentCard({ username, movieId, comment }: Comment) {
  return (
    <div className="min-w-[250px] bg-gray-100 rounded-xl p-4 flex flex-col gap-3 flex-shrink-0">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-full bg-gradient-to-br from-[#D65108] to-[#591F0A] flex items-center justify-center text-white font-bold text-sm">
            {username[0].toUpperCase()}
          </div>
          <div>
            <p className="text-sm font-semibold text-gray-900">{username}</p>
            {/* <p className="text-xs text-gray-400">{time}</p> */}
          </div>
        </div>
        <span className="text-gray-400 tracking-widest cursor-pointer">···</span>
      </div>

      

      <p className="text-xs text-gray-600 leading-relaxed">{comment}</p>
    </div>
  );
}