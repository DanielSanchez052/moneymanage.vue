import axios from "axios"
import AuthService from "@/services/users/auth.service"

// axios.defaults.headers.common['Access-Control-Allow-Origin'] = '*';


axios.interceptors.response.use((res) => {
    return {success: true, data: res.data, errors: undefined}
}, (error) => {
    // console.error(error)
    // if(error.code === "ERR_NETWORK"){
    //     AuthService.logout()
    // }

    const status = error.response ? error.response.status : null;

    if(status === 401){
        //Refresh token
        AuthService.logout()
    }
    return {success: false, data: undefined, errors: [...error.response.data.errors]}
})

export default axios