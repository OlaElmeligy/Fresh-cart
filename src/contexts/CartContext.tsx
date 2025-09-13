"use client"
import getUserCart from '@/cartActions/getUserCart'
import { CartProductType } from '@/types/cart.type'
import { CartContextType } from '@/types/cartContext';
import { createContext, useEffect, useState } from 'react'



// Props interface for the provider component
export interface CartContextProviderProps {
  children: React.ReactNode;
}

export const CartContext = createContext<CartContextType | undefined>(undefined)


export default function CartContextProvider({ children } : CartContextProviderProps) {
  const [numOfCartItem, setNumOfCartItem] = useState(0)
async function getCart() {
  try{
    const res = await getUserCart()
              // console.log("answer", res)

    if (res.status === "success"){
// console.log(res.data.products)
      let sum = 0;
res.data.products.forEach((product:CartProductType)=> {sum += product.count})
setNumOfCartItem(sum);  
}
  } catch {
console.log("??????")
  }
}

  useEffect(() => {
    getCart()
  }, [])

  return (
    <CartContext.Provider value={{ numOfCartItem,setNumOfCartItem }}>
      {children}
    </CartContext.Provider>
  )
}

