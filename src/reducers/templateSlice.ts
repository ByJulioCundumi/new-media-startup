import { createSlice } from "@reduxjs/toolkit";

const templateSlice = createSlice({
  name: "template",
  initialState: { id: "" },
  reducers: {
    setTemplate(state, action) {
      state.id = action.payload;
    }
  }
});

export const { setTemplate } = templateSlice.actions;
export default templateSlice.reducer;
