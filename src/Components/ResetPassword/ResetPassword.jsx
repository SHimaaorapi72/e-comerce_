import React, { useContext, useState } from 'react'
import Style from './ResetPassword.module.css'
import { UserContext } from '../../Context/User Context/UserContext'
import { useNavigate } from 'react-router-dom'
import * as Yup from 'yup'
import axios from 'axios'
import { useFormik } from 'formik'

export default function ResetPassword() {
  let {setUserToken} = useContext(UserContext)

  const [loading,setLoading]=useState(false)
  const[errMessg , setErrorMessg] = useState(null)

  let navigate = useNavigate()

 let validationschema = Yup.object({
    email:Yup.string().required('email is required').email('enter a valid email'),
    newPassword:Yup.string().required('password is required').matches(/^[A-z][a-z0-9]{6,8}$/ ,'enter a valid password '),
   
  });

async function resetPass(values){
  setLoading(true)
  console.log(values)
  let {data} = await axios.put('https://ecommerce.routemisr.com/api/v1/auth/resetPassword',values).catch((err)=>{
      
      setErrorMessg(err.response.data.message)
      setLoading(false)
  })
  console.log(data)

  if(data.token){
    navigate('/login')
    localStorage.setItem('userToken', data.token)
    setUserToken(data.token)
    setLoading(false)
  }
}

  let formik = useFormik({


      initialValues:{
        email:'',
        newPassword:''
      },
       
      validationSchema:validationschema
      ,
        onSubmit:resetPass

      })
     
  return (
    <div >
    <div className='w-75 m-auto my-4'>
      <h2 className='text-center content-container'>Reset password</h2>
      <form onSubmit={formik.handleSubmit}>
 
        <label htmlFor="email">Email:</label>
        <input value={formik.values.email} onBlur={formik.handleBlur} onChange={formik.handleChange} type="email" name='email' className='form-control mb-3' id='email'/>
        {formik.errors.email && formik.touched.email ?
        <p className='text-danger'>{formik.errors.email}</p> :''}
        
        <label htmlFor="newPassword">RePassword:</label>
        <input value={formik.values.newPassword} onBlur={formik.handleBlur} onChange={formik.handleChange} type="password" name='newPassword' className='form-control mb-3' id='newPassword'/>
        {formik.errors.newPassword && formik.touched.newPassword ?
        <p className='text-danger'>{formik.errors.newPassword}</p> :''}
        
        
  
          {errMessg !==null?
          <p className='text-danger'>{errMessg}</p>
          :''
        }

        <button   type="submit" className='btn bg-main text-white my-2'>Login   
          {loading? 
            <span>
            <i className='fa-solid fa-spinner fa-spin text-light mx-1'></i>
            </span>  
            :''
          }
          

         
          </button>
      </form>
    </div>
  </div>
  )
}
