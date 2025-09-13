import Link from 'next/link'
import React from 'react'
import getAllCategories from '@/api/AllCategoriesApi'
import { CategoryType } from '@/types/category.type'
import Image from 'next/image'

export default async function Categories() {
  const res = await getAllCategories()

  return (
    <div className="pt-25 px-6 max-w-7xl mx-auto">
      <h2 className="text-center text-3xl font-bold mb-12">Shop by Category</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {res.data.map((category: CategoryType) => (
          <Link href={`/categories/${category._id}`} key={category._id}>
            <div className="cursor-pointer text-center p-4 border rounded-lg shadow hover:shadow-xl hover:scale-105 transition-transform duration-200">
              <Image
                className="w-full h-40 object-cover mb-4 rounded"
                src={category.image}
                alt={category.name}
                width={300}
                height={280}
              />
              <h3 className="text-xl font-semibold text-gray-800">{category.name}</h3>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}
