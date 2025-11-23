// templates/CvTokyo/hooks/usePagination.ts
import { useEffect, useRef, useState, useCallback } from "react";
import { PAGE_HEIGHT_PX, SECTION_GAP } from "../constants";

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
  const [pages, setPages] = useState<Page[]>([{ left: [], right: [] }]);

  // Generamos claves únicas
  const measuredKeys = activeSections.map((s, i) => `${s.name}__${i}`);

  // Esta es la clave: función que devuelve un callback ref válido para React
  const getMeasureRef = useCallback((key: string) => {
    return (node: HTMLDivElement | null) => {
      measureRefs.current[key] = node;
    };
  }, []);

  // Función pura que construye las páginas
  const buildPages = (): Page[] => {
    const pages: Page[] = [];
    let current: Page = { left: [], right: [] };
    let leftH = headerHeight;
    let rightH = headerHeight;

    activeSections.forEach((sec, i) => {
      const key = measuredKeys[i];
      const node = measureRefs.current[key];
      const height = node?.getBoundingClientRect().height ?? 200;

      const isVertical = sec.orientation === "both";
      const canLeft = isVertical;
      const canRight = sec.orientation === "horizontal";

      let placed = false;

      // Intenta izquierda
      if (canLeft) {
        const gap = current.left.length > 0 ? SECTION_GAP : 0;
        if (leftH + height + gap <= PAGE_HEIGHT_PX) {
          current.left.push(sec.element);
          leftH += height + gap;
          placed = true;
        }
      }

      // Intenta derecha
      if (!placed && canRight) {
        const gap = current.right.length > 0 ? SECTION_GAP : 0;
        if (rightH + height + gap <= PAGE_HEIGHT_PX) {
          current.right.push(sec.element);
          rightH += height + gap;
          placed = true;
        }
      }

      // Nueva página si no cabe
      if (!placed) {
        pages.push(current);
        current = { left: [], right: [] };
        leftH = headerHeight;
        rightH = headerHeight;

        if (canLeft) {
          current.left.push(sec.element);
          leftH += height;
        } else {
          current.right.push(sec.element);
          rightH += height;
        }
      }
    });

    pages.push(current);
    return pages;
  };

  useEffect(() => {
    let raf1 = 0;
    let raf2 = 0;

    const measure = () => {
      raf2 = requestAnimationFrame(() => {
        try {
          setPages(buildPages());
        } catch (err) {
          console.error("Error en paginación:", err);
          setPages([
            {
              left: activeSections.filter(s => s.orientation === "both").map(s => s.element),
              right: activeSections.filter(s => s.orientation === "horizontal").map(s => s.element),
            },
          ]);
        }
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
    getMeasureRef,     // ← Ahora sí, 100% compatible con ref={getMeasureRef(key)}
    measuredKeys,
  };
};