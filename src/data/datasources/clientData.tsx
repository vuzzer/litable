import axios from "axios"
import {serverAddress} from "../../core/serverConfig"


export const registerClientData = (data:Object) => {
    return axios({
        method: "POST",
        headers:{
            "Content-Type": "application/json"
        },
        url: serverAddress + "/client/register",
        data: data
    })
}

