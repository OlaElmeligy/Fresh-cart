"use server"

import { decode } from "next-auth/jwt";
import { cookies } from "next/headers";

export default async function getMyToken(){
try{
    const codedToken = 
(await cookies()).get("next-auth.session-token")?.value || //bygeb el seesion or token  mn el browser lw fat7a mn el local
(await cookies()).get("___Secure-next-auth.session-token")?.value; //3shan ysht3'l 3l production .. bygeb el session mn el server

if(!codedToken) return null

const decodedToken = await decode({token:codedToken, secret : process.env.NEXTAUTH_SECRET!})

//console.log(decodedToken) // must be left commented .. just used if you need it in console to use it

return decodedToken?.token || null;
}
catch{
    return null;
}

}