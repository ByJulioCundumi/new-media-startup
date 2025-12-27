// src/reducers/cvCreationSlice.ts
import { createSlice } from "@reduxjs/toolkit";
import type { ICvCreationState } from "../interfaces/ICvCreation";

const initialState: ICvCreationState = {
  isOpen: false,
  selectedCvId: "",
  selectedTemplateId: "",
  selectedCvTitle: "",
  publicId: "",
};

export const cvCreationSlice = createSlice({
  name: "cvCreation",
  initialState,
  reducers: {
    setCreateCvPopup: (state, action) => {
      state.isOpen = action.payload;
    },
    setSelectedTemplateId: (state, action) => {
      state.selectedTemplateId = action.payload;
    },
    setSelectedCvTitle: (state, action) => {
      state.selectedCvTitle = action.payload;
    },
    setSelectedCvId: (state, action) => {
      state.selectedCvId = action.payload;
    },
    setPublicId: (state, action) => {
      state.publicId = action.payload;
    },
  },
});

export const { setCreateCvPopup, setSelectedTemplateId, setSelectedCvTitle, setSelectedCvId, setPublicId } = cvCreationSlice.actions;
export default cvCreationSlice.reducer;
