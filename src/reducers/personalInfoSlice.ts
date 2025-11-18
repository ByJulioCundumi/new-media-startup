import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { IPersonalInfoData } from "../interfaces/IPersonalInfo";

const initialState: IPersonalInfoData = {
  firstName: "",
  lastName: "",
  desiredJob: "",
  email: "",
  phone: "",
  city: "",
  activeFields: [],

  address: "",
  postalCode: "",
  birthDate: "",
  nationality: "",
  civilStatus: "",
  website: "",
  linkedin: "",

  customLabel: "",
  customValue: "",
};

const personalInfoSlice = createSlice({
  name: "personalInfo",
  initialState,
  reducers: {
    setPersonalField: <K extends keyof IPersonalInfoData>(
      state: IPersonalInfoData,
      action: PayloadAction<{ field: K; value: IPersonalInfoData[K] }>
    ) => {
      state[action.payload.field] = action.payload.value;
    },

    setPersonalData: (
      state,
      action: PayloadAction<Partial<IPersonalInfoData>>
    ) => {
      return { ...state, ...action.payload };
    },

    toggleOptionalField: (
      state,
      action: PayloadAction<keyof IPersonalInfoData>
    ) => {
      const key = action.payload;

      if (state.activeFields.includes(key)) {
        state.activeFields = state.activeFields.filter((f) => f !== key);

        if (typeof state[key] === "string") {
          state[key] = "" as never;
        }

        if (key === "customLabel" || key === "customValue") {
          state.customLabel = "";
          state.customValue = "";
        }
      } else {
        state.activeFields.push(key);
      }
    },
  },
});

export const {
  setPersonalField,
  setPersonalData,
  toggleOptionalField,
} = personalInfoSlice.actions;

export default personalInfoSlice.reducer;
