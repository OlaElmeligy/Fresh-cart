import Link from "next/link";
import MainSlider from "./_components/MainSlider/MainSlider";
import CategorySlider from "./_components/categorySlider/CategorySlider";


export default function Home() {
  return  <>
    <div className=" pt-20">
      <MainSlider />
    </div>

       <CategorySlider/>


<div className="w-1/2 m-auto text-center space-y-10 my-20">
<h1 className="text-4xl font-bold tracking-tight lg-text-xl">Welcome to Fresh Cart</h1>
<p className="text-xl text-muted-foreground max-w-2xl mx-auto">Discover the latest technology, fashion and life style products. Quality guarnteed with fast shipping and excellent customer services.</p>
<div className=" gap-4 flex flex-col sm:flex-row justify-center">
<Link href="/products"className="text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-4 py-2 text-center dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"> Shop Now </Link>
<Link href="/categories"className="text-green-800 hover:text-white bg-white-700 border-2 border-green-800 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-4 py-2 text-center dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"> Browse Categories </Link>

</div>

</div>




   </>
  
}
