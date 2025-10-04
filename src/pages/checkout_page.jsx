import React, { useEffect, useState } from "react";
import Header from '../component/header'
import Footer from '../component/footer'
import banner from '../assets/banner-1.jpg'
import { toast } from "react-toastify";
import { Helmet } from "react-helmet-async";
import { useEditProfileMutation, useGetCartQuery, useGetScriptQuery, useGetUserQuery } from "../service/apislice";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css"; // default styles
import { useNavigate } from "react-router-dom";
const ContactUs = () => {


    const { data: cart } = useGetCartQuery()
    const { data: user1 } = useGetUserQuery();
    const user = user1?.data;
    const [formData, setFormData] = useState({
        first_name: "",
        last_name: "",
        company_name: "",
        email: "",
        country: "",
        address_line1: "",
        address_line2: "",
        city: "",
        state: "",
        ZIP: "",
        GSTIN: ""
    });
    const [phone, setPhone] = useState("");
    useEffect(() => {
        if (user) {
            setFormData({
                first_name: user.first_name || "",
                last_name: user.last_name || "",
                company_name: user.company_name || "",
                email: user.email || "",
                country: user.country || "",
                address_line1: user.address_line1 || "",
                address_line2: user.address_line2 || "",
                city: user.city || "",
                state: user.state || "",
                ZIP: user.ZIP || "",
                GSTIN: user.GSTIN || ""
            });

            setPhone(user.mobile_no || "");
        }
    }, [user]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };
    const navigate = useNavigate(); // For redirecting
    const [editProfile, { isLoading, isSuccess, isError }] = useEditProfileMutation();

    const handleSubmit = async () => {
        const form = new FormData();
        for (let key in formData) {
            form.append(key, formData[key]);
        }

        try {
            const result = await editProfile(form).unwrap(); // unwrap for error handling
            console.log("Profile updated successfully:", result);

            // ✅ Redirect on success
            navigate('/billing_details'); // Or use window.location.href = '/next-page'
        } catch (err) {
            console.error("Failed to update profile:", err);
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


            <section className="py-[60px] max-sm:py-[30px]">
                <div className="container">
                    <div className="max-w-[1420px] max-xl:flex-wrap mx-auto flex gap-[34px]">
                        <div className="border w-full order-1 max-xl:order-2 rounded-[10px] max-sm:p-[20px] p-[20px_00px_40px_0px] border-[#D8D8D8]">
                            <div className="ps-[30px] pe-[26px] max-sm:p-0">

                                <h2 className="text-[22px] pop font-medium leading-[54px] text-[#243238] max-sm:text-[20px] max-sm:leading-[40px]">Billing Details</h2>
                                <p className="text-sm robo text-black font-light max-sm:text-[12px]">ATC collects and uses personal data in accordance with our <span className="underline font-[500]">Privacy Policy.</span> By creating an account, you agree to our  <span className="underline font-[500]">Terms and Conditions.</span></p>
                            </div>
                            <div className="mt-[20px] max-sm:mx-0 max-sm:pt-[25px] mx-[30px] border-t space-y-[20px] border-[#D8D8D8] pt-[50px]">
                                <div className="grid grid-cols-2 gap-[50px] max-sm:grid-cols-1 max-sm:gap-[20px]">
                                    <div>
                                        <label className="robo block text-sm font-light leading-[20px] mb-[4px] max-sm:text-[12px]" htmlFor="">First Name</label>
                                        <input onChange={handleInputChange} name="first_name" value={formData?.first_name || ""} type="text" className="max-sm:h-[36px] max-sm:text-[12px] h-[42px] w-full px-[15px] border border-[#D1D5DB] rounded-[6px] text-[14px] leading-[20px] placeholder-[#B1B1B1]" placeholder="First  Name" />
                                    </div>
                                    <div>
                                        <label className="robo block text-sm font-light leading-[20px] mb-[4px] max-sm:text-[12px]" htmlFor="">Last Name</label>
                                        <input onChange={handleInputChange} name="last_name" value={formData?.last_name || ""} type="text" className="max-sm:h-[36px] max-sm:text-[12px] h-[42px] w-full px-[15px] border border-[#D1D5DB] rounded-[6px] text-[14px] leading-[20px] placeholder-[#B1B1B1]" placeholder="Last  Name" />
                                    </div>
                                </div>
                                <div>
                                    <label className="robo block text-sm font-light leading-[20px] mb-[4px] max-sm:text-[12px]" htmlFor="">Company Name</label>
                                    <input onChange={handleInputChange} name="company_name" value={formData?.company_name || ""} type="text" className="max-sm:h-[36px] max-sm:text-[12px] h-[42px] w-full px-[15px] border border-[#D1D5DB] rounded-[6px] text-[14px] leading-[20px] placeholder-[#B1B1B1]" placeholder="Company Name" />
                                </div>
                                <div className="grid grid-cols-2 gap-[50px] max-sm:grid-cols-1 max-sm:gap-[20px]">
                                    <div>
                                        <label className="robo block text-sm font-light leading-[20px] mb-[4px] max-sm:text-[12px]" htmlFor="">Your Email</label>
                                        <input onChange={handleInputChange} name="email" value={formData?.email || ""} type="email" className="max-sm:h-[36px] max-sm:text-[12px] h-[42px] w-full px-[15px] border border-[#D1D5DB] rounded-[6px] text-[14px] leading-[20px] placeholder-[#B1B1B1]" placeholder="designer@example.com" />
                                    </div>
                                    <div>
                                        <label className="robo block text-sm font-light leading-[20px] mb-[4px] max-sm:text-[12px]" htmlFor="">Your Phone Number</label>
                                        <PhoneInput
                                            country={"us"} // default country
                                            value={phone}
                                            onChange={(value) => setPhone(value)}
                                            inputProps={{
                                                name: "phone",
                                                required: true,
                                            }}
                                            inputClass="!w-full !h-[42px] !max-sm:h-[36px] !ps-[45px] !rounded-[6px] !text-[14px] !max-sm:text-[12px] !px-[15px] border border-[#D1D5DB] !placeholder-[#B1B1B1]"
                                            containerClass="w-full"
                                        />
                                    </div>
                                </div>
                                <div>
                                    <label className="robo block text-sm font-light leading-[20px] mb-[4px] max-sm:text-[12px]" htmlFor="">Country</label>
                                    <input onChange={handleInputChange} name="country" value={formData?.country || ""} type="text" className="max-sm:h-[36px] max-sm:text-[12px] h-[42px] w-full px-[15px] border border-[#D1D5DB] rounded-[6px] text-[14px] leading-[20px] placeholder-[#B1B1B1]" placeholder="Country" />
                                </div>
                                <div>
                                    <label className="robo block text-sm font-light leading-[20px] mb-[4px] max-sm:text-[12px]" htmlFor="">Address Line 1</label>
                                    <input onChange={handleInputChange} name="address_line1" value={formData?.address_line1 || ""} type="text" className="max-sm:h-[36px] max-sm:text-[12px] h-[42px] w-full px-[15px] border border-[#D1D5DB] rounded-[6px] text-[14px] leading-[20px] placeholder-[#B1B1B1]" placeholder="Address Line 1" />
                                </div>
                                <div>
                                    <label className="robo block text-sm font-light leading-[20px] mb-[4px] max-sm:text-[12px]" htmlFor="">Address Line 2</label>
                                    <input onChange={handleInputChange} name="address_line2" value={formData?.address_line2 || ""} type="text" className="max-sm:h-[36px] max-sm:text-[12px] h-[42px] w-full px-[15px] border border-[#D1D5DB] rounded-[6px] text-[14px] leading-[20px] placeholder-[#B1B1B1]" placeholder="Address Line 2" />
                                </div>
                                <div className="grid grid-cols-3 gap-[28px] max-sm:grid-cols-1 max-sm:gap-[20px]">
                                    <div>
                                        <label className="robo block text-sm font-light leading-[20px] mb-[4px] max-sm:text-[12px]" htmlFor="">City</label>
                                        <input onChange={handleInputChange} name="city" value={formData?.city || ""} type="text" className="max-sm:h-[36px] max-sm:text-[12px] h-[42px] w-full px-[15px] border border-[#D1D5DB] rounded-[6px] text-[14px] leading-[20px] placeholder-[#B1B1B1]" placeholder="City" />
                                    </div>
                                    <div>
                                        <label className="robo block text-sm font-light leading-[20px] mb-[4px] max-sm:text-[12px]" htmlFor="">State / Province / Region</label>
                                        <input onChange={handleInputChange} name="state" value={formData?.state || ""} type="text" className="max-sm:h-[36px] max-sm:text-[12px] h-[42px] w-full px-[15px] border border-[#D1D5DB] rounded-[6px] text-[14px] leading-[20px] placeholder-[#B1B1B1]" placeholder="State" />
                                    </div>
                                    <div>
                                        <label className="robo block text-sm font-light leading-[20px] mb-[4px] max-sm:text-[12px]" htmlFor="">ZIP / Postal Code</label>
                                        <input onChange={handleInputChange} name="ZIP" value={formData?.ZIP || ""} type="text" className="max-sm:h-[36px] max-sm:text-[12px] h-[42px] w-full px-[15px] border border-[#D1D5DB] rounded-[6px] text-[14px] leading-[20px] placeholder-[#B1B1B1]" placeholder="ZIP / Postal Code" />
                                    </div>
                                </div>
                                <div className="grid grid-cols-3 gap-[28px] max-sm:grid-cols-1 max-sm:gap-[20px]">
                                    <div>
                                        <label className="robo block text-sm font-light leading-[20px] mb-[4px] max-sm:text-[12px]" htmlFor="">GSTIN</label>
                                        <input
                                            value={formData?.GSTIN || ""}
                                            type="text"
                                            maxLength={15}
                                            onChange={handleInputChange} name="GSTIN"
                                            className="max-sm:h-[36px] max-sm:text-[12px] h-[42px] w-full px-[15px] border border-[#D1D5DB] rounded-[6px] text-[14px] leading-[20px] placeholder-[#B1B1B1] uppercase"
                                            placeholder="22AAAAA2222A0Z5"
                                        />
                                    </div>

                                </div>
                            </div>
                            <div className="px-[30px] max-sm:p-0">

                                <button onClick={handleSubmit} className="leading-[54px] max-md:leading-[44px] max-sm:leading-[38px] max-sm:text-[16px]  w-full bg-[#82B440] shadow-[0px_3px_0px_0px_#6F9A36] text-[18px] pop font-[600] mt-[30px] text-white rounded-[3px]">Save & Continue</button>
                            </div>
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
