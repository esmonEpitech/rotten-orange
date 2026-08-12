const baseAPI = "http://localhost:5000";

const getToken = () => {
  if (typeof window === "undefined") return "";
  return sessionStorage.getItem("token") || "";
};

export const getUserById = async (id: string) => {
    const response = await fetch(`${baseAPI}/users/${id}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
    });
    return response.json();
};

export const getUsers = async () => {
    const response = await fetch(`${baseAPI}/users`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
    });
    return response.json();
};

export const deleteUser = async (id: string) => {
    const response = await fetch(`${baseAPI}/users/${id}`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
        },
    });
    return response.json();
};

export const updateUser = async (id: string, data: any) => {
    const response = await fetch(`${baseAPI}/users/${id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    });
    console.log(response);
    return response.json();
};

export const countUsers = async () => {
      const token = getToken();

    const response = await fetch(`${baseAPI}/users/count`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            Authorization: token ? `Bearer ${token}` : "",

        },
    });
    return response.json();
};