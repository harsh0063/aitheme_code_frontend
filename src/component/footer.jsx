import React from "react";
import logo from '../assets/logo.svg'
import f1 from '../assets/f1.svg'
import f2 from '../assets/f2.svg'
import f3 from '../assets/f3.svg'
import f4 from '../assets/f4.svg'
import f5 from '../assets/f5.svg'
import f6 from '../assets/f6.svg'
import { useGetCategoryQuery } from "../service/apislice";
import { Link, useNavigate } from "react-router-dom";

function HomePage() {

    const { data: footerCategories } = useGetCategoryQuery({fetch_all : true});
    const navigate = useNavigate();
    return (
        <>
            <footer className="mt-[90px] border-t-[3px] border-[#000] py-[50px]">
                <div className="container">
                    <div className="flex gap-[30px] max-lg:flex-wrap justify-between">
                        <div className="w-[430px] max-lg:w-[100%]">
                            <img src={logo} className="w-[247px]" alt="" />

                            <p className="text-[18px] mt-[30px] max-sm:text-[16px] leading-[36px] text-[#243238]">Aithemecode is a marketplace where you can buy everything you need to create a website. Hundreds of independent developers sell their products here so that you could create your own unique project.</p>

                            <div className="flex mt-[35px] items-center gap-[20px]">
                                <div>
                                    <img src={f1} alt="" />
                                </div>
                                <div>
                                    <img src={f2} alt="" />
                                </div>
                                <div>
                                    <img src={f3} alt="" />
                                </div>
                                <div>
                                    <img src={f4} alt="" />
                                </div>
                                <div>
                                    <img src={f5} alt="" />
                                </div>
                                <div>
                                    <img src={f6} alt="" />
                                </div>
                            </div>

                        </div>
                        <div className="max-lg:min-w-[180px] max-md:min-w-[150px]">
                            <h4 className="text-[22px] font-[600] max-sm:text-[20px] leading-[37px] mb-[10px]">Product</h4>

                            <ul>
                                {footerCategories?.data?.map((category) => (
                                    <li key={category.category_id} className="text-[18px] max-sm:text-[16px] max-sm:leading-[32px] capitalize text-[#303538] cursor-pointer leading-[37.5px]" onClick={() => navigate('/themes', {
                                        state: { category_id: category.category_id, name: category.name }
                                    })}>
                                        {category.name}
                                    </li>
                                ))}


                            </ul>
                        </div>
                        <div className="max-lg:min-w-[180px] max-md:min-w-[150px]">
                            <h4 className="text-[22px] font-[600] max-sm:text-[20px] leading-[37px] mb-[10px]">Company</h4>

                            <ul>
                                <li className="text-[18px] max-sm:text-[16px] max-sm:leading-[32px] text-[#303538] leading-[37.5px]">
                                    <Link to={"/themes"}>
                                    Themes
                                    </Link>
                                </li>
                                <li className="text-[18px] max-sm:text-[16px] max-sm:leading-[32px] text-[#303538] leading-[37.5px]">
                                    <Link to={"/about_us"}>
                                    About Us
                                    </Link>
                                </li>
                                <li className="text-[18px] max-sm:text-[16px] max-sm:leading-[32px] text-[#303538] leading-[37.5px]">
                                    <Link to={"/blog"}>
                                    Blog
                                    </Link>
                                </li>
                                <li className="text-[18px] max-sm:text-[16px] max-sm:leading-[32px] text-[#303538] leading-[37.5px]">
                                    <Link to={"/contact_us"}>
                                    Contact Us
                                    </Link>
                                </li>
                                {/* <li className="text-[18px] max-sm:text-[16px] max-sm:leading-[32px] text-[#303538] leading-[37.5px]">
                                Affiliate
                                </li> */}

                            </ul>
                        </div>
                        <div className="max-lg:min-w-[180px] max-md:min-w-[150px]">
                            <h4 className="text-[22px] font-[600] max-sm:text-[20px] leading-[37px] mb-[10px]">Legal</h4>

                            <ul>
                                <li className="text-[18px] max-sm:text-[16px] max-sm:leading-[32px] text-[#303538] leading-[37.5px]">
                                <Link to={"/privacy-policy"}>
                                    Privacy Policy
                                </Link>
                                </li>
                                <li className="text-[18px] max-sm:text-[16px] max-sm:leading-[32px] text-[#303538] leading-[37.5px]">
                                <Link to={"/terms-and-conditions"}>
                                    Terms and Conditions
                                </Link>
                                </li>
                                <li className="text-[18px] max-sm:text-[16px] max-sm:leading-[32px] text-[#303538] leading-[37.5px]">
                                <Link to={"/cancellation-and-refund-policy"}>
                                    Cancellation and Refund Policy
                                </Link>
                                </li>



                            </ul>
                        </div>
                    </div>
                    
                </div>
            </footer>
            <section className="border-t py-[21px] border-[#C2C2C2]">
                <p className="text-center max-sm:text-[17px] text-[19px] leading-[22px] text-[#303538]">Copyright © 2025 Creative Market, a Ai theme code. All rights reserved.</p>
            </section>
        </>
    );
}

export default HomePage;
