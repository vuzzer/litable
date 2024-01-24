import { useState } from "react"
import Button from "react-bootstrap/Button"
import Modal from "react-bootstrap/Modal"


export const CustomModal = ({showModal} : {showModal: boolean} ) => {
    const [show, setShow] = useState(showModal)

    const openOrCloseModal = ()=> setShow(prevState => !prevState)

    return(
        <>
            <Modal show={show} onHide={openOrCloseModal} backdrop="static" keyboard={false}>
                <Modal.Header closeButton>Message</Modal.Header>
                <Modal.Body>Une erreur s'est produite lors de l'enregistrement, veuillez ressayer</Modal.Body>
                <Modal.Footer>
                    <Button onClick={openOrCloseModal}>Fermer</Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}