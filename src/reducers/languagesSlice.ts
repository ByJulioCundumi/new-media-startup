import { createSlice, type PayloadAction, } from "@reduxjs/toolkit";
import type { ILanguageEntry } from "../interfaces/ILanguages";

export type LanguagesState = ILanguageEntry[];

const initialState: LanguagesState = [];

const languagesSlice = createSlice({
  name: "languagesEntries",
  initialState,
  reducers: {
    setLanguagesEntries: (_, action: PayloadAction<ILanguageEntry[]>) => {
      return action.payload;
    },

    addLanguageEntry: (state, action: PayloadAction<ILanguageEntry>) => {
      state.push(action.payload);
    },

    updateLanguageEntry: (
      state,
      action: PayloadAction<{ id: string; field: keyof ILanguageEntry; value: string }>
    ) => {
      const index = state.findIndex((l) => l.id === action.payload.id);
      if (index !== -1) {
        state[index] = {
          ...state[index],
          [action.payload.field]: action.payload.value,
        };
      }
    },

    removeLanguageEntry: (state, action: PayloadAction<string>) => {
      return state.filter((l) => l.id !== action.payload);
    },
    resetLanguage() {
      return initialState;
    }
  },
});

export const {
  setLanguagesEntries,
  addLanguageEntry,
  updateLanguageEntry,
  removeLanguageEntry,
  resetLanguage
} = languagesSlice.actions;

export default languagesSlice.reducer;
