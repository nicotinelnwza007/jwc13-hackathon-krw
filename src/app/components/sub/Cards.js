import React from 'react';

const Cards = ({ title, description, date, image , hashtag}) => {
  return (
    <button
      type="button"
      className="w-full md:w-[400px] mt-8 h-fit text-start bg-white overflow-hidden rounded-2xl shadow-lg transition duration-1000 hover:scale-[1.015] hover:shadow-2xl"
    >
      <img
        className="w-full aspect-[5/3] bg-blue-50 object-cover object-center"
        src={image}
        alt={title}
      />
      <div className="p-6">
        <div
          className="inline-flex text-xs md:text-sm px-4 md:px-6 py-0.5 bg-blue-50 text-blue-400 rounded-full mb-2"
        >
          {date}
        </div>
        <h1 className="text-xl md:text-2xl font-semibold line-clamp-2 mb-2">
            {hashtag}
          </h1>
        <h1 className="text-xl md:text-2xl font-semibold line-clamp-2 mb-2">
          {title}
        </h1>
        <p className="text-sm md:text-base text-gray-400 line-clamp-2">
          {description}
        </p>
      </div>
    </button>
  );
};

export default Cards;
