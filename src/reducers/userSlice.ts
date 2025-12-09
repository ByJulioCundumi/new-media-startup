// store/userSlice.ts
import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { IUserState } from "../interfaces/IUser";

const initialState: IUserState = {
  id: null,
  email: null,
  userName: null,
  logged: false,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<{ id: string; email: string; userName: string }>) => {
      state.id = action.payload.id;
      state.email = action.payload.email;
      state.userName = action.payload.userName;
      state.logged = true;
    },
    clearUser: (state) => {
      state.id = null;
      state.email = null;
      state.userName = null;
      state.logged = false;
    },
  },
});

export const { setUser, clearUser } = userSlice.actions;
export default userSlice.reducer;
