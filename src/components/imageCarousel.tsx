import React, { useEffect, useState } from 'react';
import { Box, IconButton } from '@mui/material';
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from 'react-icons/md';
import Image from 'next/image';

const ImageCarousel = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);

  const images = [
    { id: 1, alt: "Image 1" },
    { id: 2, alt: "Image 2" },
    { id: 3, alt: "Image 3" },
    { id: 4, alt: "Image 4" },
    { id: 5, alt: "Image 5" },
    { id: 6, alt: "Image 6" }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % images.length);
    }, 7000);

    return () => clearInterval(timer);
  }, [images.length]);

  const handlePrevious = () => {
    setActiveIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setActiveIndex((prev) => (prev + 1) % images.length);
  };

  // Touch handlers for mobile swipe
  const handleTouchStart = (e) => {
    setTouchStart(e.touches[0].clientX);
  };

  const handleTouchMove = (e) => {
    setTouchEnd(e.touches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (touchStart - touchEnd > 100) {
      handleNext();
    }
    if (touchStart - touchEnd < -100) {
      handlePrevious();
    }
  };

  return (
    <div className="w-full px-4 sm:px-6 lg:px-8 my-14">
      <div className="max-w-7xl mx-auto">
        <div 
          className="relative"
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          {/* Main carousel container */}
          <div className="relative h-48 sm:h-64 md:h-96 overflow-hidden rounded-lg">
            <div
              className="flex transition-transform duration-500 ease-out h-full"
              style={{
                transform: `translateX(-${activeIndex * 100}%)`,
                width: `${images.length * 100}%`,
              }}
            >
              {images.map((image, index) => (
                <div
                  key={image.id}
                  className="relative w-full h-full"
                  style={{ width: `${100 / images.length}%` }}
                >
                  <Image
                    width={100}
                    height={100}
                    src={`/api/placeholder/800/600`}
                    alt={image.alt}
                    className="w-full h-full object-cover"
                  />
                  {/* Optional overlay for text */}
                  <div className="absolute inset-0 bg-black bg-opacity-20" />
                </div>
              ))}
            </div>
          </div>

          {/* Navigation Buttons - Now properly positioned */}
          <div className="absolute inset-0 flex items-center justify-between px-4">
            <IconButton
              onClick={handlePrevious}
              className="bg-white/90 hover:bg-white"
              sx={{
                width: { xs: '35px', sm: '40px' },
                height: { xs: '35px', sm: '40px' },
                '&:hover': { backgroundColor: 'white' },
                boxShadow: '0 2px 4px rgba(0,0,0,0.2)',
              }}
            >
              <MdKeyboardArrowLeft className="text-gray-800" />
            </IconButton>

            <IconButton
              onClick={handleNext}
              className="bg-white/90 hover:bg-white"
              sx={{
                width: { xs: '35px', sm: '40px' },
                height: { xs: '35px', sm: '40px' },
                '&:hover': { backgroundColor: 'white' },
                boxShadow: '0 2px 4px rgba(0,0,0,0.2)',
              }}
            >
              <MdKeyboardArrowRight className="text-gray-800" />
            </IconButton>
          </div>

          {/* Dots indicators */}
          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
            {images.map((_, index) => (
              <button
                key={index}
                onClick={() => setActiveIndex(index)}
                className={`w-2 h-2 sm:w-3 sm:h-3 rounded-full transition-colors duration-200 ${
                  activeIndex === index ? 'bg-black' : 'bg-white/50'
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ImageCarousel;