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


export const displayLitable = (page = 1) => {
    return axios({
        method: 'GET',
        url: URL + `/litable/display?page=${page}`,
    });
}   


export const deleteLitable = (id) => {
    return axios({
        headers:{
            "Content-Type": "application/json",
        },
        method: "DELETE",
        url: URL  + `/litable/delete`,
        params: {
            "id": id
        }
    })
}

