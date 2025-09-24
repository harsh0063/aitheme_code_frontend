import React, { useEffect, useState } from 'react';
import Header from '../component/header'
import Footer from '../component/footer'
import shopify from '../assets/shopify-logo-laptop 2.png'
import logo from '../assets/Group (7).png'
import { Navigate, useLocation, useParams } from 'react-router-dom';
import { useGetBlogQuery } from '../service/apislice';
import { Helmet } from 'react-helmet-async';
const BlogDetail = () => {

    const { blog_details } = useParams();
    const location = useLocation();

    const { data: blog1, isLoading: loadingAllBlogs } = useGetBlogQuery(); // All blogs
    const [notFound, setNotFound] = useState(false);
    const [matchedPost, setMatchedPost] = useState(null);

    const post_id = matchedPost?.post_id || location.state?.post_id;
    const { data: blog, isLoading: loadingSingleBlog } = useGetBlogQuery({ post_id });

    useEffect(() => {
        if (!loadingAllBlogs && blog1?.data?.length > 0) {
            const match = blog1.data.find(item => item.slug === blog_details);
            if (match) {
                setMatchedPost(match);
            } else {
                setNotFound(true);
            }
        }
    }, [blog_details, blog1, loadingAllBlogs]);

    // All hooks are above this line ✅
    if (notFound) return <Navigate to="/404" replace />;

    const blogData = blog?.data?.[0] || {};


    return (
        <>

            <Helmet>
                <title>{blogData?.meta_title || 'Aithemecode'}</title>
                <meta name="keywords" xml:lang="en" lang="en" content={`${blogData?.meta_keyword}`} />
                <meta name="description" xml:lang="en" lang="en" content={`${blogData?.meta_description}`} />
                <meta name="og:description" content={`${blogData?.meta_description}`} />
                <meta name="og:url" content={`https://aithemecode.com/${location.pathname}`} />
                <meta name="og:title" content={blogData?.name} />
                <meta name="twitter:title" content={blogData?.name} />
                <meta name="twitter:url" content={`https://aithemecode.com/${location.pathname}`} />
                <meta name="twitter:description" content={`${blogData?.meta_description}`} />

                <link rel="canonical" href={`https://aithemecode.com/${location.pathname}`} />
            </Helmet>

            <Header />
            <section className='max-w-[1200px] max-xl:container mx-auto'>
                <div className=' pt-[50px]'>
                    <div className='flex gap-[10px] items-center'>
                        <div>
                            <p className='pop max-sm:text-sm font-[400] text-[16px] leading-[0px] text-[#333333]'>Home</p>
                        </div>
                        <div>
                            <svg xmlns="http://www.w3.org/2000/svg" width="6" height="10" viewBox="0 0 6 10" fill="none">
                                <path d="M6 5.10819C6 5.24861 5.93783 5.38178 5.82959 5.47171L0.780571 9.67913C0.683622 9.75494 0.560975 9.79004 0.438599 9.77699C0.316223 9.76395 0.203729 9.70379 0.124938 9.60925C0.046147 9.51471 0.00724651 9.39321 0.0164736 9.27049C0.0257007 9.14776 0.0823308 9.03345 0.174372 8.95176L4.78729 5.10819L0.174688 1.2643C0.126085 1.22477 0.0858114 1.17599 0.0562029 1.12078C0.0265943 1.06557 0.00823924 1.00504 0.00220242 0.942679C-0.00383439 0.880323 0.00256686 0.81739 0.021035 0.757527C0.0395031 0.697664 0.069671 0.642062 0.109789 0.593945C0.149907 0.545829 0.199178 0.506154 0.254744 0.477221C0.310311 0.44829 0.371067 0.430676 0.433492 0.425402C0.495917 0.420127 0.558768 0.427296 0.618401 0.446494C0.678034 0.465692 0.733263 0.496537 0.780886 0.53724L5.82991 4.74465C5.88318 4.78907 5.92603 4.84466 5.95542 4.90749C5.98481 4.97031 6.00003 5.03883 6 5.10819Z" fill="#90A4AE" />
                            </svg>
                        </div>
                        <div>
                            <p className='pop max-sm:text-sm  font-[400] text-[16px] leading-[0px] text-[#90A4AE]'>Blog</p>
                        </div>
                        <div>
                            <svg xmlns="http://www.w3.org/2000/svg" width="6" height="10" viewBox="0 0 6 10" fill="none">
                                <path d="M6 5.10819C6 5.24861 5.93783 5.38178 5.82959 5.47171L0.780571 9.67913C0.683622 9.75494 0.560975 9.79004 0.438599 9.77699C0.316223 9.76395 0.203729 9.70379 0.124938 9.60925C0.046147 9.51471 0.00724651 9.39321 0.0164736 9.27049C0.0257007 9.14776 0.0823308 9.03345 0.174372 8.95176L4.78729 5.10819L0.174688 1.2643C0.126085 1.22477 0.0858114 1.17599 0.0562029 1.12078C0.0265943 1.06557 0.00823924 1.00504 0.00220242 0.942679C-0.00383439 0.880323 0.00256686 0.81739 0.021035 0.757527C0.0395031 0.697664 0.069671 0.642062 0.109789 0.593945C0.149907 0.545829 0.199178 0.506154 0.254744 0.477221C0.310311 0.44829 0.371067 0.430676 0.433492 0.425402C0.495917 0.420127 0.558768 0.427296 0.618401 0.446494C0.678034 0.465692 0.733263 0.496537 0.780886 0.53724L5.82991 4.74465C5.88318 4.78907 5.92603 4.84466 5.95542 4.90749C5.98481 4.97031 6.00003 5.03883 6 5.10819Z" fill="#90A4AE" />
                            </svg>
                        </div>
                        <div>
                            {/* Full text on large screens */}
                            <p className="font-[400] max-sm:text-sm text-[16px] leading-[29px] text-[#787878] hidden lg:block">
                                {blogData?.title}
                            </p>

                            {/* Truncated to 15 characters on max-lg screens */}
                            <p className="font-[400] text-[16px] leading-[29px] text-[#787878] block lg:hidden">
                                {blogData?.title?.length > 15
                                    ? blogData?.title.slice(0, 15) + "..."
                                    : blogData?.title}
                            </p>
                        </div>


                    </div>
                    <div className='pt-[30px] max-md:pt-[20px] max-sm:pt-[10px]'>
                        <p className='pop font-[600] max-sm:text-[28px] max-sm:leading-[45px] text-[30px] leading-[54px] text-[#243238]'>{blogData?.title}</p>
                    </div>
                    <div className='pt-[50px] pb-[30px]'>
                        <img src={import.meta.env.VITE_API_BASE_URL + blogData?.blog_picture} alt="shopify-logo" className='' />
                    </div>
                    <div className='flex items-center justify-between pb-[30px]'>
                        <div className='flex items-center gap-[10.46px]'>
                            <div>
                                <img src={logo} alt="" />
                            </div>
                            <div className='border-r-[0.5px] border-[#B5B5B5] p-[10px]'>
                                <p className='pop font-[400] text-[16px] leading-[0px] text-[#787878]'>By
                                    <span className='font-[400] text-[16px] text-[#333333]'>  Ai Theme Code</span>
                                </p>
                            </div>
                            <span className='pop  font-[400] text-[14px] leading-[0px] text-[#787878]'> {new Date(blogData?.publish_date).toLocaleDateString('en-GB', {
                                day: 'numeric',
                                month: 'long',
                                year: 'numeric',
                            })}</span>
                        </div>


                        {/* <button className='border-[2px] pop  px-[23px] border-[#333333] rounded-[28px] hover:border-[#333333] pop font-[400] text-[16px] leading-[32px]'>Web Development</button> */}

                    </div>

                    <div className='pb-[30px]'>
                        <div
                            className="blog-body"
                            dangerouslySetInnerHTML={{ __html: blogData?.body }}
                        />

                    </div>

                </div>
            </section>
            <Footer />
        </>
    );
};

export default BlogDetail;
