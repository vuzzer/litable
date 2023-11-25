import { memo } from "react"
import Pagination from "react-bootstrap/Pagination"

export const PaginationComponent = memo(({ pagination }) => {
    return (
        <>
            <Pagination>
               {...pagination}
            </Pagination>
        </>
    )
})