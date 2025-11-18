import React from "react";
import "./cvtemplate.scss";

import type { IPersonalInfoData } from "../../interfaces/IPersonalInfo";
import type { IEducationEntry } from "../../interfaces/IEducation";
import type { IExperienceEntry } from "../../interfaces/IExperience";
import type { ISkillEntry } from "../../interfaces/ISkills";
import type { ILanguageEntry } from "../../interfaces/ILanguages";
import type { ILinkEntry } from "../../interfaces/ILinks";
import type { ICourseEntry } from "../../interfaces/ICourses";
import type { IHobbyEntry } from "../../interfaces/IHobbies";
import type { IReferenceEntry } from "../../interfaces/IReferences";
import type { IAwardEntry } from "../../interfaces/IAward";
import type { ICustomEntry } from "../../interfaces/ICustom";
import DOMPurify from "dompurify";

interface CvTemplateProps {
  photo?: { src: string | null };
  personalInfo: IPersonalInfoData;
  profile?: string;
  education: IEducationEntry[];
  experience: IExperienceEntry[];
  skills: ISkillEntry[];
  languages: ILanguageEntry[];
  links?: ILinkEntry[];
  courses?: ICourseEntry[];
  hobbies?: IHobbyEntry[];
  references?: IReferenceEntry[];
  awards?: IAwardEntry[];
  customSection?: ICustomEntry;
}

const CvTemplate: React.FC<CvTemplateProps> = ({
  photo,
  personalInfo,
  profile,
  education,
  experience,
  skills,
  languages,
  links,
  courses,
  hobbies,
  references,
  awards,
  customSection,
}) => {
  const safeHTML = DOMPurify.sanitize(profile ?? "");

  return (
    <div className="cv-template">
      {/* HEADER */}
      <header className="cv-header">
        {photo?.src && (
          <div className="photo-wrapper">
            <img src={photo.src} alt="Foto de perfil" className="cv-photo" />
          </div>
        )}

        <div className="personal-info">
          <h1>{personalInfo.firstName} {personalInfo.lastName}</h1>
          <h2>{personalInfo.desiredJob}</h2>
          <div className="contact">
            {personalInfo.email && <span>{personalInfo.email}</span>}
            {personalInfo.phone && <span>{personalInfo.phone}</span>}
            {personalInfo.city && <span>{personalInfo.city}</span>}
            {personalInfo.website && <span>{personalInfo.website}</span>}
            {personalInfo.linkedin && <span>{personalInfo.linkedin}</span>}
          </div>
        </div>
      </header>

      {/* PROFILE */}
      {profile && (
        <section className="cv-section">
          <h3>Perfil Profesional</h3>
          <div
            className="profile-text rich-text"
            dangerouslySetInnerHTML={{ __html: safeHTML }}
          />
        </section>
      )}

      {/* EDUCATION */}
      {education.length > 0 && (
        <section className="cv-section">
          <h3>Educación</h3>
          {education.map((edu) => (
            <div className="entry" key={edu.id}>
              <div>
                <strong>{edu.title}</strong>
                <span>{edu.institution} — {edu.location}</span>
              </div>
              <div className="date">
                {edu.startMonth}/{edu.startYear} - {edu.present ? "Actualidad" : `${edu.endMonth}/${edu.endYear}`}
              </div>
              {edu.description && <p>{edu.description}</p>}
            </div>
          ))}
        </section>
      )}

      {/* EXPERIENCE */}
      {experience.length > 0 && (
        <section className="cv-section">
          <h3>Experiencia</h3>
          {experience.map((exp) => (
            <div className="entry" key={exp.id}>
              <div>
                <strong>{exp.position}</strong>
                <span>{exp.employer} — {exp.location}</span>
              </div>
              <div className="date">
                {exp.startMonth}/{exp.startYear} - {exp.present ? "Actualidad" : `${exp.endMonth}/${exp.endYear}`}
              </div>
              {exp.description && <p>{exp.description}</p>}
            </div>
          ))}
        </section>
      )}

      {/* SKILLS */}
      {skills.length > 0 && (
        <section className="cv-section">
          <h3>Habilidades</h3>
          <ul className="inline-list">
            {skills.map((skill) => (
              <li key={skill.id}>{skill.name} ({skill.level})</li>
            ))}
          </ul>
        </section>
      )}

      {/* LANGUAGES */}
      {languages.length > 0 && (
        <section className="cv-section">
          <h3>Idiomas</h3>
          <ul className="inline-list">
            {languages.map((lang) => (
              <li key={lang.id}>{lang.name} ({lang.level})</li>
            ))}
          </ul>
        </section>
      )}

      {/* LINKS */}
      {links && links.length > 0 && (
        <section className="cv-section">
          <h3>Enlaces</h3>
          <ul className="inline-list">
            {links.map((link) => (
              <li key={link.id}><a href={link.url} target="_blank" rel="noreferrer">{link.name}</a></li>
            ))}
          </ul>
        </section>
      )}

      {/* COURSES */}
      {courses && courses.length > 0 && (
        <section className="cv-section">
          <h3>Cursos y Certificaciones</h3>
          {courses.map((course) => (
            <div key={course.id} className="entry">
              <strong>{course.name}</strong> — {course.institution}
              <div className="date">{course.startDate} - {course.endDate || "Actualidad"}</div>
              {course.description && <p>{course.description}</p>}
            </div>
          ))}
        </section>
      )}

      {/* HOBBIES */}
      {hobbies && hobbies.length > 0 && (
        <section className="cv-section">
          <h3>Pasatiempos</h3>
          <ul className="inline-list">
            {hobbies.map((h) => (
              <li key={h.id}>{h.name}</li>
            ))}
          </ul>
        </section>
      )}

      {/* REFERENCES */}
      {references && references.length > 0 && (
        <section className="cv-section">
          <h3>Referencias</h3>
          {references.map((ref) => (
            <p key={ref.id}>
              <strong>{ref.name}</strong> — {ref.company}<br />
              {ref.phone} · {ref.email}
            </p>
          ))}
        </section>
      )}

      {/* AWARDS */}
      {awards && awards.length > 0 && (
        <section className="cv-section">
          <h3>Premios y Reconocimientos</h3>
          {awards.map((a) => (
            <p key={a.id}>
              <strong>{a.name}</strong> ({a.date})<br />
              {a.description}
              {a.showLink && a.link && (
                <><br /><a href={a.link}>{a.link}</a></>
              )}
            </p>
          ))}
        </section>
      )}

      {/* CUSTOM SECTION */}
      {customSection && customSection.items.length > 0 && (
        <section className="cv-section">
          <h3>{customSection.title}</h3>
          <ul>
            {customSection.items.map((item) => (
              <li key={item.id}>{item.content}</li>
            ))}
          </ul>
        </section>
      )}
    </div>
  );
};

export default CvTemplate;
