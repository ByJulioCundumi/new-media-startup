import React, { useEffect, useRef, useState } from "react";
import "./floatingeditor.scss";

// Secciones
import PersonalInfoSection from "../../pages/create-cv/personal-info-section/PersonalInfoSection";
import ProfileSection from "../../pages/create-cv/profile-section/ProfileSection";
import EducationSection from "../../pages/create-cv/education-section/EducationSection";
import ExperienceSection from "../../pages/create-cv/experience-section/ExperienceSection";
import SkillsSection from "../../pages/create-cv/skills-section/SkillsSection";
import LanguagesSection from "../../pages/create-cv/languages-section/LanguagesSection";
import LinksSection from "../../pages/create-cv/links-section/LinksSection";
import CoursesSection from "../../pages/create-cv/courses-section/CoursesSection";
import HobbiesSection from "../../pages/create-cv/hobbies-section/HobbiesSection";
import ReferencesSection from "../../pages/create-cv/references-section/ReferencesSection";
import RelevantAwards from "../../pages/create-cv/relevant-awards/RelevantAwards";
import CustomSection from "../../pages/create-cv/custom-section/CustomSection";
import IdentitySection from "../../pages/create-cv/identity-section/IdentitySection";
import ContactSection from "../../pages/create-cv/contact-section/ContactSection";

import { useSelector, useDispatch } from "react-redux";
import type { IState } from "../../interfaces/IState";
import { toggleSectionEditor } from "../../reducers/cvSectionsSlice";

const FloatingEditor: React.FC = () => {
  const editorRef = useRef<HTMLDivElement>(null);
  const dispatch = useDispatch();

  // ---------------- HOOKS ----------------
  const sections = useSelector((state: IState) => state.cvSections.sections);

  const [position, setPosition] = useState({ x: 180, y: 100 });
  const [dragging, setDragging] = useState(false);
  const [offset, setOffset] = useState({ x: 0, y: 0 });

  // ---------------- DRAG ----------------
  const onMouseDown = (e: React.MouseEvent) => {
    setDragging(true);
    if (!editorRef.current) return;
    const rect = editorRef.current.getBoundingClientRect();
    setOffset({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  const onMouseMove = (e: MouseEvent) => {
    if (!dragging) return;
    setPosition({ x: e.clientX - offset.x, y: e.clientY - offset.y });
  };

  const onMouseUp = () => setDragging(false);

  useEffect(() => {
    if (!dragging) return;
    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseup", onMouseUp);
    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseup", onMouseUp);
    };
  }, [dragging]);

  // ---------------- ACTIVE SECTION ----------------
  const activeSection = sections.find((s) => s.isEditorOpen);

  // ---------------- RENDER ----------------
  const renderSection = () => {
    if (!activeSection) return null;

    switch (activeSection.name) {
      case "personalInfoSection": return <PersonalInfoSection />;
      case "profileSection": return <ProfileSection />;
      case "educationSection": return <EducationSection />;
      case "experienceSection": return <ExperienceSection />;
      case "skillSection": return <SkillsSection />;
      case "languageSection": return <LanguagesSection />;
      case "linkSection": return <LinksSection />;
      case "courseSection": return <CoursesSection />;
      case "hobbieSection": return <HobbiesSection />;
      case "referenceSection": return <ReferencesSection />;
      case "awardSection": return <RelevantAwards />;
      case "customSection": return <CustomSection />;
      case "identitySection": return <IdentitySection />;
      case "contactSection": return <ContactSection />;
      default: return <div className="floating-editor__empty">Sección no encontrada</div>;
    }
  };

  const handleClose = () => {
    if (activeSection) dispatch(toggleSectionEditor(activeSection.name));
  };

  return (
    <>
      {activeSection && (
        <div
          ref={editorRef}
          className="floating-editor"
          style={{ transform: `translate(${position.x}px, ${position.y}px)` }}
        >
          <div className="floating-editor__header" onMouseDown={onMouseDown}>
            <span>Editor</span>
            <button className="floating-editor__close" onClick={handleClose}>
              ×
            </button>
          </div>
          <div className="floating-editor__content">{renderSection()}</div>
        </div>
      )}
    </>
  );
};

export default FloatingEditor;
