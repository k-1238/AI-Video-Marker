"use client";

import { cn } from "../../../utils/cn";
import { BackgroundGradientAnimation } from "./GradientBg";
import GridGlobe from "./GridGlobe";
import Lottie from "react-lottie";
import { useState } from "react";
import animationData from "../../../data/confetti.json";
import MagicButton from "./MagicButton";
import { RiThumbUpLine } from "react-icons/ri";
import Image from "next/image";


export const BentoGrid = ({
  className,
  children,
}: {
  className?: string;
  children?: React.ReactNode;
}) => {
  return (
    <div
      className={cn(
        "grid grid-cols-1 md:grid-cols-6 lg:grid-cols-5 md:grid-row-7 gap-4 lg:gap-8 mx-auto",
        className
      )}
    >
      {children}
    </div>
  );
};

export const BentoGridItem = ({
  className,
  title,
  description,
  id,
  img,
  imgClassName,
  titleClassName,
  spareImg,
}: {
  className?: string;
  title?: string | React.ReactNode;
  description?: string | React.ReactNode;
  id: number;
  img?: string;
  imgClassName?: string;
  titleClassName?: string;
  spareImg?: string;
}) => {
  return (
    <div
      className={cn(
        "row-span-1 relative overflow-hidden rounded-3xl group/bento hover:shadow-xl transition duration-200 shadow-input dark:shadow-none justify-between flex flex-col space-y-4 border border-white/[0.1]",
        className
      )}
      style={{
        background: "rgb(4, 7, 29)",
        backgroundColor:
          "linear-gradient(90deg, rgba(4,7,29,1) 0%, rgba(12,14,35,1) 100%)",
      }}
    >
      <div className={`${id === 6 && "flex justify-center"} h-full`}>
        <div className="w-full h-full absolute">
          {img && (
            <Image
              width={100}
              height={100}
              src={img}
              alt={img}
              className={cn(imgClassName, "object-cover object-center")}
            />
          )}
        </div>

        <div
          className={`absolute right-0 -bottom-5 ${
            id === 5 && "w-full opacity-80"
          }`}
        >
          {spareImg && (
            <Image
              width={100}
              height={100}
              src={spareImg}
              alt={spareImg}
              className={"object-cover object-center w-full h-full"}
            />
          )}
        </div>
        {id === 6 && (
          <BackgroundGradientAnimation>
            {/* <div className="absolute z-50 inset-0 flex items-center justify-center text-white font-bold px-4 pointer-events-none text-3xl text-center md:text-4xl lg:text-7xl" /> */}
          </BackgroundGradientAnimation>
        )}

        <div
          className={cn(
            titleClassName,
            `group-hover/bento:scale-125 transition duration-200 relative md:h-full min-h-40 flex flex-col px- p-5 lg:p-16 ${
              id === 5 && "group-hover/bento:translate-x-8"
            }`
          )}
        >
          <div className="font-sans font-extralight md:max-w-32 md:text-xs lg:text-base text-sm text-[#C1C2D3] z-10">
            {description}
          </div>
          <div
            className={`font-sans text-lg lg:text-3xl max-w-96 font-bold z-10`}
          >
            {title}
          </div>

          {id === 2 && <GridGlobe />}

          {id === 3 && (
            <div className="flex gap-2 lg:gap-3 w-fit absolute -right-1 lg:-right-2">
              <div className="flex flex-col gap-3 lg:gap-1">
                {["Text to Video", "MP3 to Video", "MP4 to Video"].map((item) => (
                  <span
                    key={item}
                    className="py-2 lg:py-4 lg:px-5 px-3 text-xs lg:text-base opacity-50lg:opacity-100 rounded-lg text-center bg-[#10132E]"
                  >
                    {item}
                  </span>
                ))}
                <span className="py-4 px-3 rounded-lg text-center bg-[#10132E]" />
              </div>

              <div className="flex flex-col gap-3 lg:gap-1">
                <span className="py-4 px-3 rounded-lg text-center bg-[#10132E]" />
                {["English", "French", "France"].map((item) => (
                  <span
                    key={item}
                    className="py-2 lg:py-4 lg:px-3 px-3 text-xs lg:text-base opacity-50lg:opacity-100 rounded-lg text-center bg-[#10132E]"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>
          )}

          {id === 6 && (
            <div className="mt-5 relative">
              <div className={`absolute -bottom-5 right-0`}>
                <Lottie
                  options={{
                    animationData,
                    rendererSettings: {
                      preserveAspectRatio: "xMidYMid slice",
                    },
                  }}
                />
              </div>
              <MagicButton
                title={"Hire me"}
                icon={<RiThumbUpLine />}
                position="left"
                otherClasses="bg-[#161a31]"
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
