import React, { useEffect, useState } from 'react'
import { useQuery } from 'react-query'
import axios from 'axios'
import { useParams } from 'react-router-dom'
import Loading from '../Loading/Loading'

export default function SubCategories() {
const [loading, setLoading] = useState(true)

 let {subId}=useParams()

console.log(subId)

async function getSpecificSubCategory(){
  let { data } = await axios.get(`https://ecommerce.routemisr.com/api/v1/subcategories`)
  setLoading(false)
 
}

useEffect(()=>{
  getSpecificSubCategory()
},[])


function getAllSubCategoriesOnCategory(){
  return axios.get(`https://ecommerce.routemisr.com/api/v1/categories/${subId}/subcategories`)
}

let {data}=useQuery('subcategories' , getAllSubCategoriesOnCategory)
console.log(data?.data.data)
  return (
    <>
  {loading? <Loading/> : 
  <>
  {data?.data.data.length !==0 ?
  <>
    <h2 className='text-center content-container text-main my-4 fw-bold fs-3'>{data?.data.data[0].name} subcategories</h2>
<div className="container">
  <div className="row g-3">
    {data?.data.data.map((item ,idx)=>{
      return  <div className="col-md-6" key={idx}>
      <div className="card cursor-pointer">
        <p className='h3 text-center p-3 fw-bold '>{item.name}</p>
       
      </div>
    </div>
    })}
  
  </div>
</div> 
</>: <div className='vh-100'>
  </div>
  }
 
</>
  }
    </>
    
  )
 
}






