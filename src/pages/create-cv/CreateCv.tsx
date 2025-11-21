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
import ColorFontPopup from "../../components/color-font-popup/ColorFontPopup";
import { LuUserRoundCheck } from "react-icons/lu";
import { PiIdentificationBadge, PiStudentLight } from "react-icons/pi";
import { MdOutlineWorkOutline } from "react-icons/md";
import { GrGrow } from "react-icons/gr";
import { TbLayoutGridAdd } from "react-icons/tb";
import SectionProgress from "../../components/section-progress/SectionProgress";

function CreateCv() {
  const dispatch = useDispatch();
  const [selectedTemplate, setSelectedTemplate] = useState<string>("default");

  const sectionsContainerRef = useRef<HTMLDivElement>(null);
  const sectionRefs = useRef<Record<string, HTMLDivElement | null>>({});

  /** Para detectar cambio REAL de enabled */
  const prevEnabledMap = useRef<Record<string, boolean>>({});

  const cvSectionsState = useSelector(
    (state: IState) => state.cvSections
  ) as ICvSectionsState;

  const sections = cvSectionsState.sections;
  const order = cvSectionsState.order;

  /** Selectores reales */
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
  const customSection = useSelector((state: IState) => state.customEntries);
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

  /** ⛔ FIX: Scroll SOLO cuando una sección pasa de disabled → enabled */
  useEffect(() => {
    sections.forEach((sec) => {
      const prev = prevEnabledMap.current[sec.name];
      if (prev === false && sec.enabled === true) {
        setTimeout(() => {
          sectionsContainerRef.current?.scrollTo({
            top: sectionsContainerRef.current.scrollHeight,
            behavior: "smooth",
          });
        }, 80);
      }
      prevEnabledMap.current[sec.name] = sec.enabled;
    });
  }, [sections]);

  /** Scroll hacia sección abierta (solo cuando cambia isOpen real) */
  const prevOpen = useRef<string | null>(null);

  useEffect(() => {
    const openSection = sections.find((s) => s.isOpen);

    if (!openSection) {
      prevOpen.current = null;
      return;
    }

    if (prevOpen.current === openSection.name) return; // no hacer nada

    prevOpen.current = openSection.name;

    const el = sectionRefs.current[openSection.name];
    if (el) {
      setTimeout(() => {
        el.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 120);
    }
  }, [sections]);

  /** Persistencia template */
  useEffect(() => {
    const saved = localStorage.getItem("selectedTemplate");
    if (saved) setSelectedTemplate(saved);
  }, []);
  useEffect(() => {
    localStorage.setItem("selectedTemplate", selectedTemplate);
  }, [selectedTemplate]);

  const SelectedTemplate = templates.find((t) => t.id === selectedTemplate)
    ?.component;

  return (
    <div className="create-cv">
        <ToolbarCV />
        <SectionProgress/>
        <div className="stars-layer"></div>

          <div className="create-cv__template">
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

          {/* === POPUP COLOR & FUENTE === */}
          <ColorFontPopup/>
        </div>
  );
}

export default CreateCv;
