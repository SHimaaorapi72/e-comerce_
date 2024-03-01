import React, { useContext, useEffect, useState } from 'react'
import Style from './Products.module.css'
import axios from 'axios'
import Loading from '../Loading/Loading'
import { useQuery } from 'react-query';
import { Link } from 'react-router-dom';
import HomeSlider from '../HomeSlider/HomeSlider';
import CategorySlider from '../CategorySlider/CategorySlider';
import { toast } from 'react-toastify';
import { cartNumber } from '../../Context/cartNumber/CartNumber';




export default function Products() {


const [wish, setWish] = useState([])
  let{setCartNumber,cartNum}=useContext(cartNumber)

  function getAllProduct(){
    return axios.get('https://ecommerce.routemisr.com/api/v1/products');
  }

 let{isLoading  , data } = useQuery('products' ,getAllProduct )

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
        // if(productId === wish){
        //   document.querySelector('.icon').classList.replace('fa-regular','fa-solid')    
        //   console.log(wish)
  

        // }
        setCartNumber(data.numOfCartItems)
        console.log(data)
      } catch (error) {
        console.log(error)
      }
      
      }

      async function addToWishList(e,id){
        e.target.classList.replace('fa-regular' ,'fa-solid')  
        let{data}= await axios.post('https://ecommerce.routemisr.com/api/v1/wishlist',{
          productId:id
        },{
          headers:{
            token:localStorage.getItem('userToken')
          }
          
  })
  if(data.status==='success'){
      toast('🚀' + data.message);
  
    
  }
  console.log(data)
  setWish(data.data)
   
  }


  return (
    
    <>
    {isLoading? <Loading/> :  <div className="container content-container">

    {/* <input  type="text" placeholder="search...." className=" w-75 mx-auto form-control my-5 " /> */}


      <div className="row my-5 gy-4 ">
        {data?.data.data.map( item => {
          return<div key={item._id} className="col-md-3">
                    <div className="product position-relative cursor-pointer rounded-3 p-3">
                     <Link to={'/product-details/'+ item._id}>
                     <img src={item.imageCover} className='w-100' alt="" />
                        <span className='text-main'>{item.category.name}</span>
                        <h5 className='my-2 fw-bold'>{item.title.split(' ').slice(0, 2).join(' ')}</h5>
                        <div className='d-flex justify-content-between align-items-center'>
                          <div>
                            {item.price+' EGP'}
                          </div>
                          <div>
                            <i className='fa-solid fa-star rating-color'></i>
                            {item.ratingsAverage}
                          </div>
                        </div>
                        </Link>
                        <i onClick={(e)=>addToWishList(e, item._id)} className='icon fa-regular fa-heart fa-2x position-absolute top-0 end-0 m-3 text-black'></i>
                        <button onClick={()=>{addProductToCart(item._id)}} className='btn bg-main w-100 text-white'>+Add to cart</button>
                  </div>
                    </div>
        })}
      </div>
    </div>}
   
    </>
  )
}
