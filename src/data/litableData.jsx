import axios from "axios"
import URL from "../core/config"


export const postRent = (data) => {
    return axios({
        method: "POST",
        headers:{
            "Content-Type": "application/json"
        },
        url: URL + "/litable/post",
        data: data
    })
}


export const displayLitable = async (page = 1) => {
    try {
        const { data } = await axios({
            method: 'GET',
            url: URL + `/litable/display?page=${page}`,
        })
        return data
    } catch (e) {
        return null
    }
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


export const getLitableById = (id) => {
    return axios({
        method: 'GET',
        url: URL + `/litable/getLitableById?byId=${id}`,
    });
}


export const updateLitable = (data) => {
    return axios({
        method: "PUT",
        url: URL + `/litable/update`,
        headers:{
            "Content-Type": "application/json"
        },
        data: data
    })
}

