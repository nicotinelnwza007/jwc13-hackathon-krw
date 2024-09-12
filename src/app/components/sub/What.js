import React from 'react'

const What = () => {
  return (
    <div className='flex flex-col md:flex-row justify-between items-start p-6 sm:p-8 md:p-16 w-full mt-24 md:h-auto max-h-[800px]' id='about-us'>
    <div className="flex flex-col mb-6 sm:mb-8 md:mb-0 text-start md:text-left">
        <div className="text-transparent bg-clip-text bg-gradient-to-r font-bold from-purple-500 to-cyan-500 text-3xl sm:text-4xl md:text-6xl lg:text-7xl">
            What is cuddies?
        </div>
        <div className="text-gray-200 text-lg sm:text-xl md:text-2xl lg:text-3xl mt-2 sm:mt-4">
            คัดดี้คือ?
        </div>
    </div>

    <div className="text-white text-start text-base sm:text-lg  md:text-lg ">
        <p>
           Cuddies คือ เว็ปแอพลิเคชั่น ในการช่วยลูกค้าเลือกใช้บัตรเครดิตให้มีประสิทธิภาพมากที่สุด
        </p>
        <br />
        Cuddies is a web application that manages users' credit cards as efficiently as possible
    </div>
    </div>
  )
}

export default What