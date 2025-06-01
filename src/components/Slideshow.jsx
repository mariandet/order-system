import React, { useState, useEffect } from "react";
import "./Slideshow.css";  

const slideshowImages = [
  "slide1.png",
  "slide2.webp",
  "slide3.png",
  "slide4.jpg"
];

export default function Slideshow() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prevIndex) => (prevIndex + 1) % slideshowImages.length);
    }, 4000); // Change image every 4 seconds

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="slideshow">
      {slideshowImages.map((img, i) => (
        <img
          key={i}
          src={img}
          alt={`slide-${i}`}
          className={`slide ${i === index ? "active" : ""}`}
        />
      ))}
    </div>
  );
}
