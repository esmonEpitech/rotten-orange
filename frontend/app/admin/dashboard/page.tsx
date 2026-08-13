"use client";

import { useEffect, useState } from "react";
import AdminNavbar from "../components/adminNavbar";
import Sidebar from "../components/sideBar";
import StatCards from "../components/statCards";
import MovieChart from "../components/movieChart";
import Listmovies from "../components/listMovies";
import Listusers from "../components/listUser";
import { countMovies, getMovies, top5 } from "@/lib/movieAddApi";
import { useRouter } from "next/navigation";
import { countComments } from "@/lib/commentApi";
import { countUsers } from "@/lib/userApiAd";

interface User {
  _id: string;
  username: string;
  email: string;
  role: "admin" | "user";
}
export default function Dashboard() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const [activeTab, setActiveTab] = useState("dashboard");
  const [movies, setMovies] = useState<any[]>([]);
  const [moviesCount, setMoviesCount] = useState(0);
  const [commentsCount, setCommentsCount] = useState(0);
  const [usersCount, setUsersCount] = useState(0);
  const [top5Movies, setTop5Movies] = useState<any[]>([]);

  async function getMovesData() {
    const response = await getMovies();
    setMovies(response);
    console.log("list movies ", response);
  }
  useEffect(() => {
    getMovesData();
  }, []);

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

    const countMoviesData= async() => {
      const response = await countMovies();
      console.log("nbmovies: ", response);
      setMoviesCount(Number(response) || 0);
    }

    const countCommentsData = async() => {
      const response = await countComments();
      console.log("nbcomments: ", response);
      setCommentsCount(Number(response) || 0);
    }
    const countUsersData = async() => {
      const response = await countUsers();
      console.log("nbusers: ", response);
      setUsersCount(Number(response) || 0);
    }

    const top5Data = async() => {
      const response = await top5();
      setTop5Movies(response);
      console.log("top5: ", response);
    }

  useEffect(() => {
    countMoviesData();
    countCommentsData();
    countUsersData();
    top5Data();
  }, []);

  const renderContent = () => {
    switch (activeTab) {
      case "dashboard":
        return (
          <>
            <div className="mb-8">
              <StatCards moviesCount={moviesCount} commentsCount={commentsCount} usersCount={usersCount}/>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
              <MovieChart top5Movies={top5Movies}/>
            </div>
          </>
        );
      case "movies":
        return (
          <div className="text-gray-800 font-medium">
            <Listmovies movies={movies} />
          </div>
        );
      case "users":
        return (
          <div className="text-gray-800 font-medium">
            <Listusers />
          </div>
        );
      default:
        return <div className="text-gray-800">Contenu introuvable</div>;
    }
  };

  return (
    <div className="flex h-screen w-screen overflow-hidden bg-gray-50/50">
      <Sidebar
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
      />

      <div className="flex-1 flex flex-col min-w-0 h-full overflow-hidden">
        <AdminNavbar onMenuToggle={() => setIsSidebarOpen(!isSidebarOpen)} />

        <main className="p-6 sm:p-8 flex-1 overflow-y-auto">
          <div className="mb-6">
            <h1 className="text-2xl font-bold text-gray-800 capitalize">
              {activeTab}
            </h1>
          </div>

          {renderContent()}
        </main>
      </div>
    </div>
  );
}
