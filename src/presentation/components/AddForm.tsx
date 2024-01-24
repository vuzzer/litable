import {  useState } from "react";
import styled from "styled-components";
import styles from '../styles/components/addForm.module.css';
import image from '../../assets/file.svg'
import { postRent } from "../../data/datasources/litableData"
import { Navigate } from "react-router-dom";
import { uploadFileToFireBase } from "../../data/datasources/firebaseStorage";
import { Control,  useWatch, useForm } from "react-hook-form"
import {Spinner, Button} from 'react-bootstrap'
import { CustomModal } from "./Modal";
import { IFormInputsLitable } from "../../core/interfaces/formInputsLitable";


const FormStyled = styled.form`
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    gap: 1.5rem;
    margin-top: 2rem;
`

const DivStyled = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
`


export default ( ) => {
    const [redirect, setRedirect] = useState(false)
    const [loading, setLoading] = useState(false);
    const [showModal, setShowModal] = useState(false)

    const { register, handleSubmit, formState: { errors }, control } = useForm<IFormInputsLitable>()
    const validationForm = async (data: IFormInputsLitable) => {
        //Declare a variable to cancel upload file
        const uploadTask = uploadFileToFireBase(data.imageUrl[0] as File);

        //Disable send button in form
        setLoading(true)

        //Upload file and data
        uploadTask.then((snapshot) => {
            //Add data to mongodb
            return postRent({ ...data, fullpath: snapshot.metadata.fullPath })
        })
            .then((_) => {
                //Set redirect to true to redirect to route /
                setRedirect(true);
            }).catch((e) => {
                console.log(e)
                setShowModal(true)
            }).finally(()=>{
                setLoading(false)
            })
    }

    return (
        redirect ? (<Navigate to="/" />) : (<>
            <h1>Ajouter une litable</h1>
            <FormStyled onSubmit={handleSubmit(validationForm)}>
                <DivStyled>
                    <label>Ville</label>
                    <input type="text" {...register("city", {required: true})}  />
                    {/* error is returned when field ville fails */}
                    {errors.city && <span style={{ color: "red" }}>Saisir le nom de la ville</span>}
                </DivStyled>
                <DivStyled>
                    <label>Rue</label>
                    <input type="text" {...register("street", { required: true })}   />
                    {/* error is returned when field rue fails */}
                    {errors.street && <span style={{ color: "red" }}>Saisir le nom de la rue</span>}
                </DivStyled>

                <DivStyled>
                    <label>Loyer</label>
                    <input type="number" {...register("rent", { required: true })} />
                    {/* error is returned when field rent fails */}
                    {errors.rent && <span style={{ color: "red" }}>Saisir le prix du loyer</span>}
                </DivStyled>

                <label htmlFor="photo">
                    <img src={image} alt="" style={{ width: "30px" }} /><br />
                    {/*  If file exist, its name is displayed or asked to load file */}
                    <WatchFielField control={control} />
                    <input type="file" {...register("imageUrl", {required: true})} id="photo" accept="image/png, image/jpeg" className={styles.file}  />
                    {/* error is returned when no file exists */}
                    {errors.imageUrl && <p style={{ color: "red" }}>Selectionnez une image</p>}
                </label>
                <Button type="submit" disabled={loading}> {loading ? (<Spinner animation="border"/>) : "Valider"}</Button>
            </FormStyled>
            {showModal && ( <CustomModal showModal={showModal} />)}
        </>)
    )
}


function WatchFielField({control} : {control: Control<IFormInputsLitable>}){
    const watchfileField = useWatch({
        control: control,
        name: "imageUrl",
    }) 


    return <span>{ watchfileField?.length > 0 ? (watchfileField as FileList)[0].name : "Sélectionner une Image de la maison/appart." }</span>
}


