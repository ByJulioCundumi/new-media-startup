import { useSelector } from "react-redux"
import Tiptap from "../../components/toolbar/Tiptap"
import AddSections from "./add-sections/AddSection"
import "./createcv.scss"
import EducationSection from "./education-section/EducationSection"
import ExperienceSection from "./experience-section/ExperienceSection"
import LanguagesSection from "./languages-section/LanguagesSection"
import PersonalInfoSection from "./personal-info-section/PersonalInfoSection"
import SkillsSection from "./skills-section/SkillsSection"
import type { IState } from "../../interfaces/IState"
import LinksSection from "./links-section/LinksSection"
import CoursesSection from "./courses-section/CoursesSection"
import HobbiesSection from "./hobbies-section/HobbiesSection"
import ReferencesSection from "./references-section/ReferencesSection"
import RelevantAwards from "./relevant-awards/RelevantAwards"
import CustomSection from "./custom-section/CustomSection"

function CreateCv() {
  const {showAwards, showCourses, showCustom, showHobbies, showLinks, showReferences} = useSelector((state:IState)=> state.addSections)

  return (
    <section className="create-cv">
        <div className="create-cv__left">
          <div className="create-cv__left--sections">
            <PersonalInfoSection/>
            <Tiptap/>
            <EducationSection/>
            <ExperienceSection/>
            <SkillsSection/>
            <LanguagesSection/>
            {showLinks && <LinksSection />}
            {showCourses && <CoursesSection />}
            {showHobbies && <HobbiesSection />}
            {showReferences && <ReferencesSection />}
            {showAwards && <RelevantAwards />}
            {showCustom && <CustomSection />}
          </div>
          <AddSections/>
        </div>
        <div className="create-cv__right">
          preview
        </div>
    </section>
  )
}

export default CreateCv