import axios from "axios"
import URL from "../core/config"


export const postRent = (rental) => {
    return axios({
        method: "post",
        url: URL + "/litable/post",
        data: rental
    })
}