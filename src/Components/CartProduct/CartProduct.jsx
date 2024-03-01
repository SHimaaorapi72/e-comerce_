import React, { useState } from 'react'
import Style from './CartProduct.module.css'
import axios from 'axios'

export default function CartProduct({item ,idx , removeProductFromCart , setCart}) {

  const [counnt , setCount]= useState( item.count)
  const[timeOut , setTimeOut] =useState()
  function UpdateProductCount(id , count){
  clearTimeout(timeOut)
let x =  setTimeout(async()=>{
    if(count<=0){
      removeProductFromCart(id)
      
    }else{
      
      try {
        let {data} = await axios.put(`https://ecommerce.routemisr.com/api/v1/cart/`+id,
        {count :count
        } ,
        {headers:{
          token: localStorage.getItem('userToken')
        }})
        console.log(data)
        setCart(data)
      } catch (error) {
        console.log(error)
      }
    }
  },5000)
  setTimeOut(x)
  }
  
  return (
    <>
        <div key={idx} className='p-3 cart-product shadow rounded-2 my-3'>
          <div className="row align-items-center ">
            <div className="col-md-2">
              <img src={item.product.imageCover}className='w-100' alt="" />
            </div>
            <div className="col-md-8">
              <h2>{item.product.title}</h2>
              <h5>{item.product.category.name}</h5>
              <p className='d-flex justify-content-between'>
              <span>{item.price} EGP</span>
              <span> <i className='fa-solid fa-star rating-color me-1'></i>{item.product.ratingsAverage}</span>
              </p>
              <p><span className='fw-bolder '>Total price:</span>{item.price * item.count} EGP</p>
              <button onClick={()=>{removeProductFromCart(item.product._id)}} className='btn btn-outline-danger my-2'>Remove</button>
            </div>
            <div className="col-md-2">
             
              <div className='d-flex align-items-center'>
                <button onClick={()=>{UpdateProductCount(item.product._id, counnt-1); setCount( counnt-1)}} className='btn btn-secondary text-white mx-2'>-</button>
                <span>{counnt}</span>
                <button onClick={()=>{UpdateProductCount(item.product._id, counnt+1); setCount( counnt+1)}} className='btn btn-secondary text-white mx-2'>+</button>
              </div>
            </div>
          </div>
        </div>
    </>
  )
}
