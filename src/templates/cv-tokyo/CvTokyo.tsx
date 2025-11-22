// templates/CvTokyo.tsx
import "./cvtokyo.scss";
import "./cvtokyosectionsrender.scss";
import React, { useEffect, useRef, useState } from "react";
import type { ITemplateProps } from "../../interfaces/ITemplateProps";
import { useDispatch, useSelector } from "react-redux";
import { QRCodeSVG } from "qrcode.react";
import type { IState } from "../../interfaces/IState";
import { loadTemplateDefaults, resetToTemplateDefaults } from "../../reducers/colorFontSlice";
import { CvTokyoSectionsRender } from "./CvTokyoSectionsRender";
import { toggleSectionEditor } from "../../reducers/cvSectionsSlice";

export const cvTokyoDefaults = {
  photoBorderColor: "#000000",
  titleColor: "#051235",
  professionColor: "#0A2A7A",
  sectionTitleColor: "#1E1E1E",
  itemColor: "#555555",
  qrColor: "#000000",
  font: "Arial, Helvetica, sans-serif",
};

const HEADER_HEIGHT = 0;
const PAGE_HEIGHT_PX = 1050; // altura util de la página en px (ajusta si necesitas)
const SECTION_GAP = 20; // separación visual entre secciones en px cuando se mide/empaca

