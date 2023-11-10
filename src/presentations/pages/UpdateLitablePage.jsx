"use strict";

import { useParams,  } from "react-router";
import { getLitableById } from "../../data/litableData";

export async function getLitableByIdImpl({ params }) {
    const litable = await getLitableById(params.id)
    return { litable }
}



export default function UpdateLitablePage() {
    const { id } = useParams();
    return (
        <div className="container">
            <h1>Update litable page</h1>
            <h5>{id}</h5>
        </div>
    );
}



