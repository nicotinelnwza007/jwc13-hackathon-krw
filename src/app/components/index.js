import Image from "next/image";
import Link from "next/link";
import React from "react";
import Cards from "./sub/Cards";
import Centercards from "./sub/Centercard";
import What from "./sub/What";
export default function FirstPage() {
  return (
    <div>
      {/* Main Section */}
      <div className="flex flex-col text-center items-center min-h-screen">

        {/* Image & Text Section */}
        <div className="flex flex-col w-full max-h-[1500px] md:flex-row justify-center items-center p-6 md:p-10 space-y-6 md:space-x-10 mt-14 lg:mt-28">
          <div className="w-full md:w-auto">
            <Image src="/cards/card.png" width={400} height={400} className="mx-auto" alt="Credit Card" /> {/* Increased size */}
          </div>
          <div className="text-center text-white">
            <h1 className="text-[24px] md:text-[40px] leading-snug"> {/* Increased text size */}
              <p className="font-bold">Credit buddy website </p><br />
              ที่ช่วยวางแผนการใช้บัตรเครดิตให้คุ้มค่าที่สุด <br />
              สำหรับผู้ถือบัตรเครดิต 2 ใบขึ้นไป
            </h1>
            <Link href="/hero">
              <div className="inline-block bg-blue-500 text-white py-3 px-6 md:py-5 md:px-10 mt-6 md:mt-8 rounded-xl hover:bg-blue-700 transition-transform duration-300 ease-in-out shadow-lg transform hover:scale-105">
                คำนวณกัน!
              </div>
            </Link>
          </div>
        </div>

      </div>
      <What ></What>
      <div className="flex flex-col justify-center items-center gap-8  lg:flex-row mt-12">
        <Cards
          title="Credit Card Management"
          description="Learn the best strategies to manage your credit card, improve your financial health, and unlock financial freedom."
          date="September 10, 2024"
          image="https://via.placeholder.com/600x400.png?text=Credit+Card"
          hashtag="#FinancialFreedom"
        />
        <Centercards
          title="Credit Card Management"
          description="Learn the best strategies to manage your credit card, improve your financial health, and unlock financial freedom."
          date="September 10, 2024"
          image="https://via.placeholder.com/600x400.png?text=Credit+Card"
          hashtag="#FinancialFreedom"
        />
        <Cards
          title="Credit Card Management"
          description="Learn the best strategies to manage your credit card, improve your financial health, and unlock financial freedom."
          date="September 10, 2024"
          image="https://via.placeholder.com/600x400.png?text=Credit+Card"
          hashtag="#FinancialFreedom"
        />
      </div>
    </div>

  );
}
