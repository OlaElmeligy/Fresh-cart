"use client"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import React from 'react'
import { useForm } from 'react-hook-form'
import { Button } from "@/components/ui/button"
import { zodResolver } from '@hookform/resolvers/zod'
import { checkoutSchema, checkoutSchemaType } from '@/schema/checkout.schema'
import onlinePayment from '../../checkOutActions/onlineCheckout'
import { useParams } from 'next/navigation' 


export default function Checkout() { // instead of destructing params here we used useparams as we can bec it is a client comp

const {id} : {id:string} = useParams();

const form = useForm <checkoutSchemaType> ({
  defaultValues:{
    "details":"",
    "phone":"",
    "city":""
  },
  resolver: zodResolver(checkoutSchema),
});

async function handleCheckout(values : checkoutSchemaType) {
const res = await onlinePayment(id ,"",values)
if(res.status === "success"){
  window.location.href = res.session.url    
}
}


// const response = await signIn("credentials" , {
//   email : values.email,
//   password : values.password,
//   redirect: false,
//   callbackUrl : "/"
// });

// if(response?.ok){
//   toast.success("Login successful!" , {position: "top-center" , duration: 3000})
// window.location.href = "/"   // won't use router push 3shan 3yzen n3ml reload hna
// }else{
//     toast.error(response?.error , {position: "top-center" , duration: 3000})

// }
// }


  return <>
  <div className='pt-30 flex items-center justify-center '>
    <div className='w-1/2'>
        <h1 className='text-3xl font-semibold mb-3'>Check Out </h1>

<Form {...form}>
  <form className="space-y-3" onSubmit={form.handleSubmit(handleCheckout)}>

  <FormField
    control={form.control}
    name="details"
    render={({field}) => (
      <FormItem>
        <FormLabel > Details: </FormLabel>
        <FormControl>
         <Input {...field} placeholder="Details" type="text"/>
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
   <FormField
    control={form.control}
    name="city"
    render={({field}) => (
      <FormItem>
        <FormLabel > City: </FormLabel>
        <FormControl>
         <Input {...field} placeholder="City" type="text"/>
        </FormControl>       
        <FormMessage />
      </FormItem>
    )}
  /> 
  <Button variant="outline" className='w-full cursor-pointer bg-green-200'>Pay now</Button>
  </form>  
</Form>
    </div>    
  </div>
       <hr className="my-6 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-8 w-1/2"/>

  {/* <div className=' flex  w-1/2  mx-auto'>
    <p className='me-6 font-semibold'>New to Fresh cart?</p>
    <Link href="/register" className=' hover:underline text-emerald-950'>Register now</Link>
    </div> */}
 
  </>
}