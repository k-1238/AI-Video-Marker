import React, { useState } from 'react';
import { HiMenu } from 'react-icons/hi';
import { IoMdClose } from 'react-icons/io';
import Button from '@mui/material/Button';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from "framer-motion";
import { createTheme } from "@mui/material/styles";
import { GiArtificialHive } from "react-icons/gi";
import VideoHeroCard from '@/components/videoHeroCard';
import VideoCard from '@/components/videoCard';
import ImageCarousel from '@/components/imageCarousel';
import FeatureCard from '@/components/featureCard';
import PortraitWork from '../public/portraitworking.jpg'
import { FaFacebook, FaInstagram, FaTwitter, FaLinkedin } from 'react-icons/fa';
import { signOut, useSession } from 'next-auth/react';
import { FloatingNav } from '@/components/ui/FloatingNav';
import Hero from '@/components/Hero';
import Grid from '@/components/Grid';
import RecentProjects from '@/components/RecentProjects';
import Footer from '@/components/Footer';
import Approach from '@/components/Approach';
import Experience from '@/components/Experience';
import AstroCard from '@/components/AstroCard';
import loadingAnimation  from "../data/triangle.json";
import Lottie from 'react-lottie';

const videos = [
  { title: "Video 1", thumbnail: "https://via.placeholder.com/300x180" },
  { title: "Video 2", thumbnail: "https://via.placeholder.com/300x180" },
  { title: "Video 3", thumbnail: "https://via.placeholder.com/300x180" },
  { title: "Video 4", thumbnail: "https://via.placeholder.com/300x180" },
  { title: "Video 5", thumbnail: "https://via.placeholder.com/300x180" },
  { title: "Video 6", thumbnail: "https://via.placeholder.com/300x180" },
];

const Page = () => {
  const { status } = useSession();

  if (status === "loading") {
    return (
    <div className="flex items-center justify-center h-screen">
        <Lottie options={{loop: true, animationData: loadingAnimation}} height={200} width={200}/>
      </div>
    )
  }

  return (
   
      <main className="relative bg-black-100 flex justify-center items-center flex-col mx-auto sm:px-10 px-5 overflow-hidden">
        <div className="max-w-7xl w-full">
          <FloatingNav />
          <Hero />
          <Grid />
          <AstroCard />
          <RecentProjects />
          <Experience />
          <Approach />
          <Footer />
        </div>
      </main>

  );

}

export default Page;
