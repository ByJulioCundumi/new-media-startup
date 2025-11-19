import React from "react";
import "./cvtemplate.scss";
import DOMPurify from "dompurify";
import type { ITemplateProps } from "../../interfaces/ITemplateProps";

const CvTemplate: React.FC<ITemplateProps> = ({
  personalInfo = [],
  profileSection = "",
  educationSection = [],
  experienceSection = [],
  skillSection = [],
  languageSection = [],
  linkSection = [],
  courseSection = [],
  hobbieSection = [],
  referenceSection = [],
  awardSection = [],
  customSection = [],           // ← SIEMPRE array vacío por defecto
  identitySection = { firstName: "", lastName: "", jobTitle: "", photo: "", allowCvPhoto: false },
  contactSection = [],
  sectionsConfig = [],
  sectionsOrder = [],
}) => {

  // ORDENAR SECCIONES SEGÚN EL ORDEN DEL USUARIO
  const orderedSections = sectionsOrder
    .map((name) => sectionsConfig.find((s) => s.name === name))
    .filter((s): s is NonNullable<typeof s> => !!s && s.enabled);

  // SEPARAR POR ORIENTACIÓN (both / horizontal)
  const horizontalSlots: string[] = [];
  const bothSlots: string[] = [];

  orderedSections.forEach((s) => {
    if (s.orientation === "both") bothSlots.push(s.name);
    else horizontalSlots.push(s.name);
  });

  // WRAPPER COMÚN
  const SectionWrapper = (title: string, content: React.ReactNode) => (
    <section className="cv-section">
      {title && <h3 className="cv-section__title">{title}</h3>}
      <div className="cv-section__content">{content}</div>
    </section>
  );

  // RENDERIZADO DE CADA SECCIÓN
  const renderSection = (name: string) => {
    switch (name) {

      case "identitySection":
        return SectionWrapper(
          "",
          <div className="identity-header">
            {identitySection.allowCvPhoto && identitySection.photo && (
              <img src={identitySection.photo} alt="Foto de perfil" className="identity-photo" />
            )}
            <div>
              <h1>{identitySection.firstName} {identitySection.lastName}</h1>
              <h2>{identitySection.jobTitle}</h2>
            </div>
          </div>
        );

      case "contactSection":
        return contactSection.length > 0 && SectionWrapper(
          sectionsConfig.find(s => s.name === "contactSection")?.title || "Contacto",
          <ul className="list">
            {contactSection.map((c) => (
              <li key={c.id}>
                <strong>{c.type}:</strong> {c.value}
              </li>
            ))}
          </ul>
        );

      case "profileSection":
        return profileSection && SectionWrapper(
          sectionsConfig.find(s => s.name === "profileSection")?.title || "Perfil Profesional",
          <div dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(String(profileSection)) }} />
        );

      case "educationSection":
        return educationSection.length > 0 && SectionWrapper(
          "Educación",
          educationSection.map((e) => (
            <div className="entry" key={e.id}>
              <div className="entry__title">{e.title}</div>
              <div className="entry__subtitle">{e.institution}</div>
              <div className="entry__location">{e.location}</div>
              <div className="entry__dates">
                {e.startMonth}/{e.startYear} – {e.present ? "Actualidad" : `${e.endMonth}/${e.endYear}`}
              </div>
              {e.description && <p className="entry__description">{e.description}</p>}
            </div>
          ))
        );

      case "experienceSection":
        return experienceSection.length > 0 && SectionWrapper(
          "Experiencia Laboral",
          experienceSection.map((e) => (
            <div className="entry" key={e.id}>
              <div className="entry__title">{e.position}</div>
              <div className="entry__subtitle">{e.employer}</div>
              <div className="entry__location">{e.location}</div>
              <div className="entry__dates">
                {e.startMonth}/{e.startYear} – {e.present ? "Actualidad" : `${e.endMonth}/${e.endYear}`}
              </div>
              {e.description && <p className="entry__description">{e.description}</p>}
            </div>
          ))
        );

      case "skillSection":
        return skillSection.length > 0 && SectionWrapper(
          "Habilidades",
          <ul className="list">
            {skillSection.map((s) => <li key={s.id}>{s.name} — {s.level}</li>)}
          </ul>
        );

      case "languageSection":
        return languageSection.length > 0 && SectionWrapper(
          "Idiomas",
          <ul className="list">
            {languageSection.map((l) => <li key={l.id}>{l.name} — {l.level}</li>)}
          </ul>
        );

      case "linkSection":
        return linkSection.length > 0 && SectionWrapper(
          "Enlaces",
          <ul className="list">
            {linkSection.map((l) => (
              <li key={l.id}>
                {l.visible ? (
                  <> <strong>{l.name}:</strong> {l.url} </>
                ) : (
                  <a href={l.url} target="_blank" rel="noopener noreferrer" className="cv-link-hidden">
                    {l.name}
                  </a>
                )}
              </li>
            ))}
          </ul>
        );

      case "personalInfoSection":
        return personalInfo.length > 0 && SectionWrapper(
          "Información Personal",
          <ul className="list">
            {personalInfo.map((p) => (
              <li key={p.id}><strong>{p.name}:</strong> {p.value}</li>
            ))}
          </ul>
        );

      case "courseSection":
        return courseSection.length > 0 && SectionWrapper(
          "Cursos y Certificaciones",
          courseSection.map((c) => (
            <div className="entry" key={c.id}>
              <div className="entry__title">{c.name}</div>
              <div className="entry__subtitle">{c.institution}</div>
              {(c.city || c.country) && (
                <div className="entry__location">
                  {[c.city, c.country].filter(Boolean).join(", ")}
                </div>
              )}
              <div className="entry__dates">{c.startDate} – {c.endDate}</div>
              {c.description && <p className="entry__description">{c.description}</p>}
            </div>
          ))
        );

      case "hobbieSection":
        return hobbieSection.length > 0 && SectionWrapper(
          "Pasatiempos",
          <ul className="list">
            {hobbieSection.map((h) => <li key={h.id}>{h.name}</li>)}
          </ul>
        );

      case "referenceSection":
        return referenceSection.length > 0 && SectionWrapper(
          "Referencias Laborales",
          referenceSection.map((r) => (
            <div className="entry" key={r.id}>
              <div className="entry__title">{r.name}</div>
              <div className="entry__subtitle">{r.company}</div>
              <div className="entry__contact">
                <strong>Tel:</strong> {r.phone} — <strong>Email:</strong> {r.email}
              </div>
            </div>
          ))
        );

      case "awardSection":
        return awardSection.length > 0 && SectionWrapper(
          "Premios",
          awardSection.map((a) => (
            <div className="entry" key={a.id}>
              <div className="entry__title">{a.name}</div>
              <div className="entry__dates">{a.date}</div>
              {a.description && <p className="entry__description">{a.description}</p>}
            </div>
          ))
        );

      // CUSTOM SECTION — ¡AHORA FUNCIONA PERFECTO!
      case "customSection": {
        const items = Array.isArray(customSection) ? customSection : [];
        if (items.length === 0) return null;

        const sectionConfig = sectionsConfig.find(s => s.name === "customSection");
        const title = sectionConfig?.title || "Campo Personalizado";

        return SectionWrapper(
          title,
          <ul className="list">
            {items.map((item, index) => (
              <li key={item.id || `custom-${index}`}>
                {item.value}
              </li>
            ))}
          </ul>
        );
      }

      default:
        return null;
    }
  };

  return (
    <div className="cv-template">
      <aside className="cv-left">
        {bothSlots.map((name) => (
          <div className="cv-block" key={name}>
            {renderSection(name)}
          </div>
        ))}
      </aside>

      <main className="cv-right">
        {horizontalSlots.map((name) => (
          <div className="cv-block" key={name}>
            {renderSection(name)}
          </div>
        ))}
      </main>
    </div>
  );
};

export default CvTemplate;