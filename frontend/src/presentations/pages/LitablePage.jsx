import { useEffect, useState, memo, useCallback } from "react";
import { deleteLitable, displayLitable } from "../../data/litableData";
import { HouseCardComponent } from "../components/HouseCardComponent";
import styles from "./css/modules/LitablePage.module.css"
import ErrorBoundary from "./ErrorBoundary";
import Pagination from "react-bootstrap/Pagination"
import { PaginationComponent } from "../components/PaginationComponent";
import { useDispatch, useSelector } from "react-redux";
import { incrementer } from "../redux/litableSlice";
import { deleteImg } from "../../data/storage"


const LitablePage = () => {
    const litable = useSelector((state) => state.value)
    const dispatch = useDispatch()

    const [houses, setHouses] = useState([]);
    const [isLoaded, setLoaded] = useState(false)
    const [indexPaginations, setIndexPaginations] = useState([]); //contains pagination


    // Update pagination when houses is deleted
    useEffect(() => {

        displayLitable().then(({ data }) => {
            //Add pagination
            let item = data["metadata"]["numberPages"]
            let active = data["metadata"]["currentPage"] //Indicate current page displayed

            //Build items pagination
            renderPaginationItem(item, active)

        })
    }, [houses])

    //useEffect is called at mounting stage
    useEffect(() => {
        //Get house data
        displayLitable().then(({ data }) => {
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



    const deleteLitableImpl = ({ _id, imageUrl }, index) => {
        //Delete a litable
        deleteImg(imageUrl[0]).then(async (_) => {
            //When until deletion completed
            await deleteLitable(_id)

            //Get items for update data
            return displayLitable()
        }).then(({data}) => {
            //Add pagination
            let item = data["metadata"]["numberPages"]
            let active = data["metadata"]["currentPage"] //Indicate current page displayed

            //Build items pagination
            renderPaginationItem(item, active)

            setHouses(data["data"])
        })
            .catch(e => {
                console.log(e)
            })
    }

    const paginateData = (page) => {
        displayLitable(page).then(({ data }) => {
            //Add pagination
            let numberPages = data["metadata"]["numberPages"]
            let currentPage = data["metadata"]["currentPage"] //Indicate current page displayed

            //Build items pagination
            renderPaginationItem(numberPages, currentPage)
            setHouses(data["data"])
        })
            .catch(e => console.log(e))
    }

    const renderPaginationItem = (item, currentPage) => {
        setIndexPaginations(prevState => {
            let items = []
            for (let i = 1; i < item + 1; i++) {
                if (i === currentPage) {
                    items.push(
                        <Pagination.Item active onClick={() => paginateData(i)}>{i}</Pagination.Item>
                    )
                } else {
                    items.push(
                        <Pagination.Item onClick={() => paginateData(i)}>{i}</Pagination.Item>
                    )
                }
            }
            prevState = items
            return prevState;
        })

    }

    return (
        <div className="container">
            {isLoaded ?
                (
                    <div className={styles.displayContainer} >
                        {houses.map((house, index) => <ErrorBoundary key={house._id} fallback="Une erreur s'est produite"><HouseCardComponent key={house._id} house={house} index={index} deleteLitableImpl={deleteLitableImpl} /></ErrorBoundary>)}
                    </div>
                )
                : "donnée en cours de chargement"}

            {isLoaded && (
                <PaginationComponent pagination={indexPaginations} />
            )}
            {/*   <button onClick={() => dispatch(incrementer())}>Incrementer</button>
                <div>
                    {litable}
                </div> */}
        </div>

    )
}


export default LitablePage;