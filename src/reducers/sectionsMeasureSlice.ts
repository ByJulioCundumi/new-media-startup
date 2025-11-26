// reducers/sectionsMeasureSlice.ts
import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { ILayoutMeasureState, ISectionSize, ISizeProps } from "../interfaces/ISectionsMeasure";

const initialState: ILayoutMeasureState = {
  page: null,
  split: null,
  vertical: null,
  horizontal: null,
  sections: {},
};

export const sectionsMeasureSlice = createSlice({
  name: "sectionsMeasure",
  initialState,
  reducers: {
    // Actualiza medidas de contenedores principales
    updateLayoutMeasure: (
      state,
      action: PayloadAction<{ target: "page" | "split" | "vertical" | "horizontal"; size: ISizeProps }>
    ) => {
      state[action.payload.target] = action.payload.size;
    },

    // Actualiza medidas de una sección
    updateSectionSize: (
      state,
      action: PayloadAction<{ sectionName: string; size: ISectionSize }>
    ) => {
      state.sections[action.payload.sectionName] = action.payload.size;
    },

    // Elimina la medición de una sección (cuando se desactiva)
    removeSectionSize: (state, action: PayloadAction<{ sectionName: string }>) => {
      delete state.sections[action.payload.sectionName];
    },

    // Reset completo
    resetMeasures: () => initialState,
  },
});

export const { updateLayoutMeasure, updateSectionSize, removeSectionSize, resetMeasures } =
  sectionsMeasureSlice.actions;

export default sectionsMeasureSlice.reducer;
