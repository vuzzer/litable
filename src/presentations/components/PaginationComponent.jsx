import { memo } from "react"
import Pagination from "react-bootstrap/Pagination"

export const PaginationComponent = memo(({ items }) => {
    console.log("Je suis dans le composant PaginationComponent")
    return (
        <>
            <Pagination>
               {...items}
            </Pagination>
        </>
    )
})