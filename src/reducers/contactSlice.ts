import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { IContactEntry } from "../interfaces/IContact";

export type ContactState = IContactEntry[];

const initialState: ContactState = [];

const contactSlice = createSlice({
  name: "contactEntries",
  initialState,
  reducers: {
    setContactEntries: (_, action: PayloadAction<IContactEntry[]>) => {
      return action.payload;
    },

    addContactEntry: (state, action: PayloadAction<IContactEntry>) => {
      // con immer esto muta de forma segura
      state.push(action.payload);
    },

    updateContactEntry: (
      state,
      action: PayloadAction<{
        id: string;
        field: keyof IContactEntry;
        value: string;
      }>
    ) => {
      const index = state.findIndex((c) => c.id === action.payload.id);
      if (index !== -1) {
        state[index] = {
          ...state[index],
          [action.payload.field]: action.payload.value,
        };
      }
    },

    removeContactEntry: (state, action: PayloadAction<string>) => {
      // retornamos un nuevo arreglo para reemplazar el estado
      return state.filter((c) => c.id !== action.payload);
    },

    clearAllContacts: () => {
      return [];
    },
  },
});

export const {
  setContactEntries,
  addContactEntry,
  updateContactEntry,
  removeContactEntry,
  clearAllContacts,
} = contactSlice.actions;

export default contactSlice.reducer;
