// src/store/slices/personalInfoSlice.ts
import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { IPersonalInfoData } from "../interfaces/IPersonalInfo";

const initialState: IPersonalInfoData = {
  photo: "",
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

  customLabel: "Campo personalizado",
  customValue: "",
};

const personalInfoSlice = createSlice({
  name: "personalInfo",
  initialState,
  reducers: {
    /** Set individual field */
    setPersonalField: (
      state,
      action: PayloadAction<{ field: keyof IPersonalInfoData; value: any }>
    ) => {
      state[action.payload.field] = action.payload.value;
    },

    /** Set multiple fields */
    setPersonalData: (
      state,
      action: PayloadAction<Partial<IPersonalInfoData>>
    ) => {
      return { ...state, ...action.payload };
    },

    /** Activate/deactivate optional field */
    toggleOptionalField: (
      state,
      action: PayloadAction<keyof IPersonalInfoData>
    ) => {
      const key = action.payload;

      if (state.activeFields.includes(key)) {
        // Remove it
        state.activeFields = state.activeFields.filter((f) => f !== key);

        // Reset its value
        state[key] = "" as any;

        // Special case for custom field
        if (key === "customLabel" || key === "customValue") {
          state.customLabel = "";
          state.customValue = "";
        }
      } else {
        // Add it
        state.activeFields.push(key);
      }
    },
  },
});

export const { setPersonalField, setPersonalData, toggleOptionalField } =
  personalInfoSlice.actions;

export default personalInfoSlice.reducer;
