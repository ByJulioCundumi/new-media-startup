import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

const templateSlice = createSlice({
  name: "template",
  initialState: { templateId: "", cvId: "", cvTitle: "" },
  reducers: {
    setTemplateId(state, action) {
      state.templateId = action.payload;
    },
    setCvId(state, action) {
      state.cvId = action.payload;
    },
    setCvTitle(state, action) {
      state.cvTitle = action.payload;
    },
    clearTemplate(state) {
      state.templateId = "";
      state.cvId = "";
      state.cvTitle = "";
    },

    // ⭐ NUEVO — carga parcial o completa del template
    setTemplateData(
      state,
      action: PayloadAction<{
        templateId?: string;
        cvId?: string;
        cvTitle?: string;
      }>
    ) {
      if (action.payload.templateId !== undefined)
        state.templateId = action.payload.templateId;

      if (action.payload.cvId !== undefined)
        state.cvId = action.payload.cvId;

      if (action.payload.cvTitle !== undefined)
        state.cvTitle = action.payload.cvTitle;
    },
  },
});

export const {
  setTemplateId,
  setCvId,
  setCvTitle,
  clearTemplate,
  setTemplateData,
} = templateSlice.actions;

export default templateSlice.reducer;