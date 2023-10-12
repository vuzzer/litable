import { Component } from "react";
import styled from "styled-components";
import './css/Form.css';
import image from '../../assets/file.svg'
import {postRent} from "../../data/litable"
import {Navigate} from "react-router-dom";


const FormStyled = styled.form `
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    gap: 1.5rem;
    margin-top: 10%;
`

const DivStyled = styled.div `
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
`


class Form extends Component {

    constructor(){
        super();
        this.state = {
            city: '',
            street: '',
            rent: '',
            file: ''
        }
    }

    onSubmit = (e) => {
        e.preventDefault();

        postRent(this.state).then((result)=>{
        console.log(result);
        //Delete from form
        this.setState({
            city: '',
            street: '',
            rent: '',
            file: ''
        })
        }).catch((e)=>{
            console.log(e);
        }) 

    }

    render(){
        return(
        this.state.submit ? (<Navigate to="/" />) : (  <>
            <FormStyled onSubmit={(e) => this.onSubmit(e)}>
                <DivStyled>
                    <label>Ville</label>
                    <input value={this.state.city} type="text" onChange={(e) => this.setState({city: e.target.value })} />
                </DivStyled>
                <DivStyled>
                    <label>Adresse</label>
                    <input type="text" value={this.state.street} onChange={(e) => this.setState({street: e.target.value})} />
                </DivStyled>

                <DivStyled>
                    <label>Loyer</label>
                    <input type="number" value={this.state.rent} onChange={(e) => this.setState({rent: e.target.value})} />
                </DivStyled>

                <label htmlFor="file">
                    <img src={image} alt="" style={{width: "30px"}} /><br/>
                    {/*  If file exist, its name is displayed or asked to load file */}
                    {this.state.file !== '' ? this.state.file.name  : "Sélectionner une Image de la maison/appart."}
                    <input type="file" name="" id="file" accept="image/png, image/jpeg" onChange={(e) => this.setState({file:e.target.files[0] })   } className="file"/>
                </label>
                <button type="submit">Valider</button>
            </FormStyled>
            </>)
        )
    }
}


export default Form;