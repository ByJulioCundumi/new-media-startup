// templates/CvTokyo/CvTokyo.tsx
import React from "react";
import "./cvtokyo.scss";

import type { ITemplateProps } from "../../interfaces/ITemplateProps";
import { useSelector } from "react-redux";
import type { IState } from "../../interfaces/IState";

import { useTemplateColors } from "../tow-column-util/useTemplateColors";

import { CvTokyoHeader } from "./cv-tokyo-header/CvTokyoHeader";
import { CvTokyoSectionsRender } from "./sections-render/CvTokyoSectionsRender";
import type { SectionInput } from "../tow-column-util/twoColumnTypes";

export const cvTokyoDefaults = {
  photoBorderColor: "#000000",
  titleColor: "#051235",
  professionColor: "#0A2A7A",
  sectionTitleColor: "#1E1E1E",
  itemColor: "#555555",
  qrColor: "#000000",
  font: "Arial, Helvetica, sans-serif",
};

export const CvTokyo: React.FC<ITemplateProps> = (props) => {
  const styles = useTemplateColors(cvTokyoDefaults);

  const cvSections = useSelector((state: IState) => state.cvSections.sections);

  const sectionInfo = React.useMemo(
    () => Object.fromEntries(cvSections.map((s) => [s.name, s])),
    [cvSections]
  );

  // ---------------------------------------------------------------------------
  // EXTRACCIÓN DE PROPS
  // ---------------------------------------------------------------------------
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

  // HEADER
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
  // PREPARACIÓN DE SECCIONES (solo para renderizar)
  // ---------------------------------------------------------------------------
  const tokyoSections: SectionInput[] = React.useMemo(() => {
    return sectionsOrder
      .filter((n) => sectionInfo[n]?.enabled)
      .map((name) => ({
        name,
        orientation: (sectionInfo[name]?.orientation ||
          "vertical") as "vertical" | "horizontal",
        render: (
          <CvTokyoSectionsRender
            key={name}
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
        ),
      }));
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
    awardSection,
    referenceSection,
    customSection,
    sectionsConfig,
    styles.sectionTitle,
    styles.text,
    styles.qr,
  ]);

  // ---------------------------------------------------------------------------
  // DIVIDIR EN VERTICAL Y HORIZONTAL
  // ---------------------------------------------------------------------------
  const verticalSections = tokyoSections.filter(
    (s) => s.orientation === "vertical"
  );
  const horizontalSections = tokyoSections.filter(
    (s) => s.orientation === "horizontal"
  );

  // ---------------------------------------------------------------------------
  // RENDER FINAL SIN PAGINACIÓN
  // ---------------------------------------------------------------------------
  return (
    <div className="cv-tokyo" style={{ fontFamily: styles.fontFamily }}>
      <CvTokyoHeader {...headerProps} />

      <div className="cv-tokyo__split">
        <div className="cv-tokyo__split--vertical">
          {verticalSections.map((s) => (
            <>
              {s.render}
            </>
          ))}
        </div>

        <div className="cv-tokyo__split--horizontal">
          {horizontalSections.map((s) => (
            <>
              {s.render}
            </>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CvTokyo;
