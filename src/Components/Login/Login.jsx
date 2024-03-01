import React, { useContext, useState } from 'react'
import Style from './Login.module.css'
import { useFormik } from 'formik'
import * as Yup from 'yup' 
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { UserContext } from '../../Context/User Context/UserContext';

export default function Login() {

  let {setUserToken} = useContext(UserContext)

  const [loading,setLoading]=useState(false)
  const[errMessg , setErrorMessg] = useState(null)

  let navigate = useNavigate()

 let validationschema = Yup.object({
    email:Yup.string().required('email is required').email('enter a valid email'),
    password:Yup.string().required('password is required').matches(/^[A-z][a-z0-9]{6,8}$/ ,'enter a valid password '),
   
  });

async function signIn(values){
  setLoading(true)
  console.log(values)
  let {data} = await axios.post('https://ecommerce.routemisr.com/api/v1/auth/signin',values).catch((err)=>{
      console.log(err.response.data.message)
      setErrorMessg(err.response.data.message)
      setLoading(false)
  })
  console.log(data)

  if(data.message ==='success'){
    navigate('/')
    localStorage.setItem('userToken', data.token)
    setUserToken(data.token)
    setLoading(false)
  }
}

  let formik = useFormik({


      initialValues:{
        email:'',
        password:''
      },
        // validate
      validationSchema:validationschema
      ,
        onSubmit:signIn

      })
     
      // console.log(formik.errors)
  return (
    <div className='content-container'>
      <div className='w-75 m-auto my-4'>
        <h2 className='text-center text-main fw-bold'>Login</h2>
        <form onSubmit={formik.handleSubmit}>
   
          <label htmlFor="email">Email:</label>
          <input value={formik.values.email} onBlur={formik.handleBlur} onChange={formik.handleChange} type="email" name='email' className='form-control mb-3' id='email'/>
          {formik.errors.email && formik.touched.email ?
          <p className='text-danger'>{formik.errors.email}</p> :''}
          
          <label htmlFor="password">Password:</label>
          <input value={formik.values.password} onBlur={formik.handleBlur} onChange={formik.handleChange} type="password" name='password' className='form-control mb-3' id='password'/>
          {formik.errors.password && formik.touched.password ?
          <p className='text-danger'>{formik.errors.password}</p> :''}
          
          
    
            {errMessg !==null?
            <p className='text-danger'>{errMessg}</p>
            :''
          }

          <button disabled={!(formik.isValid && formik.dirty)}  type="submit" className='btn bg-main text-white my-2'>Login   
            {loading? 
              <span>
              <i className='fa-solid fa-spinner fa-spin text-light mx-1'></i>
              </span>  
              :''
            }
            

           
            </button>
        </form>
        <Link className='link' to={'/forgotpassword'}>Forgot password?</Link>
        <Link className='link' to={'/register'}>Register</Link>


      </div>
    </div>
  )
}

