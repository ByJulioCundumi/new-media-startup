import React from "react";
import "./cvtemplate.scss";
import DOMPurify from "dompurify";

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

      {/* LEFT COLUMN */}
      <aside className="left-column">
        {/* PHOTO */}
        {photo?.src && (
          <div className="photo-wrapper">
            <img src={photo.src} alt="Foto de perfil" />
          </div>
        )}

        {/* NAME */}
        <h1 className="name">
          {personalInfo.firstName} {personalInfo.lastName}
        </h1>
        <h2 className="role">{personalInfo.desiredJob}</h2>

        {/* CONTACT */}
        <div className="section">
          <h3>Contact</h3>
          <ul className="info-list">
            {personalInfo.email && <li>{personalInfo.email}</li>}
            {personalInfo.city && <li>{personalInfo.city}</li>}
            {personalInfo.phone && <li>{personalInfo.phone}</li>}
            {personalInfo.website && <li>{personalInfo.website}</li>}
            {personalInfo.linkedin && <li>{personalInfo.linkedin}</li>}
          </ul>
        </div>

        {/* SKILLS */}
        {skills.length > 0 && (
          <div className="section">
            <h3>Technical Skills</h3>
            <ul className="skills-list">
              {skills.map((s) => (
                <li key={s.id}>
                  <span>{s.name}</span>
                  <div className="dots">
                    {[...Array(5)].map((_, i) => (
                      <span
                        key={i}
                        className={i < (s.level || 0) ? "dot filled" : "dot"}
                      />
                    ))}
                  </div>
                </li>
              ))}
            </ul>
          </div>
        )}
      </aside>

      {/* RIGHT COLUMN */}
      <main className="right-column">
        {/* PROFILE */}
        {profile && (
          <section className="cv-section">
            <h3 className="section-title">Professional Summary</h3>
            <div
              className="rich-text"
              dangerouslySetInnerHTML={{ __html: safeHTML }}
            />
          </section>
        )}

        {/* EXPERIENCE */}
        {experience.length > 0 && (
          <section className="cv-section">
            <h3 className="section-title">Employment</h3>
            {experience.map((exp) => (
              <div className="entry" key={exp.id}>
                <div className="entry-header">
                  <strong>{exp.position}</strong>
                  <span className="job-type">{exp.type || ""}</span>
                </div>
                <div className="entry-sub">
                  <span>{exp.employer}</span>
                  <span>{exp.location}</span>
                  <span>
                    {exp.startMonth}/{exp.startYear} -{" "}
                    {exp.present
                      ? "Present"
                      : `${exp.endMonth}/${exp.endYear}`}
                  </span>
                </div>
                {exp.description && <p>{exp.description}</p>}
              </div>
            ))}
          </section>
        )}

        {/* EDUCATION */}
        {education.length > 0 && (
          <section className="cv-section">
            <h3 className="section-title">Education</h3>
            {education.map((edu) => (
              <div className="entry" key={edu.id}>
                <strong>{edu.title}</strong>
                <div className="entry-sub">
                  <span>{edu.institution}</span>
                  <span>
                    {edu.startMonth}/{edu.startYear} -{" "}
                    {edu.present
                      ? "Present"
                      : `${edu.endMonth}/${edu.endYear}`}
                  </span>
                </div>
              </div>
            ))}
          </section>
        )}
      </main>

    </div>
  );
};

export default CvTemplate;
