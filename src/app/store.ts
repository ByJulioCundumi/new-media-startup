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
import identitySlice from "../reducers/identitySlice";
import contactSlice from "../reducers/contactSlice";
import colorFontSlice from "../reducers/colorFontSlice"
import toolbarOptionSlice from "../reducers/toolbarOptionSlice"
import categoriesSlice from "../reducers/categoriesSlice"
import userSlice from "../reducers/userSlice"
import cvCreationSlice from "../reducers/cvCreationSlice";
import cvSaveSlice from "../reducers/cvSaveSlice";
import authModalReducer from "../reducers/authModalSlice";
import cvSectionsEditorSlice from "../reducers/editorsSlice";

export const store = configureStore({
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
        customEntries: customSlice,
        profileSection: profileSlice,
        cvSections: cvSectionsSlice,
        identity: identitySlice,
        contactEntries: contactSlice,
        colorFont: colorFontSlice,
        toolbarOption: toolbarOptionSlice,
        categories: categoriesSlice,
        user: userSlice,
        cvCreation: cvCreationSlice,
        cvSave: cvSaveSlice,
        authModal: authModalReducer,
        cvSectionsEditors: cvSectionsEditorSlice
    }
})

export type AppDispatch = typeof store.dispatch;