import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { jwtVerify } from 'jose';

const SECRET_KEY = process.env.JWT_SECRET || 'super-secret-key-change-this';
const key = new TextEncoder().encode(SECRET_KEY);

export async function middleware(request: NextRequest) {
    const session = request.cookies.get('session')?.value;
    const { pathname } = request.nextUrl;

    // Paths that require authentication
    const protectedRoutes = ['/cart', '/checkout', '/account', '/wishlist'];
    const adminRoutes = ['/admin'];

    // Check if accessing a protected route or admin route
    const isProtectedRoute = protectedRoutes.some(route => pathname.startsWith(route));
    const isAdminRoute = adminRoutes.some(route => pathname.startsWith(route));

    if (!isProtectedRoute && !isAdminRoute) {
        return NextResponse.next();
    }

    if (!session) {
        const url = new URL('/login', request.url);
        url.searchParams.set('callbackUrl', encodeURI(request.url));
        return NextResponse.redirect(url);
    }

    try {
        const { payload } = await jwtVerify(session, key, {
            algorithms: ['HS256'],
        });

        const user = payload.user as { role: string };

        // Admin protection
        if (isAdminRoute && user.role !== 'ADMIN') {
            // If user is trying to access admin but not admin, redirect to home or show error
            // Or maybe they are manager? Let's check schema. Enum Role { ADMIN, MANAGER, CUSTOMER }
            if (user.role !== 'MANAGER') {
                return NextResponse.redirect(new URL('/', request.url));
            }
        }

        return NextResponse.next();
    } catch (error) {
        // Invalid session
        const url = new URL('/login', request.url);
        url.searchParams.set('callbackUrl', encodeURI(request.url));
        return NextResponse.redirect(url);
    }
}

export const config = {
    matcher: ['/cart/:path*', '/checkout/:path*', '/account/:path*', '/wishlist/:path*', '/admin/:path*', '/manager/:path*'],
};
