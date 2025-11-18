import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { IPhotoData } from "../interfaces/IPhoto";

const initialState: IPhotoData = {
  src: null,
};

const photoSlice = createSlice({
  name: "photo",
  initialState,
  reducers: {
    setPhoto: (_, action: PayloadAction<string | null>) => {
      return { src: action.payload };
    },

    removePhoto: () => {
      return { src: null };
    },
  },
});

export const { setPhoto, removePhoto } = photoSlice.actions;
export default photoSlice.reducer;
