// src/reducers/educationSlice.ts
import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { IEducationEntry } from "../interfaces/IEducation";

const initialState: IEducationEntry[] = [];  // ← ES UN ARRAY

const educationSlice = createSlice({
  name: "education",
  initialState,
  reducers: {
    addEducation(state) {
      state.push({
        id: crypto.randomUUID(),
        institution: "",
        location: "",
        title: "",
        startMonth: "",
        startYear: "",
        endMonth: "",
        endYear: "",
        present: false,
        description: "",
        showExtraInfo: false
      });
    },

    updateEducation(
      state,
      action: PayloadAction<{
        id: string;
        field: keyof IEducationEntry;
        value: any;
      }>
    ) {
      const { id, field, value } = action.payload;
      const entry = state.find((e) => e.id === id);
      if (entry) {
        (entry[field] as any) = value;
      }
    },

    removeEducation(state, action: PayloadAction<string>) {
      return state.filter((e) => e.id !== action.payload);
    },

    setEducationData(_, action: PayloadAction<IEducationEntry[]>) {
      return action.payload;
    },
    resetEducation() {
      return initialState;
    }
  },
});

export const {
  addEducation,
  updateEducation,
  removeEducation,
  setEducationData,
  resetEducation
} = educationSlice.actions;

export default educationSlice.reducer;
