import React from "react";

const Banner = ({ title, description }) => {
  return (
    <div className=" h-screen bg-blue-400 text-white flex flex-col items-center justify-center text-center px-6">
      <h1 className="text-5xl font-bold">Hello! {title}</h1>
      <p className="text-lg mt-4 max-w-2xl">{description}</p>
    </div>
  );
};

export default Banner;
