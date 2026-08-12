const baseAPI = "http://localhost:5000";

const getToken = () => {
  if (typeof window === "undefined") return "";
  return sessionStorage.getItem("token") || "";
};

export const getComments = async () => {
    const response = await fetch(`${baseAPI}/comments`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
    });
    return response.json();
}

export const getCommentById = async (id: string) => {
    const response = await fetch(`${baseAPI}/comments/${id}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
    });
    return response.json();
}

export const getCommentsByMovie = async (movieId: string) => {
    const response = await fetch(`${baseAPI}/comments/movie/${movieId}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
    });
    return response.json();
}

export const addComment = async (userId: string, movieId: string, content: string) => {
    const response = await fetch(`${baseAPI}/comments`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            userId: userId,
            movieId: movieId,
            comment: content
        }),
    });
    return response.json();
}

export const countComments = async () => {
      const token = getToken();

    const response = await fetch(`${baseAPI}/comments/count`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
                  Authorization: token ? `Bearer ${token}` : "",

        },
    });
    return response.json();
}