import React, { useEffect, useRef, useState } from "react";
import Header from '../component/header'
import Footer from '../component/footer'
import RatingStars from '../component/Rating'
import cate1 from '../assets/html.svg'
import cate2 from '../assets/bootstrap.svg'
import cate3 from '../assets/laravel.svg'
import cate4 from '../assets/php.svg'
import cate5 from '../assets/react.svg'
import cate6 from '../assets/shopify.svg'
import cate7 from '../assets/wordpress.svg'
import sub1 from '../assets/banner-1.jpg'
import sub2 from '../assets/subcate2.png'
import sub3 from '../assets/subcate3.png'
import sub4 from '../assets/subcate4.png'
import sub5 from '../assets/subcate5.png'
import Product from '../component/product'
import { useAddWishlistMutation, useDeleteWishlistMutation, useGetCategoryQuery, useGetThemesQuery, useGetWhishlistQuery, useAddCartMutation, useGetSubcategoryQuery, useGetRatingQuery } from "../service/apislice";
import { Navigate, useLocation, useNavigate, useParams } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";

import { Helmet } from 'react-helmet-async';


function HomePage() {
  const [modal, setModal] = useState('');
  const openModal = (modalId) => setModal(modalId);
  const closeModal = () => setModal(null);
  const location = useLocation()
  const navigate = useNavigate()

  const { category_name, subcategory_name, theme_name } = useParams();

  const { data: category } = useGetCategoryQuery()
  const { data: subcategory } = useGetSubcategoryQuery({ fetch_all: true })

  const { data: theme11 } = useGetThemesQuery({fetch_all: true })


  const [the__id, setThe__id] = useState(null);
  const [notFound, setNotFound] = useState(false); // to conditionally redirect


  // ✅ Check category
  useEffect(() => {
    if (category_name && Array.isArray(category?.data)) {
      const theme = category.data.find(
        (val) => val.name?.toLowerCase().replace(/\s+/g, '-') === category_name
      );

      if (!theme) {
        navigate('/404', { replace: true });
      }
    }
  }, [category, category_name, navigate]);

  // ✅ Check subcategory
  useEffect(() => {
    if (subcategory_name && Array.isArray(subcategory?.data)) {
      const sub = subcategory.data.find((val) => val.slug === subcategory_name);

      if (!sub) {
        navigate('/404', { replace: true });
      }
    }
  }, [subcategory, subcategory_name, navigate]);

  // ✅ Check theme
  useEffect(() => {
    if (theme_name && theme11?.data) {
      if (Array.isArray(theme11.data)) {
        const subcate = theme11.data.find(
          (val) => val.slug === theme_name
        );
        console.log('Matched from array:', subcate);
        if (subcate) {
          setThe__id(subcate.theme_id);
        } else {
          navigate('/404', { replace: true }); // ✅ consistent redirect
        }
      } else {
        const matched =
          theme11.data.slug === theme_name;
        console.log('Matched from single object:', matched);
        if (matched) {
          setThe__id(theme11.data.theme_id);
        } else {
          navigate('/404', { replace: true }); // ✅ consistent redirect
        }
      }
    }
  }, [theme_name, theme11, navigate]);

  // ✅ Fallback
  const theme_id = the__id || location?.state?.theme_id;
  const { data: rating } = useGetRatingQuery({ theme_id: theme_id })
  const { data: theme } = useGetThemesQuery({ theme_id })


  const [liked, setLiked] = useState(false);

  const [addWishlist] = useAddWishlistMutation()

  const handleaddwhishlist = async () => {
    try {

      const formdata = new FormData()

      formdata.append('theme_id', theme_id)

      await addWishlist(formdata).unwrap()
      // toast.success('Item successfully whishlist')
      navigate('/wishlist')

    } catch (error) {
      toast.error(error?.message || error?.data?.message || 'Failed to add whishlist', {
        autoClose: 1000,
      });
    }
  }

  const { data: whishlist } = useGetWhishlistQuery()
  useEffect(() => {
    if (whishlist?.data?.some((val) => val.theme_id === theme_id)) {
      setLiked(true);
    } else {
      setLiked(false);
    }
  }, [whishlist, theme_id]);

  const [deletewhishlist] = useDeleteWishlistMutation()
  const handledeletwhishlist = async () => {
    try {

      const id = whishlist?.data?.find((val) => val.theme_id === theme_id)?.wishlist_id


      const formdata = new FormData()

      formdata.append('wishlist_id', id)

      await deletewhishlist(formdata).unwrap()
      // toast.success('Item successfully whishlist')


    } catch (error) {
      toast.error(error?.message || error?.data?.message || 'Failed to remove whishlist', {
        autoClose: 1000,
      });
    }
  }
  const formatDate = (dateString) => {
    if (!dateString) return '';

    const date = new Date(dateString);
    return date.toLocaleDateString('en-GB', {
      day: '2-digit',
      month: 'long',
      year: 'numeric',
    });
  };

  const [fileSize, setFileSize] = useState('');

  useEffect(() => {
    if (theme?.data?.theme_file) {
      const fileUrl = import.meta.env.VITE_API_BASE_URL + `${theme.data.theme_file}`; // ✅ Add base URL
      getFileSize(fileUrl).then(setFileSize);
    }
  }, [theme?.data?.theme_file]);

  const getFileSize = async (fileUrl) => {
    try {
      const response = await fetch(fileUrl, { method: 'HEAD' });
      const size = response.headers.get('Content-Length');
      if (size) {
        const sizeInMB = (parseInt(size, 10) / (1024 * 1024)).toFixed(2);
        return `${sizeInMB} MB`;
      } else {
        return 'Unknown size';
      }
    } catch (error) {
      console.error('Error getting file size:', error);
      return 'Error';
    }
  };

  const [add_cart] = useAddCartMutation()

  const handlecart = async () => {
    try {

      const formdata = new FormData()
      formdata.append('theme_id', theme_id)

      await add_cart(formdata).unwrap()
      navigate('/cart')

    } catch (error) {
    
       if(localStorage.getItem('aithemetoken')){
                      toast.error(error?.message || error?.data?.message || 'failed to add to cart', {
        autoClose: 1000,
      });
      
                  }else{
                      navigate('/login')
                  }
    }
  }
  // const handlecart = async () => {
  //   try {

  //     const response = await fetch(`https://srv733641.hstgr.cloud:3443${theme?.data?.theme_file}`);
  //     const blob = await response.blob();
  //     const link = document.createElement('a');
  //     link.href = window.URL.createObjectURL(blob);
  //     link.download = `${theme?.data?.name}.zip`; // or use a cleaner filename
  //     document.body.appendChild(link);
  //     link.click();
  //     document.body.removeChild(link);

  //   } catch (error) {
  //     toast.error(error?.message || error?.data?.message || 'failed to add to cart', {
  //       autoClose: 1000,
  //     });
  //   }
  // }

  const keywords = ['Fully Responsive Design', 'Clean & Modern Layout ', 'SEO-Optimized Code', 'Easy Customization', 'Fast Loading & Lightweight ', 'Gallery Showcase', 'Interactive Guestbook', 'Integrated Blog Section', 'Cross-Browser Compatibility', 'Clean HTML5 & CSS3 Code', 'Contact Page with Functional Form', 'W3C Validated & Well-Documented'];

  const highlightKeywords = (text, keywords) => {
    let escapedText = text;
    keywords.forEach((word) => {
      const regex = new RegExp(`(${word})`, 'gi');
      escapedText = escapedText.replace(regex, '<strong className="font-[700]">$1</strong>');
    });
    return escapedText;
  };
  const highlightedDescription = theme?.data?.description?.replace(
    /ZenithFlow/g,
    '<strong className="font-[800]">ZenithFlow</strong>'
  );

  const [showFull, setShowFull] = useState(false);
  const [shouldShowButton, setShouldShowButton] = useState(false);
  const contentRef = useRef(null);

  useEffect(() => {
    if (contentRef.current && contentRef.current.scrollHeight > 300) {
      setShouldShowButton(true);
    }
  }, [theme, highlightedDescription]);

  return (
    <>
      <Helmet>
        <title>{theme?.data?.name || 'Aithemecode'}</title>
        <meta name="keywords" xml:lang="en" lang="en" content={`${theme?.data?.meta_keywords}`} />
        <meta name="description" xml:lang="en" lang="en" content={`${theme?.data?.meta_description}`} />
        <meta name="og:description" content={`${theme?.data?.meta_description}`} />
        <meta name="og:url" content={`https://aithemecode.com/${location.pathname}`} />
        <meta name="og:title" content={theme?.data?.name} />
        <meta name="twitter:title" content={theme?.data?.name} />
        <meta name="twitter:url" content={`https://aithemecode.com/${location.pathname}`} />
        <meta name="twitter:description" content={`${theme?.data?.meta_description}`} />

        <link rel="canonical" href={`https://aithemecode.com/${location.pathname}`} />
      </Helmet>
    <ToastContainer/>
      <Header />
      <section className="pt-[50px] pb-[40px] pop">
        <div className=" max-w-[1380px] px-[12px] mx-auto">

          <div className="flex items-center gap-[10px]">
            <span className=" text-[#90A4AE] leading-[0px] max-sm:text-sm pop">Home</span>
            <div><svg xmlns="http://www.w3.org/2000/svg" width="6" height="10" viewBox="0 0 6 10" fill="none">
              <path d="M6 5.10819C6 5.24861 5.93783 5.38178 5.82959 5.47171L0.780571 9.67913C0.683622 9.75494 0.560975 9.79004 0.438599 9.77699C0.316223 9.76395 0.203729 9.70379 0.124938 9.60925C0.046147 9.51471 0.00724651 9.39321 0.0164736 9.27049C0.0257007 9.14776 0.0823308 9.03345 0.174372 8.95176L4.78729 5.10819L0.174688 1.2643C0.126085 1.22477 0.0858114 1.17599 0.0562029 1.12078C0.0265943 1.06557 0.00823924 1.00504 0.00220242 0.942679C-0.00383439 0.880323 0.00256686 0.81739 0.021035 0.757527C0.0395031 0.697664 0.069671 0.642062 0.109789 0.593945C0.149907 0.545829 0.199178 0.506154 0.254744 0.477221C0.310311 0.44829 0.371067 0.430676 0.433492 0.425402C0.495917 0.420127 0.558768 0.427296 0.618401 0.446494C0.678034 0.465692 0.733263 0.496537 0.780886 0.53724L5.82991 4.74465C5.88318 4.78907 5.92603 4.84466 5.95542 4.90749C5.98481 4.97031 6.00003 5.03883 6 5.10819Z" fill="#90A4AE" />
            </svg></div>
            <span className=" text-[#90A4AE] leading-[0px] max-sm:text-sm pop">{category?.data?.find((val) => val.category_id == theme?.data?.category)?.name}</span>
            <div><svg xmlns="http://www.w3.org/2000/svg" width="6" height="10" viewBox="0 0 6 10" fill="none">
              <path d="M6 5.10819C6 5.24861 5.93783 5.38178 5.82959 5.47171L0.780571 9.67913C0.683622 9.75494 0.560975 9.79004 0.438599 9.77699C0.316223 9.76395 0.203729 9.70379 0.124938 9.60925C0.046147 9.51471 0.00724651 9.39321 0.0164736 9.27049C0.0257007 9.14776 0.0823308 9.03345 0.174372 8.95176L4.78729 5.10819L0.174688 1.2643C0.126085 1.22477 0.0858114 1.17599 0.0562029 1.12078C0.0265943 1.06557 0.00823924 1.00504 0.00220242 0.942679C-0.00383439 0.880323 0.00256686 0.81739 0.021035 0.757527C0.0395031 0.697664 0.069671 0.642062 0.109789 0.593945C0.149907 0.545829 0.199178 0.506154 0.254744 0.477221C0.310311 0.44829 0.371067 0.430676 0.433492 0.425402C0.495917 0.420127 0.558768 0.427296 0.618401 0.446494C0.678034 0.465692 0.733263 0.496537 0.780886 0.53724L5.82991 4.74465C5.88318 4.78907 5.92603 4.84466 5.95542 4.90749C5.98481 4.97031 6.00003 5.03883 6 5.10819Z" fill="#90A4AE" />
            </svg></div>
            <span className=" text-[#90A4AE] leading-[0px] max-sm:text-sm pop capitalize">{subcategory_name.replace(/-/g, " ")}</span>
            <div></div>
          </div>

          <h1 className="mt-[30px] max-sm:leading-[35px] max-sm:text-[25px] max-sm:mt-[15px] text-[#243238] text-[30px] mb-[20px] leading-[54px]  font-[600] pop">{theme?.data?.name}</h1>

          <div className="flex max-sm:block items-center max-sm:justify-start flex-wrap gap-3 justify-between border-b border-[#D8D8D8] pb-[10px]">
            <div className="flex  items-center max-sm:hidden gap-[50px] font-light">
              <a
                onClick={() => {
                  const el = document.getElementById("description");
                  if (el) {
                    el.scrollIntoView({ behavior: "smooth", block: "start" });
                  }
                }}
                className="pop max-sm:hidden cursor-pointer"
              >
                Description
              </a>

              <a onClick={() => {
                const el = document.getElementById("review");
                if (el) {
                  el.scrollIntoView({ behavior: "smooth", block: "start" });
                }
              }} className="cursor-pointer max-sm:hidden pop">Reviews ({theme?.data?.total_reviews})</a>
            </div>
            <div className=" flex items-center max-sm:justify-between gap-[30px]">
              <RatingStars rating={theme?.data?.rating || 0} />

              <div className="flex items-center gap-[10px]">
                <div><svg xmlns="http://www.w3.org/2000/svg" className="max-sm:h-[15px]" width="18" height="22" viewBox="0 0 18 22" fill="none">
                  <path fillRule="evenodd" clipRule="evenodd" d="M4.08245 5.18678H2.70432C2.24522 5.1868 1.80318 5.36076 1.4672 5.67364C1.13123 5.98652 0.926276 6.41507 0.893615 6.87301L0.00460007 19.3213C-0.013134 19.5699 0.0205287 19.8196 0.103491 20.0546C0.186453 20.2897 0.316936 20.5051 0.48681 20.6876C0.656684 20.87 0.862309 21.0155 1.09087 21.115C1.31943 21.2145 1.56603 21.2658 1.81531 21.2658H16.1848C16.434 21.2657 16.6805 21.2142 16.909 21.1147C17.1375 21.0151 17.3431 20.8696 17.5129 20.6872C17.6828 20.5048 17.8132 20.2895 17.8963 20.0545C17.9793 19.8195 18.0131 19.5699 17.9955 19.3213L17.1065 6.87301C17.0738 6.41507 16.8688 5.98652 16.5329 5.67364C16.1969 5.36076 15.7549 5.1868 15.2958 5.18678H13.9275V4.92744C13.9275 3.6206 13.4083 2.36729 12.4843 1.44322C11.5602 0.51914 10.3069 0 9.00004 0C6.37812 0 3.95485 2.0882 4.07259 4.92744L4.08245 5.18678ZM12.3714 5.18678V4.92744C12.3714 4.03329 12.0162 3.17576 11.384 2.5435C10.7517 1.91124 9.89419 1.55604 9.00004 1.55604C8.10589 1.55604 7.24835 1.91124 6.61609 2.5435C5.98383 3.17576 5.62863 4.03329 5.62863 4.92744V5.18678H12.3714Z" fill="#90A4AE" />
                </svg></div>
                <span className="font-light leading-[100%] max-sm:text-sm  pop">Sales : <span className="text-gray">{theme?.data?.sales_count}</span></span>
              </div>
            </div>
          </div>


        </div>
      </section>

      <section className=" pop">
        <div className=" max-w-[1380px] px-[12px] mx-auto">
          <div className="relative flex max-md:flex-wrap gap-[30px] justify-between">
            <div className="w-[58%] max-md:w-full">
              <img src={import.meta.env.VITE_API_BASE_URL + theme?.data?.thumbnail} className="w-full" alt="" />

              <div className="py-[20px] max-sm:py-[10px] border-b border-[#D8D8D8] flex items-center justify-between">
                <div id="description" className="flex items-center gap-[11px]">
                  <img src={import.meta.env.VITE_API_BASE_URL + category?.data?.find((val) => val.category_id == theme?.data?.category)?.category_img} alt="" className="h-[30px] max-sm:h-[25px]" srcSet="" />
                  <h5 className="text-[16px] pop capitalize max-sm:text-[14px]">{category?.data?.find((val) => val.category_id == theme?.data?.category)?.name}</h5>
                </div>
                <div onClick={() => {
                  if (!liked) {

                    handleaddwhishlist()
                  } else {

                    handledeletwhishlist()
                  }
                  setLiked(!liked)
                }}>
                  {liked ? (
                    <svg xmlns="http://www.w3.org/2000/svg" className="cursor-pointer max-sm:w-[25px]" width="31" height="28" viewBox="0 0 15 14" fill="#FF3B3B">
                      <path d="M10.4998 0C9.39113 0 8.32106 0.406769 7.49963 1.15133C6.67821 0.406769 5.60814 0 4.4995 0C3.62174 0 2.76318 0.256999 2.02954 0.738901C1.29589 1.2208 0.719194 1.90673 0.370448 2.71224C0.0217017 3.51774 -0.0838665 4.40765 0.0667419 5.27239C0.21735 6.13714 0.61756 6.93896 1.21809 7.57913L7.23712 13.3956C7.30757 13.4636 7.40178 13.5012 7.49963 13.5007C7.59619 13.5003 7.68888 13.4627 7.7584 13.3956L13.7924 7.56788C14.3899 6.92657 14.7871 6.12473 14.9353 5.26083C15.0834 4.39693 14.976 3.50857 14.6263 2.70484C14.2767 1.90111 13.6999 1.21699 12.9668 0.736487C12.2337 0.255987 11.3763 0 10.4998 0Z" />
                    </svg>
                  ) : (
                    // 🤍 Outline Heart
                    <svg xmlns="http://www.w3.org/2000/svg" className="cursor-pointer max-sm:w-[25px]" width="31" height="28" viewBox="0 0 15 14" fill="none">
                      <path d="M10.4998 2.74759e-05C9.39113 -0.00386889 8.32106 0.406769 7.49963 1.15133C6.67821 0.406769 5.60814 -0.00386889 4.4995 2.74759e-05C3.62174 0.000167056 2.76318 0.256999 2.02954 0.738901C1.29589 1.2208 0.719194 1.90673 0.370448 2.71224C0.0217017 3.51774 -0.0838665 4.40765 0.0667419 5.27239C0.21735 6.13714 0.61756 6.93896 1.21809 7.57913L7.23712 13.3956C7.30757 13.4636 7.40178 13.5012 7.49963 13.5007C7.59619 13.5003 7.68888 13.4627 7.7584 13.3956L13.7924 7.56788C14.3899 6.92657 14.7871 6.12473 14.9353 5.26083C15.0834 4.39693 14.976 3.50857 14.6263 2.70484C14.2767 1.90111 13.6999 1.21699 12.9668 0.736487C12.2337 0.255987 11.3763 2.41482e-05 10.4998 2.74759e-05ZM13.2599 7.04285L7.49963 12.6044L1.75437 7.0541C1.11724 6.32159 0.78901 5.37053 0.838715 4.40097C0.88842 3.43141 1.31219 2.51891 2.02088 1.85539C2.72958 1.19186 3.66798 0.829031 4.63871 0.843201C5.60944 0.857371 6.53684 1.24744 7.22587 1.93137C7.26095 1.96884 7.30335 1.9987 7.35044 2.01912C7.39753 2.03954 7.44831 2.05008 7.49963 2.05008C7.55096 2.05008 7.60174 2.03954 7.64883 2.01912C7.69592 1.9987 7.73832 1.96884 7.7734 1.93137C8.122 1.55734 8.54411 1.25936 9.01326 1.05608C9.4824 0.852803 9.98848 0.748621 10.4998 0.750062C11.2289 0.749378 11.9424 0.961257 12.553 1.35977C13.1636 1.75829 13.6448 2.32615 13.9376 2.99387C14.2305 3.6616 14.3224 4.40021 14.202 5.11934C14.0816 5.83846 13.7543 6.5069 13.2599 7.04285Z" fill="#797979" />
                    </svg>
                  )}
                </div>
              </div>

              <div className="relative">
                <div
                  ref={contentRef}
                  className={`transition-all  duration-500 ease-in-out overflow-hidden ${showFull ? 'max-h-[9999px]' : 'max-h-[300px] md:max-h-full'
                    }`}
                >
                  {/* Description */}
                  {theme?.data?.description && (
                    <div
                      className="mt-[20px] max-sm:text-[14px] text-[#243238] font-light leading-[25px] pop"
                      dangerouslySetInnerHTML={{ __html: theme?.data?.description }}
                    />
                  )}

                  {/* Key Features */}
                  <h5 className="mt-[30px] pb-[10px] pop border-b border-[#D8D8D8] font-[600] text-[20px] leading-[25px] text-[#243238]">
                    Key Features
                  </h5>
                  {/* <ul className="text-neutral-600  ms-2 mt-3 text-[16px] list-disc ps-7">
                    {theme?.data?.features
                      ?.split('\r\n')
                      .map((feature, index) => (
                        <li
                          key={index}
                          className="max-sm:text-[14px] leading-[25px] pop font-[300] text-[#243238]"
                          dangerouslySetInnerHTML={{
                            __html: highlightKeywords(feature, keywords),
                          }}
                        ></li>
                      ))}
                  </ul> */}
                  <div
                    className="mt-[20px] max-sm:text-[14px] text-[#243238] font-light leading-[25px] pop"
                    dangerouslySetInnerHTML={{ __html: theme?.data?.features }}
                  />

                  {/* Review Heading */}

                  <h5 id="review" className="pt-[30px] mt-[30px]  pb-[20px] pop border-t border-[#D8D8D8]  font-[600] text-[20px] leading-[25px] text-[#243238]">{theme?.data?.total_reviews} Reviews for this product
                  </h5>
                  {
                    rating?.data?.map((val, index) => (
                      <div key={index} className="border border-[#DDE3E6] mt-[15px] rounded-[3px] p-[20px]">
                        <div className="flex gap-2 flex-wrap justify-between">
                          <div className="flex items-center gap-[3px]">
                            <RatingStars rating={val?.rating || 0} />
                          </div>
                          <div className="text-[#243238] text-[12.69px] inter">
                            by
                            <span className="text-[13.56px] font-[700]"> {val?.full_name}</span>
                            {/* <span className="text-[13.13px] text-[#546E7A] leading-[20px] ml-2">
                              {new Date(val.created_at).toLocaleString('en-US', {
                                month: 'short',
                                day: '2-digit',
                                year: 'numeric',
                                hour: 'numeric',
                                minute: '2-digit',
                                hour12: true,
                              })}
                            </span> */}
                          </div>
                        </div>
                        <p className="text-[13.02px] text-[13.02px] my-[20px] pop">{val.review}</p>

                        {/* <div className="ms-auto flex justify-end ">
                          <div className="flex items-center gap-[30px]">
                            <div className="flex items-center gap-[10px]">
                              <svg xmlns="http://www.w3.org/2000/svg" className="cursor-pointer" width="21" height="20" viewBox="0 0 21 20" fill="none">
                                <path fillRule="evenodd" clipRule="evenodd" d="M11.1902 2.01002C10.7452 1.93402 10.4782 2.19702 10.4782 2.47402C10.4782 6.88802 6.78816 9.88402 3.50116 9.88402H1.41016V16.659C4.56716 16.699 6.04716 17.118 7.14116 17.555C7.33916 17.635 7.51816 17.711 7.68916 17.785C8.48216 18.125 9.08616 18.383 10.4102 18.383H16.0242C16.235 18.383 16.4372 18.2993 16.5863 18.1502C16.7354 18.0011 16.8192 17.7989 16.8192 17.588C16.8192 17.3772 16.7354 17.175 16.5863 17.0259C16.4372 16.8768 16.235 16.793 16.0242 16.793C15.8915 16.793 15.7644 16.7403 15.6706 16.6466C15.5768 16.5528 15.5242 16.4256 15.5242 16.293C15.5242 16.1604 15.5768 16.0332 15.6706 15.9395C15.7644 15.8457 15.8915 15.793 16.0242 15.793H16.8872C17.0981 15.793 17.3005 15.7092 17.4497 15.56C17.5988 15.4108 17.6827 15.2085 17.6827 14.9975C17.6827 14.7865 17.5988 14.5842 17.4497 14.435C17.3005 14.2858 17.0981 14.202 16.8872 14.202C16.7545 14.202 16.6274 14.1493 16.5336 14.0556C16.4398 13.9618 16.3872 13.8346 16.3872 13.702C16.3872 13.5694 16.4398 13.4422 16.5336 13.3485C16.6274 13.2547 16.7545 13.202 16.8872 13.202H17.7512C17.9621 13.202 18.1645 13.1182 18.3137 12.969C18.4628 12.8198 18.5467 12.6175 18.5467 12.4065C18.5467 12.1955 18.4628 11.9932 18.3137 11.844C18.1645 11.6948 17.9621 11.611 17.7512 11.611C17.6185 11.611 17.4914 11.5583 17.3976 11.4646C17.3038 11.3708 17.2512 11.2436 17.2512 11.111C17.2512 10.9784 17.3038 10.8512 17.3976 10.7575C17.4914 10.6637 17.6185 10.611 17.7512 10.611H18.6142C18.8251 10.611 19.0275 10.5272 19.1767 10.378C19.3258 10.2288 19.4097 10.0265 19.4097 9.81552C19.4097 9.60454 19.3258 9.4022 19.1767 9.25302C19.0275 9.10383 18.8251 9.02002 18.6142 9.02002H11.7062C11.6295 9.02012 11.5539 9.00261 11.4851 8.96884C11.4163 8.93506 11.3562 8.88593 11.3095 8.82524C11.2627 8.76455 11.2305 8.69392 11.2153 8.6188C11.2002 8.54368 11.2025 8.46609 11.2222 8.39202L11.2242 8.38402L11.2312 8.35702L11.2582 8.25302L11.3542 7.86402C11.4352 7.53402 11.5412 7.07902 11.6482 6.56902C11.8622 5.54502 12.0712 4.34802 12.0692 3.52702C12.0692 2.41902 11.5472 2.07002 11.1902 2.01002ZM12.3452 8.02002C12.4449 7.60615 12.5383 7.19077 12.6252 6.77402C12.8432 5.73302 13.0662 4.43402 13.0682 3.52702C13.0682 2.04402 12.2962 1.18402 11.3562 1.02402C10.5062 0.880019 9.47716 1.38602 9.47716 2.47402C9.47716 6.31402 6.25816 8.88402 3.50016 8.88402H0.910156C0.777548 8.88402 0.650371 8.9367 0.556603 9.03047C0.462835 9.12423 0.410156 9.25141 0.410156 9.38402L0.410156 17.156C0.410156 17.2886 0.462835 17.4158 0.556603 17.5096C0.650371 17.6033 0.777548 17.656 0.910156 17.656C4.31616 17.656 5.76116 18.081 6.77016 18.484C6.94416 18.554 7.11016 18.624 7.27316 18.695C8.09416 19.049 8.87216 19.383 10.4102 19.383H16.0242C16.3421 19.3831 16.6543 19.2987 16.9289 19.1385C17.2035 18.9783 17.4307 18.748 17.5871 18.4713C17.7435 18.1945 17.8237 17.8812 17.8193 17.5633C17.8149 17.2454 17.7262 16.9344 17.5622 16.662C17.8029 16.5647 18.0196 16.4162 18.1974 16.227C18.3751 16.0377 18.5097 15.8122 18.5919 15.5658C18.674 15.3195 18.7017 15.0583 18.6731 14.8002C18.6445 14.5422 18.5602 14.2934 18.4262 14.071C18.6667 13.9734 18.8832 13.8248 19.0607 13.6355C19.2383 13.4462 19.3727 13.2207 19.4547 12.9744C19.5368 12.7281 19.5644 12.467 19.5359 12.209C19.5073 11.9511 19.4231 11.7023 19.2892 11.48C19.6761 11.3242 19.9967 11.0384 20.1958 10.6718C20.3949 10.3052 20.4602 9.88076 20.3803 9.47131C20.3004 9.06187 20.0804 8.69303 19.7581 8.42818C19.4358 8.16333 19.0313 8.01901 18.6142 8.02002H12.3452Z" fill="black" />
                              </svg>
                              <p className="text-[#546E7A] text-sm leading-[20px]">4</p>
                            </div>
                            <div className="flex items-center gap-[10px]">
                              <svg xmlns="http://www.w3.org/2000/svg" className="cursor-pointer" width="21" height="20" viewBox="0 0 21 20" fill="none">
                                <path fillRule="evenodd" clipRule="evenodd" d="M9.4202 17.99C9.8652 18.066 10.1322 17.803 10.1322 17.526C10.1322 13.112 13.8222 10.116 17.1092 10.116H19.2002V3.34098C16.0432 3.30098 14.5632 2.88198 13.4692 2.44498C13.2712 2.36498 13.0922 2.28898 12.9212 2.21498C12.1282 1.87498 11.5242 1.61698 10.2002 1.61698H4.58619C4.37535 1.61698 4.17314 1.70074 4.02405 1.84983C3.87495 1.99892 3.79119 2.20113 3.79119 2.41198C3.79119 2.62283 3.87495 2.82504 4.02405 2.97413C4.17314 3.12322 4.37535 3.20698 4.58619 3.20698C4.7188 3.20698 4.84598 3.25966 4.93975 3.35343C5.03352 3.4472 5.08619 3.57437 5.08619 3.70698C5.08619 3.83959 5.03352 3.96677 4.93975 4.06053C4.84598 4.1543 4.7188 4.20698 4.58619 4.20698H3.7232C3.51222 4.20698 3.30988 4.29079 3.16069 4.43998C3.01151 4.58916 2.9277 4.7915 2.9277 5.00248C2.9277 5.21346 3.01151 5.4158 3.16069 5.56498C3.30988 5.71417 3.51222 5.79798 3.7232 5.79798C3.8558 5.79798 3.98298 5.85066 4.07675 5.94443C4.17052 6.0382 4.2232 6.16537 4.2232 6.29798C4.2232 6.43059 4.17052 6.55777 4.07675 6.65153C3.98298 6.7453 3.8558 6.79798 3.7232 6.79798H2.8592C2.64822 6.79798 2.44588 6.88179 2.29669 7.03098C2.14751 7.18016 2.0637 7.3825 2.0637 7.59348C2.0637 7.80446 2.14751 8.0068 2.29669 8.15598C2.44588 8.30517 2.64822 8.38898 2.8592 8.38898C2.9918 8.38898 3.11898 8.44166 3.21275 8.53543C3.30652 8.6292 3.3592 8.75637 3.3592 8.88898C3.3592 9.02159 3.30652 9.14877 3.21275 9.24253C3.11898 9.3363 2.9918 9.38898 2.8592 9.38898H1.99619C1.78522 9.38898 1.58288 9.47279 1.43369 9.62198C1.28451 9.77116 1.2007 9.9735 1.2007 10.1845C1.2007 10.3955 1.28451 10.5978 1.43369 10.747C1.58288 10.8962 1.78522 10.98 1.99619 10.98H8.9042C8.98082 10.9799 9.05645 10.9974 9.12523 11.0312C9.19401 11.0649 9.25411 11.1141 9.30089 11.1748C9.34766 11.2355 9.37986 11.3061 9.395 11.3812C9.41014 11.4563 9.40781 11.5339 9.3882 11.608L9.3862 11.616L9.3792 11.643L9.3522 11.747L9.2562 12.136C9.17519 12.466 9.0692 12.921 8.9622 13.431C8.7482 14.455 8.5392 15.652 8.54119 16.473C8.54119 17.581 9.0632 17.93 9.4202 17.99ZM8.26519 11.98C8.16545 12.3938 8.0721 12.8092 7.9852 13.226C7.76719 14.267 7.5442 15.566 7.5422 16.473C7.5422 17.956 8.3142 18.816 9.2542 18.976C10.1042 19.12 11.1332 18.614 11.1332 17.526C11.1332 13.686 14.3522 11.116 17.1102 11.116H19.7002C19.8328 11.116 19.96 11.0633 20.0537 10.9695C20.1475 10.8758 20.2002 10.7486 20.2002 10.616V2.84398C20.2002 2.71137 20.1475 2.5842 20.0537 2.49043C19.96 2.39666 19.8328 2.34398 19.7002 2.34398C16.2942 2.34398 14.8492 1.91898 13.8402 1.51598C13.6662 1.44598 13.5002 1.37598 13.3372 1.30498C12.5162 0.950981 11.7382 0.616982 10.2002 0.616982H4.58619C4.26828 0.61693 3.95605 0.701315 3.68144 0.861507C3.40683 1.0217 3.17969 1.25195 3.02325 1.52872C2.86682 1.80548 2.78669 2.11883 2.79107 2.43672C2.79546 2.75461 2.88419 3.06563 3.04819 3.33798C2.80749 3.43535 2.59077 3.58378 2.413 3.77303C2.23523 3.96228 2.10063 4.18785 2.01849 4.43417C1.93635 4.68049 1.90863 4.94169 1.93724 5.19977C1.96585 5.45784 2.0501 5.70663 2.18419 5.92898C1.94369 6.02659 1.72719 6.17516 1.54963 6.36448C1.37206 6.55379 1.23763 6.77935 1.15561 7.02561C1.07358 7.27186 1.04592 7.53297 1.0745 7.79095C1.10309 8.04893 1.18725 8.29765 1.3212 8.51998C0.934244 8.67584 0.613659 8.96162 0.414537 9.32819C0.215416 9.69476 0.150188 10.1192 0.230066 10.5287C0.309944 10.9381 0.529938 11.307 0.852242 11.5718C1.17455 11.8367 1.57903 11.981 1.99619 11.98H8.26519Z" fill="black" />
                              </svg>
                              <p className="text-[#546E7A] text-sm leading-[20px]">4</p>
                            </div>
                          </div>
                        </div> */}

                      </div>
                    ))
                  }
                  {/* Reviews content (if needed) goes here */}
                  {/* You can optionally wrap reviews inside this expandable div too */}
                </div>


                {/* Fade and Show More/Less Button */}
                {shouldShowButton && (
                  <div className="md:hidden relative">
                    {!showFull && (
                      <div className="absolute bottom-[0px] left-0 right-0 h-[280px] bg-gradient-to-t from-white to-transparent pointer-events-none"></div>
                    )}
                    <button
                      className=" mt-[20px] flex relative font-[600] z-2 justify-center gap-3 items-center w-full text-center"
                      onClick={() => setShowFull(!showFull)}
                    >
                      {showFull ? 'Show Less' : 'Show More'} <svg className={`${showFull ? 'rotate-180' : ''}`} xmlns="http://www.w3.org/2000/svg" width="13" viewBox="0 0 18 11" fill="none">
                        <path fillRule="evenodd" clipRule="evenodd" d="M0.342777 0.373046C0.562541 0.153555 0.860442 0.0302685 1.17104 0.0302685C1.48164 0.0302685 1.77954 0.153555 1.99931 0.373046L8.98487 7.3586L15.9704 0.373046C16.0777 0.257891 16.2071 0.165527 16.3509 0.101466C16.4947 0.0374056 16.6499 0.0029591 16.8073 0.000182406C16.9646 -0.00259429 17.1209 0.0263557 17.2669 0.0853048C17.4128 0.144254 17.5454 0.231995 17.6567 0.343294C17.768 0.454592 17.8557 0.587166 17.9147 0.73311C17.9736 0.879054 18.0026 1.03538 17.9998 1.19275C17.997 1.35013 17.9626 1.50533 17.8985 1.6491C17.8345 1.79288 17.7421 1.92227 17.627 2.02958L9.81313 9.8434C9.59337 10.0629 9.29547 10.1862 8.98487 10.1862C8.67427 10.1862 8.37637 10.0629 8.1566 9.8434L0.342777 2.02958C0.123286 1.80981 0 1.51191 0 1.20131C0 0.89071 0.123286 0.59281 0.342777 0.373046Z" fill="black" />
                      </svg>
                    </button>
                  </div>
                )}
              </div>















            </div>
            <div className="w-[33%]  max-md:w-full max-lg:w-[40%]">
              <div className="sticky top-2">
                <div className="border rounded-[10px] border-[#D8D8D8] p-[10px_20px_20px]">
                  <div className="flex items-center border-b border-[#D8D8D8] justify-between">

                    <h3 className="text-[18px] max-sm:text-[16px] font-medium leading-[54px] text-[#243238] pop capitalize">{subcategory_name.replace(/-/g, " ")}</h3>
                    <h4 className="text-[22px] max-sm:text-[20px] font-medium leading-[54px] text-[#243238] pop">${theme?.data?.price}</h4>

                  </div>
                  <div className="mt-[16px] space-y-[10px]">
                    <div className="flex items-center gap-[10px]">
                      <div><svg xmlns="http://www.w3.org/2000/svg" width="13" height="10" viewBox="0 0 13 10" fill="none">
                        <path d="M12.8096 0.190391C12.5558 -0.0634638 12.1443 -0.0634638 11.8904 0.190391L4.10298 7.97786L1.10963 4.98452C0.855803 4.73066 0.444272 4.73069 0.190391 4.98452C-0.0634638 5.23835 -0.0634638 5.64988 0.190391 5.90373L3.64336 9.35665C3.89711 9.61048 4.30895 9.6103 4.5626 9.35665L12.8096 1.10963C13.0635 0.855803 13.0634 0.444247 12.8096 0.190391Z" fill="#545454" />
                      </svg></div>
                      <h6 className="font-light max-sm:text-sm pop">Quality checked by Ai theme Code</h6>
                    </div>
                    <div className="flex items-center gap-[10px]">
                      <div><svg xmlns="http://www.w3.org/2000/svg" width="13" height="10" viewBox="0 0 13 10" fill="none">
                        <path d="M12.8096 0.190391C12.5558 -0.0634638 12.1443 -0.0634638 11.8904 0.190391L4.10298 7.97786L1.10963 4.98452C0.855803 4.73066 0.444272 4.73069 0.190391 4.98452C-0.0634638 5.23835 -0.0634638 5.64988 0.190391 5.90373L3.64336 9.35665C3.89711 9.61048 4.30895 9.6103 4.5626 9.35665L12.8096 1.10963C13.0635 0.855803 13.0634 0.444247 12.8096 0.190391Z" fill="#545454" />
                      </svg></div>
                      <h6 className="font-light max-sm:text-sm pop">Future updates</h6>
                    </div>
                  </div>

                  <div className="space-y-[15px] mt-[30px]">
                    <button onClick={() => window.open(theme?.data?.demo_url)} className="bg-[#0084B4] text-[18px] font-[600] flex items-center w-full justify-center rounded-[5px] overflow-hidden  text-white gap-[10px] h-[44px] max-sm:text-[16px] max-sm:h-[40px] shadow-[0px_3px_0px_0px_#00698F]"><svg xmlns="http://www.w3.org/2000/svg" className="max-sm:w-[20px]" width="24" height="15" viewBox="0 0 24 15" fill="none">
                      <path d="M12 14.8905C5.60584 14.8905 0.525548 8.23358 0.350365 7.9708L0 7.44526L0.350365 6.91971C0.525548 6.65693 5.60584 0 12 0C18.3942 0 23.4745 6.65693 23.6496 6.91971L24 7.44526L23.6496 7.9708C23.4745 8.23358 18.3942 14.8905 12 14.8905ZM2.18978 7.44526C3.50365 8.93431 7.44526 13.1387 12 13.1387C16.5547 13.1387 20.5839 8.93431 21.8102 7.44526C20.4964 5.9562 16.5547 1.75182 12 1.75182C7.44526 1.75182 3.41606 5.9562 2.18978 7.44526Z" fill="white" />
                      <path d="M11.9999 11.4745C9.81012 11.4745 7.9707 9.72265 7.9707 7.44527C7.9707 5.1679 9.72253 3.41608 11.9999 3.41608C14.2773 3.41608 16.0291 5.1679 16.0291 7.44527C16.0291 9.72265 14.1897 11.4745 11.9999 11.4745ZM11.9999 5.1679C10.7736 5.1679 9.72253 6.13141 9.72253 7.44527C9.72253 8.75914 10.686 9.72265 11.9999 9.72265C13.3138 9.72265 14.2773 8.75914 14.2773 7.44527C14.2773 6.13141 13.2262 5.1679 11.9999 5.1679Z" fill="white" />
                    </svg> Live Preview</button>
                    <button onClick={handlecart} className="bg-[#82B440] max-sm:text-[16px] max-sm:h-[40px]  text-[18px] font-[600] flex items-center w-full justify-center rounded-[5px] overflow-hidden  text-white gap-[10px] h-[44px] shadow-[0px_3px_0px_0px_#6F9A36]"><svg xmlns="http://www.w3.org/2000/svg" className="max-sm:w-[20px]" width="29" height="26" viewBox="0 0 29 26" fill="none">
                      <path d="M12.8008 25.4882C14.2085 25.4882 15.3496 24.3471 15.3496 22.9394C15.3496 21.5317 14.2085 20.3906 12.8008 20.3906C11.3931 20.3906 10.252 21.5317 10.252 22.9394C10.252 24.3471 11.3931 25.4882 12.8008 25.4882Z" fill="white" />
                      <path d="M21.3535 25.4882C22.7612 25.4882 23.9023 24.3471 23.9023 22.9394C23.9023 21.5317 22.7612 20.3906 21.3535 20.3906C19.9458 20.3906 18.8047 21.5317 18.8047 22.9394C18.8047 24.3471 19.9458 25.4882 21.3535 25.4882Z" fill="white" />
                      <path d="M0.849605 1.69927H4.39263L8.49441 16.0583L8.17269 16.7018C7.32558 18.3942 8.55529 20.3906 10.4527 20.3906H24.7518C25.2214 20.3906 25.6014 20.0106 25.6014 19.541C25.6014 19.0714 25.2214 18.6914 24.7518 18.6914H10.4527C9.82177 18.6914 9.40943 18.027 9.69269 17.4618L9.92752 16.9922H24.7518C24.9365 16.9921 25.1162 16.9319 25.2636 16.8207C25.4111 16.7095 25.5183 16.5533 25.5691 16.3757L28.9675 4.48121C29.0035 4.35476 29.0097 4.22169 28.9856 4.09243C28.9616 3.96318 28.908 3.84124 28.829 3.73617C28.7496 3.63134 28.647 3.5463 28.5292 3.48772C28.4115 3.42914 28.2818 3.39859 28.1503 3.39848H6.64521L5.85038 0.616473C5.79958 0.438903 5.69236 0.282699 5.54491 0.171477C5.39746 0.0602545 5.21781 6.20133e-05 5.03312 0H0.849605C0.38 0 0 0.38 0 0.849605C0 1.31921 0.38 1.69927 0.849605 1.69927Z" fill="white" />
                    </svg>Add to Cart</button>
                  </div>


                </div>

                <div className="bg-[#FAFAFA] max-sm:mt-[30px] mt-[47px] space-y-[15px] border border-[#D8D8D8] p-[25px_32px] rounded-[10px] ">
                  <div className="flex items-center ">
                    <div className="w-[50%] pop font-medium text-[#545454] max-sm:text-sm">Last Update</div>
                    <div className="pop text-[#868686] max-sm:text-sm">{formatDate(theme?.data?.updated_at)}</div>
                  </div>
                  <div className="flex items-center ">
                    <div className="w-[50%] pop font-medium text-[#545454] max-sm:text-sm">File Size</div>
                    <div className="pop text-[#868686] max-sm:text-sm">{fileSize} MB</div>
                  </div>
                  <div className="flex items-center ">
                    <div className="w-[50%] pop font-medium text-[#545454] max-sm:text-sm">High Resolution</div>
                    <div className="pop text-[#868686] max-sm:text-sm">Yes</div>
                  </div>
                  {/* <div className="flex items-center ">
                  <div className="w-[50%] pop font-medium text-[#545454] max-sm:text-sm">Compatible With</div>
                  <div className="pop text-[#868686] max-sm:text-sm">Bootstrap 5.x</div>
                </div> */}
                  <div className="flex items-center ">
                    <div className="w-[50%] pop font-medium text-[#545454] max-sm:text-sm">Layout</div>
                    <div className="pop text-[#868686] max-sm:text-sm">Responsive</div>
                  </div>
                  <div className="flex items-center ">
                    <div className="w-[50%] pop font-medium text-[#545454] max-sm:text-sm">Created</div>
                    <div className="pop text-[#868686] max-sm:text-sm">{formatDate(theme?.data?.created_at)}</div>
                  </div>
                  {/* <div className="">
                  <div className="w-[50%] pop font-medium text-[#545454] max-sm:text-sm">Tags</div>
                  <div className="pop text-[#868686] max-sm:text-sm flex flex-wrap gap-[15px] items-center mt-[15px]">
                    <div className="border border-[#C9C9C9] text-[#AAAAAA] pop rounded-[3px] bg-[#FFFFFF] flex justify-center items-center h-[35px] px-[10px] text-sm">Agency</div>
                    <div className="border border-[#C9C9C9] text-[#AAAAAA] pop rounded-[3px] bg-[#FFFFFF] flex justify-center items-center h-[35px] px-[10px] text-sm">Agency</div>
                    <div className="border border-[#C9C9C9] text-[#AAAAAA] pop rounded-[3px] bg-[#FFFFFF] flex justify-center items-center h-[35px] px-[10px] text-sm">Agency</div>
                    <div className="border border-[#C9C9C9] text-[#AAAAAA] pop rounded-[3px] bg-[#FFFFFF] flex justify-center items-center h-[35px] px-[10px] text-sm">Agency</div>
                    <div className="border border-[#C9C9C9] text-[#AAAAAA] pop rounded-[3px] bg-[#FFFFFF] flex justify-center items-center h-[35px] px-[10px] text-sm">Agency</div>
                    <div className="border border-[#C9C9C9] text-[#AAAAAA] pop rounded-[3px] bg-[#FFFFFF] flex justify-center items-center h-[35px] px-[10px] text-sm">Agency</div>
                  </div>
                </div> */}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>


      {
        modal === 'modal3' && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">

            <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
              <div className="flex min-h-full items-center justify-center p-4 text-center sm:items-center sm:p-0">
                <div className="relative transform overflow-hidden px-[30px] py-[20px]  rounded-[6px] bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-xl z-40">
                  <div className="bg-white ">
                    <div className="flex items-center border-b border-[#D8D8D8] justify-between">
                      <h3 className="text-[22px] font-medium text-[#243238] leading-[54px] pop ">In Your Cart</h3>
                      <div onClick={closeModal}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
                          <path d="M0.781382 15.9998C0.626847 15.9998 0.475774 15.954 0.347274 15.8682C0.218774 15.7824 0.118618 15.6603 0.0594765 15.5176C0.000334655 15.3748 -0.0151367 15.2177 0.0150195 15.0661C0.0451757 14.9146 0.119605 14.7753 0.228892 14.6661L14.6661 0.228849C14.8127 0.0823194 15.0114 0 15.2186 0C15.4258 0 15.6246 0.0823194 15.7711 0.228849C15.9176 0.375378 16 0.574115 16 0.781339C16 0.988562 15.9176 1.1873 15.7711 1.33383L1.33387 15.7711C1.26138 15.8437 1.17526 15.9013 1.08045 15.9406C0.985634 15.9798 0.884 15.9999 0.781382 15.9998Z" fill="black" />
                          <path d="M15.2186 15.9998C15.116 15.9999 15.0143 15.9798 14.9195 15.9406C14.8247 15.9013 14.7386 15.8437 14.6661 15.7711L0.228849 1.33383C0.0823194 1.1873 0 0.988562 0 0.781339C0 0.574115 0.0823194 0.375378 0.228849 0.228849C0.375378 0.0823194 0.574115 0 0.781339 0C0.988562 0 1.1873 0.0823194 1.33383 0.228849L15.7711 14.6661C15.8803 14.7753 15.9548 14.9146 15.9849 15.0661C16.0151 15.2177 15.9996 15.3748 15.9405 15.5176C15.8813 15.6603 15.7812 15.7824 15.6527 15.8682C15.5242 15.954 15.3731 15.9998 15.2186 15.9998Z" fill="black" />
                          <path d="M15.2186 15.9998C15.116 15.9999 15.0143 15.9798 14.9195 15.9406C14.8247 15.9013 14.7386 15.8437 14.6661 15.7711L0.228849 1.33383C0.0823194 1.1873 0 0.988562 0 0.781339C0 0.574115 0.0823194 0.375378 0.228849 0.228849C0.375378 0.0823194 0.574115 0 0.781339 0C0.988562 0 1.1873 0.0823194 1.33383 0.228849L15.7711 14.6661C15.8803 14.7753 15.9548 14.9146 15.9849 15.0661C16.0151 15.2177 15.9996 15.3748 15.9405 15.5176C15.8813 15.6603 15.7812 15.7824 15.6527 15.8682C15.5242 15.954 15.3731 15.9998 15.2186 15.9998Z" fill="black" />
                        </svg>
                      </div>
                    </div>
                    <div className="mt-[30px]">
                      <div className="border border-[#D8D8D8] rounded-[6px] p-[10px_20px_10px_10px] flex items-center justify-between" >
                        <div className="flex items-center">
                          <div>
                            <img src={sub1} className="w-[132px]" alt="" srcSet="" />
                          </div>
                          <div></div>
                        </div>
                        <div></div>
                      </div>
                    </div>


                  </div>
                  <div className="  pt-[30px] flex flex-row-reverse gap-3 ">
                    <button type="button" className="inline-flex h-[35px] sm:h-[40px]  w-[114px] shadow-[0px_8px_20px_1px_#F443364D] rounded-md bg-[#F44336] items-center   justify-center py-2 text-sm font-semibold text-white shadow-xs  sm:ml-3 ">Delete</button>
                    <button type="button" className="mt-3 bg-[#F4F1FC] h-[35px] sm:h-[40px] w-[114px] closeModal   rounded-md border-0   inline-flex justify-center items-center  py-2 text-sm font-semibold  shadow-xs   sm:mt-0 " onClick={closeModal} >Cancel</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )
      }



      <Footer />
    </>
  );
}

export default HomePage;
