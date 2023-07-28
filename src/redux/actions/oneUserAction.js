import axios from "axios";
import {AUTH_URL, BASE_URL} from "../../utils/apiUrl";
import {addOneUserData, errorDataOneUser, loadDataOneUser} from "../slice/oneUserSlice";

export const getOneUserData=(id) =>dispatch=>{
    dispatch(loadDataOneUser())
  id ?  axios.get(BASE_URL+AUTH_URL.oneusers+id)
        .then(res=> {
            dispatch(addOneUserData(res.data))
        })
        .catch(err => {
            dispatch(errorDataOneUser())
        }) : dispatch(errorDataOneUser())
}