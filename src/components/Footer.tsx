import React from "react";
import MagicButton from "./ui/MagicButton";
import { FaLocationArrow } from "react-icons/fa";
import { socialMedia } from "../../data";
import Image from "next/image";

const Footer = () => {
  return (
    <footer className="w-full pb-10 mb-[100px] md:mb-5" id="contact">
      <div className="flex flex-col items-center">
        <h1>
          Our videos speak thanks to our partner ElevenLabs.

        </h1>
        <img src="https://vexub.fr/images/elevenlabsgrantt_white_c.webp?w=500&amp;force_format=png" width={100} height={100} className="mb-12 w-[60%] max-w-[600px]" alt="ElevenLabs Logo" loading="lazy" />
        <a href="#">
          <MagicButton
            title="Get started - it's free!"
            icon={<FaLocationArrow />}
            position="right"
          />
        </a>
      </div>
      <div className="flex mt-16 md:flex-row flex-col justify-between items-center">
        <p className="md:text-base text-sm md:font-normal font-light">
          Copyright © 2024 Lan Truong
        </p>

        <div className="flex items-center md:gap-3 gap-6">
          {socialMedia.map((info) => (
            <div key={info.id}>
              <a
                href={info.link}
                rel="noreferrer noopener"
                target="_blank"
                className="w-10 h-10 cursor-pointer flex justify-center items-center backdrop-filter backdrop-blur-lg saturate-180 bg-opacity-75 bg-black-200 rounded-lg border border-black-300"
              >
                <Image src={info.img} alt="icons" width={20} height={20} />
              </a>
            </div>
          ))}
        </div>
      </div>
    </footer >
  );
};

export default Footer;
