'use client'

import { ProductType } from '@/types/product.type'
import Image from 'next/image'
import Link from 'next/link'
import React, { useState, useLayoutEffect } from 'react'
import AddBtn from '../../_components/AddBtn/AddBtn'

export default function CategorizedProducts({ params }: { params: Promise<{ id: string }> }) {
  const [products, setProducts] = useState<ProductType[]>([])
    const [loading, setLoading] = useState<boolean>(true)
  

  useLayoutEffect(() => {
    const fetchProduct = async () => {
      try {
        const { id } = await params
        const response = await fetch(`https://ecommerce.routemisr.com/api/v1/products?category[in]=${id}`)
        const { data } = await response.json()
        setProducts(data) // ✅ store products in state
        setLoading(false)
      } catch (error) {
        console.error('Error fetching products:', error)
                setLoading(false)

      }
    }

    fetchProduct()
  }, [params])


if (loading) {
    return (
      <div className="pt-30 min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-500"></div>
      </div>
    )
  }

  return  <>
  {products.length > 0 ? <>{products.length > 0 && (
  <h2 className="text-center pt-25 text-3xl font-bold mb-5">
    {products[0].category.name}
  </h2>
)}
      <div className="flex flex-wrap container mx-auto p-3 gap-6 justify-center">
        {products.map((product: ProductType) => (
          <div
            className="w-full xs:w-1/2 sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/5 2xl:w-1/6 flex-shrink-0"
            key={product.id}
            style={{ minWidth: '250px', maxWidth: '300px' }}
          >
            <div className="w-full h-full bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-lg transition-shadow duration-300 dark:bg-gray-800 dark:border-gray-700 flex flex-col">
              <Link href={`/products/${product.id}`} className="block">
                <Image
                  className="p-6 rounded-t-lg w-full h-70 object-cover hover:scale-105 transition-transform duration-300"
                  src={product.imageCover}
                  alt={product.title}
                  width={300}
                  height={280}
                />
              </Link>
              <div className="px-5 pb-5 flex-1 flex flex-col">
                <a href="#" className="block mb-2">
                  <h5 className="text-sm font-extralight tracking-tight text-green-700 dark:text-green-400 uppercase">
                    {product.category.name}
                  </h5>
                </a>
                <p className="text-gray-900 dark:text-white font-bold font-serif text-lg mb-3 line-clamp-2 flex-1">
                  {product.title}
                </p>
                <div className="flex items-center mt-2 mb-4">
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <i
                        key={i}
                        className={`fas fa-star text-sm ${
                          i < Math.floor(product.ratingsAverage)
                            ? 'text-yellow-500'
                            : 'text-gray-300 dark:text-gray-600'
                        }`}
                      />
                    ))}
                  </div>
                  <span className="bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-0.5 rounded-full dark:bg-blue-200 dark:text-blue-800 ml-3">
                    {product.ratingsAverage}
                  </span>
                </div>
                <div className="flex items-center justify-between mt-auto">
                  <span className="text-xl font-bold text-gray-900 dark:text-white">
                    {product.price} EGP
                  </span>
                  <AddBtn id={product.id} />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div></> :
<div className="pt-30 text-2xl flex items-center justify-center ">
        <p className="text-gray-500">No Products Found</p>
      </div>}

    </>
  
}
