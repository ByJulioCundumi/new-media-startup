import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    exploreNavbar: "challenges",
    genderFilter: "all"
}

const NavbarSlice = createSlice({
    name: "navbar",
    initialState,
    reducers: {
        setExplreNavbar: (state, actions)=>{
            return {
                ...state,
                exploreNavbar: actions.payload
            }
        },
         setGenderFilter: (state, actions)=>{
            return {
                ...state,
                genderFilter: actions.payload
            }
        }
    }
})

export const {setExplreNavbar, setGenderFilter} = NavbarSlice.actions
export default NavbarSlice.reducer