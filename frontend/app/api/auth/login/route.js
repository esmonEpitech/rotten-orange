import { NextResponse } from "next/server";

export async function POST(request) {


    const { email, password } = await request.json();


    const res = await fetch("https://rotten-orange-backend.onrender.com/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
    });


    if (!res.ok) {
        const error = await res.json();
        return NextResponse.json(
            { message: error.message || "Email ou mot de passe incorrect" },
            { status: 401 }
        );
    }


    const data = await res.json();




    const response = NextResponse.json({
        success: true,
        role: data.user.role
    });

    response.cookies.set("token", data.acces_token, {
        httpOnly: true,
        path: "/",
        maxAge: 60 * 60 * 24,
    });

    response.cookies.set("role", data.user.role, {
        httpOnly: false, // accessible en JS si besoin
        path: "/",
        maxAge: 60 * 60 * 24,
    });



    return response;
}