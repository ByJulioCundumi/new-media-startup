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

interface CvTemplateProps {
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
  return (
    <div className="cv-template">
      {/* HEADER */}
      <header className="cv-header">
        <div className="personal-info">
          {personalInfo.photo && !personalInfo.disablePhoto && (
            <img src={personalInfo.photo} alt="Foto" className="photo" />
          )}
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
        <section className="cv-section profile">
          <h3>Perfil Profesional</h3>
          <p>{profile}</p>
        </section>
      )}

      {/* EDUCATION */}
      {education.length > 0 && (
        <section className="cv-section education">
          <h3>Educación</h3>
          {education.map((edu) => (
            <div className="entry" key={edu.id}>
              <div className="entry-left">
                <strong>{edu.title}</strong>
                <span>{edu.institution}</span>
                <span>{edu.location}</span>
              </div>
              <div className="entry-right">
                <span>{edu.startMonth}/{edu.startYear} - {edu.present ? "Actualidad" : `${edu.endMonth}/${edu.endYear}`}</span>
              </div>
              {edu.description && <p className="description">{edu.description}</p>}
            </div>
          ))}
        </section>
      )}

      {/* EXPERIENCE */}
      {experience.length > 0 && (
        <section className="cv-section experience">
          <h3>Experiencia</h3>
          {experience.map((exp) => (
            <div className="entry" key={exp.id}>
              <div className="entry-left">
                <strong>{exp.position}</strong>
                <span>{exp.employer}</span>
                <span>{exp.location}</span>
              </div>
              <div className="entry-right">
                <span>{exp.startMonth}/{exp.startYear} - {exp.present ? "Actualidad" : `${exp.endMonth}/${exp.endYear}`}</span>
              </div>
              {exp.description && <p className="description">{exp.description}</p>}
            </div>
          ))}
        </section>
      )}

      {/* SKILLS */}
      {skills.length > 0 && (
        <section className="cv-section skills">
          <h3>Habilidades</h3>
          <ul className="skills-list">
            {skills.map((skill) => (
              <li key={skill.id}>{skill.name} - {skill.level}</li>
            ))}
          </ul>
        </section>
      )}

      {/* LANGUAGES */}
      {languages.length > 0 && (
        <section className="cv-section languages">
          <h3>Idiomas</h3>
          <ul className="languages-list">
            {languages.map((lang) => (
              <li key={lang.id}>{lang.name} - {lang.level}</li>
            ))}
          </ul>
        </section>
      )}

      {/* LINKS */}
      {links && links.length > 0 && (
        <section className="cv-section links">
          <h3>Enlaces</h3>
          <ul>
            {links.map((link) => (
              <li key={link.id}><a href={link.url} target="_blank" rel="noreferrer">{link.name}</a></li>
            ))}
          </ul>
        </section>
      )}

      {/* COURSES */}
      {courses && courses.length > 0 && (
        <section className="cv-section courses">
          <h3>Cursos y Certificaciones</h3>
          {courses.map((course) => (
            <div key={course.id} className="entry">
              <strong>{course.name}</strong> - {course.institution} ({course.startDate} - {course.endDate || "Actualidad"})
              {course.description && <p>{course.description}</p>}
            </div>
          ))}
        </section>
      )}

      {/* HOBBIES */}
      {hobbies && hobbies.length > 0 && (
        <section className="cv-section hobbies">
          <h3>Pasatiempos</h3>
          <ul>
            {hobbies.map((h) => (
              <li key={h.id}>{h.name}</li>
            ))}
          </ul>
        </section>
      )}

      {/* REFERENCES */}
      {references && references.length > 0 && (
        <section className="cv-section references">
          <h3>Referencias</h3>
          {references.map((ref) => (
            <div key={ref.id} className="entry">
              <strong>{ref.name}</strong> - {ref.company}
              <span>{ref.phone}</span>
              <span>{ref.email}</span>
            </div>
          ))}
        </section>
      )}

      {/* AWARDS */}
      {awards && awards.length > 0 && (
        <section className="cv-section awards">
          <h3>Premios y Reconocimientos</h3>
          {awards.map((a) => (
            <div key={a.id} className="entry">
              <strong>{a.name}</strong> ({a.date})
              {a.description && <p>{a.description}</p>}
              {a.showLink && a.link && <a href={a.link}>{a.link}</a>}
            </div>
          ))}
        </section>
      )}

      {/* CUSTOM SECTION */}
      {customSection && customSection.items.length > 0 && (
        <section className="cv-section custom-section">
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
