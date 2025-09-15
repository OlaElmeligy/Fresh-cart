'use client';
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import img1 from "../../../../public/images/images/slider-image-1.jpeg";
import img2 from "../../../../public/images/images/slider-image-2.jpeg";
import img3 from "../../../../public/images/images/slider-image-3.jpeg";
import img4 from "../../../../public/images/images/slider-2.jpeg";

const images = [img1, img2, img3, img4];

export default function MainSlider() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(true);
  const totalSlides = images.length;
  const transitionDuration = 700; // ms

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prevIndex) => prevIndex + 1);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (activeIndex === totalSlides) {
      // Wait for the transition to the cloned first image to complete
      const timeout = setTimeout(() => {
        setIsTransitioning(false); // Disable transition
        setActiveIndex(0); // Jump to actual first image
        
        // Re-enable transition after a brief moment
        setTimeout(() => {
          setIsTransitioning(true);
        }, 50);
      }, transitionDuration);
      
      return () => clearTimeout(timeout);
    }
  }, [activeIndex, totalSlides, transitionDuration]);

  return (
    <div className="relative w-[90%]  mx-auto overflow-hidden">
      <div className="relative h-64 md:h-96 overflow-hidden">
        <div
          className="flex"
          style={{
            transform: `translateX(-${activeIndex * 100}%)`,
            transition: isTransitioning ? `transform ${transitionDuration}ms ease-in-out` : 'none',
          }}
        >
          {/* Images + cloned first image at the end for seamless loop */}
          {[...images, images[0]].map((src, index) => (
            <div key={index} className="min-w-full relative h-64 md:h-96">
              <Image
                src={src}
                alt={`Slide ${index + 1}`}
                fill
                style={{ objectFit: 'cover' }}
                priority={index === 0}
              />
            </div>
          ))}
        </div>
      </div>
       {/* Dot indicators */}
      <div className="flex justify-center mt-4 space-x-2">
        {images.map((_, index) => (
          <button
            key={index}
            onClick={() => {
              setActiveIndex(index);
              setIsTransitioning(true);
            }}
            className={`w-2 h-2 rounded-full transition-colors duration-300 ${
              activeIndex === index || (activeIndex === totalSlides && index === 0)
                ? 'bg-green-600' 
                : 'bg-gray-300 hover:bg-gray-400'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
}