import { useEffect, useState, memo, useCallback } from "react";
import { displayLitable } from "../../data/litableData";
import { HouseCardComponent } from "../components/HouseCardComponent";
import styles from "./css/modules/LitablePage.module.css"
import  ErrorBoundary from "./ErrorBoundary";
import Pagination from "react-bootstrap/Pagination"
import { PaginationComponent } from "../components/PaginationComponent";
import { useDispatch, useSelector } from "react-redux";
import { incrementer } from "../redux/litableSlice";


const LitablePage = () => {
    const litable = useSelector((state) => state.value)
    console.log(litable)
    const dispatch = useDispatch()

    const [houses, setHouses] = useState([]);
    const [isLoaded, setLoaded] = useState(false)
    const [pagination, setPagination] = useState([]); //contains pagination
 
    //useEffect is called at mounting and updating
    useEffect(() => {
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
        })
            .catch(e => e)
    }, [])


    const paginateData = useCallback((page)=>{
        displayLitable(page).then(({data}) => {
            //Add pagination
            let numberPages = data["metadata"]["numberPages"]
            let currentPage = data["metadata"]["currentPage"] //Indicate current page displayed

            //Build items pagination
            renderPaginationItem(numberPages, currentPage)
            setHouses(data["data"])
        })
            .catch(e => console.log(e))
    }, )

    const renderPaginationItem =  (item, active)=> {
        setPagination(prevState => {
            let items = []
            for(let i=1; i<item+1; i++){
                if(i === active){
                    items.push(
                        <Pagination.Item active onClick={() => paginateData(i)}>{i}</Pagination.Item>
                    )
                }else{
                    items.push(
                        <Pagination.Item onClick={() => paginateData(i)}>{i}</Pagination.Item>
                    )
                }
            }
            return items;
        })
        
    }

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

                {isLoaded && (
                    <PaginationComponent pagination={pagination}/>
                )}
                <button onClick={() => dispatch(incrementer())}>Incrementer</button>
                <div>
                    {litable}
                </div>
        </div>

    )
}


export default LitablePage;