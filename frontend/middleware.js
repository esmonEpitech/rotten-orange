import { NextResponse } from "next/server";

export function middleware(request) {

    const token = request.cookies.get("token")?.value;
    const role = request.cookies.get("role")?.value;
    const url = request.nextUrl.pathname;

    if (url.startsWith("/auth/dashboardUsertest") && !token) {
        return NextResponse.redirect(new URL("/auth/login", request.url));
    }

    if (url.startsWith("/auth/dashboardAdmintest") && !token) {
        return NextResponse.redirect(new URL("/auth/login", request.url));
    }

   
    if (url.startsWith("/auth/dashboardAdmintest") && role !== "admin") {
        return NextResponse.redirect(new URL("/auth/dashboardUsertest", request.url));
    }

    if ((url.startsWith("/auth/login") || url.startsWith("/auth/register")) && token) {
        if (role === "admin") {
            return NextResponse.redirect(new URL("/auth/dashboardAdmintest", request.url));
        }
        return NextResponse.redirect(new URL("/auth/dashboardUsertest", request.url));
    }

    return NextResponse.next();
}

export const config = {
    matcher: [
        "/auth/dashboardUsertest",
        "/auth/dashboardAdmintest",
        "/auth/login",
        "/auth/register",
    ],
};