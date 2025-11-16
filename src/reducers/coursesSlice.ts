import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { ICourseEntry } from "../interfaces/ICourses";

export type CoursesState = ICourseEntry[];

const initialState: CoursesState = [];

const coursesSlice = createSlice({
  name: "coursesEntries",
  initialState,
  reducers: {
    setCoursesEntries: (_, action: PayloadAction<ICourseEntry[]>) => {
      return action.payload;
    },

    addCourseEntry: (state, action: PayloadAction<ICourseEntry>) => {
      state.push(action.payload);
    },

    updateCourseEntry: (
      state,
      action: PayloadAction<{ id: string; field: keyof ICourseEntry; value: any }>
    ) => {
      const index = state.findIndex((c) => c.id === action.payload.id);
      if (index !== -1) {
        state[index] = {
          ...state[index],
          [action.payload.field]: action.payload.value,
        };
      }
    },

    removeCourseEntry: (state, action: PayloadAction<string>) => {
      return state.filter((c) => c.id !== action.payload);
    },
  },
});

export const {
  setCoursesEntries,
  addCourseEntry,
  updateCourseEntry,
  removeCourseEntry,
} = coursesSlice.actions;

export default coursesSlice.reducer;
