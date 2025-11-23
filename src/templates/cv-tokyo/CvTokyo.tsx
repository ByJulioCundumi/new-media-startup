// templates/CvTokyo/CvTokyo.tsx
import "./cvtokyo.scss";
import "./cvtokyosectionsrender.scss";
import React from "react";
import type { ITemplateProps } from "../../interfaces/ITemplateProps";
import { useSelector } from "react-redux";
import type { IState } from "../../interfaces/IState";

import { CvTokyoSectionsRender } from "./CvTokyoSectionsRender";
import { useTemplateColors } from "./hooks/useTemplateColors";
import { useHeaderHeight } from "./hooks/useHeaderHeight";
import { usePagination } from "./hooks/usePagination";
import { Header } from "./components/Header";
import { Page } from "./components/Page";

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

  const styles = useTemplateColors();
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
    <article className="cv-tokyo" style={{ fontFamily: styles.fontFamily }}>
      {/* Medición oculta */}
      <div style={{ position: "absolute", left: -9999, top: 0, visibility: "hidden", width: "210mm" }} aria-hidden>
        <div style={{ padding: "10mm" }}>
          <Header {...headerProps} />
          {activeSections.map((s, i) => {
            const key = measuredKeys[i];
            const isVertical = s.orientation === "both";
            return (
              <div
                key={key}
                ref={getMeasureRef(key)}
                className={`cv-tokyo__measure-wrapper ${isVertical ? "left" : "right"}`}
              >
                {s.element}
              </div>
            );
          })}
        </div>
      </div>

      {/* Páginas reales */}
      {pages.map((page, i) => (
        <Page
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