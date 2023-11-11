"use strict";

import { useParams,  } from "react-router";
import { getLitableById } from "../../data/litableData";
import { useEffect, useLayoutEffect, useState } from "react";
import FormComponent from "../components/FormComponent";


export default function UpdateLitablePage() {
    const litable = useLitable(useParams())
    return (
        <div className="container">
            <h1>Update litable page</h1>
            {litable === null ? "loading" : <FormComponent litable={litable} />}
        </div>
    );
}



//fetch litable based on ID
function useLitable({id}) {
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
