// templates/CvTokyo.tsx
import React, { useEffect } from "react";
import "./cvtokyo.scss";
import type { ITemplateProps } from "../../interfaces/ITemplateProps";
import { useDispatch } from "react-redux";
import { setAllowCvPhoto } from "../../reducers/identitySlice";

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
  const dispatch = useDispatch()

  useEffect(()=>{
    dispatch(setAllowCvPhoto(true))
  },[])

  const fullName = `${firstName || ""} ${lastName || ""}`.trim() || "";
  const occupation = jobTitle || "";

  // Helper para formatear fechas
  const formatDate = (month?: string, year?: string) => (month && year ? `${month} ${year}` : "");

  return (
    <article className="cv-tokyo">
      {/* ==================== IDENTIDAD ==================== */}
      <div className="cv-tokyo__identitySection">
        {allowCvPhoto && photo ? (
          <img src={photo} alt={`${fullName}`} className="cv-tokyo__identitySection--img" />
        ) : allowCvPhoto ? (
          <div className="cv-tokyo__identitySection--img-placeholder" />
        ) : null}
        <div className="cv-tokyo__identitySection--text">
          <h1 className="cv-tokyo__identitySection--title">{fullName}</h1>
          <p className="cv-tokyo__identitySection--occupation">{occupation}</p>
        </div>
      </div>

      <div className="cv-tokyo__split">
        {/* ==================== LADO IZQUIERDO (vertical) ==================== */}
        <div className="cv-tokyo__split--vertical">
          {/* Contacto */}
          {contactSection.length > 0 && (
            <div className="cv-tokyo__contactSection">
              <h2 className="cv-tokyo__contactSection--title">Contacto</h2>
              {contactSection.map((item) => (
                <div key={item.id} className="cv-tokyo__contactSection--item">
                  <h3 className="cv-tokyo__contactSection--item-name">{item.type}</h3>
                  <p className="cv-tokyo__contactSection--item-value">{item.value}</p>
                </div>
              ))}
            </div>
          )}

          {/* Datos personales */}
          {personalInfo.length > 0 && (
            <div className="cv-tokyo__personalInfoSection">
              <h2 className="cv-tokyo__personalInfoSection--title">Detalles</h2>
              {personalInfo.map((item) => (
                <div key={item.id} className="cv-tokyo__personalInfoSection--item">
                  <h3 className="cv-tokyo__personalInfoSection--item-name">{item.name}</h3>
                  <p className="cv-tokyo__personalInfoSection--item-value">{item.value}</p>
                </div>
              ))}
            </div>
          )}

          {/* Habilidades */}
          {skillSection.length > 0 && (
            <div className="cv-tokyo__skillSection">
              <h2 className="cv-tokyo__skillSection--title">Habilidades</h2>
              {skillSection.map((skill) => (
                <div key={skill.id} className="cv-tokyo__skillSection--item">
                  <h3 className="cv-tokyo__skillSection--item-name">{skill.name}</h3>
                  <p className="cv-tokyo__skillSection--item-level">{skill.level}</p>
                </div>
              ))}
            </div>
          )}

          {/* Idiomas */}
          {languageSection.length > 0 && (
            <div className="cv-tokyo__languajeSection">
              <h2 className="cv-tokyo__languajeSection--title">Idiomas</h2>

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
          )}

          {/* Enlaces */}
          {linkSection.filter(l => l.visible).length > 0 && (
            <div className="cv-tokyo__linkSection">
              <h2 className="cv-tokyo__linkSection--title">Enlaces</h2>
              {linkSection
                .filter((link) => link.visible)
                .map((link) => (
                  <div key={link.id} className="cv-tokyo__linkSection--item">
                    <a href={link.url} target="_blank" rel="noopener noreferrer" className="cv-tokyo__linkSection--item-url">
                      {link.name}
                    </a>
                  </div>
                ))}
            </div>
          )}

          {/* Pasatiempos */}
          {hobbieSection.length > 0 && (
            <div className="cv-tokyo__hobbieSection">
              <h2 className="cv-tokyo__hobbieSection--title">Pasatiempos</h2>
              <div className="cv-tokyo__hobbieSection--item">
                {hobbieSection.map((hobby) => (
                  <p key={hobby.id} className="cv-tokyo__hobbieSection--item-name">
                    {hobby.name}
                  </p>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* ==================== LADO DERECHO (horizontal) ==================== */}
        <div className="cv-tokyo__split--horizontal">
          {/* Perfil */}
          {profileSection.trim() && (
            <div className="cv-tokyo__profileSection">
              <h2 className="cv-tokyo__profileSection--title">Perfil</h2>
              <div className="cv-tokyo__profileSection--item" dangerouslySetInnerHTML={{ __html: profileSection }} />
            </div>
          )}

          {/* Experiencia */}
          {experienceSection.length > 0 && (
            <div className="cv-tokyo__experienceSection">
              <h2 className="cv-tokyo__experienceSection--title">Experiencia</h2>
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
                    <p className="cv-tokyo__experienceSection--item-date-end">
                      {exp.present ? "Actualidad" : `${exp.endMonth} ${exp.endYear}`}
                    </p>
                  </div>
                  <div className="cv-tokyo__experienceSection--item-date-description">{exp.description}</div>
                </div>
              ))}
            </div>
          )}

          {/* Educación */}
          {educationSection.length > 0 && (
            <div className="cv-tokyo__educationSection">
              <h2 className="cv-tokyo__educationSection--title">Educación</h2>
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
          )}

          {/* Cursos */}
          {courseSection.length > 0 && (
            <div className="cv-tokyo__courseSection">
              <h2 className="cv-tokyo__courseSection--title">Cursos y Certificados</h2>
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
                    <p className="cv-tokyo__courseSection--item-date-all">
                      <span>{course.startDate}</span>
                      <span> - </span>
                      <span>{course.endDate}</span>
                    </p>
                  </div>
                  {course.description && (
                    <div className="cv-tokyo__courseSection--item-date-description">{course.description}</div>
                  )}
                </div>
              ))}
            </div>
          )}

          {/* Premios */}
          {awardSection.length > 0 && (
            <div className="cv-tokyo__awardSection">
              <h2 className="cv-tokyo__awardSection--title">Premios</h2>
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
          )}

          {/* Referencias */}
          {referenceSection.length > 0 && (
            <div className="cv-tokyo__referenceSection">
              <h2 className="cv-tokyo__referenceSection--title">Referencias Laborales</h2>
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
          )}

          {/* Sección personalizada */}
          {customSection.length > 0 && (
            <div className="cv-tokyo__customSection">
              <h2 className="cv-tokyo__customSection--title">
                {sectionsConfig.find(s => s.name === "customSection")?.title || "Campo Personalizado"}
              </h2>
              {customSection.map((item) => (
                <div key={item.id} className="cv-tokyo__customSection--item" dangerouslySetInnerHTML={{ __html: item.value }} />
              ))}
            </div>
          )}
        </div>
      </div>
    </article>
  );
};

export default CvTokyo;