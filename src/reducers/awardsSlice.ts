import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { IAwardEntry } from "../interfaces/IAward";

export type RelevantAwardsState = IAwardEntry[];

const initialState: RelevantAwardsState = [];

const relevantAwardsSlice = createSlice({
  name: "awardsEntries",
  initialState,
  reducers: {
    setAwardsEntries: (_, action: PayloadAction<IAwardEntry[]>) => {
      return action.payload;
    },

    addAwardEntry: (state, action: PayloadAction<IAwardEntry>) => {
      state.push(action.payload);
    },

    updateAwardEntry: (
      state,
      action: PayloadAction<{
        id: string;
        field: keyof IAwardEntry;
        value: any;
      }>
    ) => {
      const index = state.findIndex((a) => a.id === action.payload.id);
      if (index !== -1) {
        state[index] = {
          ...state[index],
          [action.payload.field]: action.payload.value,
        };
      }
    },

    removeAwardEntry: (state, action: PayloadAction<string>) => {
      return state.filter((a) => a.id !== action.payload);
    },

    // Nuevo reducer para eliminar todas las entradas
    clearAllAwards: () => {
      return [];
    },
  },
});

export const {
  setAwardsEntries,
  addAwardEntry,
  updateAwardEntry,
  removeAwardEntry,
  clearAllAwards,
} = relevantAwardsSlice.actions;

export default relevantAwardsSlice.reducer;
