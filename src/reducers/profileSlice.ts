import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

const initialState: string = "";

const profileSlice = createSlice({
  name: "profileContent",
  initialState,
  reducers: {
    setProfileContent: (_, action: PayloadAction<string>) => {
      return action.payload;
    },

    resetProfileContent: () => {
      return initialState;
    },
  },
});

export const { setProfileContent, resetProfileContent } = profileSlice.actions;
export default profileSlice.reducer;
