"use client"
import React, { useContext } from 'react'
import logo from "../../../../public/images/images/freshcart-logo.svg"
import Image from 'next/image'
import Link from 'next/link'
import { signOut, useSession } from 'next-auth/react'
import { CartContext } from '@/contexts/CartContext'
import Script from 'next/script'


export default function Navbar() {
const context = useContext(CartContext)

if(!context) throw new Error("not exist")

const {numOfCartItem} = context

  const { data: session, /*status*/ } = useSession()
  // console.log(session)
  // console.log(status)



  function logout() {
    signOut({ callbackUrl: "/login" })
  }

  return <>
  
              <Script src="https://cdn.jsdelivr.net/npm/flowbite@3.1.2/dist/flowbite.min.js"></Script>

    <nav className="bg-white dark:bg-gray-900 fixed w-full z-20 top-0 start-0 border-b border-gray-200 dark:border-gray-600">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <Link href="/" className="flex items-center space-x-3 rtl:space-x-reverse">
          <Image src={logo} className="h-8" alt="Freshcart Logo" />
        </Link>
        <div className="flex md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
          {session && <div className=" font-medium px-4 py-2  flex items-center justify-center">
            Hello, {session?.user.name}
          </div>}

          
          {!session ? (
            <div className="flex space-x-1.5">   <Link href="/login" className="text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-4 py-2 text-center dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">Login </Link>
            </div> ) : (
            <span onClick={logout} className="cursor-pointer text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-4 py-2 text-center dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">
              Sign Out
            </span> )}


            <Link href = "/cart" className="relative flex items-center justify-center ms-5">
            <i className="fas fa-shopping-cart text-2xl text-gray-700 hover:text-gray-900 "></i>

            {/* Counter Badge */}
            <span className="absolute -top-1 -right-1 bg-red-600 text-white text-xs font-bold rounded-full px-1.5 py-0.5 ">
                {numOfCartItem}
          </span>
          </Link>

          <button data-collapse-toggle="navbar-sticky" type="button" className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600" aria-controls="navbar-sticky" aria-expanded="false">
            <span className="sr-only">Open main menu</span>
            <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
              <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M1 1h15M1 7h15M1 13h15" />
            </svg>
          </button>
        </div>
        <div className="items-center justify-between hidden w-full md:flex md:w-auto md:order-1" id="navbar-sticky">
          <ul className="flex flex-col p-4 md:p-0 mt-4 font-medium border border-gray-100 rounded-lg bg-gray-50 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
            
            <li>
              <Link href="/products" className="block py-2 px-3 text-gray-900 rounded-sm hover:bg-gray-100 md:hover:bg-transparent md:hover:text-green-700 md:p-0 md:dark:hover:text-green-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">Products</Link>
            </li>
            <li>
              <Link href="/categories" className="block py-2 px-3 text-gray-900 rounded-sm hover:bg-gray-100 md:hover:bg-transparent md:hover:text-green-700 md:p-0 md:dark:hover:text-green-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">Categories</Link>
            </li>
            <li>
              <Link href="/brands" className="block py-2 px-3 text-gray-900 rounded-sm hover:bg-gray-100 md:hover:bg-transparent md:hover:text-green-700 md:p-0 md:dark:hover:text-green-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">Brands</Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  </>
}
