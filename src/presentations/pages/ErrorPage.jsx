import { useRouteError } from "react-router-dom";

export default function () {
    const error = useRouteError()
    return (
        <div>
            <h1>Oops</h1>
            <p>Sorry, an unexpected has occured</p>
            <p>
                <i>{error.statusText || error.message}</i>
            </p>
        </div>
    )
}