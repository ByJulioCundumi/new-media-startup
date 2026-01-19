// templates/CvTokyo/CvTokyo.tsx
import React, { useEffect, useRef } from "react";
import "./cvginebra.scss";

import type { ITemplateProps } from "../../interfaces/ITemplateProps";
import { useDispatch, useSelector } from "react-redux";
import type { IState } from "../../interfaces/IState";

import { setOrder } from "../../reducers/cvSectionsSlice";
import { LuTriangleAlert } from "react-icons/lu";
import { useTemplateColors } from "../useTemplateColors";
import { toggleSectionEditor } from "../../reducers/editorsSlice";
import WaterMark from "../../components/water-mark/WaterMark";
import { hasValidSubscriptionTime } from "../../util/checkSubscriptionTime";
import { setAllowCvPhoto } from "../../reducers/identitySlice";
import { CvGinebraSectionsRender } from "./sections-render/CvGinebraSectionsRender";

export const cvGinebraDefaults = {
  textColor: "#494949ff",
  nameColor: "#0d0c0c",
  professionColor: "#808080",
  sectionTitleColor: "#323234",
  itemColor: "#635f5f",
  qrColor: "#000000",
  font: "Arial, Helvetica, sans-serif",
};

export const cvGinebraDefaultOrder: string[] = [
  "identitySection",
  "personalInfoSection",
  "contactSection",
  "profileSection",
  "experienceSection",
  "educationSection",
  "languageSection",
  "skillSection",
  "courseSection",
  "awardSection",
  "referenceSection",
  "customSection",
  "linkSection",
  "hobbieSection",
];

