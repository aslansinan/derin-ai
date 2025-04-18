"use client"
import { useEffect, useState } from "react";

export const MOBILE_WIDTH = 1024;

const useIsMobile = (width: number = MOBILE_WIDTH) => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const handleResize = () => {
        const body = document.querySelector("body");
        if (body) {
          setIsMobile(body.clientWidth <= width);
        }
      };
      window.addEventListener("resize", handleResize);
      handleResize();
      return () => {
        window.removeEventListener("resize", handleResize);
      };
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return isMobile;
};

export default useIsMobile;
