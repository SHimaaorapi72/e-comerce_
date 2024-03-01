import React from 'react'
import Style from './Brands.module.css'
import { useQuery } from 'react-query'
import axios from 'axios'
import Loading from '../Loading/Loading'

export default function Brands() {


  function getAllBrands(){
    return axios.get(`https://ecommerce.routemisr.com/api/v1/brands`)
  }

  let {isLoading,data}=useQuery('brands' ,getAllBrands)
 
 console.log(data?.data.data)
  return (
    <>
    {isLoading? <Loading/> : 
    <>
    <h1 className='text-center text-main fw-bolder content-container'>All Brands</h1>
    <div className="container">
    <div className="row m-auto g-4">
    {data?.data.data.map((item ,idx)=>{
      return<div key={idx} className="col-md-3 ">
        <div className='product cursor-pointer rounded-3 p-4 rounded border border-3 ' data-bs-toggle="modal" data-bs-target={'#' + item.slug}>
        <img  src={item.image} className=' w-100' alt="" />
        <p className='text-center'>{item.name}</p>
      </div>
      {data?.data.data.map((modal ,idx)=>{
          return<>
          <div className="modal fade" key={idx} id={modal.slug} tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className="modal-dialog">
              <div className="modal-content">
                <div className="modal-header">
                  <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div className="modal-body d-flex justify-content-between align-items-center">
                  <div>
                    <h3 className='text-main fw-bold'>{modal.name}</h3>
                    <h6>{modal.slug}</h6>
                  </div>
                  <div>
                    <img src={modal.image} alt="" />
                  </div>
                </div>
                <div className="modal-footer">
                  <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                </div>
              </div>
            </div>
          </div>
          </>
        })}
       
      </div>
    })}
      
  
    </div>
 
    </div>
    </>
    }
   
   
    

    
    </>
  )
 
}
