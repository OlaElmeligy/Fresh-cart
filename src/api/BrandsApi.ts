
export default async function getAllBrands() {

const response = await fetch('https://ecommerce.routemisr.com/api/v1/brands')
const data = await response.json()
// console.log(data)
  return data;
  
}


