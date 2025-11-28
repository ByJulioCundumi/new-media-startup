// templates/components/CvTokyoSectionsRender.tsx
import React, { useLayoutEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toggleSectionEditor } from "../../../reducers/cvSectionsSlice";
import "./cvtokyosectionsrender.scss"
import { TbArrowBadgeRight } from "react-icons/tb";
import type { IState } from "../../../interfaces/IState";
import { useTemplateColors } from "../../tow-column-util/useTemplateColors";
import { cvTokyoDefaults } from "../CvTokyo";
import { QRCodeSVG } from "qrcode.react";

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

export const CvTokyoSectionsRender: React.FC<SectionRenderProps> = ({
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

  const dispatch = useDispatch();
  const styles = useTemplateColors(cvTokyoDefaults);
  const section = sectionByName[sectionName];
  const isOpen = section?.isEditorOpen ?? false;
  const {previewPopupOpen} = useSelector((state:IState)=>state.toolbarOption)
  
  const { qrCodeUrl, allowQrCode, allowCvPhoto, photo, firstName, lastName, jobTitle } = useSelector(
    (state: IState) => state.identity
  );
  
  const fullName = `${firstName || ""} ${lastName || ""}`.trim();
  const occupation = jobTitle || "";


  const handleClick = () => {
    dispatch(toggleSectionEditor(sectionName));
  };

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
        <div data-section="identitySection" onClick={handleClick} className={`cv-tokyo__identitySection ${isOpen ? "cv-tokyo__section--active" : "cv-tokyo__section"} cv-tokyo__section--vertical`}>

        <div className="cv-tokyo__itentitySection--main">
          {!previewPopupOpen &&
          typeof section?.progress === "number" && (
            <span
              className={`progress-indicator cv-tokyo__identitySection--progress-indicator ${getProgressColorClass(
                section.progress
              )}`}
            >
              {section.progress}%
              <TbArrowBadgeRight className="cv-tokyo__section-arrow" />
            </span>
          )}

          {allowCvPhoto && photo && (
            <img
              src={photo}
              className="cv-tokyo__identitySection--img"
              style={{ borderColor: styles.photoBorder }}
            />
          )}

          <div className="cv-tokyo__identitySection--text">
            <h1
              className="cv-tokyo__identitySection--title"
              style={{ color: styles.title }}
            >
              {fullName.length > 0 ? fullName : "Sobre Mi"}
            </h1>
            <p
              className="cv-tokyo__identitySection--occupation"
              style={{ color: styles.profession }}
            >
              {occupation}
            </p>
          </div>
        </div>

        {allowQrCode && (
          <div className="cv-tokyo__identitySection--qr-wrapper">
            <QRCodeSVG
              value={qrCodeUrl}
              size={80}
              level="Q"
              bgColor="#ffffff"
              fgColor={styles.qr}
            />
            <p className="cv-tokyo__identitySection--qr-text">
              Ver CV Online
            </p>
          </div>
        )}
        </div>
      );
    // ==================== LADO IZQUIERDO ====================
    case "contactSection":
      return (
        <div data-section="contactSection" onClick={handleClick} className={`cv-tokyo__contactSection ${isOpen ? "cv-tokyo__section--active" : "cv-tokyo__section"} cv-tokyo__section--vertical`}>
          <h2 className="cv-tokyo__contactSection--title" style={{ color: styles.sectionTitle }}>
            {sectionByName[sectionName]?.title || "Contacto"}
            {
              !previewPopupOpen && <span className={`progress-indicator ${getProgressColorClass(section.progress)}`}>
                {section.progress}%
                <TbArrowBadgeRight className="cv-tokyo__section-arrow" />
              </span>
            }
          </h2>
              {contactSection.map((item) => (
                <div key={item.id} className="cv-tokyo__contactSection--item">
                  <h3 className="cv-tokyo__contactSection--item-name" style={{ color: styles.text }}>{item.type}</h3>
                  <p className="cv-tokyo__contactSection--item-value">{item.value}</p>
                </div>
              ))}
        </div>
      );

    case "personalInfoSection":
      return (
        <div data-section="personalInfoSection" onClick={handleClick} className={`cv-tokyo__personalInfoSection ${isOpen ? "cv-tokyo__section--active" : "cv-tokyo__section"} cv-tokyo__section--vertical`}>
          <h2 className="cv-tokyo__personalInfoSection--title" style={{ color: styles.sectionTitle }}>
            {sectionByName[sectionName]?.title || "Detalles"}
            {
              !previewPopupOpen && <span className={`cv-tokyo__section-number progress-indicator ${getProgressColorClass(section.progress)}`}>
                {section.progress}%
                <TbArrowBadgeRight className="cv-tokyo__section-arrow" />
              </span>
            }
          </h2>
              {personalInfo.map((item) => (
                <div key={item.id} className="cv-tokyo__personalInfoSection--item">
                  <h3 className="cv-tokyo__personalInfoSection--item-name" style={{ color: styles.text }}>{item.name}</h3>
                  <p className="cv-tokyo__personalInfoSection--item-value">{item.value}</p>
                </div>
              ))}
        </div>
      );

    case "skillSection":
      return (
        <div data-section="skillSection" onClick={handleClick} className={`cv-tokyo__skillSection ${isOpen ? "cv-tokyo__section--active" : "cv-tokyo__section"} cv-tokyo__section--vertical`}>
          <h2 className="cv-tokyo__skillSection--title" style={{ color: styles.sectionTitle }}>
            {sectionByName[sectionName]?.title || "Habilidades"}
            {
              !previewPopupOpen && <span className={`cv-tokyo__section-number progress-indicator ${getProgressColorClass(section.progress)}`}>
                {section.progress}%
                <TbArrowBadgeRight className="cv-tokyo__section-arrow" />
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
                  <div key={skill.id} className="cv-tokyo__skillSection--item">
                    <div className="cv-tokyo__skillSection--header">
                      <h3 className="cv-tokyo__skillSection--item-name" style={{ color: styles.text }}>{skill.name}</h3>
                      <p className="cv-tokyo__skillSection--item-level">{skill.level}</p>
                    </div>

                    {/* Barra de progreso */}
                    <div className="cv-tokyo__skillSection--progress">
                      <div
                        className="cv-tokyo__skillSection--progress-bar"
                        style={{ width: `${progress}%` }}
                      ></div>
                    </div>
                  </div>
                );
              })}
        </div>
      );

    case "languageSection":
      return (
        <div data-section="languageSection" onClick={handleClick} className={`cv-tokyo__languajeSection ${isOpen ? "cv-tokyo__section--active" : "cv-tokyo__section"} cv-tokyo__section--vertical`}>
          <h2 className="cv-tokyo__languajeSection--title" style={{ color: styles.sectionTitle }}>
            {sectionByName[sectionName]?.title || "Idiomas"}
            {
              !previewPopupOpen && <span className={`cv-tokyo__section-number progress-indicator ${getProgressColorClass(section.progress)}`}>
                {section.progress}%
                <TbArrowBadgeRight className="cv-tokyo__section-arrow" />
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
                  <div key={lang.id} className="cv-tokyo__languajeSection--item">
                    <div className="cv-tokyo__languajeSection--header">
                      <h3 className="cv-tokyo__languajeSection--item-name" style={{ color: styles.text }}>{lang.name}</h3>
                      <p className="cv-tokyo__languajeSection--item-level">{lang.level}</p>
                    </div>

                    {/* Barra de progreso */}
                    <div className="cv-tokyo__languajeSection--progress">
                      <div
                        className="cv-tokyo__languajeSection--progress-bar"
                        style={{ width: `${progress}%` }}
                      ></div>
                    </div>
                  </div>
                );
              })}
        </div>
      );

    case "linkSection":
      return (
        <div data-section="linkSection" onClick={handleClick} className={`cv-tokyo__linkSection ${isOpen ? "cv-tokyo__section--active" : "cv-tokyo__section"} cv-tokyo__section--vertical`}>
          <h2 className="cv-tokyo__linkSection--title" style={{ color: styles.sectionTitle }}>
            {sectionByName[sectionName]?.title || "Enlaces"}
            {
              !previewPopupOpen && <span className={`cv-tokyo__section-number progress-indicator ${getProgressColorClass(section.progress)}`}>
                {section.progress}%
                <TbArrowBadgeRight className="cv-tokyo__section-arrow" />
              </span>
            }
          </h2>
                {linkSection.map((link) => (
                  <div key={link.id} className="cv-tokyo__linkSection--item">
                    {/* SI visible → nombre como <a> + URL debajo */}
                    {link.visible ? (
                      <>
                        <a
                          href={link.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="cv-tokyo__linkSection--item-name"
                        >
                          {link.name}
                        </a>

                        <p className="cv-tokyo__linkSection--item-url">
                          {link.url}
                        </p>
                      </>
                    ) : (
                      /* SI NO visible → solo <a> con el nombre */
                      <a
                        href={link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="cv-tokyo__linkSection--item-name"
                        style={{ color: styles.text }}
                      >
                        {link.name}
                      </a>
                    )}
                  </div>
                ))}
        </div>
      );

    case "hobbieSection":
      return (
        <div data-section="hobbieSection" onClick={handleClick} className={`cv-tokyo__hobbieSection ${isOpen ? "cv-tokyo__section--active" : "cv-tokyo__section"} cv-tokyo__section--vertical`}>
          <h2 className="cv-tokyo__hobbieSection--title" style={{ color: styles.sectionTitle }}>
            {sectionByName[sectionName]?.title || "Pasatiempos"}
            {
              !previewPopupOpen && <span className={`cv-tokyo__section-number progress-indicator ${getProgressColorClass(section.progress)}`}>
                {section.progress}%
                <TbArrowBadgeRight className="cv-tokyo__section-arrow" />
              </span>
            }
          </h2>

              <div className="cv-tokyo__hobbieSection--list">
                {hobbieSection.map((hobby) => (
                  <span key={hobby.id} className="cv-tokyo__hobbieSection--item">
                    {hobby.name}
                  </span>
                ))}
              </div>
        </div>
      );

    // ==================== LADO DERECHO ====================
    case "profileSection":
      return (
        <div data-section="profileSection" onClick={handleClick} className={`cv-tokyo__profileSection ${isOpen ? "cv-tokyo__section--active" : "cv-tokyo__section"} cv-tokyo__section--horizontal`}>
          <h2 className="cv-tokyo__profileSection--title" style={{ color: styles.sectionTitle }}>
            {sectionByName[sectionName]?.title || "Perfil"}
            {
              !previewPopupOpen && <span className={`cv-tokyo__section-number progress-indicator ${getProgressColorClass(section.progress)}`}>
                {section.progress}%
                <TbArrowBadgeRight className="cv-tokyo__section-arrow" />
              </span>
            }
          </h2>
          <div className="cv-tokyo__profileSection--item" dangerouslySetInnerHTML={{ __html: profileSection }} />
        </div>
      );

    case "experienceSection":
      return (
        <div data-section="experienceSection" onClick={handleClick} className={`cv-tokyo__experienceSection ${isOpen ? "cv-tokyo__section--active" : "cv-tokyo__section"} cv-tokyo__section--horizontal`}>
          <h2 className="cv-tokyo__experienceSection--title" style={{ color: styles.sectionTitle }}>
            {sectionByName[sectionName]?.title || "Experiencia"}
            {
              !previewPopupOpen && <span className={`cv-tokyo__section-number progress-indicator ${getProgressColorClass(section.progress)}`}>
                {section.progress}%
                <TbArrowBadgeRight className="cv-tokyo__section-arrow" />
              </span>
            }
          </h2>
              {experienceSection.map((exp) => (
                <div key={exp.id} className="cv-tokyo__experienceSection--item">
                  <div className="cv-tokyo__experienceSection--item-head">
                    <h3 className="cv-tokyo__experienceSection--item-head-subtitle" style={{ color: styles.text }}>
                      {exp.position},
                      <span className="cv-tokyo__experienceSection--item-head-employer">{exp.employer}</span>
                    </h3>
                    <p className="cv-tokyo__experienceSection--item-head-location">{exp.location}</p>
                  </div>
                  <div className="cv-tokyo__experienceSection--item-date">
                    <p className="cv-tokyo__experienceSection--item-date-start">
                      <span>{exp.startMonth}</span>
                      <span>{exp.startYear}</span>
                    </p>
                    <span>/</span>
                    <p className="cv-tokyo__experienceSection--item-date-end">
                      {exp.present ? "Actualidad" : `${exp.endMonth} ${exp.endYear}`}
                    </p>
                  </div>
                  <div className="cv-tokyo__experienceSection--item-date-description">{exp.description}</div>
                </div>
              ))}
        </div>
      );

    case "educationSection":
      return (
        <div data-section="educationSection" onClick={handleClick} className={`cv-tokyo__educationSection ${isOpen ? "cv-tokyo__section--active" : "cv-tokyo__section"} cv-tokyo__section--horizontal`}>
          <h2 className="cv-tokyo__educationSection--title" style={{ color: styles.sectionTitle }}>
            {sectionByName[sectionName]?.title || "Educación"}
            {
              !previewPopupOpen && <span className={`cv-tokyo__section-number progress-indicator ${getProgressColorClass(section.progress)}`}>
                {section.progress}%
                <TbArrowBadgeRight className="cv-tokyo__section-arrow" />
              </span>
            }
          </h2>
              {educationSection.map((edu) => (
                <div key={edu.id} className="cv-tokyo__educationSection--item">
                  <div className="cv-tokyo__educationSection--item-head">
                    <h3 className="cv-tokyo__educationSection--item-head-subtitle" style={{ color: styles.text }}>
                      {edu.title},
                      <span className="cv-tokyo__educationSection--item-head-employer">{edu.institution}</span>
                    </h3>
                    <p className="cv-tokyo__educationSection--item-head-location">{edu.location}</p>
                  </div>
                  <div className="cv-tokyo__educationSection--item-date">
                    <p className="cv-tokyo__educationSection--item-date-start">
                      <span>{edu.startMonth}</span>
                      <span>{edu.startYear}</span>
                    </p>
                    <span>/</span>
                    <p className="cv-tokyo__educationSection--item-date-end">
                      {edu.present ? "Actualidad" : `${edu.endMonth} ${edu.endYear}`}
                    </p>
                  </div>
                  {edu.showExtraInfo && edu.description && (
                    <div className="cv-tokyo__educationSection--item-date-description">{edu.description}</div>
                  )}
                </div>
              ))}
        </div>
      );

    case "courseSection":
      return (
        <div data-section="courseSection" onClick={handleClick} className={`cv-tokyo__courseSection ${isOpen ? "cv-tokyo__section--active" : "cv-tokyo__section"} cv-tokyo__section--horizontal`}>
          <h2 className="cv-tokyo__courseSection--title" style={{ color: styles.sectionTitle }}>
            {sectionByName[sectionName]?.title || "Cursos y Certificados"}
            {
              !previewPopupOpen && <span className={`cv-tokyo__section-number progress-indicator ${getProgressColorClass(section.progress)}`}>
                {section.progress}%
                <TbArrowBadgeRight className="cv-tokyo__section-arrow" />
              </span>
            }
          </h2>
              {courseSection.map((course) => (
                <div key={course.id} className="cv-tokyo__courseSection--item">
                  <div className="cv-tokyo__courseSection--item-head">
                    <h3 className="cv-tokyo__courseSection--item-head-subtitle">
                      {course.name},
                      <span className="cv-tokyo__courseSection--item-head-employer">{course.institution}</span>
                    </h3>
                    {(course.city || course.country) && (
                      <p className="cv-tokyo__courseSection--item-head-location">
                        {course.city}, {course.country}
                      </p>
                    )}
                  </div>
                  <div className="cv-tokyo__courseSection--item-date">
                    <p className="cv-tokyo__courseSection--item-date-start">
                      <span>{course.startDate}</span>
                    </p>
                    <span>/</span>
                    <p className="cv-tokyo__courseSection--item-date-end">
                      {course.endDate}
                    </p>
                  </div>
                  {course.description && (
                    <div className="cv-tokyo__courseSection--item-date-description">{course.description}</div>
                  )}
                </div>
              ))}
        </div>
      );

    case "awardSection":
      return (
        <div data-section="awardSection" onClick={handleClick} className={`cv-tokyo__awardSection ${isOpen ? "cv-tokyo__section--active" : "cv-tokyo__section"} cv-tokyo__section--horizontal`}>
          <h2 className="cv-tokyo__awardSection--title" style={{ color: styles.sectionTitle }}>
            {sectionByName[sectionName]?.title || "Premios"}
            {
              !previewPopupOpen && <span className={`cv-tokyo__section-number progress-indicator ${getProgressColorClass(section.progress)}`}>
                {section.progress}%
                <TbArrowBadgeRight className="cv-tokyo__section-arrow" />
              </span>
            }
          </h2>
              {awardSection.map((award) => (
                <div key={award.id} className="cv-tokyo__awardSection--item">
                  <h3 className="cv-tokyo__awardSection--item-subtitle">{award.name}</h3>
                  <p className="cv-tokyo__awardSection--item-date">{award.date}</p>
                  {award.description && (
                    <div className="cv-tokyo__awardSection--item-date-description">{award.description}</div>
                  )}
                </div>
              ))}
        </div>
      );

    case "referenceSection":
      return (
        <div data-section="referenceSection" onClick={handleClick} className={`cv-tokyo__referenceSection ${isOpen ? "cv-tokyo__section--active" : "cv-tokyo__section"} cv-tokyo__section--horizontal`}>
          <h2 className="cv-tokyo__referenceSection--title" style={{ color: styles.sectionTitle }}>
            {sectionByName[sectionName]?.title || "Referencias Laborales"}
            {
              !previewPopupOpen && <span className={`cv-tokyo__section-number progress-indicator ${getProgressColorClass(section.progress)}`}>
                {section.progress}%
                <TbArrowBadgeRight className="cv-tokyo__section-arrow" />
              </span>
            }
          </h2>
              {referenceSection.map((ref) => (
                <div key={ref.id} className="cv-tokyo__referenceSection--item">
                  <div className="cv-tokyo__referenceSection--item-head">
                    <p>
                      <span>{ref.name}</span>,
                      <span>{ref.company}</span>
                    </p>
                  </div>
                  <p className="cv-tokyo__referenceSection--item-phone">{ref.phone}</p>
                  <p className="cv-tokyo__referenceSection--item-email">{ref.email}</p>
                </div>
              ))}
        </div>
      );

    case "customSection":
      return (
        <div data-section="customSection" onClick={handleClick} className={`cv-tokyo__customSection ${isOpen ? "cv-tokyo__section--active" : "cv-tokyo__section"} cv-tokyo__section--horizontal`}>
          <h2 className="cv-tokyo__customSection--title" style={{ color: styles.sectionTitle }}>
                {sectionsConfig.find(s => s.name === "customSection")?.title || "Campo Personalizado"}
                {
              !previewPopupOpen && <span className={`cv-tokyo__section-number progress-indicator ${getProgressColorClass(section.progress)}`}>
                {section.progress}%
                <TbArrowBadgeRight className="cv-tokyo__section-arrow" />
              </span>
            }
              </h2>
              {customSection.map((item) => (
                <div key={item.id} className="cv-tokyo__customSection--item" dangerouslySetInnerHTML={{ __html: item.value }} />
              ))}
        </div>
      );

    default:
      return null;
  }
};