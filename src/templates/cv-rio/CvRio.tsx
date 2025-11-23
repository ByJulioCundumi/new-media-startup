// templates/CvRio.tsx
import React from "react";
import "./cvrio.scss"; // ← Crea este archivo con tus estilos (cv-rio__)
import CvRioPersonalInfoSection from "./cv-rio-verticalSections/cv-rio-personalInfoSection/CvRioPersonalInfoSection";
import CvRioLinkSection from "./cv-rio-verticalSections/cv-rio-linkSection/CvRioLinkSection";
import CvRioSkillSection from "./cv-rio-verticalSections/cv-rio-skillSection/CvRioSkillSection";
import CvRioLanguageSection from "./cv-rio-verticalSections/cv-rio-languageSection/CvRioLanguageSection";
import CvRioHobbieSection from "./cv-rio-verticalSections/cv-rio-hobbieSection/CvRioHobbieSection";
import CvRioContactSection from "./cv-rio-verticalSections/cv-rio-contactSection/CvRioContactSection";
import CvRioExperioSection from "./cv-rio-horizontalSections/cv-rio-experienceSection/CvRioExperioSection";
import CvRioEducationSection from "./cv-rio-horizontalSections/cv-rio-educationSection/CvRioEducationSection";
import CvRioCourseSection from "./cv-rio-horizontalSections/cv-rio-courseSection/CvRioCourseSection";
import CvRioAwardSection from "./cv-rio-horizontalSections/cv-rio-awardSection/CvRioAwardSection";
import CvRioReferenceSection from "./cv-rio-horizontalSections/cv-rio-referenceSection/CvRioReferenceSection";
import CvRioCustomSection from "./cv-rio-horizontalSections/cv-rio-customSection/CvRioCustomSection";
import CvRioProfileSection from "./cv-rio-horizontalSections/cv-rio-profileSection/CvRioProfileSection";
import CvRioIdentitySection from "./cv-rio-identitySection/CvRioIdentitySection";

export const CvRio: React.FC = () => {
  return (
    <article className="cv-rio">
      {/* header fijo - identitySection */}
      <CvRioIdentitySection/>

      {/* Split vertical - Horizontal */}
      <div className="cv-rio__split">
        {/* Split vertical - Horizontal */}
        <div className="cv-rio__split--vertical">
          {/* Split vertical - personalInfoSection */}
          <CvRioPersonalInfoSection/>

          {/* Split vertical - seccion contact */}
          <CvRioContactSection/>

          {/* Split vertical - linkSection */}
          <CvRioLinkSection/>

          {/* Split vertical - skillSection */}
          <CvRioSkillSection/>

          {/* Split vertical - languageSection */}
          <CvRioLanguageSection/>

          {/* Split vertical - hobbieSection */}
          <CvRioHobbieSection/>
        </div>

        {/* Split horizontal */}
        <div className="cv-rio__split--horizontal">
          {/* Split horizontal - profileSection */}
          <CvRioProfileSection/>

          {/* Split horizontal - experienceSection */}
          <CvRioExperioSection/>

          {/* Split horizontal - educationSection */}
          <CvRioEducationSection/>

          {/* Split horizontal - courseSection */}
          <CvRioCourseSection/>

          {/* Split horizontal - awardSection */}
          <CvRioAwardSection/>

          {/* Split horizontal - referenceSection */}
          <CvRioReferenceSection/>

          {/* Split horizontal - customSection */}
          <CvRioCustomSection/>
        </div>
      </div>
    </article>
  );
};

export default CvRio;
