"use server"

import { checkoutSchemaType } from "@/schema/checkout.schema";
import getMyToken from "@/utilities/getMyToken";


export default async function onlinePayment(cartId: string , url= process.env.NEXT_URL, formvalues: checkoutSchemaType) {
    const token = await getMyToken();
if(!token) throw new Error("????")

  const res = await  fetch(`https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartId}?url=${url}` ,{
method : "POST",
headers:{
token,
"Content-Type" : "application/json"

},
body: JSON.stringify({shippingaddress: formvalues})
  })

  const payload = await res.json()
  return payload
}