// pages/CreateCv.tsx
import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { DndContext, closestCenter, type DragEndEvent } from "@dnd-kit/core";
import {
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import type { IState } from "../../interfaces/IState";
import { reorderSections } from "../../reducers/cvSectionsSlice";

import AddSections from "./add-sections/AddSection";
import "./createcv.scss";
import EducationSection from "./education-section/EducationSection";
import ExperienceSection from "./experience-section/ExperienceSection";
import LanguagesSection from "./languages-section/LanguagesSection";
import PersonalInfoSection from "./personal-info-section/PersonalInfoSection";
import SkillsSection from "./skills-section/SkillsSection";
import LinksSection from "./links-section/LinksSection";
import CoursesSection from "./courses-section/CoursesSection";
import HobbiesSection from "./hobbies-section/HobbiesSection";
import ReferencesSection from "./references-section/ReferencesSection";
import RelevantAwards from "./relevant-awards/RelevantAwards";
import CustomSection from "./custom-section/CustomSection";
import ToolbarCV from "../../components/toolbar-cv/ToolbarCV";
import ProfileSection from "./profile-section/ProfileSection";
import ProgressBar from "../../components/progress-bar/ProgressBar";
import IdentitySection from "./identity-section/IdentitySection";
import ContactSection from "./contact-section/ContactSection";
import { templates } from "../../templates/templates";
import { setSidebar } from "../../reducers/sidebarSlice";
import SortableSection from "./sortable-section/SortableSection";
import type { ICvSectionsState } from "../../interfaces/ICvSections";

function CreateCv() {
  const dispatch = useDispatch();
  const [selectedTemplate, setSelectedTemplate] = useState<string>("default");

  const sectionsContainerRef = useRef<HTMLDivElement>(null);
  const sectionRefs = useRef<Record<string, HTMLDivElement | null>>({});
  const prevEnabledSections = useRef<string[]>([]);

  const cvSectionsState = useSelector(
    (state: IState) => state.cvSections
  ) as ICvSectionsState;

  const sections = cvSectionsState.sections;
  const order = cvSectionsState.order;

  /** Selectores reales del store */
  const personalInfo = useSelector((state: IState) => state.personalInfo);
  const profile = useSelector((state: IState) => state.profileSection);
  const education = useSelector((state: IState) => state.educationEntries);
  const experience = useSelector((state: IState) => state.experienceEntries);
  const skills = useSelector((state: IState) => state.skillsEntries);
  const languages = useSelector((state: IState) => state.languagesEntries);
  const links = useSelector((state: IState) => state.linksEntries);
  const courses = useSelector((state: IState) => state.coursesEntries);
  const hobbies = useSelector((state: IState) => state.hobbiesEntries);
  const references = useSelector((state: IState) => state.referencesEntries);
  const awards = useSelector((state: IState) => state.awardsEntries);
  const customSection = useSelector((state: IState) => state.customEntry);

  /** ❗ Nuevos selectores: identity y contact */
  const identity = useSelector((state: IState) => state.identity);
  const contact = useSelector((state: IState) => state.contactEntries);

  // Sidebar
  useEffect(() => {
    dispatch(setSidebar("create"));
  }, [dispatch]);

  // beforeunload
  useEffect(() => {
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      e.preventDefault();
      e.returnValue = "";
    };
    window.addEventListener("beforeunload", handleBeforeUnload);
    return () =>
      window.removeEventListener("beforeunload", handleBeforeUnload);
  }, []);

  // Helper: comprobar si está habilitada
  const isEnabled = (name: string) =>
    sections.find((s) => s.name === name)?.enabled;

  // Scroll cuando se habilita nueva sección
  useEffect(() => {
    const enabledNow = sections
      .filter((s) => s.enabled)
      .map((s) => s.name);

    if (enabledNow.length > prevEnabledSections.current.length) {
      setTimeout(() => {
        sectionsContainerRef.current?.scrollTo({
          top: sectionsContainerRef.current.scrollHeight,
          behavior: "smooth",
        });
      }, 80);
    }

    prevEnabledSections.current = enabledNow;
  }, [sections]);

  // Scroll hacia sección abierta
  useEffect(() => {
    const openSection = sections.find((s) => s.isOpen);
    if (openSection) {
      const el = sectionRefs.current[openSection.name];
      if (el) {
        setTimeout(() => {
          el.scrollIntoView({ behavior: "smooth", block: "start" });
        }, 100);
      }
    }
  }, [sections]);

  // Persist template
  useEffect(() => {
    const saved = localStorage.getItem("selectedTemplate");
    if (saved) setSelectedTemplate(saved);
  }, []);
  useEffect(() => {
    localStorage.setItem("selectedTemplate", selectedTemplate);
  }, [selectedTemplate]);

  const SelectedTemplate = templates.find(
    (t) => t.id === selectedTemplate
  )?.component;

  // Map de componentes por nombre
  const sectionMap: Record<string, React.FC<any>> = {
    identitySection: IdentitySection,
    contactSection: ContactSection,
    profileSection: ProfileSection,
    educationSection: EducationSection,
    experienceSection: ExperienceSection,
    skillSection: SkillsSection,
    languageSection: LanguagesSection,
    personalInfoSection: PersonalInfoSection,
    linkSection: LinksSection,
    courseSection: CoursesSection,
    hobbieSection: HobbiesSection,
    referenceSection: ReferencesSection,
    awardSection: RelevantAwards,
    customSection: CustomSection,
  };

  // DnD handler
  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;
    if (!over) return;
    if (active.id === over.id) return;

    const oldIndex = order.indexOf(String(active.id));
    const newIndex = order.indexOf(String(over.id));

    if (oldIndex === -1 || newIndex === -1) return;

    dispatch(reorderSections({ from: oldIndex, to: newIndex }));
  }

  return (
    <section className="create-cv">
      <div className="create-cv__body">
        <div className="create-cv__left">
          <ProgressBar />

          <div
            className="create-cv__left--sections"
            ref={sectionsContainerRef}
          >
            <DndContext
              collisionDetection={closestCenter}
              onDragEnd={handleDragEnd}
            >
              <SortableContext
                items={order}
                strategy={verticalListSortingStrategy}
              >
                {order.map((sectionName) => {
                  const sectionDef = sections.find(
                    (s) => s.name === sectionName
                  );
                  if (!sectionDef) return null;
                  if (!sectionDef.enabled && sectionName !== "identitySection")
                    return null;

                  const SectionComponent = sectionMap[sectionName];
                  if (!SectionComponent) return null;

                  return (
                    <SortableSection key={sectionName} id={sectionName}>
                      <div
                        ref={(el) => {
                          sectionRefs.current[sectionName] = el ?? null;
                        }}
                        data-id={sectionName}
                      >
                        <SectionComponent />
                      </div>
                    </SortableSection>
                  );
                })}
              </SortableContext>
            </DndContext>
            <AddSections />
          </div>
        </div>

        <div className="create-cv__right">
          <div className="cv-preview-header">
            <ToolbarCV />
          </div>

          <div className="cv-preview-body">
            {SelectedTemplate && (
              <SelectedTemplate
                personalInfo={personalInfo}
                profileSection={String(profile)}
                educationSection={education}
                experienceSection={experience}
                skillSection={skills}
                languageSection={languages}
                linkSection={links}
                courseSection={courses}
                hobbieSection={hobbies}
                referenceSection={references}
                awardSection={awards}
                customSection={customSection}
                identitySection={identity}
                contactSection={contact}
                sectionsConfig={sections}
                sectionsOrder={order}
              />
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

export default CreateCv;
