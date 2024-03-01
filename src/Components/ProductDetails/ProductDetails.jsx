import React, { useContext, useEffect, useState } from 'react'
import Style from './ProductDetails.module.css'
import { useParams } from 'react-router-dom'
import { useQuery } from 'react-query'
import axios from 'axios'
import Loading from '../Loading/Loading'
import Slider from "react-slick";
import { toast } from 'react-toastify'
import { cartNumber } from '../../Context/cartNumber/CartNumber'


export default function ProductDetails() {
  const{setCartNumber}  =useContext(cartNumber)
  
  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows:false
  };

  let x = useParams()
    console.log(x)

    function getProductDetails(){
      return axios.get(`https://ecommerce.routemisr.com/api/v1/products/${x.id}`)
    }

   let{data , isLoading} = useQuery('product details', getProductDetails)
  
   console.log(data?.data.data)


   async function addProductToCart(productId){
    try {
      let {data} = await axios.post('https://ecommerce.routemisr.com/api/v1/cart',
      {
        productId:productId
      },
      {
        headers:{
        token:localStorage.getItem('userToken')
        }
      }
      )
      if(data.status === 'success'){
        toast('🚀' + data.message);
      
        
      }
      setCartNumber(data.numOfCartItems)
      console.log(data)
      console.log(productId)
    } catch (error) {
      console.log(error)
    }
    
    }




    let [cart,setCart]= useState([])
    async function getCartLogin(){
      try {
          let {data}  = await axios.get('https://ecommerce.routemisr.com/api/v1/cart' ,{
              headers: {
                token : localStorage.getItem('userToken')
              }
              
            }
            )
            console.log(data)
            setCart(data)
          } catch (error) {
              console.log(error)
              
            
          }
    }
    useEffect(()=>{
      getCartLogin()
    },[])
    

  return (
    

    <>
    {isLoading? <Loading/> : <div className="container">
      <div className="row align-items-center my-5 gy-3 content-container">
        <div className="col-md-3">
          {/* <img src={data?.data.data.imageCover} className='w-100' alt="" /> */}
          <Slider {...settings}>
            
              {data?.data.data.images.map((img ,idx)=> {
                return  <img key={idx} src={img} className='w-100' alt="" />
              })}
            
            </Slider>
        </div>
        <div className="col-md-9">
          <h2 className='mt-2'>{data?.data.data.title}</h2>
          <h5 className='font-sm text-main mt-2'>{data?.data.data.category.name}</h5>
          <p className='mt-2'>{data?.data.data.description}</p>
          <div className='d-flex justify-content-between align-items-center'>
                          <div>
                            {data?.data.data.price+' EGP'}
                          </div>
                          <div>
                            <i className='fa-solid fa-star rating-color'></i>
                            {data?.data.data.ratingsAverage}
                          </div>
                        </div>
                        <button onClick={()=>{addProductToCart(data?.data.data.id)}} className='btn bg-main w-100 text-white mt-4'>Add to cart</button>
        </div>
       
      </div>
    </div>}
   
    </>
  )
}
