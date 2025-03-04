import Image from "next/image";
import React from "react";
import Bg from "../../public/bg.png"

const AstroCard = () => {
  return (
    <div className="py-20 flex justify-center" id="cardAstro">
      <div className="relative flex flex-col items-center justify-center bg-gray-900 text-white font-bold p-6 md:w-8/12 w-full mx-4 rounded-2xl overflow-hidden shadow-lg gap-4 h-[25em]">
        <div className="absolute w-full h-full"><Image height={100} width={100} src={Bg}
          alt={"bg"}
          className={"absolute left-0 top-0 md:w-96 w-60 object-cover object-center"} /></div>
        <div className="absolute w-full h-full"><Image height={100} width={100} src={Bg}
          alt={"bg"}
          className={"absolute right-0 top-0 md:w-96 w-60 object-cover object-center"} /></div>
        <img
          src="https://uiverse.io/astronaut.png"
          alt="Astronaut"
          className="w-48 z-5 animate-bounce"
        />
        <div className="text-center z-2 transition duration-400">
          <p className="text-3xl font-extrabold">281 138</p>
          <p className="mt-2">Videos generated with the power of Vexub</p>
          <button
            className="mt-4 px-6 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white text-xl shadow-lg transition transform active:scale-95"
          >
            Start Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default AstroCard;
