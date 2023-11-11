"use strict";

import { useParams,  } from "react-router";
import { getLitableById } from "../../data/litableData";
import { useEffect, useState } from "react";


export default function UpdateLitablePage() {
    const [litable, setLitableItem] = useState(null)
    useEffect(()=> {
        //Get id of litable
        const {id} = useParams();
        getLitableById(id).then(({litable})=>{
            setLitableItem(litable)
        }).catch((e)=>{
            const error = new Error()
            error.message = "Error occured during fetching items"
            throw error;
        })

    }, [])
    return (
        <div className="container">
            <h1>Update litable page</h1>
            <h5>{litable}</h5>
        </div>
    );
}



//fetch litable based on ID
function useLitable() {
    const [litable, setLitableItem] = useState(null)
    useEffect(()=> {
        //Get id of litable
        const {id} = useParams();
        getLitableById(id).then(({litable})=>{
            setLitableItem(litable)
        }).catch((e)=>{
            const error = new Error()
            error.message = "Error occured during fetching items"
            throw error;
        })

    }, [])
    return litable
}
