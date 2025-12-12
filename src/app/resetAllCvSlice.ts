// store/resetAllCvSlices.ts

import { resetIdentity } from "../reducers/identitySlice";
import { resetProfileContent } from "../reducers/profileSlice";
import { clearAllAwards } from "../reducers/awardsSlice";
import { clearAllContacts } from "../reducers/contactSlice";
import { clearAllCourses } from "../reducers/coursesSlice";
import { clearAllCustom } from "../reducers/customSlice";
import { resetEducation } from "../reducers/educationSlice";
import { resetExperience } from "../reducers/experienceSlice";
import { clearAllHobbies } from "../reducers/hobbiesSlice";
import { resetLanguage } from "../reducers/languagesSlice";
import { clearAllLinks } from "../reducers/linksSlice";
import { clearAllPersonalInfo } from "../reducers/personalInfoSlice";
import { clearAllReferences } from "../reducers/referencesSlice";
import { resetSkills } from "../reducers/skillsSlice";
import { resetCvSections } from "../reducers/cvSectionsSlice";
import { resetToTemplateDefaults } from "../reducers/colorFontSlice";
import type { AppDispatch } from "./store";

export const resetAllCvSlices = (dispatch: AppDispatch) => {
  dispatch(resetIdentity());
  dispatch(resetProfileContent());
  dispatch(clearAllAwards());
  dispatch(clearAllContacts());
  dispatch(clearAllCourses());
  dispatch(clearAllCustom());
  dispatch(resetEducation());
  dispatch(resetExperience());
  dispatch(clearAllHobbies());
  dispatch(resetLanguage());
  dispatch(clearAllLinks());
  dispatch(clearAllPersonalInfo());
  dispatch(clearAllReferences());
  dispatch(resetSkills());
  dispatch(resetCvSections());
  dispatch(resetToTemplateDefaults());
};
