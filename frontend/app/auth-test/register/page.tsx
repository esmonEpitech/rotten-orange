"use client"
import { useEffect, useState } from 'react'
import { useRouter } from "next/navigation";
import Image from 'next/image';
import Link from 'next/link';

export default function Page() {


    const [email, setEmail] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [confirm, setConfirm] = useState("");
    const [error, setError] = useState("");
    const router = useRouter();
    const [profile, setProfile] = useState<File | null>();

    const handleSubmit = async (e : React.FormEvent) => {
        e.preventDefault();
        setError("");

        if (password !== confirm) {
            setError("Mot de passe incorrect");
            setConfirm("");
            return;
        }

        try {
             const formData = new FormData();
            formData.append("username", username);
            formData.append("email", email);
            formData.append("password", password);
            if (profile) {
                formData.append("profile", profile);
            }

            const response = await fetch("https://rotten-orange-backend.onrender.com/auth/signup", {
                method: "POST",
                // headers: { "Content-Type": "application/json" },
                body: formData,
            });
            const data = await response.json();
            if (!response.ok) {
                
                throw new Error(data.message || "Erreur d'inscription")
            }
            
            router.push("/auth/login");
        } catch (error : any) {
            setError(error.message)
            console.log(error);
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
        <div className="relative bg-gray-100 min-h-screen flex items-center justify-center ">

            <div className="absolute top-0 left-5">
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

            <div className=" shadow-md rounded-lg p-8 w-full max-w-md">
                <div className='text-center mb-8'>
                    <h2 className="text-2xl lg:text-3xl font-bold text-center text-red-600 ">Create an Account</h2>
                    <p className="mt-2 text-sm sm:text-base text-gray-600">
                        Please sign up here
                    </p>
                </div>

                <div>
                    {error && <p className='text-center text-red-500'>{error}</p>}
                </div>

                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="block text-gray-700">Username</label>
                        <input type="text" placeholder="Your Username"
                            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-red-400 text-black" name="userame" value={username} onChange={(e) => setUsername(e.target.value)} required />
                    </div>

                    <div className="mb-4">
                        <label className="block text-gray-700">Email Address</label>
                        <input type="email" placeholder="you@example.com"
                            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-red-400 text-black" name="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                    </div>

                    <div className="mb-4">
                        <label className="block text-gray-700">Password</label>
                        <input type="password" placeholder="********"
                            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-red-400 text-black" name="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                    </div>

                    <div className="mb-6">
                        <label className="block text-gray-700">Confirm Password</label>
                        <input type="password" placeholder="********"
                            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-red-400 text-black" name="confirm" value={confirm} onChange={(e) => setConfirm(e.target.value)} required />
                    </div>

                    <div className="mb-6">
                        <label className="block text-gray-700">Profile Picture </label>
                        <input type="file" accept="image/*"
                            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-red-400 text-black"
                            onChange={(e) => setProfile(e.target.files?.[0] || null)} />
                    </div>

                    <button type="submit"
                        className="w-full bg-red-500 hover:bg-red-600 text-white py-2 rounded-md transition duration-300 ">
                        Sign Up
                    </button>
                </form>

                <p className="text-sm text-center text-gray-600 mt-4">
                    Already have an account? <a href="/auth/login" className="text-red-500 hover:underline">Login</a>
                </p>
            </div>

        </div>
    )
}


