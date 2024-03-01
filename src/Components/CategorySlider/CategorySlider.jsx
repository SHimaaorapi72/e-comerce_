import React from 'react'
import Style from './CategorySlider.module.css'
import Slider from "react-slick";
import { useQuery } from 'react-query';
import axios from 'axios';

export default function CategorySlider() {
  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 7,
    slidesToScroll: 1,
    initialSlide: 0,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 6,
          slidesToScroll: 1,
          infinite: true,
          dots: true
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 1,
          // initialSlide: 2
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1
        }
      }
    ]
  };

  
function getCategorySlider(){
  return axios.get('https://ecommerce.routemisr.com/api/v1/categories')
}

  let {isLoading, data }=useQuery('category' , getCategorySlider)

  console.log(data?.data.data)

  
  return (
    <>
     <Slider {...settings}>
            {data?.data.data.map((category ,idex)=>{
              return <div key={idex}>
                <img style={{height:"200px"}} src={category.image} className='w-100 imgfit' alt="" />
                <h5 className='text-center'>{category.name} </h5>
              </div>
            })}
            
    
      </Slider>
    </>
  )
}
