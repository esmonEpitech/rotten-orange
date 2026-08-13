const baseAPI = "https://rotten-orange-backend.onrender.com";

export const addFavorit = async (userId: string, movieId: string) =>{

    const response = await fetch(`${baseAPI}/favoris`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            userId: userId,
            movieId: movieId
        }),
    })
    console.log(response);
    return response.json();
}

export const getFavorits = async (userId: string) =>{
    const response = await fetch(`${baseAPI}/favoris/user/${userId}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
    });
    return response.json();
}