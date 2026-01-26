// templates/CvTokyo/CvTokyo.tsx
import React, { useEffect, useRef } from "react";
import "./cvmedellin.scss";

import type { ITemplateProps } from "../../interfaces/ITemplateProps";
import { useDispatch, useSelector } from "react-redux";
import type { IState } from "../../interfaces/IState";

import { setOrder } from "../../reducers/cvSectionsSlice";
import { LuTriangleAlert } from "react-icons/lu";
import { useTemplateColors } from "../useTemplateColors";
import { toggleSectionEditor } from "../../reducers/editorsSlice";
import { hasValidSubscriptionTime } from "../../util/checkSubscriptionTime";
import WaterMark from "../../components/water-mark/WaterMark";
import { setAllowCvPhoto } from "../../reducers/identitySlice";
import { CvMedellinSectionsRender } from "./sections-render/CvMedellinSectionsRender";
import { loadColorAllowed } from "../../reducers/colorAllowedSlice";

export const cvMedellinDefaults = {
  textColor: "#494949ff",
  nameColor: "#ffc117",
  professionColor: "#808080",
  sectionTitleColor: "#ffffff",
  itemColor: "#635f5f",
  qrColor: "#000000",
  font: "Arial, Helvetica, sans-serif",
};

export const cvMedellinDefaultOrder: string[] = [
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


export const CvMedellin: React.FC<ITemplateProps> = (props) => {
  // estilos
  const styles = useTemplateColors(cvMedellinDefaults);
  const {sidebarOption} = useSelector((state:IState)=>state.sidebar)
  
  useEffect(() => {
    
      dispatch(loadColorAllowed({
        textColor: true,
        nameColor: true,
        professionColor: true,
        sectionTitleColor: false,
        itemColor: true,
        qrColor: true,
      }));
      dispatch(setOrder(cvMedellinDefaultOrder));
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
  const medellinSections = React.useMemo(() => {
    return sectionsOrder
      .filter((n) => sectionInfo[n]?.enabled)
      .map((name) => ({
        name,
        orientation:
          (sectionInfo[name]?.orientation || "vertical") as "vertical" | "horizontal" | "header",
        render: (
          <CvMedellinSectionsRender
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
  
  const verticalSections = medellinSections.filter((s) => s.orientation === "vertical");
  const horizontalSections = medellinSections.filter((s) => s.orientation === "horizontal");
  const headerSection = medellinSections.filter((s) => s.orientation === "header");

  // ----------------------------------------------
// ESTADOS QUE GUARDAN LOS RESULTADOS FINALES
// ----------------------------------------------
const [page1Vertical, setPage1Vertical] = React.useState<string[]>([]);
const [page2Vertical, setPage2Vertical] = React.useState<string[]>([]);

const [page1Horizontal, setPage1Horizontal] = React.useState<string[]>([]);
const [page2Horizontal, setPage2Horizontal] = React.useState<string[]>([]);


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
      container.querySelectorAll(".cv-medellin__split--vertical > div")
    );

    nodes.forEach((node) => {
      const rect = node.getBoundingClientRect();
      const relativeBottom = rect.bottom - containerRect.top;

      const sectionName =
        node.className.match(/cv-medellin__(.*?)\s/)?.[1] ?? "unknown";

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
// DETECTAR OVERFLOW SOLO EN LA COLUMNA HORIZONTAL — MISMA LÓGICA QUE VERTICAL
// ---------------------------------------------------------------------------
const horizontalContainerRef = useRef<HTMLDivElement>(null);
useEffect(() => {
  if (!horizontalContainerRef.current) return;

  const container = horizontalContainerRef.current;

  const measure = () => {
    const containerRect = container.getBoundingClientRect();

    const LIMIT_1 = (1122 - 40);   // Page 1
    const LIMIT_2 = LIMIT_1 * 2;   // Page 2

    const p1: string[] = [];
    const p2: string[] = [];

    const nodes = Array.from(
      container.querySelectorAll(".cv-medellin__split--horizontal > div")
    );

    nodes.forEach((node) => {
      const rect = node.getBoundingClientRect();
      const relativeBottom = rect.bottom - containerRect.top;

      const sectionName =
        node.className.match(/cv-medellin__(.*?)\s/)?.[1] ?? "unknown";

      if (relativeBottom < LIMIT_1) {
        p1.push(sectionName);
      } else if (relativeBottom < LIMIT_2) {
        p2.push(sectionName);
      } 
    });

    setPage1Horizontal(p1);
    setPage2Horizontal(p2);

    console.log("HORIZONTAL → page1:", p1);
    console.log("HORIZONTAL → page2:", p2);
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
    <div className="cv-medellin" style={{ fontFamily: styles.fontFamily }}>

      {/* medicion oculta por overflow columna vertical */}
      <div className="cv-medellin__hidden--vertical" ref={verticalContainerRef}>
        <div className="cv-medellin__limit-line"/>
        <div className="cv-medellin__limit-line-overflowed"/>

        <div className="cv-medellin__split">
          <div className="cv-medellin__split--vertical rio-page-one">
            {verticalSections
              .filter((s) => s.name !== "identitySection")
              .map((s) => (
                <div onClick={()=>handleClick(s.name)} className={`cv-medellin__${s.name} ${isEditorOpen(s.name) ? "cv-medellin__section--active" : "cv-medellin__section"} cv-medellin__section--vertical`}>
                  {s.render}
                </div>
              ))}
          </div>

          <div className="cv-medellin__split--horizontal rio-page-two">
          </div>
        </div>
      </div>
      {/* medicion oculta por overflow columna horizontal */}
      <div className="cv-medellin__hidden--horizontal" ref={horizontalContainerRef}>
        <div className="cv-medellin__limit-line"/>
        <div className="cv-medellin__limit-line-overflowed"/>
        {headerSection
         .map((s) => (
          <div onClick={()=>handleClick(s.name)} className={`cv-medellin__${s.name} ${isEditorOpen(s.name) ? "cv-medellin__section--active" : "cv-medellin__section"} cv-medellin__section--header`}>
            {s.render}
          </div>
        ))}

        <div className="cv-medellin__split">
          <div className="cv-medellin__split--vertical rio-page-one">
          </div>

          <div className="cv-medellin__split--horizontal rio-page-two">
            {horizontalSections
              .filter((s) => s.name !== "identitySection")
              .map((s) => (
                <div onClick={()=>handleClick(s.name)} className={`cv-medellin__${s.name} ${isEditorOpen(s.name) ? "cv-medellin__section--active" : "cv-medellin__section"} cv-medellin__section--horizontal`}>
                  {s.render}
                </div>
              ))}
          </div>
        </div>
      </div>
      
      <div className={(sidebarOption === "create" || sidebarOption === "cv") && !previewPopupOpen && !templatesPopupOpen ? "cv__viewer" : ""}>
      {/* renderizado de secciones por pagina con su header */}
      <div className="cv-medellin__page">
        
        {/* MARCA DE AGUA */}
        {(!hasValidSubscriptionTime(subscriptionExpiresAt) && sidebarOption !== "home" && sidebarOption !== "cv") && (
          <WaterMark/>
        )}

        {/* HEADER */}
        {headerSection.map((s) => (
          <div
            onClick={() => handleClick(s.name)}
            className={`cv-medellin__${s.name} ${
              isEditorOpen(s.name) ? "cv-medellin__section--active" : "cv-medellin__section"
            } cv-medellin__section--header`}
          >
            {s.render}
          </div>
        ))}

        {/* PAGE 1 */}
        <div className="cv-medellin__split">
          <div className="cv-medellin__split--vertical medellin-page-one">
            {page1Vertical.map((name) => {
              const sec = medellinSections.find((s) => s.name === name);
              if (!sec) return null;
              return (
                <div
                  key={name}
                  onClick={() => handleClick(name)}
                  className={`cv-medellin__${name} ${
                    isEditorOpen(name)
                      ? "cv-medellin__section--active"
                      : "cv-medellin__section"
                  } cv-medellin__section--vertical`}
                >
                  {sec.render}
                </div>
              );
            })}
          </div>

          <div className="cv-medellin__split--horizontal medellin-page-two">
            {page1Horizontal.map((name) => {
              const sec = medellinSections.find((s) => s.name === name);
              if (!sec) return null;
              return (
                <div
                  key={name}
                  onClick={() => handleClick(name)}
                  className={`cv-medellin__${name} ${
                    isEditorOpen(name)
                      ? "cv-medellin__section--active"
                      : "cv-medellin__section"
                  } cv-medellin__section--horizontal`}
                >
                  {sec.render}
                </div>
              );
            })}
          </div>

        </div>


        {(page2Vertical.length > 0 || page2Horizontal.length > 0) && (
          <>
          <p className="cv-medellin__page--number">Pagina 1</p>
          <div className="cv-medellin__limit-page">{previewPopupOpen === false && sidebarOption === "create" &&  <p className="cv-medellin__limit-page-text">Pagina 2</p>} </div>
         </>
      ) }
      </div>

      {/* PAGE 2 */}
      {(page2Vertical.length > 0 || page2Horizontal.length > 0) && (
        <div className="cv-medellin__page">

        {/* MARCA DE AGUA */}
        {(!hasValidSubscriptionTime(subscriptionExpiresAt) && sidebarOption !== "home" && sidebarOption !== "cv") && (
          <WaterMark/>
        )}

          <div className="cv-medellin__limit-line-overflowed">
            {previewPopupOpen === false && sidebarOption === "create" && <p className="cv-medellin__limit-line-overflowed-text"><LuTriangleAlert /> Los reclutadores leen primero lo esencial: mantén tu CV en máximo 2 páginas.</p>}
          </div>
          <div className="cv-medellin__split">
            <div className="cv-medellin__split--vertical">
              {page2Vertical.map((name) => {
                const sec = medellinSections.find((s) => s.name === name);
                if (!sec) return null;
                return (
                  <div
                    key={name}
                    onClick={() => handleClick(name)}
                    className={`cv-medellin__${name} ${
                      isEditorOpen(name)
                        ? "cv-medellin__section--active"
                        : "cv-medellin__section"
                    } cv-medellin__section--vertical`}
                  >
                    {sec.render}
                  </div>
                );
              })}
            </div>

            <div className="cv-medellin__split--horizontal">
              {page2Horizontal.map((name) => {
                const sec = medellinSections.find((s) => s.name === name);
                if (!sec) return null;
                return (
                  <div
                    key={name}
                    onClick={() => handleClick(name)}
                    className={`cv-medellin__${name} ${
                      isEditorOpen(name)
                        ? "cv-medellin__section--active"
                        : "cv-medellin__section"
                    } cv-medellin__section--horizontal`}
                  >
                    {sec.render}
                  </div>
                );
              })}
            </div>

          </div>
          <p className="cv-medellin__page--number">Pagina 2</p>
        </div>
      )}
      </div>

    </div>
  );
};

export default CvMedellin;
