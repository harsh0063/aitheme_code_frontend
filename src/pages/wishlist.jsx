import React from 'react';
import Header from '../component/header'
import Footer from '../component/footer'
import { useAddCartMutation, useDeleteWishlistMutation, useGetWhishlistQuery } from '../service/apislice';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import group from '../assets/Group 1000005838.svg'
const ShopWishlist = () => {

    const { data: whishlist } = useGetWhishlistQuery()

    const [deletewhishlist] = useDeleteWishlistMutation()
    const handledeletwhishlist = async (id) => {
        try {



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
    const navigate = useNavigate()
    const [add_cart] = useAddCartMutation()
    const handlecart = async (theme_id) => {
        try {

            const formdata = new FormData()
            formdata.append('theme_id', theme_id)

            await add_cart(formdata).unwrap()
            navigate('/cart')

        } catch (error) {
            toast.error(error?.message || error?.data?.message || 'failed to add to cart', {
                autoClose: 1000,
            });
        }
    }

    return (
        <>
            <Header />

            {whishlist?.total_items > 0 ? (
                <section className="mt-[50px]">
                    <div className="container">
                        <div className=" max-md:overflow-x-auto ">
                            <table className="  max-md:min-w-[540px] w-full">
                                <thead>
                                    <tr className="border-b border-[#D1D5DB]">
                                        <th className="max-sm:text-sm min-w-[300px] text-left ps-[30px]">Product</th>
                                        <th className="max-sm:text-sm text-center">Price</th>
                                        <th></th>
                                        <th className="max-sm:text-sm text-center">Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {whishlist?.data?.map((val) => (
                                        <tr key={val.theme_id} className="border-b border-[#D1D5DB]">
                                            {/* Remove button */}

                                            {/* Product image and name */}
                                            <td className="py-[20px] min-w-[300px]">
                                                <div className="flex items-center ">
                                                    <img
                                                        src={val.theme_thumbnail}
                                                        alt={val.theme_name}
                                                        className="w-[90px] h-[80px] object-contain mr-4 mb-2 sm:mb-0"
                                                    />
                                                    <span className="text-[16px] max-sm:text-[14px] max-sm:block max-md:min-w-[180px] font-medium text-[#000] break-words">
                                                        {val.theme_name?.toUpperCase() || "-"}
                                                    </span>
                                                </div>
                                            </td>


                                            {/* Price */}
                                            <td className="text-center">
                                                <span className="text-[16px] max-sm:text-sm text-nowrap font-[500] text-[#24262B]">
                                                    {val.theme_price ? `$${val.theme_price}` : "$0.00"}
                                                </span>
                                            </td>




                                            {/* Add to Cart */}
                                            <td className="text-center">
                                                <button
                                                    onClick={() => handlecart(val.theme_id)}
                                                    className="border text-nowrap max-sm:px-[20px] max-sm:py-[8px] max-sm:text-[12px] border-[#000] px-[25px] py-[10px] text-[14px] text-[#000] hover:bg-black hover:text-white transition rounded"
                                                >
                                                    ADD TO CART
                                                </button>
                                            </td>
                                            <td className="text-center  px-2">
                                                <div className='flex items-center justify-center gap-2'>
                                                    <button
                                                        onClick={() => handledeletwhishlist(val.wishlist_id)}
                                                        className="w-[36px] hovee h-[36px] flex items-center justify-center rounded-full transition-all duration-200 hover:bg-red-500 group"
                                                    >
                                                        <svg
                                                            xmlns="http://www.w3.org/2000/svg"
                                                            version="1.1"
                                                            xmlnsXlink="http://www.w3.org/1999/xlink"
                                                            x="0"
                                                            y="0"
                                                            viewBox="0 0 512 512"
                                                            xmlSpace="preserve"
                                                            className="w-5 h-5 text-black transition-all  group-hover:text-white group-hover:fill-white"
                                                        >
                                                            <g>
                                                                <path
                                                                    d="M436 60h-75V45c0-24.813-20.187-45-45-45H196c-24.813 0-45 20.187-45 45v15H76c-24.813 0-45 20.187-45 45 0 19.928 13.025 36.861 31.005 42.761L88.76 470.736C90.687 493.875 110.385 512 133.604 512h244.792c23.22 0 42.918-18.125 44.846-41.271l26.753-322.969C467.975 141.861 481 124.928 481 105c0-24.813-20.187-45-45-45zM181 45c0-8.271 6.729-15 15-15h120c8.271 0 15 6.729 15 15v15H181V45zm212.344 423.246c-.643 7.712-7.208 13.754-14.948 13.754H133.604c-7.739 0-14.305-6.042-14.946-13.747L92.294 150h327.412l-26.362 318.246zM436 120H76c-8.271 0-15-6.729-15-15s6.729-15 15-15h360c8.271 0 15 6.729 15 15s-6.729 15-15 15z"
                                                                    fill="currentColor"
                                                                ></path>
                                                                <path
                                                                    d="m195.971 436.071-15-242c-.513-8.269-7.67-14.558-15.899-14.043-8.269.513-14.556 7.631-14.044 15.899l15 242.001c.493 7.953 7.097 14.072 14.957 14.072 8.687 0 15.519-7.316 14.986-15.929zM256 180c-8.284 0-15 6.716-15 15v242c0 8.284 6.716 15 15 15s15-6.716 15-15V195c0-8.284-6.716-15-15-15zM346.927 180.029c-8.25-.513-15.387 5.774-15.899 14.043l-15 242c-.511 8.268 5.776 15.386 14.044 15.899 8.273.512 15.387-5.778 15.899-14.043l15-242c.512-8.269-5.775-15.387-14.044-15.899z"
                                                                    fill="currentColor"
                                                                ></path>
                                                            </g>
                                                        </svg>
                                                    </button>
                                                </div>
                                            </td>

                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </section>

            ) : (
                <section>
                    <div className='container'>
                        <div className='flex justify-center mt-[110px] pb-[110px]'>
                            <div>
                                <img src={group} alt="" />

                                <div >
                                    <h3 className='font-[500] text-[46px] max-sm:text-[40px]  leading-[111.1px]'>Uh-oh, your cart is empty!</h3>
                                    <p className='pop max-sm:text-[22px] max-sm:leading-[45px]  text-[25px] leading-[55px] text-[#9F9F9F] mt-[-15px] text-center'>Empty cart  vibes</p>
                                    <p className='pop max-sm:text-[22px] max-sm:leading-[45px]  text-[25px] leading-[55px] text-[#9F9F9F] mt-[-15px] text-center'>Time to bring in the shopping joy!</p>
                                    <div className="relative flex justify-center ">
                                        <button onClick={() => navigate('/theme')} className="flex max-sm:text-[20px] max-sm:py-[8px]  mt-[20px] items-center gap-2 absolute  bg-black text-white font-[400] text-[21px] leading-[24px] px-[28px] py-[10px] rounded-[8px]">
                                            <div>
                                                <svg xmlns="http://www.w3.org/2000/svg" width="29" height="29" className='max-sm:w-[26px]' viewBox="0 0 29 29" fill="none">
                                                    <path d="M9.25088 22.2321C7.57877 22.2321 6.22333 23.5876 6.22333 25.2596C6.22333 26.9317 7.57884 28.2872 9.25088 28.2872C10.923 28.2872 12.2784 26.9317 12.2784 25.2596C12.2785 23.5876 10.923 22.2321 9.25088 22.2321ZM9.25088 26.9416C8.32194 26.9416 7.56892 26.1886 7.56892 25.2597C7.56892 24.3308 8.32194 23.5777 9.25088 23.5777C10.1798 23.5777 10.9328 24.3308 10.9328 25.2597C10.9329 26.1886 10.1798 26.9416 9.25088 26.9416ZM22.034 22.2321C20.3619 22.2321 19.0064 23.5876 19.0064 25.2596C19.0064 26.9317 20.3619 28.2872 22.034 28.2872C23.706 28.2872 25.0615 26.9317 25.0615 25.2596C25.0615 23.5876 23.7061 22.2321 22.034 22.2321ZM22.034 26.9416C21.105 26.9416 20.352 26.1886 20.352 25.2597C20.352 24.3308 21.105 23.5777 22.034 23.5777C22.9629 23.5777 23.7159 24.3308 23.7159 25.2597C23.716 26.1886 22.9629 26.9416 22.034 26.9416ZM28.8628 4.57131C28.7227 4.41829 28.531 4.32244 28.3246 4.30216L6.42519 3.99941L5.81968 2.14921C5.39311 0.91237 4.23489 0.0773811 2.92665 0.0635376H0.672794C0.301209 0.0635376 0 0.364747 0 0.736332C0 1.10792 0.301209 1.40913 0.672794 1.40913H2.92665C3.28382 1.41703 3.63001 1.53409 3.91868 1.74458C4.20734 1.95506 4.42465 2.24888 4.54138 2.58653L8.81361 15.4705L8.47725 16.2442C8.29231 16.7211 8.22332 17.2352 8.27596 17.744C8.32859 18.2528 8.50135 18.7419 8.78 19.1709C9.05584 19.592 9.42923 19.9403 9.86847 20.1863C10.3077 20.4323 10.7998 20.5686 11.303 20.5837H24.3888C24.7604 20.5837 25.0616 20.2825 25.0616 19.9109C25.0616 19.5394 24.7604 19.2381 24.3888 19.2381H11.3029C11.019 19.231 10.7413 19.1535 10.4947 19.0126C10.2481 18.8717 10.0403 18.6718 9.89006 18.4308C9.7411 18.1921 9.64853 17.9227 9.61939 17.6428C9.59025 17.363 9.6253 17.0803 9.72188 16.816L9.99102 16.2105L24.1533 14.7304C25.7089 14.559 26.9886 13.4276 27.3491 11.9046L28.9638 5.14307C28.9996 5.04743 29.009 4.94396 28.9913 4.84342C28.9735 4.74287 28.9292 4.64891 28.8628 4.57131ZM26.0371 11.6019C25.8187 12.5823 24.9864 13.3055 23.9851 13.3849L9.99102 14.8313L6.86252 5.345L27.4836 5.64775L26.0371 11.6019Z" fill="white" />
                                                </svg>
                                            </div>
                                            Shop Now
                                        </button>
                                    </div>
                                </div>




                            </div>
                        </div>
                    </div>

                </section>
            )}


            <Footer />
        </>
    );
};

export default ShopWishlist;
