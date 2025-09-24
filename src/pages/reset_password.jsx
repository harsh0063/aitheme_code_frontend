import React, { useState } from "react";
import Logo from '../assets/logo.svg';
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { useResetPasswordMutation } from '../service/apislice';


const Reset_Password = () => {
   
    const navigate = useNavigate();
    const [resetPassword] = useResetPasswordMutation();

    const [user_password, setUser_password] = useState("");
    const [new_password, setNew_password] = useState("");
    const [con_password, setCon_password] = useState("");
    const [error, setError] = useState({});
    const [showPassword, setShowPassword] = useState(false);
    const [showPassword1, setShowPassword1] = useState(false);
    const [showPassword2, setShowPassword2] = useState(false);

    const validateForm = () => {
        let errors = {};

        if (!user_password.trim()) {
            errors.user_password = "Please enter your current password";
        }

        if (!new_password.trim()) {
            errors.new_password = "Please enter a new password";
        } else if (new_password.length < 8 || new_password.length > 16) {
            errors.new_password = "Password must be 8-16 characters long";
        }

        if (!con_password.trim()) {
            errors.con_password = "Please confirm your password";
        } else if (con_password !== new_password) {
            errors.con_password = "Passwords do not match";
        }

        return errors;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const errors = validateForm();
        setError(errors);

        if (Object.keys(errors).length === 0) {
            try {
                const formData = new FormData();
                formData.append("user_password", user_password);
                formData.append("new_password", new_password);
                formData.append("con_password", con_password);

                const response = await resetPassword(formData).unwrap();

                toast.success("Password updated successfully!",{
                autoClose: 1000,
            });
                setTimeout(() => navigate("/profile"), 1000);

            } catch (err) {
                toast.error(err?.data?.message || "Password update failed",{
                autoClose: 1000,
            });
            }
        }
    };

    return (
        <section className="min-h-screen flex items-center justify-center  px-4 bg-blue-50">
            <ToastContainer position="top-center" autoClose={1500} />
            <div className="bg-white rounded-2xl shadow-[0px_9px_50px_1px_#3DB0F733] w-full max-w-md sm:min-w-[400px] md:min-w-[500px] lg:min-w-[600px] max-sm:p-4 p-8 mx-auto">



                <div className="flex justify-center mb-6 max-sm:mb-4 max-sm:mt-[10px]">
                    <img src={Logo} alt="logo" className="w-[120px]" />
                </div>

                <h2 className="text-2xl font-semibold text-center mb-2 max-sm:text-[19px]">Reset Password</h2>

                <form onSubmit={handleSubmit}>
                    {/* Current Password */}
                    <div className="mb-4">
                        <label className="block text-sm font-medium mb-1">Current Password</label>
                        <div className="relative">
                            <input
                                type={showPassword ? "text" : "password"}
                                value={user_password}
                                onChange={(e) => setUser_password(e.target.value)}
                                className={`w-full px-3 py-2 border rounded-md ${error.user_password ? 'border-red-500' : 'border-gray-300'} focus:outline-none focus:ring-2 focus:ring-blue-500`}
                                aria-label="Current Password"
                            />
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="absolute top-3 right-3 cursor-pointer"
                                width="20"
                                height="20"
                                viewBox="0 0 20 20"
                                fill="none"
                                onClick={() => setShowPassword(!showPassword)}
                            >
                                <path
                                    d="M9.99994 15.8334C8.63317 15.8504 7.28052 15.5554 6.04494 14.9709C5.08718 14.5036 4.22715 13.8582 3.51077 13.0692C2.75196 12.2535 2.15449 11.3014 1.74994 10.2634L1.6666 10L1.7541 9.73671C2.15895 8.69957 2.75513 7.74777 3.5116 6.93088C4.22772 6.14197 5.08747 5.4966 6.04494 5.02921C7.28053 4.4447 8.63317 4.14972 9.99994 4.16671C11.3667 4.14975 12.7193 4.44473 13.9549 5.02921C14.9127 5.49649 15.7728 6.14187 16.4891 6.93088C17.2493 7.74551 17.847 8.69785 18.2499 9.73671L18.3333 10L18.2458 10.2634C16.9384 13.6665 13.6451 15.8912 9.99994 15.8334ZM9.99994 5.83338C7.16316 5.74448 4.55945 7.39596 3.43077 10C4.55927 12.6043 7.1631 14.2558 9.99994 14.1667C12.8366 14.2554 15.4402 12.604 16.5691 10C15.4419 7.39469 12.8372 5.74261 9.99994 5.83338ZM9.99994 12.5C8.79771 12.508 7.75774 11.6645 7.51741 10.4865C7.27707 9.30853 7.9035 8.12506 9.01276 7.66143C10.122 7.19779 11.4043 7.58349 12.0737 8.58213C12.7431 9.58077 12.6127 10.9134 11.7624 11.7634C11.2969 12.2344 10.6622 12.4997 9.99994 12.5Z"
                                    fill="#9CA3AF"
                                ></path>
                            </svg>
                        </div>
                        {error.user_password && <p className="text-red-500 text-sm mt-1">{error.user_password}</p>}
                    </div>

                    {/* New Password */}
                    <div className="mb-4">
                        <label className="block text-sm font-medium mb-1">New Password</label>
                        <div className="relative">
                            <input
                                type={showPassword1 ? "text" : "password"}
                                value={new_password}
                                onChange={(e) => setNew_password(e.target.value)}
                                className={`w-full p-3 rounded-lg border ${error.new_password ? 'border-red-500' : 'border-gray-300'} focus:outline-none focus:ring-2 focus:ring-primary`}
                                aria-label="New Password"
                            />
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="absolute top-3 right-3 cursor-pointer"
                                width="20"
                                height="20"
                                viewBox="0 0 20 20"
                                fill="none"
                                onClick={() => setShowPassword1(!showPassword1)}
                            >
                                <path
                                    d="M9.99994 15.8334C8.63317 15.8504 7.28052 15.5554 6.04494 14.9709C5.08718 14.5036 4.22715 13.8582 3.51077 13.0692C2.75196 12.2535 2.15449 11.3014 1.74994 10.2634L1.6666 10L1.7541 9.73671C2.15895 8.69957 2.75513 7.74777 3.5116 6.93088C4.22772 6.14197 5.08747 5.4966 6.04494 5.02921C7.28053 4.4447 8.63317 4.14972 9.99994 4.16671C11.3667 4.14975 12.7193 4.44473 13.9549 5.02921C14.9127 5.49649 15.7728 6.14187 16.4891 6.93088C17.2493 7.74551 17.847 8.69785 18.2499 9.73671L18.3333 10L18.2458 10.2634C16.9384 13.6665 13.6451 15.8912 9.99994 15.8334ZM9.99994 5.83338C7.16316 5.74448 4.55945 7.39596 3.43077 10C4.55927 12.6043 7.1631 14.2558 9.99994 14.1667C12.8366 14.2554 15.4402 12.604 16.5691 10C15.4419 7.39469 12.8372 5.74261 9.99994 5.83338ZM9.99994 12.5C8.79771 12.508 7.75774 11.6645 7.51741 10.4865C7.27707 9.30853 7.9035 8.12506 9.01276 7.66143C10.122 7.19779 11.4043 7.58349 12.0737 8.58213C12.7431 9.58077 12.6127 10.9134 11.7624 11.7634C11.2969 12.2344 10.6622 12.4997 9.99994 12.5Z"
                                    fill="#9CA3AF"
                                ></path>
                            </svg>
                        </div>
                        {error.new_password && <p className="text-red-500 text-sm mt-1">{error.new_password}</p>}
                    </div>

                    {/* Confirm Password */}
                    <div className="mb-4">
                        <label className="block text-sm font-medium mb-1">Confirm Password</label>
                        <div className="relative">
                            <input
                                type={showPassword2 ? "text" : "password"}
                                value={con_password}
                                onChange={(e) => setCon_password(e.target.value)}
                                className={`w-full px-3 py-2 border rounded-md ${error.con_password ? 'border-red-500' : 'border-gray-300'} focus:outline-none focus:ring-2 focus:ring-blue-500`}
                                aria-label="Confirm Password"
                            />
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="absolute top-3 right-3 cursor-pointer"
                                width="20"
                                height="20"
                                viewBox="0 0 20 20"
                                fill="none"
                                onClick={() => setShowPassword2(!showPassword2)}
                            >
                                <path
                                    d="M9.99994 15.8334C8.63317 15.8504 7.28052 15.5554 6.04494 14.9709C5.08718 14.5036 4.22715 13.8582 3.51077 13.0692C2.75196 12.2535 2.15449 11.3014 1.74994 10.2634L1.6666 10L1.7541 9.73671C2.15895 8.69957 2.75513 7.74777 3.5116 6.93088C4.22772 6.14197 5.08747 5.4966 6.04494 5.02921C7.28053 4.4447 8.63317 4.14972 9.99994 4.16671C11.3667 4.14975 12.7193 4.44473 13.9549 5.02921C14.9127 5.49649 15.7728 6.14187 16.4891 6.93088C17.2493 7.74551 17.847 8.69785 18.2499 9.73671L18.3333 10L18.2458 10.2634C16.9384 13.6665 13.6451 15.8912 9.99994 15.8334ZM9.99994 5.83338C7.16316 5.74448 4.55945 7.39596 3.43077 10C4.55927 12.6043 7.1631 14.2558 9.99994 14.1667C12.8366 14.2554 15.4402 12.604 16.5691 10C15.4419 7.39469 12.8372 5.74261 9.99994 5.83338ZM9.99994 12.5C8.79771 12.508 7.75774 11.6645 7.51741 10.4865C7.27707 9.30853 7.9035 8.12506 9.01276 7.66143C10.122 7.19779 11.4043 7.58349 12.0737 8.58213C12.7431 9.58077 12.6127 10.9134 11.7624 11.7634C11.2969 12.2344 10.6622 12.4997 9.99994 12.5Z"
                                    fill="#9CA3AF"
                                ></path>
                            </svg>
                        </div>
                        {error.con_password && <p className="text-red-500 text-sm mt-1">{error.con_password}</p>}
                    </div>


                    {/* Submit Button */}
                    <button
                        type="submit"
                        className="w-full bg-black text-white py-3 rounded-lg hover:bg-black transition duration-200"
                    >
                        Reset Password
                    </button>
                </form>


            </div>
        </section>
    )
}

export default Reset_Password
