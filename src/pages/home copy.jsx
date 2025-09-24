import React, { useEffect, useRef, useState } from "react";
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
import { Link, useNavigate } from "react-router-dom";
import Particles from "react-tsparticles";
import { Helmet } from "react-helmet-async";


function HomePage() {
  const navigate = useNavigate()

  const [selectedCategory, setSelectedCategory] = useState("All Categories");
  const [isOpen, setIsOpen] = useState(false);

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

  const { data: category, isLoading: isCategoryLoading } = useGetCategoryQuery({ fetch_all: true },
    {
      keepUnusedDataFor: 300,
      refetchOnMountOrArgChange: false,
    })

  const { data: subcategory } = useGetSubcategoryQuery({ fetch_all: true })
  const itemsPerPage = 16;
  const [currentPage, setCurrentPage] = useState(1);
  const queryParams = {
    page_size: itemsPerPage,
    page: currentPage,
  };
  const { data: themes } = useGetThemesQuery(queryParams);
  const [showDropdown, setShowDropdown] = useState(false);

  const filters = ['All Templates', 'HTML', 'React', 'Vue', 'Tailwind'];

  const [search, setsearch] = useState('')

  const { data: serchtheme } = useGetThemesQuery({ search: search })
  const categoryImages = {
    "html": cate1,
    "bootstrap": cate2,
    "laravel": cate3,
    "php": cate4,
    "react": cate5,
    "shopify": cate6,
    "wordpress": cate7,
  };
  const [arrival_id, setArrivalId] = useState(null);

  const categoryName = category?.data?.find(cat => cat.category_id === category)?.name.toLowerCase().replace(/\s+/g, '-');
  const { data: themes_sales } = useGetThemesQuery({ is_sale: true });
  const { data: themes_trending } = useGetThemesQuery({ is_trending: true });
  const { data: themes_best_sellers } = useGetThemesQuery({ is_best_seller: true });
  const { data: themes_featured } = useGetThemesQuery({ is_featured: true });
  const { data: themes_arrivals } = useGetThemesQuery({ is_new_arrival: true, category_id: arrival_id });

  useEffect(() => {
    if (window.particlesJS) {
      window.particlesJS('particles-js', {
        particles: {
          number: {
            value: 140,
            density: {
              enable: true,
              value_area: 2000,
            },
          },
          color: {
            value: '#000',
          },
          shape: {
            type: 'circle',
          },
          opacity: {
            value: 0.5,
            random: true,
          },
          size: {
            value: 2,
            random: true,
          },
          move: {
            enable: true,
            speed: 3,
          },
          line_linked: {
            enable: true,
            distance: 150,
            color: '#000',
            opacity: 0.4,
            width: 1,
          },
        },
        interactivity: {
          detect_on: 'canvas',
          events: {
            onhover: {
              enable: false,
              mode: 'repulse',
            },
          },
        },
        retina_detect: true,
      });
    }
  }, []);

  return (
    <>
      <Helmet>
        <title>{"AI Theme Code – Premium Website Themes & Templates for Business"}</title>
        <meta name="description" xml:lang="en" lang="en" content={"Discover AI-powered premium website themes and templates at Aithemecode. Modern, responsive, and SEO-friendly designs for businesses, blogs, and startups."} />
        <meta name="og:description" content={"Discover AI-powered premium website themes and templates at Aithemecode. Modern, responsive, and SEO-friendly designs for businesses, blogs, and startups."} />
        <meta name="og:url" content={`https://aithemecode.com/`} />
        <meta name="og:title" content={"AI Theme Code – Premium Website Themes & Templates for Business"} />
        <meta name="twitter:title" content={"AI Theme Code – Premium Website Themes & Templates for Business"} />
        <meta name="twitter:url" content={`https://aithemecode.com/`} />
        <meta name="twitter:description" content={"Discover AI-powered premium website themes and templates at Aithemecode. Modern, responsive, and SEO-friendly designs for businesses, blogs, and startups."} />

        <link rel="canonical" href={`https://aithemecode.com/`} />
      </Helmet>

      <Header />

      <section className="pt-[70px] relative pb-[100px] max-sm:pt-[50px] max-sm:pb-[70px]">
        <div id="particles-js" className="absolute inset-0 z-0" />
        <div className="container">


          <h1 className="pop font-[600] leading-[54px] mb-[10px] max-md:text-[35px] max-sm:text-[26px] max-sm:leading-[35px] text-center text-[40px]">“Build Stunning Websites Faster with Ready-Made Templates”</h1>

          <p className="text-[20px] leading-[54px] max-lg:leading-[35px] max-sm:leading-[30px] max-sm:text-[18px] text-center">Hand-coded, SEO-optimized and responsive website themes for developers, startups, and agencies.</p>


          <div className="flex w-full justify-center">


            <div className="max-w-[966px] bg-white mt-[30px] relative z-[12] w-full px-[25px] max-sm:h-[45px]  flex items-center max-auto border border-[#757575] h-[55px] rounded-[200px]">
              <div className="flex items-center w-full ">
                <div>

                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <path fillRule="evenodd" clipRule="evenodd" d="M6.12637 0C2.74555 0 0 2.74555 0 6.12637C0 9.50718 2.74555 12.2527 6.12637 12.2527C9.50718 12.2527 12.2527 9.50718 12.2527 6.12637C12.2527 2.74555 9.50718 0 6.12637 0ZM6.12637 0.942518C8.98785 0.942518 11.3102 3.26488 11.3102 6.12637C11.3102 8.98785 8.98785 11.3102 6.12637 11.3102C3.26488 11.3102 0.942518 8.98785 0.942518 6.12637C0.942518 3.26488 3.26488 0.942518 6.12637 0.942518Z" fill="#757575" />
                    <path fillRule="evenodd" clipRule="evenodd" d="M15.8852 15.2179L10.4572 9.79089C10.3684 9.70504 10.2493 9.65754 10.1258 9.65862C10.0022 9.65969 9.884 9.70925 9.79663 9.79663C9.70925 9.884 9.65969 10.0022 9.65862 10.1258C9.65754 10.2493 9.70504 10.3684 9.79089 10.4572L15.2179 15.8852C15.3084 15.9632 15.425 16.0041 15.5443 15.9997C15.6637 15.9953 15.777 15.9459 15.8614 15.8614C15.9459 15.777 15.9953 15.6637 15.9997 15.5443C16.0041 15.425 15.9632 15.3084 15.8852 15.2179Z" fill="#757575" />
                  </svg>
                </div>
                <div className="ms-[13px]    w-full">
                  <input type="text" placeholder="Search templates & themes…" className=" text-[18px] max-sm:text-[14px] max-md:text-[16px] text-[#757575] font-[300] w-full inter bg-transparent" onFocus={() => setShowDropdown(true)}
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
                              const subcategoryname = subcategory?.data?.find(sub => sub.subcategory_id == item.subcategory)?.slug
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
              {/* <div className="ps-[27px] border-s border-[#757575]">
                <div className="relative py-[1px] cursor-pointer select-none " ref={dropdownRef}>
         
                  <div
                    className="flex inter text-[#303538] items-center gap-[35px] text-nowrap text-[18px]"
                    onClick={() => setIsOpen((prev) => !prev)}
                  >
                    {selectedCategory}
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="18"
                      height="11"
                      viewBox="0 0 18 11"
                      fill="none"
                      className={`transform transition-transform duration-300 ${isOpen ? "rotate-180" : ""
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
                    className={`absolute left-0 mt-2 bg-[#fafafa] border border-[#cacaca] rounded-[5px] overflow-hidden transition-all duration-300 ease-in-out ${isOpen ? "max-h-[500px] opacity-100 visible" : "max-h-0 opacity-0 invisible"
                      }`}
                  >
                    <ul className="py-[8px] px-[5px] min-w-[150px] inter">
                      {categories.map((cat, idx) => (
                        <li
                          key={idx}
                          onClick={() => {
                            setSelectedCategory(cat);
                            setIsOpen(false);
                          }}
                          className="py-[5px] px-[15px] hover:bg-[#f0f0f0] rounded-[5px] cursor-pointer transition-colors"
                        >
                          {cat}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div> */}



            </div>





          </div>


          {/* <div className="mt-[63px] max-w-[1152px] max-lg:w-[80%] mx-auto ">
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
                    onClick={() =>
                      navigate(`/${val.name.toLowerCase().replace(/\s+/g, '-')}`, {
                        state: { category_id: val.category_id, name: val.name },
                      })
                    }
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
          </div> */}



        </div>
      </section>

      {/* <section className="">
        <div className="container">
          <div className="flex items-center justify-between">
            <div>

              <h2 className="pop text-[25px] max-md:leading-[34px] max-md:mb-[15px] max-sm:text-[24px] font-medium text-[#243238] leading-[54px]">Populer Template Sub Categories</h2>
              <p className="text-[15px] text-[#243238]">Explore the best Aithemecode templates,highly-rated amongst users</p>
            </div>
            <a href="" className="flex text-[#538DF8] font-normal underline items-center gap-[10px]">
              Brows all categories <svg xmlns="http://www.w3.org/2000/svg" width="17" height="9" viewBox="0 0 17 9" fill="none">
                <path d="M16.8876 4.00852L13.0241 0.144944C12.8853 -0.0171179 12.6414 -0.03601 12.4793 0.10281C12.3173 0.241596 12.2984 0.485502 12.4372 0.647564C12.4502 0.662671 12.4642 0.676782 12.4793 0.689698L15.6822 3.89646H0.386345C0.172985 3.89646 0 4.06945 0 4.28284C0 4.49623 0.172985 4.66919 0.386345 4.66919H15.6822L12.4793 7.87207C12.3173 8.01086 12.2984 8.25476 12.4372 8.41682C12.576 8.57889 12.8199 8.59778 12.982 8.45896C12.9971 8.44601 13.0112 8.43193 13.0241 8.41682L16.8877 4.55324C17.0374 4.4026 17.0374 4.15923 16.8876 4.00852Z" fill="#538DF8" />
              </svg>
            </a> 
          </div>

          <div className="grid mt-[30px] grid-cols-3 max-lg:grid-cols-2 max-sm:grid-cols-1 gap-x-[15px] gap-y-[30px]">
            {subcategory?.data?.slice(0, 6).map((val) => (

              <div key={val.subcategory_id} className="h-[102px] overflow-hidden border border-[#C0C0C0] max-xl:h-[90px] max-xl:ps-[20px] flex justify-between rounded-[9px] items-center ps-[50px] cursor-pointer" onClick={() => {

                const categoryName = category?.data?.find(cat => cat.category_id === val.category)?.name.toLowerCase().replace(/\s+/g, '-');
                const subcategoryName = val.slug

                navigate(`/${categoryName}/${subcategoryName}`, {
                  state: { subcategory_id: val.subcategory_id }
                })
              }}>
                <div className="">
                  <h3 className="pop text-[22px] max-xl:text-[20px] max-sm:text-[18px] font-medium text-[#243238]">{val.name}</h3>
                </div>
                <div className="h-full ">
                  <img src={import.meta.env.VITE_API_BASE_URL + val.subcategory_img} className="shadow-[0px_0px_10px_0px_#00000040] max-xl:w-[120px] max-w-[170px] object-cover h-full" alt="" />
                </div>
              </div>
            ))}


          </div>
        </div>
      </section > */}

      <section className="pt-[70px]">
        <div className="container">
          <h2 className="pop mb-[20px] font-medium text-[25px] leading-[54px] text-[#243238]">Recent view product</h2>

          <div className="grid grid-cols-4 max-2xl:gap-[48px_25px] max-xl:grid-cols-3 max-lg:grid-cols-2 max-sm:grid-cols-1   gap-x-[88px] gap-y-[50px]">

            {themes?.data?.slice(0, 4)?.map((val) => (

              <Product
                theme_id={val?.theme_id}
                image={val?.thumbnail}
                key={val?.theme_id}
                name={val?.name}
                slug={val?.slug}
                discount_price={val?.price}
                category={val?.category}
                subcategory={val?.subcategory}
                rating={val?.rating}
                categoryName={category?.data?.find(cat => cat.category_id === val.category)?.name.toLowerCase().replace(/\s+/g, '-')}
                subcategoryName={subcategory?.data?.find(sub => sub.subcategory_id == val.subcategory)?.slug}
                sales_count={val?.sales_count}
                demo_url={val?.demo_url}
              />
            ))}

          </div>
        </div>
      </section>

      <section className="pt-[70px]">
        <div className="container">
          <div className="mb-[30px]">

            <div className="flex items-center  justify-between">
              <div>
                <h2 className="pop  font-medium text-[25px] leading-[54px] text-[#243238]">Sale</h2>
                <p className="text-[17px] max-sm:hidden text-[#243238] leading-[30px]">Limited-time deal on today’s top theme – available for 24 hours</p>
              </div>
              <div>
                {themes_trending?.data?.length > 3 && (
                  <a href="/sales" className="flex text-[#538DF8] max-sm:text-sm font-[600] leading-[54px] underline items-center gap-[10px]">

                    View More <svg xmlns="http://www.w3.org/2000/svg" width="17" height="9" viewBox="0 0 17 9" fill="none">
                      <path d="M16.8876 4.00852L13.0241 0.144944C12.8853 -0.0171179 12.6414 -0.03601 12.4793 0.10281C12.3173 0.241596 12.2984 0.485502 12.4372 0.647564C12.4502 0.662671 12.4642 0.676782 12.4793 0.689698L15.6822 3.89646H0.386345C0.172985 3.89646 0 4.06945 0 4.28284C0 4.49623 0.172985 4.66919 0.386345 4.66919H15.6822L12.4793 7.87207C12.3173 8.01086 12.2984 8.25476 12.4372 8.41682C12.576 8.57889 12.8199 8.59778 12.982 8.45896C12.9971 8.44601 13.0112 8.43193 13.0241 8.41682L16.8877 4.55324C17.0374 4.4026 17.0374 4.15923 16.8876 4.00852Z" fill="#538DF8" />
                    </svg>

                  </a>
                )}
              </div>

            </div>
            <p className="text-[17px] max-sm:text-sm sm:hidden text-[#243238] leading-[30px]">Limited-time deal on today’s top theme – available for 24 hours</p>
          </div>

          <div className="grid grid-cols-4 max-2xl:gap-[48px_25px] max-xl:grid-cols-3 max-lg:grid-cols-2 max-sm:grid-cols-1   gap-x-[88px] gap-y-[50px]">

            {themes_sales?.data?.slice(0, 4)?.map((val) => (

              <Product
                theme_id={val?.theme_id}
                image={val?.thumbnail}
                key={val?.theme_id}
                name={val?.name}
                slug={val?.slug}
                discount_price={val?.price}
                category={val?.category}
                subcategory={val?.subcategory}
                rating={val?.rating}
                categoryName={category?.data?.find(cat => cat.category_id === val.category)?.name.toLowerCase().replace(/\s+/g, '-')}
                subcategoryName={subcategory?.data?.find(sub => sub.subcategory_id == val.subcategory)?.slug}
                sales_count={val?.sales_count}
                demo_url={val?.demo_url}
              />
            ))}

          </div>
        </div>
      </section>

      <section className="pt-[70px]">
        <div className="container">
          <div className="mb-[30px]">

            <div className="flex items-center  justify-between">
              <div>
                <h2 className="pop  font-medium text-[25px] leading-[54px] text-[#243238]">Trending Now</h2>
                <p className="text-[17px] max-sm:hidden text-[#243238] leading-[30px]">The most popular website themes gaining traction right now – loved by designers and developers alike.</p>
              </div>
              <div>
                {themes_trending?.data?.length > 3 && (


                  <Link to="/themes" state={{ sort_by: 'Trending' }} className="flex text-[#538DF8] max-sm:text-sm font-[600] leading-[54px] underline items-center gap-[10px]">

                    View More <svg xmlns="http://www.w3.org/2000/svg" width="17" height="9" viewBox="0 0 17 9" fill="none">
                      <path d="M16.8876 4.00852L13.0241 0.144944C12.8853 -0.0171179 12.6414 -0.03601 12.4793 0.10281C12.3173 0.241596 12.2984 0.485502 12.4372 0.647564C12.4502 0.662671 12.4642 0.676782 12.4793 0.689698L15.6822 3.89646H0.386345C0.172985 3.89646 0 4.06945 0 4.28284C0 4.49623 0.172985 4.66919 0.386345 4.66919H15.6822L12.4793 7.87207C12.3173 8.01086 12.2984 8.25476 12.4372 8.41682C12.576 8.57889 12.8199 8.59778 12.982 8.45896C12.9971 8.44601 13.0112 8.43193 13.0241 8.41682L16.8877 4.55324C17.0374 4.4026 17.0374 4.15923 16.8876 4.00852Z" fill="#538DF8" />
                    </svg>

                  </Link>
                )}
              </div>

            </div>
            <p className="text-[17px] max-sm:text-sm sm:hidden text-[#243238] leading-[30px]">The most popular website themes gaining traction right now – loved by designers and developers alike.</p>
          </div>

          <div className="grid grid-cols-4 max-2xl:gap-[48px_25px] max-xl:grid-cols-3 max-lg:grid-cols-2 max-sm:grid-cols-1   gap-x-[88px] gap-y-[50px]">

            {themes_trending?.data?.slice(0, 4)?.map((val) => (

              <Product
                theme_id={val?.theme_id}
                image={val?.thumbnail}
                key={val?.theme_id}
                name={val?.name}
                slug={val?.slug}
                discount_price={val?.price}
                category={val?.category}
                subcategory={val?.subcategory}
                rating={val?.rating}
                categoryName={category?.data?.find(cat => cat.category_id === val.category)?.name.toLowerCase().replace(/\s+/g, '-')}
                subcategoryName={subcategory?.data?.find(sub => sub.subcategory_id == val.subcategory)?.slug}
                sales_count={val?.sales_count}
                demo_url={val?.demo_url}
              />
            ))}

          </div>
        </div>
      </section>

      <section className="pt-[70px]">
        <div className="container">
          <div className="mb-[30px]">

            <div className="flex items-center  justify-between">
              <div>
                <h2 className="pop  font-medium text-[25px] leading-[54px] text-[#243238]">Bestsellers</h2>
                <p className="text-[17px] max-sm:hidden text-[#243238] leading-[30px]">Top website templates with the highest sales volume and customer satisfaction.</p>
              </div>
              <div>
                {themes_best_sellers?.data?.length > 3 && (
                  <Link to="/themes" state={{ sort_by: 'Bestsellers' }} className="flex text-[#538DF8] max-sm:text-sm font-[600] leading-[54px] underline items-center gap-[10px]">

                    View More <svg xmlns="http://www.w3.org/2000/svg" width="17" height="9" viewBox="0 0 17 9" fill="none">
                      <path d="M16.8876 4.00852L13.0241 0.144944C12.8853 -0.0171179 12.6414 -0.03601 12.4793 0.10281C12.3173 0.241596 12.2984 0.485502 12.4372 0.647564C12.4502 0.662671 12.4642 0.676782 12.4793 0.689698L15.6822 3.89646H0.386345C0.172985 3.89646 0 4.06945 0 4.28284C0 4.49623 0.172985 4.66919 0.386345 4.66919H15.6822L12.4793 7.87207C12.3173 8.01086 12.2984 8.25476 12.4372 8.41682C12.576 8.57889 12.8199 8.59778 12.982 8.45896C12.9971 8.44601 13.0112 8.43193 13.0241 8.41682L16.8877 4.55324C17.0374 4.4026 17.0374 4.15923 16.8876 4.00852Z" fill="#538DF8" />
                    </svg>

                  </Link>
                )}
              </div>

            </div>
            <p className="text-[17px] max-sm:text-sm sm:hidden text-[#243238] leading-[30px]">Top website templates with the highest sales volume and customer satisfaction.</p>
          </div>

          <div className="grid grid-cols-4 max-2xl:gap-[48px_25px] max-xl:grid-cols-3 max-lg:grid-cols-2 max-sm:grid-cols-1   gap-x-[88px] gap-y-[50px]">

            {themes_best_sellers?.data?.slice(0, 4)?.map((val) => (

              <Product
                theme_id={val?.theme_id}
                image={val?.thumbnail}
                key={val?.theme_id}
                name={val?.name}
                slug={val?.slug}
                discount_price={val?.price}
                category={val?.category}
                subcategory={val?.subcategory}
                rating={val?.rating}
                categoryName={category?.data?.find(cat => cat.category_id === val.category)?.name.toLowerCase().replace(/\s+/g, '-')}
                subcategoryName={subcategory?.data?.find(sub => sub.subcategory_id == val.subcategory)?.slug}
                sales_count={val?.sales_count}
                demo_url={val?.demo_url}
              />
            ))}

          </div>
        </div>
      </section>

      <section className="pt-[70px]">
        <div className="container">
          <div className="mb-[30px]">

            <div className="flex items-center  justify-between">
              <div>
                <h2 className="pop  font-medium text-[25px] leading-[54px] text-[#243238]">Featured</h2>
                <p className="text-[17px] max-sm:hidden text-[#243238] leading-[30px]">Curated selection of standout templates chosen for design, performance, and versatility.</p>
              </div>
              <div>
                {themes_featured?.data?.length > 3 && (

                  <Link to="/themes" state={{ sort_by: 'Featured' }} className="flex text-[#538DF8] max-sm:text-sm font-[600] leading-[54px] underline items-center gap-[10px]">

                    View More <svg xmlns="http://www.w3.org/2000/svg" width="17" height="9" viewBox="0 0 17 9" fill="none">
                      <path d="M16.8876 4.00852L13.0241 0.144944C12.8853 -0.0171179 12.6414 -0.03601 12.4793 0.10281C12.3173 0.241596 12.2984 0.485502 12.4372 0.647564C12.4502 0.662671 12.4642 0.676782 12.4793 0.689698L15.6822 3.89646H0.386345C0.172985 3.89646 0 4.06945 0 4.28284C0 4.49623 0.172985 4.66919 0.386345 4.66919H15.6822L12.4793 7.87207C12.3173 8.01086 12.2984 8.25476 12.4372 8.41682C12.576 8.57889 12.8199 8.59778 12.982 8.45896C12.9971 8.44601 13.0112 8.43193 13.0241 8.41682L16.8877 4.55324C17.0374 4.4026 17.0374 4.15923 16.8876 4.00852Z" fill="#538DF8" />
                    </svg>

                  </Link>
                )}
              </div>

            </div>
            <p className="text-[17px] max-sm:text-sm sm:hidden text-[#243238] leading-[30px]">Top website templates with the highest sales volume and customer satisfaction.</p>
          </div>

          <div className="grid grid-cols-4 max-2xl:gap-[48px_25px] max-xl:grid-cols-3 max-lg:grid-cols-2 max-sm:grid-cols-1   gap-x-[88px] gap-y-[50px]">

            {themes_featured?.data?.slice(0, 4)?.map((val) => (

              <Product
                theme_id={val?.theme_id}
                image={val?.thumbnail}
                key={val?.theme_id}
                name={val?.name}
                slug={val?.slug}
                discount_price={val?.price}
                category={val?.category}
                subcategory={val?.subcategory}
                rating={val?.rating}
                categoryName={category?.data?.find(cat => cat.category_id === val.category)?.name.toLowerCase().replace(/\s+/g, '-')}
                subcategoryName={subcategory?.data?.find(sub => sub.subcategory_id == val.subcategory)?.slug}
                sales_count={val?.sales_count}
                demo_url={val?.demo_url}
              />
            ))}

          </div>
        </div>
      </section>

      <section className="mt-[70px]">
        <div className="container">
          <div className="mb-[40px]">
            <div className="flex justify-between">
              <div className="sm:w-[104px]"></div>
              <h2 className="pop text-[30px] leading-[54px] text-[#243238] font-medium text-center">New Arrivals</h2>
              <div className="">
                <div className="max-sm:hidden w-[104px]">


                  {themes_arrivals?.data?.length > 3 && (

                    <Link to="/themes" state={{ sort_by: 'New Arrivals' }} className="flex text-[#538DF8] max-sm:text-sm font-[600] leading-[54px] underline items-center gap-[10px]">

                      View More <svg xmlns="http://www.w3.org/2000/svg" width="17" height="9" viewBox="0 0 17 9" fill="none">
                        <path d="M16.8876 4.00852L13.0241 0.144944C12.8853 -0.0171179 12.6414 -0.03601 12.4793 0.10281C12.3173 0.241596 12.2984 0.485502 12.4372 0.647564C12.4502 0.662671 12.4642 0.676782 12.4793 0.689698L15.6822 3.89646H0.386345C0.172985 3.89646 0 4.06945 0 4.28284C0 4.49623 0.172985 4.66919 0.386345 4.66919H15.6822L12.4793 7.87207C12.3173 8.01086 12.2984 8.25476 12.4372 8.41682C12.576 8.57889 12.8199 8.59778 12.982 8.45896C12.9971 8.44601 13.0112 8.43193 13.0241 8.41682L16.8877 4.55324C17.0374 4.4026 17.0374 4.15923 16.8876 4.00852Z" fill="#538DF8" />
                      </svg>

                    </Link>
                  )}
                </div>
              </div>
            </div>
            <p className="text-center text-[#243238] max-sm:text-[16px] text-[18px]"> Fresh website templates just released – be the first to try the latest designs.</p>
            <div className="flex sm:hidden justify-center mt-[20px] max-sm:mt-[10px]">

              {themes_arrivals?.data?.length > 3 && (

                <Link to="/themes" state={{ sort_by: 'New Arrivals' }} className="flex text-[#538DF8] max-sm:text-sm font-[600] leading-[54px] underline items-center gap-[10px]">

                  View More <svg xmlns="http://www.w3.org/2000/svg" width="17" height="9" viewBox="0 0 17 9" fill="none">
                    <path d="M16.8876 4.00852L13.0241 0.144944C12.8853 -0.0171179 12.6414 -0.03601 12.4793 0.10281C12.3173 0.241596 12.2984 0.485502 12.4372 0.647564C12.4502 0.662671 12.4642 0.676782 12.4793 0.689698L15.6822 3.89646H0.386345C0.172985 3.89646 0 4.06945 0 4.28284C0 4.49623 0.172985 4.66919 0.386345 4.66919H15.6822L12.4793 7.87207C12.3173 8.01086 12.2984 8.25476 12.4372 8.41682C12.576 8.57889 12.8199 8.59778 12.982 8.45896C12.9971 8.44601 13.0112 8.43193 13.0241 8.41682L16.8877 4.55324C17.0374 4.4026 17.0374 4.15923 16.8876 4.00852Z" fill="#538DF8" />
                  </svg>

                </Link>
              )}
            </div>
          </div>

          <div className="flex flex-wrap justify-center max-sm:gap-y-[20px] gap-x-[47px] gap-y-[40px]">
            {category?.data?.map((val) => (
              <div className=" w-[368px] max-sm:h-[75px] px-[20px] max-sm:w-full max-2xl:w-[450px] h-[99px] max-lg:w-[45%] rounded-[10px]  shadow-[0px_0px_15px_0px_#00000020] overflow-hidden transition-all cursor-pointer duration-300 ease-in-out hover:shadow-[0px_0px_15px_0px_#00000026_inset]"
                onClick={() => {
                  setArrivalId(val.category_id);
                }}
              >
                <div className=" h-full   justify-center max-sm:justify-start flex items-center gap-[30px]">
                  <div className="max-sm:w-[50px]">
                    <img src={categoryImages[val.name.toLowerCase()]} className="max-lg:max-w-[58px] max-sm:h-[40px] max-lg:max-h-[60px]  " alt="" />
                  </div>
                  <h5 className="leading-[34px]  capitalize max-lg:text-[20px] max-sm:text-[18px]  font-light pop text-[22px]">{val.name} Theme</h5>
                </div>
              </div>
            ))}

          </div>

          <div className="grid pt-[50px] grid-cols-4 max-2xl:gap-[48px_25px] max-xl:grid-cols-3 max-lg:grid-cols-2 max-sm:grid-cols-1   gap-x-[88px] gap-y-[50px]">

            {themes_arrivals?.data?.slice(0, 4)?.map((val) => (

              <Product
                theme_id={val?.theme_id}
                image={val?.thumbnail}
                key={val?.theme_id}
                name={val?.name}
                slug={val?.slug}
                discount_price={val?.price}
                category={val?.category}
                subcategory={val?.subcategory}
                rating={val?.rating}
                categoryName={category?.data?.find(cat => cat.category_id === val.category)?.name.toLowerCase().replace(/\s+/g, '-')}
                subcategoryName={subcategory?.data?.find(sub => sub.subcategory_id == val.subcategory)?.slug}
                sales_count={val?.sales_count}
                demo_url={val?.demo_url}
              />
            ))}

          </div>


        </div>
      </section>

      <Footer />
    </>
  );
}

export default HomePage;
