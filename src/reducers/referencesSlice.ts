import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { IReferenceEntry } from "../interfaces/IReferences";

export type ReferencesState = IReferenceEntry[];

const initialState: ReferencesState = [];

const referencesSlice = createSlice({
  name: "referencesEntries",
  initialState,
  reducers: {
    setReferencesEntries: (_, action: PayloadAction<IReferenceEntry[]>) => {
      return action.payload;
    },

    addReferenceEntry: (state, action: PayloadAction<IReferenceEntry>) => {
      state.push(action.payload);
    },

    updateReferenceEntry: (
      state,
      action: PayloadAction<{ id: string; field: keyof IReferenceEntry; value: string }>
    ) => {
      const index = state.findIndex((r) => r.id === action.payload.id);
      if (index !== -1) {
        state[index] = {
          ...state[index],
          [action.payload.field]: action.payload.value,
        };
      }
    },

    removeReferenceEntry: (state, action: PayloadAction<string>) => {
      return state.filter((r) => r.id !== action.payload);
    },
  },
});

export const {
  setReferencesEntries,
  addReferenceEntry,
  updateReferenceEntry,
  removeReferenceEntry,
} = referencesSlice.actions;

export default referencesSlice.reducer;
