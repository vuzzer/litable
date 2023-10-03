import axios from "axios"
import URL from "../core/config"


export const postRent = (rental) => {
    axios({
        method: "post",
        url: URL + "/rental/post",
        data: rental
    }).then(()=> {
        console.log("Rental posted !!!")
    }).catch(e => {
        console.log("An error is occured !!")
    })
}