const CvTokyo: React.FC<ITemplateProps> = ({
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
}) => {
  const dispatch = useDispatch();
  const { photoBorderColor, titleColor, professionColor, itemColor, qrColor, sectionTitleColor, font } =
    useSelector((state: IState) => state.colorFont.selected);

    const headerRealRef = useRef<HTMLDivElement | null>(null);
const headerMeasureRef = useRef<HTMLDivElement | null>(null);

const [headerHeight, setHeaderHeight] = useState(HEADER_HEIGHT);

  const styles = {
    photoBorder: photoBorderColor || cvTokyoDefaults.photoBorderColor,
    title: titleColor || cvTokyoDefaults.titleColor,
    profession: professionColor || cvTokyoDefaults.professionColor,
    sectionTitle: sectionTitleColor || cvTokyoDefaults.sectionTitleColor,
    text: itemColor || cvTokyoDefaults.itemColor,
    qr: qrColor || cvTokyoDefaults.qrColor,
    fontFamily: font || cvTokyoDefaults.font,
  };

  const { photo, firstName, lastName, jobTitle, allowCvPhoto } = identitySection || {};
  const fullName = `${firstName || ""} ${lastName || ""}`.trim() || "";
  const occupation = jobTitle || "";

  const onlineCvUrl = "https://www.google.com/search?q=google&ie=UTF-8";
  const allowCvQr = true;

  const sections = useSelector((state: IState) => state.cvSections.sections || []);
  const sectionByName = sections.reduce((acc: Record<string, any>, s: any) => {
    acc[s.name] = s;
    return acc;
  }, {});

  useEffect(() => {
    dispatch(loadTemplateDefaults(cvTokyoDefaults));
    return () => {
      dispatch(resetToTemplateDefaults());
    };
  }, [dispatch]);

  useEffect(() => {
  if (headerRealRef.current) {
    setHeaderHeight(headerRealRef.current.getBoundingClientRect().height);
  }
}, [identitySection]);

  const renderSection = (sectionName: string) => (
    <CvTokyoSectionsRender
      sectionName={sectionName}
      data={{
        contactSection,
        personalInfo,
        profileSection,
        experienceSection,
        educationSection,
        skillSection,
        languageSection,
        linkSection,
        hobbieSection,
        courseSection,
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
      sectionByName={sectionByName}
    />
  );

  const handleHeaderClick = () => {
  dispatch(toggleSectionEditor("identitySection"));
};

  const Header = React.forwardRef<HTMLDivElement>((_, ref) => (
  <div
    ref={ref}
    onClick={handleHeaderClick}
    className={`cv-tokyo__identitySection ${
      (allowCvPhoto && photo) || (allowCvQr && onlineCvUrl) ? "space" : "start"
    }`}
  >
    {allowCvPhoto && photo && (
      <img
        src={photo}
        alt={fullName}
        className="cv-tokyo__identitySection--img"
        style={{ borderColor: styles.photoBorder }}
      />
    )}

    <div className="cv-tokyo__identitySection--text">
      <h1 className="cv-tokyo__identitySection--title" style={{ color: styles.title }}>
        {fullName}
      </h1>
      <p className="cv-tokyo__identitySection--occupation" style={{ color: styles.profession }}>
        {occupation}
      </p>
    </div>

    {allowCvQr && onlineCvUrl && (
      <div className="cv-tokyo__identitySection--qr-wrapper">
        <QRCodeSVG value={onlineCvUrl} size={80} level="Q" bgColor="#ffffff" fgColor={styles.qr} />
        <p className="cv-tokyo__identitySection--qr-text">Ver CV Online</p>
      </div>
    )}
  </div>
));


  // Listado de secciones activas (con su orientación y elemento React)
  const allActiveSections = () =>
    sectionsOrder
      .filter((name) => {
        const sec = sectionByName[name];
        return sec?.enabled;
      })
      .map((name) => ({
        name,
        element: renderSection(name),
        orientation: sectionByName[name]?.orientation || "both",
      }))
      .filter((s) => s.element);

  const activeSections = allActiveSections();

  // ----------------------------
  // MEDICION: render oculto + refs
  // ----------------------------
  // Generamos claves únicas por sección en orden
  const measuredKeys = activeSections.map((s, idx) => `${s.name}__${idx}`);

  // refs por key
  const measureRefs = useRef<Record<string, HTMLDivElement | null>>({});
  const measureContainerRef = useRef<HTMLDivElement | null>(null);

  // Pages state result
  const [pages, setPages] = useState<Array<{ left: React.ReactNode[]; right: React.ReactNode[] }>>([
    { left: [], right: [] },
  ]);

  // Trigger measurement cuando cambian secciones o contenido relevante
  useEffect(() => {
  let raf = 0;

  const measure = () => {
    try {
      const pagesBuilt: Array<{ left: React.ReactNode[]; right: React.ReactNode[] }> = [];
      let currentPage = { left: [] as React.ReactNode[], right: [] as React.ReactNode[] };

      // alturas reales iniciales (solo header)
      let leftHeight = headerHeight;
      let rightHeight = headerHeight;

      for (let i = 0; i < activeSections.length; i++) {
        const sec = activeSections[i];
        const key = measuredKeys[i];
        const node = measureRefs.current[key];

        // altura REAL medida sin duplicar gap
        let measuredHeight = node?.getBoundingClientRect().height ?? 200;

        const isVertical = sec.orientation === "vertical" || sec.orientation === "both";
        const isHorizontal = sec.orientation === "horizontal";

        // --------------------------------------------
        // PRIMERA REGLA: ubicación obligatoria
        // --------------------------------------------
        const canGoLeft = isVertical;
        const canGoRight = isHorizontal;

        // decide dónde intentar colocar
        let placed = false;

        // --------------------------------------------
        // Intento IZQUIERDA (solo secciones vertical / both)
        // --------------------------------------------
        if (canGoLeft) {
          const extra = currentPage.left.length > 0 ? SECTION_GAP : 0;
          const needed = leftHeight + measuredHeight + extra;

          if (needed <= PAGE_HEIGHT_PX) {
            currentPage.left.push(sec.element);
            leftHeight += measuredHeight + extra;
            placed = true;
          }
        }

        // --------------------------------------------
        // Intento DERECHA (solo horizontales)
        // --------------------------------------------
        if (!placed && canGoRight) {
          const extra = currentPage.right.length > 0 ? SECTION_GAP : 0;
          const needed = rightHeight + measuredHeight + extra;

          // ⬅️ Si cabe en la derecha → se queda
          if (needed <= PAGE_HEIGHT_PX) {
            currentPage.right.push(sec.element);
            rightHeight += measuredHeight + extra;
            placed = true;
          }
        }

        // --------------------------------------------
        // Nuevas páginas si no cabe en su columna
        // --------------------------------------------
        // Nuevas páginas si no cabe en su columna
// Si no pudo colocarse en su columna → realmente no cabe
          if (!placed) {
            // cerrar página actual
            pagesBuilt.push(currentPage);

            // crear nueva página vacía
            currentPage = { left: [], right: [] };
            leftHeight = headerHeight;
            rightHeight = headerHeight;

            const extra = 0; // primera sección de la página no tiene gap

            if (canGoLeft) {
              currentPage.left.push(sec.element);
              leftHeight += measuredHeight + extra;
            } else if (canGoRight) {
              currentPage.right.push(sec.element);
              rightHeight += measuredHeight + extra;
            }

            placed = true;
          }
      }

      // siempre push de última página
      pagesBuilt.push(currentPage);

      setPages(pagesBuilt);
    } catch (err) {
      console.error(err);
      setPages([
        {
          left: activeSections
            .filter((s) => s.orientation === "vertical" || s.orientation === "both")
            .map((s) => s.element),
          right: activeSections
            .filter((s) => s.orientation === "horizontal")
            .map((s) => s.element),
        },
      ]);
    }
  };

  raf = requestAnimationFrame(() => {
    raf = requestAnimationFrame(measure);
  });

  return () => cancelAnimationFrame(raf);
}, [
  activeSections,
  sectionsOrder,
  sectionByName,

  // para refrescar alturas
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
]);

  // ----------------------------
  // RENDER: Medición oculta + páginas reales
  // ----------------------------
  return (
    <article className="cv-tokyo" style={{ fontFamily: styles.fontFamily }}>
      {/* Contenedor oculto para medir alturas reales */}
      <div
        ref={measureContainerRef}
        style={{
          position: "absolute",
          left: -9999,
          top: 0,
          width: "210mm",
          visibility: "hidden",
          pointerEvents: "none",
          zIndex: -1,
          overflow: "visible",
        }}
        aria-hidden
      >
        <div style={{ padding: "10mm", height: "297mm", boxSizing: "border-box" }}>

          {/* Header real para medir */}
          <div>
            <Header />
          </div>

          {/* Medimos cada sección individualmente con su ancho real */}
          {activeSections.map((s, idx) => {
            const key = measuredKeys[idx];
            const isVertical = s.orientation === "vertical" || s.orientation === "both";

            return (
              <div
                key={`measure-${key}`}
                ref={(el) => { measureRefs.current[key] = el; }}
                className={`cv-tokyo__measure-wrapper ${isVertical ? "left" : "right"}`}
              >
                {s.element}
              </div>
            );
          })}
        </div>
      </div>

      {/* Render final: páginas ya calculadas */}
      {pages.map((page, pageIndex) => (
        <div key={`page-${pageIndex}`} className="cv-tokyo__page">
          <Header ref={headerRealRef} />
          
          <div className="cv-tokyo__split">
            <div className="cv-tokyo__split--vertical">
              {page.left.map((el, i) => <React.Fragment key={i}>{el}</React.Fragment>)}
            </div>

            <div className="cv-tokyo__split--horizontal">
              {page.right.map((el, i) => <React.Fragment key={i}>{el}</React.Fragment>)}
            </div>
          </div>

          {/* Número de página */}
          {pages.length > 1 && (
            <div className="cv-tokyo__page-number">
              Página {pageIndex + 1} de {pages.length}
            </div>
          )}

          {/* 🔻 MARCADOR BONITO DE SIGUIENTE PÁGINA */}
          {pageIndex < pages.length - 1 && (
            <div className="cv-tokyo__next-page">
              <span className="cv-tokyo__next-page-text">Página {pageIndex + 2}</span>
            </div>
          )}
        </div>
      ))}
    </article>
  );
};

export default CvTokyo;
