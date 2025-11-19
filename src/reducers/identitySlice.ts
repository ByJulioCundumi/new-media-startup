import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { IIdentityData } from "../interfaces/IIdentity";

const initialState: IIdentityData = {
  photo: null,
  firstName: "",
  lastName: "",
  jobTitle: "",
};

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
  },
});

export const {
  setPhoto,
  removePhoto,
  setFirstName,
  setLastName,
  setJobTitle,
} = identitySlice.actions;

export default identitySlice.reducer;
