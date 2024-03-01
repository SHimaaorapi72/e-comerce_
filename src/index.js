import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle.min.js'
import '@fortawesome/fontawesome-free/css/all.min.css'
import UserContextProvider from './Context/User Context/UserContext';
import { QueryClient, QueryClientProvider } from 'react-query';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import 'react-toastify/dist/ReactToastify.css';
import CartNumberProvider from './Context/cartNumber/CartNumber';



let queryClient = new  QueryClient()

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
     
      <QueryClientProvider client={queryClient}>
      <CartNumberProvider>
      <UserContextProvider>
      <App />
      </UserContextProvider>
      </CartNumberProvider>
      </QueryClientProvider>
      
);


