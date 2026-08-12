"use client";

interface StatCardsProps {
  moviesCount: number;
}
interface StatCardsProps {
  moviesCount: number;
  commentsCount: number;
  usersCount: number;
}

export default function StatCards({
  moviesCount,commentsCount,usersCount
}: StatCardsProps,) {

  const stats = [
    {
      title: "Total Films",
      value: moviesCount,
      icon: "🎬",
      color: "bg-orange-100 text-orange-600",
    },

    {
      title: "Utilisateurs",
      value: usersCount,
      icon: "👥",
      color: "bg-blue-100 text-blue-600",
    },

    {
      title: "Commentaires",
      value: commentsCount,
      icon: "💬",
      color: "bg-green-100 text-green-600",
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
      {stats.map((stat) => (
        <div
          key={stat.title}
          className="p-6 bg-white rounded-xl shadow-sm border border-gray-100 flex items-center justify-between transition-all hover:shadow-md"
        >
          <div>
            <p className="text-sm font-semibold text-gray-400 uppercase tracking-wider">
              {stat.title}
            </p>

            <h3 className="text-3xl font-bold text-gray-800 mt-1">
              {stat.value}
            </h3>
          </div>

          <div
            className={`w-12 h-12 rounded-xl ${stat.color} flex items-center justify-center text-xl`}
          >
            {stat.icon}
          </div>
        </div>
      ))}
    </div>
  );
}