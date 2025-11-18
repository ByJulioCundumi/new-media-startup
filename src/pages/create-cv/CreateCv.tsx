import { useDispatch, useSelector } from "react-redux";
import AddSections from "./add-sections/AddSection";
import "./createcv.scss";
import EducationSection from "./education-section/EducationSection";
import ExperienceSection from "./experience-section/ExperienceSection";
import LanguagesSection from "./languages-section/LanguagesSection";
import PersonalInfoSection from "./personal-info-section/PersonalInfoSection";
import SkillsSection from "./skills-section/SkillsSection";
import type { IState } from "../../interfaces/IState";
import LinksSection from "./links-section/LinksSection";
import CoursesSection from "./courses-section/CoursesSection";
import HobbiesSection from "./hobbies-section/HobbiesSection";
import ReferencesSection from "./references-section/ReferencesSection";
import RelevantAwards from "./relevant-awards/RelevantAwards";
import CustomSection from "./custom-section/CustomSection";
import ToolbarCV from "../../components/toolbar-cv/ToolbarCV";
import ProfileSection from "./profile-section/ProfileSection";
import { useEffect, useRef, useState } from "react";
import { setSidebar } from "../../reducers/sidebarSlice";
import { templates } from "../../templates/templates";
import ProgressBar from "../../components/progress-bar/ProgressBar";
import PhotoSection from "./photo-section/PhotoSection";

function CreateCv() {
  const dispatch = useDispatch();
  const [selectedTemplate, setSelectedTemplate] = useState<string>("default");

  const sectionsContainerRef = useRef<HTMLDivElement>(null);
  const sectionRefs = useRef<Record<string, HTMLDivElement | null>>({});
  const prevEnabledSections = useRef<string[]>([]);

  const sections = useSelector((state: IState) => state.cvSections);
  const photo = useSelector((state: IState) => state.photo);
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

  // Sidebar
  useEffect(() => {
    dispatch(setSidebar("create"));
  }, [dispatch]);

  // Confirmación al cerrar o salir
  useEffect(() => {
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      e.preventDefault();
      e.returnValue = "";
    };
    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => window.removeEventListener("beforeunload", handleBeforeUnload);
  }, []);

  // Saber si una sección está habilitada
  const isEnabled = (name: string) => sections.find((s) => s.name === name)?.enabled;

  // Scroll cuando se habilita una nueva sección
  useEffect(() => {
    const enabledNow = sections.filter((s) => s.enabled).map((s) => s.name);

    // Scroll down solo si se habilitó una nueva sección
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

  // Scroll hacia la sección abierta (isOpen = true)
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

  // Persistir la plantilla seleccionada
  useEffect(() => {
    const saved = localStorage.getItem("selectedTemplate");
    if (saved) setSelectedTemplate(saved);
  }, []);

  useEffect(() => {
    localStorage.setItem("selectedTemplate", selectedTemplate);
  }, [selectedTemplate]);

  const SelectedTemplate = templates.find((t) => t.id === selectedTemplate)?.component;

  return (
    <section className="create-cv">
      <div className="create-cv__body">
        <div className="create-cv__left">
          <ProgressBar />

          <div className="create-cv__left--sections" ref={sectionsContainerRef}>
            <div ref={(el) => { sectionRefs.current["photoSection"] = el ?? null; }}>
              <PhotoSection />
            </div>

            <div ref={(el) => { sectionRefs.current["personalInfoSection"] = el ?? null; }}>
              <PersonalInfoSection />
            </div>

            <div ref={(el) => { sectionRefs.current["profileSection"] = el ?? null; }}>
              <ProfileSection />
            </div>

            <div ref={(el) => { sectionRefs.current["educationSection"] = el ?? null; }}>
              <EducationSection />
            </div>

            <div ref={(el) => { sectionRefs.current["experienceSection"] = el ?? null; }}>
              <ExperienceSection />
            </div>

            <div ref={(el) => { sectionRefs.current["skillSection"] = el ?? null; }}>
              <SkillsSection />
            </div>

            <div ref={(el) => { sectionRefs.current["languageSection"] = el ?? null; }}>
              <LanguagesSection />
            </div>

            {isEnabled("linkSection") && (
              <div ref={(el) => { sectionRefs.current["linkSection"] = el ?? null; }}>
                <LinksSection />
              </div>
            )}
            {isEnabled("courseSection") && (
              <div ref={(el) => { sectionRefs.current["courseSection"] = el ?? null; }}>
                <CoursesSection />
              </div>
            )}
            {isEnabled("hobbieSection") && (
              <div ref={(el) => { sectionRefs.current["hobbieSection"] = el ?? null; }}>
                <HobbiesSection />
              </div>
            )}
            {isEnabled("referenceSection") && (
              <div ref={(el) => { sectionRefs.current["referenceSection"] = el ?? null; }}>
                <ReferencesSection />
              </div>
            )}
            {isEnabled("awardSection") && (
              <div ref={(el) => { sectionRefs.current["awardSection"] = el ?? null; }}>
                <RelevantAwards />
              </div>
            )}
            {isEnabled("customSection") && (
              <div ref={(el) => { sectionRefs.current["customSection"] = el ?? null; }}>
                <CustomSection />
              </div>
            )}
          </div>

          <AddSections />
        </div>

        <div className="create-cv__right">
          <div className="cv-preview-header">
            <ToolbarCV />
          </div>

          <div className="cv-preview-body">
            {SelectedTemplate && (
              <SelectedTemplate
                photo={photo}
                personalInfo={personalInfo}
                profile={String(profile)}
                education={education}
                experience={experience}
                skills={skills}
                languages={languages}
                links={links}
                courses={courses}
                hobbies={hobbies}
                references={references}
                awards={awards}
                customSection={customSection}
              />
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

export default CreateCv;
