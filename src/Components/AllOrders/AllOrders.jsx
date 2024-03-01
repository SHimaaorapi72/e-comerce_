import React, { useEffect, useState } from 'react'
import Style from './AllOrders.module.css'
import { jwtDecode } from 'jwt-decode'
import axios from 'axios'


export default function AllOrders() {

const [orders , setOrders] = useState([])

 async function getAllOrders(id){

  let {data} = await axios.get(`https://ecommerce.routemisr.com/api/v1/orders/user/` + id)

  console.log(data)
  setOrders(data)
 }


useEffect(()=>{
  let {id} =jwtDecode(localStorage.getItem('userToken'))
  getAllOrders(id)
} , [])


  return (
    <>
    <h1 className='text-center content-container'>Your orders</h1>
    {orders.map((order) => {
      return <div className='row -75 m-auto ' key={order.id} >
        <div className='order shadow rounded p-4 my-3'>
          <div className='d-flex align-items-center'>
            <h2 className='fw-bolder h1'>#{order.id} </h2>
            <h4 className='fw-bold text-primary mx-4'> Processing</h4>
          </div>
          <p>You have orderd {order.cartItems.length} items.</p>

          <div className='d-flex'>
            {order.cartItems.map((item)=>{
            return <img src={item.product.imageCover} key={item._id} className='img-thumbnail mx-1' alt="" style={{width: '150px'}} />
            })}
          </div>
          <hr />
          <p><strong>Total amount: </strong>{order.totalOrderPrice} EGP</p>

        </div>


      </div>
    })}
    </>
  )
}
