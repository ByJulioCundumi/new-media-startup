// pages/CreateCv.tsx
import { useEffect } from "react";
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
import VerticalToolbarCV from "../../components/vertical-toolbar-cv/VerticalToolbarCv";
import { PreviewPopup } from "../../components/preview-popup/PreviewPopup";
import { useParams } from "react-router-dom";
import { loadCvForEditing } from "../../util/loadCvThunk";
import type { AppDispatch } from "../../app/store";
import { resetCvEditor } from "../../util/resetCvThunk";
import { setHasUnsavedChanges, setIsSaving, setOriginalData } from "../../reducers/cvSaveSlice";
import { updateCvApi } from "../../api/cv";

function CreateCv() {
  const dispatch = useDispatch<AppDispatch>();
  const { cvId } = useParams<{ cvId: string }>();
  const {selectedTemplateId, selectedCvTitle} = useSelector((state: IState) => state.cvCreation);
  const { previewPopupOpen } = useSelector(
    (state: IState) => state.toolbarOption
  );

  // ----------------------------------------------------------------------------------

  useEffect(() => {
  if (!cvId) {
    console.warn("[CreateCv] No hay cvId en la URL");
    return;
  }

  (async () => {
    try {
      console.log("[CreateCv] Iniciando carga del CV con ID:", cvId);
      await dispatch(loadCvForEditing(cvId));
      console.log("[CreateCv] CV cargado con éxito");
    } catch (err) {
      console.error("[CreateCv] Error cargando CV:", err);
    }
  })();

  return () => {
      console.log("[CreateCv] Saliendo del editor → limpiando estado");
      dispatch(resetCvEditor());
    };

}, [cvId, dispatch]);

  // ----------------------------------------------------------------------------------

  const originalData = useSelector((state: IState) => state.cvSave.originalData);
  const hasUnsavedChanges = useSelector((state: IState) => state.cvSave.hasUnsavedChanges);
  const isSaving = useSelector((state: IState) => state.cvSave.isSaving);

  // Todos los selectores actuales
  const currentData = {
    cvTitle: selectedCvTitle,
    templateId: selectedTemplateId,
    identity: useSelector((state: IState) => state.identity),
    profileContent: useSelector((state: IState) => state.profileSection),
    contactEntries: useSelector((state: IState) => state.contactEntries),
    educationEntries: useSelector((state: IState) => state.educationEntries),
    experienceEntries: useSelector((state: IState) => state.experienceEntries),
    skillsEntries: useSelector((state: IState) => state.skillsEntries),
    languagesEntries: useSelector((state: IState) => state.languagesEntries),
    linksEntries: useSelector((state: IState) => state.linksEntries),
    coursesEntries: useSelector((state: IState) => state.coursesEntries),
    hobbiesEntries: useSelector((state: IState) => state.hobbiesEntries),
    referencesEntries: useSelector((state: IState) => state.referencesEntries),
    awardsEntries: useSelector((state: IState) => state.awardsEntries),
    customEntries: useSelector((state: IState) => state.customEntries),
    personalInfoEntries: useSelector((state: IState) => state.personalInfo),
    cvSections: useSelector((state: IState) => state.cvSections),
    colorFont: useSelector((state: IState) => state.colorFont),
  };

  // Detectar cambios
  useEffect(() => {
    if (!originalData || !cvId) return;

    const hasChanges = JSON.stringify(originalData) !== JSON.stringify(currentData);
    dispatch(setHasUnsavedChanges(hasChanges));
  }, [currentData, originalData, dispatch, cvId]);

  // Guardar
  const handleSave = async () => {
    if (!cvId || isSaving || !hasUnsavedChanges) return;

    dispatch(setIsSaving(true));
    try {
      await updateCvApi(cvId, currentData);
      // Actualizar originalData después de guardar
      dispatch(setOriginalData(currentData));
      dispatch(setHasUnsavedChanges(false));
      console.log("CV guardado con éxito");
    } catch (err) {
      console.error("Error guardando CV:", err);
    } finally {
      dispatch(setIsSaving(false));
    }
  };

  // Opcional: auto-guardado cada X segundos si hay cambios
  useEffect(() => {
    if (hasUnsavedChanges && cvId) {
      const timer = setTimeout(handleSave, 5000); // 3 segundos
      return () => clearTimeout(timer);
    }
  }, [hasUnsavedChanges, currentData]);
 
  // ----------------------------------------------------------------------------------

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

  const SelectedTemplate = templates.find(
    (t) => t.id === selectedTemplateId
  )?.component;

  return (
    <div className="create-cv">
      <ToolbarCV />
      <SectionProgress />
      <VerticalToolbarCV />

      <div className="create-cv__template">
        {SelectedTemplate && (
          <SelectedTemplate
  personalInfo={personalInfo}
  identitySection={identity}
  contactSection={contact}
  profileSection={profile}
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
  sectionsConfig={sections}
  sectionsOrder={order}
/>

        )}
      </div>

      {previewPopupOpen && SelectedTemplate && (
        <PreviewPopup>
          <SelectedTemplate
  personalInfo={personalInfo}
  identitySection={identity}
  contactSection={contact}
  profileSection={profile}
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
  sectionsConfig={sections}
  sectionsOrder={order}
/>

        </PreviewPopup>
      )}

      <FloatingEditor />
      <ColorFontPopup />
    </div>
  );
}

export default CreateCv;
