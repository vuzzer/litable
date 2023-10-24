import styles from "./css/modules/HouseCard.module.css"
import { useEffect, useState } from "react"
import { downloadImgFromUrl } from "../../core/firebase/storage"



export const HouseCardComponent = ({ house }) => {
    const [imageUrl, setImageUrl] = useState("")

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
                  {imageUrl !== "" ? <img src={imageUrl} alt="Maison" className={styles.img} /> : "image en chargement" }  
                </div>
                <ul className={styles.ul}>
                    <li >Ville: <span>{house.city}</span></li>
                    <li >Rue: <span>{house.street}</span> </li>
                    <li>Prix location: <span>${house.rent}</span></li>
                </ul>
            </div>

    )
}