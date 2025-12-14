// store/userSlice.ts
import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { IUserState } from "../interfaces/IUser";

const initialState: IUserState = {
  id: null,
  email: null,
  userName: null,
  logged: false,
  favoriteTemplates: []
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<{ id: string; email: string; userName: string; favoriteTemplates: string[] }>) => {
      state.id = action.payload.id;
      state.email = action.payload.email;
      state.userName = action.payload.userName;
      state.logged = true;
      state.favoriteTemplates = action.payload.favoriteTemplates ?? [];
    },
    clearUser: (state) => {
      state.id = null;
      state.email = null;
      state.userName = null;
      state.logged = false;
      state.favoriteTemplates = [];
    },
    setFavorites: (state, action) => {
      state.favoriteTemplates = action.payload;
    }
  },
});

export const { setUser, clearUser, setFavorites } = userSlice.actions;
export default userSlice.reducer;
