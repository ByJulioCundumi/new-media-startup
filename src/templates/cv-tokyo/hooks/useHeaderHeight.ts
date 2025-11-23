// templates/CvTokyo/hooks/useHeaderHeight.ts
import { useEffect, useRef, useState } from "react";
import { HEADER_HEIGHT_INITIAL } from "../constants";

export const useHeaderHeight = (deps: any[] = []) => {
  const headerRef = useRef<HTMLDivElement>(null);
  const [headerHeight, setHeaderHeight] = useState(HEADER_HEIGHT_INITIAL);

  useEffect(() => {
    if (headerRef.current) {
      setHeaderHeight(headerRef.current.getBoundingClientRect().height);
    }
  }, [headerRef, ...deps]);

  return { headerRef, headerHeight };
};