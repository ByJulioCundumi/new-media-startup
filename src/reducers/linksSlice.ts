import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { ILinkEntry } from "../interfaces/ILinks";

export type LinksState = ILinkEntry[];

const initialState: LinksState = [];

const linksSlice = createSlice({
  name: "linksEntries",
  initialState,
  reducers: {
    setLinksEntries: (_, action: PayloadAction<ILinkEntry[]>) => {
      return action.payload;
    },

    addLinkEntry: (state, action: PayloadAction<ILinkEntry>) => {
      state.push(action.payload);
    },

    updateLinkEntry: (
      state,
      action: PayloadAction<{ id: string; field: keyof ILinkEntry; value: string }>
    ) => {
      const index = state.findIndex((l) => l.id === action.payload.id);
      if (index !== -1) {
        state[index] = {
          ...state[index],
          [action.payload.field]: action.payload.value,
        };
      }
    },

    removeLinkEntry: (state, action: PayloadAction<string>) => {
      return state.filter((l) => l.id !== action.payload);
    },
  },
});

export const {
  setLinksEntries,
  addLinkEntry,
  updateLinkEntry,
  removeLinkEntry,
} = linksSlice.actions;

export default linksSlice.reducer;
