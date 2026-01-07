// pages/CreateCv.tsx
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { unwrapResult } from "@reduxjs/toolkit"; // ← NUEVO IMPORT

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
import { loadCvForEditing } from "../../util/loadCvThunk";
import type { AppDispatch } from "../../app/store";
import { resetCvEditor } from "../../util/resetCvThunk";
import { setHasUnsavedChanges, setIsSaving, setOriginalData } from "../../reducers/cvSaveSlice";
import { updateCvApi } from "../../api/cv";
import { setPublicId, setSelectedCvId, setSelectedCvTitle, setSelectedTemplateId } from "../../reducers/cvCreationSlice";
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
import { TbAlertSquareRounded, TbPencilPlus } from "react-icons/tb";
import QrBoxEditor from "../../components/qr-box-editor/QrBoxEditor";
import { hasValidSubscriptionTime } from "../../util/checkSubscriptionTime";
import { IoCloudDone } from "react-icons/io5";
import { LuSave, LuSaveOff } from "react-icons/lu";

const getCurrentData = (state: IState) => ({
  cvTitle: state.cvCreation.selectedCvTitle,
  templateId: state.cvCreation.selectedTemplateId,
  identity: state.identity,
  profileContent: state.profileSection,
  contactEntries: state.contactEntries,
  educationEntries: state.educationEntries,
  experienceEntries: state.experienceEntries,
  skillsEntries: state.skillsEntries,
  languagesEntries: state.languagesEntries,
  linksEntries: state.linksEntries,
  coursesEntries: state.coursesEntries,
  hobbiesEntries: state.hobbiesEntries,
  referencesEntries: state.referencesEntries,
  awardsEntries: state.awardsEntries,
  customEntries: state.customEntries,
  personalInfoEntries: state.personalInfo,
  cvSections: state.cvSections,
  colorFont: state.colorFont,
});