export const CvGinebra: React.FC<ITemplateProps> = (props) => {
  const styles = useTemplateColors(cvGinebraDefaults);
  const {sidebarOption} = useSelector((state:IState)=>state.sidebar)
  // estilos
  useEffect(() => {
    dispatch(setOrder(cvGinebraDefaultOrder));
    if(sidebarOption === "create"){
                  dispatch(setAllowCvPhoto(true));
                }
  }, []);
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
  
  const {subscriptionExpiresAt} = useSelector((state: IState) => state.user);
  const cvSections = useSelector((state: IState) => state.cvSections.sections);
  const cvSectionsEditor = useSelector((state: IState) => state.cvSectionsEditors.sections);
  const {previewPopupOpen, templatesPopupOpen} = useSelector((state: IState) => state.toolbarOption);
   // MAPA de secciones
  // ---------------------------------------------------------------------------
  const sectionInfo = React.useMemo(
    () => Object.fromEntries(cvSections.map((s) => [s.name, s])),
    [cvSections]
  );

  const sectionInfoEditor = React.useMemo(
    () => Object.fromEntries(cvSectionsEditor.map((s) => [s.name, s])),
    [cvSectionsEditor]
  );

  const dispatch = useDispatch()

  const handleClick = (sectionName: string) => {
    dispatch(toggleSectionEditor(sectionName));
  };

  // ---------------------------------------------------------------------------
  // PREPARAR SECCIONES
  // ---------------------------------------------------------------------------
  const ginebraSections = React.useMemo(() => {
    return sectionsOrder
      .filter((n) => sectionInfo[n]?.enabled)
      .map((name) => ({
        name,
        orientation:
          (sectionInfo[name]?.orientation || "vertical") as "vertical" | "horizontal" | "header",
        render: (
          <CvGinebraSectionsRender
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
  }, [ sectionsOrder, sectionInfo, contactSection, personalInfo, profileSection, experienceSection, educationSection, skillSection, languageSection, linkSection, courseSection, hobbieSection, awardSection, referenceSection, customSection, sectionsConfig]);

  const isEditorOpen = (sectionName: string): boolean => {
    return sectionInfoEditor[sectionName]?.isEditorOpen ?? false;
  };
  
  const headerSection = ginebraSections.filter((s) => s.orientation === "header");

  // ----------------------------------------------
// ESTADOS QUE GUARDAN LOS RESULTADOS FINALES
// ----------------------------------------------
const [page1Vertical, setPage1Vertical] = React.useState<string[]>([]);
const [page2Vertical, setPage2Vertical] = React.useState<string[]>([]);

    // ---------------------------------------------------------------------------
  // DETECTAR OVERFLOW SOLO EN LA COLUMNA VERTICAL
  // ---------------------------------------------------------------------------
  const verticalContainerRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
  if (!verticalContainerRef.current) return;

  const container = verticalContainerRef.current;

  const measure = () => {
    const containerRect = container.getBoundingClientRect();

    const LIMIT_1 = (1122 - 40);   // Page 1
    const LIMIT_2 = LIMIT_1 * 2;   // Page 2

    const p1: string[] = [];
    const p2: string[] = [];

    const nodes = Array.from(
      container.querySelectorAll(".cv-ginebra__vertical > div")
    );

    nodes.forEach((node) => {
      const rect = node.getBoundingClientRect();
      const relativeBottom = rect.bottom - containerRect.top;

      const sectionName =
        node.className.match(/cv-ginebra__(.*?)\s/)?.[1] ?? "unknown";

      if (relativeBottom < LIMIT_1) {
        p1.push(sectionName);
      } else if (relativeBottom < LIMIT_2) {
        p2.push(sectionName);
      } 
    });

    setPage1Vertical(p1);
    setPage2Vertical(p2);

    console.log("VERTICAL → page1:", p1);
    console.log("VERTICAL → page2:", p2);
  };

  requestAnimationFrame(measure);

  const observer = new MutationObserver(() => {
    requestAnimationFrame(measure);
  });

  observer.observe(container, {
    childList: true,
    subtree: true,
    characterData: true,
  });

  return () => observer.disconnect();
}, []);


  // ---------------------------------------------------------------------------
  // RENDER de secciones
  // ---------------------------------------------------------------------------
  return (
    <div className="cv-ginebra" style={{ fontFamily: styles.fontFamily }}>

      {/* medicion oculta por overflow columna vertical */}
      <div className="cv-ginebra__hidden--vertical" ref={verticalContainerRef}>
        <div className="cv-ginebra__limit-line"/>
        <div className="cv-ginebra__limit-line-overflowed"/>
        {headerSection
         .map((s) => (
          <div onClick={()=>handleClick(s.name)} className={`cv-ginebra__${s.name} ${isEditorOpen(s.name) ? "cv-ginebra__section--active" : "cv-ginebra__section"} cv-ginebra__section--header`}>
            {s.render}
          </div>
        ))}

        <div className="cv-ginebra__vertical">
            {ginebraSections
              .filter((s) => s.name !== "identitySection")
              .map((s) => (
                <div onClick={()=>handleClick(s.name)} className={`cv-ginebra__${s.name} ${isEditorOpen(s.name) ? "cv-ginebra__section--active" : "cv-ginebra__section"} cv-ginebra__section--vertical`}>
                  {s.render}
                </div>
              ))}
          </div>
      </div>

      <div className={(sidebarOption === "create" || sidebarOption === "cv") && !previewPopupOpen && !templatesPopupOpen ? "cv__viewer" : ""}>
      {/* renderizado de secciones por pagina con su header */}
      <div className="cv-ginebra__page">
        
        {/* MARCA DE AGUA */}
        {(!hasValidSubscriptionTime(subscriptionExpiresAt) && sidebarOption !== "home" && sidebarOption !== "cv") && (
          <WaterMark/>
        )}

        {/* HEADER */}
        {headerSection.map((s) => (
          <div
            onClick={() => handleClick(s.name)}
            className={`cv-ginebra__${s.name} ${
              isEditorOpen(s.name) ? "cv-ginebra__section--active" : "cv-ginebra__section"
            } cv-ginebra__section--header`}
          >
            {s.render}
          </div>
        ))}

        {/* PAGE 1 */}
        <div className="cv-ginebra__vertical">
            {page1Vertical.map((name) => {
              const sec = ginebraSections.find((s) => s.name === name);
              if (!sec) return null;
              return (
                <div
                  key={name}
                  onClick={() => handleClick(name)}
                  className={`cv-ginebra__${name} ${
                    isEditorOpen(name)
                      ? "cv-ginebra__section--active"
                      : "cv-ginebra__section"
                  } cv-ginebra__section--vertical`}
                >
                  {sec.render}
                </div>
              );
            })}
          </div>


        {(page2Vertical.length > 0) && (
          <>
          <p className="cv-ginebra__page--number">Pagina 1</p>
          <div className="cv-ginebra__limit-page">{previewPopupOpen === false && sidebarOption === "create" && <p className="cv-ginebra__limit-page-text">Pagina 2</p>} </div>
         </>
      ) }
      </div>

      {/* PAGE 2 */}
      {(page2Vertical.length > 0) && (
        <div className="cv-ginebra__page">
          
          {/* MARCA DE AGUA */}
          {(!hasValidSubscriptionTime(subscriptionExpiresAt) && sidebarOption !== "home" && sidebarOption !== "cv") && (
            <WaterMark/>
          )}

          <div className="cv-ginebra__limit-line-overflowed">
            {previewPopupOpen === false && sidebarOption === "create" && <p className="cv-ginebra__limit-line-overflowed-text"><LuTriangleAlert /> Los reclutadores leen primero lo esencial: mantén tu CV en máximo 2 páginas.</p>}
          </div>
          <div className="cv-ginebra__vertical">
              {page2Vertical.map((name) => {
                const sec = ginebraSections.find((s) => s.name === name);
                if (!sec) return null;
                return (
                  <div
                    key={name}
                    onClick={() => handleClick(name)}
                    className={`cv-ginebra__${name} ${
                      isEditorOpen(name)
                        ? "cv-ginebra__section--active"
                        : "cv-ginebra__section"
                    } cv-ginebra__section--vertical`}
                  >
                    {sec.render}
                  </div>
                );
              })}
            </div>

          <p className="cv-ginebra__page--number">Pagina 2</p>
        </div>
      )}
      </div>

    </div>
  );
};

export default CvGinebra;
