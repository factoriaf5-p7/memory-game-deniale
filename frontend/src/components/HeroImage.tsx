import { useEffect, useState } from "react";
import "../styles/HeroImage.css"
import { Player } from '@lottiefiles/react-lottie-player';

export const HeroImage = () => {
    const [fadeOut, setFadeOut] = useState(false);
  
    useEffect(() => {
      const timer = setTimeout(() => {
        setFadeOut(true);
      }, 2000);
  
      return () => clearTimeout(timer);
    }, []);
  
    return (
      <div data-testid="hero-image" className={`hero-image-container ${fadeOut ? "fade-out" : ""}`}>
        <div className={`hero-image ${fadeOut ? "fade-out" : ""}`}>
          <Player
            src="https://lottie.host/bd9e55a7-3825-4079-99f0-1ea05434cca3/oi4LG2hfTq.json"
            style={{ width: "100%", height: "100%" }}
            loop
            autoplay
            controls
          />
        </div>
      </div>
    );
  };