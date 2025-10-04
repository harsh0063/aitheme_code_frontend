import React, { useEffect, useState } from "react";
import logo from '../assets/product.jpg'
import { useNavigate } from "react-router-dom";
import { useAddWishlistMutation, useDeleteWishlistMutation, useGetCategoryQuery, useGetWhishlistQuery, useGetSubcategoryQuery, useAddOrderMutation, useGetUserQuery } from "../service/apislice";
import { toast, ToastContainer } from "react-toastify";
import cate1 from '../assets/html.svg'
import cate2 from '../assets/bootstrap.svg'
import cate3 from '../assets/laravel.svg'
import cate4 from '../assets/php.svg'
import cate5 from '../assets/react.svg'
import cate6 from '../assets/shopify.svg'
import cate7 from '../assets/wordpress.svg'

const categoryImages = {
    "html": cate1,
    "bootstrap": cate2,
    "laravel": cate3,
    "php": cate4,
    "react": cate5,
    "shopify": cate6,
    "wordpress": cate7,
};

function HomePage({ image, demo_url, sales_count, rating, category, discount_price, name, theme_id, is_free, theme_file, subcategory, categoryName, subcategoryName, product_page, slug }) {
    const navigate = useNavigate()

    const { data: cate } = useGetCategoryQuery({ fetch_all: 'all' })
    const { data: subcate } = useGetSubcategoryQuery({ fetch_all: 'all' })
    const [liked, setLiked] = useState(false);



    const themename = slug;
    const [addWishlist] = useAddWishlistMutation()

    if (product_page) {
        sessionStorage.setItem('product_page', product_page)
    }

    const handleaddwhishlist = async () => {
        try {

            const formdata = new FormData()

            formdata.append('theme_id', theme_id)

            await addWishlist(formdata).unwrap()
            // toast.success('Item successfully whishlist')

            navigate('/wishlist')

        } catch (error) {
            if (localStorage.getItem('aithemetoken')) {
                toast.error(error?.message || error?.data?.message || 'Failed to add to cart', {
                    autoClose: 1000,
                });

            } else {
                navigate('/login')
            }
        }
    }

    const { data: whishlist } = useGetWhishlistQuery(undefined, {
        skip: !localStorage.getItem('aithemetoken')
    });
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
    const { data: user1 } = useGetUserQuery();
    const user = user1?.data;
    const [addorder] = useAddOrderMutation()

    const handlesubmit = async () => {
        try {
            if (!localStorage.getItem('aithemetoken')) {
                navigate('/login')
                return
            }
            // 1. Prepare formData
            const formData = new FormData();
            formData.append("theme_id", theme_id);

            // 2. Call backend to create Razorpay order
            const res = await addorder(formData).unwrap();
            const { razorpay_order_id, amount, currency } = res;




            // 3. Razorpay payment config
            const options = {
                key: "rzp_live_9kPuonCRbdUuKp",
                amount: amount * 100,
                currency,
                name: "AiThemeCode",
                description: "Order Payment",
                order_id: razorpay_order_id,
                handler: async function (res) {
                    const formData = new FormData();
                    formData.append("razorpay_order_id", res.razorpay_order_id);
                    formData.append("razorpay_payment_id", res.razorpay_payment_id);
                    formData.append("razorpay_signature", res.razorpay_signature);

                    // Pass formData to your verifyPayment function
                    await verifyPayment(formData);
                    navigate("/profile"); // Change this route as per your app
                },
                prefill: {
                    name: user?.first_name + user?.last_name,
                    email: user?.email,
                    contact: user?.mobile_no,
                },
                method: {
                    netbanking: true,
                    card: true,
                    upi: true,
                    wallet: true,
                    emi: true,
                    paylater: true,
                },
                theme: {
                    color: "#3399cc",
                },
            };


            const razorpay = new window.Razorpay(options);
            razorpay.open();

        } catch (error) {
            toast.error(error.data?.message || "Payment Faild", {
                autoClose: 1000,
            });
            console.error("Payment Error:", error);
        }
    };

    return (
        <>

            <div className=" rounded-[10px] overflow-hidden bg-white shadow-[0px_4px_10px_0px_#00000026]">
                <div className="">
                    <img onClick={() => {
                        navigate(`/${categoryName}/${subcategoryName}/${themename}`, {
                            state: { theme_id: theme_id }
                        })
                    }} src={import.meta.env.VITE_API_BASE_URL + image} className="w-full cursor-pointer object-cover h-[232px]" alt={image} title={image} />
                </div>
                <div className="p-[13px_11px_16px_17px] ">
                    <div className="flex items-center w-full">
                        {/* ✅ Title with dynamic width minus icon */}
                        <h4 onClick={() => {
                            navigate(`/${categoryName}/${subcategoryName}/${themename}`, {
                                state: { theme_id: theme_id }
                            })
                        }}
                            className="text-sm cursor-pointer inline overflow-hidden whitespace-nowrap text-ellipsis"
                            style={{ width: 'calc(100% - 24px)' }} // 24px space for the icon
                        >

                            {name}
                        </h4>

                        {is_free == true ? (
                            ""
                        ) : (


                            <div className="w-[24px] flex-shrink-0 ml-1 cursor-pointer" onClick={() => {
                                if (!liked) {

                                    handleaddwhishlist()
                                } else {

                                    handledeletwhishlist()
                                }
                                setLiked(!liked)
                            }}>
                                {liked ? (
                                    // ✅ Filled Heart
                                    <svg xmlns="http://www.w3.org/2000/svg" className="cursor-pointer" width="15" height="14" viewBox="0 0 15 14" fill="#FF3B3B">
                                        <path d="M10.4998 0C9.39113 0 8.32106 0.406769 7.49963 1.15133C6.67821 0.406769 5.60814 0 4.4995 0C3.62174 0 2.76318 0.256999 2.02954 0.738901C1.29589 1.2208 0.719194 1.90673 0.370448 2.71224C0.0217017 3.51774 -0.0838665 4.40765 0.0667419 5.27239C0.21735 6.13714 0.61756 6.93896 1.21809 7.57913L7.23712 13.3956C7.30757 13.4636 7.40178 13.5012 7.49963 13.5007C7.59619 13.5003 7.68888 13.4627 7.7584 13.3956L13.7924 7.56788C14.3899 6.92657 14.7871 6.12473 14.9353 5.26083C15.0834 4.39693 14.976 3.50857 14.6263 2.70484C14.2767 1.90111 13.6999 1.21699 12.9668 0.736487C12.2337 0.255987 11.3763 0 10.4998 0Z" />
                                    </svg>
                                ) : (
                                    // 🤍 Outline Heart
                                    <svg xmlns="http://www.w3.org/2000/svg" className="cursor-pointer" width="15" height="14" viewBox="0 0 15 14" fill="none">
                                        <path d="M10.4998 2.74759e-05C9.39113 -0.00386889 8.32106 0.406769 7.49963 1.15133C6.67821 0.406769 5.60814 -0.00386889 4.4995 2.74759e-05C3.62174 0.000167056 2.76318 0.256999 2.02954 0.738901C1.29589 1.2208 0.719194 1.90673 0.370448 2.71224C0.0217017 3.51774 -0.0838665 4.40765 0.0667419 5.27239C0.21735 6.13714 0.61756 6.93896 1.21809 7.57913L7.23712 13.3956C7.30757 13.4636 7.40178 13.5012 7.49963 13.5007C7.59619 13.5003 7.68888 13.4627 7.7584 13.3956L13.7924 7.56788C14.3899 6.92657 14.7871 6.12473 14.9353 5.26083C15.0834 4.39693 14.976 3.50857 14.6263 2.70484C14.2767 1.90111 13.6999 1.21699 12.9668 0.736487C12.2337 0.255987 11.3763 2.41482e-05 10.4998 2.74759e-05ZM13.2599 7.04285L7.49963 12.6044L1.75437 7.0541C1.11724 6.32159 0.78901 5.37053 0.838715 4.40097C0.88842 3.43141 1.31219 2.51891 2.02088 1.85539C2.72958 1.19186 3.66798 0.829031 4.63871 0.843201C5.60944 0.857371 6.53684 1.24744 7.22587 1.93137C7.26095 1.96884 7.30335 1.9987 7.35044 2.01912C7.39753 2.03954 7.44831 2.05008 7.49963 2.05008C7.55096 2.05008 7.60174 2.03954 7.64883 2.01912C7.69592 1.9987 7.73832 1.96884 7.7734 1.93137C8.122 1.55734 8.54411 1.25936 9.01326 1.05608C9.4824 0.852803 9.98848 0.748621 10.4998 0.750062C11.2289 0.749378 11.9424 0.961257 12.553 1.35977C13.1636 1.75829 13.6448 2.32615 13.9376 2.99387C14.2305 3.6616 14.3224 4.40021 14.202 5.11934C14.0816 5.83846 13.7543 6.5069 13.2599 7.04285Z" fill="#797979" />
                                    </svg>
                                )}

                            </div>
                        )}

                        {/* ✅ Icon stays fixed at right */}
                    </div>
                    <div className="py-[11px] pb-[16px] border-b border-[#D8D8D8] flex justify-between items-center">
                        <div className="flex items-center gap-[6px]">
                            <div>
                                <img src={categoryImages[categoryName?.toLowerCase()]} className="w-[19px] object-contain h-[19px]" alt="" />

                            </div>
                            <div>
                                <h6 className="text-[12px] text-[#302F2F]">{cate?.data?.find((val) => val.category_id == category)?.name}</h6>
                            </div>
                        </div>
                        <div>
                            <button className="h-[26px] py-0 px-[8px] font-normal bg-transparent shadow-[2.47px_2.47px_1.24px_0px_#00000040] rounded-[2px] text-[15px] pop  text-[#464646] border border-[#B4B2B2]">
                                {is_free == true ? (
                                    "Free"
                                ) : (

                                    `$${discount_price}`
                                )}

                            </button>
                        </div>
                    </div>
                    <div className="flex mt-[10px] mb-[15px] items-center justify-between">
                        <div className="flex items-center gap-[10px]">
                            <div><svg xmlns="http://www.w3.org/2000/svg" width="19" height="19" viewBox="0 0 19 19" fill="none">
                                <path d="M9.5 1L12.1265 6.321L18 7.1795L13.75 11.319L14.753 17.167L9.5 14.4045L4.247 17.167L5.25 11.319L1 7.1795L6.8735 6.321L9.5 1Z" stroke="#FE9C28" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
                            </svg></div>
                            <span className="text-[12px] text-[#302F2F]" >{rating}</span>
                        </div>
                        <div className="flex items-center gap-[10px]">
                            <div><svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 14 14" fill="none">
                                <path d="M11.3242 8.75H5.83917C5.52228 8.74973 5.21411 8.64617 4.96137 8.45502C4.70863 8.26386 4.5251 7.99552 4.43858 7.69067L2.58417 1.218C2.53226 1.03523 2.42216 0.874382 2.27056 0.759846C2.11897 0.64531 1.93416 0.583339 1.74417 0.583333H0.291667C0.214312 0.583333 0.140125 0.552604 0.0854272 0.497906C0.0307291 0.443208 0 0.369022 0 0.291667C0 0.214312 0.0307291 0.140125 0.0854272 0.0854272C0.140125 0.0307291 0.214312 0 0.291667 0H1.74417C2.39458 0 2.97092 0.43575 3.14475 1.05933L3.5105 2.33333H13.1244C13.4038 2.33333 13.6599 2.46167 13.8262 2.68567C13.993 2.90967 14.0426 3.192 13.9621 3.45917L12.7073 7.74667C12.6119 8.03832 12.4268 8.29237 12.1784 8.47255C11.9301 8.65273 11.6311 8.74984 11.3242 8.75ZM3.67733 2.91667L4.99975 7.532C5.10417 7.9065 5.44892 8.16667 5.83917 8.16667H11.3242C11.5064 8.16527 11.6837 8.1074 11.8316 8.00105C11.9796 7.8947 12.0909 7.74509 12.1502 7.57283L13.4038 3.29233C13.4171 3.24881 13.4198 3.20277 13.4119 3.15798C13.404 3.11318 13.3857 3.07087 13.3583 3.0345C13.3315 2.99771 13.2963 2.96783 13.2556 2.94734C13.2149 2.92685 13.17 2.91634 13.1244 2.91667H3.67733ZM6.41667 11.6667C5.77325 11.6667 5.25 11.1434 5.25 10.5C5.25 9.85658 5.77325 9.33333 6.41667 9.33333C7.06008 9.33333 7.58333 9.85658 7.58333 10.5C7.58333 11.1434 7.06008 11.6667 6.41667 11.6667ZM6.41667 9.91667C6.26647 9.92339 6.12465 9.98778 6.02074 10.0964C5.91684 10.2051 5.85884 10.3497 5.85884 10.5C5.85884 10.6503 5.91684 10.7949 6.02074 10.9036C6.12465 11.0122 6.26647 11.0766 6.41667 11.0833C6.56686 11.0766 6.70868 11.0122 6.81259 10.9036C6.9165 10.7949 6.97449 10.6503 6.97449 10.5C6.97449 10.3497 6.9165 10.2051 6.81259 10.0964C6.70868 9.98778 6.56686 9.92339 6.41667 9.91667ZM10.5 11.6667C9.85658 11.6667 9.33333 11.1434 9.33333 10.5C9.33333 9.85658 9.85658 9.33333 10.5 9.33333C11.1434 9.33333 11.6667 9.85658 11.6667 10.5C11.6667 11.1434 11.1434 11.6667 10.5 11.6667ZM10.5 9.91667C10.3498 9.92339 10.208 9.98778 10.1041 10.0964C10.0002 10.2051 9.94218 10.3497 9.94218 10.5C9.94218 10.6503 10.0002 10.7949 10.1041 10.9036C10.208 11.0122 10.3498 11.0766 10.5 11.0833C10.6502 11.0766 10.792 11.0122 10.8959 10.9036C10.9998 10.7949 11.0578 10.6503 11.0578 10.5C11.0578 10.3497 10.9998 10.2051 10.8959 10.0964C10.792 9.98778 10.6502 9.92339 10.5 9.91667Z" fill="#797979" />
                            </svg></div>
                            <span className="text-[12px] text-[#302F2F]" >{sales_count} <span className="text-[#797979]">Sales</span></span>
                        </div>
                    </div>

                    <button onClick={() => window.open(demo_url, "_blank")} className="h-[30px] cursor-pointer hover:border-[#538DF8] w-full py-0 text-sm font-[600] inter border border-[#538DF8] rounded-[3px] bg-transparent transition-all duration-150 hover:text-white hover:bg-[#538DF8] text-[#538DF8]">Live Demo</button>
                    {is_free == true ? (
                        <button
                            onClick={() => {
                                if (!localStorage.getItem("aithemetoken")) {
                                    navigate("/login");
                                    return;
                                }

                                // trigger file download
                                const link = document.createElement("a");
                                link.href = `${import.meta.env.VITE_API_BASE_URL}${theme_file}`;
                                link.setAttribute("download", "theme.zip");
                                document.body.appendChild(link);
                                link.click();
                                document.body.removeChild(link);
                            }}
                            className="h-[30px] flex items-center justify-center shadow-[0px_1px_0px_0px_#6F9A36] cursor-pointer mt-[10px] hover:border-[#82B440] pop w-full py-0 text-sm font-[500] inter border border-[#82B440] rounded-[3px] bg-[#82B440] transition-all duration-150 text-white"
                        >
                            Free download
                        </button>

                    ) : (
                        <button onClick={() => handlesubmit()} className="h-[30px] shadow-[0px_1px_0px_0px_#6F9A36] cursor-pointer  mt-[10px] hover:border-[#82B440] pop w-full py-0 text-sm font-[500] inter border border-[#82B440] rounded-[3px] bg-[#82B440] transition-all duration-150   text-white">Buy Now</button>
                    )}

                </div>
            </div>
        </>
    );
}

export default HomePage;
