"use strict";

import { useParams,  } from "react-router";
import { getLitableById } from "../../data/datasources/litableData";
import { useEffect, useState } from "react";
import UpdateForm from "../components/UpdateForm";
import { Litable } from "../../core/interfaces/litable";


export default function UpdateLitablePage() {
    //Get the litableID param from the url
    let {id} = useParams() 
    const litable = useLitable(id as string)
    return (
        <div className="container">
            <h1>Update litable page</h1>
            {litable === null ? "loading" : <UpdateForm litable={litable} />}
        </div>
    );
}



//fetch litable based on ID
function useLitable(id:string) : Litable|null {
    const [litable, setLitableItem] = useState(null)
    useEffect(()=> {
        //Get id by litable
        getLitableById(id).then(({data})=>{
            setLitableItem(data)
        }).catch((e)=>{
            const error = new Error()
            error.message = "Error occured during fetching items"
            throw error;
        })
    }, []) 
    return litable
}
