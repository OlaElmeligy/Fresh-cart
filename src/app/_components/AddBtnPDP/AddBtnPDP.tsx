"use client"
import addTocart from '@/cartActions/addToCart'
import { CartContext } from '@/contexts/CartContext'
import React, { useContext } from 'react'
import { toast } from 'sonner'

export default function AddBtnPDP({id} : {id : string}) {
const context = useContext(CartContext)

if(!context) throw new Error("not exist")

    const {numOfCartItem, setNumOfCartItem} = context
  

async function checkAddToCart(id : string){

   const response = await addTocart(id)
       console.log("product", response)
       if (response.status === "success") {
         toast.success("Product added successfully", { position: "top-center", duration: 2000 })
         setNumOfCartItem(numOfCartItem + 1)
       }
       else {
         toast.error(response.message, { position: "top-center", duration: 2000 })
       }   
     }

  return (
    <button  onClick={()=> checkAddToCart(id)}
                type="button" 
                className="cursor-pointer w-full text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-3 focus:outline-none flex items-center justify-center transition-colors"
              >
                <svg className="w-5 h-5 -ms-2 me-2" fill="none" viewBox="0 0 24 24">
                  <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4h1.5L8 16m0 0h8m-8 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm8 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm.75-3H7.5M11 7H6.312M17 4v6m-3-3h6" />
                </svg>
                Add to cart 
              </button>




   
  )
}
