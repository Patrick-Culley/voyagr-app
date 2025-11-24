import { useEffect, useState } from "react";

export default function useLoadGoogleMaps() {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    // If already loaded, skip loading again
    if (window.google && window.google.maps) {
      setLoaded(true);
      return;
    }

    const script = document.createElement("script");
    script.src = `https://maps.googleapis.com/maps/api/js?key=${process.env.REACT_APP_GOOGLE_MAPS_KEY}&libraries=places`;
    script.async = true;
    script.onload = () => setLoaded(true);

    document.body.appendChild(script);
  }, []);

  return loaded;
}
