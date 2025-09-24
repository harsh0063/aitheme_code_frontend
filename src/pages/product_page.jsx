import React, { useEffect, useMemo, useRef, useState } from "react";
import Header from '../component/header'
import Footer from '../component/footer'
import cate1 from '../assets/html.svg'
import cate2 from '../assets/bootstrap.svg'
import cate3 from '../assets/laravel.svg'
import cate4 from '../assets/php.svg'
import cate5 from '../assets/react.svg'
import cate6 from '../assets/shopify.svg'
import cate7 from '../assets/wordpress.svg'
import sub1 from '../assets/subcate1.png'
import sub2 from '../assets/subcate2.png'
import sub3 from '../assets/subcate3.png'
import sub4 from '../assets/subcate4.png'
import sub5 from '../assets/subcate5.png'
import Product from '../component/product'
import { useGetCategoryQuery, useGetSubcategoryQuery, useGetThemesQuery } from "../service/apislice";
import { Link, Navigate, useLocation, useNavigate, useParams } from "react-router-dom";
import { Helmet } from 'react-helmet-async';

const categoryImages = {
  "html": cate1,
  "bootstrap": cate2,
  "laravel": cate3,
  "php": cate4,
  "react": cate5,
  "shopify": cate6,
  "wordpress": cate7,
};

