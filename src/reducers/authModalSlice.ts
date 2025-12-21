// src/reducers/authModalSlice.ts

import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { IAuthModalState } from '../interfaces/IAuthModal';

type Section = 'login' | 'signup' | 'recovery';

const initialState: IAuthModalState = {
  isOpen: false,
  section: 'login',
};

const authModalSlice = createSlice({
  name: 'authModal',
  initialState,
  reducers: {
    openAuthModal: (
      state,
      action: PayloadAction<{ section?: Section }>
    ) => {
      state.isOpen = true;
      state.section = action.payload.section || 'login';
    },
    closeAuthModal: (state) => {
      state.isOpen = false;
      state.section = 'login'; // reseteamos al cerrar
    },
    setSection: (state, action: PayloadAction<Section>) => {
      state.section = action.payload;
    },
  },
});

export const { openAuthModal, closeAuthModal, setSection } = authModalSlice.actions;

export default authModalSlice.reducer;