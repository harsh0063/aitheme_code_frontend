import React, { useState } from "react";
import Header from '../component/header'
import Footer from '../component/footer'
import banner from '../assets/banner-1.jpg'
import { toast } from "react-toastify";
import { Helmet } from "react-helmet-async";
import { useAddOrderMutation, useGetCartQuery, useGetScriptQuery, useGetUserQuery } from "../service/apislice";
import { useNavigate } from "react-router-dom";
const ContactUs = () => {

    const { data: cart } = useGetCartQuery()
    const navigate = useNavigate(); // For redirecting
    const { data: user1 } = useGetUserQuery();
    const user = user1?.data;
    const [addorder] = useAddOrderMutation()

    const handlesubmit = async () => {
        try {
            // 1. Prepare formData
            const formData = new FormData();
            formData.append("is_cart", true);

            // 2. Call backend to create Razorpay order
            const res = await addorder(formData).unwrap();
            const { razorpay_order_id, amount, currency } = res;




            // 3. Razorpay payment config
            const options = {
                key: "rzp_live_9kPuonCRbdUuKp",
                amount: amount * 100,
                currency,
                name: "AiThemeCode",
                description: "Order Payment",
                order_id: razorpay_order_id,
                handler: async function (res) {
                    const formData = new FormData();
                    formData.append("razorpay_order_id", res.razorpay_order_id);
                    formData.append("razorpay_payment_id", res.razorpay_payment_id);
                    formData.append("razorpay_signature", res.razorpay_signature);

                    // Pass formData to your verifyPayment function
                    await verifyPayment(formData);
                    navigate("/profile"); // Change this route as per your app
                },
                prefill: {
                    name: user?.first_name + user?.last_name,
                    email: user?.email,
                    contact: user?.mobile_no,
                },
                method: {
                    netbanking: true,
                    card: true,
                    upi: true,
                    wallet: true,
                    emi: true,
                    paylater: true,
                },
                theme: {
                    color: "#3399cc",
                },
            };


            const razorpay = new window.Razorpay(options);
            razorpay.open();

        } catch (error) {
            toast.error(error.data?.message || "Payment Faild", {
                autoClose: 1000,
            });
            console.error("Payment Error:", error);
        }
    };
    return (

        <>

            <Helmet>
                <title>{"Contact AIThemeCode – Get Support for Website Themes & Templates"}</title>
                <meta name="description" xml:lang="en" lang="en" content={"Have questions about our themes? Contact AIThemeCode for support, inquiries, or collaborations. We’re here to help you build your perfect website."} />
                <meta name="og:description" content={"Have questions about our themes? Contact AIThemeCode for support, inquiries, or collaborations. We’re here to help you build your perfect website."} />
                <meta name="og:url" content={`https://aithemecode.com/contact_us`} />
                <meta name="og:title" content={"Contact AIThemeCode – Get Support for Website Themes & Templates"} />
                <meta name="twitter:title" content={"Contact AIThemeCode – Get Support for Website Themes & Templates"} />
                <meta name="twitter:url" content={`https://aithemecode.com/contact_us`} />
                <meta name="twitter:description" content={"Have questions about our themes? Contact AIThemeCode for support, inquiries, or collaborations. We’re here to help you build your perfect website."} />

                <link rel="canonical" href={`https://aithemecode.com/contact_us`} />
            </Helmet>
            <Header />


            <section className="py-[60px] max-sm:py-[30px] min-h-[85vh]">
                <div className="container">
                    <div className="max-w-[1420px] max-xl:flex-wrap mx-auto flex gap-[34px]">
                        <div className="w-full">
                            <div className="border w-full order-1 max-xl:order-2 rounded-[10px] max-sm:p-[20px] p-[30px] border-[#D8D8D8]">
                                <div className="flex items-center pb-[20px] justify-between w-full">

                                    <h2 className="text-[22px] pop font-medium leading-[54px] text-[#243238] max-sm:text-[20px] max-sm:leading-[40px]">Billing Details</h2>
                                    <button onClick={() => {
                                        navigate('/checkout_page');
                                    }} className="h-[37px] w-[74px] bg-[#E4E4E4] rounded-[3px] robo font-[500] text-[#8E8E8E]">Edit</button>
                                </div>

                                <ul className="pop space-y-[10px]">
                                    <li className="font-light pop max-sm:text-sm">
                                        <span className="font-[500] pop">Name : </span> {user?.first_name} {user?.last_name}
                                    </li>
                                    <li className="font-light pop max-sm:text-sm">
                                        <span className="font-[500] pop">Company Name :</span> {user?.company_name}
                                    </li>
                                    <li className="font-light pop max-sm:text-sm">
                                        <span className="font-[500] pop">Address :</span> {user?.address_line1}
                                    </li>
                                    <li className="font-light pop max-sm:text-sm">
                                        <span className="font-[500] pop">Email Address  :</span>  {user?.email}
                                    </li>
                                    <li className="font-light pop max-sm:text-sm">
                                        <span className="font-[500] pop">Phone Number : </span>  {user?.mobile_no}
                                    </li>
                                    <li className="font-light pop max-sm:text-sm">
                                        <span className="font-[500] pop">GSTIN : </span>   {user?.GSTIN}
                                    </li>
                                </ul>

                            </div>


                            <button onClick={handlesubmit} className="leading-[54px] flex items-center gap-[22px] max-md:gap-[10px] justify-center max-md:leading-[44px] max-sm:leading-[38px] max-sm:text-[16px]  w-full bg-[#009CDE] shadow-[0px_3px_0px_0px_#038CC5] text-[18px] pop font-[600] mt-[30px] text-white rounded-[3px]">
                                <svg xmlns="http://www.w3.org/2000/svg" className="max-md:h-[24px]" width="38" height="34" viewBox="0 0 38 34" fill="none">
                                    <path d="M35.8414 17.1429V12.3641C35.8414 10.7437 34.4894 9.42593 32.7813 9.29814L28.0077 1.54673C27.5653 0.829831 26.851 0.317441 25.9963 0.104676C25.1456 -0.106641 24.256 0.00434188 23.4946 0.416326L7.13045 9.27322H4.2564C2.42278 9.27322 0.931641 10.6594 0.931641 12.3641V30.9096C0.931641 32.6142 2.4227 34.0005 4.2564 34.0005H32.5166C34.3503 34.0005 35.8414 32.6143 35.8414 30.9096V26.1309C36.8068 25.8108 37.5037 24.9611 37.5037 23.955V19.3187C37.5037 18.3126 36.8068 17.4629 35.8414 17.1429ZM30.8496 9.27322H23.605L29.0385 6.33232L30.8496 9.27322ZM28.2126 4.99118L20.3011 9.27322H17.0196L27.3921 3.65888L28.2126 4.99118ZM24.3314 1.75196C24.7072 1.54745 25.1463 1.49312 25.566 1.59729C25.9906 1.70291 26.3445 1.95799 26.5645 2.31491L26.5662 2.31774L13.7158 9.27322H10.4344L24.3314 1.75196ZM34.179 30.9096C34.179 31.7615 33.433 32.455 32.5166 32.455H4.2564C3.34002 32.455 2.59406 31.7615 2.59406 30.9096V12.3641C2.59406 11.5122 3.34002 10.8187 4.2564 10.8187H32.5166C33.433 10.8187 34.179 11.5122 34.179 12.3641V17.0005H29.1919C26.4418 17.0005 24.2048 19.0802 24.2048 21.6369C24.2048 24.1935 26.4418 26.2732 29.1919 26.2732H34.179V30.9096ZM35.8414 23.955C35.8414 24.3814 35.4689 24.7278 35.0102 24.7278H29.1919C27.3583 24.7278 25.8671 23.3416 25.8671 21.6369C25.8671 19.9322 27.3582 18.5459 29.1919 18.5459H35.0102C35.4688 18.5459 35.8414 18.8923 35.8414 19.3187V23.955Z" fill="white" />
                                    <path d="M29.1921 20.0918C28.2757 20.0918 27.5298 20.7853 27.5298 21.6372C27.5298 22.4892 28.2757 23.1827 29.1921 23.1827C30.1085 23.1827 30.8545 22.4892 30.8545 21.6372C30.8545 20.7853 30.1086 20.0918 29.1921 20.0918Z" fill="white" />
                                </svg> Pay Now</button>
                        </div>
                        <div className=" order-2 max-xl:order-1 max-xl:w-full">

                            <div className="border  w-[476px] max-sm:p-[20px] max-xl:w-full rounded-[10px] p-[20px_30px_5px_30px] border-[#D8D8D8]">
                                <h2 className="text-[22px] pop font-medium leading-[54px] text-[#243238] max-sm:text-[20px] max-sm:leading-[40px]">Order Summary</h2>
                                <div className="mt-[10px] border-t border-b border-[#D8D8D8]">
                                    {cart?.data?.map((val, index) => (

                                        <div key={index} className="flex  gap-[16px] pt-[20px] pb-[30px]">
                                            <div className="min-w-[117px] max-sm:h-[85px] max-w-[117px] h-[94px]">
                                                <img
                                                    src={val?.theme_thumbnail}
                                                    className="object-cover w-full h-full rounded-[4px] shadow-[2.15px_2.15px_2.87px_0px_#0000004D]"
                                                    alt=""
                                                />
                                            </div>
                                            <div>
                                                <p className="pop text-[#243238] max-md:text-sm max-sm:text-[12px]">
                                                    {val?.theme_name}
                                                </p>
                                                <span className="text-[17.44px] max-sm:text-[15px] leading-[42.8px] pop font-medium text-[#243238]">$ {val?.total_price}</span>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                                <div className="text-right text-[18px] max-sm:text-[16px] max-sm:leading-normal pt-[10px] leading-[54px] text-[#363232]">
                                    Total : <span className="font-medium">${cart?.total_price_sum}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="text-center text-[19px] max-sm:text-sm max-sm:py-[12px] pop text-[#303538] py-[17px] border-t border-[#C2C2C2]" >
              Copyright ©2025 AI Theme Code. All Rights Reserved. 
            </section>


        </>
    );
};

export default ContactUs;
