import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

export async function middleware(request: NextRequest) {
    const token = await getToken({ req: request })

    if (token) {

        if (request.nextUrl.pathname === "/login" || request.nextUrl.pathname === "/register") {
            return NextResponse.redirect(new URL("/", request.url))

        }
        else {
            return NextResponse.next()  //go to place user want 
        }

    }
    else {
        if (request.nextUrl.pathname === "/cart" || request.nextUrl.pathname === "/checkout") {
            return NextResponse.redirect(new URL("/login", request.url))
        }
        else {
            return NextResponse.next()  //go to place user want 

        }
    }}

    export const config = {
        matcher: ["/cart","/login","/register","/checkout"]
    }