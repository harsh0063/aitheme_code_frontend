import React, { useState } from 'react';
import Header from '../component/header'
import Footer from '../component/footer'
import { useAddOrderMutation, useAddWishlistMutation, useDeleteCartMutation, useGetCartQuery, useGetUserQuery } from '../service/apislice';
import { toast } from 'react-toastify';


const Cart = () => {
    const [id_modal, setid_modal] = useState('')
    const [modal, setModal] = useState(null);
    const openModal = (modalId) => setModal(modalId);
    const closeModal = () => setModal(null);

    const { data: cart } = useGetCartQuery()
    const [addorder] = useAddOrderMutation()
    const handlesubmit = async () => {
        try {
            // 1. Prepare formData
            const formData = new FormData();
            formData.append("is_cart", true);

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

                },
                prefill: {
                    name: "John Doe",
                    email: "john@example.com",
                    contact: "9876543210",
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
             toast.error(error.data?.message || "Failed to Delete Cart", {
                autoClose: 1000,
            });
            console.error("Payment Error:", error);
        }
    };
    const [Deletecart] = useDeleteCartMutation()

    const deletecart = async () => {
        try {
            let formData = new FormData();


            formData.append("cart_id", id_modal);
            await Deletecart(formData).unwrap();
            toast.success("Cart Delete successfully!", {
                autoClose: 1000,
            });
            closeModal();
            setModal('')
        } catch (error) {
            toast.error(error.data?.message || "Failed to Delete Cart", {
                autoClose: 1000,
            });
        }
    };

    const { data: profile } = useGetUserQuery()


    const coursesData = [
        {
            id: 1,
            title: "Create Compelling Content Product Course🚀",
            author: "By Online Training Plus and 2 Other",
            hours: "24 total hours",
            lectures: "32 lectures",
            level: "Beginner",
            originalPrice: 55.99,
            price: 32.99,
            image: "https://srv733641.hstgr.cloud:3443/media/theme_thumbnails/WeddingTheme_Thumbnail_921x614_45kb_final.jpg",
            note: "Remaining for 10 students",
            checked: false,
        },
        {
            id: 2,
            title: "Real Estate Mastery: From Basics to Investment Strategy",
            author: "By Online Training Plus and 4 Other",
            hours: "4 total hours",
            lectures: "20 lectures",
            level: "Beginner",
            originalPrice: 0,
            price: 40.99,
            image: "https://srv733641.hstgr.cloud:3443/media/theme_thumbnails/WeddingTheme_Thumbnail_921x614_45kb_final.jpg",
            checked: true,
        },
    ];

    const [addWishlist] = useAddWishlistMutation()



    return (
        <>

            <Header />
            {/* <section className="mt-[70px]">
                <div className="container">
                    <div className="flex max-lg:flex-wrap max-lg:flex-col gap-[30px]">
                        <div className="w-[60%] max-lg:w-full">
                            <div className="border rounded-[12px] overflow-hidden border-[#DCDCDC]">
                                <div className="p-[20px] border-b text-xl font-[600] border-[#DCDCDC]">
                                    Payment
                                </div>
                                <div className=" py-[40px]  px-[20px] border-b border-dashed border-[#eee]">
                                    <h3 className="text-xl font-[600]  pb-[15px]">Personal Details</h3>
                                    <div className="flex flex-col gap-[20px] ">
                                        <div className="">
                                            <label className="text-[#0C0C0C] block text-sm mb-[10px]">
                                                Email address *
                                            </label>
                                            <input
                                                disabled
                                                className="px-[20px] text-sm text-[#777575] w-full py-[11px] border border-[#E3E3E3] rounded-[12px]"
                                                type="text"
                                                defaultValue="abc@gmail.com"
                                                value={profile?.data?.email || ''}
                                            />
                                        </div>
                                        <div className="grid grid-cols-2 gap-[20px]">
                                            <div className="">
                                                <label className="text-[#0C0C0C] block text-sm mb-[10px]">
                                                    First name *
                                                </label>
                                                <input
                                                    disabled
                                                    className="px-[20px] text-sm text-[#777575] w-full py-[11px] border border-[#E3E3E3] rounded-[12px]"
                                                    type="text"
                                                    defaultValue="abc"
                                                    value={profile?.data?.first_name || ''}
                                                />
                                            </div>
                                            <div className="">
                                                <label className="text-[#0C0C0C] block text-sm mb-[10px]">
                                                    Last name
                                                </label>
                                                <input
                                                    disabled
                                                    className="px-[20px] text-sm text-[#777575] w-full py-[11px] border border-[#E3E3E3] rounded-[12px]"
                                                    type="text"
                                                    defaultValue="def"
                                                    value={profile?.data?.last_name || ''}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="bg-[#a6f0eb] p-[20px]">
                                    <div className="flex flex-wrap justify-between  items-center">
                                        <h3 className=" text-xl">
                                            Total: <span className=" font-bold">${Number(cart?.total_price_sum || 0).toFixed(2)}
</span>
                                        </h3>
                                        <button onClick={handlesubmit} className="flex items-center bg-[#0E145A] text-white px-10 rounded-[100px] py-3  gap-[15px] font-[500] text-lg">
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                width={24}
                                                height={25}
                                                viewBox="0 0 24 25"
                                                fill="none"
                                            >
                                                <g clipPath="url(#clip0_5991_59408)">
                                                    <path
                                                        d="M20.164 13.4121H5.419L4.478 5.41211H12V3.41211H4.242L4.2 3.06011C4.11382 2.33071 3.76306 1.65826 3.21419 1.17021C2.66532 0.682164 1.95647 0.412422 1.222 0.412109L0 0.412109V2.41211H1.222C1.46693 2.41214 1.70334 2.50207 1.88637 2.66482C2.06941 2.82758 2.18634 3.05186 2.215 3.29511L3.8 16.7631C3.88595 17.4927 4.23662 18.1654 4.78551 18.6536C5.3344 19.1419 6.04337 19.4118 6.778 19.4121H20V17.4121H6.778C6.53291 17.412 6.29638 17.322 6.11333 17.159C5.93027 16.9961 5.81343 16.7715 5.785 16.5281L5.654 15.4121H21.836L22.736 10.4121H20.705L20.164 13.4121Z"
                                                        fill="white"
                                                    />
                                                    <path
                                                        d="M7 24.4121C8.10456 24.4121 8.99999 23.5167 8.99999 22.4121C8.99999 21.3075 8.10456 20.4121 7 20.4121C5.89543 20.4121 5 21.3075 5 22.4121C5 23.5167 5.89543 24.4121 7 24.4121Z"
                                                        fill="white"
                                                    />
                                                    <path
                                                        d="M17 24.4121C18.1046 24.4121 19 23.5167 19 22.4121C19 21.3075 18.1046 20.4121 17 20.4121C15.8954 20.4121 15 21.3075 15 22.4121C15 23.5167 15.8954 24.4121 17 24.4121Z"
                                                        fill="white"
                                                    />
                                                    <path
                                                        d="M17.0768 8.95456H17.1098C17.3578 8.95538 17.6036 8.90692 17.8328 8.81199C18.0619 8.71706 18.27 8.57755 18.4448 8.40156L23.7058 3.14056L22.2918 1.72656L17.1108 6.91256L14.8668 4.57256L13.4258 5.95856L15.7318 8.35856C15.9041 8.54359 16.1121 8.69179 16.3433 8.79422C16.5744 8.89666 16.824 8.9512 17.0768 8.95456Z"
                                                        fill="white"
                                                    />
                                                </g>
                                                <defs>
                                                    <clipPath id="clip0_5991_59408">
                                                        <rect
                                                            width={24}
                                                            height={24}
                                                            fill="white"
                                                            transform="translate(0 0.412109)"
                                                        />
                                                    </clipPath>
                                                </defs>
                                            </svg>{" "}
                                            PURCHASE
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="w-[40%] max-lg:w-full">
                            <div className="border rounded-[12px] overflow-hidden border-[#DCDCDC]">
                                <div className="p-[20px] border-b text-xl font-[600] border-[#DCDCDC]">
                                    Order
                                </div>
                                <div className=" py-[20px]  px-[20px] border-b border-dashed border-[#eee]">
                                    <div className="flex flex-col gap-[20px]" >
                                        {cart?.data?.map((val, index) => (


                                            <div key={index} className='flex justify-between'>
                                                <div className='flex'>
                                                    <div className='max-w-[120px]  object-cover'>
                                                        <img src={`${val.theme_thumbnail}`} className='border-[#DCDCDC] border rounded-[5px]' alt="" />
                                                    </div>
                                                    <div className='ps-3'>
                                                        <p className='text-md'>{val.theme_name}</p>
                                                        <button className='border border-[#5B84FA] rounded-[8px] my-3 block text-[#5B84FA] text-[12px] h-[28px] flex items-center px-[20px]'>
                                                            Single Use License
                                                        </button> 
                                                        <span className='text-lg font-bold'>${val.theme_price}</span>
                                                    </div>
                                                </div>
                                                <div>
                                                    <svg xmlns="http://www.w3.org/2000/svg" className='cursor-pointer' onClick={() => {
                                                        openModal('modal3')
                                                        setid_modal(val.cart_id)
                                                    }} width="18" height="19" viewBox="0 0 18 19" fill="none">
                                                        <path d="M13.5 4.91211L4.5 13.9121" stroke="#777575" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                                        <path d="M4.5 4.91211L13.5 13.9121" stroke="#777575" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                                    </svg>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                    <div className=" my-[20px]">
                                        <p className="text-end text-lg my-2">
                                            Tax:{" "}
                                            <span className="ps-2 font-[500] text-[#696969]">$10.68</span>
                                        </p> 
                                        <p className="text-end text-lg my-2">
                                            Total: <span className="ps-2 font-[700] text-[#0E145A]">${Number(cart?.total_price_sum || 0).toFixed(2)}
</span>
                                        </p>
                                    </div>
                                </div>
                                <div className="p-[20px] bg-[#a6f0eb3d] flex items-center">
                                    <input
                                        className="w-full px-[20px] bg-white text-sm text-[#777575]  py-[11px] border border-[#E3E3E3] rounded-[12px]"
                                        id="edd-discount"
                                        placeholder="Enter discount"
                                        type="text"
                                        name="edd-discount"
                                    />
                                    <div className="ms-3">
                                        <button className="flex items-center bg-[#0E145A] text-white px-6 tracking-wider rounded-[100px] py-1  gap-[15px] font-[500] text-lg">
                                            APPLY
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section> */}

            <section className=' bg-[#f1f1f12d] shadow-[0_2px_10px_rgba(0,0,0,0.1)_inset] border-b-[1px] border-[#f3f3f3]'>
                <div className='container mx-auto py-[50px]'>
                    <div className='flex gap-3'>

                        <div className="flex cursor-pointer  gap-4" onClick={() => window.history.back()}>

                            <svg xmlns="http://www.w3.org/2000/svg" width={30} height={30} viewBox="0 0 25 25"><title>Artboard-35</title><g id="Left-2" data-name="Left"><polygon points="24 12.001 2.914 12.001 8.208 6.706 7.501 5.999 1 12.501 7.5 19.001 8.207 18.294 2.914 13.001 24 13.001 24 12.001" style={{ fill: "#000" }}
                            /></g></svg>
                        </div>
                        <div>

                            <div className="text-[28px] leading-[30px] max-sm:text-[26px] font-semibold mb-2">Shopping Cart</div>
                            <div className="text-sm max-sm:text-[12px] font-medium text-gray-500"><span className='text-[#b8b8b8]'>Home /</span>  Shopping Cart</div>
                        </div>
                    </div>
                </div>
            </section>

            <section>
                <div className='container mx-auto'>
                    <div className="">

                        <div className="flex flex-col lg:flex-row gap-6">
                            {/* Left Side - Cart Items */}
                            <div className="flex-1 max-lg:order-2 pt-10 max-lg:pt-0 space-y-4">
                                {/* <div className="flex items-center gap-2">
                                    <input type="checkbox" />
                                    <span className="text-sm text-gray-700">Select all</span>
                                </div> */}

                                {cart?.data?.map((val, index) => (
                                    <div
                                        key={index}
                                        className="flex flex-col sm:flex-row bg-white p-4 max-sm:p-0 my-4 border-b border-[#e5e5e5] shadow-[0_4px_14px_-4px_rgba(0,0,0,0.2)] rounded-md"
                                    >
                                        {/* Thumbnail Image */}
                                        <img
                                            src={val.theme_thumbnail}
                                            alt={val.title}
                                            className="w-full sm:w-[150px] h-[180px] sm:h-[100px] object-cover border border-[#e5e5e5] cursor-pointer rounded-md"
                                            onClick={() => {
                                                window.open(val.theme_demo_url, "_blank");
                                            }}
                                        />

                                        {/* Theme Name */}
                                        <div className="sm:ml-4 max-sm:px-3 mt-4 sm:mt-0 flex-grow">
                                            <div
                                                className="font-medium max-sm:text-[14px] pop text-[18px] text-gray-800 cursor-pointer"
                                                onClick={() => {
                                                    window.open(val.theme_demo_url, "_blank");
                                                }}
                                            >
                                                {val.theme_name?.length > 60
                                                    ? val.theme_name?.slice(0, 57) + "..."
                                                    : val.theme_name}
                                            </div>
                                        </div>

                                        {/* Price and Actions */}
                                        <div className="flex max-sm:px-3 max-sm:mt-2 max-sm:pb-3 flex-col justify-between sm:items-end mt-4 sm:mt-0 sm:ml-auto">
                                            <span className="text-lg max-sm:text-[16px] font-semibold text-[#6b7280] sm:text-right">
                                                ${val.theme_price}
                                            </span>
                                            <div className="flex justify-start sm:justify-end mt-2 gap-2 text-xs">
                                                {/* Wishlist button if needed */}
                                                {/* <button className="border px-2 text-gray py-1 rounded border-[#e5e5e5]">
          Move to Wishlist
        </button> */}
                                                <button
                                                    onClick={() => {
                                                        openModal("modal3");
                                                        setid_modal(val.cart_id);
                                                    }}
                                                    className="border px-2 hover:bg-red-500 transition-all duration-200 hover:border-red-500 hover:text-white text-gray py-1 rounded border-[#e5e5e5]"
                                                >
                                                    Remove
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                ))}

                            </div>

                            {/* Right Side - Summary */}
                            <div className=' max-lg:order-1'>
                                <div className="w-full lg:w-[25rem] max-lg:mt-[30px] -mt-[50px] shadow-[0_4px_14px_-4px_rgba(0,0,0,0.2)] bg-white border border-[#e5e5e5] rounded-md p-5">

                                    <div className="text-lg pop text-center font-medium text-[#979797] mb-4">
                                        Subtotal:
                                    </div>

                                    <h2 className='text-center  text-[35px] inter font-bold'>${Number(cart?.total_price_sum || 0).toFixed(2)}</h2>


                                    <button onClick={handlesubmit} className="w-full mt-[20px] bg-black font-medium text-white py-2 rounded ">
                                        Checkout Now
                                    </button>

                                    {/* <div className="mt-6">
                                    <div className="text-sm font-semibold mb-1">Promotions</div>
                                    <div className="text-xs text-green-600 mb-1">
                                        ✅ Coupon code applied "{coupon}"
                                    </div>
                                    <div className="flex gap-2">
                                        <input
                                            className="border p-2 text-sm rounded w-full"
                                            value={coupon}
                                            onChange={(e) => setCoupon(e.target.value)}
                                        />
                                        <button className="bg-gray-800 text-white text-sm px-4 py-2 rounded">
                                            Apply
                                        </button>
                                    </div>
                                </div> */}

                                    {/* <div className="mt-6 bg-gray-100 p-3 rounded text-xs text-gray-700">
                                        Buy now, pay later for order of <strong>$52.50</strong> and over with
                                        <strong> leterpay</strong>.
                                    </div> */}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {
                modal === 'modal3' && (
                    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-[99999]">

                        <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
                            <div className="flex min-h-full items-center justify-center p-4 text-center sm:items-center sm:p-0">
                                <div className="relative transform overflow-hidden p-[30px] border-t-[8px] border-[#F44336] rounded-[6px] bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-xl z-40">
                                    <div className="bg-white ">
                                        <div className="flex items-center justify-between">
                                            <h3 className="text-xl font-medium text-gray">Delete</h3>
                                            <div onClick={closeModal}>
                                                <svg className="closeModal cursor-pointer" xmlns="http://www.w3.org/2000/svg" width="16" height="15" viewBox="0 0 16 15" fill="none">
                                                    <path fillRule="evenodd" clipRule="evenodd" d="M1.15128 0.751862C1.61991 0.283233 2.3797 0.283233 2.84833 0.751862L7.9998 5.90333L13.1513 0.751862C13.6199 0.283233 14.3797 0.283233 14.8483 0.751862C15.317 1.22049 15.317 1.98029 14.8483 2.44892L9.69686 7.60039L14.8483 12.7519C15.317 13.2205 15.317 13.9803 14.8483 14.4489C14.3797 14.9175 13.6199 14.9175 13.1513 14.4489L7.9998 9.29745L2.84833 14.4489C2.3797 14.9175 1.61991 14.9175 1.15128 14.4489C0.682647 13.9803 0.682647 13.2205 1.15128 12.7519L6.30275 7.60039L1.15128 2.44892C0.682647 1.98029 0.682647 1.22049 1.15128 0.751862Z" fill="#495567" />
                                                </svg>
                                            </div>
                                        </div>
                                        <p className="pt-[14px] text-[#8492A6]">Are you sure you want to delete this cart ?</p>


                                    </div>
                                    <div className="  pt-[30px] flex flex-row-reverse gap-3 ">
                                        <button type="button" onClick={deletecart} className="inline-flex h-[35px] sm:h-[40px]  w-[114px] shadow-[0px_8px_20px_1px_#F443364D] rounded-md bg-[#F44336] items-center   justify-center py-2 text-sm font-semibold text-white shadow-xs  sm:ml-3 ">Delete</button>
                                        <button type="button" className=" bg-[#F4F1FC] h-[35px] sm:h-[40px] w-[114px] closeModal   rounded-md border-0   inline-flex justify-center items-center  py-2 text-sm font-semibold  shadow-xs   sm:mt-0 " onClick={closeModal} >Cancel</button>
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
};

export default Cart;
