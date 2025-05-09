import React from 'react';
const NewsTicker = ({ news = [] }) => {
  return (
    <div className="text-red py-2 overflow-hidden whitespace-nowrap">
      <div className="inline-block animate-marquee"> 
        {news.map((item, index) => (
          <span key={index} className="mx-4">
            -- {item} --
          </span>
        ))}
      </div>
    </div>
  );
};

export default NewsTicker;
