// src/redux/slices/categorySlice.ts
import { createSlice } from "@reduxjs/toolkit";
import type { ICategories } from "../interfaces/ICategory";

const initialState: ICategories = {
  selectedCategories: [],
};

const categoriesSlice = createSlice({
  name: "categories",
  initialState,
  reducers: {
    toggleCategories: (state, action) => {
      const categories = action.payload;
      if (state.selectedCategories.includes(categories)) {
        state.selectedCategories = state.selectedCategories.filter(
          (c) => c !== categories
        );
      } else {
        state.selectedCategories.push(categories);
      }
    },
    clearCategories: (state) => {
      state.selectedCategories = [];
    },
  },
});

export const { toggleCategories, clearCategories } = categoriesSlice.actions;
export default categoriesSlice.reducer;