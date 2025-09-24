import React, { useState } from 'react';
import Header from '../component/header'
import Footer from '../component/footer'
import shopify from '../assets/shopify-logo-laptop 2.png'
import cal from '../assets/Group (8).svg'
import line from '../assets/Line 98.svg'
import { useGetBlogQuery } from '../service/apislice';
import { Link, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';

const Blog = () => {
    const itemsPerPage = 12;
    const [currentPage, setCurrentPage] = useState(1);
    const queryParams = {
        page_size: itemsPerPage,
        page: currentPage,
    };
    const { data: blog, isLoading, isError } = useGetBlogQuery(queryParams);

    const navigate = useNavigate();

    const filteredblog = blog?.data

    const totalPages = blog?.total_pages

    return (
        <>
            <Helmet>
                <title>{"AIThemeCode Blog – Tips on Website Themes, SEO & Design Trends"}</title>
                <meta name="description" xml:lang="en" lang="en" content={"Read AIThemeCode Blog for expert tips on website themes, templates, SEO, and design trends. Stay updated with insights to grow your online presence."} />
                <meta name="og:description" content={"Read AIThemeCode Blog for expert tips on website themes, templates, SEO, and design trends. Stay updated with insights to grow your online presence."} />
                <meta name="og:url" content={`https://aithemecode.com/blog`} />
                <meta name="og:title" content={"AIThemeCode Blog – Tips on Website Themes, SEO & Design Trends"} />
                <meta name="twitter:title" content={"AIThemeCode Blog – Tips on Website Themes, SEO & Design Trends"} />
                <meta name="twitter:url" content={`https://aithemecode.com/blog`} />
                <meta name="twitter:description" content={"Read AIThemeCode Blog for expert tips on website themes, templates, SEO, and design trends. Stay updated with insights to grow your online presence."} />

                <link rel="canonical" href={`https://aithemecode.com/blog`} />
            </Helmet>
            <Header />
            <section className='container'>
                <div className='py-[50px]'>
                    <div className=' flex justify-center items-center gap-[10px]'>
                        <Link to={'/'} className='pop max-sm:text-sm font-[400] text-[16px] leading-[32px] text-[#333333]'>Home</Link>
                        <div>
                            <svg xmlns="http://www.w3.org/2000/svg" width="6" height="10" viewBox="0 0 6 10" fill="none">
                                <path d="M6 5.10819C6 5.24861 5.93783 5.38178 5.82959 5.47171L0.780571 9.67913C0.683622 9.75494 0.560975 9.79004 0.438599 9.77699C0.316223 9.76395 0.203729 9.70379 0.124938 9.60925C0.046147 9.51471 0.00724651 9.39321 0.0164736 9.27049C0.0257007 9.14776 0.0823308 9.03345 0.174372 8.95176L4.78729 5.10819L0.174688 1.2643C0.126085 1.22477 0.0858114 1.17599 0.0562029 1.12078C0.0265943 1.06557 0.00823924 1.00504 0.00220242 0.942679C-0.00383439 0.880323 0.00256686 0.81739 0.021035 0.757527C0.0395031 0.697664 0.069671 0.642062 0.109789 0.593945C0.149907 0.545829 0.199178 0.506154 0.254744 0.477221C0.310311 0.44829 0.371067 0.430676 0.433492 0.425402C0.495917 0.420127 0.558768 0.427296 0.618401 0.446494C0.678034 0.465692 0.733263 0.496537 0.780886 0.53724L5.82991 4.74465C5.88318 4.78907 5.92603 4.84466 5.95542 4.90749C5.98481 4.97031 6.00003 5.03883 6 5.10819Z" fill="#90A4AE" />
                            </svg>
                        </div>
                        <p className='pop max-sm:text-sm font-[400] text-[16px] leading-[32px] text-[#90A4AE]'>Blog</p>
                    </div>
                    <div className='pt-[30px] max-md:pt-[20px] max-sm:pt-[10px]'>
                        <h3 className='pop font-[600] text-[40px] max-md:text-[35px]  max-sm:text-[26px] max-sm:leading-[35px] leading-[54px] text-[#243238] text-center'>Latest Articles</h3>
                    </div>
                    <div className='pt-[10px]'>
                        <p className='text-[20px] leading-[54px] max-lg:leading-[35px] max-sm:leading-[30px] max-sm:text-[18px] text-center text-[#243238]'>
                            Discover insights, tips, and the latest trends — fresh content to fuel your ideas and inspire your journey.
                        </p>
                    </div>
                </div>

                <div className='grid grid-cols-3 gap-x-[93px] max-xl:gap-x-[30px] max-lg:grid-cols-2 max-sm:grid-cols-1  gap-y-[50px]'>

                    {filteredblog?.map((item, index) => (

                        <div key={index} className='border-[1px] border-[#D8D8D8] rounded-[5px] '>
                            <div>
                                <img
                                    src={import.meta.env.VITE_API_BASE_URL + item?.blog_picture}
                                    alt={item?.alt_text}
                                    className="w-full h-[180px] sm:h-[220px] md:h-[250px] object-cover cursor-pointer"
                                    onClick={() => navigate(`/blog/${item?.slug}`, { state: { post_id: item?.post_id } })}
                                />

                            </div>
                            <div className='px-[16px]'>
                                <div className='pt-[10px] '>
                                    <p className='shopify leading-[29px] cursor-pointer' onClick={() => navigate(`/blog/${item?.slug}`, { state: { post_id: item?.post_id } })}>{item?.title}</p>
                                </div>
                                <div className='pt-[15px]  pb-[19px] flex justify-between items-center'>
                                    <div className='flex gap-[10px]'>
                                        <img src={cal} className='w-[18px]'></img>
                                        <span className='date text-sm text-[#979797]'> {new Date(item?.publish_date).toLocaleDateString('en-GB', {
                                            day: 'numeric',
                                            month: 'long',
                                            year: 'numeric',
                                        })}</span>
                                    </div>
                                    <div className='flex gap-[10px] pr-[11px] cursor-pointer' onClick={() => navigate(`/blog/${item?.slug}`, { state: { post_id: item?.post_id } })}>
                                        <p className='LearnMore text-[14px] text-[#538DF8] leading-[29px]'>Learn More</p>
                                        <img src={line}></img>
                                    </div>
                                </div>
                            </div>
                        </div>

                    ))}
                </div>
                {
                    filteredblog && blog?.total_items > itemsPerPage && (

                        <div className="pagination max-sm:gap-0 flex items-center justify-center mt-8 gap-2 flex-wrap">


                            <div
                                onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                                className={`border-[#E2E9EE] flex border-[2.4px] rounded-[3.6px] items-center py-[13px] px-[15.6px] cursor-pointer
      max-sm:px-[5px] max-lg:py-[10px] max-lg:px-[10px] max-sm:py-[5px] mr-[14px] 
      ${currentPage === 1 ? 'opacity-50 pointer-events-none' : ''}`}
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" width="13" height="18" viewBox="0 0 13 18" fill="none">
                                    <g clipPath="url(#clip0_125_4399)">
                                        <path fillRule="evenodd" clipRule="evenodd" d="M9.70627 17.7469L0.912109 9.01825L9.70627 0.289551L11.999 2.5692L5.49613 9.01825L11.999 15.4673L9.70627 17.7469Z" fill="#6E777D" />
                                    </g>
                                    <defs>
                                        <clipPath id="clip0_125_4399">
                                            <rect width="11.6383" height="17.4574" fill="white" transform="translate(0.912109 0.289551)" />
                                        </clipPath>
                                    </defs>
                                </svg>
                            </div>

                            {/* Smart page numbers */}
                            {Array.from({ length: totalPages }, (_, index) => index + 1)
                                .filter(number => (
                                    number === 1 ||
                                    number === totalPages ||
                                    (number >= currentPage - 1 && number <= currentPage + 1)
                                ))
                                .reduce((acc, number, idx, array) => {
                                    if (idx > 0 && number - array[idx - 1] > 1) {
                                        acc.push('ellipsis');
                                    }
                                    acc.push(number);
                                    return acc;
                                }, [])
                                .map((item, index) => (
                                    item === 'ellipsis' ? (
                                        <span key={`ellipsis-${index}`} className="px-2">...</span>
                                    ) : (
                                        <button
                                            key={item}
                                            onClick={() => setCurrentPage(item)}
                                            className={`Inter cursor-pointer ${currentPage === item ? 'active text-[#303538] bg-[#538DF833] rounded-[4px]' : 'bg-transparent'
                                                } max-lg:py-[0px] max-lg:text-[16px] max-lg:h-[34px] max-lg:px-[15px] max-sm:h-[24px] max-sm:text-[12px] max-sm:px-[10px] flex justify-center items-center px-[16px] py-2`}
                                        >
                                            {item}
                                        </button>
                                    )
                                ))}


                            {/* Next button */}
                            <div
                                onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                                className={`border-[#E2E9EE] flex border-[2.4px] rounded-[3.6px] items-center py-[13px] px-[15.6px] cursor-pointer
      max-sm:px-[5px] max-lg:py-[5px] max-lg:px-[5px] max-sm:py-[5px] ml-[14px]
      ${currentPage === totalPages ? 'opacity-50 pointer-events-none' : ''}`}
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" width="13" height="18" viewBox="0 0 13 18" fill="none">
                                    <g clipPath="url(#clip0_125_4415)">
                                        <path fillRule="evenodd" clipRule="evenodd" d="M2.72183 17.7469L11.4767 9.02261L2.72183 0.289551L0.449463 2.5692L6.91597 9.02261L0.449463 15.4746L2.72183 17.7469Z" fill="#303538" />
                                    </g>
                                    <defs>
                                        <clipPath id="clip0_125_4415">
                                            <rect width="11.6383" height="17.4574" fill="white" transform="translate(0.449463 0.289551)" />
                                        </clipPath>
                                    </defs>
                                </svg>
                            </div>

                        </div>

                    )
                }
            </section>
            <Footer />
        </>
    );
};

export default Blog;
