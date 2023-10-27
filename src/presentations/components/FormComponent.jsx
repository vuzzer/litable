import { Component, useRef, useState } from "react";
import styled from "styled-components";
import styles from './css/modules/Form.module.css';
import image from '../../assets/file.svg'
import { postRent } from "../../data/litable"
import { Navigate } from "react-router-dom";
import { uploadFileToFireBase } from "../../core/firebase/storage";
import { useForm } from "react-hook-form"


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


const FormComponent = () => {
    const [redirect, setRedirect] = useState(false)
    const { register, handleSubmit, formState: { errors }, watch } = useForm()

    //Declare variable that watch changement of field image
    const watchFileField = watch("image")

    const validationForm = (data) => {
        console.log(data)
        //Add image to Firestore and store image data to mongodb
        uploadFileToFireBase(data.image[0]).then((snapshot) => {
            console.log(snapshot);
            //Add data to mongodb
            return postRent({ ...data, fullpath: snapshot.metadata.fullPath })
        })
            .then((_) => {
                //Set redirect to true to redirect to route /
                setRedirect(true);
            }).catch((e) => {
                console.log(e);
            })
    }

    return (
        redirect ? (<Navigate to="/" />) : (<>
        {console.log(watchFileField)}
            <h1>Ajouter une litable</h1>
            <FormStyled onSubmit={handleSubmit(validationForm)}>
                <DivStyled>
                    <label>Ville</label>
                    <input type="text" {...register("ville")} />
                    {/* error is returned when field validation fields */}
                    {errors.rue && <span style={{ color: "red" }}>Saisir le nom de la ville</span>}
                </DivStyled>
                <DivStyled>
                    <label>Rue</label>
                    <input type="text" {...register("rue", { required: true })} />
                    {/* error is returned when field validation fields */}
                    {errors.rue && <span style={{ color: "red" }}>Saisir le nom de la rue</span>}
                </DivStyled>

                <DivStyled>
                    <label>Loyer</label>
                    <input type="number" {...register("rent", { required: true })} />
                    {/* error is returned when field validation fields */}
                    {errors.loyer && <span style={{ color: "red" }}>Saisir le prix du loyer</span>}
                </DivStyled>

                <label htmlFor="photo">
                    <img src={image} alt="" style={{ width: "30px" }} /><br />
                    {/*  If file exist, its name is displayed or asked to load file */}
                    {(watchFileField && !errors.image) ? watchFileField[0].name : ("Sélectionner une Image de la maison/appart.")}
                    <input type="file" {...register("image", {required: true})} id="photo" accept="image/png, image/jpeg" className={styles.file} />
                    {/* error is returned when field validation fields */}
                    {errors.image && <p style={{ color: "red" }}>Selectionnez une image</p>}
                </label>
                <button type="submit">Valider</button>
            </FormStyled>
        </>)
    )
}


export default FormComponent;