// templates/CvTokyo/CvTokyo.tsx
import React, { useCallback } from "react";
import "./cvtokyo.scss";

import type { ITemplateProps } from "../../interfaces/ITemplateProps";
import { useDispatch, useSelector } from "react-redux";
import type { IState } from "../../interfaces/IState";

import { useTemplateColors } from "../tow-column-util/useTemplateColors";
import { CvTokyoSectionsRender } from "./sections-render/CvTokyoSectionsRender";
import { useMeasureContainer } from "../tow-column-util/useMeasureContainer";
import { updateLayoutMeasure } from "../../reducers/sectionsMeasureSlice";

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
  const dispatch = useDispatch();
  const styles = useTemplateColors(cvTokyoDefaults);
  const cvSections = useSelector((state: IState) => state.cvSections.sections);

  // ---------------------------------------------------------------------------
  // CALLBACKS para medición (evitan loops)
  // ---------------------------------------------------------------------------
  const onMeasurePage = useCallback(
    (size:any) => dispatch(updateLayoutMeasure({ target: "page", size })),
    [dispatch]
  );

  const onMeasureSplit = useCallback(
    (size:any) => dispatch(updateLayoutMeasure({ target: "split", size })),
    [dispatch]
  );

  const onMeasureVertical = useCallback(
    (size:any) => dispatch(updateLayoutMeasure({ target: "vertical", size })),
    [dispatch]
  );

  const onMeasureHorizontal = useCallback(
    (size:any) => dispatch(updateLayoutMeasure({ target: "horizontal", size })),
    [dispatch]
  );

  // ---------------------------------------------------------------------------
  // HOOKS de medición
  // ---------------------------------------------------------------------------
  const pageRef = useMeasureContainer(onMeasurePage);
  const splitRef = useMeasureContainer(onMeasureSplit);
  const verticalRef = useMeasureContainer(onMeasureVertical);
  const horizontalRef = useMeasureContainer(onMeasureHorizontal);

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
    <div className="cv-tokyo" style={{ fontFamily: styles.fontFamily }} ref={pageRef}>
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

      <div className="cv-tokyo__split" ref={splitRef}>
        <div className="cv-tokyo__split--vertical" ref={verticalRef}>
          {verticalSections
            .filter((s) => s.name !== "identitySection")
            .map((s) => (
              <React.Fragment key={s.name}>{s.render}</React.Fragment>
            ))}
        </div>

        <div className="cv-tokyo__split--horizontal" ref={horizontalRef}>
          {horizontalSections
            .filter((s) => s.name !== "identitySection")
            .map((s) => (
              <React.Fragment key={s.name}>{s.render}</React.Fragment>
            ))}
        </div>
      </div>
    </div>
  );
};

export default CvTokyo;
