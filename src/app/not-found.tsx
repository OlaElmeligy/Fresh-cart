import React from 'react'
import Image from 'next/image'
import notfound from "../../public/images/images/error.svg"

export default function NotFound() {
  return (
    <div  className="h-screen w-screen flex items-center justify-center"><Image src={notfound} alt='not found 404'/></div>
  )
}
