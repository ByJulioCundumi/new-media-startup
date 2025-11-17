import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { ICvSection } from "../interfaces/ICvSections";

const initialState: ICvSection[] = [
  { name: "personalInfoSection", enabled: true, progress: 0 },
  { name: "profileSection", enabled: true, progress: 0 },
  { name: "educationSection", enabled: true, progress: 0 },
  { name: "experienceSection", enabled: true, progress: 0 },
  { name: "skillSection", enabled: true, progress: 0 },
  { name: "languageSection", enabled: true, progress: 0 },
  { name: "linkSection", enabled: false, progress: 0 },
  { name: "courseSection", enabled: false, progress: 0 },
  { name: "hobbieSection", enabled: false, progress: 0 },
  { name: "referenceSection", enabled: false, progress: 0 },
  { name: "awardSection", enabled: false, progress: 0 },
  { name: "customSection", enabled: false, progress: 0 },
];

const cvSectionsSlice = createSlice({
  name: "cvSections",
  initialState,
  reducers: {
    // Habilitar una sección
    enableSection: (state, action: PayloadAction<string>) => {
      const section = state.find((s) => s.name === action.payload);
      if (section) section.enabled = true;
    },

    // Deshabilitar una sección
    disableSection: (state, action: PayloadAction<string>) => {
      const section = state.find((s) => s.name === action.payload);
      if (section) section.enabled = false;
    },

    // Actualizar progreso de una sección específica
    setSectionProgress: (
      state,
      action: PayloadAction<{ name: string; progress: number }>
    ) => {
      const section = state.find((s) => s.name === action.payload.name);
      if (section) section.progress = action.payload.progress;
    },

    // Actualizar habilitación y progreso en un solo dispatch
    updateSection: (
      state,
      action: PayloadAction<{ name: string; enabled?: boolean; progress?: number }>
    ) => {
      const section = state.find((s) => s.name === action.payload.name);
      if (section) {
        if (action.payload.enabled !== undefined) section.enabled = action.payload.enabled;
        if (action.payload.progress !== undefined) section.progress = action.payload.progress;
      }
    },
  },
});

export const {
  enableSection,
  disableSection,
  setSectionProgress,
  updateSection,
} = cvSectionsSlice.actions;

export default cvSectionsSlice.reducer;
