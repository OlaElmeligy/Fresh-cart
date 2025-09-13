
export default async function getAllCategories() {

const response = await fetch('https://ecommerce.routemisr.com/api/v1/categories')
const data = await response.json()
// console.log(data)
  return data;
  
}
