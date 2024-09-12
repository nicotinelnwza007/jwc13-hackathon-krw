"use client"
import Image from "next/image";
import React, { useState } from "react";
import Link from "next/link";



const Navbar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    return (
        <div className="w-full h-[65px] fixed top-0 shadow-lg shadow-[#00C4CC]/50 bg-[#03001417] backdrop-blur-md z-50 px-4 lg:px-10">
            <div className="w-full h-full flex flex-row items-center justify-between m-auto px-[10px]">

                <Link href="/" className="font-bold ml-[10px]  md:block text-gray-300 text-[24px] md:text-[44px]">
                    Cuddies
                </Link>

                <div className="hidden md:flex w-[500px] h-full flex-row items-center justify-between md:mr-20">
                    <div className="flex items-center justify-between w-full text-white h-auto mr-[15px] px-[20px] py-[10px] rounded-full ">
                        <Link href="#about-us" className="relative no-underline cursor-pointer mx-5 transition ease-linear before:absolute before:bottom-[-4px] before:left-0 before:w-0 before:h-[3.5px] before:bg-[#00C4CC] before:transition before:duration-300 before:ease-linear hover:text-[#00C4CC] hover:before:w-full">
                            About us
                        </Link>
                        <Link href="#cacualte" className="relative no-underline cursor-pointer mx-5 transition ease-linear before:absolute before:bottom-[-4px] before:left-0 before:w-0 before:h-[3.5px] before:bg-[#00C4CC] before:transition before:duration-300 before:ease-linear hover:text-[#00C4CC] hover:before:w-full">
                            Cacualte
                        </Link>
                        <Link href="#qna" className="relative no-underline cursor-pointer mx-5 transition ease-linear before:absolute before:bottom-[-4px] before:left-0 before:w-0 before:h-[3.5px] before:bg-[#00C4CC] before:transition before:duration-300 before:ease-linear hover:text-[#00C4CC] hover:before:w-full">
                            Q&A
                        </Link>
                    </div>
                </div>

                <div className="md:hidden flex items-center">
                    <button
                        onClick={toggleMenu}
                        className="text-gray-300 focus:outline-none"
                    >
                        <svg
                            className="w-6 h-6"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            {isMenuOpen ? (
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M6 18L18 6M6 6l12 12"
                                />
                            ) : (
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M4 6h16M4 12h16m-7 6h7"
                                />
                            )}
                        </svg>
                    </button>
                </div>

                {isMenuOpen && (
                    <div className="absolute top-16 left-0 w-full flex flex-col items-center bg-[#0300145e] text-gray-200 py-4 z-50">
                        <Link href="#about-us" className="py-2 cursor-pointer hover:underline">
                            About Us
                        </Link>
                        <Link href="#cacualte" className="py-2 cursor-pointer hover:underline">
                            Calculate
                        </Link>
                        <Link href="#qna" className="py-2 cursor-pointer hover:underline">
                            Q&A
                        </Link>
                    </div>
                )}
            </div>
        </div>
    );

}
export default Navbar;
