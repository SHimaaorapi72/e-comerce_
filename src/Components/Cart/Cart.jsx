import React, { useEffect, useState } from 'react'
import Style from './Cart.module.css'
import { useQuery } from 'react-query'
import axios from 'axios'
import Loading from '../Loading/Loading'
import CartProduct from '../CartProduct/CartProduct'
import { Link } from 'react-router-dom'


export default function Cart() {

const [cartId, setCartId] = useState()

let [cart,setCart]= useState([])
const [loading, setLoading] = useState(true);


async function getCartLogin(){
  try {
      let {data}  = await axios.get('https://ecommerce.routemisr.com/api/v1/cart' ,{
          headers: {
            token : localStorage.getItem('userToken')
          }
          
        }
        )
        console.log(data)
        setCartId(data.data._id)
        setCart(data)
        setLoading(false)
      } catch (error) {
          console.log(error)
          
        
      }
}
useEffect(()=>{
  getCartLogin()
},[])


async function removeProductFromCart(productId){
  let {data}= await axios.delete('https://ecommerce.routemisr.com/api/v1/cart/'+productId , {
    headers :{
      token: localStorage.getItem('userToken')
    }
  })
  console.log(data)
  setCart(data)
}
async function clearProductFromCart(){
  let {data}= await axios.delete('https://ecommerce.routemisr.com/api/v1/cart' , {
    headers :{
      token: localStorage.getItem('userToken')
    }
  })
  console.log(data)
  setCart(data)
}









  return (
  <div className='content-container '>

{cart.data?.products.length > 0?
      
      <div className='my-5 w-75 m-auto  '>
        <div className='d-flex justify-content-between align-items-center'>
        <p className='fw-bolder'>Total cart price: { cart.data?.totalCartPrice} EGP</p>
          <button onClick={()=>{clearProductFromCart()}} className='btn btn-outline-danger d-block ms-auto'>Clear cart</button>
          </div>
          {cart.data?.products.map((item , idx)=>{
            return <CartProduct key={idx} item={ item } removeProductFromCart={removeProductFromCart} setCart={setCart} />  
          })}
    
          <div className='d-flex justify-content-between'>
            <Link  to={'/checkout/' + cartId} className='btn bg-main text-white'>Online Payment</Link>
            
          </div>
        </div> : <h2 className='alert alert-warning text-center my-5'>No products in your cart</h2> }
    
        
      </div>
    
    
  )
}
