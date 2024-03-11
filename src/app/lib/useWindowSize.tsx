import { useState, useEffect } from "react";

const useWindowSize = () => {
  const [isWindowSizeBelow992, setIsWindowSizeBelow992] =
    useState<any>(undefined);

  useEffect(() => {
    const handleResize = () => {
      setIsWindowSizeBelow992(window.innerWidth < 992);
    };

    // Initial check on mount
    handleResize();

    // Attach event listener for window resize
    window.addEventListener("resize", handleResize);

    // Clean up the event listener on unmount
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return isWindowSizeBelow992;
};

export default useWindowSize;
