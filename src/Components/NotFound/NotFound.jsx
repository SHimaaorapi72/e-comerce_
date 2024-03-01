import React from 'react'
import Style from './NotFound.module.css'
import notFound from '../../finalProject assets/images/error.svg'

export default function NotFound() {
  return (
    <>
    <div className='content-container' >
      <img src={notFound} className='w-100 imgnotfoud ' alt="" />
    </div>
    </>
  )
}
