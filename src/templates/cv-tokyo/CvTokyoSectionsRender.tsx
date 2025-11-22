// templates/components/CvTokyoSectionsRender.tsx
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { toggleSectionEditor } from "../../reducers/cvSectionsSlice";
import type { IState } from "../../interfaces/IState";

interface SectionRenderProps {
  sectionName: string;
  data: {
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
  styles: {
    sectionTitle: string;
    text: string;
    qr: string;
  };
  sectionByName: Record<string, any>;
}

export const CvTokyoSectionsRender: React.FC<SectionRenderProps> = ({
  sectionName,
  data,
  styles,
  sectionByName,
}) => {
  const {
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

  const handleClick = () => {
    dispatch(toggleSectionEditor(sectionName));
  };

  const section = sectionByName[sectionName];
  const isOpen = section?.isEditorOpen ?? false;

  // reutilizamos esta función para envolver cada sección
  const wrap = (content: React.ReactNode, sectionName: string) => {
  return (
    <div
      onClick={handleClick}
      style={{ cursor: "pointer" }}
      className={isOpen ? "cv-tokyo__section-editor-active" : "cv-tokyo__section-editor"}
    >
      {content}
    </div>
  );
};

  switch (sectionName) {
    // ==================== LADO IZQUIERDO (vertical / both) ====================
    case "contactSection":
      return contactSection.length > 0 && wrap(
        <div key="contact" className={`cv-tokyo__contactSection`}>
          <h2 className="cv-tokyo__contactSection--title" style={{ color: styles.sectionTitle }}>
            {sectionByName[sectionName]?.title || "Contacto"}
            <span className="cv-tokyo__section-number">
              {section.progress}%
            </span>
          </h2>
              {contactSection.map((item) => (
                <div key={item.id} className="cv-tokyo__contactSection--item">
                  <h3 className="cv-tokyo__contactSection--item-name" style={{ color: styles.text }}>{item.type}</h3>
                  <p className="cv-tokyo__contactSection--item-value">{item.value}</p>
                </div>
              ))}
        </div>, sectionName
      );

    case "personalInfoSection":
      return personalInfo.length > 0 && wrap(
        <div key="personalInfo" className="cv-tokyo__personalInfoSection">
          <h2 className="cv-tokyo__personalInfoSection--title" style={{ color: styles.sectionTitle }}>
            {sectionByName[sectionName]?.title || "Detalles"}
            <span className="cv-tokyo__section-number">
              {section.progress}%
            </span>
          </h2>
              {personalInfo.map((item) => (
                <div key={item.id} className="cv-tokyo__personalInfoSection--item">
                  <h3 className="cv-tokyo__personalInfoSection--item-name" style={{ color: styles.text }}>{item.name}</h3>
                  <p className="cv-tokyo__personalInfoSection--item-value">{item.value}</p>
                </div>
              ))}
        </div>, sectionName
      );

    case "skillSection":
      return skillSection.length > 0 && wrap(
        <div key="skills" className="cv-tokyo__skillSection">
          <h2 className="cv-tokyo__skillSection--title" style={{ color: styles.sectionTitle }}>
            {sectionByName[sectionName]?.title || "Habilidades"}
            <span className="cv-tokyo__section-number">
              {section.progress}%
            </span>
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
        </div>, sectionName
      );

    case "languageSection":
      return languageSection.length > 0 && wrap(
        <div key="languages" className="cv-tokyo__languajeSection">
          <h2 className="cv-tokyo__languajeSection--title" style={{ color: styles.sectionTitle }}>
            {sectionByName[sectionName]?.title || "Idiomas"}
            <span className="cv-tokyo__section-number">
              {section.progress}%
            </span>
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
        </div>, sectionName
      );

    case "linkSection":
      return linkSection.length > 0 && wrap(
        <div key="links" className="cv-tokyo__linkSection">
          <h2 className="cv-tokyo__linkSection--title" style={{ color: styles.sectionTitle }}>
            {sectionByName[sectionName]?.title || "Enlaces"}
            <span className="cv-tokyo__section-number">
              {section.progress}%
            </span>
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
        </div>, sectionName
      );

    case "hobbieSection":
      return hobbieSection.length > 0 && wrap(
        <div key="hobbies" className="cv-tokyo__hobbieSection">
          <h2 className="cv-tokyo__hobbieSection--title" style={{ color: styles.sectionTitle }}>
            {sectionByName[sectionName]?.title || "Pasatiempos"}
            <span className="cv-tokyo__section-number">
              {section.progress}%
            </span>
          </h2>

              <div className="cv-tokyo__hobbieSection--list">
                {hobbieSection.map((hobby) => (
                  <span key={hobby.id} className="cv-tokyo__hobbieSection--item">
                    {hobby.name}
                  </span>
                ))}
              </div>
        </div>, sectionName
      );

    // ==================== LADO DERECHO (horizontal / both) ====================
    case "profileSection":
      return profileSection.trim() && wrap(
        <div key="profile" className="cv-tokyo__profileSection">
          <h2 className="cv-tokyo__profileSection--title" style={{ color: styles.sectionTitle }}>
            {sectionByName[sectionName]?.title || "Perfil"}
            <span className="cv-tokyo__section-number">
              {section.progress}%
            </span>
          </h2>
          <div className="cv-tokyo__profileSection--item" dangerouslySetInnerHTML={{ __html: profileSection }} />
        </div>, sectionName
      );

    case "experienceSection":
      return experienceSection.length > 0 && wrap(
        <div key="experience" className="cv-tokyo__experienceSection">
          <h2 className="cv-tokyo__experienceSection--title" style={{ color: styles.sectionTitle }}>
            {sectionByName[sectionName]?.title || "Experiencia"}
            <span className="cv-tokyo__section-number">
              {section.progress}%
            </span>
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
        </div>, sectionName
      );

    case "educationSection":
      return educationSection.length > 0 && wrap(
        <div key="education" className="cv-tokyo__educationSection">
          <h2 className="cv-tokyo__educationSection--title" style={{ color: styles.sectionTitle }}>
            {sectionByName[sectionName]?.title || "Educación"}
            <span className="cv-tokyo__section-number">
              {section.progress}%
            </span>
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
        </div>, sectionName
      );

    case "courseSection":
      return courseSection.length > 0 && wrap(
        <div key="courses" className="cv-tokyo__courseSection">
          <h2 className="cv-tokyo__courseSection--title" style={{ color: styles.sectionTitle }}>
            {sectionByName[sectionName]?.title || "Cursos y Certificados"}
            <span className="cv-tokyo__section-number">
              {section.progress}%
            </span>
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
        </div>, sectionName
      );

    case "awardSection":
      return awardSection.length > 0 && wrap(
        <div key="awards" className="cv-tokyo__awardSection">
          <h2 className="cv-tokyo__awardSection--title" style={{ color: styles.sectionTitle }}>
            {sectionByName[sectionName]?.title || "Premios"}
            <span className="cv-tokyo__section-number">
              {section.progress}%
            </span>
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
        </div>, sectionName
      );

    case "referenceSection":
      return referenceSection.length > 0 && wrap(
        <div key="references" className="cv-tokyo__referenceSection">
          <h2 className="cv-tokyo__referenceSection--title" style={{ color: styles.sectionTitle }}>
            {sectionByName[sectionName]?.title || "Referencias Laborales"}
            <span className="cv-tokyo__section-number">
              {section.progress}%
            </span>
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
        </div>, sectionName
      );

    case "customSection":
      return customSection.length > 0 && wrap(
        <div key="custom" className="cv-tokyo__customSection">
          <h2 className="cv-tokyo__customSection--title" style={{ color: styles.sectionTitle }}>
                {sectionsConfig.find(s => s.name === "customSection")?.title || "Campo Personalizado"}
                <span className="cv-tokyo__section-number">
                  {section.progress}%
                </span>
              </h2>
              {customSection.map((item) => (
                <div key={item.id} className="cv-tokyo__customSection--item" dangerouslySetInnerHTML={{ __html: item.value }} />
              ))}
        </div>, sectionName
      );

    default:
      return null;
  }
};