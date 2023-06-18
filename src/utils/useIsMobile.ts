import { useState, useRef, useEffect, useCallback } from "react";

const useIsMobile = (mobileScreenSize = 600) => {
    if (typeof window.matchMedia !== "function") {
        throw Error("matchMedia not supported by browser!");
    }

    const mediaListenerRef = useRef(
        window.matchMedia(`(max-width: ${mobileScreenSize}px)`)
    );

    const [isMobile, setIsMobile] = useState(mediaListenerRef.current.matches);

    const checkIsMobile = useCallback((event) => {
        setIsMobile(event.matches);
    }, []);

    useEffect(() => {
        const mediaListener = mediaListenerRef.current;
        // try catch used to fallback for browser compatibility
        mediaListener.addEventListener("change", checkIsMobile);
        return () => {
            mediaListener.removeEventListener("change", checkIsMobile);
        };
    }, [checkIsMobile]);

    return isMobile;
};

export default useIsMobile;
