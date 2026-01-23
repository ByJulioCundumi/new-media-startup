// src/reducers/experienceSlice.ts
import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { IExperienceEntry } from "../interfaces/IExperience";

const initialState: IExperienceEntry[] = [];

const experienceSlice = createSlice({
  name: "experience",
  initialState,
  reducers: {
    addExperience(state) {
      state.push({
        id: crypto.randomUUID(),
        position: "",
        employer: "",
        location: "",
        startMonth: "",
        startYear: "",
        endMonth: "",
        endYear: "",
        present: false,
        description: "",
      });
    },

    updateExperience(
      state,
      action: PayloadAction<{
        id: string;
        field: keyof IExperienceEntry;
        value: any;
      }>
    ) {
      const { id, field, value } = action.payload;
      const entry = state.find((e) => e.id === id);
      if (entry) {
        (entry[field] as any) = value;
      }
    },

    removeExperience(state, action: PayloadAction<string>) {
      return state.filter((e) => e.id !== action.payload);
    },

    setExperienceData(_, action: PayloadAction<IExperienceEntry[]>) {
      return action.payload;
    },
    resetExperience() {
      return initialState;
    }
  },
});

export const {
  addExperience,
  updateExperience,
  removeExperience,
  setExperienceData,
  resetExperience
} = experienceSlice.actions;

export default experienceSlice.reducer;
