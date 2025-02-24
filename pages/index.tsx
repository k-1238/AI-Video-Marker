import React, { useState } from 'react';
import { HiMenu } from 'react-icons/hi';
import { IoMdClose } from 'react-icons/io';
import Button from '@mui/material/Button';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from "framer-motion";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { GiArtificialHive } from "react-icons/gi";
import VideoHeroCard from '@/components/videoHeroCard';
import VideoCard from '@/components/videoCard';
import ImageCarousel from '@/components/imageCarousel';
import FeatureCard from '@/components/featureCard';
import PortraitWork from '../public/portraitworking.jpg'
import { FaFacebook, FaInstagram, FaTwitter, FaLinkedin } from 'react-icons/fa';
import { signOut, useSession } from 'next-auth/react';


const theme = createTheme({
  palette: {
    primary: {
      main: "#4fc3f7", // Light blue A400
    },
    secondary: {
      main: "#f50057", // Example secondary color
    },
  },
});

const videos = [
  { title: "Video 1", thumbnail: "https://via.placeholder.com/300x180" },
  { title: "Video 2", thumbnail: "https://via.placeholder.com/300x180" },
  { title: "Video 3", thumbnail: "https://via.placeholder.com/300x180" },
  { title: "Video 4", thumbnail: "https://via.placeholder.com/300x180" },
  { title: "Video 5", thumbnail: "https://via.placeholder.com/300x180" },
  { title: "Video 6", thumbnail: "https://via.placeholder.com/300x180" },
];

