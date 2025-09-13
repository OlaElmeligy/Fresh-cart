"use client"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import React from 'react'
import { useForm } from 'react-hook-form'
import { Button } from "@/components/ui/button"
import { zodResolver } from '@hookform/resolvers/zod'
// import axios from 'axios'
// import { useRouter } from 'next/navigation'
import { loginSchema, loginSchemaType } from '@/schema/login.schema'
import { toast } from "sonner"
 import {signIn} from "next-auth/react"
import Link from 'next/link'


export default function Login() {
  // let router = useRouter()

const form = useForm <loginSchemaType>({
  defaultValues:{
    "email":"",
    "password":"",
  },
  resolver: zodResolver(loginSchema),
});

async function handleLogin(values: loginSchemaType) {
  console.log(values);

//   try {
//     const response = await axios.post(
// "https://ecommerce.routemisr.com/api/v1/auth/signin",
//       values
//     );

//     if (response.data.message === "success") {
//       alert("Login successful!");
//       router.push("/")  instead of useNavigate in react
//     }
//   } catch (err: any) {
//     const errorMsg = err.response?.data?.message || err.message || "Registration failed";
//     alert(errorMsg);
//     console.error("Error:", errorMsg);
//   }

const response = await signIn("credentials" , {
  email : values.email,
  password : values.password,
  redirect: false,
  callbackUrl : "/"
});

if(response?.ok){
  toast.success("Login successful!" , {position: "top-center" , duration: 3000})
window.location.href = "/"   // won't use router push 3shan 3yzen n3ml reload hna
}else{
    toast.error(response?.error , {position: "top-center" , duration: 3000})

}
}


  return <>
  <div className='pt-30 flex items-center justify-center '>
    <div className='w-1/2'>
        <h1 className='text-3xl font-semibold mb-3'>Login </h1>

<Form {...form}>
  <form className="space-y-3" onSubmit={form.handleSubmit(handleLogin)}>

  <FormField
    control={form.control}
    name="email"
    render={({field}) => (
      <FormItem>
        <FormLabel > Email: </FormLabel>
        <FormControl>
         <Input {...field} placeholder="Email" type="email"/>
        </FormControl>       
        <FormMessage />
      </FormItem>
    )}
  />
    <FormField
    control={form.control}
    name="password"
    render={({field}) => (
      <FormItem>
        <FormLabel > Password: </FormLabel>
        <FormControl>
         <Input {...field} placeholder="Password" type="password"/>
        </FormControl>       
        <FormMessage />
      </FormItem>
    )}
  />
    
  <Button variant="outline" className='w-full cursor-pointer bg-green-200'>Login</Button>
  </form>  
</Form>
    </div>    
  </div>
       <hr className="my-6 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-8 w-1/2"/>

  <div className=' flex  w-1/2  mx-auto'>
    <p className='me-6 font-semibold'>New to Fresh cart?</p>
    <Link href="/register" className=' hover:underline text-emerald-950'>Register now</Link>
    </div>
 
  </>
}