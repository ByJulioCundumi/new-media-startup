import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { ISectionsState } from "../interfaces/ISections";

const initialState: ISectionsState = {
  order: [
    // Orden inicial por defecto
    "identitySection",
    "profileSection",
    "experienceSection",
    "educationSection",
    "courseSection",
    "referenceSection",
    "awardSection",
    "customSection",
    "contactSection",
    "personalInfoSection",
    "skillSection",
    "languageSection",
    "linkSection",
    "hobbieSection",
  ],

  enabled: {
    identitySection: true,
    profileSection: true,
    experienceSection: true,
    educationSection: true,
    courseSection: true,
    referenceSection: true,
    awardSection: true,
    customSection: true,

    contactSection: true,
    personalInfoSection: true,
    skillSection: true,
    languageSection: true,
    linkSection: true,
    hobbieSection: true,
  },
};

// ----------------------------------------
// ORDEN FIJO DE PRIORIDAD
// ----------------------------------------

const horizontalPriority = [
  "identitySection",
  "profileSection",
  "experienceSection",
  "educationSection",
  "courseSection",
  "referenceSection",
  "awardSection",
  "customSection",
];

const verticalPriority = [
  "contactSection",
  "personalInfoSection",
  "skillSection",
  "languageSection",
  "linkSection",
  "hobbieSection",
];

// ----------------------------------------
// NORMALIZADOR GLOBAL DE ORDEN
// ----------------------------------------

function normalizeOrder(order: string[]): string[] {
  const horizontals = order.filter((n) => horizontalPriority.includes(n));
  const verticals = order.filter((n) => verticalPriority.includes(n));

  horizontals.sort(
    (a, b) => horizontalPriority.indexOf(a) - horizontalPriority.indexOf(b)
  );
  verticals.sort(
    (a, b) => verticalPriority.indexOf(a) - verticalPriority.indexOf(b)
  );

  return [...horizontals, ...verticals];
}

// ----------------------------------------
// REDUCERS
// ----------------------------------------

export const sectionsSlice = createSlice({
  name: "sections",
  initialState,
  reducers: {
    enableSection: (state, action: PayloadAction<string>) => {
      state.enabled[action.payload] = true;
    },

    disableSection: (state, action: PayloadAction<string>) => {
      state.enabled[action.payload] = false;
    },

    // SETORDER TOTALMENTE NORMALIZADO
    setOrder: (state, action: PayloadAction<string[]>) => {
      state.order = normalizeOrder(action.payload);
    },

    // DRAG & DROP con orden fijo
    reorderSections: (
      state,
      action: PayloadAction<{ from: number; to: number }>
    ) => {
      const { from, to } = action.payload;
      const order = [...state.order];

      if (from < 0 || to < 0 || from >= order.length || to >= order.length)
        return;
      if (from === to) return;

      const [moved] = order.splice(from, 1);
      order.splice(to, 0, moved);

      // 🔥 Normalización que asegura horizontales arriba y verticales abajo
      state.order = normalizeOrder(order);
    },
  },
});

export const {
  enableSection,
  disableSection,
  setOrder,
  reorderSections,
} = sectionsSlice.actions;

export default sectionsSlice.reducer;
