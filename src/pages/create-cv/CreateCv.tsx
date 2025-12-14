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
import { setSelectedCvId, setSelectedCvTitle, setSelectedTemplateId } from "../../reducers/cvCreationSlice";
import { setIdentity } from "../../reducers/identitySlice";
import { setContactEntries } from "../../reducers/contactSlice";
import { setProfileContent } from "../../reducers/profileSlice";
import { setEducationData } from "../../reducers/educationSlice";
import { setExperienceData } from "../../reducers/experienceSlice";
import { setSkillsEntries } from "../../reducers/skillsSlice";
import { setLanguagesEntries } from "../../reducers/languagesSlice";
import { setLinksEntries } from "../../reducers/linksSlice";
import { setCoursesEntries } from "../../reducers/coursesSlice";
import { setHobbiesEntries } from "../../reducers/hobbiesSlice";
import { setReferencesEntries } from "../../reducers/referencesSlice";
import { setAwardsEntries } from "../../reducers/awardsSlice";
import { setCustomEntries } from "../../reducers/customSlice";
import { setPersonalInfoEntries } from "../../reducers/personalInfoSlice";
import { setCvSections } from "../../reducers/cvSectionsSlice";
import { loadStoredValues, loadTemplateDefaults } from "../../reducers/colorFontSlice";

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

  const loadCv = async () => {
    try {
      console.log("[CreateCv] Intentando cargar CV con ID:", cvId);

      // 1. Primero intenta cargar desde localStorage (borradores)
      const localDrafts = JSON.parse(localStorage.getItem("draftCvs") || "[]");
      const draftCv = localDrafts.find((draft: any) => draft.localId === cvId);

      if (draftCv) {
        console.log("[CreateCv] Cargando CV desde localStorage (borrador)");

        // Simular exactamente lo que hace loadCvForEditing
        dispatch(setSelectedCvId(draftCv.localId));
        dispatch(setSelectedTemplateId(draftCv.templateId));
        dispatch(setSelectedCvTitle(draftCv.cvTitle));

        dispatch(setIdentity(draftCv.identity || {}));
        dispatch(setContactEntries(draftCv.contactEntries || []));
        dispatch(setProfileContent(draftCv.profileContent || ""));
        dispatch(setEducationData(draftCv.educationEntries || []));
        dispatch(setExperienceData(draftCv.experienceEntries || []));
        dispatch(setSkillsEntries(draftCv.skillsEntries || []));
        dispatch(setLanguagesEntries(draftCv.languagesEntries || []));
        dispatch(setLinksEntries(draftCv.linksEntries || []));
        dispatch(setCoursesEntries(draftCv.coursesEntries || []));
        dispatch(setHobbiesEntries(draftCv.hobbiesEntries || []));
        dispatch(setReferencesEntries(draftCv.referencesEntries || []));
        dispatch(setAwardsEntries(draftCv.awardsEntries || []));
        dispatch(setCustomEntries(draftCv.customEntries || []));
        dispatch(setPersonalInfoEntries(draftCv.personalInfoEntries || []));

        if (draftCv.cvSections) {
          dispatch(setCvSections(draftCv.cvSections));
        }

        if (draftCv.colorFont) {
          if (draftCv.colorFont.defaults) {
            dispatch(loadTemplateDefaults(draftCv.colorFont.defaults));
          }
          if (draftCv.colorFont.selected) {
            dispatch(loadStoredValues(draftCv.colorFont.selected));
          }
        }

        // Guardar estado original para detectar cambios
        dispatch(setOriginalData(draftCv));

        console.log("[CreateCv] Borrador cargado correctamente desde localStorage");
        return;
      }

      // 2. Si no es un borrador → cargar desde backend
      console.log("[CreateCv] No es borrador → cargando desde backend");
      await dispatch(loadCvForEditing(cvId));

    } catch (err) {
      console.error("[CreateCv] Error cargando CV:", err);
    }
  };

  loadCv();

  // Cleanup: limpiar estado al salir del editor
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
  // En CreateCv.tsx → handleSave
const handleSave = async () => {
  if (!cvId || isSaving || !hasUnsavedChanges) return;

  dispatch(setIsSaving(true));

  const localDrafts = JSON.parse(localStorage.getItem('draftCvs') || '[]');
  const isLocalDraft = localDrafts.some((d: any) => d.localId === cvId || d.backendId === cvId);

  try {
    if (isLocalDraft) {
      // Es un borrador → guardar en local
      const updatedDrafts = localDrafts.map((d: any) => 
        (d.localId === cvId || d.backendId === cvId) 
          ? { ...d, ...currentData, updatedAt: new Date().toISOString() } 
          : d
      );
      localStorage.setItem('draftCvs', JSON.stringify(updatedDrafts));
    } else {
      // Es un CV del backend → intentar guardar online
      await updateCvApi(cvId, currentData);
    }

    dispatch(setOriginalData(currentData));
    dispatch(setHasUnsavedChanges(false));
    console.log("Cambios guardados");
  } catch (err: any) {
    console.warn("No se pudo guardar en backend → guardando como borrador local");

    // Si falla el guardado online → convertir en borrador local
    const draftToSave = {
      backendId: cvId, // ← importante: guardamos el ID real del backend
      localId: crypto.randomUUID(), // ID temporal para el dashboard
      isDraft: true,
      ...currentData,
      updatedAt: new Date().toISOString(),
    };

    const updatedDrafts = localDrafts.filter((d: any) => d.backendId !== cvId); // evitar duplicados
    updatedDrafts.push(draftToSave);
    localStorage.setItem('draftCvs', JSON.stringify(updatedDrafts));

    dispatch(setOriginalData(currentData));
    dispatch(setHasUnsavedChanges(false));
    alert("Sin conexión. Tus cambios se guardaron localmente y se sincronizarán cuando vuelvas a estar online.");
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
