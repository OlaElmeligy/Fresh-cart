import Link from 'next/link'
import React from 'react'
import Image from 'next/image'
import getAllBrands from '@/api/BrandsApi'
import { BrandType } from '@/types/brand.type'

export default async function Brands() {
  const res = await getAllBrands()

  return <>
    <div className="pt-25 px-6 max-w-7xl mx-auto">
      <h2 className="text-center text-3xl font-bold mb-12">Shop by Brand</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {res.data.map((brand : BrandType) => (
          <Link href={`/brands/${brand._id}`} key={brand._id}>
            <div className="cursor-pointer text-center p-4 border rounded-lg shadow hover:shadow-xl hover:scale-105 transition-transform duration-200">
              <Image
                className="w-full h-40 object-cover mb-4 rounded"
                src={brand.image}
                alt={brand.name}
                width={300}
                height={280}
              />
              <h3 className="text-xl font-semibold text-gray-800">{brand.name}</h3>
            </div>
          </Link>
        ))}
      </div>
    </div>
  </>
}
