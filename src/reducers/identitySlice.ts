import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { IIdentityData } from "../interfaces/IIdentity";

const initialState: IIdentityData = {
  photo: null,
  firstName: "",
  lastName: "",
  jobTitle: "",
  allowCvPhoto: true,
  allowQrCode: false,
  qrCodeUrl: "https://www.cvremoto.com"
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
    setAllowCvPhoto(state, action: PayloadAction<boolean>){
      state.allowCvPhoto = action.payload
    },
    setAllowQrCode(state, action: PayloadAction<boolean>){
      state.allowQrCode = action.payload
    },
    setQrCodeUrl(state, action: PayloadAction<string>){
      state.qrCodeUrl = action.payload
    },
    setIdentity(_, action: PayloadAction<IIdentityData>) {
      return { ...action.payload };
    },
    resetIdentity() {
      return initialState;
    }
  },
});

export const {
  setPhoto,
  removePhoto,
  setFirstName,
  setLastName,
  setJobTitle,
  setAllowCvPhoto, 
  setAllowQrCode,
  resetIdentity,
  setIdentity,
  setQrCodeUrl
} = identitySlice.actions;

export default identitySlice.reducer;
