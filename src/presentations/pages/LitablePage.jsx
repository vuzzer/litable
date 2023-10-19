import { useEffect, useState } from "react";
import { displayLitable } from "../../data/litable";
import { HouseCardComponent } from "../components/HouseCardComponent";


const LitablePage = () => {
    const [houses, setHouses] = useState([]);
    const [isLoaded, setLoaded] = useState(false)

    //useEffect is called at mounting and updating
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
    }, [houses, isLoaded])

    return (
        <div>
            <h1>Product Page</h1>
            {isLoaded ? 
            houses.map(house => <HouseCardComponent key={house._id} house={house} />)
             : "donnée en cours de chargement"}
        </div>

    )
}


export default LitablePage;