import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { IAddSections } from "../interfaces/IAddSections";

const initialState: IAddSections = {
  showLinks: false,
  showCourses: false,
  showHobbies: false,
  showReferences: false,
  showAwards: false,
  showCustom: false,
};

const addSectionsSlice = createSlice({
  name: "addSections",
  initialState,
  reducers: {
    setShowLinks: (state, action: PayloadAction<boolean>) => {
      state.showLinks = action.payload;
    },
    setShowCourses: (state, action: PayloadAction<boolean>) => {
      state.showCourses = action.payload;
    },
    setShowHobbies: (state, action: PayloadAction<boolean>) => {
      state.showHobbies = action.payload;
    },
    setShowReferences: (state, action: PayloadAction<boolean>) => {
      state.showReferences = action.payload;
    },
    setShowAwards: (state, action: PayloadAction<boolean>) => {
      state.showAwards = action.payload;
    },
    setShowCustom: (state, action: PayloadAction<boolean>) => {
      state.showCustom = action.payload;
    },
    // acción para activar/desactivar todas las secciones a la vez
    setAllSections: (state, action: PayloadAction<boolean>) => {
      state.showLinks = action.payload;
      state.showCourses = action.payload;
      state.showHobbies = action.payload;
      state.showReferences = action.payload;
      state.showAwards = action.payload;
      state.showCustom = action.payload;
    },
  },
});

export const {
  setShowLinks,
  setShowCourses,
  setShowHobbies,
  setShowReferences,
  setShowAwards,
  setShowCustom,
  setAllSections,
} = addSectionsSlice.actions;

export default addSectionsSlice.reducer;
