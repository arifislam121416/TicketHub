 import { headers } from 'next/headers'
import { NextResponse } from "next/server";
import { auth } from './app/lib/auth';



export async function proxy(request){

 const session = await auth.api.getSession({
  headers: await headers()
 });
console.log(session);

 if(!session){
   return NextResponse.redirect(
    new URL("/login",request.url)
   );
 }


 if(
  request.nextUrl.pathname.startsWith("/dashboard/vendor")
  &&
  session.user.plan === "free"
 ){
   return NextResponse.redirect(
    new URL("/pricing",request.url)
   );
 }


 return NextResponse.next();

}

export const config = {
  matcher: [
    "/dashboard/vendor",
  ],
};