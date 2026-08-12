"use client";

import React from "react";

interface User {
  id: string | number;
  username: string;
  sexe: "M" | "F" | string;
  email: string;
  isAdmin: number | boolean;
}

export default function Listusers() {
  const store = {
    paginationUsers: [
        {id: 1, username: "Jean", sexe: "M", email: "jean@gmail.com", isAdmin: 1},
        {id: 2, username: "Louis", sexe: "M", email: "louis@gmail.com", isAdmin: 0}

    ] as User[], 
    users: [{id: 1, username: "Jean", sexe: "M", email: "jean@gmail.com", isAdmin: 1},
            {id: 2, username: "Louis", sexe: "M", email: "louis@gmail.com", isAdmin: 0}
        ] as User[],           
    itemsPerPage: 10,
    currentPage: 1,
    openProfile: (user: User) => console.log("Profil ouvert :", user),
    deleteUsers: (slug: string) => console.log("Suppression du slug :", slug),
  };

  // Calcul du nombre de pages totales
  const totalPages = Math.ceil(store.users.length / store.itemsPerPage);

  return (
    <div className="w-full">
      <div className="overflow-x-auto bg-white rounded-lg shadow">
        <table className="w-full table-auto">
          <thead>
            <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
              <th className="py-3 px-6 text-left">Name</th>
              <th className="py-3 px-6 text-left">Sexe</th>
              <th className="py-3 px-6 text-left">Email</th>
              <th className="py-3 px-6 text-left">Role</th>
              <th className="py-3 px-6 text-center">Actions</th>
            </tr>
          </thead>

          <tbody className="text-gray-600 text-sm">
            {store.paginationUsers.map((user) => (
              <tr
                key={user.id}
                className="border-b border-gray-200 hover:bg-gray-100 transition-colors"
              >
                <td className="py-3 px-6 text-left">{user.username}</td>
                <td className="py-3 px-6 text-left">
                  {user.sexe === "M" ? "Homme" : "Femme"}
                </td>
                <td className="py-3 px-6 text-left">{user.email}</td>
                <td className="py-3 px-6 text-left">
                  {Number(user.isAdmin) === 1 ? "Administrateur" : "Utilisateur"}
                </td>

                <td className="py-3 px-6 text-center">
                  <div className="flex items-center justify-center">
                    <button
                      onClick={() => store.openProfile(user)}
                      className="w-4 mr-2 transform hover:text-blue-500 hover:scale-110 transition-transform"
                      aria-label="Voir le profil"
                    >
                      <svg
                        xmlns="http://w3.org"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
                        />
                      </svg>
                    </button>

                    {/* Bouton Supprimer */}
                    <button
                      onClick={() => store.deleteUsers(user.id)}
                      className="w-4 mr-2 transform hover:text-red-500 hover:scale-110 transition-transform"
                      aria-label="Supprimer l'utilisateur"
                    >
                      <svg
                        xmlns="http://w3.org"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                        />
                      </svg>
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {}
      {}
      <div className="flex justify-center mt-7 space-x-2 items-center">
        <button
          disabled={store.currentPage === 1}
          className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50 text-sm font-medium hover:bg-gray-300"
          onClick={() => {  }}
        >
          «
        </button>
        <button
          disabled={store.currentPage === 1}
          className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50 text-sm font-medium hover:bg-gray-300"
          onClick={() => {  }}
        >
          Précédent
        </button>

        <span className="text-sm text-gray-600 px-2">
          Page <strong>{store.currentPage}</strong> sur {totalPages || 1}
        </span>

        <button
          disabled={store.currentPage === totalPages}
          className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50 text-sm font-medium hover:bg-gray-300"
          onClick={() => {  }}
        >
          Suivant
        </button>
        <button
          disabled={store.currentPage === totalPages}
          className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50 text-sm font-medium hover:bg-gray-300"
          onClick={() => {  }}
        >
          »
        </button>
      </div>
    </div>
  );
}
