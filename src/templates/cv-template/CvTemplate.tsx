import React from "react";
import "./cvtemplate.scss";
import DOMPurify from "dompurify";

import type { ITemplateProps } from "../../interfaces/ITemplateProps";

const CvTemplate: React.FC<ITemplateProps> = ({
  personalInfo,
  profileSection,
  educationSection,
  experienceSection,
  skillSection,
  languageSection,
  linkSection,
  courseSection,
  hobbieSection,
  referenceSection,
  awardSection,
  customSection,
  identitySection,
  contactSection,
  sectionsConfig,
  sectionsOrder,
}) => {

  // ------------------------------
  // ⭐ 1. Ordenar secciones reales
  // ------------------------------
  const orderedSections = sectionsOrder
    .map((name) => sectionsConfig.find((s) => s.name === name))
    .filter((s) => s && s.enabled);

  // ------------------------------
  // ⭐ 2. Separar por orientación
  // ------------------------------
  const horizontalSlots: string[] = [];
  const bothSlots: string[] = [];

  orderedSections.forEach((section) => {
    if (!section) return;
    if (section.orientation === "both") bothSlots.push(section.name);
    else horizontalSlots.push(section.name);
  });

  // ------------------------------
  // ⭐ 3. Renderizador de secciones
  // ------------------------------
  const renderSection = (name: string) => {
    switch (name) {
      case "identitySection":
        return identitySection && (
          <section className="cv-section">
            <h3>Identidad</h3>
            <p>{identitySection.firstName} {identitySection.lastName}</p>
            <p>{identitySection.jobTitle}</p>
          </section>
        );

      case "contactSection":
        return contactSection.length > 0 && (
          <section className="cv-section">
            <h3>Contacto</h3>
            <ul>
              {contactSection.map((c) => (
                <li key={c.id}>
                  {c.type}: {c.value}
                </li>
              ))}
            </ul>
          </section>
        );

      case "profileSection":
        return profileSection && (
          <section className="cv-section">
            <h3>Perfil Profesional</h3>
            <div
              dangerouslySetInnerHTML={{
                __html: DOMPurify.sanitize(String(profileSection)),
              }}
            />
          </section>
        );

      case "educationSection":
        return educationSection.length > 0 && (
          <section className="cv-section">
            <h3>Educación</h3>
            {educationSection.map((e) => (
              <div key={e.id}>
                <strong>{e.title}</strong>
                <p>{e.institution}</p>
              </div>
            ))}
          </section>
        );

      case "experienceSection":
        return experienceSection.length > 0 && (
          <section className="cv-section">
            <h3>Experiencia</h3>
            {experienceSection.map((e) => (
              <div key={e.id}>
                <strong>{e.position}</strong>
                <p>{e.employer}</p>
              </div>
            ))}
          </section>
        );

      case "skillSection":
        return skillSection.length > 0 && (
          <section className="cv-section">
            <h3>Habilidades</h3>
            <ul>
              {skillSection.map((s) => (
                <li key={s.id}>
                  {s.name} - {s.level}
                </li>
              ))}
            </ul>
          </section>
        );

      case "languageSection":
        return languageSection.length > 0 && (
          <section className="cv-section">
            <h3>Idiomas</h3>
            <ul>
              {languageSection.map((l) => (
                <li key={l.id}>
                  {l.name} - {l.level}
                </li>
              ))}
            </ul>
          </section>
        );

      case "linkSection":
        return linkSection.length > 0 && (
          <section className="cv-section">
            <h3>Enlaces</h3>
            <ul>
              {linkSection.map((l) => (
                <li key={l.id}>
                  {l.name}: {l.url}
                </li>
              ))}
            </ul>
          </section>
        );

      case "hobbieSection":
        return hobbieSection.length > 0 && (
          <section className="cv-section">
            <h3>Pasatiempos</h3>
            <ul>
              {hobbieSection.map((h) => (
                <li key={h.id}>{h.name}</li>
              ))}
            </ul>
          </section>
        );

      case "courseSection":
        return courseSection.length > 0 && (
          <section className="cv-section">
            <h3>Cursos</h3>
            {courseSection.map((c) => (
              <div key={c.id}>
                <strong>{c.name}</strong>
                <p>{c.institution}</p>
              </div>
            ))}
          </section>
        );

      case "referenceSection":
        return referenceSection.length > 0 && (
          <section className="cv-section">
            <h3>Referencias</h3>
            {referenceSection.map((r) => (
              <div key={r.id}>
                {r.name} - {r.company}
              </div>
            ))}
          </section>
        );

      case "awardSection":
        return awardSection.length > 0 && (
          <section className="cv-section">
            <h3>Premios</h3>
            {awardSection.map((a) => (
              <div key={a.id}>{a.name}</div>
            ))}
          </section>
        );

      case "customSection":
        return customSection && (
          <section className="cv-section">
            <h3>{customSection.title}</h3>
            <ul>
              {customSection.items.map((i) => (
                <li key={i.id}>{i.content}</li>
              ))}
            </ul>
          </section>
        );

      default:
        return null;
    }
  };

  return (
    <div className="cv-template">

      {/* LEFT COLUMN → Secciones BOTH */}
      <aside className="left-column">
        {bothSlots.map((name) => (
          <div key={name}>{renderSection(name)}</div>
        ))}
      </aside>

      {/* RIGHT COLUMN → Secciones horizontales */}
      <main className="right-column">
        {horizontalSlots.map((name) => (
          <div key={name}>{renderSection(name)}</div>
        ))}
      </main>

    </div>
  );
};

export default CvTemplate;
