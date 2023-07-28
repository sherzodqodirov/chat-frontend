import axios from "axios";
import {AUTH_URL, BASE_URL} from "../utils/apiUrl";

export const registerPost = (data) => {
     axios.post(BASE_URL+AUTH_URL.register,data)
         .then(res=> {
              localStorage.setItem("USER_TOKEN",res.data.token)
              console.log(res.data)
         })
         .catch(e=>console.log(e))

}
export const loginPost = (data) => {
     axios.post(BASE_URL+AUTH_URL.login,data)
         .then(res=> {
              localStorage.setItem("USER_TOKEN",res.data.token)
              console.log(res.data)
         })
         .catch(e=>console.log(e))
}