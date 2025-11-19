import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { IPersonalInfoEntry } from "../interfaces/IPersonalInfo";

export type PersonalInfoState = IPersonalInfoEntry[];

const initialState: PersonalInfoState = [];

const personalInfoSlice = createSlice({
  name: "personalInfoEntries",
  initialState,
  reducers: {
    setPersonalInfoEntries: (_, action: PayloadAction<IPersonalInfoEntry[]>) => {
      return action.payload;
    },

    addPersonalInfoEntry: (state, action: PayloadAction<IPersonalInfoEntry>) => {
      state.push(action.payload);
    },

    updatePersonalInfoEntry: (
      state,
      action: PayloadAction<{ id: string; field: keyof IPersonalInfoEntry; value: string }>
    ) => {
      const index = state.findIndex((e) => e.id === action.payload.id);
      if (index !== -1) {
        state[index] = {
          ...state[index],
          [action.payload.field]: action.payload.value,
        };
      }
    },

    removePersonalInfoEntry: (state, action: PayloadAction<string>) => {
      return state.filter((e) => e.id !== action.payload);
    },

    clearAllPersonalInfo: () => {
      return [];
    },
  },
});

export const {
  setPersonalInfoEntries,
  addPersonalInfoEntry,
  updatePersonalInfoEntry,
  removePersonalInfoEntry,
  clearAllPersonalInfo,
} = personalInfoSlice.actions;

export default personalInfoSlice.reducer;
