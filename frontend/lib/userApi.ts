export async function updateUser(
  userId: string,
  data: { username?: string; email?: string; password?: string }
) {
  const token = sessionStorage.getItem("token");

  const res = await fetch(`https://rotten-orange-backend.onrender.com/users/${userId}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.message || "Erreur lors de la mise à jour");
  }

  return res.json();
}

export async function updateUserProfile(userId: string, file: File) {
  const token = sessionStorage.getItem("token");

  const formData = new FormData();
  formData.append("profile", file);

  const res = await fetch(`https://rotten-orange-backend.onrender.com/users/${userId}/profile`, {
    method: "PATCH",
    headers: {
      Authorization: `Bearer ${token}`,
      
    },
    body: formData,
  });

  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.message || "Erreur lors de la mise à jour");
  }

  return res.json();
}