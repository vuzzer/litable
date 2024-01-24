import styles from "../styles/components/houseCard.module.css"
import { useEffect, useState } from "react"
import { downloadImgFromUrl } from "../../data/datasources/firebaseStorage"
import Button from "react-bootstrap/Button"
import { Navigate } from "react-router-dom"
import { Litable } from "../../core/interfaces/litable"



export const HouseCard = ({ house, index, deleteLitableImpl } : {house: Litable, index: number, deleteLitableImpl: Function}) => {
    const [imageUrl, setImageUrl] = useState<string>("")
    const [isLoading, setIsLoading] = useState<boolean>(false)
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
                <Button variant="danger" onClick={() => deleteLitableImpl(house, index)} disabled={isLoading}>Supprimer</Button>
                <Button variant="success" onClick={() => setRedirectRoute(true) } >Mettre à jour</Button>
                {redirectRoute && (<Navigate to={`/update/${house._id}`} /> )}
            </div>
        </div>

    )
}

