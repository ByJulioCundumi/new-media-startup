// store/userSlice.ts
import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

export interface IUserState {
  id: string | null;
  email: string | null;
  userName: string | null;
  logged: boolean;
  favoriteTemplates: string[];
  affiliateCommission: number;
  subscriptionPlan: "FREE" | "MONTHLY" | "ANNUAL";
  subscriptionStatus?: "ACTIVE" | "CANCELED" | "DELAYED" | null;
  subscriptionExpiresAt?: string | null; // ISO string
  role: "USER" | "ADMIN";
  cvCount: number;
}

const initialState: IUserState = {
  id: null,
  email: null,
  userName: null,
  logged: false,
  affiliateCommission: 20,
  favoriteTemplates: [],
  subscriptionPlan: "FREE",
  subscriptionStatus: null,
  subscriptionExpiresAt: null,
  role: "USER",
  cvCount: 0
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (
      state,
      action: PayloadAction<{
        id: string;
        email: string;
        userName: string;
        favoriteTemplates?: string[];
        affiliateCommission: number;
        subscriptionPlan: "FREE" | "MONTHLY" | "ANNUAL";
        subscriptionStatus?: "ACTIVE" | "CANCELED" | "DELAYED" | null;
        subscriptionExpiresAt?: string | null;
        logged: boolean;
        role: "USER" | "ADMIN";
        cvCount: number
      }>
    ) => {
      state.id = action.payload.id;
      state.email = action.payload.email;
      state.userName = action.payload.userName;
      state.logged = action.payload.logged;
      state.affiliateCommission = action.payload.affiliateCommission;
      state.favoriteTemplates = action.payload.favoriteTemplates ?? [];
      state.subscriptionPlan = action.payload.subscriptionPlan;
      state.subscriptionStatus = action.payload.subscriptionStatus ?? null;
      state.subscriptionExpiresAt = action.payload.subscriptionExpiresAt ?? null;
      state.role = action.payload.role;
      state.cvCount = action.payload.cvCount
    },
    clearUser: (state) => {
      return initialState;
    },
    setFavorites: (state, action: PayloadAction<string[]>) => {
      state.favoriteTemplates = action.payload;
    },
  },
});

export const { setUser, clearUser, setFavorites } = userSlice.actions;
export default userSlice.reducer;