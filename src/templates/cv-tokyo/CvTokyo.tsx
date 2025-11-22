// templates/CvTokyo.tsx
import React, { useEffect, useRef, type JSX } from "react";
import "./cvtokyo.scss";
import type { ITemplateProps } from "../../interfaces/ITemplateProps";
import { useDispatch, useSelector } from "react-redux";
import { setAllowCvPhoto } from "../../reducers/identitySlice";
import { QRCodeSVG } from "qrcode.react";
import type { IState } from "../../interfaces/IState";
import { loadTemplateDefaults, resetToTemplateDefaults } from "../../reducers/colorFontSlice";
import { CvTokyoSectionsRender } from "./CvTokyoSectionsRender";

export const cvTokyoDefaults = {
  photoBorderColor: "#000000",
  titleColor: "#051235",
  professionColor: "#0A2A7A",
  sectionTitleColor: "#1E1E1E",
  itemColor: "#555555",
  qrColor: "#000000",
  font: "Arial, Helvetica, sans-serif",
};

const HEADER_HEIGHT = 180;
const PAGE_HEIGHT_PX = 1050;
const SECTION_GAP = 40; // ajusta según tu CSS

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
  const dispatch = useDispatch()
  const {photoBorderColor, titleColor, professionColor, itemColor, qrColor, sectionTitleColor, font} = useSelector((state:IState)=> state.colorFont.selected)
  // Objeto de estilos para usar fácilmente
  const styles = {
    photoBorder: photoBorderColor || cvTokyoDefaults.photoBorderColor,
    title: titleColor || cvTokyoDefaults.titleColor,
    profession: professionColor || cvTokyoDefaults.professionColor,
    sectionTitle: sectionTitleColor || cvTokyoDefaults.sectionTitleColor,
    text: itemColor || cvTokyoDefaults.itemColor,
    qr: qrColor || cvTokyoDefaults.qrColor,
    fontFamily: font || cvTokyoDefaults.font,
  };
  //
  const { photo, firstName, lastName, jobTitle, allowCvPhoto } = identitySection || {};
  const fullName = `${firstName || ""} ${lastName || ""}`.trim() || "";
  const occupation = jobTitle || "";

  const onlineCvUrl = "https://www.google.com/search?q=google&ie=UTF-8"
  const allowCvQr = true;

  const hasLeftElements = allowCvPhoto && photo;
  const hasRightElements = allowCvQr && onlineCvUrl?.trim() !== "";; // cuando habilites el QR real
  const shouldSpace = hasLeftElements || hasRightElements;
  const sections = useSelector((state: IState) => state.cvSections.sections);
  const sectionByName = sections.reduce((acc: Record<string, any>, s: any) => {
    acc[s.name] = s;
    return acc;
  }, {});

  useEffect(() => {
    dispatch(loadTemplateDefaults(cvTokyoDefaults));

    // ← SOLO se ejecuta cuando el componente se DESMONTA
      return () => {
        dispatch(resetToTemplateDefaults());
      };
  }, [dispatch]);

  // === Renderizado de cada sección usando el componente externo ===
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

  // ==================== HEADER (se repite en cada página) ====================
  const Header = () => (
    <div className={`cv-tokyo__identitySection ${allowCvPhoto && photo || allowCvQr && onlineCvUrl ? "space" : "start"}`}>
      {allowCvPhoto && photo && (
        <img
          src={photo}
          alt={fullName}
          className="cv-tokyo__identitySection--img"
          style={{ borderColor: styles.photoBorder }}
        />
      )}

      <div className="cv-tokyo__identitySection--text">
        <h1 className="cv-tokyo__identitySection--title" style={{ color: styles.title }}>{fullName}</h1>
        <p className="cv-tokyo__identitySection--occupation" style={{ color: styles.profession }}>{occupation}</p>
      </div>

      {allowCvQr && onlineCvUrl && (
        <div className="cv-tokyo__identitySection--qr-wrapper">
          <QRCodeSVG value={onlineCvUrl} size={80} level="Q" bgColor="#ffffff" fgColor={styles.qr} />
          <p className="cv-tokyo__identitySection--qr-text">Ver CV Online</p>
        </div>
      )}
    </div>
  );

  // ==================== LISTA DE TODAS LAS SECCIONES ACTIVAS ====================
  const allActiveSections = () => {
    return sectionsOrder
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
  };

  const activeSections = allActiveSections();

  // ==================== DISTRIBUCIÓN EN PÁGINAS ====================
  const leftColumnRefs = useRef<(HTMLDivElement | null)[]>([]);
  const rightColumnRefs = useRef<(HTMLDivElement | null)[]>([]);

  const pages: Array<{ left: JSX.Element[]; right: JSX.Element[] }> = [
  { left: [], right: [] }
];

  let currentPage = 0;
  let leftHeight = 0;
  let rightHeight = 0;

  const headerHeight = 180; // Aproximado en px

  activeSections.forEach((section) => {
  if (!section.element || typeof section.element === "boolean") {
    // Si element es false, "", null → NO se dibuja ni se calcula altura
    return;
  }

  const isLeft =
    section.orientation === "vertical" ||
    section.orientation === "both";

  const heightEstimate =
    Array.isArray(section.element.props.children) &&
    section.element.props.children.length > 10
      ? 280
      : 180;

  const targetHeight = isLeft ? leftHeight : rightHeight;
  const newHeight = targetHeight + heightEstimate;

  if (
    newHeight + headerHeight > PAGE_HEIGHT_PX &&
    (leftHeight > 300 || rightHeight > 300)
  ) {
    currentPage++;
    leftHeight = 0;
    rightHeight = 0;
    pages[currentPage] = { left: [], right: [] };
  }

  if (isLeft) {
    leftHeight += heightEstimate + 80;
    pages[currentPage].left.push(section.element as JSX.Element);
  } else {
    rightHeight += heightEstimate + 80;
    pages[currentPage].right.push(section.element as JSX.Element);
  }
});

  // Fin de fundion de renderizado de secciones

  // ==================== RENDER FINAL ====================
  return (
    <article className="cv-tokyo" style={{ fontFamily: styles.fontFamily }}>
      {pages.map((page, pageIndex) => (
        <div key={pageIndex} className="cv-tokyo__page">
          <Header />

          <div className="cv-tokyo__split">
            {/* LADO IZQUIERDO */}
            <div className="cv-tokyo__split--vertical">
              {page.left}
            </div>

            {/* LADO DERECHO */}
            <div className="cv-tokyo__split--horizontal">
              {page.right}
            </div>
          </div>

          {/* Número de página opcional */}
          {pages.length > 1 && (
            <div className="cv-tokyo__page-number">
              Página {pageIndex + 1} de {pages.length}
            </div>
          )}
        </div>
      ))}
    </article>
  );
};

export default CvTokyo;