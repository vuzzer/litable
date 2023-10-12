import axios from "axios"
import URL from "../core/config"


export const postRent = (rental) => {
    return axios({
        method: "POST",
        headers:{
            "Content-Type": "application/json"
        },
        url: URL + "/litable/post",
        data: rental
    })
}


export const displayLitable = () => {
    return axios({
        method: 'GET',
        url: URL + "/litable/display",
    });
}