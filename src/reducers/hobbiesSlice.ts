import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { IHobbyEntry } from "../interfaces/IHobbies";

export type HobbiesState = IHobbyEntry[];

const initialState: HobbiesState = [];

const hobbiesSlice = createSlice({
  name: "hobbiesEntries",
  initialState,
  reducers: {
    setHobbiesEntries: (_, action: PayloadAction<IHobbyEntry[]>) => {
      return action.payload;
    },

    addHobbyEntry: (state, action: PayloadAction<IHobbyEntry>) => {
      state.push(action.payload);
    },

    updateHobbyEntry: (
      state,
      action: PayloadAction<{ id: string; name: string }>
    ) => {
      const index = state.findIndex((h) => h.id === action.payload.id);
      if (index !== -1) {
        state[index] = { ...state[index], name: action.payload.name };
      }
    },

    removeHobbyEntry: (state, action: PayloadAction<string>) => {
      return state.filter((h) => h.id !== action.payload);
    },
  },
});

export const {
  setHobbiesEntries,
  addHobbyEntry,
  updateHobbyEntry,
  removeHobbyEntry,
} = hobbiesSlice.actions;

export default hobbiesSlice.reducer;
