"use client"
import { useRouter } from "next/navigation";
import { use, useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
export default function Page() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const router = useRouter()

    const handleSubmit = async (e : React.FormEvent) => {
        e.preventDefault();

        try {
            const response = await fetch("https://rotten-orange-backend.onrender.com/auth/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, password }),
            });
            if (!response.ok) {
                const error = await response.json();
                throw new Error(error.message || "Erreur de connexion")
            }

            // const data = await response.json();
            // localStorage.setItem("token", data.acces_token);
            // localStorage.setItem("user", JSON.stringify(data.user));
            // console.log(data)
            setEmail("");
            setPassword("");

            const data = await response.json();
            console.log("user: ", data)

            sessionStorage.setItem("token",data.acces_token);
            sessionStorage.setItem("user",JSON.stringify(data.user));
            window.dispatchEvent(new Event("auth-change"));

            if (data.user.role === "admin") {
                router.push("/admin/dashboard");
            } else {
                router.push("/");
            }

        } catch (error : any) {
            setError(error.message);
        }
    }
      
    useEffect(() => {
        const user = sessionStorage.getItem("user") && JSON.parse(sessionStorage.getItem("user") || "{}");
        console.log("user: ", user);
        if (user?.role === "user") {
            router.push("/");
        }
        else if (user?.role === "admin") {
            router.push("/admin/dashboard");
        }

    }, []);

    return (

        <div>
            <div className="relative min-h-screen bg-white flex flex-col justify-center py-12 sm:px-6 lg:px-8">
                <div className="absolute top-0 ">
                    <Link href="/" className="shrink-0">
                        <Image
                            src="/rotten_logo.png"
                            alt="Rotten Oranges"
                            width={140}
                            height={44}
                            className="object-contain "
                            priority
                        />
                    </Link>
                </div>
                <div className="sm:mx-auto sm:w-full sm:max-w-md">
                    <div
                        className="bg-white py-8 px-4 shadow-lg sm:rounded-lg sm:px-10">

                        <div className="text-center mb-8">
                            <h2 className="text-2xl sm:text-3xl font-bold text-red-600">
                                Welcome Back
                            </h2>
                            <p className="mt-2 text-sm sm:text-base text-gray-600">
                                Please sign in to your account
                            </p>
                        </div>


                        <form className="space-y-6" onSubmit={handleSubmit}>
                            <div>
                                {error && <p className="text-red-500 text-center">Email ou mot de passe incorrect</p>}
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700" htmlFor="email">Email Address</label>
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="mt-1 block w-full px-3 py-2 sm:px-4 sm:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 focus:outline-red-500 text-black"
                                    required
                                />
                            </div>


                            <div>
                                <label className="block text-sm font-medium text-gray-700" htmlFor="password">Password</label>
                                <div className="mt-1 relative">
                                    <input
                                        type="password"
                                        id="password"
                                        name="password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        className="block w-full px-3 py-2 sm:px-4 sm:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 focus:outline-red-500 text-black"
                                        required
                                    />
                                    {/* <button
                                        type="button"
                                        className="absolute inset-y-0 right-0 pr-3 flex items-center"
                                    >
                                        <svg
                                            className="h-5 w-5 text-gray-400"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            stroke="currentColor"
                                        >
                                            <path
                                                stroke-linecap="round"
                                                stroke-linejoin="round"
                                                stroke-width="2"
                                                d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                                            />
                                            <path
                                                stroke-linecap="round"
                                                stroke-linejoin="round"
                                                stroke-width="2"
                                                d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                                            />
                                        </svg>
                                        <svg
                                            className="h-5 w-5 text-gray-400"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            stroke="currentColor"
                                        >
                                            <path
                                                stroke-linecap="round"
                                                stroke-linejoin="round"
                                                stroke-width="2"
                                                d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"
                                            />
                                        </svg>
                                    </button> */}
                                </div>
                            </div>

                            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-2 sm:space-y-0">
                                <div className="flex items-center">
                                    <input
                                        type="checkbox"
                                        id="remember"
                                        className="h-4 w-4 text-red-600 focus:ring-red-500 border-gray-300 rounded"
                                    />
                                    <label htmlFor="remember" className="ml-2 block text-sm text-gray-700">Remember me</label>
                                </div>
                                <a href="#" className="text-sm text-red-600 hover:text-red-700">Forgot password?</a>
                            </div>

                            <button
                                type="submit"
                                className="w-full flex justify-center py-2 px-4 sm:py-3 border border-transparent rounded-lg shadow-sm text-sm sm:text-base font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                            >
                                <span>Sign In</span>

                            </button>
                        </form>
                    </div>

                    <p className="mt-6 text-center text-sm text-gray-600">
                        Don't have an account?
                        <a href="/auth/register" className="font-medium text-red-600 hover:text-red-700 ml-2">Sign up now</a>
                    </p>
                </div>
            </div>
        </div>
    )
}


