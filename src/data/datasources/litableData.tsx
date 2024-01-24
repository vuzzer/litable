import axios from "axios"
import {serverAddress} from "../../core/serverConfig"
import { IFormInputsLitable } from "../../core/interfaces/formInputsLitable"


export const postRent = (data:object) => {
    return axios({
        method: "POST",
        headers:{
            "Content-Type": "application/json"
        },
        url: serverAddress + "/litable/post",
        data: data
    })
}


export const displayLitable = async (page = 1) => {
    try {
        const { data } = await axios({
            method: 'GET',
            url: serverAddress + `/litable/display?page=${page}`,
        })
        return data
    } catch (e) {
        return null
    }
}   


export const deleteLitable = (id:string) => {
    return axios({
        headers:{
            "Content-Type": "application/json",
        },
        method: "DELETE",
        url: serverAddress  + `/litable/delete`,
        params: {
            "id": id
        }
    })
}


export const getLitableById = (id:string) => {
    return axios({
        method: 'GET',
        url: serverAddress + `/litable/getLitableById?byId=${id}`,
    });
}


export const updateLitable = (data:IFormInputsLitable) => {
    return axios({
        method: "PUT",
        url: serverAddress + `/litable/update`,
        headers:{
            "Content-Type": "application/json"
        },
        data: data
    })
}

