"use server" // 3shan 7ata lw 3mlt lel func de call fe client component  el func de tfdl mtnfza fel server
import getMyToken from "@/utilities/getMyToken"

export default async function addTocart(id:string){

   try{
     const token =await getMyToken()

    if(!token){
       throw new Error("Please login to be able to add product")
    }

const response = await fetch("https://ecommerce.routemisr.com/api/v1/cart", {
method:"POST",
headers:{
token: token,
"Content-Type": "application/json"
},
body : JSON.stringify({productId:id})

})

const payload = response.json()
return payload
}
catch(err){
    return err
}
   }