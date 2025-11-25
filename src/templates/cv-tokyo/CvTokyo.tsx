// templates/CvTokyo/CvTokyo.tsx
import React, {
  useRef,
  useEffect,
  useState,
  useCallback,
  useLayoutEffect,
  useMemo,
} from "react";
import "./cvtokyo.scss";
import type { ITemplateProps } from "../../interfaces/ITemplateProps";
import { useSelector } from "react-redux";
import type { IState } from "../../interfaces/IState";
import { useTemplateColors } from "../tow-column-util/useTemplateColors";
import { CvTokyoHeader } from "./cv-tokyo-header/CvTokyoHeader";
import { CvTokyoSectionsRender } from "./sections-render/CvTokyoSectionsRender";

export const cvTokyoDefaults = {
  photoBorderColor: "#000000",
  titleColor: "#051235",
  professionColor: "#0A2A7A",
  sectionTitleColor: "#1E1E1E",
  itemColor: "#555555",
  qrColor: "#000000",
  font: "Arial, Helvetica, sans-serif",
};

interface SectionMeasured {
  name: string;
  orientation: "both" | "horizontal";
  height: number;
  element: React.ReactNode;
}

export const CvTokyo: React.FC<ITemplateProps> = (props) => {
  const styles = useTemplateColors(cvTokyoDefaults);

  const cvSections = useSelector((state: IState) => state.cvSections.sections);
  const {previewPopupOpen} = useSelector((state: IState) => state.toolbarOption);
  const sectionInfo = useMemo(
    () => Object.fromEntries(cvSections.map((s) => [s.name, s])),
    [cvSections]
  );

  const {
    identitySection,
    contactSection,
    personalInfo,
    profileSection,
    experienceSection,
    educationSection,
    skillSection,
    languageSection,
    linkSection,
    courseSection,
    hobbieSection,
    referenceSection,
    awardSection,
    customSection,
    sectionsConfig,
    sectionsOrder,
  } = props;

  const { photo, firstName, lastName, jobTitle, allowCvPhoto = true } =
    identitySection || {};

  const headerProps = {
    fullName: `${firstName || ""} ${lastName || ""}`.trim(),
    occupation: jobTitle || "",
    photo,
    allowCvPhoto,
    styles: {
      photoBorder: styles.photoBorder,
      title: styles.title,
      profession: styles.profession,
      qr: styles.qr,
    },
  };

  // ---------------------------------------------------------------------------
  // Refs para medición
  // ---------------------------------------------------------------------------
  const measureWrapperRef = useRef<HTMLDivElement | null>(null);
  const headerMeasureRef = useRef<HTMLDivElement | null>(null);
  const sectionRefs = useRef<Map<string, HTMLDivElement | null>>(new Map());

  // estado de páginas calculadas (última versión válida)
  const [pages, setPages] = useState<
    { left: SectionMeasured[]; right: SectionMeasured[] }[]
  >([]);

  // measuring = estamos ejecutando una medición ahora mismo
  const [measuring, setMeasuring] = useState(true);

  // contador para forzar re-ejecución dependiente de inputs
  const inputsVersionRef = useRef(0);

  // ---------------------------------------------------------------------------
  // Construimos las secciones con su ref (useMemo)
  // ---------------------------------------------------------------------------
  const sectionsList = useMemo(() => {
    sectionsOrder.forEach((name) => {
      if (!sectionRefs.current.has(name)) {
        sectionRefs.current.set(name, null);
      }
    });

    return sectionsOrder
      .filter((n) => sectionInfo[n]?.enabled)
      .map((name) => {
        const orientation = (sectionInfo[name]?.orientation ||
          "both") as "both" | "horizontal";

        const element = (
          <div
            key={name}
            ref={(el) => {
              sectionRefs.current.set(name, el);
            }}
            className="cv-tokyo__section-wrapper"
          >
            <CvTokyoSectionsRender
              sectionName={name}
              data={{
                contactSection,
                personalInfo,
                profileSection,
                experienceSection,
                educationSection,
                skillSection,
                languageSection,
                linkSection,
                courseSection,
                hobbieSection,
                awardSection,
                referenceSection,
                customSection,
                sectionsConfig,
              }}
              styles={{
                sectionTitle: styles.sectionTitle,
                text: styles.text,
                qr: styles.qr,
              }}
              sectionByName={sectionInfo}
            />
          </div>
        );

        return {
          name,
          ref: sectionRefs.current.get(name) ?? null,
          orientation,
          element,
        };
      });
  }, [
    sectionsOrder,
    sectionInfo,
    contactSection,
    personalInfo,
    profileSection,
    experienceSection,
    educationSection,
    skillSection,
    languageSection,
    linkSection,
    courseSection,
    hobbieSection,
    referenceSection,
    awardSection,
    customSection,
    sectionsConfig,
    styles.sectionTitle,
    styles.text,
    styles.qr,
  ]);

  // ---------------------------------------------------------------------------
  // PAGINACIÓN (medir y distribuir secciones)
  // ---------------------------------------------------------------------------
  const doPagination = useCallback(() => {
    if (!headerMeasureRef.current || !measureWrapperRef.current) {
      return;
    }

    const HEADER_HEIGHT = headerMeasureRef.current.offsetHeight || 0;
    const PAGE_HEIGHT = 1122;
    const VERTICAL_MARGIN = 40;
    const EXTRA_GAP = 20;
    const MAX_HEIGHT = PAGE_HEIGHT - VERTICAL_MARGIN - HEADER_HEIGHT - EXTRA_GAP;

    const measured: SectionMeasured[] = sectionsList.map((s) => {
      const refEl = sectionRefs.current.get(s.name);
      const rawHeight = refEl ? refEl.offsetHeight : 0;
      return {
        name: s.name,
        orientation: s.orientation,
        height: rawHeight + 24,
        element: s.element,
      };
    });

    const finalPages: { left: SectionMeasured[]; right: SectionMeasured[] }[] =
      [];

    let current = { left: [] as SectionMeasured[], right: [] as SectionMeasured[] };
    let leftH = 0;
    let rightH = 0;

    measured.forEach((sec) => {
      const h = sec.height;

      if (sec.orientation === "both") {
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

        finalPages.push(current);
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

        finalPages.push(current);
        current = { left: [], right: [sec] };
        leftH = 0;
        rightH = h;
      }
    });

    finalPages.push(current);

    // Filtrar páginas vacías (sin contenido en ninguna columna)
    // ------------------------------------------------------------------
// ELIMINAR PÁGINAS VACÍAS REALES
// ------------------------------------------------------------------
    const REAL_CONTENT_THRESHOLD = 40; // evita headers falsos o paddings

    const pageHasRealContent = (page: { left: SectionMeasured[]; right: SectionMeasured[] }) => {
      const leftHas = page.left.some((s) => s.height > REAL_CONTENT_THRESHOLD);
      const rightHas = page.right.some((s) => s.height > REAL_CONTENT_THRESHOLD);
      return leftHas || rightHas;
    };

    const cleanedPages = finalPages.filter(pageHasRealContent);

    // si no queda ninguna pero había contenido antes, dejar vacío (no crear página falsa)
    setPages(cleanedPages);

    // Si por alguna razón todas quedaron vacías, dejamos al menos una página con header,
    // pero esto rara vez pasa porque siempre tienes al menos una sección editable.
    setPages(cleanedPages.length > 0 ? cleanedPages : []);

    setMeasuring(false);
  }, [sectionsList]);

  // ---------------------------------------------------------------------------
  // Cuando cambian las entradas (prop / redux) forzamos re-medición en background,
  // pero mantenemos pages anteriores visibles hasta que la nueva medición termine.
  // ---------------------------------------------------------------------------
  useEffect(() => {
    inputsVersionRef.current += 1;
    // Solo activamos measuring; NO borramos pages (esto evita parpadeo)
    setMeasuring(true);
  }, [
    cvSections,
    contactSection,
    personalInfo,
    profileSection,
    experienceSection,
    educationSection,
    skillSection,
    languageSection,
    linkSection,
    courseSection,
    hobbieSection,
    referenceSection,
    awardSection,
    customSection,
    sectionsConfig,
    sectionsOrder,
  ]);

  // ---------------------------------------------------------------------------
  // MEDIR TRAS RENDER OCULTO (solo cuando measuring === true)
  // ---------------------------------------------------------------------------
  useLayoutEffect(() => {
    if (!measuring) return;

    // si no hay secciones todavía y no hay páginas previas, no podemos mostrar nada
    if (sectionsList.length === 0) {
      setPages([]);
      setMeasuring(false);
      return;
    }

    let raf = 0;
    raf = requestAnimationFrame(() => {
      // pequeño delay para permitir que imágenes/fuentes se acomoden
      const t = window.setTimeout(() => {
        doPagination();
        clearTimeout(t);
      }, 0);
    });

    return () => cancelAnimationFrame(raf);
  }, [doPagination, measuring, sectionsList, inputsVersionRef.current]);

  // ---------------------------------------------------------------------------
  // Re-medir en resize (sin borrar pages)
  // ---------------------------------------------------------------------------
  useEffect(() => {
    let timeout: number | null = null;
    const handleResize = () => {
      if (timeout) {
        window.clearTimeout(timeout);
      }
      timeout = window.setTimeout(() => {
        setMeasuring(true);
      }, 120);
    };

    window.addEventListener("resize", handleResize);
    return () => {
      if (timeout) window.clearTimeout(timeout);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  // ---------------------------------------------------------------------------
  // ResizeObserver para re-medición cuando cambian tamaños internos (no causa parpadeo)
  // ---------------------------------------------------------------------------
  useEffect(() => {
    if (typeof ResizeObserver === "undefined") return;

    const ro = new ResizeObserver(() => {
      setMeasuring(true);
    });

    const container = measureWrapperRef.current;
    if (container) ro.observe(container);

    sectionRefs.current.forEach((el) => {
      if (el) ro.observe(el);
    });

    return () => ro.disconnect();
  }, [sectionsList]);

  // ---------------------------------------------------------------------------
  // RENDER:
  // - Siempre mostramos la última `pages` disponible si existe (evita parpadeo).
  // - Mientras medimos, mostramos el wrapper oculto para medir (visibility:hidden).
  // - Si no hay pages calculadas todavía (arranque), mostramos únicamente el wrapper oculto
  //   hasta la primera medición para evitar mostrar UI vacía.
  // ---------------------------------------------------------------------------

  const hasPages = pages && pages.length > 0;

  return (
    <div style={{ fontFamily: styles.fontFamily }}>
      {/* Medición oculta/transparent (siempre presente cuando measuring=true o si no hay pages) */}
      {(measuring || !hasPages) && (
        <div
          ref={measureWrapperRef}
          style={{
            position: "absolute",
            visibility: "hidden", // mejor que opacity/left para evitar parpadeos y reflow visible
            pointerEvents: "none",
            zIndex: -10,
            width: "210mm",
            boxSizing: "border-box",
          }}
        >
          <div ref={headerMeasureRef}>
            <CvTokyoHeader {...headerProps} />
          </div>

          {sectionsList.map((s) => (
            <div key={`measure-${s.name}`} className="cv-tokyo__section-wrapper">
              {s.element}
            </div>
          ))}
        </div>
      )}

      {/* VISTA VISIBLE: mostramos la última versión calculada (si existe) */}
      {hasPages ? (
        pages.map((page, i) => (
          <article key={i} className="cv-tokyo">
            <CvTokyoHeader {...headerProps} />

            <div style={{ height: 20 }} />

            <div className="cv-tokyo__split">
              <div className="cv-tokyo__split--vertical">
                {page.left.map((s) => (
                  <div key={s.name} className="cv-tokyo__section-wrapper">
                    {s.element}
                  </div>
                ))}
              </div>

              <div className="cv-tokyo__split--horizontal">
                {page.right.map((s) => (
                  <div key={s.name} className="cv-tokyo__section-wrapper">
                    {s.element}
                  </div>
                ))}
              </div>
            </div>

            {/* Indicador de continuidad a la siguiente página */}
            {i < pages.length - 1 && previewPopupOpen === false && (
              <>
                <div className="cv-tokyo__next-page"></div>
                <div className="cv-tokyo__next-page-text">
                  Página {pages.length}
                </div>
              </>
            )}

            <div className="cv-tokyo__number">
              Página {i + 1} de {pages.length}
            </div>
          </article>
        ))
      ) : (
        // Si aún no hay pages calculadas (arranque), mostramos el header de medida (oculto)
        // para no dejar un área en blanco. Esto solo ocurre una vez en el arranque.
        <div aria-hidden style={{ height: 0, overflow: "hidden" }} />
      )}
    </div>
  );
};

export default CvTokyo;
