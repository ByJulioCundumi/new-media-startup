import "./createcv.scss"
import PersonalInfoSection from "./personal-info-section/PersonalInfoSection"
import ProfileSection from "./profile-section/ProfileSection"

function CreateCv() {
  return (
    <section className="create-cv">
        <PersonalInfoSection/>
        <ProfileSection/>
    </section>
  )
}

export default CreateCv