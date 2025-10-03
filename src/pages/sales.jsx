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
import { useLocation, useNavigate } from "react-router-dom";

function HomePage() {
   const navigate = useNavigate()
  const location = useLocation()
  const [selectedCategory, setSelectedCategory] = useState("All Categories");
  const [isOpen, setIsOpen] = useState(false);
  const { data: category } = useGetCategoryQuery()
  const { data: subcategory } = useGetSubcategoryQuery({ fetch_all: true })

  
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
  const [currentPage, setCurrentPage] = useState(1);
  const queryParams = {
    // page_size: itemsPerPage,
    // page: currentPage,
  };


  if (location?.state?.category_id) {
    queryParams.category_id = location?.state?.category_id;
  }



  if (location?.state?.subcategory_id) {
    queryParams.subcategory_id = location?.state?.subcategory_id;
  }

  const { data: themes } = useGetThemesQuery(queryParams);


  const filteredTemplates = themes?.data

  const totalPages = themes?.total_pages




  const [search, setsearch] = useState('')
  const [showDropdown, setShowDropdown] = useState(false);
  const { data: serchtheme } = useGetThemesQuery({ search: search })
  return (
    <>
      <Header />
      <section className="pt-[70px] pb-[100px]">
        <div className="container">

          <h1 className="pop font-[600] leading-[54px] mb-[10px] text-center text-[40px] capitalize">{location?.state?.name} Sales</h1>

          <p className="text-[20px] leading-[54px] text-center">2025’s Premium {location?.state?.name} Themes from Ai Theme Code</p>


          <div className="flex w-full justify-center">


            <div className="max-w-[966px] mt-[30px] w-full px-[25px]  flex items-center max-auto border border-[#757575] h-[55px] rounded-[200px]">
              <div className="flex items-center w-full relative">
                <div>

                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <path fillRule="evenodd" clipRule="evenodd" d="M6.12637 0C2.74555 0 0 2.74555 0 6.12637C0 9.50718 2.74555 12.2527 6.12637 12.2527C9.50718 12.2527 12.2527 9.50718 12.2527 6.12637C12.2527 2.74555 9.50718 0 6.12637 0ZM6.12637 0.942518C8.98785 0.942518 11.3102 3.26488 11.3102 6.12637C11.3102 8.98785 8.98785 11.3102 6.12637 11.3102C3.26488 11.3102 0.942518 8.98785 0.942518 6.12637C0.942518 3.26488 3.26488 0.942518 6.12637 0.942518Z" fill="#757575" />
                    <path fillRule="evenodd" clipRule="evenodd" d="M15.8852 15.2179L10.4572 9.79089C10.3684 9.70504 10.2493 9.65754 10.1258 9.65862C10.0022 9.65969 9.884 9.70925 9.79663 9.79663C9.70925 9.884 9.65969 10.0022 9.65862 10.1258C9.65754 10.2493 9.70504 10.3684 9.79089 10.4572L15.2179 15.8852C15.3084 15.9632 15.425 16.0041 15.5443 15.9997C15.6637 15.9953 15.777 15.9459 15.8614 15.8614C15.9459 15.777 15.9953 15.6637 15.9997 15.5443C16.0041 15.425 15.9632 15.3084 15.8852 15.2179Z" fill="#757575" />
                  </svg>
                </div>
                <div className="ms-[13px]  w-full">
                  <input type="text" placeholder="Search templates & themes…" className="text-[18px] text-[#757575] font-[300] w-full inter bg-transparent" onFocus={() => setShowDropdown(true)}
                    onBlur={() => setTimeout(() => setShowDropdown(false), 200)} onChange={(e) => setsearch(e.target.value)} />
                  {showDropdown && (
                    <div className="absolute top-full left-0 mt-2 w-full bg-white border border-gray-200 rounded-xl shadow-lg z-10">
                      <div className="max-h-[300px] overflow-y-auto custom-scroll">
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




        </div>
      </section>


      <section className="">
        <div className="container">
          <div className="grid grid-cols-4 max-2xl:gap-[48px_25px] max-[1640px]:gap-x-[40px] max-xl:grid-cols-3 max-lg:grid-cols-2 max-sm:grid-cols-1   gap-x-[88px] gap-y-[50px]">

            {filteredTemplates?.map((val) => (

              <Product
                theme_id={val?.theme_id}
                image={val?.thumbnail}
                name={val?.name}
                key={val?.theme_id}
                slug={val?.slug}
                theme_file={val?.theme_file}
                discount_price={val?.price}
                category={val?.category}
                is_free={val?.is_free}
                categoryName={category?.data?.find(cat => cat.category_id === val.category)?.name.toLowerCase().replace(/\s+/g, '-')}
                subcategoryName={subcategory?.data?.find(sub => sub.subcategory_id == val.subcategory)?.slug}
                rating={val?.rating}
                sales_count={val?.sales_count}
                demo_url={val?.demo_url}
              />
            ))}

          </div>
        </div>
      </section>
      {/* {
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
      } */}

      <Footer />
    </>
  );
}

export default HomePage;
