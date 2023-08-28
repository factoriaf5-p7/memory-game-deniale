import { useEffect, useState } from "react";
import "../styles/HeroImage.css"

export const HeroImage = () => {
    const [fadeOut, setFadeOut] = useState(false);
  
    useEffect(() => {
      const timer = setTimeout(() => {
        setFadeOut(true);
      }, 2000);
  
      return () => clearTimeout(timer);
    }, []);
  
    return (
      <div className={`hero-image-container`}>
        <div className={`hero-image ${fadeOut ? "fade-out" : ""}`} />
      </div>
    );
  };