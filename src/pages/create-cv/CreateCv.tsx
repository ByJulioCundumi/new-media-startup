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
import { useEffect, useState } from "react";
import { setSidebar } from "../../reducers/sidebarSlice";
import { awardsMock, coursesMock, customSectionMock, educationMock, experienceMock, hobbiesMock, languagesMock, linksMock, personalInfoMock, photoMock, profileMock, referencesMock, skillsMock } from "../../util/cvtemplatemock";
import { templates } from "../../templates/templates";
import ProgressBar from "../../components/progress-bar/ProgressBar";
import PhotoSection from "./photo-section/PhotoSection";

function CreateCv() {
  const dispatch = useDispatch();
  const sections = useSelector((state: IState) => state.cvSections);
  const [selectedTemplate, setSelectedTemplate] = useState<string>("default");

  useEffect(() => {
    dispatch(setSidebar("create"));
  }, [dispatch]);

  // Saber si una sección está habilitada
  const isEnabled = (name: string) => sections.find((s) => s.name === name)?.enabled;

  // Confirmación al cerrar o salir
  useEffect(() => {
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      e.preventDefault();
      e.returnValue = "";
    };
    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => window.removeEventListener("beforeunload", handleBeforeUnload);
  }, []);

  // Persistir la plantilla seleccionada
  useEffect(() => {
    const saved = localStorage.getItem("selectedTemplate");
    if (saved) setSelectedTemplate(saved);
  }, []);

  useEffect(() => {
    localStorage.setItem("selectedTemplate", selectedTemplate);
  }, [selectedTemplate]);

  const SelectedTemplate = templates.find(t => t.id === selectedTemplate)?.component;

  return (
    <section className="create-cv">
      
      <div className="create-cv__body">
        <div className="create-cv__left">
          <ProgressBar />
          <div className="create-cv__left--sections">
            <PhotoSection />
            <PersonalInfoSection />
            <ProfileSection />
            <EducationSection />
            <ExperienceSection />
            <SkillsSection />
            <LanguagesSection />
            {isEnabled("linkSection") && <LinksSection />}
            {isEnabled("courseSection") && <CoursesSection />}
            {isEnabled("hobbieSection") && <HobbiesSection />}
            {isEnabled("referenceSection") && <ReferencesSection />}
            {isEnabled("awardSection") && <RelevantAwards />}
            {isEnabled("customSection") && <CustomSection />}
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
        photo={photoMock}
        personalInfo={personalInfoMock}
        profile={profileMock}
        education={educationMock}
        experience={experienceMock}
        skills={skillsMock}
        languages={languagesMock}
        links={linksMock}
        courses={coursesMock}
        hobbies={hobbiesMock}
        references={referencesMock}
        awards={awardsMock}
        customSection={customSectionMock}
      />
    )}
  </div>
</div>

      </div>
    </section>
  );
}

export default CreateCv;
