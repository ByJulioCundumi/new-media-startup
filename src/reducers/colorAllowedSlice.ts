import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

export const colorAllowedDefaults = {
  textColor: true,
  nameColor: true,
  professionColor: true,
  sectionTitleColor: true,
  itemColor: true,
  qrColor: true,
};

export type IColorAllowedState = typeof colorAllowedDefaults;

const initialState: IColorAllowedState = colorAllowedDefaults;

const colorAllowedSlice = createSlice({
  name: "colorAllowed",
  initialState,
  reducers: {
    loadColorAllowed: (
      state,
      action: PayloadAction<Partial<IColorAllowedState>>
    ) => {
      return {
        ...state,
        ...action.payload,
      };
    },

    resetColorAllowed: () => {
      return colorAllowedDefaults;
    },
  },
});

export const {
  loadColorAllowed,
  resetColorAllowed,
} = colorAllowedSlice.actions;

export default colorAllowedSlice.reducer;
