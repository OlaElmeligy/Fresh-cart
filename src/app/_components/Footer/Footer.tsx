import React from 'react'
import logo from "../../../../public/images/images/freshcart-logo.svg"
import Image from 'next/image'
import Link from 'next/link'

export default function Footer() {
  return  <>
     
<div className="bg-white dark:bg-gray-900">
  <div className="mx-auto w-full max-w-screen-xl p-4 py-6 lg:py-8">
                <hr className="my-6 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-8" />

    <div className="md:flex md:justify-between">
      <div className="mb-6 md:mb-0">

        <Link href="/" className="flex items-center">
          <Image src={logo} className="h-8" alt="Freshcart Logo" />
        </Link>
      </div>
      <div className="grid grid-cols-2 gap-8 sm:gap-6 sm:grid-cols-3 ">
        <div className=' me-3'>
          <h2 className="mb-3  text-sm font-semibold text-gray-900 uppercase dark:text-white">CUSTOMER SERVICES</h2>
          <ul className="text-gray-500 dark:text-gray-400 font-medium">
            <li className="mb-4">
              <Link href="https://flowbite.com/" className="hover:underline">Contact Us</Link>
            </li>
            <li>
              <Link href="https://tailwindcss.com/" className="hover:underline">Help Center</Link>
            </li>
          </ul>
        </div>
        <div>
          <h2 className="mb-3 text-sm font-semibold text-gray-900 uppercase dark:text-white">About</h2>
          <ul className="text-gray-500 dark:text-gray-400 font-medium">
            <li className="mb-4">
              <Link href="https://github.com/themesberg/flowbite" className="hover:underline ">About FreshCart</Link>
            </li>
            <li>
              <Link href="https://discord.gg/4eeurUVvTy" className="hover:underline">Careers</Link>
            </li>
          </ul>
        </div>
        <div>
          <h2 className="mb-3 text-sm font-semibold text-gray-900 uppercase dark:text-white"> POLICIES</h2>
          <ul className="text-gray-500 dark:text-gray-400 font-medium">
            <li className="mb-4">
              <Link href="#" className="hover:underline">Privacy Policy</Link>
            </li>
            <li>
              <Link href="#" className="hover:underline">Terms &amp; Conditions</Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
    <hr className="my-6 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-8" />
    <div className="sm:flex sm:items-center sm:justify-between">
      <span className="text-sm text-gray-500 sm:text-center dark:text-gray-400">© 2023 <a href="https://flowbite.com/" className="hover:underline">FreshCart™</a>. All Rights Reserved.
      </span>
      <div className="flex justify-center space-x-6">
  <Link href="https://www.facebook.com" target="_blank" aria-label="Facebook">
    <i className="fab fa-facebook-f text-gray-500 hover:text-blue-600 text-xl"></i>
  </Link>
  <Link href="https://www.twitter.com" target="_blank" aria-label="Twitter">
    <i className="fab fa-twitter text-gray-500 hover:text-blue-400 text-xl"></i>
  </Link>
  <Link href="https://www.instagram.com" target="_blank" aria-label="Instagram">
    <i className="fab fa-instagram text-gray-500 hover:text-pink-500 text-xl"></i>
  </Link>
  <Link href="https://www.tiktok.com" target="_blank" aria-label="TikTok">
    <i className="fab fa-tiktok text-gray-500 hover:text-black text-xl"></i>
  </Link>
  <Link href="https://www.youtube.com" target="_blank" aria-label="YouTube">
    <i className="fab fa-youtube text-gray-500 hover:text-red-600 text-xl"></i>
  </Link>
</div>

    </div>
  </div>
</div>
    </>
  
}
