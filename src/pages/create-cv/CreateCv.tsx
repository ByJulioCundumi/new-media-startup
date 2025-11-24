// pages/CreateCv.tsx
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import "./createcv.scss";

import ToolbarCV from "../../components/toolbar-cv/ToolbarCV";
import SectionProgress from "../../components/section-progress/SectionProgress";
import ColorFontPopup from "../../components/color-font-popup/ColorFontPopup";

import { templates } from "../../templates/templates";
import type { IState } from "../../interfaces/IState";
import type { ICvSectionsState } from "../../interfaces/ICvSections";
import { setSidebar } from "../../reducers/sidebarSlice";
import FloatingEditor from "../../components/floating-editor/FloatingEditor";
import PreviewPopup from "../../components/preview-popup/PreviewPopup";
import QrToggleButton from "../../components/qr-toggle-button/QrToggleButton";
import VerticalToolbarCV from "../../components/vertical-toolbar-cv/VerticalToolbarCv";

function CreateCv() {
  const dispatch = useDispatch();

  const [selectedTemplate, setSelectedTemplate] = useState<string>("default");
  const {previewPopupOpen} = useSelector((state:IState)=>state.toolbarOption)

  /** Selectores */
  const cvSectionsState = useSelector(
    (state: IState) => state.cvSections
  ) as ICvSectionsState;

  const sections = cvSectionsState.sections;
  const order = cvSectionsState.order;

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

  /** Sidebar */
  useEffect(() => {
    dispatch(setSidebar("create"));
  }, [dispatch]);

  /** Persistencia de template */
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
      <VerticalToolbarCV/>

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

      {previewPopupOpen && SelectedTemplate && (
        <PreviewPopup>
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
        </PreviewPopup>
      )}

      {/* FLOATING EDITOR AUTOMÁTICO */}
      <FloatingEditor />

      <ColorFontPopup />
    </div>
  );
}

export default CreateCv;
