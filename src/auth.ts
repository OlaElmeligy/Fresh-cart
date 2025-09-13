import { NextAuthOptions } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { jwtDecode } from "jwt-decode";


export const authOptions : NextAuthOptions ={
    pages : {
        signIn : "/login"
    },
providers:[
    Credentials({
    name: "credentials" , 
    credentials : {
        email  :{ },
        password: {}
    },
    authorize : async (credentials) => {
        const response = await  fetch(`https://ecommerce.routemisr.com/api/v1/auth/signin`,{
            method : "POST",
            body : JSON.stringify({
                email : credentials?.email,
                password : credentials?.password

            }),

            headers: {"Content-Type" : "application/json"},

        });

        const payload = await response.json();
        console.log("payload",payload)

        if (payload.message === "success"){
            const decodedToken : {id : string}= jwtDecode(payload.token)
            return {
                id: decodedToken.id, 
                user: payload.user ,  // name,email,role
                token: payload.token}
        }else{
            throw new Error(payload.message || "wrong credentials")
        }
    },
}),
],

callbacks : {
    async jwt({ token, user }) {     

        if(user){
 // encrypted
        token.user = user?.user;
        token.token = user?.token;
        }
       
      return token; //object {user : user , token : token} encrypted ==> only server
    },
    async session({ session, token }) {
        session.user = token.user;
      return session
    },
}
};