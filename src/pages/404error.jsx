// src/pages/About.jsx
import React from 'react';
import Header from '../component/header'
import Footer from '../component/footer'
import error1 from '../assets/404.svg'
const error = () => {
    return (
        <>
            <Header />
            <div className='flex justify-center'>
                <div className='mt-[166px] mb-[77px]'>
                    <img src={error1} alt="" />
                </div>
            </div>

            <Footer />
        </>
    );
};

export default error;
