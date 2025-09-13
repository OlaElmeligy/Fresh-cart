/*eslint-disable*/

"use client"
import getUserCart from '@/cartActions/getUserCart'
import removeCartItem from '@/cartActions/removeCartItem'
import updateCartQty from '@/cartActions/updateCartQty'
import { CartContext } from '@/contexts/CartContext'
import { CartProductType } from '@/types/cart.type'
import Image from 'next/image'
import Link from 'next/link'
import React, { useContext, useEffect, useState } from 'react'
import { toast } from 'sonner'


export default function Cart() {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [removeDisable, setRemoveDisable]=useState(false)
  const [updateDisable, setUpdatedisable] = useState(false)
  const[cartId, setCartId] = useState("")

const context = useContext(CartContext)

if(!context) throw new Error("not exist")

  const {numOfCartItem, setNumOfCartItem} = context

  // let session = await getServerSession(authOptions) ==> IF SERVER COMPONENT
  // if(!session){
  //   redirect("/login")
  // }

  // adding items
  async function getUserCartPayload() { //3shan mynf3sh a5ly el comp async

    try {
      setLoading(true)
      const response = await getUserCart()

      if (response.status === "success") {
        setProducts(response.data.products)

setCartId(response.cartId)
        // console.log("add:" , response)
      }
    }
    catch (err) {
      console.log(err)
    }
    finally {
      setLoading(false)
    }
  }

// removing items
async function removeItem(id:string) {
        setRemoveDisable(true)
  setUpdatedisable(true)

  const res = await removeCartItem(id)

if(res.status==="success"){
  setProducts(res.data.products)
          // console.log("del:", res.data.products)

  toast.success("Product Deleted Successfully",{position: "top-center", duration: 3000})
        setRemoveDisable(false)
  setUpdatedisable(false)

  let sum = 0 ;
res.data.products.forEach((product:CartProductType) => {sum += product.count})
setNumOfCartItem(sum)

}else{
  toast.error("Can't delete this product",{position: "top-center", duration: 3000})
        setRemoveDisable(false)
  setUpdatedisable(false)

}
}

//updating items
async function updateItem(id:string , count: string , sign : string) {
  setUpdatedisable(true)
  setRemoveDisable(true)
  const res = await updateCartQty(id,count)

  // console.log("qty:", res)
  if (res.status === "success"){
    setProducts(res.data.products)    
      setUpdatedisable(false)
  setRemoveDisable(false)

  }

if(sign === "+"){
  setNumOfCartItem(numOfCartItem + 1)
}

else if (sign === "-"){
    setNumOfCartItem(numOfCartItem - 1)

}

}

  useEffect(() => { getUserCartPayload() }, []) //payload is the token got from the get user cart (cart action)

  // Calculate total price
  const calculateTotal = () => {
    return products.reduce((total, product:CartProductType) => {
      return total + (product.price * product.count)
    }, 0).toFixed(2)
  }

  //Calculate total items
  const getTotalItems = () => {
    return products.reduce((total, product:CartProductType) =>    total + product.count, 0)
  }

  if (loading) {
    return (
      <div className="container mx-auto px-4 pb-12 pt-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading your cart...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 pb-8 pt-25">
      <h1 className="text-3xl font-bold mb-8 text-gray-800">Shopping Cart</h1>
      
      {products.length === 0 ? (
        <div className="text-center py-12">
          <div className="text-6xl mb-4">🛒</div>
          <h2 className="text-2xl font-semibold text-gray-600 mb-2">Your cart is empty</h2>
          <p className="text-gray-500 mb-6">Looks like you haven't added anything to your cart yet.</p>
         <Link href={"/products"}>
         <button className="cursor-pointer bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors">
            Continue Shopping
          </button>
         </Link> 
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-sm border">
              <div className="p-6 border-b">
                <h2 className="text-xl font-semibold">Cart Items ({getTotalItems()})</h2>
              </div>

              <div className="divide-y">
                {products.map((product:CartProductType) => (
                  <div key={product.product._id} className="p-6">
                    <div className="flex items-center space-x-4">
                      {/* Product Image */}
                      <div className="flex-shrink-0">
                        <Image
                          src={product.product.imageCover || '/placeholder-image.jpg'}
                          alt={product.product.title}
                          className="w-20 h-20 object-cover rounded-md border"
                          
                        />
                      </div>
                      
                      {/* Product Details */}
                      <div className="flex-1 min-w-0">
                        <h3 className="text-lg font-medium text-gray-900 truncate">
                          {product.product.title}
                        </h3>
                        {/* <p className="text-gray-500 text-sm mt-1">
                          
                          {product.product.name && product.description.substring(0, 100)}
                          {product.description && product.description.length > 100 && '...'}
                        </p> */}
                        <div className="flex items-center mt-2 space-x-4">
                          <span className="text-lg font-semibold text-gray-900">
                            ${product.price}
                          </span>
                          <span className="text-sm text-gray-500">
                            Quantity: {product.count}
                          </span>
                        </div>
                      </div>
                      
                      {/* Quantity & Remove */}
                      <div className="flex flex-col items-end space-y-2">
                        <div className="flex items-center space-x-2">
                          <button disabled={updateDisable} onClick={()=> updateItem(product.product.id, `${product.count - 1}` , "-")} className="disabled:cursor-default disabled:bg-gray-50 cursor-pointer w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-50">
                            <span className=" text-lg">-</span>
                          </button>
                          <span className="w-12 text-center font-medium">{product.count}</span>
                          <button disabled={updateDisable} onClick={()=> updateItem(product.product.id,`${product.count + 1}`, "+")} className="disabled:cursor-default disabled:bg-gray-50 cursor-pointer w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-50">
                            <span className=" text-lg">+</span>
                          </button>
                        </div>
                        <button disabled={removeDisable} onClick={()=> removeItem(product.product.id)} className=" disabled:text-gray-500 disabled:cursor-default cursor-pointer text-red-500 hover:text-red-700 text-sm font-medium">
                          Remove
                        </button>
                      </div>
                    </div>
                    
                    {/* Item Total */}
                    <div className="mt-4 text-right">
                      <span className="text-lg font-semibold">
                        Subtotal: ${(product.price * product.count).toFixed(2)}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          
          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-sm border p-6 sticky top-4">
              <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
              
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">Subtotal</span>
                  <span className="font-medium">${calculateTotal()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Shipping</span>
                  <span className="font-medium">Free</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Tax</span>
                  <span className="font-medium">$0.00</span>
                </div>
                <div className="border-t pt-3">
                  <div className="flex justify-between text-lg font-semibold">
                    <span>Total</span>
                    <span>${calculateTotal()}</span>
                  </div>
                </div>
              </div>
              
              <Link href={`/checkout/${cartId}`}>
               <button className="cursor-pointer w-full mt-6 bg-green-600 text-white py-3 px-4 rounded-lg hover:bg-green-700 transition-colors font-semibold">
                Proceed to Checkout
              </button>
              </Link>
             
              
             <Link href={"/products"}><button className="cursor-pointer w-full mt-3 border border-gray-300 text-gray-700 py-3 px-4 rounded-lg hover:bg-gray-50 transition-colors">
                Continue Shopping
              </button></Link> 
            </div>
          </div>
        </div>
      )}
    </div>
  )
}