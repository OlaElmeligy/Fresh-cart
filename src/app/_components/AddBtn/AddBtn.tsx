"use client"
import addTocart from '@/cartActions/addToCart'
import { CartContext } from '@/contexts/CartContext'
import React, { useContext } from 'react'
import { toast } from 'sonner'

export default function AddBtn({ id }: { id: string }) {

const context = useContext(CartContext)

if(!context) throw new Error("not exist")
  const { numOfCartItem, setNumOfCartItem } = context

  async function checkAddToCart(id: string) { //3shan a3rf ageb el response

    const response = await addTocart(id)
    // console.log("product", response)
    if (response.status === "success") {
      toast.success("Product added successfully", { position: "top-center", duration: 2000 })
      setNumOfCartItem(numOfCartItem + 1)
    }
    else {
      toast.error("Please login to be able to sign in", { position: "top-center", duration: 2000 })
    }

  }

  return (
    <button onClick={() => checkAddToCart(id)} //msh func addtocart 3la tol lazm checkaddtocart 3shan a3rf ageb el response 
      className="text-white bg-green-700 hover:bg-green-800 cursor-pointer focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-4 py-2.5 text-center dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800 transition-colors duration-200 whitespace-nowrap"
    >
      Add to cart
    </button>
  )
}
