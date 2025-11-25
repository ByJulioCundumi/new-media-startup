import "./cvtokyo.scss"
import React from "react";
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
} as const;

export const CvTokyo: React.FC<ITemplateProps> = (props) => {
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

  // ---------------- COLORS ----------------
  const styles = useTemplateColors(cvTokyoDefaults);

  // ---------------- SECTIONS CONFIG ----------------
  const sections = useSelector((state: IState) => state.cvSections.sections || []);
  const sectionByName = Object.fromEntries(sections.map((s) => [s.name, s]));

  const { photo, firstName, lastName, jobTitle, allowCvPhoto = true } =
    identitySection || {};

  const fullName = `${firstName || ""} ${lastName || ""}`.trim();
  const occupation = jobTitle || "";

  // ---------------- RENDER SINGLE SECTION ----------------
  const renderSection = (name: string) => (
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
  // ---------------- END RENDER SECTION ----------------

  // ---------------- ACTIVE SECTIONS ----------------
  const activeSections = sectionsOrder
    .filter((name) => sectionByName[name]?.enabled)
    .map((name) => ({
      name,
      element: renderSection(name),
      orientation: sectionByName[name]?.orientation || "both",
    }));

  // ---------------- HEADER PROPS ----------------
  const headerProps = {
    fullName,
    occupation,
    photo,
    allowCvPhoto,
    styles: {
      photoBorder: styles.photoBorder,
      title: styles.title,
      profession: styles.profession,
      qr: styles.qr,
    },
  };

  // ---------------- RENDER SIMPLE (SIN PAGINACIÓN) ----------------
  return (
    <article className="cv-tokyo" style={{ fontFamily: styles.fontFamily }}>
      {/* Header */}
      <CvTokyoHeader {...headerProps} />

      {/* Contenedor de columnas */}
      <div className="cv-tokyo__split">
        {/* Columna izquierda */}
        <div className="cv-tokyo__split--vertical">
          {activeSections
            .filter((s) => s.orientation === "both")
            .map((s, i) => (
              <div key={i} className="cv-tokyo__vertical--section">
                {s.element}
              </div>
            ))}
        </div>

        {/* Columna derecha */}
        <div className="cv-tokyo__split--horizontal">
          {activeSections
            .filter((s) => s.orientation === "horizontal")
            .map((s, i) => (
              <div key={i} className="cv-tokyo__horizontal--section">
                {s.element}
              </div>
            ))}
        </div>
      </div>

      {/* marcadores de paginacion */}
      {0 > 1 && (
        <div className="cv-tokyo__number">
          Página {0 + 1} de {1}
        </div>
      )}

      {1 < 1 - 1 && (
        <div className="cv-tokyo__next-page">
          <span className="cv-tokyo__next-page-text">Página {1 + 2}</span>
        </div>
      )}

    </article>
  );
};

export default CvTokyo;
