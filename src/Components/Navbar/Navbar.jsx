import React, { useContext, useState } from 'react'
import Style from './Navbar.module.css'
import { Link, useNavigate } from 'react-router-dom'
import logo from '../../finalProject assets/images/freshcart-logo.svg'
import { UserContext } from '../../Context/User Context/UserContext';
import { cartNumber } from '../../Context/cartNumber/CartNumber';

export default function Navbar() {

let  {cartNum} =useContext(cartNumber)

  let {userToken , setUserToken }= useContext(UserContext)
  let navigate = useNavigate()

  function logOut(){
   localStorage.removeItem('userToken')
   setUserToken(null)
   navigate('/login')

  }


  return (
    <>
    <nav className="navbar navbar-expand-lg bg-body-tertiary p-3 mb-5 fixed-top ">
  <div className="container d-flex justify-content-around  ">
    <div>
    <Link className="navbar-brand" to="/">
      <img src={logo} alt="" />
    </Link>
    </div>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarTogglerDemo01" aria-controls="navbarTogglerDemo01" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
              </button>
    <div className="collapse navbar-collapse" id="navbarTogglerDemo01" >
      <ul className='navbar-nav font-ul navbar-nav m-auto mb-2 mb-lg-0 leftlinks'>
          {userToken !== null? <>
            <li className="nav-item ">
          <Link className="nav-link" to="/">Home</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/products">Products</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/categories">Categories</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/brands">Brands</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/allorders">All Orders</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/wishlist">Wish list</Link>
        </li>
       
          
          </>
          :''}
      

      </ul>
      </div>

      <div className="collapse navbar-collapse" id="navbarTogglerDemo01">
      <ul className="navbar-nav ms-auto mb-2 mb-lg-0 rightlinks">


      <li className="nav-item ">
          <Link className="nav-link" to="/cart">
            <i className='fa-solid fa-shopping-cart text-main font '></i>
            <span className='badge bg-main text-light'>{cartNum}</span>
          </Link>
        </li>


        {userToken !==null? <>
          <li className="nav-item">
          <span onClick={()=> logOut() } className="nav-link cursor-pointer" >Logout</span>
        </li>
        
        </>
          :<>
          <li className="nav-item">
          <Link className="nav-link" to="/login">Login</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/register">Register</Link>
        </li>
          </>}


        
      </ul>
      </div>
    
    
  </div>
</nav>
    </>
  )
}
