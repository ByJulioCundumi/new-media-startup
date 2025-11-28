// tow-column-util/useTwoColumnPagination.ts
import { useMemo } from "react";

export type MeasuredSection = {
  name: string;
  orientation: "vertical" | "horizontal" | "identity";
  height: number;
};

export type PageSpec = {
  vertical: string[];   // names of vertical sections in this page
  horizontal: string[]; // names of horizontal sections in this page
};

const PAGE_HEIGHT = 1122; // px

/**
 * useTwoColumnPagination
 * - measured: array of MeasuredSection (order preserved)
 * - headerHeight: fixed header height in px (identity)
 *
 * Returns array of pages where each page has vertical[] and horizontal[].
 */
export function useTwoColumnPagination(measured: MeasuredSection[], headerHeight: number) {
  return useMemo(() => {
    if (!measured || measured.length === 0) return [] as PageSpec[];

    const verticalList = measured.filter((s) => s.orientation === "vertical");
    const horizontalList = measured.filter((s) => s.orientation === "horizontal");

    let vi = 0;
    let hi = 0;

    const pages: PageSpec[] = [];
    const usable = Math.max(PAGE_HEIGHT - Math.max(0, headerHeight), 0);

    if (usable <= 0) {
      console.warn("[useTwoColumnPagination] usable height <= 0; headerHeight:", headerHeight);
    }

    // Iterate until both lists consumed
    while (vi < verticalList.length || hi < horizontalList.length) {
      const page: PageSpec = { vertical: [], horizontal: [] };
      let vRemain = usable;
      let hRemain = usable;

      // Fill left column (vertical)
      while (vi < verticalList.length) {
        const item = verticalList[vi];
        if (item.height <= vRemain) {
          page.vertical.push(item.name);
          vRemain -= item.height;
          vi++;
        } else {
          // If nothing on this page's vertical column and item doesn't fit, still place it alone
          if (page.vertical.length === 0) {
            console.warn(`[pagination] Vertical section "${item.name}" (${item.height}px) exceeds usable page height (${usable}px). It will be placed alone and may overflow.`);
            page.vertical.push(item.name);
            vi++;
          }
          break;
        }
      }

      // Fill right column (horizontal)
      while (hi < horizontalList.length) {
        const item = horizontalList[hi];
        if (item.height <= hRemain) {
          page.horizontal.push(item.name);
          hRemain -= item.height;
          hi++;
        } else {
          if (page.horizontal.length === 0) {
            console.warn(`[pagination] Horizontal section "${item.name}" (${item.height}px) exceeds usable page height (${usable}px). It will be placed alone and may overflow.`);
            page.horizontal.push(item.name);
            hi++;
          }
          break;
        }
      }

      // Avoid infinite loop: if neither column got anything, force push next available
      if (page.vertical.length === 0 && page.horizontal.length === 0) {
        if (vi < verticalList.length) {
          page.vertical.push(verticalList[vi].name);
          vi++;
        } else if (hi < horizontalList.length) {
          page.horizontal.push(horizontalList[hi].name);
          hi++;
        } else {
          break;
        }
      }

      pages.push(page);
    }

    return pages;
  }, [measured, headerHeight]);
}
