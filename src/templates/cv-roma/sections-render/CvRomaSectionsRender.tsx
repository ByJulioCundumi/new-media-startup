// templates/components/CvTokyoSectionsRender.tsx
import React, { useLayoutEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { disableSection, toggleSectionEditor, toggleSectionOpen } from "../../../reducers/cvSectionsSlice";
import "./cvromasectionsrender.scss"
import { TbArrowBadgeRight, TbGitBranchDeleted, TbTrashX } from "react-icons/tb";
import type { IState } from "../../../interfaces/IState";
import { QRCodeSVG } from "qrcode.react";
import { useTemplateColors } from "../../useTemplateColors";
import { cvRomaDefaults } from "../CvRoma";

interface SectionRenderProps {
  sectionName: string;
  data: {
    identitySection?: any;
    contactSection?: any[];
    personalInfo?: any[];
    profileSection?: string;
    experienceSection?: any[];
    educationSection?: any[];
    skillSection?: any[];
    languageSection?: any[];
    linkSection?: any[];
    hobbieSection?: any[];
    courseSection?: any[];
    awardSection?: any[];
    referenceSection?: any[];
    customSection?: any[];
    sectionsConfig?: any[];
  };
  sectionByName: Record<string, any>;
}

export const CvRomaSectionsRender: React.FC<SectionRenderProps> = ({
  sectionName,
  data,
  sectionByName,
}) => {
  const {
    identitySection = [],
    contactSection = [],
    personalInfo = [],
    profileSection = "",
    experienceSection = [],
    educationSection = [],
    skillSection = [],
    languageSection = [],
    linkSection = [],
    hobbieSection = [],
    courseSection = [],
    awardSection = [],
    referenceSection = [],
    customSection = [],
    sectionsConfig = [],
  } = data;

  const styles = useTemplateColors(cvRomaDefaults);
  const section = sectionByName[sectionName];
  const {previewPopupOpen, templatesPopupOpen} = useSelector((state:IState)=>state.toolbarOption)
  const {sidebarOption} = useSelector((state: IState) => state.sidebar);
  const dispatch = useDispatch()
  
  const { qrCodeUrl, photo, firstName, lastName, jobTitle } = identitySection
  
    const { allowQrCode, allowCvPhoto } = useSelector(
      (state: IState) => state.identity
    );
  
  const fullName = `${firstName || ""} ${lastName || ""}`.trim();
  const occupation = jobTitle || "";

  // Función helper al inicio del componente:
const getProgressColorClass = (progress: number) => {
  if (progress < 50) return "progress-red";
  if (progress < 100) return "progress-yellow";
  return "progress-blue";
};

  switch (sectionName) {
    // ==================== header (top) ====================
    case "identitySection":
      return (
        <>
              {allowCvPhoto && photo && (
                <img
                  src={photo}
                  className="cv-roma__identitySection--img"
                />
              )}

          <div className="cv-roma__identitySection--main">
          {!previewPopupOpen && sidebarOption === "create" && templatesPopupOpen === false &&
          typeof section?.progress === "number" && (
            <span
              className={`progress-indicator cv-roma__identitySection--progress-indicator ${getProgressColorClass(
                section.progress
              )}`}
            >
              {section.progress}%
              <TbArrowBadgeRight className="cv-roma__arrow" />
            </span>
          )}


          <div className="cv-roma__identitySection--text">
            <h1
              className="cv-roma__identitySection--title"
              style={{ color: styles.nameColor }}
            >
              {fullName.length > 0 ? <>{firstName} {lastName} </> : "Mi CV"}
            </h1>
            <p
              className="cv-roma__identitySection--occupation"
              style={{ color: styles.professionColor }}
            >
              {occupation}
            </p>
          </div>
        </div>

        {allowQrCode && (
          <div className="cv-roma__identitySection--qr-wrapper">
            <QRCodeSVG
              value={qrCodeUrl}
              size={80}
              level="Q"
              bgColor="#ffffff"
              fgColor={styles.qrColor}
            />
            <p className="cv-roma__identitySection--qr-text">
              Ver CV Online
            </p>
          </div>
        )}
        </>
      );
    // ==================== LADO IZQUIERDO ====================
    case "contactSection":
      return (
        <>
            {
              !previewPopupOpen && sidebarOption === "create" && templatesPopupOpen === false && <span className={`progress-indicator ${getProgressColorClass(section.progress)}`}>
                {section.progress}%
                <TbTrashX onClick={(e) => {
                    e.stopPropagation();      // ← evita que se abra el editor
                    dispatch(disableSection("contactSection"));
                  }} className="cv-roma__remove" />
              </span>
            }
            
              {contactSection.map((item) => (
                <div key={item.id} className="cv-roma__contactSection--item">
                  <p className="cv-roma__contactSection--item-value" style={{ color: styles.textColor, opacity: "100%" }}>{item.value}</p>
                </div>
              ))}

              {
                contactSection.length <= 0 && <h2 className="cv-roma__contactSection--title">Informacion De Contacto</h2>
              }
        </>
      );

    case "personalInfoSection":
      return (
        <>
            {
              !previewPopupOpen && sidebarOption === "create" && templatesPopupOpen === false && <span className={`cv-roma__section-number progress-indicator ${getProgressColorClass(section.progress)}`}>
                {section.progress}%
                <TbTrashX onClick={(e) => {
                    e.stopPropagation();      // ← evita que se abra el editor
                    dispatch(disableSection("personalInfoSection"));
                  }} className="cv-roma__remove" />
              </span>
            }
              {personalInfo.map((item) => (
                <div key={item.id} className="cv-roma__personalInfoSection--item">
                  <p className="cv-roma__personalInfoSection--item-value" style={{ color: styles.textColor, opacity: "60%" }}>{item.value},</p>
                </div>
              ))}

              {
                personalInfo.length <= 0 && <h2 className="cv-roma__personalInfoSection--title">Informacion Personal</h2>
              }
        </>
      );

    case "skillSection":
      return (
        <>
          <h2 className="cv-roma__skillSection--title" style={{ color: styles.sectionTitleColor }}>
            {sectionByName[sectionName]?.title || "Habilidades"}
            {
              !previewPopupOpen && sidebarOption === "create" && templatesPopupOpen === false && <span className={`cv-roma__section-number progress-indicator ${getProgressColorClass(section.progress)}`}>
                {section.progress}%
                <TbTrashX onClick={(e) => {
                    e.stopPropagation();      // ← evita que se abra el editor
                    dispatch(disableSection("skillSection"));
                  }} className="cv-roma__remove" />
              </span>
            }
          </h2>

          <div className="cv-roma__skillSection--content">
              {skillSection.map((skill) => {
                const getSkillProgress = (level: string) => {
                  const map: Record<string, number> = {
                    Principiante: 20,
                    Intermedio: 40,
                    Bueno: 60,
                    Profesional: 80,
                    Experto: 100,
                  };
                  return map[level] ?? 0;
                };

                const progress = getSkillProgress(skill.level);

                return (
                    <div key={skill.id} className="cv-roma__skillSection--item">
                    <div className="cv-roma__skillSection--header">
                      <h3 className="cv-roma__skillSection--item-name" style={{ color: styles.itemColor }}>{skill.name}</h3>
                      <p className="cv-roma__skillSection--item-level" style={{ color: styles.textColor, opacity: "60%" }}>{skill.level}</p>
                    </div>

                    {/* Barra de progreso */}
                    <div className="cv-roma__skillSection--progress">
                      <div
                        className="cv-roma__skillSection--progress-bar"
                        style={{ width: `${progress}%` }}
                      ></div>
                    </div>
                  </div>
                );
              })}
              </div>
        </>
      );

    case "languageSection":
      return (
        <>
          <h2 className="cv-roma__languageSection--title" style={{ color: styles.sectionTitleColor }}>
            {sectionByName[sectionName]?.title || "Idiomas"}
            {
              !previewPopupOpen && sidebarOption === "create" && templatesPopupOpen === false && <span className={`cv-roma__section-number progress-indicator ${getProgressColorClass(section.progress)}`}>
                {section.progress}%
                <TbTrashX onClick={(e) => {
                    e.stopPropagation();      // ← evita que se abra el editor
                    dispatch(disableSection("languageSection"));
                  }} className="cv-roma__remove" />
              </span>
            }
          </h2>

            <div className="cv-roma__languageSection--content">
              {languageSection.map((lang) => {
                const getProgress = (level: string) => {
                  const map: Record<string, number> = {
                    A1: 10,
                    A2: 25,
                    B1: 45,
                    B2: 65,
                    C1: 85,
                    C2: 95,
                    Nativo: 100,
                  };
                  return map[level] ?? 0;
                };

                const progress = getProgress(lang.level);

                return (
                  <div key={lang.id} className="cv-roma__languageSection--item">
                    <div className="cv-roma__languageSection--header">
                      <h3 className="cv-roma__languageSection--item-name" style={{ color: styles.itemColor }}>{lang.name}</h3>
                      <p className="cv-roma__languageSection--item-level" style={{ color: styles.textColor, opacity: "60%" }}>{lang.level}</p>
                    </div>

                    {/* Barra de progreso */}
                    <div className="cv-roma__languageSection--progress">
                      <div
                        className="cv-roma__languageSection--progress-bar"
                        style={{ width: `${progress}%` }}
                      ></div>
                    </div>
                  </div>
                );
              })}
              </div>
        </>
      );

    case "linkSection":
      return (
        <>
          <h2 className="cv-roma__linkSection--title" style={{ color: styles.sectionTitleColor }}>
            {sectionByName[sectionName]?.title || "Enlaces"}
            {
              !previewPopupOpen && sidebarOption === "create" && templatesPopupOpen === false && <span className={`cv-roma__section-number progress-indicator ${getProgressColorClass(section.progress)}`}>
                {section.progress}%
                <TbTrashX onClick={(e) => {
                    e.stopPropagation();      // ← evita que se abra el editor
                    dispatch(disableSection("linkSection"));
                  }} className="cv-roma__remove" />
              </span>
            }
          </h2>

          <div className="cv-roma__linkSection--content">
                {linkSection.map((link) => (
                  <div key={link.id} className="cv-roma__linkSection--item">
                    {/* SI visible → nombre como <a> + URL debajo */}
                    {link.visible ? (
                      <>
                        <a
                          href={link.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="cv-roma__linkSection--item-name"
                          style={{ color: styles.itemColor }}
                        >
                          {link.name}
                        </a>

                        <p className="cv-roma__linkSection--item-url" style={{ color: styles.textColor, opacity: "60%" }}>
                          {link.url}
                        </p>
                      </>
                    ) : (
                      /* SI NO visible → solo <a> con el nombre */
                      <a
                        href={link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="cv-roma__linkSection--item-name"
                        style={{ color: styles.itemColor }}
                      >
                        {link.name}
                      </a>
                    )}
                  </div>
                ))}
                </div>
        </>
      );

    case "hobbieSection":
      return (
        <>
          <h2 className="cv-roma__hobbieSection--title" style={{ color: styles.sectionTitleColor }}>
            {sectionByName[sectionName]?.title || "Pasatiempos"}
            {
              !previewPopupOpen && sidebarOption === "create" && templatesPopupOpen === false && <span className={`cv-roma__section-number progress-indicator ${getProgressColorClass(section.progress)}`}>
                {section.progress}%
                <TbTrashX onClick={(e) => {
                    e.stopPropagation();      // ← evita que se abra el editor
                    dispatch(disableSection("hobbieSection"));
                  }} className="cv-roma__remove" />
              </span>
            }
          </h2>

              <div className="cv-roma__hobbieSection--list">
                {hobbieSection.map((hobby) => (
                  <span key={hobby.id} className="cv-roma__hobbieSection--item" style={{ borderColor: styles.itemColor, color: styles.textColor }}>
                    {hobby.name}
                  </span>
                ))}
              </div>
        </>
      );

    // ==================== LADO DERECHO ====================
    case "profileSection":
      return (
        <>
          <h2 className="cv-roma__profileSection--title" style={{ color: styles.sectionTitleColor }}>
            {sectionByName[sectionName]?.title || "Perfil"}
            {
              !previewPopupOpen && sidebarOption === "create" && templatesPopupOpen === false && <span className={`cv-roma__section-number progress-indicator ${getProgressColorClass(section.progress)}`}>
                {section.progress}%
                <TbTrashX onClick={(e) => {
                    e.stopPropagation();      // ← evita que se abra el editor
                    dispatch(disableSection("profileSection"));
                  }} className="cv-roma__remove" />
              </span>
            }
          </h2>
          <div className="cv-roma__profileSection--item tiptap" dangerouslySetInnerHTML={{ __html: profileSection }} style={{ color: styles.textColor, opacity: "60%" }}/>
        </>
      );

    case "experienceSection":
      return (
        <>
          <h2 className="cv-roma__experienceSection--title" style={{ color: styles.sectionTitleColor }}>
            {sectionByName[sectionName]?.title || "Experiencia"}
            {
              !previewPopupOpen && sidebarOption === "create" && templatesPopupOpen === false && <span className={`cv-roma__section-number progress-indicator ${getProgressColorClass(section.progress)}`}>
                {section.progress}%
                <TbTrashX onClick={(e) => {
                    e.stopPropagation();      // ← evita que se abra el editor
                    dispatch(disableSection("experienceSection"));
                  }} className="cv-roma__remove" />
              </span>
            }
          </h2>
              {experienceSection.map((exp) => (
                <div key={exp.id} className="cv-roma__experienceSection--item">
                  <div className="cv-roma__experienceSection--item-head">
                    <h3 className="cv-roma__experienceSection--item-head-subtitle" style={{ color: styles.itemColor }}>
                      {exp.position},
                      <span className="cv-roma__experienceSection--item-head-employer">{exp.employer}</span>
                    </h3>
                    <p className="cv-roma__experienceSection--item-head-location" style={{ color: styles.textColor, opacity: "60%" }}>{exp.location}</p>
                  </div>
                  <div className="cv-roma__experienceSection--item-date" style={{ color: styles.textColor, opacity: "90%" }}>
                    <p className="cv-roma__experienceSection--item-date-start">
                      <span>{exp.startMonth.slice(0, 3)}</span>
                      <span>{exp.startYear}</span>
                    </p>
                    <span>/</span>
                    <p className="cv-roma__experienceSection--item-date-end">
                      <span>{exp.present ? "Actualidad" : `${exp.endMonth.slice(0, 3)} ${exp.endYear}`}</span>
                    </p>
                  </div>
                  <div className="cv-roma__experienceSection--item-date-description tiptap" dangerouslySetInnerHTML={{ __html: exp.description }} style={{ color: styles.textColor, opacity: "60%" }}/>
                </div>
              ))}
        </>
      );

    case "educationSection":
      return (
        <>
          <h2 className="cv-roma__educationSection--title" style={{ color: styles.sectionTitleColor }}>
            {sectionByName[sectionName]?.title || "Educación"}
            {
              !previewPopupOpen && sidebarOption === "create" && templatesPopupOpen === false && <span className={`cv-roma__section-number progress-indicator ${getProgressColorClass(section.progress)}`}>
                {section.progress}%
                <TbTrashX onClick={(e) => {
                    e.stopPropagation();      // ← evita que se abra el editor
                    dispatch(disableSection("educationSection"));
                  }} className="cv-roma__remove" />
              </span>
            }
          </h2>
              {educationSection.map((edu) => (
                <div key={edu.id} className="cv-roma__educationSection--item">
                  <div className="cv-roma__educationSection--item-head">
                    <h3 className="cv-roma__educationSection--item-head-subtitle" style={{ color: styles.itemColor }}>
                      {edu.title},
                      <span className="cv-roma__educationSection--item-head-employer">{edu.institution}</span>
                    </h3>
                    <p className="cv-roma__educationSection--item-head-location" style={{ color: styles.textColor, opacity: "60%" }}>{edu.location}</p>
                  </div>
                  <div className="cv-roma__educationSection--item-date" style={{ color: styles.textColor, opacity: "90%" }}>
                    <p className="cv-roma__educationSection--item-date-start">
                      <span>{edu.startMonth.slice(0, 3)}</span>
                      <span>{edu.startYear}</span>
                    </p>
                    <span>/</span>
                    <p className="cv-roma__educationSection--item-date-end">
                      <span>{edu.present ? "Actualidad" : `${edu.endMonth.slice(0, 3)} ${edu.endYear}`}</span>
                    </p>
                  </div>
                  {edu.showExtraInfo && edu.description && (
                    <div className="cv-roma__educationSection--item-date-description tiptap" dangerouslySetInnerHTML={{ __html: edu.description }} style={{ color: styles.textColor, opacity: "60%" }}/>
                  )}
                </div>
              ))}
        </>
      );

    case "courseSection":
      return (
        <>
          <h2 className="cv-roma__courseSection--title" style={{ color: styles.sectionTitleColor }}>
            {sectionByName[sectionName]?.title || "Cursos y Certificados"}
            {
              !previewPopupOpen && sidebarOption === "create" && templatesPopupOpen === false && <span className={`progress-indicator ${getProgressColorClass(section.progress)}`}>
                {section.progress}%
                <TbTrashX onClick={(e) => {
                    e.stopPropagation();      // ← evita que se abra el editor
                    dispatch(disableSection("courseSection"));
                  }} className="cv-roma__remove" />
              </span>
            }
          </h2>
              {courseSection.map((course) => (
                <div key={course.id} className="cv-roma__courseSection--item">
                  <div className="cv-roma__courseSection--item-head">
                    <h3 className="cv-roma__courseSection--item-head-subtitle" style={{ color: styles.itemColor }}>
                      {course.name},
                      <span className="cv-roma__courseSection--item-head-employer">{course.institution}</span>
                    </h3>
                    {(course.city || course.country) && (
                      <p className="cv-roma__courseSection--item-head-location" style={{ color: styles.textColor, opacity:"60%" }}>
                        {course.city}, {course.country}
                      </p>
                    )}
                  </div>
                  <div className="cv-roma__courseSection--item-date" style={{ color: styles.textColor, opacity:"90%" }}>
                    <p className="cv-roma__courseSection--item-date-start">
                      <span>{course.startDate}</span>
                    </p>
                    <span>/</span>
                    <p className="cv-roma__courseSection--item-date-end">
                      {course.endDate}
                    </p>
                  </div>
                  {course.description && (
                    <div className="cv-roma__courseSection--item-date-description tiptap" dangerouslySetInnerHTML={{ __html: course.description }} style={{ color: styles.textColor, opacity: "60%" }}/>
                  )}
                </div>
              ))}
        </>
      );

    case "awardSection":
      return (
        <>
          <h2 className="cv-roma__awardSection--title" style={{ color: styles.sectionTitleColor }}>
            {sectionByName[sectionName]?.title || "Premios"}
            {
              !previewPopupOpen && sidebarOption === "create" && templatesPopupOpen === false && <span className={`cv-roma__section-number progress-indicator ${getProgressColorClass(section.progress)}`}>
                {section.progress}%
                <TbTrashX onClick={(e) => {
                    e.stopPropagation();      // ← evita que se abra el editor
                    dispatch(disableSection("awardSection"));
                  }} className="cv-roma__remove" />
              </span>
            }
          </h2>
              {awardSection.map((award) => (
                <div key={award.id} className="cv-roma__awardSection--item">
                  <h3 className="cv-roma__awardSection--item-subtitle" style={{ color: styles.itemColor }}>{award.name}</h3>
                  <p className="cv-roma__awardSection--item-date" style={{ color: styles.textColor, opacity: "90%" }}>{award.date}</p>
                  {award.description && (
                    <div className="cv-roma__awardSection--item-date-description tiptap" dangerouslySetInnerHTML={{ __html: award.description }} style={{ color: styles.textColor, opacity: "60%" }}/>
                  )}
                </div>
              ))}
        </>
      );

    case "referenceSection":
      return (
        <>
          <h2 className="cv-roma__referenceSection--title" style={{ color: styles.sectionTitleColor }}>
            {sectionByName[sectionName]?.title || "Referencias Laborales"}
            {
              !previewPopupOpen && sidebarOption === "create" && templatesPopupOpen === false && <span className={`cv-roma__section-number progress-indicator ${getProgressColorClass(section.progress)}`}>
                {section.progress}%
                <TbTrashX onClick={(e) => {
                    e.stopPropagation();      // ← evita que se abra el editor
                    dispatch(disableSection("referenceSection"));
                  }} className="cv-roma__remove" />
              </span>
            }
          </h2>
              <div className="cv-roma__referenceSection--content">
              {referenceSection.map((ref) => (
                <div key={ref.id} className="cv-roma__referenceSection--item">
                  <div className="cv-roma__referenceSection--item-head">
                    <p>
                      <span style={{ color: styles.itemColor }}>{ref.name}</span>,
                      <span style={{ color: styles.itemColor }}>{ref.company}</span>
                    </p>
                  </div>
                  <p className="cv-roma__referenceSection--item-phone" style={{ color: styles.textColor, opacity: "60%" }}>{ref.phone}</p>
                  <p className="cv-roma__referenceSection--item-email" style={{ color: styles.textColor, opacity: "60%" }}>{ref.email}</p>
                </div>
              ))}
              </div>
        </>
      );

    case "customSection":
      return (
        <>
          <h2 className="cv-roma__customSection--title" style={{ color: styles.sectionTitleColor }}>
                {sectionsConfig.find(s => s.name === "customSection")?.title || "Campo Personalizado"}
                {
              !previewPopupOpen && sidebarOption === "create" && templatesPopupOpen === false && <span className={`cv-roma__section-number progress-indicator ${getProgressColorClass(section.progress)}`}>
                {section.progress}%
                <TbTrashX onClick={(e) => {
                    e.stopPropagation();      // ← evita que se abra el editor
                    dispatch(disableSection("customSection"));
                  }} className="cv-roma__remove" />
              </span>
            }
              </h2>
              {customSection.map((item) => (
                <div key={item.id} className="cv-roma__customSection--item tiptap" dangerouslySetInnerHTML={{ __html: item.value }} style={{ color: styles.textColor, opacity: "60%" }}/>
              ))}
        </>
      );

    default:
      return null;
  }
};