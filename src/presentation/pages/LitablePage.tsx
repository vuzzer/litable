import { useEffect, useState } from "react";
import { deleteLitable, displayLitable } from "../../data/datasources/litableData";
import { HouseCard } from "../components/HouseCard";
import styles from "../styles/pages/litablePage.module.css"
import ErrorBoundary from "../errors/ErrorBoundary";
import Pagination from "react-bootstrap/Pagination"
import { CustomPagination } from "../components/Pagination";
import { deleteImg } from "../../data/datasources/firebaseStorage"
import { Litable, RawData } from "../../core/interfaces/litable";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../core/firebaseConfig";
import { Navigate, useNavigate } from "react-router-dom";
import { register } from "../../core/route";



const LitablePage = () => {

    const [houses, setHouses] = useState<Litable[]>([]);
    const [isLoaded, setLoaded] = useState(false)
    const [indexPaginations, setIndexPaginations] = useState<JSX.Element[]>([]); //contains pagination
    const [user] = useAuthState(auth);
    const navigate = useNavigate()

    //useEffect is called at mounting stage
    useEffect(() => {
        // Not authentificate, redirect to login
        if(user) {
                    //Get house data
        displayLitable().then((litables:RawData) => {
            if (litables) {
                const { data, metadata } = litables
                const { numberPages, currentPage } = metadata
                //Build items pagination
                renderPaginationItem(numberPages, currentPage)

                if (isLoaded === false) {
                    setHouses(data)
                    setLoaded(true)
                }
            }
        })
        }

    }, [])


    // Update pagination when houses is deleted
    useEffect(() => {
        displayLitable().then((litables:RawData) => {
            if (litables) {
                const { metadata } = litables
                const { numberPages, currentPage } = metadata

                //Build items pagination
                renderPaginationItem(numberPages, currentPage)
            }

        })
    }, [houses])





    const deleteLitableImpl = ({ _id, imageUrl }: {_id:string, imageUrl:string[] }) => {
        //Delete a litable
        deleteImg(imageUrl[0]).then(async (_) => {
            //When until deletion completed
            await deleteLitable(_id)

            //Get items for update data
            return displayLitable()
        }).then((litables) => {
            //Add pagination
            const { data, metadata } = litables
            const { numberPages, currentPage } = metadata //Indicate current page displayed

            //Build items pagination
            renderPaginationItem(numberPages, currentPage)

            setHouses(data)
        })
            .catch(e => {
                console.log(e)
            })
    }

    const paginateData = (page:number) => {
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

    const renderPaginationItem = (item:number, currentPage:number) => {
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
        user ?
        (<div className="container">
            {isLoaded ?
                (
                    <div className={styles.displayContainer} >
                        {houses.map((house, index) => <ErrorBoundary key={house._id} fallback="Une erreur s'est produite"><HouseCard key={house._id} house={house} index={index} deleteLitableImpl={deleteLitableImpl} /></ErrorBoundary>)}
                    </div>
                )
                : "donnée en cours de chargement"}

            {isLoaded && (
                <CustomPagination pagination={indexPaginations} />
            )}
            {/*   <button onClick={() => dispatch(incrementer())}>Incrementer</button>
                <div>
                    {litable}
                </div> */}
        </div>) : (<Navigate to={register} />)

    )
}


export default LitablePage;