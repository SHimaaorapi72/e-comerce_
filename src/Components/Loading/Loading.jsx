import React from 'react'
import Style from './Loading.module.css'

export default function Loading() {
  return (
    <div className='d-flex justify-content-center align-items-center vh-100'>
    <div className={Style.loader}></div>
    </div>
  )
}
