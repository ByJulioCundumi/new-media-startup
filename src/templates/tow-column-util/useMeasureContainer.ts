import { useLayoutEffect, useRef } from "react";
import type { ISizeProps } from "../../interfaces/ISectionsMeasure";

export const useMeasureContainer = (
  onChange: (size: ISizeProps) => void
) => {
  const ref = useRef<HTMLDivElement | null>(null);

  useLayoutEffect(() => {
    if (!ref.current) return;

    const measure = () => {
      const el = ref.current!;
      const style = window.getComputedStyle(el);
      const rect = el.getBoundingClientRect();

      const width = rect.width;
      const height = el.offsetHeight;
      const paddingTop = parseFloat(style.paddingTop);
      const paddingBottom = parseFloat(style.paddingBottom);
      const marginTop = parseFloat(style.marginTop);
      const marginBottom = parseFloat(style.marginBottom);
      const totalHeight = height + marginTop + marginBottom;

      onChange({
        width,
        height,
        top: rect.top,
        left: rect.left,
        paddingTop,
        paddingBottom,
        marginTop,
        marginBottom,
        totalHeight,
      });
    };

    const ro = new ResizeObserver(measure);
    ro.observe(ref.current);

    measure(); // inicial

    return () => ro.disconnect();
  }, [onChange]);

  return ref;
};
