import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    sidebarOption:"home",
}

const SidebarSlice = createSlice({
    name: "sidebar",
    initialState,
    reducers: {
        setSidebar: (state, actions)=>{
            return {
                ...state,
                sidebarOption: actions.payload
            }
        }
    }
})

export const {setSidebar} = SidebarSlice.actions
export default SidebarSlice.reducer