const Page = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { data, status } = useSession();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const navItems = [
    // { name: 'Features', href: '#features' },
    { name: 'Pricing', href: '/cardprice' },
    // { name: 'Enterprise', href: '#enterprise' },
    // { name: 'Resources', href: '#resources' }
  ];

  if (status === "loading") {
    return <div>Loading...</div>
  }

  return (

    <ThemeProvider theme={theme}>
      <div className="w-full min-h-screen bg-white">
        {/* Navigation */}
        <nav className="fixed top-0 w-full bg-white shadow-sm z-50 p-6">
          <div className="w-full mx-auto px-6 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
              {/* Logo */}
              <div className="flex-shrink-0 flex items-center">
                <GiArtificialHive className="text-blue-600 w-10 h-10 mr-2" /> {/* Icon */}
                <span className="text-4xl font-bold text-blue-600">VidioGen.com</span>
              </div>
              {/* Desktop Navigation */}
              <div className="hidden md:flex items-center space-x-8">
                {navItems.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    className="text-gray-600 hover:text-blue-600 transition-colors"
                  >
                    {item.name}
                  </Link>
                ))}
                <div className="flex space-x-4">
                  {
                    !data && (
                      <>
                        <Link href="/sign-in" passHref>
                          <Button variant="outlined" color="primary">
                            Sign In
                          </Button>
                        </Link>
                        <Link href="/sign-up" passHref>
                          <Button variant="contained">
                            <span className="text-white">Sign Up</span>
                          </Button>
                        </Link>
                      </>
                    )
                  }
                  {
                    data && (
                      <Button
                        className='w-full'
                        variant="contained"
                        onClick={() => {
                          signOut()
                        }}
                      >
                        <span className='text-white'>Sign Out</span>
                      </Button>
                    )
                  }
                </div>
              </div>
              {/* Mobile menu button */}
              <div className="md:hidden">
                <button
                  onClick={toggleMenu}
                  className="text-gray-600 hover:text-gray-900 p-2"
                >
                  {isMenuOpen ? (
                    <IoMdClose className="w-6 h-6" />
                  ) : (
                    <HiMenu className="w-6 h-6" />
                  )}
                </button>
              </div>
            </div>
          </div>
          {/* Mobile Navigation */}
          {isMenuOpen && (
            <div className="md:hidden">
              <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white shadow-lg mb-2">
                {navItems.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    className="w-full flex justify-center block border border-gray-400 px-3 py-2 text-gray-600 hover:text-blue-600 transition-colors"
                  >
                    {item.name}
                  </Link>
                ))}
                <div className="flex flex-col gap-3">
                  {
                    !data && (
                      <div className='w-full flex flex-col gap-2 mt-2'>
                        <Link href="/sign-in" passHref>
                          <Button variant="outlined" color="primary" className='w-full' >
                            Sign In
                          </Button>
                        </Link>
                        <Link href="/sign-up" passHref>
                          <Button variant="contained" className='w-full' >
                            <span className="text-white">Sign Up</span>
                          </Button>
                        </Link>
                      </div>
                    )
                  }
                  {
                    data && (
                      <Button
                        className='w-full'
                        variant="contained"
                        onClick={() => {
                          signOut()
                        }}
                      >
                        <span className='text-white'>Sign Out</span>
                      </Button>
                    )
                  }
                </div>
              </div>
            </div>
          )}
        </nav>

        {/* Hero Section */}
        <div className="pt-40 pb-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="text-center">
              <h1 className="text-4xl md:text-6xl text-blue-500 font-bold mb-14">
                Create Engaging Videos <br className="hidden sm:block" />
              </h1>
              <p className="text-xl text-gray-600 mb-14 mt-8 max-w-3xl mx-auto">
                Transform your content into captivating videos with AI-powered tools.
                Perfect for marketing teams and content creators.
              </p>
              <div className="flex flex-col sm:flex-row justify-center gap-4 mb-14">
                <Link href="/app/dashboard" passHref>
                  <Button
                    variant="contained"
                    size="large"
                    sx={{
                      fontSize: '1.5rem', // Increase font size
                      padding: '12px 24px', // Adjust padding
                      borderRadius: "20px"
                    }}
                  >
                    <span className="text-white">Get Started</span>
                  </Button>
                </Link>
              </div>

              <VideoHeroCard />
            </div>
          </div>
        </div>

        {/* Features Grid */}
        <div className="bg-blue-300 py-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <motion.h2
              className="text-3xl text-center md:text-5xl md:text-center text-white font-semibold mb-4"
              initial={{ opacity: 0, y: -20 }} // Starts invisible and slightly above
              whileInView={{ opacity: 1, y: 0 }} // Fades in and moves to position
              viewport={{ once: true }} // Triggers animation only once
              transition={{ duration: 0.7 }} // Smooth animation
            >
              Check Out Offered Features
            </motion.h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-8">
              {[1, 2, 3, 4, 5, 6].map((item, index) => (
                <motion.div
                  key={item}
                  initial={{ opacity: 0, y: 50 }} // Starts invisible and below the viewport
                  whileInView={{ opacity: 1, y: 0 }} // Animates into view
                  viewport={{ once: true }} // Triggers animation only once
                  transition={{ duration: 0.5, delay: index * 0.2 }} // Adds staggered effect
                >
                  <FeatureCard key={item} featureNumber={item} />
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* Carousel Section */}
        <div className="min-h-dvh mt-16 bg-gray-100 py-20 shadow-md">
          <div className="w-full mx-auto px-8 flex flex-col md:flex-row justify-between gap-10">
            {/* Left Side - Carousel */}
            <div className="flex-1 w-full">
              <ImageCarousel />
            </div>

            {/* Right Side - Text */}
            <div className="flex-1 flex flex-col gap-8 w-full">
              {/* Top Section */}
              <h2 className="text-3xl text-center md:text-4xl md:text-left text-indigo-500 font-semibold p-6">
                Explore Stunning Templates Try Out
              </h2>
              <div className="w-full md:w-3/4 flex flex-col gap-4 p-6">

                <p className="text-lg text-gray-600 mt-4">
                  Customize and transform our professionally designed templates to suit your content needs. Perfect for creating impactful and engaging videos quickly.
                </p>
                <Link
                  href={"/app/choose-template"}
                  className="text-blue-600 hover:text-blue-900 transition-colors mt-4"
                >
                  Get started for free
                </Link>

                <div className='border-b-2 border-gray-300 mt-8'></div>
              </div>

              {/* Bottom Section */}
              <div className="w-full md:w-3/4 flex flex-col gap-4 p-6">
                <p className="text-lg text-gray-400">
                  Save time and effort with templates optimized for marketing, social media, and personal use. Customize and transform our professionally designed templates to suit your content needs. Perfect for creating impactful and engaging videos quickly.
                </p>
                <span className='mt-4 text-2xl text-gray-400 text-right'>Siem</span>
              </div>
            </div>
          </div>
        </div>

        {/* Video Section */}
        <div className="py-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            {/* Video Section Header */}
            <h2 className="text-3xl text-center md:text-5xl text-indigo-400 font-semibold mb-4">
              Check Out Our Example Videos
            </h2>

            {/* Video Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mt-10">
              {videos.map((video, index) => (
                <VideoCard
                  key={index}
                  videoThumbnail={video.thumbnail}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Portrait Section */}

        <div className="flex flex-col md:flex-row items-center justify-center gap-8 py-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-8 w-full">
            {/* Left Side: Text */}
            <div className="flex-1 flex flex-col justify-center items-start text-left">
              <h2 className="text-2xl md:text-4xl font-bold mb-4 text-blue-800 leading-relaxed">
                Inspiring Creativity For Newer Generation
              </h2>
              <p className="w-full text-center md:w-2/4 md:text-left text-lg my-10">
                Discover the art of innovation and creativity with our portrait
                section. This Section introduce new tools.
              </p>
              <Link
                href={"/app/dashboard"}
                className="text-blue-600 hover:text-blue-900 transition-colors mt-4"
              >
                Get started for free
              </Link>
            </div>

            {/* Right Side: Image */}
            <div className="flex-1">
              <Image
                src={PortraitWork}
                alt="Portrait Work"
                className="rounded-lg shadow-md"
                layout="responsive" // Ensures proper responsiveness
                objectFit="cover" // Adjusts object fit to ensure coverage
                priority // Optimizes loading
              />
            </div>
          </div>
        </div>

        {/* Footer Section */}
        <div className="bg-gray-700 text-gray-300 py-12 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto flex flex-col lg:flex-row justify-between gap-8">
            {/* Left Side: Logo and CTA */}
            <div className="flex-1 flex flex-col">
              {/* Logo */}
              <span className="text-4xl font-bold text-white mb-6">
                VideoEditor
              </span>

              {/* Call-to-Action */}
              <p className="text-gray-400 text-lg mb-6">
                Join thousands of creators transforming their content into captivating videos today.
              </p>
              {/* <Button
        variant="contained"
        color="primary"
        size="large"
        sx={{
          backgroundColor: "#4fc3f7",
          color: "#fff",
          borderRadius: "30px",
          padding: "10px 24px",
          fontSize: "1.2rem",
          "&:hover": {
            backgroundColor: "#36a2cf",
          },
        }}
      >
        Get Started for Free
      </Button> */}
            </div>

            {/* Middle Section: Links */}
            <div className="flex-1 grid grid-cols-2 md:grid-cols-3 gap-8">
              <div>
                <h4 className="text-lg font-semibold text-white mb-4">Product</h4>
                <ul className="space-y-2">
                  <li><a href="#features" className="hover:text-blue-400">Features</a></li>
                  <li><a href="#pricing" className="hover:text-blue-400">Pricing</a></li>
                  <li><a href="#templates" className="hover:text-blue-400">Templates</a></li>
                </ul>
              </div>
              <div>
                <h4 className="text-lg font-semibold text-white mb-4">Company</h4>
                <ul className="space-y-2">
                  <li><a href="#about" className="hover:text-blue-400">About Us</a></li>
                  <li><a href="#careers" className="hover:text-blue-400">Careers</a></li>
                  <li><a href="#blog" className="hover:text-blue-400">Blog</a></li>
                </ul>
              </div>
              <div>
                <h4 className="text-lg font-semibold text-white mb-4">Support</h4>
                <ul className="space-y-2">
                  <li><a href="#faq" className="hover:text-blue-400">FAQs</a></li>
                  <li><a href="#help" className="hover:text-blue-400">Help Center</a></li>
                  <li><a href="#contact" className="hover:text-blue-400">Contact Us</a></li>
                </ul>
              </div>
            </div>

            {/* Right Side: Social Media */}
            <div className="flex-1 flex flex-col items-start lg:items-end">
              <h4 className="text-lg font-semibold text-white mb-4">Follow Us</h4>
              <div className="flex gap-4">
                <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-blue-500">
                  <FaFacebook className="w-6 h-6" />
                </a>
                <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-blue-500">
                  <FaTwitter className="w-6 h-6" />
                </a>
                <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-blue-500">
                  <FaInstagram className="w-6 h-6" />
                </a>
                <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-blue-500">
                  <FaLinkedin className="w-6 h-6" />
                </a>
              </div>
            </div>
          </div>


        </div>
        {/* Footer Bottom */}
        <div className="w-full bg-gray-900 p-3 text-center text-sm text-gray-500">
          <p>© 2025 VideoEditor. All rights reserved.</p>
          <p>
            <a href="#privacy" className="hover:text-blue-400">Privacy Policy</a> |
            <a href="#terms" className="hover:text-blue-400"> Terms of Service</a>
          </p>
        </div>



      </div>
    </ThemeProvider>

  );

}

export default Page;
