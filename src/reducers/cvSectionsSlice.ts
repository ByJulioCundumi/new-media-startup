// reducers/cvSectionsSlice.ts
import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { ICvSection, ICvSectionsState } from "../interfaces/ICvSections";

const initialSections: ICvSection[] = [
  { name: "identitySection", enabled: true, progress: 0, isOpen: false },
  { name: "contactSection", enabled: true, progress: 0, isOpen: false },
  { name: "profileSection", enabled: true, progress: 0, isOpen: false },
  { name: "educationSection", enabled: true, progress: 0, isOpen: false },
  { name: "experienceSection", enabled: true, progress: 0, isOpen: false },
  { name: "skillSection", enabled: true, progress: 0, isOpen: false },
  { name: "languageSection", enabled: true, progress: 0, isOpen: false },
  { name: "personalInfoSection", enabled: false, progress: 0, isOpen: false },
  { name: "linkSection", enabled: false, progress: 0, isOpen: false },
  { name: "courseSection", enabled: false, progress: 0, isOpen: false },
  { name: "hobbieSection", enabled: false, progress: 0, isOpen: false },
  { name: "referenceSection", enabled: false, progress: 0, isOpen: false },
  { name: "awardSection", enabled: false, progress: 0, isOpen: false },
  { name: "customSection", enabled: false, progress: 0, isOpen: false },
];

const initialOrder = initialSections.map((s) => s.name);

const initialState: ICvSectionsState = {
  sections: initialSections,
  order: initialOrder,
};

const cvSectionsSlice = createSlice({
  name: "cvSections",
  initialState,
  reducers: {
    enableSection: (state, action: PayloadAction<string>) => {
      const section = state.sections.find((s) => s.name === action.payload);
      if (section) section.enabled = true;
    },
    disableSection: (state, action: PayloadAction<string>) => {
      const section = state.sections.find((s) => s.name === action.payload);
      if (section) section.enabled = false;
    },
    setSectionProgress: (
      state,
      action: PayloadAction<{ name: string; progress: number }>
    ) => {
      const section = state.sections.find((s) => s.name === action.payload.name);
      if (section) section.progress = action.payload.progress;
    },
    updateSection: (
      state,
      action: PayloadAction<{ name: string; enabled?: boolean; progress?: number }>
    ) => {
      const section = state.sections.find((s) => s.name === action.payload.name);
      if (section) {
        if (action.payload.enabled !== undefined) section.enabled = action.payload.enabled;
        if (action.payload.progress !== undefined) section.progress = action.payload.progress;
      }
    },
    toggleSectionOpen: (state, action: PayloadAction<string>) => {
      const target = action.payload;
      const section = state.sections.find((s) => s.name === target);
      if (!section) return;

      if (section.isOpen) {
        section.isOpen = false;
      } else {
        state.sections.forEach((s) => {
          s.isOpen = s.name === target;
        });
      }
    },
    setOnlySectionOpen: (state, action: PayloadAction<string>) => {
      state.sections.forEach((s) => {
        s.isOpen = s.name === action.payload;
      });
    },

    // --- REORDER (drag & drop) ---
    // from/to are indices inside state.order
    reorderSections: (state, action: PayloadAction<{ from: number; to: number }>) => {
      const { from, to } = action.payload;
      const current = [...state.order];

      // Validación básica
      if (
        from < 0 ||
        from >= current.length ||
        to < 0 ||
        to >= current.length ||
        from === to
      ) {
        return;
      }

      // Evitar mover identitySection (siempre en índice 0)
      const movingName = current[from];
      if (movingName === "identitySection") return;
      // Evitar mover a la posición 0 (reservada)
      if (to === 0) return;

      // Hacer el reordenamiento
      const [removed] = current.splice(from, 1);
      current.splice(to, 0, removed);
      state.order = current;
    },

    // Forzar un nuevo orden completo (opcional)
    setOrder: (state, action: PayloadAction<string[]>) => {
      // Asegurar que identitySection esté primero si existe
      const incoming = [...action.payload];
      const idx = incoming.indexOf("identitySection");
      if (idx > -1) {
        incoming.splice(idx, 1);
        incoming.unshift("identitySection");
      }
      state.order = incoming;
    },
  },
});

export const {
  enableSection,
  disableSection,
  setSectionProgress,
  updateSection,
  toggleSectionOpen,
  setOnlySectionOpen,
  reorderSections,
  setOrder,
} = cvSectionsSlice.actions;

export default cvSectionsSlice.reducer;
