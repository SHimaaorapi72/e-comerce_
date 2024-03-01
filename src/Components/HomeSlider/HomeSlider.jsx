import React from 'react'
import Style from './HomeSlider.module.css'
import Slider from "react-slick";

export default function HomeSlider() {
  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows:false
  };

  return (
    <>
      <div className="row gy-0 my-5" >
        <div className="col-md-9" >
        <Slider {...settings}>
            
                <img  src={require('../../finalProject assets/images/grocery-banner.png')} className='w-100' alt="" />
                <img  src={require('../../finalProject assets/images/grocery-banner-2.jpeg')} className='w-100' alt="" />
        
          </Slider>

  

        </div>
        <div className="col-md-3">
          <img className='w-100'   src={require('../../finalProject assets/images/slider-image-1.jpeg')}alt="" />
          <img className='w-100'  src={require('../../finalProject assets/images/slider-image-3.jpeg')}alt="" />
        </div>
      </div>
    </>
  )
}
