// reducers/cvSectionsSlice.ts
import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { ICvSectionEditors, ICvSectionsEditorState } from "../interfaces/ISectionsEditors";

// ---------------------- SECCIONES INICIALES ----------------------
export const initialSections: ICvSectionEditors[] = [
  {
    name: "identitySection",
    isOpen: false,
    isEditorOpen: false,
  },
  {
    name: "contactSection",
    isOpen: false,
    isEditorOpen: false,
  },
  {
    name: "profileSection",
    isOpen: false,
    isEditorOpen: false,
  },
  {
    name: "educationSection",
    isOpen: false,
    isEditorOpen: false,
  },
  {
    name: "experienceSection",
    isOpen: false,
    isEditorOpen: false,
  },
  {
    name: "skillSection",
    isOpen: false,
    isEditorOpen: false,
  },
  {
    name: "languageSection",
    isOpen: false,
    isEditorOpen: false,
  },
  {
    name: "personalInfoSection",
    isOpen: false,
    isEditorOpen: false,
  },
  {
    name: "linkSection",
    isOpen: false,
    isEditorOpen: false,
  },
  {
    name: "courseSection",
    isOpen: false,
    isEditorOpen: false,
  },
  {
    name: "hobbieSection",
    isOpen: false,
    isEditorOpen: false,
  },
  {
    name: "referenceSection",
    isOpen: false,
    isEditorOpen: false,
  },
  {
    name: "awardSection",
    isOpen: false,
    isEditorOpen: false,
  },
  {
    name: "customSection",
    isOpen: false,
    isEditorOpen: false,
  },
];

// ---------------------- ESTADO GLOBAL ----------------------
const initialState = {
  sections: initialSections,
};

// ---------------------- SLICE ----------------------
const cvSectionsEditorSlice = createSlice({
  name: "cvSectionsEditors",
  initialState,
  reducers: {
    disableSection: (state, action: PayloadAction<string>) => {
      const section = state.sections.find((s) => s.name === action.payload);
      if (section) {
        section.isEditorOpen = false; // ← cerrar editor al desactivar
        section.isOpen = false;       // (opcional) también cerrar el panel si quieres
      }
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

    setCvSections(state, action: PayloadAction<ICvSectionsEditorState>) {
  return { ...action.payload };
},
    resetCvSections() {
          return initialState;
    }
  },
});

// ---------------------- EXPORTS ----------------------
export const {
  disableSection,
  toggleSectionOpen,
  setOnlySectionOpen,
  toggleSectionEditor,
  closeAllEditors,
  resetCvSections,
  setCvSections
} = cvSectionsEditorSlice.actions;

export default cvSectionsEditorSlice.reducer;
