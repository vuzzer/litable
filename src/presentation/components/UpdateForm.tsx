import {  useState } from "react";
import styled from "styled-components";
import styles from '../styles/components/addForm.module.css';
import image from '../../assets/file.svg'
import {  updateLitable } from "../../data/datasources/litableData"
import { Navigate } from "react-router-dom";
import { updateImg } from "../../data/datasources/firebaseStorage";
import { Control, useForm, useWatch } from "react-hook-form"
import { Spinner, Button } from 'react-bootstrap'
import { CustomModal } from "./Modal";
import _ from "lodash"
import { Litable } from "../../core/interfaces/litable";
import { IFormInputsLitable, IFileImage } from "../../core/interfaces/formInputsLitable";



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


const UpdateFormComponent = ({ litable } : {litable: Litable} ) => {
    const [redirect, setRedirect] = useState(false)
    const [loading, setLoading] = useState(false);
    const [showModal, setShowModal] = useState(false)

    const { register, handleSubmit, formState: { errors }, control } = useForm<IFormInputsLitable, IFileImage>({
        defaultValues: {
            id: litable._id,
            street: litable.street,
            city: litable.city,
            rent: litable.rent,
  imageUrl: litable.imageUrl[0] as String
        }
    })

    const validationForm = async (data: IFormInputsLitable) => {
        //Disable send button in form
        setLoading(true)

        // Image changed, so updated it
        // Update properties modified
        if (_.isEqual(litable.imageUrl, data.imageUrl)) {
            updateLitable(data).catch((e) => {
                console.log(e)
                setShowModal(true)
            }).finally(() => {
                setLoading(false)
            })
        }
        else{
        //Store Stream of loading image in firebase
        const uploadTask = updateImg(litable.imageUrl[0], data.imageUrl[0] as File);

        //Upload file and data
        uploadTask.then((_) => {
            //Add data to mongodb
            return updateLitable(data)
        })
            .then((_) => {
                //Set redirect to true to redirect to route /
                setRedirect(true);
            }).catch((e) => {
                console.log(e)
                setShowModal(true)
            }).finally(() => {
                setLoading(false)
            })
        }

    }

    return (
        redirect ? (<Navigate to="/" />) : (<>
            <FormStyled onSubmit={handleSubmit(validationForm)}>
                <input type="hidden" {...register("id", { required: true })} />
                <DivStyled>
                    <label>Ville</label>
                    <input type="text" {...register("city", { required: true })} />
                    {/* error is returned when field ville fails */}
                    {errors.city && <span style={{ color: "red" }}>Saisir le nom de la ville</span>}
                </DivStyled>
                <DivStyled>
                    <label>Rue</label>
                    <input type="text" {...register("street", { required: true })} />
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
                    <WatchFileField control={control} litable={litable} />
                    <input type="file" {...register("imageUrl")} id="photo" className={styles.file} accept="image/png, image/jpeg"  />
                    {/* error is returned when no file exists */}
                    {errors.imageUrl && <p style={{ color: "red" }}>Selectionnez une image</p>}
                </label>
                {loading ? (<Spinner animation="border" />) : <ButtonUpdate control={control} litable={litable} />}
            </FormStyled>
            {showModal && (<CustomModal showModal={showModal} />)}
        </>)
    )
}


// Observe changement of input file
function WatchFileField({ control, litable }: {control:Control<IFormInputsLitable, IFileImage>, litable: Litable}) {
    //Watch changement of fields file   
    const watchFileFields = useWatch({
        control: control,
        name: "imageUrl",
    })

    return <span>{ watchFileFields === litable.imageUrl[0] ? watchFileFields.split("/")[1] : (watchFileFields as FileList)[0].name }</span>
}


// Observer changement of form data to enable update button or not
function ButtonUpdate({ control, litable }: {control:Control<IFormInputsLitable>, litable: Litable}) {
    const watchAllFields = useWatch({
        control: control,
        name: ["street", "city", "rent", "imageUrl"],
        defaultValue: {
            street: litable.street,
            city: litable.city,
            rent: litable.rent,
            imageUrl: undefined
        }
    })

    //Update values
    const [streetUpdate, cityUpdate, rentUpdate, imageUrlUpdate] = watchAllFields;

    //Props values
    const { street, city, rent, imageUrl } = litable;

    //check if props values and typed values are same
    //And so, activate or deactivate update button
    const isDifferent = _.isEqual([streetUpdate.trim(), cityUpdate.trim(), rentUpdate, imageUrlUpdate], [street.trim(), city.trim(), rent, imageUrl])

    return <Button type="submit" disabled={isDifferent}>Mettre à jour</Button>
}


export default UpdateFormComponent;