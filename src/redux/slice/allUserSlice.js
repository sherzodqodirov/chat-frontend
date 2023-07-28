import {createSlice} from "@reduxjs/toolkit";


const initialState = {
    allUserInfo:null,
    status:null,
}
export const allUserSlice = createSlice({
    name: 'allUserSlice',
    initialState,
    reducers: {
        loadDataAllUser: (state) => {
            state.status = "loading";
        },
        addAllUserData: (state, action) => {
            state.status = "success";
            state.allUserInfo =action.payload
        },
        errorDataAllUser: (state) => {
            state.status = "error";
        },


    }
})

const {actions, reducer} = allUserSlice

export const {loadDataAllUser,addAllUserData,errorDataAllUser} = actions

export default reducer