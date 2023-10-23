import { Component } from "react";
import styled from "styled-components";
import styles from './css/modules/Form.module.css';
import image from '../../assets/file.svg'
import { postRent } from "../../data/litable"
import { Navigate } from "react-router-dom";
import { uploadFileToFireBase } from "../../core/firebase/storage";


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


class FormComponent extends Component {

    constructor() {
        super();
        this.state = {
            city: '',
            street: '',
            rent: '',
            fullpath: ''
        }
    }

    onSubmit = (e) => {
        //Prevent default behavior of browser
        e.preventDefault();

        //Add image to Firestore and store image data to mongodb
        uploadFileToFireBase(this.state.fullpath).then((snapshot) => {
            console.log(snapshot);
            //Add data to mongodb
            return postRent({...this.state, fullpath: snapshot.metadata.fullPath})
        })
        .then((result) => {
                //Delete from form
                this.setState({
                    city: '',
                    street: '',
                    rent: '',
                    fullpath: ''
                })
            }).catch((e) => {
                console.log(e);
            })
    }


    render() {
        return (
            this.state.submit ? (<Navigate to="/" />) : (<>
                <h1>Ajouter une litable</h1>
                <FormStyled onSubmit={(e) => this.onSubmit(e)}>
                    <DivStyled>
                        <label>Ville</label>
                        <input value={this.state.city} type="text" onChange={(e) => this.setState({ city: e.target.value })} />
                    </DivStyled>
                    <DivStyled>
                        <label>Rue</label>
                        <input type="text" value={this.state.street} onChange={(e) => this.setState({ street: e.target.value })} />
                    </DivStyled>

                    <DivStyled>
                        <label>Loyer</label>
                        <input type="number" value={this.state.rent} onChange={(e) => this.setState({ rent: e.target.value })} />
                    </DivStyled>

                    <label htmlFor="file">
                        <img src={image} alt="" style={{ width: "30px" }} /><br />
                        {/*  If file exist, its name is displayed or asked to load file */}
                        {this.state.fullpath !== '' ? this.state.fullpath.name : "Sélectionner une Image de la maison/appart."}
                        <input type="file" name="" id="file" accept="image/png, image/jpeg" onChange={(e) => this.setState({ fullpath: e.target.files[0] })} className={styles.file} />
                    </label>
                    <button type="submit">Valider</button>
                </FormStyled>
            </>)
        )
    }
}


export default FormComponent;