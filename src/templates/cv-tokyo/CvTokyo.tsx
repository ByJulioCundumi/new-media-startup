// templates/CvTokyo/CvTokyo.tsx
import "./cv-tokyo-layout/cvtokyolayout.scss"
import React from "react";
import type { ITemplateProps } from "../../interfaces/ITemplateProps";
import { useSelector } from "react-redux";
import type { IState } from "../../interfaces/IState";

import { useTemplateColors } from "../tow-column-util/useTemplateColors";
import { useHeaderHeight } from "../tow-column-util/useHeaderHeight";
import { usePagination } from "../tow-column-util/usePagination";
import { CvTokyoHeader } from "./cv-tokyo-header/CvTokyoHeader";
import { CvTokyoLayout } from "./cv-tokyo-layout/CvTokyoLayout";
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

const onlineCvUrl = "https://www.google.com/search?q=google&ie=UTF-8";
const allowCvQr = true;

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

  const styles = useTemplateColors(cvTokyoDefaults);
  const { headerRef, headerHeight } = useHeaderHeight([identitySection]);

  const sections = useSelector((state: IState) => state.cvSections.sections || []);
  const sectionByName = Object.fromEntries(sections.map(s => [s.name, s]));

  const { photo, firstName, lastName, jobTitle, allowCvPhoto = true } = identitySection || {};
  const fullName = `${firstName || ""} ${lastName || ""}`.trim();
  const occupation = jobTitle || "";

  const renderSection = (name: string) => (
    <CvTokyoSectionsRender
      sectionName={name}
      data={{ contactSection, personalInfo, profileSection, experienceSection, educationSection, skillSection, languageSection, linkSection, hobbieSection, courseSection, awardSection, referenceSection, customSection, sectionsConfig }}
      styles={{ sectionTitle: styles.sectionTitle, text: styles.text, qr: styles.qr }}
      sectionByName={sectionByName}
    />
  );

  const activeSections = sectionsOrder
    .filter(name => sectionByName[name]?.enabled)
    .map(name => ({
      name,
      element: renderSection(name),
      orientation: sectionByName[name]?.orientation || "both",
    }));

  const { pages, getMeasureRef, measuredKeys } = usePagination(activeSections, headerHeight, [
    // cualquier cambio de contenido que afecte altura
    identitySection, contactSection, personalInfo, profileSection, experienceSection,
    educationSection, skillSection, languageSection, linkSection, courseSection,
    hobbieSection, referenceSection, awardSection, customSection,
  ]);

  const headerProps = {
    fullName,
    occupation,
    photo,
    allowCvPhoto,
    onlineCvUrl,
    allowCvQr,
    styles: {
      photoBorder: styles.photoBorder,
      title: styles.title,
      profession: styles.profession,
      qr: styles.qr,
    },
  };

  return (
    <article className="cv-tokyo-layout" style={{ fontFamily: styles.fontFamily }}>
      {/* Medición oculta */}
      <div style={{ position: "absolute", left: -9999, top: 0, visibility: "hidden", width: "210mm" }} aria-hidden>
        <div style={{ padding: "10mm" }}>
          <CvTokyoHeader {...headerProps} />
          {activeSections.map((s, i) => {
            const key = measuredKeys[i];
            const isVertical = s.orientation === "both";
            return (
              <div
                key={key}
                ref={getMeasureRef(key)}
                className={`cv-tokyo-layout__measure-wrapper ${isVertical ? "left" : "right"}`}
              >
                {s.element}
              </div>
            );
          })}
        </div>
      </div>

      {/* Páginas reales */}
      {pages.map((page, i) => (
        <CvTokyoLayout
          key={i}
          pageIndex={i}
          totalPages={pages.length}
          headerProps={headerProps}
          headerRef={i === 0 ? headerRef : undefined}
          leftContent={page.left}
          rightContent={page.right}
        />
      ))}
    </article>
  );
};

export default CvTokyo;