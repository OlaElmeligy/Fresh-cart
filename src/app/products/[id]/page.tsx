"use client"

import React, {  useState } from 'react'
import Image from 'next/image'
import { ProductType } from '@/types/product.type'
import AddBtnPDP from '@/app/_components/AddBtnPDP/AddBtnPDP'
import WishlistButton from '@/app/_components/WishListBtn/WishListBtn'

export default function ProductDetails({ params }  : {params : Promise<{id : string}>}) {
  const [productData, setProductData] = useState<ProductType | null>(null)
  const [selectedImageIndex, setSelectedImageIndex] = useState(0)
  const [quantity, setQuantity] = useState<number>(1)
  const [loading, setLoading] = useState<boolean>(true)

  // Fetch product data on component mount
  React.useLayoutEffect(() => {
    const fetchProduct = async () => {
      try {
  const { id } = await params; 
        const response = await fetch(`https://ecommerce.routemisr.com/api/v1/products/${id}`)
        const { data } = await response.json()

        setProductData(data)
        setLoading(false)
      } catch (err) {
        // console.error('Error fetching product:', error)

        setLoading(false)
      }
    }
    fetchProduct()
  }, [params])

  // Quantity handlers
  const handleIncrement = () => setQuantity(prev => prev + 1)
  const handleDecrement = () => setQuantity(prev => Math.max(1, prev - 1))
  const handleQuantityChange = (e : React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value) || 1
    setQuantity(Math.max(1, value))
  }

  if (loading) {
    return (
      <div className="pt-30 min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-500"></div>
      </div>
    )
  }

  if (!productData) {
    return (
      <div className="pt-30 min-h-screen flex items-center justify-center">
        <p className="text-gray-500">Product not found</p>
      </div>
    )
  }

  const data = productData
  const allImages = [data.imageCover, ...(data.images || [])]
  const selectedImage = allImages[selectedImageIndex]

  return (
    <div className="pt-30">
      <div className="max-w-screen-xl px-4 mx-auto 2xl:px-0">
        <div className="lg:grid lg:grid-cols-2 lg:gap-8 xl:gap-16">
          {/* Product Images */}
          <div className="shrink-0 max-w-md lg:max-w-lg mx-auto">
            {/* Main Image */}
            <div className="relative overflow-hidden rounded-lg bg-gray-100">
              <Image 
                src={selectedImage} 
                alt="Product Image"
                width={500}
                height={400}
                className="w-full h-96 object-cover transition-all duration-300 hover:scale-105" 
                priority
              />
            </div>
            
            {/* Thumbnail Gallery */}
            <div className="flex mt-4 space-x-3 justify-center">
              {allImages.map((imgSrc, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImageIndex(index)}
                  className={`w-16 h-16 cursor-pointer overflow-hidden border-2 rounded-lg transition-all duration-200 hover:scale-105 ${
                    index === selectedImageIndex 
                      ? 'border-green-500 ring-2 ring-green-200' 
                      : 'border-gray-200 hover:border-gray-400'
                  }`}
                >
                  <Image
                    src={imgSrc}
                    alt={`Thumbnail ${index + 1}`}
                    width={64}
                    height={64}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Product Info */}
          <div className="mt-6 sm:mt-8 lg:mt-0">
            {/* Category */}
            <span className="bg-green-100 text-green-800 text-xs font-medium px-2.5 py-1.5 rounded-full">
              {data.category.name}
            </span>
            
            {/* Product Name */}
            <h1 className="text-xl font-semibold text-gray-900 sm:text-2xl mt-4">
              {data.title}
            </h1>
            
            {/* Rating */}
            <div className="flex items-center gap-2 mt-4">
              <div className="flex items-center">
                {[...Array(5)].map((_, i) => (
                  <i 
                    key={i}
                    className={`fas fa-star text-sm ${
                      i < Math.floor(data.ratingsAverage) 
                        ? 'text-yellow-500' 
                        : 'text-gray-300'
                    }`}
                  />
                ))}
              </div>
              <p className="text-sm font-medium leading-none text-gray-500">
                ({data.ratingsAverage})
              </p>
              <span className="text-sm font-medium leading-none text-gray-900">
                {data.ratingsQuantity} reviews
              </span>
            </div>
            
            {/* Price */}
            <div className="mt-4">
              <p className="text-2xl font-extrabold text-gray-900 sm:text-3xl">
                {data.price} EGP
              </p>    
            </div>
            
            {/* Product Description */}
            <div className="mt-6">
              <p className="text-gray-600 leading-relaxed">
                {data.description}
              </p>
            </div>
            
            {/* Add to Cart Section */}
            <div className="mt-8 space-y-4">
              {/* Quantity */}
              <div>
                <div className="mt-6">
              <p className="text-gray-600 leading-relaxed mb-2 font-semibold">
               <span>Stock: </span> 
               <span className={`font-normal  ${data.quantity > 0 ? "text-green-600" : "text-red-600"}`} > {data.quantity > 0? `${data.quantity} available`: "Out of stock"}</span>
               
               
              
              </p>
            </div>
                <label className="block mb-2 text-sm font-medium text-gray-900">
                  Choose quantity:
                </label>
                <div className="flex items-center space-x-3">
                  <button 
                    type="button" 
                    onClick={handleDecrement}
                    className="flex-shrink-0 bg-gray-100 hover:bg-gray-200 inline-flex items-center justify-center border border-gray-300 rounded-md h-8 w-8 focus:ring-gray-100 focus:ring-2 focus:outline-none transition-colors"
                  >
                    <svg className="w-3 h-3 text-gray-900" fill="none" viewBox="0 0 18 2">
                      <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M1 1h16" />
                    </svg>
                  </button>
                  
                  <input 
                    value={quantity}
                    onChange={handleQuantityChange}
                    className="flex-shrink-0 text-gray-900 border border-gray-300 bg-gray-50 text-sm font-normal focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 w-16 text-center py-1.5 rounded-md" 
                    min="1"
                  />
                  
                  <button 
                    type="button" 
                    onClick={handleIncrement}
                    className="flex-shrink-0 bg-gray-100 hover:bg-gray-200 inline-flex items-center justify-center border border-gray-300 rounded-md h-8 w-8 focus:ring-gray-100 focus:ring-2 focus:outline-none transition-colors"
                  >
                    <svg className="w-3 h-3 text-gray-900" fill="none" viewBox="0 0 18 18">
                      <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 1v16M1 9h16" />
                    </svg>
                  </button>
                </div>
              </div>
              
              {/* Add to Cart Button */}
              <AddBtnPDP  id = {data.id}/>
            </div>
            
            {/* Secondary Actions */}
            <div className="flex items-center gap-3 mt-6">
             

                        <WishlistButton id={data.id} />



              <button type="button" className="flex-1 inline-flex items-center justify-center py-2.5 px-5 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-600 focus:z-10 focus:ring-4 focus:ring-gray-100 transition-colors">
                <svg className="w-4 h-4 me-2" fill="none" viewBox="0 0 24 24">
                  <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.651 7.65a7.131 7.131 0 0 0-12.68 3.15M18.001 4v4h-4m-7.652 8.35a7.13 7.13 0 0 0 12.68-3.15M6 20v-4h4" />
                </svg>
                Compare
              </button>
            </div>
            
            {/* Shipping Info */}
            <hr className="my-6 md:my-8 border-gray-200" />
            <div className="space-y-4">         
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5 text-green-500" fill="none" viewBox="0 0 24 24">
                  <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M6 14h2m3 0h5M3 7v10a1 1 0 0 0 1 1h16a1 1 0 0 0 1-1V7a1 1 0 0 0-1-1H4a1 1 0 0 0-1 1Z" />
                </svg>
                <span className="text-sm text-gray-600">Cancel at any time</span>
              </div>
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5 text-green-500" fill="none" viewBox="0 0 24 24">
                  <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.5 11.5 11 14l4-4m6 2a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                </svg>
                <span className="text-sm text-gray-600">30 days return policy</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}