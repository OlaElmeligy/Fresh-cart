"use server"
import getMyToken from "@/utilities/getMyToken"

export default async function updateCartQty(id:string, count:string){

    const token = await getMyToken()

    if(!token){
        throw new Error("??????")
    }

const response = await fetch(`https://ecommerce.routemisr.com/api/v1/cart/${id}`, {
method:"PUT",
headers:{
token: token,
"Content-Type": "application/json"
},
body: JSON.stringify({count})

})

const payload = response.json()
return payload
}