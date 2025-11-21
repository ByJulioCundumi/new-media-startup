// reducers/cvSectionsSlice.ts
import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { ICvSection, ICvSectionsState } from "../interfaces/ICvSections";

// ---------------------- SECCIONES INICIALES ----------------------
const initialSections: ICvSection[] = [
  {
    name: "identitySection",
    title: "Sobre Mi",
    enabled: true,
    progress: 0,
    isOpen: false,
    isEditorOpen: false,
    orientation: "horizontal",
  },
  {
    name: "contactSection",
    title: "Contacto",
    enabled: true,
    progress: 0,
    isOpen: false,
    isEditorOpen: false,
    orientation: "both",
  },
  {
    name: "profileSection",
    title: "Perfil",
    enabled: true,
    progress: 0,
    isOpen: false,
    isEditorOpen: false,
    orientation: "horizontal",
  },
  {
    name: "educationSection",
    title: "Educación",
    enabled: true,
    progress: 0,
    isOpen: false,
    isEditorOpen: false,
    orientation: "horizontal",
  },
  {
    name: "experienceSection",
    title: "Experiencia",
    enabled: true,
    progress: 0,
    isOpen: false,
    isEditorOpen: false,
    orientation: "horizontal",
  },
  {
    name: "skillSection",
    title: "Habilidades",
    enabled: true,
    progress: 0,
    isOpen: false,
    isEditorOpen: false,
    orientation: "both",
  },
  {
    name: "languageSection",
    title: "Idiomas",
    enabled: true,
    progress: 0,
    isOpen: false,
    isEditorOpen: false,
    orientation: "both",
  },
  {
    name: "personalInfoSection",
    title: "Detalles",
    enabled: false,
    progress: 0,
    isOpen: false,
    isEditorOpen: false,
    orientation: "both",
  },
  {
    name: "linkSection",
    title: "Enlaces",
    enabled: false,
    progress: 0,
    isOpen: false,
    isEditorOpen: false,
    orientation: "both",
  },
  {
    name: "courseSection",
    title: "Cursos y Certificados",
    enabled: false,
    progress: 0,
    isOpen: false,
    isEditorOpen: false,
    orientation: "horizontal",
  },
  {
    name: "hobbieSection",
    title: "Pasatiempos",
    enabled: false,
    progress: 0,
    isOpen: false,
    isEditorOpen: false,
    orientation: "both",
  },
  {
    name: "referenceSection",
    title: "Referencias Laborales",
    enabled: false,
    progress: 0,
    isOpen: false,
    isEditorOpen: false,
    orientation: "horizontal",
  },
  {
    name: "awardSection",
    title: "Premios",
    enabled: false,
    progress: 0,
    isOpen: false,
    isEditorOpen: false,
    orientation: "horizontal",
  },
  {
    name: "customSection",
    title: "Campo Personalizado",
    enabled: false,
    progress: 0,
    isOpen: false,
    isEditorOpen: false,
    orientation: "horizontal",
  },
];

// Orden inicial basado en initialSections
const initialOrder = initialSections.map((s) => s.name);

// ---------------------- ESTADO GLOBAL ----------------------
const initialState: ICvSectionsState = {
  sections: initialSections,
  order: initialOrder,
};

// ---------------------- SLICE ----------------------
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
      if (!section) return;

      if (action.payload.enabled !== undefined)
        section.enabled = action.payload.enabled;

      if (action.payload.progress !== undefined)
        section.progress = action.payload.progress;
    },

    updateSectionTitle: (
      state,
      action: PayloadAction<{ name: string; title: string }>
    ) => {
      const section = state.sections.find((s) => s.name === action.payload.name);
      if (section) section.title = action.payload.title;
    },

    toggleSectionOpen: (state, action: PayloadAction<string>) => {
      const target = action.payload;

      state.sections.forEach((s) => {
        s.isOpen = s.name === target ? !s.isOpen : false;
      });
    },

    setOnlySectionOpen: (state, action: PayloadAction<string>) => {
      state.sections.forEach((s) => {
        s.isOpen = s.name === action.payload;
      });
    },

    reorderSections: (state, action: PayloadAction<{ from: number; to: number }>) => {
      const { from, to } = action.payload;
      const current = [...state.order];

      if (from < 0 || to < 0 || from >= current.length || to >= current.length) return;
      if (from === to) return;

      // impedir mover identitySection
      if (current[from] === "identitySection") return;
      if (to === 0) return;

      const [removed] = current.splice(from, 1);
      current.splice(to, 0, removed);
      state.order = current;
    },

    setOrder: (state, action: PayloadAction<string[]>) => {
      let incoming = [...action.payload];

      // identitySection siempre primera
      const idx = incoming.indexOf("identitySection");
      if (idx > -1) {
        incoming.splice(idx, 1);
        incoming.unshift("identitySection");
      }

      state.order = incoming;
    },

    // ---------------------- EDITOR ----------------------
    toggleSectionEditor: (state, action: PayloadAction<string>) => {
      state.sections.forEach((s) => {
        s.isEditorOpen = s.name === action.payload ? !s.isEditorOpen : false;
      });
    },

    closeAllEditors: (state) => {
      state.sections.forEach((s) => {
        s.isEditorOpen = false;
      });
    },
  },
});

// ---------------------- EXPORTS ----------------------
export const {
  enableSection,
  disableSection,
  setSectionProgress,
  updateSection,
  toggleSectionOpen,
  setOnlySectionOpen,
  reorderSections,
  setOrder,
  updateSectionTitle,
  toggleSectionEditor,
  closeAllEditors,
} = cvSectionsSlice.actions;

export default cvSectionsSlice.reducer;
