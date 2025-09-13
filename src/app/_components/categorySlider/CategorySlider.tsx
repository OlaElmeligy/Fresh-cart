
import getAllCategories from '@/api/AllCategoriesApi'
import React from 'react'
import Slider from '../Slider/Slider';

export default async function CategorySlider() {
const {data} = await getAllCategories();

return<>
<Slider data={data}/>
</>  
}







  

