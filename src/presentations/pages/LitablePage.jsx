import { useEffect, useState, memo } from "react";
import { displayLitable } from "../../data/litable";
import { HouseCardComponent } from "../components/HouseCardComponent";
import styles from "./css/modules/LitablePage.module.css"
import  ErrorBoundary from "./ErrorBoundary";


const LitablePage = () => {
    const [houses, setHouses] = useState([]);
    const [isLoaded, setLoaded] = useState(false)

    //useEffect is called at mounting and updating
    useEffect(() => {
        //Get house data
        displayLitable().then((responseData) => {
            if (isLoaded === false) {
                setHouses(responseData["data"])
                setLoaded(true)
            }
        })
            .catch(e => console.log(e))
    }, [houses, isLoaded])

    return (
        <div className="container">
            <h1>Product Page</h1>
            {isLoaded ?
                (
                    <div className={styles.displayContainer} >
                        {houses.map(house => <ErrorBoundary key={house._id} fallback="Une erreur s'est produite"><HouseCardComponent key={house._id}  house={house} /></ErrorBoundary> )}
                    </div>
                )
                : "donnée en cours de chargement"}
        </div>

    )
}


export default memo(LitablePage);