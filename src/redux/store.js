import {configureStore} from "@reduxjs/toolkit";
import btnState from "./slice/btnSlice.js";
import userSlice from "./slice/userSlice";
import allUserSlice from "./slice/allUserSlice";
import oneUserSlice from "./slice/oneUserSlice"

export const store=configureStore({
    reducer:{
        btnState,
        userSlice,
        allUserSlice,
        oneUserSlice
    }
})