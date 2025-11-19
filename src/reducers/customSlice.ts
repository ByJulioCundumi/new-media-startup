// src/reducers/customSlice.ts
import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { ICustomEntry } from "../interfaces/ICustom";

export type CustomState = ICustomEntry[];

const initialState: CustomState = [];

const customSlice = createSlice({
  name: "customEntries",
  initialState,
  reducers: {
    setCustomEntries: (_, action: PayloadAction<ICustomEntry[]>) => {
      return action.payload;
    },

    addCustomEntry: (state, action: PayloadAction<ICustomEntry>) => {
      state.push(action.payload);
    },

    updateCustomEntry: (
      state,
      action: PayloadAction<{ id: string; value: string }>
    ) => {
      const index = state.findIndex((c) => c.id === action.payload.id);
      if (index !== -1) {
        state[index].value = action.payload.value;
      }
    },

    removeCustomEntry: (state, action: PayloadAction<string>) => {
      return state.filter((c) => c.id !== action.payload);
    },

    clearAllCustom: () => {
      return [];
    },
  },
});

export const {
  setCustomEntries,
  addCustomEntry,
  updateCustomEntry,
  removeCustomEntry,
  clearAllCustom,
} = customSlice.actions;

export default customSlice.reducer;