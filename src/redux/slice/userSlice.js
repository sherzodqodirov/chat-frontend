import {createSlice} from "@reduxjs/toolkit";
import jwt from "jwt-decode"

const userToken = localStorage.getItem('userToken')|| null;
const userInfo = userToken ? jwt(userToken).user || jwt(userToken).newUser: null;

const status =userToken ? "success": null



const initialState = {
    userInfo,
    status,
    userToken
}
export const userSlice = createSlice({
    name: 'userSlice',
    initialState,
    reducers: {
        loadDataUser: (state) => {
            state.status = "loading";
        },
        addUserData: (state, action) => {
            state.status = "success";
            state.userToken = action.payload;
            state.userInfo = jwt(action.payload).user || jwt(action.payload).newUser;
        },
        errorDataUser: (state) => {
            state.status = "error";
        },
        clearUserData: (state) => {
            localStorage.clear();
            state.status = null;
            state.userToken = null;
            state.userInfo = null;
        }


    }
})

const {actions, reducer} = userSlice

export const {loadDataUser, addUserData,errorDataUser,clearUserData} = actions

export default reducer