import styles from "./css/modules/HouseCard.module.css"
import { useEffect, useState } from "react"
import { downloadImgFromUrl } from "../../data/storage"
import Button from "react-bootstrap/Button"
import { deleteLitable } from "../../data/litableData"
import { Navigate, redirect } from "react-router-dom"



export const HouseCardComponent = ({ house }) => {
    const [imageUrl, setImageUrl] = useState("")
    const [isLoading, setIsLoading] = useState(false)
    const [redirectRoute, setRedirectRoute] = useState(false)

    useEffect(() => {
        //Check if array of image is not null and download first image of room or house
        if (house.imageUrl.length > 0) {
            downloadImgFromUrl(house.imageUrl[0]).then((url) => {
                setImageUrl(url);
            }).catch(e => {

            })
        }
    }, [imageUrl])


    const deleteLitableImpl = (id) => {
        //Disable delete button during loading
        setIsLoading(true)

        //Delete a litable
        deleteLitable(id).then((_)=>{
            console.log("item deleted")
        }).catch(e => {
            console.log(e)
        }).finally(()=>{
            setIsLoading(false)
        })
    } 


    return (

        <div className={styles.card}>
            <div className={styles.cardImage}>
                {imageUrl !== "" ? <img src={imageUrl} alt="Maison" className={styles.img} /> : "image en chargement"}
            </div>
            <div className={styles.cardBody}>
            <ul className={styles.ul}>
                <li >Ville: <span>{house.city}</span></li>
                <li >Rue: <span>{house.street}</span> </li>
                <li>Prix location: <span>${house.rent}</span></li>
            </ul>
                <Button variant="danger" onClick={() => deleteLitableImpl(house._id)} disabled={isLoading}>Supprimer</Button>
                <Button variant="success" onClick={() => setRedirectRoute(true) } >Mettre à jour</Button>
                {redirectRoute && (<Navigate to={`/update/${house._id}`} /> )}
            </div>
        </div>

    )
}

