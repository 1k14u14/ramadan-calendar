import { useEffect, useState } from "react";

export default function usePrayerTimes() {
  const [timings, setTimings] = useState(null);
  const [hijriDate, setHijriDate] = useState(null);
  const [gregorianDate, setGregorianDate] = useState(null);
  const [location, setLocation] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  useEffect(() => {
    const fetchPrayerTimes = async (lat, lon) => {
      try {
        const today = new Date();
        const dateString = `${today.getDate()}-${
          today.getMonth() + 1
        }-${today.getFullYear()}`;
        
        const response = await fetch(
          `https://api.aladhan.com/v1/timings/${dateString}?latitude=${lat}&longitude=${lon}&method=2`
        );
        
        const data = await response.json();
        
        if (data.code !== 200) {
          throw new Error("Failed to fetch prayer times");
        }
        
        setTimings(data.data.timings);
        setHijriDate(data.data.date.hijri);
        setGregorianDate(data.data.date.gregorian);
        
        // ✅ Store correct coordinates
        setLocation({
          latitude: lat,
          longitude: lon,
        });
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };
    
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          fetchPrayerTimes(
            position.coords.latitude,
            position.coords.longitude
          );
        },
        () => {
          // fallback: Medan
          fetchPrayerTimes(3.5952, 98.6722);
        }
      );
    } else {
      fetchPrayerTimes(3.5952, 98.6722);
    }
  }, []);
  return { timings, hijriDate, gregorianDate, location, loading, error };
}