import { useState, useEffect } from "react";
import { GeneralConstants } from "../constants/GenralConstant";

interface ScreenWidthHookResult {
  screenWidth: number;
  isSmallScreen: boolean;
  isMiddleScreen: boolean;
}

const useScreenWidth = (
  breakpoint: number = GeneralConstants.sm,
  breakpointMd: number = GeneralConstants.md,
): ScreenWidthHookResult => {
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);
  const isSmallScreen = screenWidth < breakpoint;
  const isMiddleScreen = screenWidth < breakpointMd;
  useEffect(() => {
    const handleResize = () => {
      setScreenWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return { screenWidth, isSmallScreen, isMiddleScreen };
};

export default useScreenWidth;
