import React, { useState, useEffect } from 'react';
import { TypeAnimation } from 'react-type-animation';
import { useNavigate } from 'react-router-dom';

function Slider() {
  const navigate = useNavigate();

  const slides = [
    {
      id: 1,
      heading: 'Welcome to Siyu Market!',
      description: 'Your one-stop shop for all your needs. Explore a variety of affordable and high-quality products.',
      color: 'bg-blue-500',
      buttonText: 'Explore Products',
      buttonLink: '/products',
    },
    {
      id: 2,
      heading: 'Discover Amazing Deals',
      description: 'Unbeatable prices on clothing, jewelry, perfumes, and much more. Don’t miss out!',
      color: 'bg-green-500',
      buttonText: 'View Deals',
      buttonLink: '/products',
    },
    {
      id: 3,
      heading: 'Shop with Confidence',
      description: 'Enjoy a seamless shopping experience with trusted vendors and reliable delivery.',
      color: 'bg-purple-500',
      buttonText: 'Start Shopping',
      buttonLink: '/products',
    },
    {
      id: 4,
      heading: 'Save Big Today!',
      description: 'Exciting discounts and offers await you. Join Siyu Market now!',
      color: 'bg-red-500',
      buttonText: 'Join Us',
      buttonLink: '/signup',
    },
  ];

  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 4000); 
    return () => clearInterval(interval); 
  }, [slides.length]);

  return (
    <div className="relative w-full my-[10px] h-[400px] md:h-[500px] overflow-hidden">
      {slides.map((slide, index) => (
        <div
          key={slide.id}
          className={`absolute inset-0 flex flex-col items-center justify-center text-white transition-all duration-700 ease-in-out ${
            index === currentSlide ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
          } ${slide.color}`}
        >
          <TypeAnimation
            key={currentSlide}
            sequence={[slide.heading]}
            wrapper="h1"
            speed={50}
            className="text-2xl md:text-4xl lg:text-5xl font-bold mb-4 text-center px-4"
          />
          <p className="text-sm md:text-lg lg:text-xl mb-6 text-center px-4 max-w-[90%] md:max-w-[70%]">
            {slide.description}
          </p>
          <button
            onClick={() => {
              navigate("/products");
            }}
            className="rounded-[4px] px-8 py-3 md:px-12 md:py-4 bg-white text-black hover:bg-gray-200 transition duration-300 text-sm md:text-base"
          >
            {slide.buttonText}
          </button>
        </div>
      ))}

      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {slides.map((_, index) => (
          <button
            key={index}
            className={`w-3 h-3 md:w-4 md:h-4 rounded-full ${
              index === currentSlide ? 'bg-white' : 'bg-gray-400'
            }`}
            onClick={() => setCurrentSlide(index)}
          />
        ))}
      </div>
    </div>
  );
}

export default Slider;
