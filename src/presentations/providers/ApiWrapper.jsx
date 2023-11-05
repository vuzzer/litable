import { useEffect } from "react";

export const ApiWrapper = ({children}) => {
    const [litables, setLitables] = useState([]);

    useEffect(()=>{
               //Get house data
               displayLitable().then(({data}) => {
                //Add pagination
                let item = data["metadata"]["numberPages"]
                let active = data["metadata"]["currentPage"] //Indicate current page displayed
          
                //Build items pagination
                renderPaginationItem(item, active)
    
                if (isLoaded === false) {
                    setHouses(data["data"])
                    setLoaded(true)
                }
            }, [])
    })
}