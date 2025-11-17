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
import { useEffect } from "react";
import { setSidebar } from "../../reducers/sidebarSlice";

function CreateCv() {
  const dispatch = useDispatch();
  const sections = useSelector((state: IState) => state.cvSections);

  useEffect(() => {
    dispatch(setSidebar("create"));
  }, []);

  // Función auxiliar para saber si una sección está habilitada
  const isEnabled = (name: string) => sections.find((s) => s.name === name)?.enabled;

  return (
    <section className="create-cv">
      <ToolbarCV />
      <div className="create-cv__body">
        <div className="create-cv__left">
          <div className="create-cv__left--sections">
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
          preview
        </div>
      </div>
    </section>
  );
}

export default CreateCv;
