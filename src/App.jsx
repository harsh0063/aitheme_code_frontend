import React from 'react'
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Home from './pages/home'
import './App.css'
import Product_page from './pages/product_page'
import { ToastContainer } from 'react-toastify';
import Product_details from './pages/product_details'
import Cart from './pages/cart'
import Wishlist from './pages/wishlist'
import AboutUs from './pages/AboutUs'
import Blog from './pages/Blog'
import ContactUS from './pages/ContactUS'
import BlogDetailPage from './pages/BlogDetailPage'
import Login from './pages/SignInPage'
import Register from './pages/SignUpPage'
import Reset_password from './pages/reset_password'
import Profile from './pages/Profile'
import Sales from './pages/sales'
import InjectHeadScripts from './component/inject';
import NotFound from './pages/404error';
import Cancellation_and  from './pages/Cancellation-and-Refund-Policy';
import Terms_and_Conditions  from './pages/Terms-and-Conditions';
import Privacy_policy  from './pages/Privacy-policy';
import Checkout_page  from './pages/checkout_page';
import Billing_details  from './pages/billing_details';
import Free_themes  from './pages/free_themes';


const App = () => {
    const token = localStorage.getItem("allopstoken");


    return (
        <>
            <InjectHeadScripts />
            <ToastContainer autoClose={1500} />
            <BrowserRouter basename='/'>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/:category_name" element={<Product_page />} />
                    <Route path="/:category_name/:subcategory_name" element={<Product_page />} />
                    <Route path="/:category_name/:subcategory_name/:theme_name" element={<Product_details />} />
                    <Route path="/cart" element={<Cart />} />
                    <Route path="/wishlist" element={<Wishlist />} />
                    <Route path="/about_us" element={<AboutUs />} />
                    <Route path="/blog" element={<Blog />} />
                    <Route path="/contact_us" element={<ContactUS />} />
                    <Route path="/blog/:blog_details" element={<BlogDetailPage />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/reset_password" element={<Reset_password />} />
                    <Route path="/profile" element={<Profile />} />
                    <Route path="/sales" element={<Sales />} />
                    <Route path="/404" element={<NotFound />} />
                    <Route path="/cancellation-and-refund-policy" element={<Cancellation_and />} />
                    <Route path="/terms-and-conditions" element={<Terms_and_Conditions />} />
                    <Route path="/privacy-policy" element={<Privacy_policy />} />
                    <Route path="/checkout_page" element={<Checkout_page />} />
                    <Route path="/billing_details" element={<Billing_details />} />
                    <Route path="/free_download" element={<Free_themes />} />

                </Routes>
            </BrowserRouter>
        </>
    )
}

export default App;
