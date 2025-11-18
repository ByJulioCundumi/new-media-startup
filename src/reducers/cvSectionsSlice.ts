import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { ICvSection } from "../interfaces/ICvSections";

const initialState: ICvSection[] = [
  { name: "photoSection", enabled: true, progress: 0, isOpen: false },
  { name: "personalInfoSection", enabled: true, progress: 0, isOpen: false },
  { name: "profileSection", enabled: true, progress: 0, isOpen: false },
  { name: "educationSection", enabled: true, progress: 0, isOpen: false },
  { name: "experienceSection", enabled: true, progress: 0, isOpen: false },
  { name: "skillSection", enabled: true, progress: 0, isOpen: false },
  { name: "languageSection", enabled: true, progress: 0, isOpen: false },
  { name: "linkSection", enabled: false, progress: 0, isOpen: false },
  { name: "courseSection", enabled: false, progress: 0, isOpen: false },
  { name: "hobbieSection", enabled: false, progress: 0, isOpen: false },
  { name: "referenceSection", enabled: false, progress: 0, isOpen: false },
  { name: "awardSection", enabled: false, progress: 0, isOpen: false },
  { name: "customSection", enabled: false, progress: 0, isOpen: false },
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

    // 🆕 TOGGLE isOpen (abrir/cerrar sección)
    toggleSectionOpen: (state, action: PayloadAction<string | null>) => {
      const target = action.payload;

      if (target === null) {
        // Cierra todas
        state.forEach((s) => (s.isOpen = false));
        return;
      }

      const section = state.find((s) => s.name === target);
      if (!section) return;

      if (section.isOpen) {
        // Si ya está abierta, ciérrala (sin afectar a las demás)
        section.isOpen = false;
      } else {
        // Si está cerrada, abra ésta y cierra las demás (acordeón)
        state.forEach((s) => {
          s.isOpen = s.name === target;
        });
      }
    },

    // Cierra todas y abre solo la seleccionada
    setOnlySectionOpen: (state, action: PayloadAction<string>) => {
      state.forEach(section => {
        section.isOpen = section.name === action.payload;
      });
    },

  },
});

export const {
  enableSection,
  disableSection,
  setSectionProgress,
  updateSection,
  setOnlySectionOpen,
  toggleSectionOpen
} = cvSectionsSlice.actions;

export default cvSectionsSlice.reducer;
