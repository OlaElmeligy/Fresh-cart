'use client';

import { CategoryType } from '@/types/category.type';
import Image from 'next/image';
import React from 'react';

export default function Slider({ data } : {data : CategoryType[]}) {
  const repeatedData = [...data, ...data]; // Duplicate for infinite loop

  return <>
    <div className="overflow-hidden w-[90%] mx-auto  py-4 mt-1">
      <div className="animate-slide flex w-max gap-4">
        {repeatedData.map((category, index) => (
          <div
            key={index}
            className="w-[14.28vw] min-w-[14.28vw] flex-shrink-0 text-center"
          >
            <div className="relative w-[100%] max-h-96 pb-[100%]">
              <Image
                src={category.image}
                alt={`thumb-${category._id}-${index}`}
                fill
                sizes='250px'
                className="object-cover rounded"                
              />
            </div>
            <div className="mt-2 text-sm font-medium text-gray-700 truncate">
              {category.name}
            </div>
          </div>
        ))}
      </div>

      <style jsx>{`
        @keyframes slide {
          0% {
            transform: translateX(0%);
          }
          100% {
            transform: translateX(-50%);
          }
        }

        .animate-slide {
          animation: slide 30s linear infinite;
        }
      `}</style>
    </div>
  </>
}