function CreateCv() {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const { cvId } = useParams<{ cvId: string }>();
  const { selectedTemplateId, selectedCvTitle } = useSelector((state: IState) => state.cvCreation);
  const { previewPopupOpen } = useSelector((state: IState) => state.toolbarOption);
  const { allowQrCode } = useSelector((state: IState) => state.identity);
  const { subscriptionExpiresAt } = useSelector((state: IState) => state.user);

  const [isLoading, setIsLoading] = useState(true);
  const [isFromBackend, setIsFromBackend] = useState(false);
  const [backendLoadedData, setBackendLoadedData] = useState<any>(null); // ← NUEVO: datos crudos del backend
const [showSections, setShowSections] = useState(true)
  // ----------------------------------------------------------------------------------
  // Carga del CV (local o backend)
  // ----------------------------------------------------------------------------------
  useEffect(() => {
    if (!cvId) {
      navigate("/cvs", { replace: true });
      return;
    }

    const validateAndLoadCv = async () => {
      setIsLoading(true);

      try {
        // 1. Buscar en localStorage
        const localDrafts = JSON.parse(localStorage.getItem("draftCvs") || "[]");
        const draftCv = localDrafts.find((draft: any) => 
          draft.localId === cvId || draft.backendId === cvId
        );

        if (draftCv) {
          dispatch(setSelectedCvId(draftCv.localId || draftCv.backendId));
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

          if (draftCv.cvSections) dispatch(setCvSections(draftCv.cvSections));

          if (draftCv.colorFont) {
            if (draftCv.colorFont.defaults) dispatch(loadTemplateDefaults(draftCv.colorFont.defaults));
            if (draftCv.colorFont.selected) dispatch(loadStoredValues(draftCv.colorFont.selected));
          }

          dispatch(setOriginalData(draftCv));
          setIsFromBackend(false);
          setIsLoading(false);
          return;
        }

        // 2. Cargar desde backend
        const actionResult:any = await dispatch(loadCvForEditing(cvId));
        const loadedData = unwrapResult(actionResult); // ← Datos completos directamente del thunk

        setBackendLoadedData(loadedData); // Guardamos los datos crudos
        setIsFromBackend(true);
        setIsLoading(false);
      } catch (err) {
        navigate("/cvs", { replace: true });
      }
    };

    validateAndLoadCv();

    return () => {
      dispatch(resetCvEditor());
    };
  }, [cvId, dispatch, navigate]);

  // ----------------------------------------------------------------------------------
  // Migración automática a local si la suscripción expiró
  // ----------------------------------------------------------------------------------
  useEffect(() => {
    if (!isLoading && isFromBackend && backendLoadedData) {
      if (!hasValidSubscriptionTime(subscriptionExpiresAt)) {
        const localDrafts = JSON.parse(localStorage.getItem("draftCvs") || "[]");

        // Evitar duplicados
        if (localDrafts.some((d: any) => d.backendId === cvId)) {
          return;
        }

        const draftToSave = {
          backendId: cvId,
          localId: crypto.randomUUID(),
          isDraft: true,
          ...backendLoadedData, // ← Usamos los datos seguros, no useSelector
          updatedAt: new Date().toISOString(),
        };

        localDrafts.push(draftToSave);
        localStorage.setItem("draftCvs", JSON.stringify(localDrafts));

        // Feedback sutil (opcional, puedes activarlo si quieres)
        // console.log("CV migrado automáticamente a almacenamiento local (suscripción expirada)");
      }
    }
  }, [isLoading, isFromBackend, backendLoadedData, cvId, subscriptionExpiresAt]);

  // ----------------------------------------------------------------------------------
  // Lógica de guardado (sin cambios)
  // ----------------------------------------------------------------------------------
  const originalData = useSelector((state: IState) => state.cvSave.originalData);
  const hasUnsavedChanges = useSelector((state: IState) => state.cvSave.hasUnsavedChanges);
  const isSaving = useSelector((state: IState) => state.cvSave.isSaving);
  const currentDataSelector = useSelector(getCurrentData);

  useEffect(() => {
    if (!originalData || !cvId) return;
    const hasChanges = JSON.stringify(originalData) !== JSON.stringify(currentDataSelector);
    dispatch(setHasUnsavedChanges(hasChanges));
  }, [currentDataSelector, originalData, dispatch, cvId]);

  const handleSave = async () => {
    if (!cvId || isSaving || !hasUnsavedChanges) return;

    dispatch(setIsSaving(true));

    const localDrafts = JSON.parse(localStorage.getItem("draftCvs") || "[]");
    const isLocalDraft = localDrafts.some((d: any) => d.localId === cvId || d.backendId === cvId);

    try {
      if (isLocalDraft) {
        const updatedDrafts = localDrafts.map((d: any) =>
          (d.localId === cvId || d.backendId === cvId)
            ? { ...d, ...currentDataSelector, updatedAt: new Date().toISOString() }
            : d
        );
        localStorage.setItem("draftCvs", JSON.stringify(updatedDrafts));
      } else {
        if (!hasValidSubscriptionTime(subscriptionExpiresAt)) {
          throw new Error("Suscripción expirada");
        }
        await updateCvApi(cvId, currentDataSelector);
      }

      dispatch(setOriginalData(currentDataSelector));
      dispatch(setHasUnsavedChanges(false));
    } catch (err: any) {
      if(hasValidSubscriptionTime(subscriptionExpiresAt)){
        alert("Cambios guardados localmente.");
      } else{
        alert("Cambios guardados localmente. Actualiza tu plan para guardar en la nube.");
      }

      const draftToSave = {
        backendId: cvId,
        localId: crypto.randomUUID(),
        isDraft: true,
        ...currentDataSelector,
        updatedAt: new Date().toISOString(),
      };

      const updatedDrafts = localDrafts.filter((d: any) => d.backendId !== cvId);
      updatedDrafts.push(draftToSave);
      localStorage.setItem("draftCvs", JSON.stringify(updatedDrafts));

      dispatch(setOriginalData(currentDataSelector));
      dispatch(setHasUnsavedChanges(false));
    } finally {
      dispatch(setIsSaving(false));
    }
  };

  useEffect(() => {
    if (hasUnsavedChanges && cvId) {
      const timer = setTimeout(handleSave, 5000);
      return () => clearTimeout(timer);
    }
  }, [hasUnsavedChanges, currentDataSelector, cvId]);

  useEffect(() => {
    if (!hasUnsavedChanges) return;

    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      e.preventDefault();
      e.returnValue = "";
    };

    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => window.removeEventListener("beforeunload", handleBeforeUnload);
  }, [hasUnsavedChanges]);

  // ----------------------------------------------------------------------------------
  // Selectores para renderizado
  // ----------------------------------------------------------------------------------
  const cvSectionsState = useSelector((state: IState) => state.cvSections) as ICvSectionsState;
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

  useEffect(() => {
    dispatch(setSidebar("create"));
  }, [dispatch]);

  useEffect(() => {
    return () => {
      dispatch(setPublicId(""));
    };
  }, []);

  const SelectedTemplate = templates.find((t) => t.id === selectedTemplateId)?.component;

  // Indicador de guardado
  const isSubscriptionValid = hasValidSubscriptionTime(subscriptionExpiresAt);
  const isSavingInCloud = isFromBackend && isSubscriptionValid;

  // ----------------------------------------------------------------------------------
  // Render
  // ----------------------------------------------------------------------------------
  if (isLoading) {
    return (
      <div className="create-cv__loading-overlay">
        <div className="create-cv__loading-container">
          <h2 className="create-cv__loading-title"><TbPencilPlus /> CvRemoto</h2>
          <div className="create-cv__loading-dots">
            <span></span><span></span><span></span><span></span><span></span>
          </div>
        </div>
        <button onClick={() => navigate("/cvs")} className="create-cv__loading-back-button">
          ← Volver a mis CVs
        </button>
      </div>
    );
  }

  return (
    <div className="create-cv">
      <ToolbarCV />
      <div className={showSections ? "create-cv__sections" : "create-cv__sections-hidden"}><SectionProgress /></div>
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

      {allowQrCode && <QrBoxEditor />}
      <FloatingEditor />
      <ColorFontPopup />

      {/* Indicador visual de modo de guardado */}
      <div className="save-mode-indicator">
        {isSavingInCloud ? (
          <span className="save-mode-indicator__cloud">
            <LuSave />
            En la nube
          </span>
        ) : (
          <span className="save-mode-indicator__local">
            <LuSaveOff />
            Localmente
          </span>
        )}
      </div>
    </div>
  );
}

export default CreateCv;