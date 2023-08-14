import { NextResponse } from "next/server";

export function middleware(request) {
    // console.log(request.cookies.get("token"))
    // console.log('request.nextUrl.pathname', request.url)
    // console.log('request.nextUrl.pathname', request.nextUrl.pathname)
    if (request.nextUrl.pathname.startsWith("/login") || 
    request.nextUrl.pathname.startsWith("/sign-up")
    ){
        if(request.cookies.has("token")) {
          const loginUrl = new URL('/', request.url)
          return NextResponse.redirect(loginUrl)
      } 
    }
    if (request.nextUrl.pathname.startsWith("/profile") || 
        request.nextUrl.pathname.startsWith("/my-bonus") || 
        request.nextUrl.pathname.startsWith("/my-order")
    ){
        if(!request.cookies.has("token")) {
          const loginUrl = new URL('/login', request.url)
          return NextResponse.redirect(loginUrl)
      } 
    }
  }