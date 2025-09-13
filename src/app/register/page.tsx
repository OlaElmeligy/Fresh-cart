"use client"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import React from 'react'
import { useForm } from 'react-hook-form'
import { Button } from "@/components/ui/button"
import { registerSchema, registerSchemaType } from '@/schema/register.schema'
import { zodResolver } from '@hookform/resolvers/zod'
import axios, { AxiosError } from 'axios'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'



export default function Register() {
  const router = useRouter()

const form = useForm <registerSchemaType>({
  defaultValues:{
    "name": "",
    "email":"",
    "password":"",
    "rePassword":"",
    "phone":""
  },
  resolver: zodResolver(registerSchema),
});

async function handleRegister(values: registerSchemaType) {
  // console.log(values);

  try {
    const response = await axios.post(
"https://ecommerce.routemisr.com/api/v1/auth/signup",
      values
    );

    if (response.data.message === "success") {
        toast.success("Registration successful!", {position: "top-center" , duration: 3000})
      
      router.push("/login")
    }
  } catch (err: unknown) {
    if(err instanceof AxiosError){
const errorMsg = err.response?.data?.message || err.message || "Registration failed";
        toast.error(errorMsg , {position: "top-center" , duration: 3000})
        console.error("Error:", errorMsg);
    }
    
  }
}


  return <>
  <div className='pt-22 flex items-center justify-center '>
    <div className='w-1/2'>
        <h1 className='text-3xl font-semibold mb-3'>Register </h1>

<Form {...form}>
  <form className="space-y-3" onSubmit={form.handleSubmit(handleRegister)}>
<FormField
    control={form.control}
    name="name"
    render={({field}) => (
      <FormItem>
        <FormLabel > Name: </FormLabel>
        <FormControl>
         <Input {...field} placeholder="Name" type="text"/>
        </FormControl>       
        <FormMessage />
      </FormItem>
    )}
  />
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
    <FormField
    control={form.control}
    name="rePassword"
    render={({field}) => (
      <FormItem>
        <FormLabel > Confirm password: </FormLabel>
        <FormControl>
         <Input {...field} placeholder="Confirm password" type="password"/>
        </FormControl>       
        <FormMessage />
      </FormItem>
    )}
  />
  <FormField
    control={form.control}
    name="phone"
    render={({field}) => (
      <FormItem>
        <FormLabel > Phone: </FormLabel>
        <FormControl>
         <Input {...field} placeholder="Phone" type="tel"/>
        </FormControl>       
        <FormMessage />
      </FormItem>
    )}
  />
  <Button variant="outline" className='w-full cursor-pointer bg-green-200'>Register</Button>
  </form>  
</Form>
    </div>
  </div>
  </>
}