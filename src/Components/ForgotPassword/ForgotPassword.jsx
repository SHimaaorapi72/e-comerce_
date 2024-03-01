import React from 'react'
import Style from './ForgotPassword.module.css'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

export default function ForgotPassword() {
  let navigate =useNavigate()
  let validationschema= Yup.object({
    email:Yup.string().required('email is required').email('enter a valid email')
  })
   async function sendCode(values){

      let {data} = await axios.post(`https://ecommerce.routemisr.com/api/v1/auth/forgotPasswords` , values)
      console.log(values)
      console.log(data)
      if(data.statusMsg ==='success'){
      document.querySelector('.forgotpassword').classList.add('d-none')    
      document.querySelector('.verifycode').classList.remove('d-none')    
     }
    }

  let formik = useFormik({
    initialValues:{
      email:''
    },
    validationSchema:validationschema
    ,
    onSubmit:sendCode
  })



  let validationschema2= Yup.object({
    resetCode:Yup.string().required('email is required')
  })
   async function sendData(values){
    
      let {data} = await axios.post(`https://ecommerce.routemisr.com/api/v1/auth/verifyResetCode` , values)
      console.log(values)
      console.log(data)
      if(data.status==='Success'){
        navigate('/resetpassword')

      }
    }

  let verifyFormik = useFormik({
    initialValues:{
      resetCode:''
    },
    validationSchema:validationschema2
    ,
    onSubmit:sendData
  })
  return (
    <>
    <div className='forgotpassword '>
    <h3 className='text-center text-main fw-bold content-container'>Forgot password:</h3>
    <form onSubmit={formik.handleSubmit} className='w-75 m-auto'>
    <label htmlFor="email">Email:</label>
          <input value={formik.values.email} onBlur={formik.handleBlur} onChange={formik.handleChange} type="email" name='email' className='form-control mb-3' id='email'/>
          {formik.errors.email && formik.touched.email ?
          <p className='text-danger'>{formik.errors.email}</p> :''}
      <button type='submit' className='btn bg-main text-light my-3'>Send code</button>
    </form>
    </div>

    <div className='verifycode d-none'>
    <h3 className='text-center text-main fw-bold'>Verify code:</h3>
    <form onSubmit={verifyFormik.handleSubmit} className='w-75 m-auto'>
    <label htmlFor="resetCode">Reset Code:</label>
          <input value={verifyFormik.values.resetCode} onBlur={verifyFormik.handleBlur} onChange={verifyFormik.handleChange} type="resetCode" name='resetCode' className='form-control mb-3' id='resetCode'/>
          {verifyFormik.errors.resetCode && verifyFormik.touched.resetCode ?
          <p className='text-danger'>{verifyFormik.errors.resetCode}</p> :''}
      <button type='submit' className='btn bg-main text-light my-3'>Submit</button>
    </form>
    </div>
    </>

  )
}

