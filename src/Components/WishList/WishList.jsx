import React, { useContext, useEffect, useState } from 'react'
import Style from './WishList.module.css'
import axios from 'axios'
import { cartNumber } from '../../Context/cartNumber/CartNumber'
import { toast } from 'react-toastify'

export default function WishList() {
  let[wishList, setWishList] =useState([])
  let{setCartNumber,cartNum}=useContext(cartNumber)
  let [cart,setCart]= useState([])

  async function getLoggedWishList(){
    let {data} = await axios.get('https://ecommerce.routemisr.com/api/v1/wishlist',
    {
      headers:{
        token:localStorage.getItem('userToken')
      }
    })
    console.log(data)
    setWishList(data.data)
  }
  useEffect(()=>{
    getLoggedWishList()

  },[])


 async function removeFromWishList(id){
    try {
      let {data} =await axios.delete(`https://ecommerce.routemisr.com/api/v1/wishlist/${id}`,
    {
      headers:{
        token:localStorage.getItem('userToken')
      }
    })
    setWishList(data?.data)
    console.log(data)
    } catch (error) {
      console.log(error)
    }

  }
 

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
    
    } catch (error) {
      console.log(error)
    }
    
    }
   

    async function getCartLogin(){
      try {
          let {data}  = await axios.get('https://ecommerce.routemisr.com/api/v1/cart' ,{
              headers: {
                token : localStorage.getItem('userToken')
              }
              
            }
            )
            console.log(data)
            setWishList(data?.data.products.product)
            setCart(data)
            // setWishList(data)
          
            
          } catch (error) {
              console.log(error)
              
            
          }
    }
    useEffect(()=>{
      getCartLogin()
    },[])


  return (
    <div className='content-container'>
    <h2 className=' fw-bold text-center my-3'>My Wish List</h2>
   {wishList?.map((item ,idx)=>{
    return <div key={idx} className='container shadow rounded-2 my-3'>
    <div className="row align-items-center ">
      <div className="col-md-2">
        <img src={item.imageCover}className='w-100' alt="" />
      </div>
      <div className="col-md-8">
        <h2>{item.title}</h2>
        <h5>{item.name}</h5>
        <p className='d-flex justify-content-between'>
        <span>{item.price} EGP</span>
        </p>
        <button onClick={()=>{removeFromWishList(item._id)}} className='btn btn-outline-danger my-2'>Remove</button>
      </div>
      <div className="col-md-2">
        <div className='d-flex align-items-center'>
          <button onClick={()=>{addProductToCart(item._id) && removeFromWishList(item._id)}} className='btn btn-outline-secondary'> Add to cart</button>
        </div>
      </div>
    </div>
  </div>
   
   })}  

   </div> 
  
  )

}


// onClick={()=>{removeProductFromCart(item.product._id)}}