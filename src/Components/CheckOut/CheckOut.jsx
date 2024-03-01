import Style from './CheckOut.module.css'
import React, { useState } from 'react'
import { useFormik } from 'formik'
import * as Yup from 'yup' 
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';


export default function CheckOut() {
let navigate =useNavigate()

let validationschema = Yup.object({
  name: Yup.string().required('name is required').min(3 , 'minmum length is 3 chars').max(10 ,'max length is 10 chars'),
  phone:Yup.string().required('password is required').matches(/^(\+201|01|00201)[0-2,5]{1}[0-9]{8}$/ ,'enter a valid phone '),
  details:Yup.string().required('details is required'),
  city:Yup.string().required('city is required')
  
});

  const [loading,setLoading]=useState(false)

  let {cartId} =useParams()
  // console.log(cartId)
async function onlinePayment(){
  setLoading(true)
  

  try {
    console.log(values)
    let {data} = await axios.post(`https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartId}`,
    {
      shippingAddress:values
    },{
      headers:{
        token: localStorage.getItem('userToken')
      },
      
        params: {
          url :'http://localhost:3001'
        }
    }
    )
    console.log(data)

    window.open(data.session.url,'_self')



  } catch (error) { 
    console.log(error)  
  }

}

  let {handleChange ,handleSubmit ,values ,errors ,touched , handleBlur} = useFormik({


      initialValues:{
        name:'',
        details:'',
        phone:'',
        city:''
      },
      validationSchema:validationschema
    ,
        onSubmit:onlinePayment

      })
     
  return (
   
        <div className='w-75 m-auto my-4 '>
        <h2 className='text-center content-container'>Online payment</h2>
        <form onSubmit={handleSubmit}>
        
    
          <label htmlFor="name">Name:</label>
          <input   onChange={handleChange} onBlur={handleBlur} type="text" name='name' className='form-control mb-3' id='name'/>
          {errors.name && touched.name ?
          <p className='text-danger'>{errors.name}</p> :''}

          <label htmlFor="details">Details:</label>
          <input   onChange={handleChange} onBlur={handleBlur}  type="text" name='details' className='form-control mb-3' id='details'/>
          {errors.details && touched.details ?
          <p className='text-danger'>{errors.details}</p> :''}

          <label htmlFor="phone">Phone:</label>
          <input   onChange={handleChange} onBlur={handleBlur} type="tel" name='phone' className='form-control mb-3' id='phone'/>
          {errors.phone && touched.phone ?
          <p className='text-danger'>{errors.phone}</p> :''}

          <label htmlFor="city">City:</label>
          <input onChange={handleChange} onBlur={handleBlur} type="text" name='city' className='form-control mb-3' id='city'/>
          {errors.city && touched.city ?
          <p className='text-danger'>{errors.city}</p> :''}
          

          <button type="submit" className='btn bg-main text-white w-100'>Pay now  
            {loading? 
              <span>
              <i className='fa-solid fa-spinner fa-spin text-light mx-1'></i>
              </span>  
              :''
            }
            

            
            </button>
        </form>
      </div>
  )
  
}
