import {createSlice} from "@reduxjs/toolkit";


const initialState = {
    oneUserInfo:null,
    status:null,
}
export const oneUserSlice = createSlice({
    name: 'allUserSlice',
    initialState,
    reducers: {
        loadDataOneUser: (state) => {
            state.status = "loading";
        },
        addOneUserData: (state, action) => {
            state.status = "success";
            state.oneUserInfo =action.payload
        },
        errorDataOneUser: (state) => {
            state.status = "error";
            state.oneUserInfo=null;
        },
        clearDataOneUser: (state) => {
            state.status =null;
            state.oneUserInfo =null;
        }


    }
})

const {actions, reducer} = oneUserSlice

export const {loadDataOneUser,addOneUserData,errorDataOneUser,clearDataOneUser} = actions

export default reducer