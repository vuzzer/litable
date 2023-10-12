import { Component, memo, useEffect, useState } from "react";
import { displayLitable } from "../../data/litable";
import { HouseCard } from "../components/HouseCard";


const LitablePage = () => {
    const [houses, setHouses] = useState([]);
    const [isLoaded, setLoaded] = useState(false)
    useEffect(() => {
        displayLitable().then((res) => {
              //console.log(res["data"])
              // Fetch data from API
              if (isLoaded === false) {
                setHouses(res["data"])
                setLoaded(true)
            }
        })
            .catch(e => console.log(e))
    })
    return (
        <div>
            <h1>Product Page</h1>
            {isLoaded ? 
            houses.map(house => <HouseCard house={house} />)
             : "donnée en cours de chargement"}
        </div>

    )
}


export default memo(LitablePage);