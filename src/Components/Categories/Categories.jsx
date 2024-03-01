import React, { useEffect, useState } from 'react'
import Style from './Categories.module.css'
import { useQuery } from 'react-query'
import axios from 'axios'
import { Link } from 'react-router-dom'
import SubCategories from '../subcategories/subcategories'
import Loading from '../Loading/Loading'

export default function Categories() {

  function getAllCstegories(){
    return axios.get('https://ecommerce.routemisr.com/api/v1/categories')
   
  }
  let{data, isLoading}=useQuery('categories' , getAllCstegories)

  console.log(data?.data.data)
 



  return (
    <>
     {isLoading? <Loading/> :
      <div className="container content-container">
      <div className="row g-4">
       
       {data?.data.data.map((item ,idx) => {
        return <div className="col-md-4" key={idx}>
        <Link to={'/subcategories/'+ item._id} className="product cursor-pointer rounded-3 card">
          <div className="card-img">
            <img src={item.image}alt="" className='imgfit w-100 rounded-3 ' style={{height: '300px'}} />
          </div>
          <div className="card-body">
            <p className='h3  text-main text-center'>{item.name}</p>
            
          </div>
        </Link>
      </div>
       })

       }
      
      </div>
    </div>}
    </>
  )
}
