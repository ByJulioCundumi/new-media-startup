import Tiptap from "../../components/toolbar/Tiptap"
import { Toolbar } from "../../components/toolbar/Toolbar"
import CoursesSection from "./courses-section/CoursesSection"
import "./createcv.scss"
import CustomSection from "./custom-section/CustomSection"
import EducationSection from "./education-section/EducationSection"
import ExperienceSection from "./experience-section/ExperienceSection"
import HobbiesSection from "./hobbies-section/HobbiesSection"
import LanguagesSection from "./languages-section/LanguagesSection"
import LinksSection from "./links-section/LinksSection"
import PersonalInfoSection from "./personal-info-section/PersonalInfoSection"
import ReferencesSection from "./references-section/ReferencesSection"
import RelevantAwards from "./relevant-awards/RelevantAwards"
import SkillsSection from "./skills-section/SkillsSection"

function CreateCv() {
  return (
    <section className="create-cv">
        <div className="create-cv__left">
          <PersonalInfoSection/>
          <Tiptap/>
          <EducationSection/>
          <ExperienceSection/>
          <SkillsSection/>
          <LanguagesSection/>

          <LinksSection/>
          <CoursesSection/>
          <HobbiesSection/>
          <ReferencesSection/>
          <RelevantAwards/>
          <CustomSection/>
        </div>
        <div className="create-cv__right">
          preview
        </div>
    </section>
  )
}

export default CreateCv