import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    homePageNav: "challenges",
    currentPage: "challenges",
    activityNav: "challenges",
    genderFilter: "all",
}

const NavbarSlice = createSlice({
    name: "navbar",
    initialState,
    reducers: {
        setHomePageNav: (state, actions)=>{
            return {
                ...state,
                homePageNav: actions.payload
            }
        },
         setGenderFilter: (state, actions)=>{
            return {
                ...state,
                genderFilter: actions.payload
            }
        },
         setCurrentPage: (state, actions)=>{
            return {
                ...state,
                currentPage: actions.payload
            }
        },
        setActivityNav: (state, actions)=>{
            return {
                ...state,
                activityNav: actions.payload
            }
        }
    }
})

export const {setHomePageNav, setGenderFilter, setCurrentPage, setActivityNav} = NavbarSlice.actions
export default NavbarSlice.reducer