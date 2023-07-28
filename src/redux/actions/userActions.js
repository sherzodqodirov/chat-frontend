import axios from "axios";
import {AUTH_URL, BASE_URL} from "../../utils/apiUrl";
import {addUserData, errorDataUser, loadDataUser} from "../slice/userSlice.js";


export const registerUserAction=(data) =>dispatch=>{

    dispatch(loadDataUser())

    axios.post(BASE_URL+AUTH_URL.register,data)
        .then(res=> {
             const token = res.data.token;
            localStorage.setItem("userToken", token)
            dispatch(addUserData(token))
        })
        .catch(e=> {
            console.log(e.response)
            dispatch(errorDataUser())
        })
}

export const loginUserAction=(data) =>dispatch=>{
    dispatch(loadDataUser())

    axios.post(BASE_URL+AUTH_URL.login,data)
        .then(res=> {
             const token = res.data.token;
            localStorage.setItem("userToken", token)
            dispatch(addUserData(token))
            console.log(res.data)

        })
        .catch(e=> {
            console.log(e.response)
            dispatch(errorDataUser())
        })
}

