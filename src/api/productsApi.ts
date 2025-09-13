
export default async function getProducts() {
    const response = await fetch('https://ecommerce.routemisr.com/api/v1/products' , {
method:"GET",
//cache:"no-store", //SSR
//cache:"force-cache" //SSG --> this by default for pages not fetching api
next: {revalidate : 60} //ISR
    });
const {data} = await response.json();
return data;  
}

// Caching(choose according to the business)
//CSR
//SSR -> on demand --> always fresh data
//SSG -> build
//ISR -> build