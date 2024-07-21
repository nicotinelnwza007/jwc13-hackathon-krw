import Image from "next/image";
import Link from "next/link";
import logo from "@/app/hero/logo.png";
import React from "react";

export default function FirstPage() {
  return (
    <div>
      <nav className="bg-teal-500 shadow-md p-8 flex justify-between items-center">
        <div className="text-4xl text-white font-bold">
          {" "}
          <Image src={logo} width={170} height={170} alt="Credit Card" />
        </div>
          <ul className="flex space-x-6 text-center justify-center items-center">
            <li className="nav-item">
              <a href="/" className="text-white text-lg hover:text-yellow-400">
                Home
              </a>
            </li>
            <li className="nav-item">
              <a
                href="/hero"
                className="text-white text-lg hover:text-yellow-400"
              >
                คำนวณ
              </a>
            </li>
            <li className="nav-item">
              <a
                href="/about"
                className="text-white text-lg hover:text-yellow-400"
              >
                เกี่ยวกับ
              </a>
            </li>
            <li className="nav-item">
              <a
                href="/policy"
                className="text-white text-lg hover:text-yellow-400"
              >
                นโยบาย
              </a>
            </li>
          </ul>
       

        <div className="text-white text-xl font-bold">User</div>
      </nav>

      <div className="flex flex-col itext-center justify-center items-center min-h-screen bg-gradient-to-r from-[#383838] to-[#9E9E9E]">
        <div className="text-center">
          ให้เหมาะกับสไตล์คุณ ผ่านเว็บไซต์ช่วยวางแผนการใช้บัตรเครดิต
        </div>
        <Link href="/hero">
          <div className="inline-block bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700 transition duration-300 ease-in-out shadow-lg transform hover:scale-105">
            About Us
          </div> 
        </Link>
        <div className="grid grid-cols-3 gap-[32px] p-1">
    <div className="flex items-center justify-center h-screen ">
      <div className="bg-[#575757] rounded-lg p-[50px] h-[275px] w-[406px] text-center text-white">
        <h2 className="text-2xl font-bold mb-4">จำนวนบัตรทั้งสิ้น</h2>
        <p className="text-[#46A8A7] text-[32px] font-bold mb-6">26,332,679</p>
<h2>ล้านใบ</h2>
  
      </div>
    </div>
    <div className="flex items-center justify-center h-screen ">
    <div className="flex items-center justify-center h-screen ">
      <div className="bg-[#575757] rounded-lg p-[50px] h-[275px] w-[406px] text-center text-white">
        <h2 className="text-2xl font-bold mb-4">จำนวนบัตรทั้งสิ้น</h2>
        <p className="text-[#46A8A7] text-[32px] font-bold mb-6">26,332,679</p>
<h2>ล้านใบ</h2>
  
      </div>
      </div>
    </div>
    <div className="flex items-center justify-center">
    <div className="flex items-center justify-center h-screen ">
      <div className="bg-[#575757] rounded-lg p-[50px] h-[275px] w-[406px] text-center text-white">
        <h2 className="text-2xl font-bold mb-4">จำนวนบัตรทั้งสิ้น</h2>
        <p className="text-[#46A8A7] text-[32px] font-bold mb-6">26,332,679</p>
<h2>ล้านใบ</h2>
  
      </div>
      </div>
    </div>
  </div>
      </div>


  
</div>
  
  );
}
