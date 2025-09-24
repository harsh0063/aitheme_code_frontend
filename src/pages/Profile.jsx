import React, { useEffect, useRef, useState } from 'react';
import Header from '../component/header'
import Footer from '../component/footer'
import { useEditProfileMutation, useGetOrderQuery, useGetUserQuery } from '../service/apislice';
import { toast, ToastContainer } from 'react-toastify';
import { useNavigate } from 'react-router-dom';


const profile = () => {

    const [active, setActive] = useState('oders')

    const [modal, setmodal] = useState("");
    const openModal = (modalId) => {
        setmodal(modalId);
    };

    const closeModal = () => {
        setmodal(null);
    };
    const navigate = useNavigate();

    const logout = () => {
        localStorage.removeItem('aithemetoken');
        toast.success('Logout successfully', {
            autoClose: 1000,
        });


        setTimeout(() => {
            navigate('/');
        }, 1000);

        closeModal();
    };

    useEffect(() => {
        if (active === 'logout') {
            openModal('logout');
            setActive('profile')
        }
    }, [active]);

    const { data: user } = useGetUserQuery()
  

    const [data, setdata] = useState({
        first_name: '',
        last_name: '',
        email: '',
        mobile_no: '',
        address: '',
        profile_picture: '',
    })

    useEffect(() => {
        if (user?.data) {
            setdata({
                first_name: user.data.first_name,
                last_name: user.data.last_name,
                email: user.data.email,
                mobile_no: user.data.mobile_no,
                address: user.data.address,
                profile_picture: user.data.profile_picture,
            })
        }
    }, [user?.data]);
    const profile = user?.data
    const fileInputRef = useRef(null);
    const [selectedImage, setSelectedImage] = useState(null);

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file && file.type.startsWith("image/")) {
            setSelectedImage({
                file,
                preview: URL.createObjectURL(file),
            });
        }
    };

    const [editProfile] = useEditProfileMutation();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const formData = new FormData();
            formData.append("first_name", data.first_name);
            formData.append("last_name", data.last_name);
            formData.append("mobile_no", data.mobile_no);
            formData.append("address", data.address);
            formData.append("email", data.email);
            if (selectedImage?.file) {
                formData.append("profile_image", selectedImage.file); // Blob image
            }
            const response = await editProfile(formData).unwrap();
            toast.success(response?.message, {
                autoClose: 1000,
            });
        } catch (err) {
            const errorMessage =
                err?.data?.message ||       // RTK Query response
                err?.message ||             // JS Error object
                err?.error ||               // RTK Query baseQuery error
                "Something went wrong";

            toast.error(errorMessage, {
                autoClose: 1000,
            });
        }
    };
    const tabs = [
        {
            key: 'profile',
            label: 'Profile',
            icon: (
                <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 1024 1024" className="style_active__QGM86  " height="1em" width="1em" xmlns="http://www.w3.org/2000/svg" className='me-[10px]'><path d="M858.5 763.6a374 374 0 0 0-80.6-119.5 375.63 375.63 0 0 0-119.5-80.6c-.4-.2-.8-.3-1.2-.5C719.5 518 760 444.7 760 362c0-137-111-248-248-248S264 225 264 362c0 82.7 40.5 156 102.8 201.1-.4.2-.8.3-1.2.5-44.8 18.9-85 46-119.5 80.6a375.63 375.63 0 0 0-80.6 119.5A371.7 371.7 0 0 0 136 901.8a8 8 0 0 0 8 8.2h60c4.4 0 7.9-3.5 8-7.8 2-77.2 33-149.5 87.8-204.3 56.7-56.7 132-87.9 212.2-87.9s155.5 31.2 212.2 87.9C779 752.7 810 825 812 902.2c.1 4.4 3.6 7.8 8 7.8h60a8 8 0 0 0 8-8.2c-1-47.8-10.9-94.3-29.5-138.2zM512 534c-45.9 0-89.1-17.9-121.6-50.4S340 407.9 340 362c0-45.9 17.9-89.1 50.4-121.6S466.1 190 512 190s89.1 17.9 121.6 50.4S684 316.1 684 362c0 45.9-17.9 89.1-50.4 121.6S557.9 534 512 534z" ></path></svg>
            ),
        },
        {
            key: 'oders',
            label: 'Orders',
            icon: (
                <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 24 24" className="style_accountingIcon___dmb0" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg" className='me-[10px]'><path fill="none" d="M0 0h24v24H0z"></path><path d="M19 5v14H5V5h14m1.1-2H3.9c-.5 0-.9.4-.9.9v16.2c0 .4.4.9.9.9h16.2c.4 0 .9-.5.9-.9V3.9c0-.5-.5-.9-.9-.9zM11 7h6v2h-6V7zm0 4h6v2h-6v-2zm0 4h6v2h-6zM7 7h2v2H7zm0 4h2v2H7zm0 4h2v2H7z"></path></svg>
            ),
        },

        {
            key: 'Reset',
            label: 'Reset Passsword',
            icon: (
                <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 24 24" className="style_accountingIcon___dmb0" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg" className='me-[10px]'><path fill="none" d="M0 0h24v24H0z"></path><path d="M19 5v14H5V5h14m1.1-2H3.9c-.5 0-.9.4-.9.9v16.2c0 .4.4.9.9.9h16.2c.4 0 .9-.5.9-.9V3.9c0-.5-.5-.9-.9-.9zM11 7h6v2h-6V7zm0 4h6v2h-6v-2zm0 4h6v2h-6zM7 7h2v2H7zm0 4h2v2H7zm0 4h2v2H7z"></path></svg>
            ),
        },
        {
            key: 'logout',
            label: 'Logout',
            icon: (
                <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 24 24" className='me-[10px]' height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
                    <path d="M16 13v-2H7V8l-5 4 5 4v-3h9z"></path>
                    <path d="M20 3H10a1 1 0 0 0 0 2h10v14H10a1 1 0 0 0 0 2h10a2 2 0 0 0 2-2V5a2 2 0 0 0-2-2z"></path>
                </svg>
            ),
        }

    ]
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);



    const { data: order } = useGetOrderQuery({ fetch_all: true })

   

    const [orderitem, setorderitem] = useState('')


    const [activeTab1, setActiveTab1] = useState("orders");

    function formatDate(isoString) {
        const date = new Date(isoString);
        const options = { day: '2-digit', month: 'short', year: 'numeric' };
        return date.toLocaleDateString('en-GB', options); // Example: "16 May 2025"
    }
    return (
        <>
            <ToastContainer />
            <Header />
            <section className='container '>
                <div className='flex gap-[50px] max-md:mt-[50px]  mt-[100px]   my-[auto] max-lg:gap-[20px] max-lg:block' >
                    <div className="w-full lg:w-[20%] max-lg:w-full max-lg:mb-[50px]">
                        <div className="block lg:hidden mb-4">
                            <div className="block lg:hidden mb-4">
                                <button
                                    onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                                    className="w-full border px-4 py-2 rounded-[10px] bg-[#F5F5F5] text-left"
                                >
                                    {tabs.find((tab) => tab.key === active)?.label}

                                </button>

                                {isDropdownOpen && (
                                    <ul className="border mt-2 rounded-[10px] bg-white shadow-md">
                                        {tabs.map((tab) => (
                                            <li
                                                key={tab.key}
                                                className={`px-4 py-2 cursor-pointer hover:bg-gray-100 ${active === tab.key ? 'text-[#D86A37] font-semibold' : ''}`}
                                                onClick={() => {
                                                    if (tab.key === 'Reset') {
                                                        navigate('/Reset_password'); // 👈 redirect if key is "reset"
                                                    } else {
                                                        setmodal(tab.key);
                                                        setActive(tab.key);
                                                        setIsDropdownOpen(false);
                                                    }
                                                }}

                                            >
                                                <div className="flex items-center">
                                                    {tab.icon}
                                                    {tab.label}
                                                </div>
                                            </li>
                                        ))}
                                    </ul>
                                )}
                            </div>
                        </div>
                        <div className="hidden lg:block  mt-[20px] overflow-y-auto ">
                            <ul>
                                <li
                                    onClick={() => setActive('profile')}
                                    className={`flex items-center pb-4 mb-4 border-b border-[#e6e6e6] cursor-pointer font-[600] ${active === 'profile' ? 'text-[#D86A37]' : 'text-#000 '
                                        }`}
                                >
                                    <svg stroke="currentColor"
                                        fill="currentColor"
                                        strokeWidth="0"
                                        viewBox="0 0 1024 1024"
                                        className={`me-[10px]  ${active === 'profile' ? 'fill-[#D86A37]' : 'fill-#000 '} `}
                                        height="1em" width="1em"
                                        xmlns="http://www.w3.org/2000/svg">
                                        <path
                                            d="M858.5 763.6a374 374 0 0 0-80.6-119.5 375.63 375.63 0 0 0-119.5-80.6c-.4-.2-.8-.3-1.2-.5C719.5 518 760 444.7 760 362c0-137-111-248-248-248S264 225 264 362c0 82.7 40.5 156 102.8 201.1-.4.2-.8.3-1.2.5-44.8 18.9-85 46-119.5 80.6a375.63 375.63 0 0 0-80.6 119.5A371.7 371.7 0 0 0 136 901.8a8 8 0 0 0 8 8.2h60c4.4 0 7.9-3.5 8-7.8 2-77.2 33-149.5 87.8-204.3 56.7-56.7 132-87.9 212.2-87.9s155.5 31.2 212.2 87.9C779 752.7 810 825 812 902.2c.1 4.4 3.6 7.8 8 7.8h60a8 8 0 0 0 8-8.2c-1-47.8-10.9-94.3-29.5-138.2zM512 534c-45.9 0-89.1-17.9-121.6-50.4S340 407.9 340 362c0-45.9 17.9-89.1 50.4-121.6S466.1 190 512 190s89.1 17.9 121.6 50.4S684 316.1 684 362c0 45.9-17.9 89.1-50.4 121.6S557.9 534 512 534z"></path></svg>
                                    Profile
                                </li>
                                <li onClick={() => setActive('oders')}
                                    className={`flex items-center pb-4 mb-4 border-b border-[#e6e6e6] cursor-pointer font-[600] ${active === 'oders' ? 'text-[#D86A37]' : 'text-#000 '
                                        }`}
                                >
                                    <svg
                                        stroke="currentColor"
                                        fill="currentColor"
                                        strokeWidth={0}
                                        viewBox="0 0 24 24"
                                        className={`me-[10px] ${active === 'oders' ? 'fill-[#D86A37]' : 'fill-[#5E5873]'
                                            }`}
                                        height="1em"
                                        width="1em"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path fill="none" d="M0 0h24v24H0z" />
                                        <path d="M19 5v14H5V5h14m1.1-2H3.9c-.5 0-.9.4-.9.9v16.2c0 .4.4.9.9.9h16.2c.4 0 .9-.5.9-.9V3.9c0-.5-.5-.9-.9-.9zM11 7h6v2h-6V7zm0 4h6v2h-6v-2zm0 4h6v2h-6zM7 7h2v2H7zm0 4h2v2H7zm0 4h2v2H7z" />
                                    </svg>
                                    Orders
                                </li>
                                <li onClick={() => { setActive('Reset'); navigate('/Reset_password') }}
                                    className={`flex items-center pb-4 mb-4 border-b border-[#e6e6e6] cursor-pointer font-[600] ${active === 'Reset' ? 'text-[#D86A37]' : 'text-#000 '
                                        }`}
                                >
                                    <svg
                                        stroke="currentColor"
                                        fill="currentColor"
                                        strokeWidth={0}
                                        viewBox="0 0 24 24"
                                        className={`me-[10px] ${active === 'Reset' ? 'fill-[#D86A37]' : 'fill-[#5E5873]'
                                            }`}
                                        height="1em"
                                        width="1em"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path fill="none" d="M0 0h24v24H0z" />
                                        <path d="M19 5v14H5V5h14m1.1-2H3.9c-.5 0-.9.4-.9.9v16.2c0 .4.4.9.9.9h16.2c.4 0 .9-.5.9-.9V3.9c0-.5-.5-.9-.9-.9zM11 7h6v2h-6V7zm0 4h6v2h-6v-2zm0 4h6v2h-6zM7 7h2v2H7zm0 4h2v2H7zm0 4h2v2H7z" />
                                    </svg>
                                    Reset Password
                                </li>
                                {/* <li className="flex items-center pb-4 mb-4 border-b border-[#e6e6e6] cursor-pointer "
                                >
                                    <svg
                                        stroke="currentColor"
                                        fill="currentColor"
                                        strokeWidth={0}
                                        viewBox="0 0 24 24"
                                        className="me-[10px]"
                                        height="1em"
                                        width="1em"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path d="M12 13.5a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5Z" />
                                        <path d="M19.071 3.429h.001c3.905 3.905 3.905 10.237 0 14.142l-5.403 5.403a2.36 2.36 0 0 1-3.336 0l-5.375-5.375-.028-.028c-3.905-3.905-3.905-10.237 0-14.142 3.904-3.905 10.236-3.905 14.141 0ZM5.99 4.489v.001a8.5 8.5 0 0 0 0 12.02l.023.024.002.002 5.378 5.378a.859.859 0 0 0 1.214 0l5.403-5.404a8.5 8.5 0 0 0-.043-11.977A8.5 8.5 0 0 0 5.99 4.489Z" />
                                    </svg>
                                    Address
                                </li> */}
                                <li className="flex items-center pb-4 mb-4 border-b border-[#e6e6e6] cursor-pointer "
                                    onClick={() => {
                                        openModal('logout');
                                        setActive('logout')
                                    }}
                                >
                                    <svg
                                        stroke="currentColor"
                                        fill="currentColor"
                                        strokeWidth={0}
                                        viewBox="0 0 24 24"
                                        className="me-[10px]"
                                        height="1em"
                                        width="1em"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path d="M16 13v-2H7V8l-5 4 5 4v-3h9z" />
                                        <path d="M20 3H10a1 1 0 0 0 0 2h10v14H10a1 1 0 0 0 0 2h10a2 2 0 0 0 2-2V5a2 2 0 0 0-2-2z" />
                                    </svg>
                                    Logout
                                </li>
                            </ul>
                        </div>
                    </div>

                    {active === 'profile' && (

                        <div className=" w-[100%] items-center">
                            <form className="border-[1px] border-[#CBD6E2] rounded-[15px] px-[30px] py-[20px]">
                                <div className="space-y-[30px] justify-center ">
                                    <div
                                        className={`w-[140px] h-[140px] flex items-center justify-center relative rounded-full bg-white cursor-pointer ${!selectedImage && profile?.profile_picture == '/media/default.jpg' ? 'border-4 border-[#D86A37]' : ''
                                            }`}
                                        onClick={() => fileInputRef.current.click()} // entire div clickable
                                    >
                                        {selectedImage || profile?.profile_picture != '/media/default.jpg' ? (
                                            <img
                                                src={
                                                    selectedImage?.preview ||
                                                    import.meta.env.VITE_API_BASE_URL + profile?.profile_picture
                                                }
                                                alt="Profile"
                                                className="w-[140px] h-[140px] object-cover rounded-full shadow"
                                            />
                                        ) : (
                                            <>
                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    viewBox="0 0 24 24"
                                                    fill="#D86A37"
                                                    className="w-[100px] h-[100px]"
                                                >
                                                    <path
                                                        fillRule="evenodd"
                                                        d="M12 2a5 5 0 100 10 5 5 0 000-10zm-7 18a7 7 0 0114 0H5z"
                                                        clipRule="evenodd"
                                                    />
                                                </svg>
                                                {/* Show edit icon only when SVG is visible */}
                                                <button
                                                    type="button"
                                                    className="absolute bottom-0 right-0 bg-[#D86A37] text-white rounded-full p-1 text-xs pointer-events-none"
                                                >
                                                    ✎
                                                </button>
                                            </>
                                        )}

                                        <input
                                            type="file"
                                            accept="image/*"
                                            ref={fileInputRef}
                                            onChange={handleImageChange}
                                            className="hidden"
                                        />
                                    </div>
                                    <div className="flex justify-center max-sm:flex-col gap-[25px] max-sm:gap-[35px] max-lg:flex-col max-lg:w-[100%]">
                                        <div className="w-[100%]">
                                            <label className="block mb-2 text-[16px] text-[#4D4C4C] font-medium">
                                                First Name
                                            </label>
                                            <input
                                                className="border-[1px] border-[#CBD6E2] rounded-[15px] w-full bg-[#F5F8FA] h-[55px] max-sm:h-[50px] placeholder:text-[15px] max-lg:placeholder:text-[16px] max-xl:placeholder:text-[17px] placeholder:text-[#4D4C4C] ps-[25px] py-[14px]"
                                                placeholder="First Name..."
                                                type="text"
                                                name="first_name"
                                                value={data?.first_name}
                                                onChange={(e) => setdata({ ...data, first_name: e.target.value })}
                                            />
                                        </div>
                                        <div className="w-[100%]">
                                            <label className="block mb-2 text-[16px] text-[#4D4C4C] font-medium">
                                                Last Name
                                            </label>
                                            <input
                                                className="border-[1px] border-[#CBD6E2] rounded-[15px] w-full bg-[#F5F8FA] h-[55px] max-sm:h-[50px] placeholder:text-[15px] max-lg:placeholder:text-[16px] max-xl:placeholder:text-[17px] placeholder:text-[#4D4C4C] px-[25px] py-[14px]"
                                                placeholder="Last Name..."
                                                type="text"
                                                name="last_name"
                                                value={data?.last_name}
                                                onChange={(e) => setdata({ ...data, last_name: e.target.value })}
                                            />
                                        </div>
                                    </div>
                                    <div className="flex justify-center max-sm:flex-col gap-[25px] max-sm:gap-[35px] max-lg:flex-col max-lg:w-[100%]">
                                        <div className="w-[100%]">
                                            <label className="block mb-2 text-[16px] text-[#4D4C4C] font-medium">
                                                Email
                                            </label>
                                            <input
                                                className="border-[1px] border-[#CBD6E2] rounded-[15px] w-[100%] max-sm:w-[100%]  bg-[#F5F8FA] max-sm:h-[50px] h-[55px] placeholder:text-[15px] max-lg:placeholder:text-[16px] max-xl:placeholder:text-[17px] placeholder:text-[#4D4C4C] px-[25px] py-[14px]"
                                                placeholder="Enter your email..."
                                                type="email"
                                                name="email"
                                                value={data?.email}
                                                onChange={(e) => setdata({ ...data, email: e.target.value })}
                                            />
                                            <br />
                                        </div>
                                        <div className="w-[100%]">
                                            <label className="block mb-2 text-[16px] text-[#4D4C4C] font-medium">
                                                Phone Number
                                            </label>
                                            <input
                                                className="border-[1px] border-[#CBD6E2] rounded-[15px] w-full max-sm:h-[50px] h-[55px] bg-[#F5F8FA] placeholder:text-[15px] max-lg:placeholder:text-[16px] max-xl:placeholder:text-[17px] placeholder:text-[#4D4C4C] px-[25px] py-[14px]"
                                                placeholder="Phone Number"
                                                type="text"
                                                name="mobile_no"
                                                value={data?.mobile_no}
                                                onChange={(e) => setdata({ ...data, mobile_no: e.target.value })}
                                            />
                                        </div>
                                    </div>
                                    <div className="flex justify-center max-sm:flex-col gap-[25px] max-sm:gap-[35px] max-lg:flex-col max-lg:w-[100%]">

                                        <div className="w-[100%]">
                                            <label className="block mb-2 text-[16px] text-[#4D4C4C] font-medium">
                                                Address
                                            </label>
                                            <input
                                                className="border-[1px] border-[#CBD6E2] rounded-[15px] w-[100%] max-sm:w-[100%]  bg-[#F5F8FA] max-sm:h-[50px] h-[55px] placeholder:text-[15px] max-lg:placeholder:text-[16px] max-xl:placeholder:text-[17px] placeholder:text-[#4D4C4C] px-[25px] py-[14px]"
                                                placeholder="Enter your address..."
                                                type="text"
                                                name="address"
                                                value={data?.address}
                                                onChange={(e) => setdata({ ...data, address: e.target.value })}
                                            />
                                            <br />
                                        </div>
                                    </div>
                                    <div className="flex justify-end mt-6">
                                        <button
                                            type="submit"
                                            onClick={handleSubmit}
                                            className="w-32 bg-[#D86A37] border-2 border-transparent active:border-[#D86A37] text-white text-[17px] font-medium px-4 py-2 rounded-md shadow-md hover:bg-[#c55b2f] transition duration-200"
                                        >
                                            Edit
                                        </button>

                                        {/* <button className='w-32 bg-[#D86A37] text-white text-[17px] font-medium px-4 py-2 rounded-md shadow-md border-[#D86A37] active:border-[#D86A37]'>
                                            Edit
                                        </button> */}
                                    </div>
                                </div>
                            </form>
                        </div>
                    )}

                    {active === 'oders' && (
                        <div className=" w-[100%] items-center">
                            <div>

                                {activeTab1 == 'orders' && (
                                    <div className="border-[1px] border-[#CBD6E2] rounded-[15px] ">
                                        <div className=" overflow-x-auto">
                                            <table className="w-full ">
                                                <thead className="">
                                                    <tr className="table-flex items-center h-[40px] sm:h-[54px]     ">
                                                        <th className="text-start ps-[30px] py-[10px]  px-[30px] text-xs font-semibold text-[#5E5873] uppercase">
                                                            Id
                                                        </th>
                                                        <th className=" text-xs font-semibold py-[10px] text-[#5E5873] uppercase text-center">
                                                            Total Amount
                                                        </th>

                                                        <th className=" text-xs font-semibold py-[10px] text-[#5E5873] uppercase text-center">
                                                            Date
                                                        </th>
                                                        <th className=" text-xs font-semibold py-[10px] text-[#5E5873] uppercase text-center">
                                                            Status
                                                        </th>
                                                        <th className=" text-xs font-semibold py-[10px] text-[#5E5873] uppercase text-center">
                                                            Action{" "}
                                                        </th>
                                                    </tr>
                                                </thead>
                                                <tbody className="last_tr">
                                                    {
                                                        order?.data?.map((val) => (


                                                            <tr key={val.order_id} className="h-[40px] sm:h-[58px] transition-all duration-200 bg-[#eef3f9cc] hover:bg-[#4646460c]">
                                                                <td className="  ps-[30px] max-md:ps-[10px] max-sm:w-[200px]">
                                                                    #{val.order_id}
                                                                </td>
                                                                <td className="text-sm text-[#5E5873] px-[30px] text-center">
                                                                    {val.price}
                                                                </td>

                                                                <td className="text-sm text-[#5E5873] text-center">
                                                                    {new Date(val.created_at).toLocaleString('en-US', {
                                                                        month: 'short',
                                                                        day: '2-digit',
                                                                        year: 'numeric',
                                                                    })}
                                                                </td>
                                                                <td className="text-sm text-[#5E5873] text-center">
                                                                    <button
                                                                        className={`w-[120px] mx-4 py-1 rounded-[400px] text-sm font-semibold
    ${val?.status === "Pending"
                                                                                ? "bg-orange-200 text-orange-800 shadow-[0_0_5px_rgba(255,193,7,0.5)_inset]"
                                                                                : val?.status === "Processing"
                                                                                    ? "bg-blue-100 text-blue-800 shadow-[0_0_5px_rgba(0,123,255,0.4)_inset]"
                                                                                    : val?.status === "Shipped"
                                                                                        ? "bg-indigo-100 text-indigo-800 shadow-[0_0_5px_rgba(102,126,234,0.4)_inset]"
                                                                                        : val?.status === "Delivered"
                                                                                            ? "bg-green-100 text-green-800 shadow-[0_0_5px_rgba(40,167,69,0.4)_inset]"
                                                                                            : val?.status === "Cancelled"
                                                                                                ? "bg-red-100 text-red-700 shadow-[0_0_5px_rgba(220,53,69,0.5)_inset]"
                                                                                                : val?.status === "Returned"
                                                                                                    ? "bg-pink-100 text-pink-700 shadow-[0_0_5px_rgba(255,99,132,0.5)_inset]"
                                                                                                    : "bg-gray-100 text-gray-600"
                                                                            }`}
                                                                    >
                                                                        {val?.status ?? "Unknown"}
                                                                    </button>
                                                                </td>
                                                                <td className="text-sm px-[50px] dropdown-container">
                                                                    <div className="flex items-center gap-2 justify-center">
                                                                        <button
                                                                            className="p-2 hover:bg-[#e8e8e8] rounded-full transition-all duration-200"
                                                                            aria-label="Edit user"
                                                                            title="Edit"
                                                                            onClick={() => {
                                                                                setActiveTab1('details')
                                                                                setorderitem(val)
                                                                            }}
                                                                        >
                                                                            <i className="fa-solid fa-eye text-[#6d6d6d] text-lg" />
                                                                        </button>
                                                                    </div>
                                                                </td>
                                                            </tr>
                                                        ))
                                                    }
                                                </tbody>
                                            </table>

                                        </div>
                                    </div>
                                )}

                                {activeTab1 == 'details' && (
                                    <div>
                                        <h2 className='inline-flex items-center cursor-pointer gap-3 text-primary mb-5 ' onClick={() => {
                                            setActiveTab1('orders')
                                        }}><svg xmlns="http://www.w3.org/2000/svg" width="11" height="12" viewBox="0 0 11 16" fill="none">
                                                <path d="M9.55677 14.5647L2.55273 7.9109L9.55677 1.25706" stroke="#d86a37" strokeWidth="2.80161" />
                                            </svg>Back</h2>

                                        <div className='flex gap-6 w-full'>
                                            <div className='border-[1px] w-[70%] border-[#CBD6E2] rounded-[15px] p-[20px]'>
                                                <div className="text-[15px] font-bold mb-[15px] max-sm:mb-[10px] "><h5>Order Item</h5></div>
                                                <div className='divide-y divide-[#d4cdf0]'>
                                                    {Array.isArray(orderitem?.order_items) && orderitem?.order_items?.map((val, index) => {
                                                        const matchedProduct = val?.theme


                                                        return (
                                                            <div
                                                                key={index}
                                                                className="flex border-t justify-between items-center py-3  max-md:gap-1"
                                                            >

                                                                <div className="flex items-center gap-4 max-sm:gap-1">
                                                                    <img
                                                                        src={import.meta.env.VITE_API_BASE_URL + matchedProduct?.thumbnail}
                                                                        alt={matchedProduct?.thumbnail}
                                                                        className="h-[50px] w-[50px] rounded-[8px] object-cover max-md:h-[40px] max-md:w-[40px]"
                                                                    />
                                                                    <div>
                                                                        <span className="text-[12px] text-[#595858] max-md:text-[9px] ">Product Name</span>
                                                                        <h4 className="text-[14px] font-[600] max-md:text-[11px]">{matchedProduct?.name}</h4>
                                                                    </div>
                                                                </div>


                                                                <div className="">
                                                                    <span className="text-[12px] text-[#595858] max-md:text-[9px] "></span>
                                                                    <h4 className="text-[14px] text-center font-[600] max-md:text-[11px]">{val.quantity}</h4>
                                                                </div>


                                                                <div className="">
                                                                    <span className="text-[12px] text-[#595858] max-md:text-[9px] ">Price</span>
                                                                    <h4 className="text-[14px] font-[600] max-md:text-[11px]">₹{parseInt(matchedProduct.discount_price)}</h4>
                                                                </div>
                                                            </div>
                                                        );
                                                    })}
                                                </div>
                                            </div>
                                            <div className='w-[30%] flex flex-col gap-6'>
                                                <div className='border-[1px]  border-[#CBD6E2] rounded-[15px] p-[20px]'>
                                                    <div className="text-[15px] font-bold mb-[5px]  ">
                                                        <h5>Summary</h5>
                                                    </div>
                                                    <div className=" ">
                                                        <div className="text-[15px] font-bold max-sm:mb-[10px] pt-1  flex  ">
                                                            <span className="w-[150px] font-[400] text-[#575864]">Order ID</span>
                                                            <span className=" font-[600] ">#{orderitem?.order_id}</span>
                                                        </div>
                                                        <div className="text-[15px] font-bold max-sm:mb-[10px] pt-3 flex  ">
                                                            <span className="w-[150px] font-[400] text-[#575864]">Date</span>
                                                            <span className=" font-[600] ">{formatDate(orderitem?.created_at)}</span>
                                                        </div>
                                                        <div className="text-[15px] font-bold max-sm:mb-[10px] pt-3 flex  ">
                                                            <span className="w-[150px] font-[400] text-[#575864]">Total </span>
                                                            <span className=" font-[600] text-[#ff5200] ">₹{parseInt(orderitem?.price)}</span>
                                                        </div>

                                                    </div>
                                                </div>

                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    )}


                    {
                        modal === 'logout' && (
                            <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-[9999]">

                                <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
                                    <div className="flex min-h-full items-center justify-center p-4 text-center sm:items-center sm:p-0">
                                        <div className="relative transform overflow-hidden p-[30px] border-t-[8px] border-[#F44336] rounded-[6px] bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-xl z-40">
                                            <div className="bg-white ">
                                                <div className="flex items-center justify-between">
                                                    <h3 className="text-xl font-medium text-gray">Logout</h3>
                                                    <div onClick={closeModal}>
                                                        <svg className="closeModal cursor-pointer" xmlns="http://www.w3.org/2000/svg" width="16" height="15" viewBox="0 0 16 15" fill="none">
                                                            <path fillRule="evenodd" clipRule="evenodd" d="M1.15128 0.751862C1.61991 0.283233 2.3797 0.283233 2.84833 0.751862L7.9998 5.90333L13.1513 0.751862C13.6199 0.283233 14.3797 0.283233 14.8483 0.751862C15.317 1.22049 15.317 1.98029 14.8483 2.44892L9.69686 7.60039L14.8483 12.7519C15.317 13.2205 15.317 13.9803 14.8483 14.4489C14.3797 14.9175 13.6199 14.9175 13.1513 14.4489L7.9998 9.29745L2.84833 14.4489C2.3797 14.9175 1.61991 14.9175 1.15128 14.4489C0.682647 13.9803 0.682647 13.2205 1.15128 12.7519L6.30275 7.60039L1.15128 2.44892C0.682647 1.98029 0.682647 1.22049 1.15128 0.751862Z" fill="#495567" />
                                                        </svg>
                                                    </div>
                                                </div>
                                                <p className="pt-[14px] text-[#8492A6]">Are you sure you want to Logout ?</p>


                                            </div>
                                            <div className="  pt-[30px] flex flex-row-reverse gap-3 ">
                                                <button type="button" onClick={logout} className="inline-flex h-[35px] sm:h-[40px]  w-[114px] shadow-[0px_8px_20px_1px_#F443364D] rounded-md bg-[#F44336] items-center   justify-center py-2 text-sm font-semibold text-white shadow-xs  sm:ml-3 ">Logout</button>
                                                <button type="button" onClick={closeModal} className=" bg-[#F4F1FC] h-[35px] sm:h-[40px] w-[114px] closeModal   rounded-md border-0   inline-flex justify-center items-center  py-2 text-sm font-semibold  shadow-xs   sm:mt-0 " >Cancel</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )
                    }
                </div>
            </section>
            <Footer />
        </>
    );
};

export default profile;
