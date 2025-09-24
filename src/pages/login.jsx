import React from 'react'
import login1 from '../assets/login.svg'
import logo from '../assets/logo.svg'

function login() {
    return (
        <>
        

            <section className='bg-[#FEFEFEF7] h-svh flex justify-center'>
                <div className='container'>
                    <div className='max-w-[1078px] mx-auto rounded-[12px] shadow-[0px_11.48px_63.79px_1.28px_#3DB0F733]'>
                        <div className='p-[50px_37px] flex items-center'>
                            <div className='border-e border-[#BEBEBE] py-[30px] pe-[36px]'>
                                <img src={login1} className='max-[394px]' alt="" />
                            </div>
                            <div className='ps-[36px] w-full'>
                                <img src={logo} className='mx-auto block' alt="" />
                            </div>
                        </div>
                    </div>
                </div>
            </section>


        </>
    )
}
export default login