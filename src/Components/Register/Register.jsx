import React, { useState } from 'react'
import Style from './Register.module.css'
import { useFormik } from 'formik'
import * as Yup from 'yup' 
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function Register() {

  const [loading,setLoading]=useState(false)
  const[errMessg , setErrorMessg] = useState(null)

  let navigate = useNavigate()

 let validationschema = Yup.object({
    name: Yup.string().required('name is required').min(3 , 'minmum length is 3 chars').max(10 ,'max length is 10 chars'),
    email:Yup.string().required('email is required').email('enter a valid email'),
    password:Yup.string().required('password is required').matches(/^[A-z][a-z0-9]{6,8}$/ ,'enter a valid password '),
    rePassword: Yup.string().required('rePassword is required').oneOf([Yup.ref('password')], 'Not matched')
  });

//  function validate (values){
//     let errors ={}

//     if(!values.name){
//       errors.name = 'name is required'
//     }else if(values.name.length < 3){
//       errors.name ='min length is 3 chars'
//     }else if(values.name.length >10){
//       errors.name = 'max length is 10 chars'
//     }

//     if(!values.phone){
//       errors.phone = "phone is required"
//     }else if(!/^01[0125][0-9]{8}$/.test(values.phone)){
//       errors.phone ='enter a valid phone'
//     }

//     if (!values.email) {
//       errors.email = 'Required';
//     } else if (
//       !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
//     ) {
//       errors.email = 'Invalid email address';
//     }

//     if(!values.password){
//       errors.password = 'password is required'
//     }else if(!/^[A-z][a-z0-9]{3,6}$/.test(values.password)){
//       errors.password = 'enter a valid password'
//     }

//     if(!values.rePassword){
//       errors.rePassword = 'erquired'
//     }else if(values.password !== values.rePassword){
//       errors.rePassword ='password not match'
//     }

//     return errors
    
//  }

async function signUp(values){
  setLoading(true)
  console.log(values)
  let {data} = await axios.post('https://ecommerce.routemisr.com/api/v1/auth/signup',values).catch((err)=>{
      console.log(err.response.data.message)
      setErrorMessg(err.response.data.message)
      setLoading(false)
  })
  console.log(data)

  if(data.message ==='success'){
    navigate('/login')
    setLoading(false)
  }
}

  let register = useFormik({


      initialValues:{
        name: '',
        // phone:'',
        email:'',
        password:'',
        rePassword:''
      },
        // validate
      validationSchema:validationschema
      ,
        onSubmit:signUp

      })
     
      // console.log(register.errors)
  return (
    <div className='content-container'>
      <div className='w-75 m-auto my-4'>
        <h2 className='text-center text-main fw-bold'>Register Now</h2>
        <form onSubmit={register.handleSubmit}>
          <label htmlFor="name">Name:</label>
          <input value={register.values.name} onBlur={register.handleBlur}  onChange={register.handleChange} type="text" name='name' className='form-control mb-3' id='name'/>
          {register.errors.name && register.touched.name ?
          <p className='text-danger'>{register.errors.name}</p> :''}
          
          
          {/* <label htmlFor="phone">Phone:</label>
          <input onChange={register.handleChange} onBlur={register.handleBlur} type="tel" name='Phone' className='form-control mb-3' id='Phone'/>
            {register.errors.phone && register.touched.phone?
          <p className='text-danger'>{register.errors.phone}</p> :''} */}


          <label htmlFor="email">Email:</label>
          <input value={register.values.email} onBlur={register.handleBlur} onChange={register.handleChange} type="email" name='email' className='form-control mb-3' id='email'/>
          {register.errors.email && register.touched.email ?
          <p className='text-danger'>{register.errors.email}</p> :''}
          
          <label htmlFor="password">Password:</label>
          <input value={register.values.password} onBlur={register.handleBlur} onChange={register.handleChange} type="password" name='password' className='form-control mb-3' id='password'/>
          {register.errors.password && register.touched.password ?
          <p className='text-danger'>{register.errors.password}</p> :''}
          
          <label htmlFor="rePassword">RePassword:</label>
          <input value={register.values.rePassword} onBlur={register.handleBlur} onChange={register.handleChange} type="password" name='rePassword' className='form-control mb-3' id='rePassword'/>
          {register.errors.rePassword && register.touched.rePassword ?
          <p className='text-danger'>{register.errors.rePassword}</p> :''}
          
    
            {errMessg !==null?
            <p className='text-danger'>{errMessg}</p>
            :''
          }

          <button disabled={!(register.isValid && register.dirty)}  type="submit" className='btn bg-main text-white'>Signup   
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


