import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  const idCookie = request.cookies.get("id");
  const id = idCookie?.value.toString();

//   const userrole = request.cookies.get("role");
//   const role = userrole?.value.toString();
  if (id && request.nextUrl.pathname.startsWith("/login")) {
    return NextResponse.redirect(new URL("dashboard/", request.url));
  } else if (!id && request.nextUrl.pathname.startsWith("/dashboard")) {
    return NextResponse.redirect(new URL("/login", request.url));
  }
}
