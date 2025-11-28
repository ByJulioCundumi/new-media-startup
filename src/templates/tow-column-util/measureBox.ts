//------------------------------------------------------------
// Helpers
//------------------------------------------------------------
function toNum(v: string | null | undefined) {
  return v ? parseFloat(v) || 0 : 0;
}

/**
 * Mide solo padding + margin + border + gap (sin contenido)
 */
export function measureBoxOnly(node: HTMLElement | null): number {
  if (!node) return 0;
  const cs = window.getComputedStyle(node);

  const paddingTop = toNum(cs.paddingTop);
  const paddingBottom = toNum(cs.paddingBottom);
  const borderTop = toNum(cs.borderTopWidth);
  const borderBottom = toNum(cs.borderBottomWidth);
  const marginTop = toNum(cs.marginTop);
  const marginBottom = toNum(cs.marginBottom);

  const display = (cs.display || "").toLowerCase();
  const isFlex = display.includes("flex");
  const isGrid = display.includes("grid");

  let gapContribution = 0;
  if (isFlex || isGrid) {
    const rowGap = toNum(cs.rowGap ?? cs.gap);
    const childrenCount = node.children.length;
    if (childrenCount > 1) gapContribution = rowGap * (childrenCount - 1);
  }

  return (
    paddingTop +
    paddingBottom +
    borderTop +
    borderBottom +
    marginTop +
    marginBottom +
    gapContribution
  );
}

/**
 * Mide contenido + padding + margin + border + gap
 */
export function measureFullHeight(node: HTMLElement | null): number {
  if (!node) return 0;

  const rect = node.getBoundingClientRect();
  const cs = window.getComputedStyle(node);

  const paddingTop = toNum(cs.paddingTop);
  const paddingBottom = toNum(cs.paddingBottom);
  const borderTop = toNum(cs.borderTopWidth);
  const borderBottom = toNum(cs.borderBottomWidth);
  const marginTop = toNum(cs.marginTop);
  const marginBottom = toNum(cs.marginBottom);

  const display = (cs.display || "").toLowerCase();
  const isFlex = display.includes("flex");
  const isGrid = display.includes("grid");

  let gapContribution = 0;
  if (isFlex || isGrid) {
    const rowGap = toNum(cs.rowGap ?? cs.gap);
    const childrenCount = node.children.length;
    if (childrenCount > 1) gapContribution = rowGap * (childrenCount - 1);
  }

  return (
    rect.height +
    paddingTop +
    paddingBottom +
    borderTop +
    borderBottom +
    marginTop +
    marginBottom +
    gapContribution
  );
}

/**
 * Determina qué secciones caben
 */
function paginateSectionsByHeight(
  sections: { name: string; height: number }[],
  available: number
) {
  const fit: { name: string; height: number }[] = [];
  const overflow: { name: string; height: number }[] = [];

  let acc = 0;
  for (const s of sections) {
    if (acc + s.height <= available) {
      fit.push(s);
      acc += s.height;
    } else {
      overflow.push(s);
    }
  }

  return {
    fitsAll: overflow.length === 0,
    fit,
    overflow,
    used: acc,
  };
}

