// templates/components/CvTokyoSectionsRender.tsx
import React, { useEffect, useLayoutEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { disableSection } from "../../../reducers/cvSectionsSlice";
import "./cvparissectionsrender.scss"
import { TbArrowBadgeRight, TbGitBranchDeleted, TbTrashX } from "react-icons/tb";
import type { IState } from "../../../interfaces/IState";
import { QRCodeSVG } from "qrcode.react";
import { useTemplateColors } from "../../useTemplateColors";
import { setAllowQrCode } from "../../../reducers/identitySlice";
import { cvParisDefaults } from "../CvParis";

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

export const CvParisSectionsRender: React.FC<SectionRenderProps> = ({
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

  const styles = useTemplateColors(cvParisDefaults);
  const section = sectionByName[sectionName];
  const {previewPopupOpen, templatesPopupOpen} = useSelector((state:IState)=>state.toolbarOption)
  const {sidebarOption} = useSelector((state: IState) => state.sidebar);
  const dispatch = useDispatch()
  
  const {
    qrCodeUrl,
    allowQrCode,
    photo,
    firstName,
    lastName,
    jobTitle,
    allowCvPhoto
  } = useSelector((state: IState) => state.identity);

  const fullName = `${firstName || identitySection.firstName || ""} ${lastName || identitySection.lastName || ""}`.trim();
  const occupation = jobTitle || identitySection.jobTitle || "";
  const qrUrl = qrCodeUrl || identitySection.qrCodeUrl || "";
  const validPhoto = photo || identitySection.photo || "";

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
          <div className="cv-paris__identitySection--main">
          {!previewPopupOpen && sidebarOption === "create" && templatesPopupOpen === false &&
          typeof section?.progress === "number" && (
            <span
              className={`progress-indicator cv-paris__identitySection--progress-indicator ${getProgressColorClass(
                section.progress
              )}`}
            >
              {section.progress}%
              <TbArrowBadgeRight className="cv-paris__arrow" />
            </span>
          )}

          {validPhoto && (
            <img
              src={validPhoto}
              className="cv-paris__identitySection--img"
            />
          )}

          <div className="cv-paris__identitySection--text">
            <h1
              className="cv-paris__identitySection--title"
              style={{ color: styles.nameColor }}
            >
              {fullName.length > 0 ? <>{firstName || identitySection.firstName} {lastName || identitySection.lastName} </> : "Mi CV"}
            </h1>
            <p
              className="cv-paris__identitySection--occupation"
              style={{ color: styles.professionColor }}
            >
              {occupation}
            </p>
          </div>
        </div>

        {allowQrCode && (
          <div className="cv-paris__identitySection--qr-wrapper">
            <QRCodeSVG
              value={qrUrl}
              size={70}
              level="Q"
              bgColor="#ffffff"
              fgColor={styles.qrColor}
            />
          </div>
        )}
        </>
      );
    // ==================== LADO IZQUIERDO ====================
    case "contactSection":
      return (
        <>
          <h2 className="cv-paris__contactSection--title" style={{ color: styles.sectionTitleColor }}>
            {sectionByName[sectionName]?.title || "Contacto"}
            {
              !previewPopupOpen && sidebarOption === "create" && templatesPopupOpen === false && <span className={`progress-indicator ${getProgressColorClass(section.progress)}`}>
                {section.progress}%
                <TbTrashX onClick={(e) => {
                    e.stopPropagation();      // ← evita que se abra el editor
                    dispatch(disableSection("contactSection"));
                  }} className="cv-paris__remove" />
              </span>
            }
          </h2>
              {contactSection.map((item) => (
                <div key={item.id} className="cv-paris__contactSection--item">
                  <h3 className="cv-paris__contactSection--item-name" style={{ color: styles.itemColor }}>{item.type}</h3>
                  <p className="cv-paris__contactSection--item-value" style={{ color: styles.textColor, opacity: "60%" }}>{item.value}</p>
                </div>
              ))}
        </>
      );

    case "personalInfoSection":
      return (
        <>
          <h2 className="cv-paris__personalInfoSection--title" style={{ color: styles.sectionTitleColor }}>
            {sectionByName[sectionName]?.title || "Detalles"}
            {
              !previewPopupOpen && sidebarOption === "create" && templatesPopupOpen === false && <span className={`cv-paris__section-number progress-indicator ${getProgressColorClass(section.progress)}`}>
                {section.progress}%
                <TbTrashX onClick={(e) => {
                    e.stopPropagation();      // ← evita que se abra el editor
                    dispatch(disableSection("personalInfoSection"));
                  }} className="cv-paris__remove" />
              </span>
            }
          </h2>
              {personalInfo.map((item) => (
                <div key={item.id} className="cv-paris__personalInfoSection--item">
                  <h3 className="cv-paris__personalInfoSection--item-name" style={{ color: styles.itemColor }}>{item.name}</h3>
                  <p className="cv-paris__personalInfoSection--item-value" style={{ color: styles.textColor, opacity: "60%" }}>{item.value}</p>
                </div>
              ))}
        </>
      );

    case "skillSection":
      return (
        <>
          <h2 className="cv-paris__skillSection--title" style={{ color: styles.sectionTitleColor }}>
            {sectionByName[sectionName]?.title || "Habilidades"}
            {
              !previewPopupOpen && sidebarOption === "create" && templatesPopupOpen === false && <span className={`cv-paris__section-number progress-indicator ${getProgressColorClass(section.progress)}`}>
                {section.progress}%
                <TbTrashX onClick={(e) => {
                    e.stopPropagation();      // ← evita que se abra el editor
                    dispatch(disableSection("skillSection"));
                  }} className="cv-paris__remove" />
              </span>
            }
          </h2>

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
                  <div key={skill.id} className="cv-paris__skillSection--item">
                    <div className="cv-paris__skillSection--header">
                      <h3 className="cv-paris__skillSection--item-name" style={{ color: styles.itemColor }}>{skill.name}</h3>
                      <p className="cv-paris__skillSection--item-level" style={{ color: styles.textColor, opacity: "60%" }}>{skill.level}</p>
                    </div>

                    {/* Barra de progreso */}
                    <div className="cv-paris__skillSection--progress">
                      <div
                        className="cv-paris__skillSection--progress-bar"
                        style={{ width: `${progress}%` }}
                      ></div>
                    </div>
                  </div>
                );
              })}
        </>
      );

    case "languageSection":
      return (
        <>
          <h2 className="cv-paris__languajeSection--title" style={{ color: styles.sectionTitleColor }}>
            {sectionByName[sectionName]?.title || "Idiomas"}
            {
              !previewPopupOpen && sidebarOption === "create" && templatesPopupOpen === false && <span className={`cv-paris__section-number progress-indicator ${getProgressColorClass(section.progress)}`}>
                {section.progress}%
                <TbTrashX onClick={(e) => {
                    e.stopPropagation();      // ← evita que se abra el editor
                    dispatch(disableSection("languageSection"));
                  }} className="cv-paris__remove" />
              </span>
            }
          </h2>

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
                  <div key={lang.id} className="cv-paris__languajeSection--item">
                    <div className="cv-paris__languajeSection--header">
                      <h3 className="cv-paris__languajeSection--item-name" style={{ color: styles.itemColor }}>{lang.name}</h3>
                      <p className="cv-paris__languajeSection--item-level" style={{ color: styles.textColor, opacity: "60%" }}>{lang.level}</p>
                    </div>

                    {/* Barra de progreso */}
                    <div className="cv-paris__languajeSection--progress">
                      <div
                        className="cv-paris__languajeSection--progress-bar"
                        style={{ width: `${progress}%` }}
                      ></div>
                    </div>
                  </div>
                );
              })}
        </>
      );

    case "linkSection":
      return (
        <>
          <h2 className="cv-paris__linkSection--title" style={{ color: styles.sectionTitleColor }}>
            {sectionByName[sectionName]?.title || "Enlaces"}
            {
              !previewPopupOpen && sidebarOption === "create" && templatesPopupOpen === false && <span className={`cv-paris__section-number progress-indicator ${getProgressColorClass(section.progress)}`}>
                {section.progress}%
                <TbTrashX onClick={(e) => {
                    e.stopPropagation();      // ← evita que se abra el editor
                    dispatch(disableSection("linkSection"));
                  }} className="cv-paris__remove" />
              </span>
            }
          </h2>
                {linkSection.map((link) => (
                  <div key={link.id} className="cv-paris__linkSection--item">
                    {/* SI visible → nombre como <a> + URL debajo */}
                    {link.visible ? (
                      <>
                        <a
                          href={link.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="cv-paris__linkSection--item-name"
                          style={{ color: styles.itemColor }}
                        >
                          {link.name}
                        </a>

                        <p className="cv-paris__linkSection--item-url" style={{ color: styles.textColor, opacity: "60%" }}>
                          {link.url}
                        </p>
                      </>
                    ) : (
                      /* SI NO visible → solo <a> con el nombre */
                      <a
                        href={link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="cv-paris__linkSection--item-name"
                        style={{ color: styles.itemColor }}
                      >
                        {link.name}
                      </a>
                    )}
                  </div>
                ))}
        </>
      );

    case "hobbieSection":
      return (
        <>
          <h2 className="cv-paris__hobbieSection--title" style={{ color: styles.sectionTitleColor }}>
            {sectionByName[sectionName]?.title || "Pasatiempos"}
            {
              !previewPopupOpen && sidebarOption === "create" && templatesPopupOpen === false && <span className={`cv-paris__section-number progress-indicator ${getProgressColorClass(section.progress)}`}>
                {section.progress}%
                <TbTrashX onClick={(e) => {
                    e.stopPropagation();      // ← evita que se abra el editor
                    dispatch(disableSection("hobbieSection"));
                  }} className="cv-paris__remove" />
              </span>
            }
          </h2>

              <div className="cv-paris__hobbieSection--list">
                {hobbieSection.map((hobby) => (
                  <span key={hobby.id} className="cv-paris__hobbieSection--item" style={{ borderColor: styles.itemColor, color: styles.textColor }}>
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
          <h2 className="cv-paris__profileSection--title" style={{ color: styles.sectionTitleColor }}>
            {sectionByName[sectionName]?.title || "Perfil"}
            {
              !previewPopupOpen && sidebarOption === "create" && templatesPopupOpen === false && <span className={`cv-paris__section-number progress-indicator ${getProgressColorClass(section.progress)}`}>
                {section.progress}%
                <TbTrashX onClick={(e) => {
                    e.stopPropagation();      // ← evita que se abra el editor
                    dispatch(disableSection("profileSection"));
                  }} className="cv-paris__remove" />
              </span>
            }
          </h2>
          <div className="cv-paris__profileSection--item tiptap" dangerouslySetInnerHTML={{ __html: profileSection }} style={{ color: styles.textColor, opacity: "60%" }}/>
        </>
      );

    case "experienceSection":
      return (
        <>
          <h2 className="cv-paris__experienceSection--title" style={{ color: styles.sectionTitleColor }}>
            {sectionByName[sectionName]?.title || "Experiencia"}
            {
              !previewPopupOpen && sidebarOption === "create" && templatesPopupOpen === false && <span className={`cv-paris__section-number progress-indicator ${getProgressColorClass(section.progress)}`}>
                {section.progress}%
                <TbTrashX onClick={(e) => {
                    e.stopPropagation();      // ← evita que se abra el editor
                    dispatch(disableSection("experienceSection"));
                  }} className="cv-paris__remove" />
              </span>
            }
          </h2>
              {experienceSection.map((exp) => (
                <div key={exp.id} className="cv-paris__experienceSection--item">
                  <div className="cv-paris__experienceSection--item-head">
                    <h3 className="cv-paris__experienceSection--item-head-subtitle" style={{ color: styles.itemColor }}>
                      {exp.position},
                      <span className="cv-paris__experienceSection--item-head-employer">{exp.employer}</span>
                    </h3>
                    <p className="cv-paris__experienceSection--item-head-location" style={{ color: styles.textColor, opacity: "60%" }}>{exp.location}</p>
                  </div>
                  <div className="cv-paris__experienceSection--item-date" style={{ color: styles.textColor, opacity: "90%" }}>
                    <p className="cv-paris__experienceSection--item-date-start">
                      <span>{exp.startMonth.slice(0, 3)}</span>
                      <span>{exp.startYear}</span>
                    </p>
                    <span>/</span>
                    <p className="cv-paris__experienceSection--item-date-end">
                      <span>{exp.present ? "Actualidad" : `${exp.endMonth.slice(0, 3)} ${exp.endYear}`}</span>
                    </p>
                  </div>
                  <div className="cv-paris__experienceSection--item-date-description tiptap" dangerouslySetInnerHTML={{ __html: exp.description }} style={{ color: styles.textColor, opacity: "60%" }}/>
                </div>
              ))}
        </>
      );

    case "educationSection":
      return (
        <>
          <h2 className="cv-paris__educationSection--title" style={{ color: styles.sectionTitleColor }}>
            {sectionByName[sectionName]?.title || "Educación"}
            {
              !previewPopupOpen && sidebarOption === "create" && templatesPopupOpen === false && <span className={`cv-paris__section-number progress-indicator ${getProgressColorClass(section.progress)}`}>
                {section.progress}%
                <TbTrashX onClick={(e) => {
                    e.stopPropagation();      // ← evita que se abra el editor
                    dispatch(disableSection("educationSection"));
                  }} className="cv-paris__remove" />
              </span>
            }
          </h2>
              {educationSection.map((edu) => (
                <div key={edu.id} className="cv-paris__educationSection--item">
                  <div className="cv-paris__educationSection--item-head">
                    <h3 className="cv-paris__educationSection--item-head-subtitle" style={{ color: styles.itemColor }}>
                      {edu.title},
                      <span className="cv-paris__educationSection--item-head-employer">{edu.institution}</span>
                    </h3>
                    <p className="cv-paris__educationSection--item-head-location" style={{ color: styles.textColor, opacity: "60%" }}>{edu.location}</p>
                  </div>
                  <div className="cv-paris__educationSection--item-date" style={{ color: styles.textColor, opacity: "90%" }}>
                    <p className="cv-paris__educationSection--item-date-start">
                      <span>{edu.startMonth.slice(0, 3)}</span>
                      <span>{edu.startYear}</span>
                    </p>
                    <span>/</span>
                    <p className="cv-paris__educationSection--item-date-end">
                      <span>{edu.present ? "Actualidad" : `${edu.endMonth.slice(0, 3)} ${edu.endYear}`}</span>
                    </p>
                  </div>
                  {edu.showExtraInfo && edu.description && (
                    <div className="cv-paris__educationSection--item-date-description tiptap" dangerouslySetInnerHTML={{ __html: edu.description }} style={{ color: styles.textColor, opacity: "60%" }}/>
                  )}
                </div>
              ))}
        </>
      );

    case "courseSection":
      return (
        <>
          <h2 className="cv-paris__courseSection--title" style={{ color: styles.sectionTitleColor }}>
            {sectionByName[sectionName]?.title || "Cursos y Certificados"}
            {
              !previewPopupOpen && sidebarOption === "create" && templatesPopupOpen === false && <span className={`progress-indicator ${getProgressColorClass(section.progress)}`}>
                {section.progress}%
                <TbTrashX onClick={(e) => {
                    e.stopPropagation();      // ← evita que se abra el editor
                    dispatch(disableSection("courseSection"));
                  }} className="cv-paris__remove" />
              </span>
            }
          </h2>
              {courseSection.map((course) => (
                <div key={course.id} className="cv-paris__courseSection--item">
                  <div className="cv-paris__courseSection--item-head">
                    <h3 className="cv-paris__courseSection--item-head-subtitle" style={{ color: styles.itemColor }}>
                      {course.name},
                      <span className="cv-paris__courseSection--item-head-employer">{course.institution}</span>
                    </h3>
                    {(course.city || course.country) && (
                      <p className="cv-paris__courseSection--item-head-location" style={{ color: styles.textColor, opacity:"60%" }}>
                        {course.city}, {course.country}
                      </p>
                    )}
                  </div>
                  <div className="cv-paris__courseSection--item-date" style={{ color: styles.textColor, opacity:"90%" }}>
                    <p className="cv-paris__courseSection--item-date-start">
                      <span>{course.startDate}</span>
                    </p>
                    <span>/</span>
                    <p className="cv-paris__courseSection--item-date-end">
                      {course.endDate}
                    </p>
                  </div>
                  {course.description && (
                    <div className="cv-paris__courseSection--item-date-description tiptap" dangerouslySetInnerHTML={{ __html: course.description }} style={{ color: styles.textColor, opacity: "60%" }}/>
                  )}
                </div>
              ))}
        </>
      );

    case "awardSection":
      return (
        <>
          <h2 className="cv-paris__awardSection--title" style={{ color: styles.sectionTitleColor }}>
            {sectionByName[sectionName]?.title || "Premios"}
            {
              !previewPopupOpen && sidebarOption === "create" && templatesPopupOpen === false && <span className={`cv-paris__section-number progress-indicator ${getProgressColorClass(section.progress)}`}>
                {section.progress}%
                <TbTrashX onClick={(e) => {
                    e.stopPropagation();      // ← evita que se abra el editor
                    dispatch(disableSection("awardSection"));
                  }} className="cv-paris__remove" />
              </span>
            }
          </h2>
              {awardSection.map((award) => (
                <div key={award.id} className="cv-paris__awardSection--item">
                  <h3 className="cv-paris__awardSection--item-subtitle" style={{ color: styles.itemColor }}>{award.name}</h3>
                  <p className="cv-paris__awardSection--item-date" style={{ color: styles.textColor, opacity: "90%" }}>{award.date}</p>
                  {award.description && (
                    <div className="cv-paris__awardSection--item-date-description tiptap" dangerouslySetInnerHTML={{ __html: award.description }} style={{ color: styles.textColor, opacity: "60%" }}/>
                  )}
                </div>
              ))}
        </>
      );

    case "referenceSection":
      return (
        <>
          <h2 className="cv-paris__referenceSection--title" style={{ color: styles.sectionTitleColor }}>
            {sectionByName[sectionName]?.title || "Referencias Laborales"}
            {
              !previewPopupOpen && sidebarOption === "create" && templatesPopupOpen === false && <span className={`cv-paris__section-number progress-indicator ${getProgressColorClass(section.progress)}`}>
                {section.progress}%
                <TbTrashX onClick={(e) => {
                    e.stopPropagation();      // ← evita que se abra el editor
                    dispatch(disableSection("referenceSection"));
                  }} className="cv-paris__remove" />
              </span>
            }
          </h2>
              {referenceSection.map((ref) => (
                <div key={ref.id} className="cv-paris__referenceSection--item">
                  <div className="cv-paris__referenceSection--item-head">
                    <p>
                      <span style={{ color: styles.itemColor }}>{ref.name}</span>,
                      <span style={{ color: styles.itemColor }}>{ref.company}</span>
                    </p>
                  </div>
                  <p className="cv-paris__referenceSection--item-phone" style={{ color: styles.textColor, opacity: "60%" }}>{ref.phone}</p>
                  <p className="cv-paris__referenceSection--item-email" style={{ color: styles.textColor, opacity: "60%" }}>{ref.email}</p>
                </div>
              ))}
        </>
      );

    case "customSection":
      return (
        <>
          <h2 className="cv-paris__customSection--title" style={{ color: styles.sectionTitleColor }}>
                {sectionsConfig.find(s => s.name === "customSection")?.title || "Campo Personalizado"}
                {
              !previewPopupOpen && sidebarOption === "create" && templatesPopupOpen === false && <span className={`cv-paris__section-number progress-indicator ${getProgressColorClass(section.progress)}`}>
                {section.progress}%
                <TbTrashX onClick={(e) => {
                    e.stopPropagation();      // ← evita que se abra el editor
                    dispatch(disableSection("customSection"));
                  }} className="cv-paris__remove" />
              </span>
            }
              </h2>
              {customSection.map((item) => (
                <div key={item.id} className="cv-paris__customSection--item tiptap" dangerouslySetInnerHTML={{ __html: item.value }} style={{ color: styles.textColor, opacity: "60%" }}/>
              ))}
        </>
      );

    default:
      return null;
  }
};