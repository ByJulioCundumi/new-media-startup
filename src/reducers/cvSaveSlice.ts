// src/reducers/cvSaveSlice.ts
import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { ICvSaveState } from "../interfaces/ICvSave";

const initialState: ICvSaveState = {
  originalData: null,
  hasUnsavedChanges: false,
  isSaving: false,
};

const cvSaveSlice = createSlice({
  name: "cvSave",
  initialState,
  reducers: {
    setOriginalData(state, action: PayloadAction<any>) {
      state.originalData = action.payload;
      state.hasUnsavedChanges = false;
    },
    setHasUnsavedChanges(state, action: PayloadAction<boolean>) {
      state.hasUnsavedChanges = action.payload;
    },
    setIsSaving(state, action: PayloadAction<boolean>) {
      state.isSaving = action.payload;
    },
    resetSaveState() {
      return initialState;
    },
  },
});

export const {
  setOriginalData,
  setHasUnsavedChanges,
  setIsSaving,
  resetSaveState,
} = cvSaveSlice.actions;

export default cvSaveSlice.reducer;