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
import { useTwoColumnPagination } from "../tow-column-util/useTwoColumnPagination";

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
  const { previewPopupOpen } = useSelector(
    (state: IState) => state.toolbarOption
  );

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

  const {
    photo,
    firstName,
    lastName,
    jobTitle,
    allowCvPhoto = true,
  } = identitySection || {};

  // ---------------------------------------------------------------------------
  // HEADER PROPS
  // ---------------------------------------------------------------------------
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

  const headerElement = <CvTokyoHeader {...headerProps} />;

  // ---------------------------------------------------------------------------
  // PREPARAR SECCIONES PARA EL HOOK (SE REUTILIZA EN TODAS LAS PLANTILLAS)
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
  // HOOK PRINCIPAL: usa TODA la lógica reutilizable
  // ---------------------------------------------------------------------------
  const {
    pages,
    measuring,
    measureWrapperRef,
    headerMeasureRef,
    sectionRefs,
    measureElements,
  } = useTwoColumnPagination({
    sections: tokyoSections,
    header: headerElement,
    deps: [
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
    ],
  });

  const hasPages = pages && pages.length > 0;

  return (
    <div style={{ fontFamily: styles.fontFamily }}>
      {/* -----------------------------------------------------------------------
         MEDICIÓN INVISIBLE (solo cuando measuring=true o no hay pages)
      ------------------------------------------------------------------------*/}
      {(measuring || !hasPages) && (
        <div
          ref={measureWrapperRef}
          style={{
            position: "absolute",
            visibility: "hidden",
            pointerEvents: "none",
            zIndex: -10,
            width: "210mm",
            boxSizing: "border-box",
          }}
        >
          <div ref={headerMeasureRef}>{headerElement}</div>

          {measureElements.map((s) => (
            <div
              key={`measure-${s.name}`}
              ref={(el) => {
                sectionRefs.current.set(s.name, el);
              }}
              className="cv-tokyo__section-wrapper"
            >
              {s.render}
            </div>
          ))}
        </div>
      )}

      {/* -----------------------------------------------------------------------
         RENDER VISIBLE FINAL
      ------------------------------------------------------------------------*/}
      {hasPages ? (
        pages.map((page, i) => (
          <article key={i} className="cv-tokyo">
            <CvTokyoHeader {...headerProps} />

            {/* Separador */}
            <div style={{ height: 20 }} />

            <div className="cv-tokyo__split">
              <div className="cv-tokyo__split--vertical">
                {page.left.map((s) => (
                  <>
                    {s.element}
                  </>
                ))}
              </div>

              <div className="cv-tokyo__split--horizontal">
                {page.right.map((s) => (
                  <>
                    {s.element}
                  </>
                ))}
              </div>
            </div>

            {/* Indicador de siguiente página (SOLO si no está en preview popup) */}
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
        <div aria-hidden style={{ height: 0, overflow: "hidden" }} />
      )}
    </div>
  );
};

export default CvTokyo;
