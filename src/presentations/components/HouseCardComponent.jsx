import styles from "./css/modules/HouseCard.module.css"
import { useEffect, useState } from "react"
import { downloadImgFromUrl } from "../../core/firebase/storage"



export const HouseCardComponent = ({ house }) => {
    const [item, setHouse] = useState(house)

    useEffect(() => {
        //Check if array of image is not null and download first image of room or house
        if (item.imageUrl.length > 0) {
            downloadImgFromUrl(item.imageUrl[0]).then((url) => {
                setHouse({...item,url: url})
            }).catch(e => {
                throw e;
            })
        }
    }, [item])

    return (
     
            <div className={styles.card}>
                <div className={styles.cardImage}>
                  {item.url? <img src={item.url} alt="Maison" className={styles.img} /> : "image en chargement" }  
                </div>
                <ul>
                    <li >Ville: {item.city}</li>
                    <li >Rue: {item.street}</li>
                    <li>Prix location: ${item.rent}</li>
                </ul>
            </div>
     

    )
}