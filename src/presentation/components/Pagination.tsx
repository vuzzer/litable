import Pagination from "react-bootstrap/Pagination"
import styles from "../styles/components/pagination.module.css"

export const CustomPagination = ({ pagination } : {pagination: JSX.Element[]}) => {
    return (
        <>
            <Pagination className={styles.pagination}>
               {...pagination}
            </Pagination>
        </>
    )
}