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
    setSectionEnabled: (
      state,
      action: PayloadAction<{ name: string; enabled: boolean }>
    ) => {
      const section = state.find((s) => s.name === action.payload.name);
      if (section) {
        section.enabled = action.payload.enabled;
      }
    },

    setSectionProgress: (
      state,
      action: PayloadAction<{ name: string; progress: number }>
    ) => {
      const section = state.find((s) => s.name === action.payload.name);
      if (section) {
        section.progress = action.payload.progress;
      }
    },

    resetAllProgress: (state) => {
      state.forEach((s) => {
        s.progress = 0;
      });
    },
  },
});

export const {
  setSectionEnabled,
  setSectionProgress,
  resetAllProgress,
} = cvSectionsSlice.actions;

export default cvSectionsSlice.reducer;
