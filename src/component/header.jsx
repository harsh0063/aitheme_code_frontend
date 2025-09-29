import React, { useEffect, useState } from "react";
import logo from '../assets/logo.svg'
import download from '../assets/download.svg'
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useGetCartQuery, useGetCategoryQuery, useGetWhishlistQuery } from "../service/apislice";

function HomePage() {
    const navigate = useNavigate()

    const { pathname } = useLocation();
    useEffect(() => {
        window.scrollTo(0, 0); // Scrolls to the top when the route changes
    }, [pathname]);
    const { data: category, isLoading: isCategoryLoading } = useGetCategoryQuery({ fetch_all: true },
        {
            keepUnusedDataFor: 300,
            refetchOnMountOrArgChange: false,
        })
    console.log(category);

    const { data: cartcount } = useGetCartQuery(undefined, {
        skip: !localStorage.getItem('aithemetoken')
    });

    const { data: whishcount } = useGetWhishlistQuery(undefined, {
        skip: !localStorage.getItem('aithemetoken')
    });


    const [isOpen, setIsOpen] = useState(false);
    return (
        <section className="py-[29px] border-b-2 max-lg:py-[18px] max-sm:py-[12px]">
            <div className="container">
                <div className="flex items-center justify-between">
                    <div>
                        <img src={logo} onClick={() => navigate('/')} className="cursor-pointer max-sm:hidden" alt="" />
                        <img src={download} onClick={() => navigate('/')} className="cursor-pointer w-[30px] sm:hidden" alt="" />
                    </div>
                    <div className="max-lg:hidden">
                        <ul className="flex font-[300] max-xl:gap-[40px] text-[20px] items-center gap-[60px]">
                            <li className="relative group">
                                <Link to={'/themes'} className="flex items-center gap-2 max-xl:text-[16px]" onClick={sessionStorage.setItem("product_page", 1)}>
                                    Themes <svg xmlns="http://www.w3.org/2000/svg" width="12" height="7" viewBox="0 0 12 7" fill="none">
                                        <path fillRule="evenodd" clipRule="evenodd" d="M11.8403 0.159707C11.9426 0.262101 12 0.400899 12 0.545615C12 0.690331 11.9426 0.829129 11.8403 0.931522L6.37934 6.39248C6.27694 6.49474 6.13814 6.55219 5.99343 6.55219C5.84871 6.55219 5.70991 6.49474 5.60752 6.39248L0.146566 0.931522C0.0501038 0.828001 -0.0024111 0.69108 8.50795e-05 0.549604C0.00258126 0.408128 0.0598936 0.273143 0.159948 0.173089C0.260002 0.0730349 0.394986 0.0157227 0.536462 0.0132265C0.677938 0.0107303 0.81486 0.063245 0.918381 0.159707L5.99343 5.23476L11.0685 0.159707C11.1709 0.0574415 11.3097 0 11.4544 0C11.5991 0 11.7379 0.0574415 11.8403 0.159707Z" fill="#2E2E2E" />
                                    </svg>
                                </Link>
                                <div className="absolute top-full z-[8] max-xl:py-2 left-0 hidden group-hover:block bg-white shadow-[0px_4.09px_16.37px_0px_#e8e8e8] rounded-md p-2 w-40">
                                    {category?.data
                                        ?.filter(cat => ["Html", "Wordpress"].includes(cat.name)) // ✅ Only Html & Wordpress
                                        .map((cat, index) => (
                                            <div
                                                key={index}
                                                to="/Products"
                                                className="block max-xl:text-sm text-[16px] cursor-pointer px-3 py-2 hover:bg-gray-100"
                                                onClick={() =>
                                                    navigate(`/${cat.name.toLowerCase().replace(/\s+/g, '-')}`, {
                                                        state: { category_id: cat.category_id, name: cat.name },
                                                    })
                                                }
                                            >
                                                {cat.name}
                                            </div>
                                        ))}
                                </div>

                            </li>
                            <li className=" ">
                                <Link to={'/about_us'} className="max-xl:text-[16px]">
                                    About Us
                                </Link>
                            </li>
                            <li className=" ">
                                <Link to={'/blog'} className="max-xl:text-[16px]">
                                    Blog
                                </Link>
                            </li>
                            <li className=" ">
                                <Link to={'/contact_us'} className="max-xl:text-[16px]">
                                    Contact Us
                                </Link>
                            </li>
                        </ul>
                    </div>
                    <div className="flex max-sm:gap-[20px] gap-[30px]">
                        <ul className="flex gap-[20px] max-lg:hidden">
                             <li>
                                <button className="h-[37px] max-xl:w-[120px] max-xl:text-[14px] max-xl:h-[30px] hover:bg-black hover:text-white transition-all duration-250 font-[400] py-0 w-[160px] rounded-[3px] bg-transparent border border-[#000000]">Free Downloads</button>
                            </li>
                            {/* <li>
                                <button className="w-[100px]  justify-center text-white py-0 h-[37px] flex rounded-[3px] gap-[12px] font-[300] items-center bg-[#F44336] " onClick={() => navigate('/sales')}>
                                    <div>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
                                            <path d="M19.0811 10.0012L19.9586 7.71252C20.0549 7.46003 19.9799 7.17379 19.7686 7.00254L17.8662 5.46009L17.4812 3.03891C17.4387 2.77142 17.2287 2.56268 16.9612 2.52018L14.54 2.13519L12.9988 0.231496C12.8288 0.0202525 12.5363 -0.0547453 12.2901 0.0415018L10.0002 0.920226L7.71148 0.0427518C7.45774 -0.0547453 7.174 0.0227524 7.00275 0.232746L5.4603 2.13644L3.03912 2.52143C2.90909 2.54237 2.78898 2.60377 2.69585 2.69689C2.60272 2.79002 2.54132 2.91014 2.52038 3.04016L2.1354 5.46134L0.231703 7.00379C0.0217092 7.17379 -0.0545385 7.46003 0.0417086 7.71252L0.919183 10.0012L0.0417086 12.2899C-0.0557885 12.5424 0.0217092 12.8286 0.231703 12.9986L2.1354 14.5398L2.52038 16.961C2.56288 17.2285 2.77163 17.4385 3.03912 17.481L5.4603 17.866L7.00275 19.7684C7.08556 19.8714 7.19902 19.9453 7.32668 19.9795C7.45433 20.0137 7.58955 20.0063 7.71273 19.9584L10.0002 19.0822L12.2888 19.9597C12.3603 19.9869 12.4361 20.0009 12.5126 20.0009C12.6963 20.0009 12.8776 19.9197 12.9988 19.7684L14.54 17.866L16.9612 17.481C17.0916 17.4602 17.2122 17.3988 17.3056 17.3054C17.399 17.212 17.4604 17.0914 17.4812 16.961L17.8662 14.5398L19.7686 12.9986C19.9799 12.8274 20.0549 12.5424 19.9586 12.2899L19.0811 10.0012Z" fill="white" />
                                            <path d="M8.12519 8.75124C7.09147 8.75124 6.25024 7.91002 6.25024 6.8763C6.25024 5.84258 7.09147 5.00135 8.12519 5.00135C9.15891 5.00135 10.0001 5.84258 10.0001 6.8763C10.0001 7.91002 9.15891 8.75124 8.12519 8.75124ZM8.12519 6.25132C7.7802 6.25132 7.50021 6.53131 7.50021 6.8763C7.50021 7.22129 7.7802 7.50128 8.12519 7.50128C8.47018 7.50128 8.75017 7.22129 8.75017 6.8763C8.75017 6.53131 8.47018 6.25132 8.12519 6.25132ZM11.8751 15.0011C10.8414 15.0011 10.0001 14.1598 10.0001 13.1261C10.0001 12.0924 10.8414 11.2512 11.8751 11.2512C12.9088 11.2512 13.75 12.0924 13.75 13.1261C13.75 14.1598 12.9088 15.0011 11.8751 15.0011ZM11.8751 12.5011C11.5313 12.5011 11.2501 12.7824 11.2501 13.1261C11.2501 13.4699 11.5313 13.7511 11.8751 13.7511C12.2188 13.7511 12.5001 13.4699 12.5001 13.1261C12.5001 12.7824 12.2188 12.5011 11.8751 12.5011ZM6.87523 15.0011C6.74898 15.0011 6.62273 14.9636 6.51274 14.8848C6.23149 14.6836 6.1665 14.2936 6.36774 14.0123L12.6176 5.2626C12.8188 4.98135 13.2088 4.91636 13.49 5.1176C13.7713 5.31759 13.835 5.70883 13.635 5.98882L7.38521 14.7386C7.26146 14.9098 7.07022 15.0011 6.87523 15.0011Z" fill="#F44336" />
                                        </svg>
                                    </div>  Sale</button>
                            </li> */}
                        </ul>

                        <ul className="flex gap-[30px] max-sm:gap-[15px] items-center ">
                            {localStorage.getItem('aithemetoken') ? (
                                <>
                                    <li className="relative">
                                        <Link to={'/wishlist'}>
                                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="22" viewBox="0 0 24 22" fill="none">
                                                <path d="M16.7996 4.39614e-05C15.0258 -0.00619022 13.3137 0.650831 11.9994 1.84213C10.6851 0.650831 8.97303 -0.00619022 7.19919 4.39614e-05C5.79478 0.000267289 4.42109 0.411199 3.24726 1.18224C2.07343 1.95328 1.15071 3.05078 0.592717 4.33958C0.0347227 5.62839 -0.134186 7.05224 0.106787 8.43583C0.34776 9.81942 0.988096 11.1023 1.94895 12.1266L11.5794 21.433C11.6921 21.5417 11.8428 21.602 11.9994 21.601C12.1539 21.6004 12.3022 21.5403 12.4134 21.433L22.0679 12.1086C23.0239 11.0825 23.6594 9.79957 23.8964 8.41733C24.1334 7.03509 23.9617 5.61371 23.4021 4.32774C22.8426 3.04177 21.9198 1.94718 20.7469 1.17838C19.5739 0.40958 18.2021 3.86371e-05 16.7996 4.39614e-05ZM21.2158 11.2686L11.9994 20.167L2.80699 11.2866C1.78758 10.1145 1.26242 8.59285 1.34194 7.04156C1.42147 5.49026 2.0995 4.03026 3.23341 2.96862C4.36733 1.90698 5.86876 1.32645 7.42193 1.34912C8.9751 1.37179 10.4589 1.9959 11.5614 3.09019C11.6175 3.15014 11.6854 3.19793 11.7607 3.2306C11.836 3.26327 11.9173 3.28013 11.9994 3.28013C12.0815 3.28013 12.1628 3.26327 12.2381 3.2306C12.3135 3.19793 12.3813 3.15014 12.4374 3.09019C12.9952 2.49175 13.6706 2.01497 14.4212 1.68973C15.1718 1.36449 15.9816 1.19779 16.7996 1.2001C17.9662 1.199 19.1079 1.53801 20.0848 2.17564C21.0617 2.81326 21.8316 3.72184 22.3002 4.7902C22.7688 5.85855 22.9158 7.04034 22.7232 8.19094C22.5306 9.34154 22.0068 10.411 21.2158 11.2686Z" fill="black" />
                                            </svg>
                                        </Link>
                                        {
                                            whishcount?.total_items > 0 &&
                                            <div className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] font-bold px-1 rounded-full">
                                                {whishcount?.total_items || 0}
                                            </div>
                                        }

                                    </li>
                                    <li className="relative">
                                        <Link to={'/cart'}>
                                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                                                <path d="M7.6559 18.3731C6.27209 18.3731 5.15034 19.4949 5.15034 20.8787C5.15034 22.2625 6.27214 23.3843 7.6559 23.3843C9.03971 23.3843 10.1614 22.2625 10.1614 20.8787C10.1615 19.4949 9.03971 18.3731 7.6559 18.3731ZM7.6559 22.2707C6.88713 22.2707 6.26393 21.6475 6.26393 20.8788C6.26393 20.11 6.88713 19.4868 7.6559 19.4868C8.42467 19.4868 9.04786 20.11 9.04786 20.8788C9.04791 21.6475 8.42467 22.2707 7.6559 22.2707ZM18.235 18.3731C16.8512 18.3731 15.7295 19.4949 15.7295 20.8787C15.7295 22.2625 16.8513 23.3843 18.235 23.3843C19.6188 23.3843 20.7406 22.2625 20.7406 20.8787C20.7406 19.4949 19.6188 18.3731 18.235 18.3731ZM18.235 22.2707C17.4662 22.2707 16.843 21.6475 16.843 20.8788C16.843 20.11 17.4662 19.4868 18.235 19.4868C19.0038 19.4868 19.627 20.11 19.627 20.8788C19.627 21.6475 19.0038 22.2707 18.235 22.2707ZM23.8865 3.75734C23.7705 3.63071 23.6119 3.55138 23.441 3.5346L5.3174 3.28404L4.81629 1.75284C4.46326 0.729253 3.50474 0.0382282 2.42205 0.0267715H0.556795C0.249276 0.0267715 0 0.276048 0 0.583567C0 0.891086 0.249276 1.14036 0.556795 1.14036H2.42205C2.71764 1.1469 3.00414 1.24378 3.24304 1.41798C3.48194 1.59217 3.66178 1.83533 3.75838 2.11477L7.29402 12.7774L7.01565 13.4177C6.8626 13.8124 6.8055 14.2378 6.84907 14.6589C6.89263 15.08 7.0356 15.4847 7.26621 15.8397C7.49449 16.1882 7.8035 16.4765 8.16701 16.6801C8.53051 16.8836 8.93777 16.9965 9.35421 17.009H20.1839C20.4914 17.009 20.7407 16.7597 20.7407 16.4522C20.7407 16.1447 20.4914 15.8954 20.1839 15.8954H9.35415C9.11918 15.8895 8.88934 15.8254 8.68526 15.7088C8.48118 15.5922 8.30924 15.4267 8.18488 15.2272C8.0616 15.0297 7.98499 14.8067 7.96087 14.5752C7.93675 14.3436 7.96576 14.1096 8.04569 13.8909L8.26843 13.3898L19.9889 12.1648C21.2764 12.023 22.3354 11.0867 22.6337 9.82629L23.9701 4.23053C23.9996 4.15137 24.0075 4.06574 23.9928 3.98253C23.9781 3.89932 23.9414 3.82157 23.8865 3.75734ZM21.548 9.57579C21.3672 10.3871 20.6784 10.9856 19.8498 11.0513L8.26843 12.2484L5.67932 4.39763L22.7451 4.64819L21.548 9.57579Z" fill="black" />
                                            </svg>
                                        </Link>
                                        {
                                            cartcount?.total_items > 0 &&
                                            <div className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] font-bold px-1 rounded-full">
                                                {cartcount?.total_items || 0}
                                            </div>
                                        }

                                    </li>
                                </>
                            ) : (
                                ""
                            )}
                            <li className="flex gap-[8px]">
                                {localStorage.getItem('aithemetoken') ? (


                                    <div>
                                        <Link to={localStorage.getItem('aithemetoken') ? '/profile' : '/login'}>
                                            <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none">
                                                <path d="M12 0C5.37243 0 0 5.3724 0 12C0 18.6276 5.3724 24 12 24C18.6276 24 24 18.6276 24 12C24 5.37243 18.6276 0 12 0ZM4.75321 19.992C5.88359 17.0784 8.68679 15 12 15C15.3132 15 18.1164 17.0784 19.2468 19.9908C17.3292 21.7308 14.7924 22.8 12 22.8C9.20757 22.8 6.67077 21.7308 4.75319 19.992L4.75321 19.992ZM8.4 10.2C8.4 8.21161 10.0116 6.6 12 6.6C13.9884 6.6 15.6 8.21159 15.6 10.2C15.6 12.1884 13.9884 13.8 12 13.8C10.0116 13.8 8.4 12.1884 8.4 10.2ZM20.1528 19.0692C19.092 16.7544 17.1012 14.9628 14.6388 14.2044C15.9396 13.3464 16.8 11.8752 16.8 10.2C16.8 7.54919 14.6508 5.40001 12 5.40001C9.34921 5.40001 7.19998 7.54921 7.19998 10.2C7.19998 11.8752 8.06038 13.3464 9.36238 14.2056C6.89999 14.9628 4.90919 16.7544 3.84837 19.0704C2.20198 17.1744 1.19999 14.7072 1.19999 12C1.19999 6.0348 6.03477 1.19999 12 1.19999C17.9652 1.19999 22.8 6.0348 22.8 12C22.8 14.7072 21.7968 17.1744 20.1528 19.0692H20.1528Z" fill="black" />
                                            </svg>
                                        </Link>
                                    </div>
                                ) : (
                                    // <div className="font-[300] ">Login</div>
                                    <Link to="/login" className="border rounded-[5px] p-[4px_10px] font-medium text-sm transition-all duration-200 hover:bg-black hover:text-white">Login / Register</Link>
                                )
                                }
                            </li>
                        </ul>

                        <button id="menu-toggle" type="button"
                            onClick={() => setIsOpen(true)}
                            className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg lg:hidden hover:bg-gray-100"
                        >
                            <span className="sr-only">Open main menu</span>
                            <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1h15M1 7h15M1 13h15" />
                            </svg>
                        </button>
                        <div
                            className={`fixed top-0 left-0 z-50 w-[290px] h-full bg-white shadow-lg transform transition-transform duration-300 ease-in-out ${isOpen ? "translate-x-0" : "-translate-x-full"
                                }`}
                        >
                            <div className="p-4 py-3 border-b flex justify-between items-center">
                                <img src={logo} onClick={() => navigate('/')} className="cursor-pointer" alt="" />
                                <button id="menu-close" onClick={() => setIsOpen(false)} className="text-gray-500 hover:text-gray-700 text-[30px]">&times;</button>
                            </div>
                            <div className="px-[20px] mt-[30px]">
                                <ul className=" font-[300] text-[20px]  space-y-[20px]">
                                    <li className='relative group'>
                                        <div className="text-[16px] flex items-center gap-2">
                                            Themes <svg xmlns="http://www.w3.org/2000/svg" width="12" height="7" viewBox="0 0 12 7" fill="none">
                                        <path fillRule="evenodd" clipRule="evenodd" d="M11.8403 0.159707C11.9426 0.262101 12 0.400899 12 0.545615C12 0.690331 11.9426 0.829129 11.8403 0.931522L6.37934 6.39248C6.27694 6.49474 6.13814 6.55219 5.99343 6.55219C5.84871 6.55219 5.70991 6.49474 5.60752 6.39248L0.146566 0.931522C0.0501038 0.828001 -0.0024111 0.69108 8.50795e-05 0.549604C0.00258126 0.408128 0.0598936 0.273143 0.159948 0.173089C0.260002 0.0730349 0.394986 0.0157227 0.536462 0.0132265C0.677938 0.0107303 0.81486 0.063245 0.918381 0.159707L5.99343 5.23476L11.0685 0.159707C11.1709 0.0574415 11.3097 0 11.4544 0C11.5991 0 11.7379 0.0574415 11.8403 0.159707Z" fill="#2E2E2E" />
                                    </svg>
                                        </div>
                                        <div className="absolute top-full z-[8] left-0 hidden group-hover:block bg-white shadow-[0px_4.09px_16.37px_0px_#e8e8e8] rounded-md p-2 w-40">
                                            {category?.data
                                                ?.filter(cat => ["Html", "Wordpress"].includes(cat.name)) // ✅ Only Html & Wordpress
                                                .map((cat, index) => (
                                                    <div
                                                        key={index}
                                                        to="/Products"
                                                        className="block text-sm cursor-pointer px-3 py-2 hover:bg-gray-100"
                                                        onClick={() => {
                                                            setIsOpen(false)
                                                            navigate(`/${cat.name.toLowerCase().replace(/\s+/g, '-')}`, {
                                                                state: { category_id: cat.category_id, name: cat.name },
                                                            })
                                                        }
                                                        }
                                                    >
                                                        {cat.name}
                                                    </div>
                                                ))}
                                        </div>
                                    </li>
                                    <li className=" ">
                                        <Link to={'/about_us'} onClick={() => setIsOpen(false)} className="text-[16px]">
                                            About Us
                                        </Link>
                                    </li>
                                    <li className=" ">
                                        <Link to={'/blog'} onClick={() => setIsOpen(false)} className="text-[16px]">
                                            Blog
                                        </Link>
                                    </li>
                                    <li className=" ">
                                        <Link to={'/contact_us'} onClick={() => setIsOpen(false)} className="text-[16px]">
                                            Contact Us
                                        </Link>
                                    </li>
                                    <li className=" ">
 <button className="  text-[13px] font-[400] hover:bg-black hover:text-white transition-all duration-250 py-0 w-[120px] h-[30px] rounded-[3px] bg-transparent border border-[#000000]">Free Downloads</button>
                                    </li>
                                    {/* <li className=" ">
                                        <button className="w-[130px] justify-center text-white py-0 h-[37px] flex rounded-[3px] gap-[12px] font-[300] items-center bg-[#F44336] " onClick={() => navigate('/sales')}>
                                            <div>
                                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
                                                    <path d="M19.0811 10.0012L19.9586 7.71252C20.0549 7.46003 19.9799 7.17379 19.7686 7.00254L17.8662 5.46009L17.4812 3.03891C17.4387 2.77142 17.2287 2.56268 16.9612 2.52018L14.54 2.13519L12.9988 0.231496C12.8288 0.0202525 12.5363 -0.0547453 12.2901 0.0415018L10.0002 0.920226L7.71148 0.0427518C7.45774 -0.0547453 7.174 0.0227524 7.00275 0.232746L5.4603 2.13644L3.03912 2.52143C2.90909 2.54237 2.78898 2.60377 2.69585 2.69689C2.60272 2.79002 2.54132 2.91014 2.52038 3.04016L2.1354 5.46134L0.231703 7.00379C0.0217092 7.17379 -0.0545385 7.46003 0.0417086 7.71252L0.919183 10.0012L0.0417086 12.2899C-0.0557885 12.5424 0.0217092 12.8286 0.231703 12.9986L2.1354 14.5398L2.52038 16.961C2.56288 17.2285 2.77163 17.4385 3.03912 17.481L5.4603 17.866L7.00275 19.7684C7.08556 19.8714 7.19902 19.9453 7.32668 19.9795C7.45433 20.0137 7.58955 20.0063 7.71273 19.9584L10.0002 19.0822L12.2888 19.9597C12.3603 19.9869 12.4361 20.0009 12.5126 20.0009C12.6963 20.0009 12.8776 19.9197 12.9988 19.7684L14.54 17.866L16.9612 17.481C17.0916 17.4602 17.2122 17.3988 17.3056 17.3054C17.399 17.212 17.4604 17.0914 17.4812 16.961L17.8662 14.5398L19.7686 12.9986C19.9799 12.8274 20.0549 12.5424 19.9586 12.2899L19.0811 10.0012Z" fill="white" />
                                                    <path d="M8.12519 8.75124C7.09147 8.75124 6.25024 7.91002 6.25024 6.8763C6.25024 5.84258 7.09147 5.00135 8.12519 5.00135C9.15891 5.00135 10.0001 5.84258 10.0001 6.8763C10.0001 7.91002 9.15891 8.75124 8.12519 8.75124ZM8.12519 6.25132C7.7802 6.25132 7.50021 6.53131 7.50021 6.8763C7.50021 7.22129 7.7802 7.50128 8.12519 7.50128C8.47018 7.50128 8.75017 7.22129 8.75017 6.8763C8.75017 6.53131 8.47018 6.25132 8.12519 6.25132ZM11.8751 15.0011C10.8414 15.0011 10.0001 14.1598 10.0001 13.1261C10.0001 12.0924 10.8414 11.2512 11.8751 11.2512C12.9088 11.2512 13.75 12.0924 13.75 13.1261C13.75 14.1598 12.9088 15.0011 11.8751 15.0011ZM11.8751 12.5011C11.5313 12.5011 11.2501 12.7824 11.2501 13.1261C11.2501 13.4699 11.5313 13.7511 11.8751 13.7511C12.2188 13.7511 12.5001 13.4699 12.5001 13.1261C12.5001 12.7824 12.2188 12.5011 11.8751 12.5011ZM6.87523 15.0011C6.74898 15.0011 6.62273 14.9636 6.51274 14.8848C6.23149 14.6836 6.1665 14.2936 6.36774 14.0123L12.6176 5.2626C12.8188 4.98135 13.2088 4.91636 13.49 5.1176C13.7713 5.31759 13.835 5.70883 13.635 5.98882L7.38521 14.7386C7.26146 14.9098 7.07022 15.0011 6.87523 15.0011Z" fill="#F44336" />
                                                </svg>
                                            </div>  Sale</button>
                                    </li> */}
                                </ul>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
            {/* Overlay */}
            {isOpen && (
                <div
                    className="fixed inset-0 bg-black bg-opacity-40 z-40"
                    onClick={() => setIsOpen(false)}
                ></div>
            )}
        </section>
    );
}

export default HomePage;
