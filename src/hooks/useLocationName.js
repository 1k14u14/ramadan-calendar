import { useEffect, useState } from "react";

export default function useLocationName(latitude, longitude) {
  const [locationName, setLocation] = useState("");
  const [loadingName, setLoading] = useState(true);

  useEffect(() => {
    if (!latitude || !longitude) return;

    async function fetchLocation() {
        try {
            setLoading(true);
            
            const res = await fetch(
                `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}&localityLanguage=en`
            );
            
            const data = await res.json();
            
            const city =
            data.city || data.locality || data.principalSubdivision;
            const country = data.countryName;
            
            setLocation(`${city}, ${country}`);
        } catch (error) {
            console.error("Location name error:", error);
            setLocation("Unknown location");
        } finally {
            setLoading(false);
        }
    }
    
    fetchLocation();
}, [latitude, longitude]);

return { locationName, loadingName };
}