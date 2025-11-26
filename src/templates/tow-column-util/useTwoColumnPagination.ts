import {
  useState,
  useRef,
  useLayoutEffect,
  useEffect,
  useCallback,
  useMemo,
} from "react";
import type { PageColumns, SectionInput, SectionMeasured } from "./twoColumnTypes";

interface UsePaginationProps {
  sections: SectionInput[];
  header: React.ReactNode;
  deps: any[]; // cambios que deben disparar re-medición (Redux, props, etc.)
  pageHeight?: number;
  verticalMargin?: number;
}

export const useTwoColumnPagination = ({
  sections,
  header,
  deps,
  pageHeight = 1122,
  verticalMargin = 40, // cv-tokyo.scss / padding: 40px;
}: UsePaginationProps) => {
  const measureWrapperRef = useRef<HTMLDivElement | null>(null);
  const headerMeasureRef = useRef<HTMLDivElement | null>(null);
  const sectionRefs = useRef<Map<string, HTMLDivElement | null>>(new Map());

  const [pages, setPages] = useState<PageColumns[]>([]);
  const [measuring, setMeasuring] = useState(true);
  const inputsVersion = useRef(0);

  const measureElements = useMemo(() => {
    return sections.map((s) => ({
      ...s,
      ref: sectionRefs.current.get(s.name) ?? null,
    }));
  }, [sections]);

  const doPagination = useCallback(() => {
    if (!headerMeasureRef.current) return;

    const HEADER_HEIGHT = headerMeasureRef.current.offsetHeight || 0;
    const MAX_HEIGHT = pageHeight - verticalMargin - HEADER_HEIGHT;

    const measured: SectionMeasured[] = measureElements.map((s) => {
      const el = sectionRefs.current.get(s.name);
      const h = el ? el.offsetHeight : 0;

      return {
        name: s.name,
        orientation: s.orientation,
        height: h + 24 + 20,
        element: s.render,
      };
    });

    const result: PageColumns[] = [];

    let current: PageColumns = { left: [], right: [] };
    let leftH = 0;
    let rightH = 0;

    measured.forEach((sec) => {
      const h = sec.height;

      if (sec.orientation === "vertical") {
        if (leftH + h <= MAX_HEIGHT) {
          current.left.push(sec);
          leftH += h;
          return;
        }
        if (rightH + h <= MAX_HEIGHT) {
          current.right.push(sec);
          rightH += h;
          return;
        }

        result.push(current);
        current = { left: [sec], right: [] };
        leftH = h;
        rightH = 0;
        return;
      }

      if (sec.orientation === "horizontal") {
        if (rightH + h <= MAX_HEIGHT) {
          current.right.push(sec);
          rightH += h;
          return;
        }

        result.push(current);
        current = { left: [], right: [sec] };
        leftH = 0;
        rightH = h;
        return;
      }
    });

    result.push(current);

    const CLEAN_THRESHOLD = 40;

    const cleaned = result.filter((p, index) => {
      // PRIMERA PÁGINA — SIEMPRE se muestra
      if (index === 0) return true;

      // DEMÁS PÁGINAS — Se eliminan si están vacías
      return (
        p.left.some((s) => s.height > CLEAN_THRESHOLD) ||
        p.right.some((s) => s.height > CLEAN_THRESHOLD)
      );
    });

    setPages(cleaned.length ? cleaned : []);
    setMeasuring(false);
  }, [measureElements, pageHeight, verticalMargin]);

  useEffect(() => {
    inputsVersion.current += 1;
    setMeasuring(true);
  }, deps);

  useLayoutEffect(() => {
    if (!measuring) return;

    const raf = requestAnimationFrame(() => {
      const t = setTimeout(() => {
        doPagination();
      }, 0);

      return () => clearTimeout(t);
    });

    return () => cancelAnimationFrame(raf);
  }, [doPagination, measuring, measureElements]);

  useEffect(() => {
    if (!ResizeObserver) return;
    const ro = new ResizeObserver(() => setMeasuring(true));

    if (measureWrapperRef.current) ro.observe(measureWrapperRef.current);
    sectionRefs.current.forEach((el) => el && ro.observe(el));

    return () => ro.disconnect();
  }, [measureElements]);

  return {
    pages,
    measuring,
    measureWrapperRef,
    headerMeasureRef,
    sectionRefs,
    header,
    measureElements,
  };
};
