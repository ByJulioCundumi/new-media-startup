import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { IIdentityData } from "../interfaces/IIdentity";

const initialState: IIdentityData = {};

const identitySlice = createSlice({
  name: "identity",
  initialState,
  reducers: {
    setPhoto(state, action: PayloadAction<string | null>) {
      state.photo = action.payload;
    },
    removePhoto(state) {
      state.photo = null;
    },
    setFirstName(state, action: PayloadAction<string>) {
      state.firstName = action.payload;
    },
    setLastName(state, action: PayloadAction<string>) {
      state.lastName = action.payload;
    },
    setJobTitle(state, action: PayloadAction<string>) {
      state.jobTitle = action.payload;
    },
    setAllowCvPhoto(state, action: PayloadAction<boolean>){
      state.allowCvPhoto = action.payload
    },
    resetIdentity() {
      return {};
    }
  },
});

export const {
  setPhoto,
  removePhoto,
  setFirstName,
  setLastName,
  setJobTitle,
  resetIdentity,
  setAllowCvPhoto
} = identitySlice.actions;

export default identitySlice.reducer;
