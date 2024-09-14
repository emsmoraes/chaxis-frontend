import { useState, useEffect } from "react";

interface UseResponsiveReturn {
  isSmall: boolean;
  isMedium: boolean;
  isLarge: boolean;
  isExtraLarge: boolean;
}

export function useResponsive(): UseResponsiveReturn {
  const [sizes, setSizes] = useState<UseResponsiveReturn>({
    isSmall: false,
    isMedium: false,
    isLarge: false,
    isExtraLarge: false,
  });

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      setSizes({
        isSmall: width < 640,
        isMedium: width >= 640 && width < 1024,
        isLarge: width >= 1024 && width < 1280,
        isExtraLarge: width >= 1280,
      });
    };

    handleResize();

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return sizes;
}
