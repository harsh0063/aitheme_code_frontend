import React, { useState } from "react";
import Header from '../component/header'
import Footer from '../component/footer'
import Inject from '../component/inject'
import { toast } from "react-toastify";
import { Helmet } from "react-helmet-async";
import { useAddcontactMutation, useGetScriptQuery } from "../service/apislice";
const ContactUs = () => {

    const [data, setData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        subject: "",
        message: ""
    })
    const [addcontact] = useAddcontactMutation()

   const handlesubmit = async () => {
  // Check required fields
  if (!data.firstName?.trim() || !data.lastName?.trim() || !data.email?.trim() || !data.subject?.trim()) {
    toast.error("First name, last name, email, and subject are required", {
      autoClose: 1500,
    });
    return; // Stop execution if validation fails
  }

  try {
    const formData = new FormData();
    formData.append("first_name", data.firstName);
    formData.append("last_name", data.lastName);
    formData.append("email", data.email);
    formData.append("subject", data.subject);
    formData.append("message", data.message || ""); // message can be optional

    const res = await addcontact(formData).unwrap(); // Send FormData

    toast.success(res?.message || res?.data?.message || "Message Successfully Delivered", {
      autoClose: 1500,
    });
     // Clear all form fields after successful submit
    setData({
      firstName: "",
      lastName: "",
      email: "",
      subject: "",
      message: "",
    });
  } catch (error) {
    toast.error(error?.message || error?.data?.message || "Something went wrong", {
      autoClose: 1500,
    });
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
            <section className="container pt-[61px]">
                <div className="flex items-center gap-[10px] justify-center">
                    <span className="pop font-[400] text-[16px]  text-[#333333] ">Home</span>
                    <span>
                        <svg xmlns="http://www.w3.org/2000/svg" width="6" height="10" viewBox="0 0 6 10" fill="none">
                            <path d="M6 5.10819C6 5.24861 5.93783 5.38178 5.82959 5.47171L0.780571 9.67913C0.683622 9.75494 0.560975 9.79004 0.438599 9.77699C0.316223 9.76395 0.203729 9.70379 0.124938 9.60925C0.046147 9.51471 0.00724651 9.39321 0.0164736 9.27049C0.0257007 9.14776 0.0823308 9.03345 0.174372 8.95176L4.78729 5.10819L0.174688 1.2643C0.126085 1.22477 0.0858114 1.17599 0.0562029 1.12078C0.0265943 1.06557 0.00823924 1.00504 0.00220242 0.942679C-0.00383439 0.880323 0.00256686 0.81739 0.021035 0.757527C0.0395031 0.697664 0.069671 0.642062 0.109789 0.593945C0.149907 0.545829 0.199178 0.506154 0.254744 0.477221C0.310311 0.44829 0.371067 0.430676 0.433492 0.425402C0.495917 0.420127 0.558768 0.427296 0.618401 0.446494C0.678034 0.465692 0.733263 0.496537 0.780886 0.53724L5.82991 4.74465C5.88318 4.78907 5.92603 4.84466 5.95542 4.90749C5.98481 4.97031 6.00003 5.03883 6 5.10819Z" fill="#90A4AE" />
                        </svg>
                    </span>
                    <span className="pop  font-[400] text-[16px]  text-[#90A4AE]">Contact Us</span>
                </div>
                <div className="pt-[30px] max-lg:pt-[10px]">
                    <h2 className="pop  font-[600] text-[40px] max-sm:text-[35px] max-sm:leading-[45px] leading-[54px] text-center text-[#243238]">Contact Us</h2>
                    <p className="text-[20px] font-[400] max-lg:leading-[45px] max-sm:text-[18px] max-sm:leading-[35px] leading-[54px] text-center pt-[10px] text-[#243238]" >Please use the form below to contact us if you have any questions or feedback regarding our products or services.</p>
                </div>
            </section>


            <section className="container pt-[60px] pb-[13px]">
                <div className="flex max-lg:flex-col max-lg:gap-[20px] mx-auto max-w-[1051px]">
                    <div className="border-[1px] max-w-[667px] max-lg:max-w-full w-full border-[#D8D8D8] rounded-[12px] px-[30px]" >
                        <div className="grid max-sm:grid-cols-1 max-sm:gap-[30px] grid-cols-2  gap-[45px] py-[30px]">
                            <div >
                                <div>
                                    <p className="pop pb-[9px] pop  font-[400] text-[16px] leading-[100%]">First Name</p>
                                    <input value={data?.firstName} onChange={(e) => setData({ ...data, firstName: e.target.value })} type="text" className="pop leading-[100%] rounded-[6px] border-[1px] border-[#D1D5DB] border-solid py-[10px]  w-full pl-[13px]" style={{ "::placeholder": { color: "#9CA3AF" } }} placeholder="First Name" />
                                </div>
                            </div>
                            <div >
                                <div>
                                    <p className=" pop pb-[9px] pop  font-[400] text-[16px] leading-[100%]">Last Name</p>
                                    <input value={data?.lastName} onChange={(e) => setData({ ...data, lastName: e.target.value })} type="text" className="pop leading-[100%] rounded-[6px] border-[1px] border-[#D1D5DB] border-solid py-[10px] w-full pl-[13px] " style={{ "::placeholder": { color: "#9CA3AF" } }} placeholder="Last Name" />
                                </div>
                            </div>
                        </div>
                        <div className="">
                            <p className=" pop pb-[9px] pop  font-[400] text-[16px] leading-[100%] ">Your Email</p>
                            <input value={data?.email} onChange={(e) => setData({ ...data, email: e.target.value })} type="text" className="pop rounded-[6px] border-[1px] leading-[100%] border-[#D1D5DB] border-solid py-[10px] w-[100%] pl-[13px]" style={{ "::placeholder": { color: "#9CA3AF" } }} placeholder="Enter Your Email" />

                        </div>
                        <div className="py-[30px]">
                            <p className=" pop pb-[9px] pop  font-[400] text-[16px] leading-[100%]]">Subject</p>
                            <input value={data?.subject} onChange={(e) => setData({ ...data, subject: e.target.value })} type="text" className="rounded-[6px] border-[1px] leading-[100%] border-[#D1D5DB] border-solid py-[10px] w-[100%] pl-[13px]" style={{ "::placeholder": { color: "#9CA3AF" } }} placeholder="Subject" />
                            {/* <input
                                type="text"
                                className="rounded-[6px] border-[1px] leading-[100%] border-[#D1D5DB] border-solid py-[10px] w-[100%] pl-[13px] placeholder-gray-400"
                                placeholder="Subject"
                            /> */}

                        </div>
                        <div className="">
                            <p className="pop pb-[9px] pop  font-[400] text-[16px] leading-[100%]]">Your Message</p>
                            <textarea value={data?.message} onChange={(e) => setData({ ...data, message: e.target.value })} className="rounded-[6px] border-[1px] leading-[100%] border-[#D1D5DB] border-solid py-[10px] w-[100%] pl-[13px] h-[137px]" style={{ "::placeholder": { color: "#9CA3AF" } }} />

                        </div>
                        <div className="py-[30px]">
                            <button onClick={handlesubmit} className="font-[400] text-[20px] bg-black    h-[48px] w-full rounded-[8px] text-[#FFFFFF]">
                                Submit
                            </button>
                        </div>
                    </div>
                    <div className="pl-[60px] max-lg:pl-0">
                        <div>
                            <p className="font-[400] max-sm:text-[22px] max-sm:leading-[45px] text-[24px] leading-[54px] text-[#243238]">Email :</p>
                            <p className="font-[400] max-sm:text-[20px] text-[22px]  text-[#376BFF]">aithemecode@gmail.com</p>
                        </div>
                        <div className="pt-[10px]">
                            <p className="font-[400] max-sm:text-[22px] max-sm:leading-[45px] text-[24px] leading-[54px] text-[#243238]">Website :</p>
                            <p className="font-[400] max-sm:text-[20px] text-[22px]  text-[#376BFF]">www.aithemecode.com</p>
                        </div>
                    </div>

                </div>
            </section>
            <Footer />
        </>
    );
};

export default ContactUs;
