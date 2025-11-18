import { configureStore } from "@reduxjs/toolkit";
import sidebarSlice from "../reducers/sidebarSlice";
import personalInfoSlice from "../reducers/personalInfoSlice";
import educationSlice from "../reducers/educationSlice";
import experienceSlice from "../reducers/experienceSlice";
import skillsSlice from "../reducers/skillsSlice";
import languagesSlice from "../reducers/languagesSlice";
import linksSlice from "../reducers/linksSlice";
import coursesSlice from "../reducers/coursesSlice";
import hobbiesSlice from "../reducers/hobbiesSlice";
import referencesSlice from "../reducers/referencesSlice";
import awardsSlice from "../reducers/awardsSlice";
import customSlice from "../reducers/customSlice";
import profileSlice from "../reducers/profileSlice";
import cvSectionsSlice from "../reducers/cvSectionsSlice";
import photoSlice from "../reducers/photoSlice";

export default configureStore({
    reducer: {
        sidebar: sidebarSlice,
        personalInfo: personalInfoSlice,
        educationEntries: educationSlice,
        experienceEntries: experienceSlice,
        skillsEntries: skillsSlice,
        languagesEntries: languagesSlice,
        linksEntries: linksSlice,
        coursesEntries: coursesSlice,
        hobbiesEntries: hobbiesSlice,
        referencesEntries: referencesSlice,
        awardsEntries: awardsSlice,
        customEntry: customSlice,
        profileSection: profileSlice,
        cvSections: cvSectionsSlice,
        photo: photoSlice
    }
})