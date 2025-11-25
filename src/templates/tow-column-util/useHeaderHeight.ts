// templates/CvTokyo/hooks/useHeaderHeight.ts
import { useEffect, useRef, useState } from "react";

export const useHeaderHeight = (deps: any[] = []) => {
  const headerRef = useRef<HTMLDivElement>(null);
  const [headerHeight, setHeaderHeight] = useState(0);

  useEffect(() => {
    if (headerRef.current) {
      setHeaderHeight(headerRef.current.getBoundingClientRect().height);
    }
  }, [headerRef, ...deps]);

  return { headerRef, headerHeight };
};