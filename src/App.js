import logo from './logo.svg';
import './App.css';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import Layout from './Components/Layout/Layout';
import Home from './Components/Home/Home';
import Login from './Components/Login/Login';
import Register from './Components/Register/Register';
import Products from './Components/Products/Products';
import Cart from './Components/Cart/Cart';
import NotFound from './Components/NotFound/NotFound';
import Categories from './Components/Categories/Categories';
import Brands from './Components/Brands/Brands';
import ProtectedRoute from './Components/ProtectedRoute/ProtectedRoute';
import ProductDetails from './Components/ProductDetails/ProductDetails';
import { ToastContainer } from 'react-toastify';
import CheckOut from './Components/CheckOut/CheckOut';
import AllOrders from './Components/AllOrders/AllOrders';
import SubCategories from './Components/subcategories/subcategories';
import WishList from './Components/WishList/WishList';
import ForgotPassword from './Components/ForgotPassword/ForgotPassword';
import ResetPassword from './Components/ResetPassword/ResetPassword';





let router = createBrowserRouter([
  {path: '/' , element: <Layout/> , children:[
    {index:true , element: <ProtectedRoute><Home/></ProtectedRoute> },
    {path: 'login' , element: <Login/>},
    {path: 'categories' , element:<ProtectedRoute><Categories/></ProtectedRoute> },
    {path: 'subcategories/:subId' , element:<ProtectedRoute><SubCategories/></ProtectedRoute> },
    {path: 'checkout/:cartId' , element:<ProtectedRoute><CheckOut/></ProtectedRoute> },
    {path: 'allorders' , element:<ProtectedRoute><AllOrders/></ProtectedRoute> },
    {path: 'wishlist' , element:<ProtectedRoute><WishList/></ProtectedRoute> },
    {path: 'brands' , element:<ProtectedRoute> <Brands/></ProtectedRoute>},
    {path: 'register' , element: <Register/>},
    {path: 'forgotpassword' , element: <ForgotPassword/>},
    {path: 'resetpassword' , element: <ResetPassword/>},
    {path: 'products' , element:<ProtectedRoute> <Products/></ProtectedRoute>},
    {path: 'product-details/:id' , element:<ProtectedRoute> <ProductDetails/></ProtectedRoute>},
    {path: 'cart' , element:<ProtectedRoute><Cart/></ProtectedRoute> },
    {path: '*' , element: <NotFound/>},

  ]}
])

function App() {
  return (
   <>
   
   <RouterProvider router={router} />
   <ToastContainer/>
   
   </>
  );
}

export default App;
