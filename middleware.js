// import { getToken } from "next-auth/jwt";
// import { NextResponse } from "next/server";

// export async function middleware(req) {
//     const token = await getToken({ req });

//     // ⛔ Only allow admins into /admin routes
//     if (req.nextUrl.pathname.startsWith("/admin")) {
//         if (!token || token.isAdmin !== "admin") {
//             return NextResponse.redirect(new URL("/", req.url));
//         }
//     }

//     return NextResponse.next();
// }

// // ✅ This config tells Next.js which routes to apply this to
// export const config = {
//     matcher: ["/admin/:path*"], // 👈 Protect all routes under /admin
// };


import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";

export async function middleware(req) {
    const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

    // Protect /admin route
    if (req.nextUrl.pathname.startsWith("/admin")) {
        if (!token || !token.isAdmin) {
            return NextResponse.redirect(new URL("/", req.url));
        }
    }

    return NextResponse.next();
}

export const config = {
    matcher: ["/admin/:path*"],
};
