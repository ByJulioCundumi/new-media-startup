

// Importamos todas las acciones "set" de cada slice
import { setIdentity } from "../reducers/identitySlice";
import { setContactEntries } from "../reducers/contactSlice";
import { setProfileContent } from "../reducers/profileSlice";
import { setEducationData } from "../reducers/educationSlice";
import { setExperienceData } from "../reducers/experienceSlice";
import { setSkillsEntries } from "../reducers/skillsSlice";
import { setLanguagesEntries } from "../reducers/languagesSlice";
import { setLinksEntries } from "../reducers/linksSlice";
import { setCoursesEntries } from "../reducers/coursesSlice";
import { setHobbiesEntries } from "../reducers/hobbiesSlice";
import { setReferencesEntries } from "../reducers/referencesSlice";
import { setAwardsEntries } from "../reducers/awardsSlice";
import { setCustomEntries } from "../reducers/customSlice";
import { setPersonalInfoEntries } from "../reducers/personalInfoSlice";
import { setCvSections } from "../reducers/cvSectionsSlice";
import { loadTemplateDefaults, loadStoredValues } from "../reducers/colorFontSlice";
import { setSelectedCvId, setSelectedCvTitle, setSelectedTemplateId } from "../reducers/cvCreationSlice";
import type { AppDispatch } from "../app/store";
import { getCvByIdApi } from "../api/cv";
// Opcional: si tienes un slice para el template seleccionado
// import { setCurrentTemplate } from "../reducers/templateSlice";

/**
 * Thunk para cargar un CV existente desde el backend y poblar todo el store
 */
export const loadCvForEditing =
  (cvId: string) =>
  async (dispatch: AppDispatch): Promise<void> => {
    try {
      // Opcional: podrías dispatch un estado de "loading" global aquí

      const cvData = await getCvByIdApi(cvId);
      console.log(cvData)

      // --- 1. Datos básicos del CV ---
      dispatch(setSelectedCvId(cvData.id || cvId));
      if (cvData.templateId) {
        dispatch(setSelectedTemplateId(cvData.templateId));
        dispatch(setSelectedCvTitle(cvData.cvTitle));
        // dispatch(setCurrentTemplate(cvData.templateId)); // si tienes este slice
      }

      // --- 2. Identity (nombre, foto, cargo, etc.) ---
      if (cvData.identity) {
        dispatch(setIdentity(cvData.identity));
      }

      // --- 3. Secciones de contenido ---
      dispatch(setContactEntries(cvData.contactEntries || []));
      dispatch(setProfileContent(cvData.profileContent || ""));
      dispatch(setEducationData(cvData.educationEntries || []));
      dispatch(setExperienceData(cvData.experienceEntries || []));
      dispatch(setSkillsEntries(cvData.skillsEntries || []));
      dispatch(setLanguagesEntries(cvData.languagesEntries || []));
      dispatch(setLinksEntries(cvData.linksEntries || []));
      dispatch(setCoursesEntries(cvData.coursesEntries || []));
      dispatch(setHobbiesEntries(cvData.hobbiesEntries || []));
      dispatch(setReferencesEntries(cvData.referencesEntries || []));
      dispatch(setAwardsEntries(cvData.awardsEntries || []));
      dispatch(setCustomEntries(cvData.customEntries || []));
      dispatch(setPersonalInfoEntries(cvData.personalInfoEntries || []));

      // --- 4. Configuración de secciones (habilitadas, orden, títulos personalizados) ---
      if (cvData.cvSections) {
        dispatch(setCvSections(cvData.cvSections));
      }

      // --- 5. Colores y fuentes ---
      if (cvData.colorFont) {
        // Primero cargamos los defaults de la plantilla
        if (cvData.colorFont.defaults) {
          dispatch(loadTemplateDefaults(cvData.colorFont.defaults));
        }
        // Luego aplicamos los valores personalizados (selected) si existen
        if (cvData.colorFont.selected) {
          dispatch(loadStoredValues(cvData.colorFont.selected));
        }
      }

      // --- Final ---
      console.log(`CV "${cvData.cvTitle || cvId}" cargado correctamente para edición`);

      // Retornamos los datos por si el componente necesita hacer algo más
      return cvData;
    } catch (error: any) {
      console.error("Error al cargar el CV para edición:", error);
      // Aquí puedes dispatch un error global o mostrar un toast
      // dispatch(showError(error.message || "No se pudo cargar el CV"));
      throw error; // Propagar el error para manejarlo en el componente si es necesario
    }
  };