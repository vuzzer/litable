import { memo, useEffect } from "react"
import Pagination from "react-bootstrap/Pagination"
import styles from "../styles/components/PaginationComponent.module.css"

export const PaginationComponent = ({ pagination }) => {
    return (
        <>
            <Pagination className={styles.pagination}>
               {...pagination}
            </Pagination>
        </>
    )
}