//------------------------------------------------------------
// FUNCIÓN PRINCIPAL
//------------------------------------------------------------
export function measureCvTokyo(root: HTMLElement | null) {
  if (!root) return null;

  const MAX_HEIGHT = 1122;

  const split = root.querySelector(".cv-tokyo__split") as HTMLElement | null;
  const verticalContainer = root.querySelector(".cv-tokyo__split--vertical") as HTMLElement | null;
  const horizontalContainer = root.querySelector(".cv-tokyo__split--horizontal") as HTMLElement | null;

  const identity = root.querySelector("[data-section='identitySection']") as HTMLElement | null;
  const sectionNodes = Array.from(root.querySelectorAll<HTMLElement>("[data-section]"));

  //------------------------------------------------------------
  // MEDICIONES BÁSICAS
  //------------------------------------------------------------
  const cvTokyoBoxOnly = measureBoxOnly(root);
  const identityFull = measureFullHeight(identity);
  const splitBoxOnly = measureBoxOnly(split);

  const verticalBoxOnly = measureBoxOnly(verticalContainer);
  const horizontalBoxOnly = measureBoxOnly(horizontalContainer);

  //------------------------------------------------------------
  // Secciones medidas
  //------------------------------------------------------------
  const sectionsInfo = sectionNodes.map((node) => {
    const name = node.dataset.section || node.className || node.tagName;
    const height = measureFullHeight(node);
    return {
      name,
      height,
      isVertical: !!node.closest(".cv-tokyo__split--vertical"),
      isHorizontal: !!node.closest(".cv-tokyo__split--horizontal"),
    };
  });

  const sectionsWithoutIdentity = sectionsInfo.filter((s) => s.name !== "identitySection");

  const verticalSections = sectionsWithoutIdentity.filter((s) => s.isVertical);
  const horizontalSections = sectionsWithoutIdentity.filter((s) => s.isHorizontal);

  const totalVerticalSections = verticalSections.reduce((acc, s) => acc + s.height, 0);
  const totalHorizontalSections = horizontalSections.reduce((acc, s) => acc + s.height, 0);

  //------------------------------------------------------------
  // ESPACIO DISPONIBLE REAL PARA CADA CASO
  //------------------------------------------------------------

  const totalUsedVertical =
    cvTokyoBoxOnly +
    identityFull +
    splitBoxOnly +
    verticalBoxOnly +
    totalVerticalSections;

  const totalUsedHorizontal =
    cvTokyoBoxOnly +
    identityFull +
    splitBoxOnly +
    horizontalBoxOnly +
    totalHorizontalSections;

  const availableVertical = MAX_HEIGHT - totalUsedVertical;
  const availableHorizontal = MAX_HEIGHT - totalUsedHorizontal;

  //------------------------------------------------------------
  // PAGINACIÓN REAL
  //------------------------------------------------------------
  const verticalPagination = paginateSectionsByHeight(
    verticalSections.map((s) => ({ name: s.name, height: s.height })),
    availableVertical
  );

  const horizontalPagination = paginateSectionsByHeight(
    horizontalSections.map((s) => ({ name: s.name, height: s.height })),
    availableHorizontal
  );

  //------------------------------------------------------------
  // CONSOLA
  //------------------------------------------------------------
  console.log("📏 Tamaño página:", MAX_HEIGHT, "px");

  console.log("1️⃣ cv-tokyo (box only):", cvTokyoBoxOnly);
  console.log("2️⃣ identitySection (full):", identityFull);
  console.log("3️⃣ cv-tokyo__split (box only):", splitBoxOnly);
  console.log("4️⃣ vertical box only:", verticalBoxOnly);
  console.log("5️⃣ horizontal box only:", horizontalBoxOnly);

  console.log("6️⃣ Secciones:");
  console.table(
    sectionsInfo.map((s) => ({
      name: s.name,
      height: Math.round(s.height),
      vertical: s.isVertical,
      horizontal: s.isHorizontal,
    }))
  );

  console.log("➡️ Total secciones VERTICALES:", totalVerticalSections);
  console.log("➡️ Total secciones HORIZONTALES:", totalHorizontalSections);

  console.log("----- CASO VERTICAL -----");
  console.log("Usado (sumatoria):", Math.round(totalUsedVertical));
  console.log("Disponible:", Math.round(availableVertical));
  console.log("¿Caben todas?:", verticalPagination.fitsAll);
  console.log("Entran:", verticalPagination.fit.map((x) => x.name));
  console.log("Salen:", verticalPagination.overflow.map((x) => x.name));

  console.log("----- CASO HORIZONTAL -----");
  console.log("Usado (sumatoria):", Math.round(totalUsedHorizontal));
  console.log("Disponible:", Math.round(availableHorizontal));
  console.log("¿Caben todas?:", horizontalPagination.fitsAll);
  console.log("Entran:", horizontalPagination.fit.map((x) => x.name));
  console.log("Salen:", horizontalPagination.overflow.map((x) => x.name));

  //------------------------------------------------------------
  return {
    MAX_HEIGHT,

    cvTokyoBoxOnly,
    identityFull,
    splitBoxOnly,
    verticalBoxOnly,
    horizontalBoxOnly,

    totalVerticalSections,
    totalHorizontalSections,

    totalUsedVertical,
    totalUsedHorizontal,
    availableVertical,
    availableHorizontal,

    sectionsInfo,
    verticalPagination,
    horizontalPagination,
  };
}
