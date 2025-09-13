"use server"
import getMyToken from "@/utilities/getMyToken"

export default async function removeFromWishList(id : string){
const token = await getMyToken()
if(!token) throw new Error("???")

const res = await fetch (`https://ecommerce.routemisr.com/api/v1/wishlist/${id}`,{
method:"DELETE",
headers: {
    token,
    "Content-Type" : "application/json"
    }
})

const payload = res.json();
return payload;
}