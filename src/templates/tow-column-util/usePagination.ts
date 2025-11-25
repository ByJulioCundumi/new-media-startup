import { useEffect, useRef, useState, useCallback } from "react";

type Section = {
  name: string;
  element: React.ReactNode;
  orientation: "both" | "horizontal";
};

type Page = { left: React.ReactNode[]; right: React.ReactNode[] };

export const usePagination = (
  activeSections: Section[],
  headerHeight: number,
  dependencies: any[]
) => {
  const measureRefs = useRef<Record<string, HTMLDivElement | null>>({});
  const [pages, setPages] = useState<Page[]>([]);

  const measuredKeys = activeSections.map((s, i) => `${s.name}__${i}`);

  const getMeasureRef = useCallback((key: string) => {
    return (node: HTMLDivElement | null) => {
      measureRefs.current[key] = node;
    };
  }, []);

  const buildPages = (): Page[] => {
    const result: Page[] = [];
    let current: Page = { left: [], right: [] };
    let leftH = headerHeight;
    let rightH = headerHeight;

    const addSection = (sec: Section, height: number, isLeft: boolean) => {
      if (isLeft) {
        current.left.push(sec.element);
        leftH += height;
      } else {
        current.right.push(sec.element);
        rightH += height;
      }
    };

    activeSections.forEach((sec, i) => {
      const key = measuredKeys[i];
      const node = measureRefs.current[key];
      const height = node?.getBoundingClientRect().height ?? 0;

      const isLeft = sec.orientation === "both";
      const isRight = sec.orientation === "horizontal";

      let fitsLeft = isLeft && (leftH + height + 1122); // width a4
      let fitsRight = isRight && (rightH + height + 1122); // width a4

      // --- Coloca donde quepa ---
      if (fitsLeft) {
        addSection(sec, height, true);
      } else if (fitsRight) {
        addSection(sec, height, false);
      } else {
        // --- No cabe → nueva página ---
        if (current.left.length || current.right.length) {
          result.push(current);
        }
        current = { left: [], right: [] };
        leftH = headerHeight;
        rightH = headerHeight;

        // Colocar sección en nueva página
        if (isLeft) {
          addSection(sec, height, true);
        } else {
          addSection(sec, height, false);
        }
      }
    });

    // Agregar última página
    if (current.left.length || current.right.length) {
      result.push(current);
    }

    return result;
  };

  useEffect(() => {
    let raf1 = 0;
    let raf2 = 0;

    const measure = () => {
      raf2 = requestAnimationFrame(() => {
        setPages(buildPages());
      });
    };

    raf1 = requestAnimationFrame(() => {
      raf2 = requestAnimationFrame(measure);
    });

    return () => {
      cancelAnimationFrame(raf1);
      cancelAnimationFrame(raf2);
    };
  }, [activeSections, headerHeight, getMeasureRef, ...dependencies]);

  return {
    pages,
    getMeasureRef,
    measuredKeys,
  };
};
