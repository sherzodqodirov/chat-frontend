import {addAllUserData, errorDataAllUser, loadDataAllUser} from "../slice/allUserSlice";
import axios from "axios";
import {AUTH_URL, BASE_URL} from "../../utils/apiUrl";

export const getAllUserData=(id) =>dispatch=>{
    dispatch(loadDataAllUser())
    axios.get(BASE_URL+AUTH_URL.allusers+id)
        .then(res=> {
            dispatch(addAllUserData(res.data))
        })
        .catch(err => {
            console.log(err.response)
            dispatch(errorDataAllUser())
        })
}