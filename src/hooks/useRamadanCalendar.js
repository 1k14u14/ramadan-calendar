import { useEffect, useState } from "react";

export default function useRamadanCalendar(hijriYear, latitude, longitude) {
  const [calendar, setCalendar] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!hijriYear || !latitude || !longitude)
    return;
    
    fetch(
      `https://api.aladhan.com/v1/hijriCalendar?latitude=${latitude}&longitude=${longitude}&method=20&month=9&year=${hijriYear}`
    )
    .then(res => res.json())
    .then(data => {
      if (data.code === 200) {
        setCalendar(data.data);
      } else {
        console.error("Ramadan fetch failed:", data);
      }
        setLoading(false);
      })
      .catch(err => {
        console.error("Fetch error:", err);
        setLoading(false);
      });
  }, [hijriYear]);

  return { calendar, loading };
}