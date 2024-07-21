import Image from "next/image";
import Link from "next/link";

import React from "react";

export default function FirstPage() {
  return (
    <div>
      <nav className="bg-white shadow-md p-8 flex justify-between">
        <div>Credit Buddy</div>
        <ul className="flex justify-around gap-[24px]">
          <li className="nav-item">
            <a href="/" className="nav-link">
              Home
            </a>
          </li>
          <li className="nav-item">
            <a href="/about" className="nav-link">
              Caculate
            </a>
          </li>
          <li className="nav-item">
            <a href="/services" className="nav-link">
              About us
            </a>
          </li>
          <li className="nav-item">
            <a href="/contact" className="nav-link">
              Policy
            </a>
          </li>
        </ul>
      </nav>

      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
        <div className="text-center">
          ให้เหมาะกับสไตล์คุณ ผ่านเว็บไซต์ช่วยวางแผนการใช้บัตรเครดิต
        </div>
        <Link href="/hero">
          <div className="inline-block bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700 transition duration-300 ease-in-out shadow-lg transform hover:scale-105">
            About Us
          </div>
        </Link>
        <div className="grid grid-cols-3 gap-[4px] p-1">
    <div className="flex items-center justify-center h-screen ">
      <div className="bg-white shadow-lg rounded-lg p-8 h-[400px] w-[750px] text-center">
        <h2 className="text-2xl font-bold mb-4">Louriepoiem</h2>
        <p className="text-gray-700 mb-6">lorepium</p>
        <Link href="/hero">
          <div className="inline-block bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700">
            เข้าใช้บริการ
          </div>
        </Link>
      </div>
    </div>
    <div className="flex items-center justify-center h-screen ">
      <div className="bg-white shadow-lg rounded-lg p-8 h-[400px] w-[750px] text-center">
        <h2 className="text-2xl font-bold mb-4">Louriepoiem</h2>
        <p className="text-gray-700 mb-6">lorepium</p>
        <Link href="/hero">
          <div className="inline-block bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700">
            เข้าใช้บริการ
          </div>
        </Link>
      </div>
    </div>
    <div className="flex items-center justify-center">
      <div className="bg-white shadow-lg rounded-lg p-8 h-[400px] w-[750px] text-center">
        <h2 className="text-2xl font-bold mb-4">Louriepoiem</h2>
        <p className="text-gray-700 mb-6">lorepium</p>
        <Link href="/hero">
          <div className="inline-block bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700">
            เข้าใช้บริการ
          </div>
        </Link>
      </div>
    </div>
  </div>
      </div>


  
</div>
  
  );
}
