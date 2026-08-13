const baseAPI = "https://rotten-orange-backend.onrender.com";

const getToken = () => {
  if (typeof window === "undefined") return "";
  return sessionStorage.getItem("token") || "";
};
export const searchMovieByTitle = async (title: string) => {
  const token = getToken();

  const response = await fetch(`${baseAPI}/tmdb`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: token ? `Bearer ${token}` : "",
    },
    body: JSON.stringify({ title }),
  });

  if (!response.ok) {
    throw new Error("Erreur lors de la recherche de film");
  }

  return response.json();
};
export const addMovie = async (id: number) => {
  const token = getToken();

  const response = await fetch(`${baseAPI}/tmdb/${id}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: token ? `Bearer ${token}` : "",
    },
  });
  console.log(response);
  if (!response.ok) {
    if (response.status === 500) {
      return { message: "Impossible to add this movie: incomplete data" };
    } else {
      return { message: "Movie already added" };
    }
  }
  return response.json();
};

export const getMovies = async () => {
  const response = await fetch(`${baseAPI}/movies`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  return response.json();
};

export const getMovieById = async (id: string) => {
  const response = await fetch(`${baseAPI}/movies/${id}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  return response.json();
};

export const getLastMovies = async () => {
  const response = await fetch(`${baseAPI}/movies/latest`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  return response.json();
};

export const findTopRatings = async () => {
  const response = await fetch(`${baseAPI}/movies/topratings`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  return response.json();
};

export const countMovies = async () => {
    const token = getToken();

  const response = await fetch(`${baseAPI}/movies/count`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: token ? `Bearer ${token}` : "",
    },
  });
  console.log("nbmovies: ", response);
  return response.json();
};

export const top5 = async () => {
  const response = await fetch(`${baseAPI}/movies/top5`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  return response.json();
};
