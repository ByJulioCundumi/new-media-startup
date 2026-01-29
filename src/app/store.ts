import { configureStore } from "@reduxjs/toolkit";
import sidebarSlice from "../reducers/sidebarSlice";
import categoriesSlice from "../reducers/categoriesSlice"
import userSlice from "../reducers/userSlice"
import authModalReducer from "../reducers/authModalSlice";
import navbarSlice from "../reducers/navbarSlice";

export const store = configureStore({
    reducer: {
        sidebar: sidebarSlice,
        categories: categoriesSlice,
        user: userSlice,
        authModal: authModalReducer,
        navbar: navbarSlice
    }
})

export type AppDispatch = typeof store.dispatch;