'use client';

import { useState, useEffect } from 'react';

export const useResponsive = (breakpoint = 768) => {

  const [isWideScreen, setIsWideScreen] = useState(() => {
    if (typeof window !== 'undefined') {
      return window.innerWidth > breakpoint;
    }
    return false; 
  });

  useEffect(() => {
    const handleResize = () => {
      setIsWideScreen(window.innerWidth > breakpoint);
    };

    window.addEventListener('resize', handleResize);

    handleResize();

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [breakpoint]);

  return isWideScreen;
};