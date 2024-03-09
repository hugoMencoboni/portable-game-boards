import { useEffect, useState } from "react";

export const breakPoints = {
  xs: 0,
  sm: 600,
  md: 960,
  lg: 1280,
  xl: 1920,
  xxl: Infinity,
};

const getWidthBreakpoint = (width: number) => {
  if (width < breakPoints.sm) return breakPoints.sm;
  if (width < breakPoints.md) return breakPoints.md;
  if (width < breakPoints.lg) return breakPoints.lg;
  if (width < breakPoints.xl) return breakPoints.xl;
  return breakPoints.xxl;
};

const useWidthBreakpoint = () => {
  const [screenWidth, setScreenWidth] = useState(
    getWidthBreakpoint(window.screen.width)
  );

  useEffect(() => {
    function handleResize() {
      setScreenWidth(getWidthBreakpoint(window.innerWidth));
    }

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return screenWidth;
};

export default useWidthBreakpoint;
