import { useEffect, useState } from "react";
import "./splash.css";

export default function SplashScreen({ onFinish }) {
  const [hide, setHide] = useState(false);

  useEffect(() => {
    const fadeTimer = setTimeout(() => setHide(true), 1500);
    const endTimer = setTimeout(onFinish, 2000);

    return () => {
      clearTimeout(fadeTimer);
      clearTimeout(endTimer);
    };
  }, [onFinish]);

  return (
    <div className={`splash ${hide ? "fade-out" : ""}`}>
      <div className="content">
        <h1>Ramadan Calendar</h1>
        <p>Prayer Times • Fasting • Hijri Date</p>
      </div>
    </div>
  );
}