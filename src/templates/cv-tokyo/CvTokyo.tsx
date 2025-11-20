// templates/CvTokyo.tsx
import React, { useEffect } from "react";
import "./cvtokyo.scss";
import type { ITemplateProps } from "../../interfaces/ITemplateProps";
import { useDispatch, useSelector } from "react-redux";
import { setAllowCvPhoto } from "../../reducers/identitySlice";
import { QRCodeSVG } from "qrcode.react";
import type { IState } from "../../interfaces/IState";

const CvTokyo: React.FC<ITemplateProps> = ({
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
}) => {
  const { photo, firstName, lastName, jobTitle, allowCvPhoto } = identitySection || {};
  const fullName = `${firstName || ""} ${lastName || ""}`.trim() || "";
  const occupation = jobTitle || "";

  const onlineCvUrl = "https://www.google.com/search?q=google&ie=UTF-8"
  const allowCvQr = true;

  const hasLeftElements = allowCvPhoto && photo;
  const hasRightElements = allowCvQr && onlineCvUrl?.trim() !== "";; // cuando habilites el QR real
  const shouldSpace = hasLeftElements || hasRightElements;

  const sections = useSelector((state: IState) => state.cvSections.sections);
  const sectionByName = sections.reduce((acc: Record<string, any>, s: any) => {
    acc[s.name] = s;
    return acc;
  }, {});

  // Funcion renderizadora de secciones dinamica
  const renderSection = (sectionName: string) => {
  switch (sectionName) {
    // ==================== LADO IZQUIERDO (vertical / both) ====================
    case "contactSection":
      return contactSection.length > 0 && (
        <div key="contact" className="cv-tokyo__contactSection">
          <h2 className="cv-tokyo__contactSection--title">
            {sectionByName[sectionName]?.title || "Contacto"}
          </h2>
              {contactSection.map((item) => (
                <div key={item.id} className="cv-tokyo__contactSection--item">
                  <h3 className="cv-tokyo__contactSection--item-name">{item.type}</h3>
                  <p className="cv-tokyo__contactSection--item-value">{item.value}</p>
                </div>
              ))}
        </div>
      );

    case "personalInfoSection":
      return personalInfo.length > 0 && (
        <div key="personalInfo" className="cv-tokyo__personalInfoSection">
          <h2 className="cv-tokyo__personalInfoSection--title">
            {sectionByName[sectionName]?.title || "Detalles"}
          </h2>
              {personalInfo.map((item) => (
                <div key={item.id} className="cv-tokyo__personalInfoSection--item">
                  <h3 className="cv-tokyo__personalInfoSection--item-name">{item.name}</h3>
                  <p className="cv-tokyo__personalInfoSection--item-value">{item.value}</p>
                </div>
              ))}
        </div>
      );

    case "skillSection":
      return skillSection.length > 0 && (
        <div key="skills" className="cv-tokyo__skillSection">
          <h2 className="cv-tokyo__skillSection--title">
            {sectionByName[sectionName]?.title || "Habilidades"}
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
                      <h3 className="cv-tokyo__skillSection--item-name">{skill.name}</h3>
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
      return languageSection.length > 0 && (
        <div key="languages" className="cv-tokyo__languajeSection">
          <h2 className="cv-tokyo__languajeSection--title">
            {sectionByName[sectionName]?.title || "Idiomas"}
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
                      <h3 className="cv-tokyo__languajeSection--item-name">{lang.name}</h3>
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
      return linkSection.length > 0 && (
        <div key="links" className="cv-tokyo__linkSection">
          <h2 className="cv-tokyo__linkSection--title">
            {sectionByName[sectionName]?.title || "Enlaces"}
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
                      >
                        {link.name}
                      </a>
                    )}
                  </div>
                ))}
        </div>
      );

    case "hobbieSection":
      return hobbieSection.length > 0 && (
        <div key="hobbies" className="cv-tokyo__hobbieSection">
          <h2 className="cv-tokyo__hobbieSection--title">
            {sectionByName[sectionName]?.title || "Pasatiempos"}
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

    // ==================== LADO DERECHO (horizontal / both) ====================
    case "profileSection":
      return profileSection.trim() && (
        <div key="profile" className="cv-tokyo__profileSection">
          <h2 className="cv-tokyo__profileSection--title">
            {sectionByName[sectionName]?.title || "Perfil"}
          </h2>
          <div className="cv-tokyo__profileSection--item" dangerouslySetInnerHTML={{ __html: profileSection }} />
        </div>
      );

    case "experienceSection":
      return experienceSection.length > 0 && (
        <div key="experience" className="cv-tokyo__experienceSection">
          <h2 className="cv-tokyo__experienceSection--title">
            {sectionByName[sectionName]?.title || "Experiencia"}
          </h2>
              {experienceSection.map((exp) => (
                <div key={exp.id} className="cv-tokyo__experienceSection--item">
                  <div className="cv-tokyo__experienceSection--item-head">
                    <h3 className="cv-tokyo__experienceSection--item-head-subtitle">
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
      return educationSection.length > 0 && (
        <div key="education" className="cv-tokyo__educationSection">
          <h2 className="cv-tokyo__educationSection--title">
            {sectionByName[sectionName]?.title || "Educación"}
          </h2>
              {educationSection.map((edu) => (
                <div key={edu.id} className="cv-tokyo__educationSection--item">
                  <div className="cv-tokyo__educationSection--item-head">
                    <h3 className="cv-tokyo__educationSection--item-head-subtitle">
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
      return courseSection.length > 0 && (
        <div key="courses" className="cv-tokyo__courseSection">
          <h2 className="cv-tokyo__courseSection--title">
            {sectionByName[sectionName]?.title || "Cursos y Certificados"}
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
      return awardSection.length > 0 && (
        <div key="awards" className="cv-tokyo__awardSection">
          <h2 className="cv-tokyo__awardSection--title">
            {sectionByName[sectionName]?.title || "Premios"}
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
      return referenceSection.length > 0 && (
        <div key="references" className="cv-tokyo__referenceSection">
          <h2 className="cv-tokyo__referenceSection--title">
            {sectionByName[sectionName]?.title || "Referencias Laborales"}
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
      return customSection.length > 0 && (
        <div key="custom" className="cv-tokyo__customSection">
          <h2 className="cv-tokyo__customSection--title">
                {sectionsConfig.find(s => s.name === "customSection")?.title || "Campo Personalizado"}
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
  // Fin de fundion de renderizado de secciones

  return (
    <article className="cv-tokyo">
      {/* ==================== IDENTIDAD ==================== */}
      <div
        className={`cv-tokyo__identitySection ${shouldSpace ? "space" : "start"}`}
      >
        {Boolean(
          identitySection.firstName?.trim() ||
          identitySection.lastName?.trim() ||
          identitySection.jobTitle?.trim() ||
          identitySection.photo
        ) && (
          <>

            {/* Foto (solo si existe) */}
            {allowCvPhoto && photo && (
              <img
                src={photo}
                alt={fullName}
                className="cv-tokyo__identitySection--img"
              />
            )}

            {/* Texto */}
            <div className="cv-tokyo__identitySection--text">
              <h1 className="cv-tokyo__identitySection--title">{fullName}</h1>
              <p className="cv-tokyo__identitySection--occupation">{occupation}</p>
            </div>

            {/* QR (solo si existe) */}
            {allowCvQr && onlineCvUrl && (
              <div className="cv-tokyo__identitySection--qr-wrapper">
                <QRCodeSVG
                  value={onlineCvUrl}
                  size={80}
                  level="Q"
                  bgColor="#ffffff"
                />
                <p className="cv-tokyo__identitySection--qr-text">Ver En Línea</p>
              </div>
            )}

          </>
        )}
      </div>

      <div className="cv-tokyo__split">
        {/* ==================== LADO IZQUIERDO: vertical + both ==================== */}
        <div className="cv-tokyo__split--vertical">
          {sectionsOrder
            .filter(name => {
              const sec = sectionByName[name];
              if (!sec?.enabled) return false;
              return sec.orientation === "vertical" || sec.orientation === "both";
            })
            .map(name => renderSection(name))}
        </div>

        {/* ==================== LADO DERECHO: solo horizontal ==================== */}
        <div className="cv-tokyo__split--horizontal">
          {sectionsOrder
            .filter(name => {
              const sec = sectionByName[name];
              if (!sec?.enabled) return false;
              return sec.orientation === "horizontal";
            })
            .map(name => renderSection(name))}
        </div>
      </div>
    </article>
  );
};

export default CvTokyo;