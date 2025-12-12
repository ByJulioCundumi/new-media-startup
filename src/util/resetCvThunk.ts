// src/util/resetCvEditorThunk.ts

// Importa todas las acciones de reset que ya tienes
import { resetIdentity } from "../reducers/identitySlice";
import { resetProfileContent, resetProfile } from "../reducers/profileSlice"; // ajusta si tienes reset
import { resetEducation } from "../reducers/educationSlice";
import { resetExperience } from "../reducers/experienceSlice";
import { resetSkills } from "../reducers/skillsSlice";
import { resetLanguage } from "../reducers/languagesSlice";
import { resetCvSections } from "../reducers/cvSectionsSlice";
// ... importa los demás reset que tengas

// Si no tienes reset en algunos slices, usa los clearAll* o set a initial
import { clearAllContacts } from "../reducers/contactSlice";
import { clearAllLinks } from "../reducers/linksSlice";
import { clearAllCourses } from "../reducers/coursesSlice";
import { clearAllHobbies } from "../reducers/hobbiesSlice";
import { clearAllReferences } from "../reducers/referencesSlice";
import { clearAllAwards } from "../reducers/awardsSlice";
import { clearAllCustom } from "../reducers/customSlice";
import { clearAllPersonalInfo } from "../reducers/personalInfoSlice";

// ColorFont
import { restoreDefaults } from "../reducers/colorFontSlice"; // o resetToTemplateDefaults
import type { AppDispatch } from "../app/store";

export const resetCvEditor = () => (dispatch: AppDispatch) => {
  dispatch(resetIdentity());
  dispatch(resetProfileContent());
  // dispatch(resetProfile());

  dispatch(resetEducation());
  dispatch(resetExperience());
  dispatch(resetSkills());
  dispatch(resetLanguage());
  dispatch(resetCvSections());

  dispatch(clearAllContacts());
  dispatch(clearAllLinks());
  dispatch(clearAllCourses());
  dispatch(clearAllHobbies());
  dispatch(clearAllReferences());
  dispatch(clearAllAwards());
  dispatch(clearAllCustom());
  dispatch(clearAllPersonalInfo());

  // Opcional: limpiar colorFont
  dispatch(restoreDefaults());

  console.log("Estado del editor CV limpiado completamente");
};