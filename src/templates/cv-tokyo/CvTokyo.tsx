// templates/CvTokyo.tsx
import React from "react";
import "./cvtokyo.scss";
import type { ITemplateProps } from "../../interfaces/ITemplateProps";

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
}) => {
  const { photo, firstName, lastName, jobTitle, allowCvPhoto = true } = identitySection || {};
  const fullName = `${firstName || ""} ${lastName || ""}`.trim() || "Juan Pérez";
  const occupation = jobTitle || "Desarrollador Frontend";

  return (
    <article className="cv-tokyo">
      {/* ==================== IDENTIDAD ==================== */}
      <div className="cv-tokyo__identitySection">
        {(allowCvPhoto && photo) ? (
          <img key={photo} src={photo} alt={fullName} className="cv-tokyo__identitySection--img" />
        ) : allowCvPhoto ? (
          <div className="cv-tokyo__identitySection--img-placeholder">
            <span>Foto de perfil</span>
          </div>
        ) : null}

        <div className="cv-tokyo__identitySection--text">
          <h1 className="cv-tokyo__identitySection--title">{fullName}</h1>
          <p className="cv-tokyo__identitySection--occupation">{occupation}</p>
        </div>
      </div>

      <div className="cv-tokyo__split">
        {/* ==================== LADO IZQUIERDO ==================== */}
        <div className="cv-tokyo__split--vertical">
          {/* Contacto */}
          <div className="cv-tokyo__contactSection">
            <h2 className="cv-tokyo__contactSection--title">Contacto</h2>
            {contactSection.length > 0 ? (
              contactSection.map((item) => (
                <div key={item.id} className="cv-tokyo__contactSection--item">
                  <h3 className="cv-tokyo__contactSection--item-name">{item.type}</h3>
                  <p className="cv-tokyo__contactSection--item-value">{item.value}</p>
                </div>
              ))
            ) : (
              <>
                <div className="cv-tokyo__contactSection--item placeholder">
                  <h3>Teléfono</h3>
                  <p>+57 300 123 4567</p>
                </div>
                <div className="cv-tokyo__contactSection--item placeholder">
                  <h3>Email</h3>
                  <p>juan.perez@mail.com</p>
                </div>
                <div className="cv-tokyo__contactSection--item placeholder">
                  <h3>LinkedIn</h3>
                  <p>linkedin.com/in/juanperez</p>
                </div>
              </>
            )}
          </div>

          {/* Datos personales */}
          <div className="cv-tokyo__personalInfoSection">
            <h2 className="cv-tokyo__personalInfoSection--title">Detalles</h2>
            {personalInfo.length > 0 ? (
              personalInfo.map((item) => (
                <div key={item.id} className="cv-tokyo__personalInfoSection--item">
                  <h3 className="cv-tokyo__personalInfoSection--item-name">{item.name}</h3>
                  <p className="cv-tokyo__personalInfoSection--item-value">{item.value}</p>
                </div>
              ))
            ) : (
              <>
                <div className="cv-tokyo__personalInfoSection--item placeholder">
                  <h3>Ubicación</h3>
                  <p>Bogotá, Colombia</p>
                </div>
                <div className="cv-tokyo__personalInfoSection--item placeholder">
                  <h3>Nacionalidad</h3>
                  <p>Colombiana</p>
                </div>
                <div className="cv-tokyo__personalInfoSection--item placeholder">
                  <h3>Fecha de nacimiento</h3>
                  <p>15 Marzo 1995</p>
                </div>
              </>
            )}
          </div>

          {/* Habilidades */}
          <div className="cv-tokyo__skillSection">
            <h2 className="cv-tokyo__skillSection--title">Habilidades</h2>
            {skillSection.length > 0 ? (
              skillSection.map((s) => (
                <div key={s.id} className="cv-tokyo__skillSection--item">
                  <h3 className="cv-tokyo__skillSection--item-name">{s.name}</h3>
                  <p className="cv-tokyo__skillSection--item-level">{s.level}</p>
                </div>
              ))
            ) : (
              <>
                <div className="cv-tokyo__skillSection--item placeholder">
                  <h3>React / Next.js</h3>
                  <p>Experto</p>
                </div>
                <div className="cv-tokyo__skillSection--item placeholder">
                  <h3>TypeScript</h3>
                  <p>Avanzado</p>
                </div>
                <div className="cv-tokyo__skillSection--item placeholder">
                  <h3>Node.js</h3>
                  <p>Intermedio</p>
                </div>
              </>
            )}
          </div>

          {/* Idiomas */}
          <div className="cv-tokyo__languajeSection">
            <h2 className="cv-tokyo__languajeSection--title">Idiomas</h2>
            {languageSection.length > 0 ? (
              languageSection.map((l) => (
                <div key={l.id} className="cv-tokyo__languajeSection--item">
                  <h3 className="cv-tokyo__languajeSection--item-name">{l.name}</h3>
                  <p className="cv-tokyo__languajeSection--item-level">{l.level}</p>
                </div>
              ))
            ) : (
              <>
                <div className="cv-tokyo__languajeSection--item placeholder">
                  <h3>Español</h3>
                  <p>Nativo</p>
                </div>
                <div className="cv-tokyo__languajeSection--item placeholder">
                  <h3>Inglés</h3>
                  <p>C1 - Avanzado</p>
                </div>
              </>
            )}
          </div>

          {/* Enlaces */}
          <div className="cv-tokyo__linkSection">
            <h2 className="cv-tokyo__linkSection--title">Enlaces</h2>
            {linkSection.filter((l) => l.visible).length > 0 ? (
              linkSection
                .filter((l) => l.visible)
                .map((link) => (
                  <div key={link.id} className="cv-tokyo__linkSection--item">
                    <a href={link.url} target="_blank" rel="noopener noreferrer" className="cv-tokyo__linkSection--item-url">
                      {link.name}
                    </a>
                  </div>
                ))
            ) : (
              <>
                <div className="cv-tokyo__linkSection--item placeholder">
                  <a href="#">linkedin.com/in/juanperez</a>
                </div>
                <div className="cv-tokyo__linkSection--item placeholder">
                  <a href="#">github.com/juanperez</a>
                </div>
                <div className="cv-tokyo__linkSection--item placeholder">
                  <a href="#">juanperez.dev</a>
                </div>
              </>
            )}
          </div>

          {/* Pasatiempos */}
          <div className="cv-tokyo__hobbieSection">
            <h2 className="cv-tokyo__hobbieSection--title">Pasatiempos</h2>
            <div className="cv-tokyo__hobbieSection--item">
              {hobbieSection.length > 0 ? (
                hobbieSection.map((h) => (
                  <p key={h.id} className="cv-tokyo__hobbieSection--item-name">{h.name}</p>
                ))
              ) : (
                <>
                  <p className="placeholder">Programación</p>
                  <p className="placeholder">Ciclismo</p>
                  <p className="placeholder">Leer blogs técnicos</p>
                  <p className="placeholder">Viajar</p>
                </>
              )}
            </div>
          </div>
        </div>

        {/* ==================== LADO DERECHO ==================== */}
        <div className="cv-tokyo__split--horizontal">
          {/* Perfil */}
          <div className="cv-tokyo__profileSection">
            <h2 className="cv-tokyo__profileSection--title">Perfil</h2>
            <div className="cv-tokyo__profileSection--item">
              {profileSection.trim() ? (
                <div dangerouslySetInnerHTML={{ __html: profileSection }} />
              ) : (
                <p className="placeholder">
                  Desarrollador Full Stack apasionado por crear experiencias digitales excepcionales. 
                  Especializado en React, TypeScript y arquitectura de microservicios. 
                  Me motiva resolver problemas complejos y aprender continuamente.
                </p>
              )}
            </div>
          </div>

          {/* Experiencia */}
          <div className="cv-tokyo__experienceSection">
            <h2 className="cv-tokyo__experienceSection--title">Experiencia</h2>
            {experienceSection.length > 0 ? (
              experienceSection.map((exp) => (
                <div key={exp.id} className="cv-tokyo__experienceSection--item">
                  <div className="cv-tokyo__experienceSection--item-head">
                    <h3 className="cv-tokyo__experienceSection--item-head-subtitle">
                      {exp.position}
                      <span className="cv-tokyo__experienceSection--item-head-employer"> · {exp.employer}</span>
                    </h3>
                    <p className="cv-tokyo__experienceSection--item-head-location">{exp.location}</p>
                  </div>
                  <div className="cv-tokyo__experienceSection--item-date">
                    <p>
                      {exp.startMonth} {exp.startYear} - {exp.present ? "Actualidad" : `${exp.endMonth} ${exp.endYear}`}
                    </p>
                  </div>
                  <div className="cv-tokyo__experienceSection--item-date-description">
                    {exp.description}
                  </div>
                </div>
              ))
            ) : (
              <>
                <div className="cv-tokyo__experienceSection--item placeholder">
                  <div className="cv-tokyo__experienceSection--item-head">
                    <h3>Desarrollador Frontend Senior <span>· Globant</span></h3>
                    <p>Bogotá, Colombia</p>
                  </div>
                  <div className="cv-tokyo__experienceSection--item-date">
                    <p>Ene 2023 - Actualidad</p>
                  </div>
                  <div className="cv-tokyo__experienceSection--item-date-description">
                    Lideré el desarrollo de aplicaciones React para clientes internacionales...
                  </div>
                </div>
                <div className="cv-tokyo__experienceSection--item placeholder">
                  <div className="cv-tokyo__experienceSection--item-head">
                    <h3>Desarrollador Full Stack <span>· Rappi</span></h3>
                    <p>Medellín, Colombia</p>
                  </div>
                  <div className="cv-tokyo__experienceSection--item-date">
                    <p>Jun 2021 - Dic 2022</p>
                  </div>
                  <div className="cv-tokyo__experienceSection--item-date-description">
                    Desarrollo de microservicios en Node.js y optimización de rendimiento...
                  </div>
                </div>
              </>
            )}
          </div>

          {/* Educación */}
          <div className="cv-tokyo__educationSection">
            <h2 className="cv-tokyo__educationSection--title">Educación</h2>
            {educationSection.length > 0 ? (
              educationSection.map((edu) => (
                <div key={edu.id} className="cv-tokyo__educationSection--item">
                  <div className="cv-tokyo__educationSection--item-head">
                    <h3 className="cv-tokyo__educationSection--item-head-subtitle">
                      {edu.title}
                      <span className="cv-tokyo__educationSection--item-head-employer"> · {edu.institution}</span>
                    </h3>
                    <p className="cv-tokyo__educationSection--item-head-location">{edu.location}</p>
                  </div>
                  <div className="cv-tokyo__educationSection--item-date">
                    <p>
                      {edu.startMonth} {edu.startYear} - {edu.present ? "Actualidad" : `${edu.endMonth} ${edu.endYear}`}
                    </p>
                  </div>
                  {edu.showExtraInfo && edu.description && (
                    <div className="cv-tokyo__educationSection--item-date-description">
                      {edu.description}
                    </div>
                  )}
                </div>
              ))
            ) : (
              <>
                <div className="cv-tokyo__educationSection--item placeholder">
                  <div className="cv-tokyo__educationSection--item-head">
                    <h3>Ingeniería de Sistemas <span>· Universidad Nacional de Colombia</span></h3>
                    <p>Bogotá, Colombia</p>
                  </div>
                  <div className="cv-tokyo__educationSection--item-date">
                    <p>Ene 2018 - Dic 2022</p>
                  </div>
                </div>
              </>
            )}
          </div>

          {/* Cursos y Certificados */}
          <div className="cv-tokyo__courseSection">
            <h2 className="cv-tokyo__courseSection--name">Cursos y Certificados</h2>
            {courseSection.length > 0 ? (
              courseSection.map((course) => (
                <div key={course.id} className="cv-tokyo__courseSection--item">
                  <div className="cv-tokyo__courseSection--item-head">
                    <h3 className="cv-tokyo__courseSection--item-head-subtitle">
                      {course.name}
                      <span className="cv-tokyo__courseSection--item-head-employer"> · {course.institution}</span>
                    </h3>
                    {(course.city || course.country) && (
                      <p className="cv-tokyo__courseSection--item-head-location">
                        {course.city && `${course.city}, `}{course.country}
                      </p>
                    )}
                  </div>
                  <div className="cv-tokyo__courseSection--item-date">
                    <p className="cv-tokyo__courseSection--item-date-all">
                      {course.startDate} - {course.endDate}
                    </p>
                  </div>
                  {course.description && (
                    <div className="cv-tokyo__courseSection--item-date-description">
                      {course.description}
                    </div>
                  )}
                </div>
              ))
            ) : (
              <>
                <div className="cv-tokyo__courseSection--item placeholder">
                  <div className="cv-tokyo__courseSection--item-head">
                    <h3>React Avanzado <span>· Platzi</span></h3>
                    <p>Online</p>
                  </div>
                  <div className="cv-tokyo__courseSection--item-date">
                    <p>Abr 2024</p>
                  </div>
                </div>
                <div className="cv-tokyo__courseSection--item placeholder">
                  <div className="cv-tokyo__courseSection--item-head">
                    <h3>AWS Certified Developer <span>· Amazon Web Services</span></h3>
                  </div>
                  <div className="cv-tokyo__courseSection--item-date">
                    <p>Mar 2024</p>
                  </div>
                </div>
              </>
            )}
          </div>

          {/* Premios */}
          <div className="cv-tokyo__awardSection">
            <h2 className="cv-tokyo__awardSection--name">Premios</h2>
            {awardSection.length > 0 ? (
              awardSection.map((award) => (
                <div key={award.id} className="cv-tokyo__awardSection--item">
                  <h3 className="cv-tokyo__awardSection--item-subtitle">{award.name}</h3>
                  <p className="cv-tokyo__awardSection--item-date">{award.date}</p>
                  {award.description && (
                    <div className="cv-tokyo__awardSection--item-date-description">{award.description}</div>
                  )}
                </div>
              ))
            ) : (
              <>
                <div className="cv-tokyo__awardSection--item placeholder">
                  <h3>Mejor proyecto - Hackathon Platzi 2024</h3>
                  <p>Octubre 2024</p>
                </div>
                <div className="cv-tokyo__awardSection--item placeholder">
                  <h3>Reconocimiento al liderazgo técnico</h3>
                  <p>Junio 2023</p>
                </div>
              </>
            )}
          </div>

          {/* Referencias */}
          <div className="cv-tokyo__referenceSection">
            <h2 className="cv-tokyo__referenceSection--title">Referencias Laborales</h2>
            {referenceSection.length > 0 ? (
              referenceSection.map((ref) => (
                <div key={ref.id} className="cv-tokyo__referenceSection--item">
                  <p className="cv-tokyo__referenceSection--item-head">
                    <span>{ref.name}</span>
                    <span>{ref.company}</span>
                  </p>
                  <p className="cv-tokyo__referenceSection--item-phone">{ref.phone}</p>
                  <p className="cv-tokyo__referenceSection--item-email">{ref.email}</p>
                </div>
              ))
            ) : (
              <>
                <div className="cv-tokyo__referenceSection--item placeholder">
                  <p className="cv-tokyo__referenceSection--item-head">
                    <span>María González</span>
                    <span>Tech Lead en Rappi</span>
                  </p>
                  <p>+57 310 555 1234</p>
                  <p>maria.gonzalez@rappi.com</p>
                </div>
              </>
            )}
          </div>

          {/* Sección personalizada */}
          <div className="cv-tokyo__customSection">
            <h2 className="cv-tokyo__customSection--title">
              {sectionsConfig.find(s => s.name === "customSection")?.title || "Campo Personalizado"}
            </h2>
            {customSection.length > 0 ? (
              customSection.map((item) => (
                <div key={item.id} className="cv-tokyo__customSection--item" dangerouslySetInnerHTML={{ __html: item.value }} />
              ))
            ) : (
              <div className="cv-tokyo__customSection--item placeholder">
                Este es un campo personalizado. Puedes usarlo para proyectos, publicaciones, voluntariado, etc.
              </div>
            )}
          </div>
        </div>
      </div>
    </article>
  );
};

export default CvTokyo;