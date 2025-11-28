// templates/CvTokyo/CvTokyo.tsx
import React, { useEffect, useRef } from "react";
import "./cvtokyo.scss";

import type { ITemplateProps } from "../../interfaces/ITemplateProps";
import { useDispatch, useSelector } from "react-redux";
import type { IState } from "../../interfaces/IState";

import { useTemplateColors } from "../tow-column-util/useTemplateColors";
import { CvTokyoSectionsRender } from "./sections-render/CvTokyoSectionsRender";
import { measureBoxOnly, measureCvTokyo } from "../tow-column-util/measureBox";

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
  const rootRef = useRef<HTMLDivElement>(null);


  useEffect(() => {
  if (rootRef.current) {
    const result = measureCvTokyo(rootRef.current);
  }
}, [props]);
  // ---------------------------------------------------------------------------
  // MAPA de secciones
  // ---------------------------------------------------------------------------
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

  const identityEnabled = sectionInfo["identitySection"]?.enabled;

  // ---------------------------------------------------------------------------
  // PREPARAR SECCIONES
  // ---------------------------------------------------------------------------
  const tokyoSections = React.useMemo(() => {
    return sectionsOrder
      .filter((n) => sectionInfo[n]?.enabled)
      .map((name) => ({
        name,
        orientation:
          (sectionInfo[name]?.orientation || "vertical") as "vertical" | "horizontal",
        render: (
          <CvTokyoSectionsRender
            key={name}
            sectionName={name}
            data={{
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
              awardSection,
              referenceSection,
              customSection,
              sectionsConfig,
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
  ]);

  const verticalSections = tokyoSections.filter((s) => s.orientation === "vertical");
  const horizontalSections = tokyoSections.filter(
    (s) => s.orientation === "horizontal"
  );

  // ---------------------------------------------------------------------------
  // RENDER de secciones
  // ---------------------------------------------------------------------------
  return (
    <div ref={rootRef} className="cv-tokyo" style={{ fontFamily: styles.fontFamily, backgroundColor: "white" }}>
      {identityEnabled && (
        <CvTokyoSectionsRender
          key="identitySection"
          sectionName="identitySection"
          data={{
            identitySection
          }}
          sectionByName={sectionInfo}
        />
      )}

      <div className="cv-tokyo__split">
        <div className="cv-tokyo__split--vertical">
          {verticalSections
            .filter((s) => s.name !== "identitySection")
            .map((s) => (
              <>
                {s.render}
              </>
            ))}
        </div>

        <div className="cv-tokyo__split--horizontal">
          {horizontalSections
            .filter((s) => s.name !== "identitySection")
            .map((s) => (
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
