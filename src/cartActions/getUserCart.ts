"use server"
import getMyToken from "@/utilities/getMyToken"

export default async function getUserCart(){

    const token = await getMyToken()

    if(!token){
        throw new Error("Please login to be able to see cart")
    }

const response = await fetch("https://ecommerce.routemisr.com/api/v1/cart", {
method:"GET",
headers:{
token: token,
"Content-Type": "application/json"
},

})

const payload = response.json()
return payload
}

