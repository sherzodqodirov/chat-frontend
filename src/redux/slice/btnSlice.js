import {createSlice} from "@reduxjs/toolkit";

const btnSlice=createSlice({
    name: "button",
    initialState:{
        btn:"open",
    },
    reducers:{
        btnClick:(state,action) =>{
            state.btn=action.payload
        }
    }
})

const {actions,reducer} = btnSlice

export const {btnClick} =actions
export default reducer