function HomePage() {
  const location = useLocation()
  const [selectedCategory, setSelectedCategory] = useState("All Categories");
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate()
  const categories = ["Rings", "Necklaces", "Bracelets"];
  const dropdownRef = useRef(null);
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  const itemsPerPage = 12;
  const [currentPage, setCurrentPage] = useState(() => {
    return parseInt(sessionStorage.getItem("product_page") || "1");
  });




  const { data: category, isLoading: isCategoryLoading } = useGetCategoryQuery()
  const { data: subcategory1 } = useGetSubcategoryQuery({ fetch_all: true })



  const [search, setsearch] = useState('')
  const [showDropdown, setShowDropdown] = useState(false);
  const { data: serchtheme } = useGetThemesQuery({ search: search })

  const { category_name, subcategory_name } = useParams();
  const [cateid, setcateid] = useState('')
  const [subcateid, setsubcateid] = useState('')
  const [selected, setSelected] = useState('All');
  const [subcategory__name, setsubcategory__name] = useState('')
  const [category__name, setcategory__name] = useState('')
  console.log(category__name);
  const [queryReady, setQueryReady] = useState(false); // ✅ add flag
  useEffect(() => {
    if (!category || !subcategory1) return;

    const categoryMatch = category?.data?.find((val) =>
      val.name.toLowerCase().replace(/\s+/g, '-') === category_name
    );

    if (category_name && !categoryMatch && category_name !== 'themes') {
      navigate('/404', { replace: true });
      return;
    }

    setcateid(categoryMatch?.category_id);
    setcategory__name(categoryMatch);

    const subcategoryMatch = subcategory1?.data?.find((val) =>
      val.slug === subcategory_name
    );

    if (subcategory_name && !subcategoryMatch) {
      navigate('/404', { replace: true });
      return;
    }

    setsubcateid(subcategoryMatch?.subcategory_id);
    setsubcategory__name(subcategoryMatch);

    // ✅ mark ready only when both checks pass
    setQueryReady(true);
  }, [category, subcategory1, category_name, subcategory_name, navigate]);
  const { data: subcategory } = useGetSubcategoryQuery({ category_id: cateid, fetch_all: true })
  const sessionPage = sessionStorage.getItem("product_page");
  // ✅ useMemo based on queryReady
  const queryParams = useMemo(() => {
    if (!queryReady) return null;

    const sortFlags = {
      'Featured': { is_featured: true },
      'Bestsellers': { is_best_seller: true },
      'Trending': { is_trending: true },
      'New Arrivals': {is_new_arrival : true}, // handle this if needed
    };

    return {
      page_size: itemsPerPage,
      page: currentPage,
      ...(cateid || location?.state?.category_id ? { category_id: cateid } : {}),
      ...(subcateid || location?.state?.subcategory_id ? { subcategory_id: subcateid } : {}),
      ...sortFlags[selected],
    };
  }, [queryReady, selected, cateid, subcateid, itemsPerPage, currentPage, location?.state, sessionPage]);


  useEffect(() => {
    const scrollTarget = location.state?.scrollTo;
    if (scrollTarget) {
      const el = document.getElementById(scrollTarget);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }, [location.state]);
  console.log(location.state?.is_featured);


  const { data: themes } = useGetThemesQuery(queryParams);

  const filteredTemplates = themes?.data

  const totalPages = themes?.total_pages


  const [open, setOpen] = useState(false);


  useEffect(() => {
    const sortBy = location?.state?.sort_by;
    if (sortBy && options.includes(sortBy)) {
      setSelected(sortBy);
    }
  }, [location?.state?.sort_by]);
  const options = ['All','Bestsellers', 'Trending', 'Featured', 'New Arrivals'];

  return (
    <>
      <Helmet>
        <title>
          {
            subcategory__name?.name && category__name?.name
              ? `${subcategory__name.meta_title} - ${category__name.meta_title}`
              : category_name
                ? category_name?.meta_title
                : 'Website Themes & Templates – WordPress, HTML, Bootstrap, Shopify, PHP, Laravel | AIThemeCode'
          } 
        </title>

        <meta name="keywords" xml:lang="en" lang="en" content={`${subcategory__name?.meta_keywords || category__name?.meta_keywords} `} />
        <meta name="description" xml:lang="en" lang="en" content={`${subcategory__name?.meta_description || category__name?.meta_description || "Browse AIThemeCode’s wide range of premium website themes and templates. WordPress, HTML, and Bootstrap designs crafted for blogs, businesses, and portfolios."}`} />
        <meta name="og:description" content={`${subcategory__name?.meta_description || category__name?.meta_description || "Browse AIThemeCode’s wide range of premium website themes and templates. WordPress, HTML, and Bootstrap designs crafted for blogs, businesses, and portfolios."}`} />
        <meta name="og:url" content={`https://aithemecode.com/${location.pathname}`} />
        <meta name="og:title" content={subcategory__name?.name || category__name?.name} />
        <meta name="twitter:title" content={subcategory__name?.name || category__name?.name} />
        <meta name="twitter:url" content={`https://aithemecode.com/${location.pathname}`} />
        <meta name="twitter:description" content={`${subcategory__name?.meta_description || category__name?.meta_description || "Browse AIThemeCode’s wide range of premium website themes and templates. WordPress, HTML, and Bootstrap designs crafted for blogs, businesses, and portfolios."}`} />

        <link rel="canonical" href={`https://aithemecode.com${location.pathname}`} />
      </Helmet>

      <Header />
      <section className="pt-[70px] pb-[50px] max-sm:pt-[50px] ">
        <div className="container">

          <div className="flex justify-center  mb-[30px] items-center gap-[10px]">
            <Link to={'/'} className="pop max-sm:text-sm text-[#333333]"> Home</Link>
            {category__name ? (

              <div className="flex max-sm:text-sm items-center gap-[10px]">


                <div><svg xmlns="http://www.w3.org/2000/svg" width="6" height="10" viewBox="0 0 6 10" fill="none">
                  <path d="M6 5.10819C6 5.24861 5.93783 5.38178 5.82959 5.47171L0.780571 9.67913C0.683622 9.75494 0.560975 9.79004 0.438599 9.77699C0.316223 9.76395 0.203729 9.70379 0.124938 9.60925C0.046147 9.51471 0.00724651 9.39321 0.0164736 9.27049C0.0257007 9.14776 0.0823308 9.03345 0.174372 8.95176L4.78729 5.10819L0.174688 1.2643C0.126085 1.22477 0.0858114 1.17599 0.0562029 1.12078C0.0265943 1.06557 0.00823924 1.00504 0.00220242 0.942679C-0.00383439 0.880323 0.00256686 0.81739 0.021035 0.757527C0.0395031 0.697664 0.069671 0.642062 0.109789 0.593945C0.149907 0.545829 0.199178 0.506154 0.254744 0.477221C0.310311 0.44829 0.371067 0.430676 0.433492 0.425402C0.495917 0.420127 0.558768 0.427296 0.618401 0.446494C0.678034 0.465692 0.733263 0.496537 0.780886 0.53724L5.82991 4.74465C5.88318 4.78907 5.92603 4.84466 5.95542 4.90749C5.98481 4.97031 6.00003 5.03883 6 5.10819Z" fill="#90A4AE" />
                </svg></div>
                <div className="capitalize pop max-sm:text-sm text-[#90A4AE]">{category__name ? category__name?.name + ' ' + 'Themes' : 'Themes'}</div>
              </div>
            ) : (
              <div className="flex max-sm:text-sm items-center gap-[10px]">


                <div><svg xmlns="http://www.w3.org/2000/svg" width="6" height="10" viewBox="0 0 6 10" fill="none">
                  <path d="M6 5.10819C6 5.24861 5.93783 5.38178 5.82959 5.47171L0.780571 9.67913C0.683622 9.75494 0.560975 9.79004 0.438599 9.77699C0.316223 9.76395 0.203729 9.70379 0.124938 9.60925C0.046147 9.51471 0.00724651 9.39321 0.0164736 9.27049C0.0257007 9.14776 0.0823308 9.03345 0.174372 8.95176L4.78729 5.10819L0.174688 1.2643C0.126085 1.22477 0.0858114 1.17599 0.0562029 1.12078C0.0265943 1.06557 0.00823924 1.00504 0.00220242 0.942679C-0.00383439 0.880323 0.00256686 0.81739 0.021035 0.757527C0.0395031 0.697664 0.069671 0.642062 0.109789 0.593945C0.149907 0.545829 0.199178 0.506154 0.254744 0.477221C0.310311 0.44829 0.371067 0.430676 0.433492 0.425402C0.495917 0.420127 0.558768 0.427296 0.618401 0.446494C0.678034 0.465692 0.733263 0.496537 0.780886 0.53724L5.82991 4.74465C5.88318 4.78907 5.92603 4.84466 5.95542 4.90749C5.98481 4.97031 6.00003 5.03883 6 5.10819Z" fill="#90A4AE" />
                </svg></div>
                <div className="capitalize pop max-sm:text-sm text-[#90A4AE]">Themes</div>
              </div>
            )}
            {subcategory__name && (

              <div className="flex items-center gap-[10px]">


                <div><svg xmlns="http://www.w3.org/2000/svg" width="6" height="10" viewBox="0 0 6 10" fill="none">
                  <path d="M6 5.10819C6 5.24861 5.93783 5.38178 5.82959 5.47171L0.780571 9.67913C0.683622 9.75494 0.560975 9.79004 0.438599 9.77699C0.316223 9.76395 0.203729 9.70379 0.124938 9.60925C0.046147 9.51471 0.00724651 9.39321 0.0164736 9.27049C0.0257007 9.14776 0.0823308 9.03345 0.174372 8.95176L4.78729 5.10819L0.174688 1.2643C0.126085 1.22477 0.0858114 1.17599 0.0562029 1.12078C0.0265943 1.06557 0.00823924 1.00504 0.00220242 0.942679C-0.00383439 0.880323 0.00256686 0.81739 0.021035 0.757527C0.0395031 0.697664 0.069671 0.642062 0.109789 0.593945C0.149907 0.545829 0.199178 0.506154 0.254744 0.477221C0.310311 0.44829 0.371067 0.430676 0.433492 0.425402C0.495917 0.420127 0.558768 0.427296 0.618401 0.446494C0.678034 0.465692 0.733263 0.496537 0.780886 0.53724L5.82991 4.74465C5.88318 4.78907 5.92603 4.84466 5.95542 4.90749C5.98481 4.97031 6.00003 5.03883 6 5.10819Z" fill="#90A4AE" />
                </svg></div>
                <div className="capitalize pop max-sm:text-sm text-[#90A4AE]">{subcategory__name ? subcategory__name?.name : ''}</div>
              </div>
            )}
          </div>

          <h1 className="pop font-[600] leading-[54px] mb-[10px] max-md:text-[35px] max-sm:text-[26px] max-sm:leading-[35px] text-center text-[40px] capitalize">{category__name?.name} Themes</h1>

          <p className="text-[20px] leading-[54px] max-lg:leading-[35px] max-sm:leading-[30px] max-sm:text-[18px] text-center">2025’s Premium {category__name?.name} Themes from Ai Theme Code</p>


          <div className="flex w-full justify-center">


            <div className="max-w-[966px] relative z-[20] mt-[30px] w-full px-[25px] max-sm:h-[45px]  flex items-center max-auto border border-[#757575] h-[55px] rounded-[200px]">
              <div className="flex items-center w-full relative">
                <div>

                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <path fillRule="evenodd" clipRule="evenodd" d="M6.12637 0C2.74555 0 0 2.74555 0 6.12637C0 9.50718 2.74555 12.2527 6.12637 12.2527C9.50718 12.2527 12.2527 9.50718 12.2527 6.12637C12.2527 2.74555 9.50718 0 6.12637 0ZM6.12637 0.942518C8.98785 0.942518 11.3102 3.26488 11.3102 6.12637C11.3102 8.98785 8.98785 11.3102 6.12637 11.3102C3.26488 11.3102 0.942518 8.98785 0.942518 6.12637C0.942518 3.26488 3.26488 0.942518 6.12637 0.942518Z" fill="#757575" />
                    <path fillRule="evenodd" clipRule="evenodd" d="M15.8852 15.2179L10.4572 9.79089C10.3684 9.70504 10.2493 9.65754 10.1258 9.65862C10.0022 9.65969 9.884 9.70925 9.79663 9.79663C9.70925 9.884 9.65969 10.0022 9.65862 10.1258C9.65754 10.2493 9.70504 10.3684 9.79089 10.4572L15.2179 15.8852C15.3084 15.9632 15.425 16.0041 15.5443 15.9997C15.6637 15.9953 15.777 15.9459 15.8614 15.8614C15.9459 15.777 15.9953 15.6637 15.9997 15.5443C16.0041 15.425 15.9632 15.3084 15.8852 15.2179Z" fill="#757575" />
                  </svg>
                </div>
                <div className="ms-[13px]  w-full">
                  <input type="text" placeholder="Search templates & themes…" className="text-[18px] max-sm:text-[14px] max-md:text-[16px] text-[#757575] font-[300] w-full inter bg-transparent" onFocus={() => setShowDropdown(true)}
                    onBlur={() => setTimeout(() => setShowDropdown(false), 200)} onChange={(e) => setsearch(e.target.value)} />
                  {showDropdown && (
                    <div className="absolute top-full left-0 mt-2 w-full max-h-[300px] overflow-y-auto bg-white border border-gray-200 rounded-xl shadow-lg z-10 custom-scroll">
                      {serchtheme?.data?.length > 0 ? (
                        serchtheme.data.map((item, index) => (
                          <div
                            key={index}
                            className="px-4 py-3 hover:bg-[#f3f4f6] transition-colors duration-200 cursor-pointer text-[15px] text-gray-800 font-medium rounded-md"
                            onClick={() => {
                              const categoryname = category?.data?.find(cat => cat.category_id === item.category)?.name.toLowerCase().replace(/\s+/g, '-')
                              const subcategoryname = subcategory1?.data?.find(sub => sub.subcategory_id == item.subcategory)?.slug
                              const themename = item.name.toLowerCase().replace(/\s+/g, '-');
                              navigate(`/${categoryname}/${subcategoryname}/${themename}`, {
                                state: { theme_id: item.theme_id }
                              })
                            }}
                          >
                            {item?.name}
                          </div>
                        ))
                      ) : (
                        <div className="px-4 py-3 text-gray-400 text-sm">No results found</div>
                      )}
                    </div>

                  )}
                </div>
              </div>
              <div className="ps-[27px] max-sm:ps-[10px] border-s border-[#757575]">
                <div className="relative py-[1px] cursor-pointer select-none " ref={dropdownRef}>

                  <div
                    className="flex inter  text-[#303538] max-sm:font-[600] max-sm:text-sm items-center gap-[35px] text-nowrap text-[18px]"
                    onClick={() => setIsOpen((prev) => !prev)}
                  >
                    {selectedCategory}
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="18"
                      height="11"
                      viewBox="0 0 18 11"
                      fill="none"
                      className={`transform max-sm:hidden transition-transform duration-300 ${isOpen ? "rotate-180" : ""
                        }`}
                    >
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M0.342777 0.373046C0.562541 0.153555 0.860442 0.0302685 1.17104 0.0302685C1.48164 0.0302685 1.77954 0.153555 1.99931 0.373046L8.98487 7.3586L15.9704 0.373046C16.0777 0.257891 16.2071 0.165527 16.3509 0.101466C16.4947 0.0374056 16.6499 0.0029591 16.8073 0.000182406C16.9646 -0.00259429 17.1209 0.0263557 17.2669 0.0853048C17.4128 0.144254 17.5454 0.231995 17.6567 0.343294C17.768 0.454592 17.8557 0.587166 17.9147 0.73311C17.9736 0.879054 18.0026 1.03538 17.9998 1.19275C17.997 1.35013 17.9626 1.50533 17.8985 1.6491C17.8345 1.79288 17.7421 1.92227 17.627 2.02958L9.81313 9.8434C9.59337 10.0629 9.29547 10.1862 8.98487 10.1862C8.67427 10.1862 8.37637 10.0629 8.1566 9.8434L0.342777 2.02958C0.123286 1.80981 0 1.51191 0 1.20131C0 0.89071 0.123286 0.59281 0.342777 0.373046Z"
                        fill="black"
                      />
                    </svg>
                  </div>


                  <div
                    className={`absolute max-sm:left-auto max-sm:right-[-20px] left-0 mt-2 bg-[#fafafa] border border-[#cacaca] rounded-[5px] overflow-hidden overflow-y-auto transition-all duration-300 ease-in-out ${isOpen ? "max-h-[500px] opacity-100 visible" : "max-h-0 opacity-0 invisible"
                      }`}
                  >
                    <ul className="py-[8px] px-[5px] min-w-[180px] inter">
                      {subcategory?.data && subcategory.data.length > 0 ? (
                        subcategory.data.map((val, idx) => (
                          <li
                            key={idx}
                            onClick={() => {
                              const categoryName = category?.data?.find(cat => cat.category_id === val.category)?.name
                                .toLowerCase()
                                .replace(/\s+/g, '-');
                              const subcategoryName = val.slug;
                              sessionStorage.setItem("product_page", 1);
                              setCurrentPage(1);
                              navigate(`/${categoryName}/${subcategoryName}`, {
                                state: { subcategory_id: val.subcategory_id, scrollTo: "specification" },
                              });
                              setSelected('All')
                              setSelectedCategory(val?.name);
                              setIsOpen(false);
                            }}
                            className="py-[5px] max-sm:text-sm px-[15px] hover:bg-[#f0f0f0] rounded-[5px] cursor-pointer transition-colors"
                          >
                            {val.name}
                          </li>
                        ))
                      ) : (
                        <li className="py-[5px] px-[15px] max-sm:text-sm text-gray-500">No  found</li>
                      )}

                    </ul>
                  </div>
                </div>
              </div>



            </div>





          </div>


          {/* <div className="grid mt-[30px] grid-cols-3 max-lg:grid-cols-2 max-sm:grid-cols-1 gap-x-[15px] gap-y-[30px]">
            {subcategory?.data?.map((val) => (

              <div key={val.subcategory_id} className="h-[102px] overflow-hidden border border-[#C0C0C0] max-xl:h-[90px] max-xl:ps-[20px] flex justify-between rounded-[9px] items-center ps-[50px] cursor-pointer" onClick={() => {

                const categoryName = category?.data?.find(cat => cat.category_id === val.category)?.name.toLowerCase().replace(/\s+/g, '-');
                const subcategoryName = val.slug;
                sessionStorage.setItem("product_page", 1)
                setCurrentPage(1)
                navigate(`/${categoryName}/${subcategoryName}`, {
                  state: { subcategory_id: val.subcategory_id, scrollTo: "specification" }
                })
              }}>
                <div className="">
                  <h3 className="pop text-[22px] max-xl:text-[20px]  max-sm:text-[18px] font-medium text-[#243238]">{val.name}</h3>
                </div>
                <div className="h-full ">
                  <img src={import.meta.env.VITE_API_BASE_URL + val.subcategory_img} className="shadow-[0px_0px_10px_0px_#00000040] max-xl:w-[120px] max-w-[170px] object-cover h-full" alt="" />
                </div>
              </div>
            ))}


          </div> */}
          <div className="mt-[30px] max-w-[1152px] max-lg:w-[80%] mx-auto ">
            {isCategoryLoading ? (
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-5 xl:grid-cols-6 max-sm:gap-[30px] max-md:gap-[40px] max-lg:gap-[45px] gap-[60px]">
                {Array(6)
                  .fill()
                  .map((_, index) => (
                    <div
                      key={index}
                      className="w-full h-[163px]   relative z-10 max-sm:h-[130px] rounded-[15px] bg-[#b9b9b991] animate-pulse"
                    />
                  ))}
              </div>
            ) : (
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-5 xl:grid-cols-6 max-sm:gap-[30px] max-md:gap-[40px] max-lg:gap-[45px] gap-[60px]">
                {category?.data?.map((val) => (
                  <div
                    key={val.category_id}
                    className="rounded-[15px]  relative z-10 bg-white shadow-[4px_4px_10px_0px_#00000040] overflow-hidden transition-all cursor-pointer duration-300 ease-in-out hover:shadow-[0px_0px_15px_0px_#00000026_inset]"
                    onClick={() => {
                      setSelected('All')
                      setSelectedCategory('All Category')
                      navigate(`/${val.name.toLowerCase().replace(/\s+/g, '-')}`, {
                        state: { category_id: val.category_id, name: val.name },
                      })
                    }}
                  >
                    <div className="flex flex-col justify-between max-sm:h-[130px] items-center py-[18px] h-[163px]">
                      <img
                        src={categoryImages[val.name.toLowerCase()]}
                        alt={val.name}
                        className="max-h-[80px] max-sm:h-[50px]  object-contain"
                      />
                      <h6 className="text-center text-[16px] font-[300] capitalize">
                        {val.name}
                      </h6>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

        </div>
      </section >


      <section className="" id="specification">
        <div className="container">

          <div className="flex mb-[30px] flex-wrap gap-3 items-center justify-between">
            <h3 className="inter font-[600] text-[#303538] text-[24px]">{themes?.total_items} Products</h3>
            <div className="relative inline-block">
              <button
                onClick={() => setOpen(!open)}
                className="flex flex-wrap items-center justify-between min-w-[180px] px-[19px] py-[8px] border border-[#757575] rounded-[12px] text-[18px] font-[400] text-[#3b3b3b] hover:border-gray-600 transition-all"
              >
                <span className="flex items-center gap-3">
                  <span className="text-[#868686] inter ">Sort By :</span>
                  <span className="text-[#333] font-medium">{selected}</span>
                </span>
                <svg xmlns="http://www.w3.org/2000/svg" className={`transition-transform ms-[20px] ${open ? 'rotate-180' : ''}`} width="13" height="8" viewBox="0 0 13 8" fill="none">
                  <path fillRule="evenodd" clipRule="evenodd" d="M0.247561 0.684156C0.40628 0.525635 0.62143 0.436594 0.845753 0.436594C1.07008 0.436594 1.28523 0.525635 1.44394 0.684156L6.48907 5.72928L11.5342 0.684156C11.6117 0.600988 11.7051 0.534281 11.809 0.488015C11.9128 0.441749 12.0249 0.416871 12.1386 0.414866C12.2522 0.41286 12.3651 0.433769 12.4705 0.476343C12.5759 0.518917 12.6717 0.582286 12.7521 0.662668C12.8324 0.74305 12.8958 0.838798 12.9384 0.944202C12.981 1.04961 13.0019 1.1625 12.9999 1.27616C12.9979 1.38982 12.973 1.50192 12.9267 1.60575C12.8805 1.70959 12.8137 1.80304 12.7306 1.88054L7.08726 7.52386C6.92854 7.68238 6.71339 7.77142 6.48907 7.77142C6.26475 7.77142 6.0496 7.68238 5.89088 7.52386L0.247561 1.88054C0.0890396 1.72182 0 1.50667 0 1.28235C0 1.05802 0.0890396 0.842875 0.247561 0.684156Z" fill="#303538" />
                </svg>
              </button>

              {open && (
                <ul className="absolute mt-2 w-full bg-white border border-gray-300 rounded-[10px] shadow-lg z-10">
                  {options.map((option, index) => (
                    <li
                      key={index}
                      onClick={() => {
                        setSelected(option);
                        setOpen(false);
                      }}
                      className={`px-5 py-3 cursor-pointer text-[17px] hover:bg-gray-100 ${selected === option ? 'bg-gray-100 font-semibold' : ''
                        }`}
                    >
                      {option}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>


          <div className="grid grid-cols-4 max-2xl:gap-[48px_25px] max-xl:grid-cols-3 max-lg:grid-cols-2 max-sm:grid-cols-1   gap-x-[88px] gap-y-[50px]">

            {filteredTemplates?.map((val) => (

              <Product
                theme_id={val?.theme_id}
                key={val?.theme_id}
                image={val?.thumbnail}
                name={val?.name}
                slug={val?.slug}
                discount_price={val?.price}
                category={val?.category}
                subcategory={val?.subcategory}
                categoryName={category?.data?.find(cat => cat.category_id === val.category)?.name.toLowerCase().replace(/\s+/g, '-')}
                subcategoryName={subcategory?.data?.find(sub => sub.subcategory_id == val.subcategory)?.slug}
                rating={val?.rating}
                sales_count={val?.sales_count}
                demo_url={val?.demo_url}
                product_page={currentPage}
              />
            ))}

          </div>
        </div>
      </section>
      {
        themes && (

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

      <Footer />
    </>
  );
}

export default HomePage;
