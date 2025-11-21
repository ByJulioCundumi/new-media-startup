import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { IColorFontState } from "../interfaces/IColorFont";

export const emptyDefaults = {
  photoBorderColor: "",
  titleColor: "",
  professionColor: "",
  sectionTitleColor: "",
  itemColor: "",
  qrColor: "",
  font: "",
};

const initialState: IColorFontState = {
  isOpen: false,

  // ✔ valores seleccionados por el usuario
  selected: { ...emptyDefaults },

  // ✔ valores por defecto de la plantilla
  defaults: { ...emptyDefaults },
};

const colorFontSlice = createSlice({
  name: "colorFont",
  initialState,
  reducers: {
    openPopup(state) {
      state.isOpen = true;
    },
    closePopup(state) {
      state.isOpen = false;
    },

    /** Setters para actualizar SOLO selected */
    setTitleColor(state, action: PayloadAction<string>) {
      state.selected.titleColor = action.payload;
    },
    setPhotoBorderColor(state, action: PayloadAction<string>) {
      state.selected.photoBorderColor = action.payload;
    },
    setProfessionColor(state, action: PayloadAction<string>) {
      state.selected.professionColor = action.payload;
    },
    setSectionTitleColor(state, action: PayloadAction<string>) {
      state.selected.sectionTitleColor = action.payload;
    },
    setItemColor(state, action: PayloadAction<string>) {
      state.selected.itemColor = action.payload;
    },
    setQrColor(state, action: PayloadAction<string>) {
      state.selected.qrColor = action.payload;
    },
    setFont(state, action: PayloadAction<string>) {
      state.selected.font = action.payload;
    },

    /** Cargar defaults de la plantilla actual */
    loadTemplateDefaults(
      state,
      action: PayloadAction<Partial<IColorFontState["defaults"]>>
    ) {
      state.defaults = { ...state.defaults, ...action.payload };
      state.selected = { ...state.defaults };
    },

    /** Restaurar valores seleccionados a defaults */
    restoreDefaults(state) {
      state.selected = { ...state.defaults };
    },

    /** Cargar valores desde localStorage */
    loadStoredValues(
      state,
      action: PayloadAction<Partial<IColorFontState["selected"]>>
    ) {
      state.selected = { ...state.selected, ...action.payload };
    },

    resetToTemplateDefaults(state) {
    state.selected = { ...state.defaults };
    },
  },
});

export const {
  openPopup,
  closePopup,
  setTitleColor,
  setProfessionColor,
  setSectionTitleColor,
  setItemColor,
  setQrColor,
  setFont,
  restoreDefaults,
  loadTemplateDefaults,
  loadStoredValues,
  setPhotoBorderColor,
  resetToTemplateDefaults
} = colorFontSlice.actions;

export default colorFontSlice.reducer;
