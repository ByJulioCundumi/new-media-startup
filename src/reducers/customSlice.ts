import { createSlice, type PayloadAction,  } from "@reduxjs/toolkit";
import type { ICustomEntry, ICustomItem } from "../interfaces/ICustom";

const initialState: ICustomEntry = {
  title: "",
  items: [],
};

const customSlice = createSlice({
  name: "customEntry",
  initialState,
  reducers: {
    setCustomTitle: (state, action: PayloadAction<string>) => {
      state.title = action.payload;
    },
    setCustomItems: (state, action: PayloadAction<ICustomItem[]>) => {
      state.items = action.payload;
    },
    setCustomSection: (
      state,
      action: PayloadAction<{ title: string; items: ICustomItem[] }>
    ) => {
      state.title = action.payload.title;
      state.items = action.payload.items;
    },
    resetCustomSection: () => initialState,
  },
});

export const {
  setCustomTitle,
  setCustomItems,
  setCustomSection,
  resetCustomSection,
} = customSlice.actions;

export default customSlice.reducer;
