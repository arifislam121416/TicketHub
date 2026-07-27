import { NextResponse } from 'next/server'
 
// This function can be marked `async` if using `await` inside
export async function proxy(request) {
  const session = await auth.api.getSession(new URL("/signIn", request.url))
  console.log("Session in proxy:", session);
  if (!session) {
    return NextResponse.redirect(new URL("/signIn", request.url));
  }
  if(session.user.plan === "free") {
    return NextResponse.redirect(new URL("/payment", request.url));
  }
  return NextResponse.redirect(new URL('/dashboard', request.url))
}
 
// Alternatively, you can use a default export:
// export default function proxy(request) { ... }
 
export const config = {
  matcher: '/dashboard/vendor',
}

