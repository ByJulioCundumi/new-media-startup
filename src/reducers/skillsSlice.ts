import { createSlice, type PayloadAction, } from "@reduxjs/toolkit";
import type { ISkillEntry } from "../interfaces/ISkills";

export type SkillsState = ISkillEntry[];

const initialState: SkillsState = [];

const skillsSlice = createSlice({
  name: "skillsEntries",
  initialState,
  reducers: {
    setSkillsEntries: (_, action: PayloadAction<ISkillEntry[]>) => {
      return action.payload;
    },
    addSkillEntry: (state, action: PayloadAction<ISkillEntry>) => {
      state.push(action.payload);
    },
    updateSkillEntry: (
      state,
      action: PayloadAction<{ id: string; field: keyof ISkillEntry; value: string }>
    ) => {
      const index = state.findIndex((s) => s.id === action.payload.id);
      if (index !== -1) {
        state[index] = {
          ...state[index],
          [action.payload.field]: action.payload.value,
        };
      }
    },
    removeSkillEntry: (state, action: PayloadAction<string>) => {
      return state.filter((s) => s.id !== action.payload);
    },
  },
});

export const {
  setSkillsEntries,
  addSkillEntry,
  updateSkillEntry,
  removeSkillEntry,
} = skillsSlice.actions;

export default skillsSlice.reducer;
