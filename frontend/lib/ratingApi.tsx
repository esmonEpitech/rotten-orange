const baseAPI = "https://rotten-orange-backend.onrender.com";

export const getRatings = async () => {
    const response = await fetch(`${baseAPI}/ratings`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
    });
    return response.json();
}

export const getRatingById = async (id: string) => {
    const response = await fetch(`${baseAPI}/ratings/${id}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
    });
    return response.json();
}

export const addRating = async (userId: string, movieId: string, rating: number) => {
    const response = await fetch(`${baseAPI}/ratings`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            userId: userId,
            movieId: movieId,
            score: rating
        }),
    });
    return response.json();
}

export const getbyMovieAndUser = async (movieId: string, userId: string) => {
    const response = await fetch(`${baseAPI}/ratings/user/${userId}/movie/${movieId}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
    });
    return response.json();
}

export const calculateAverageRatingForMovie = async (movieId: string) => {
    const response = await fetch(`${baseAPI}/ratings/movie/${movieId}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
    });
    return response.json();
}