import { createSlice, type PayloadAction,

 } from "@reduxjs/toolkit";
import type { IToolbarOption } from "../interfaces/IToolbarOption";



const initialState: IToolbarOption = {
previewPopupOpen: false,
templatesPopupOpen: false,
};

const toolbarOptionSlice = createSlice({
name: "toolbarOption",
initialState,
reducers: {
setPreviewPopupOpen(state, action: PayloadAction<boolean>) {
state.previewPopupOpen = action.payload;
},
togglePreviewPopup(state) {
state.previewPopupOpen = !state.previewPopupOpen;
},
setTemplatePopupOpen(state, action: PayloadAction<boolean>) {
state.templatesPopupOpen = action.payload;
},
toggleTemplatePopup(state) {
state.templatesPopupOpen = !state.templatesPopupOpen;
},
},
});

export const {
setPreviewPopupOpen,
togglePreviewPopup,
setTemplatePopupOpen,
toggleTemplatePopup,
} = toolbarOptionSlice.actions;

export default toolbarOptionSlice.reducer;
