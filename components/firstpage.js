import Image from "next/image";
import Link from "next/link";
import logo from "@/app/hero/logo.png";
import React from "react";
import photo from "@/app/hero/card.png";

export default function FirstPage() {
  return (
    <div>
      <nav className="bg-teal-500 shadow-md p-8 flex justify-between items-center">
        <div className="text-4xl text-white font-bold">
          <Image src={logo} width={130} height={130} alt="Credit Card" />
        </div>
        <ul className="flex space-x-6 text-center justify-center items-center">
          <li className="nav-item">
            <a href="/" className="text-white text-lg hover:text-yellow-400">
              Home
            </a>
          </li>
          <li className="nav-item">
            <a href="/hero" className="text-white text-lg hover:text-yellow-400">
              คำนวณ
            </a>
          </li>
          <li className="nav-item">
            <a href="/about" className="text-white text-lg hover:text-yellow-400">
              เกี่ยวกับ
            </a>
          </li>
          <li className="nav-item">
            <a href="/policy" className="text-white text-lg hover:text-yellow-400">
              นโยบาย
            </a>
          </li>
        </ul>
        <div className="text-white text-2xl ">Login</div>
      </nav>

      <div className="flex flex-col text-center justify-between items-center min-h-screen bg-gradient-to-r from-gray-900 via-gray-700 to-gray-900">
        <div className="flex justify-between p-10">
          <div>
            <Image src={photo} width={500} height={500} alt="Credit Card" />
          </div>
          <div className="flex flex-col text-center justify-center items-center mx-auto">
            <div className="ml-8 text-start text-white text-[42px]">
              การใช้บัตรเครดิตอย่างมีกลยุทธ์ คือ <br></br>การยกระดับคุณภาพชีวิต <br></br>และเป็นกุญแจสู่การเงินที่มั่นคง
            </div>
            <Link href="/hero">
              <div className="inline-block bg-blue-500 text-white py-4 px-8 mt-8 rounded hover:bg-blue-700 transition duration-300 ease-in-out shadow-lg transform hover:scale-105 rounded-xl">
                คำนวณกัน!
              </div>
            </Link>
          </div>
        </div>
        
        <div className="grid grid-cols-3 gap-[32px] p-8 z-10">
          <div className="flex items-center justify-center">
            <div className="bg-gradient-to-r from-gray-700 to-gray-900 p-[50px] h-[275px] w-[406px] text-center text-white rounded-xl shadow-lg">
              <h2 className="text-2xl font-bold mb-4">จำนวนบัตรทั้งสิ้น</h2>
              <p className="text-[#46A8A7] text-[32px] font-bold mb-6">26,332,679</p>
              <h2 className="text-2xl font-bold mb-4">ล้านใบ</h2>
            </div>
          </div>
          <div className="flex items-center justify-center">
            <div className="bg-gradient-to-r from-gray-700 to-gray-900 rounded-lg p-[50px] h-[275px] w-[406px] text-center text-white shadow-lg">
              <h2 className="text-2xl font-bold mb-4">ยอดสินเชื่อค้างชำระ</h2>
              <p className="text-[#46A8A7] text-[32px] font-bold mb-6">467,124,720</p>
              <h2 className="text-2xl font-bold mb-4">ล้านบาท</h2>
            </div>
          </div>
          <div className="flex items-center justify-center">
            <div className="bg-gradient-to-r from-gray-700 to-gray-900 rounded-lg p-[50px] h-[275px] w-[406px] text-center text-white shadow-lg">
              <h2 className="text-2xl font-bold mb-4">การเบิกเงินสดล่วงหน้า</h2>
              <p className="text-[#46A8A7] text-[32px] font-bold mb-6">16,876.01</p>
              <h2 className="text-2xl font-bold mb-4">ล้านบาท</h2>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
