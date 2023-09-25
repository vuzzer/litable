import { Component } from "react";
import styled from "styled-components";
import './css/Header.css';
import image from '../../assets/file.svg'
import {postRent} from "../../data/postRental"

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
    state = {
        owner: '',
        location: '',
        file: ''
    }
    onSubmit = (e) => {
        e.preventDefault();
        postRent(this.state);

        //Delete from form
        this.setState({
            owner: '',
            location: '',
            file: ''
        })
    }

    render(){
        return(
            <>
            <FormStyled onSubmit={(e) => this.onSubmit(e)}>
                <DivStyled>
                    <label>Propriétaire</label>
                    <input value={this.state.owner} type="text" onChange={(e) => this.setState({owner: e.target.value })} />
                </DivStyled>
                <DivStyled>
                    <label>Localisation</label>
                    <input type="text" value={this.state.location} onChange={(e) => this.setState({location: e.target.value})} />
                </DivStyled>

                <label htmlFor="file">
                    <img src={image} alt="" style={{width: "30px"}} /><br/>
                    {/*  If file exist, its name is displayed or asked to load file */}
                    {this.state.file !== '' ? this.state.file.name  : "Sélectionner une Image"}
                    <input type="file" name="" id="file" accept="image/png, image/jpeg" onChange={(e) => this.setState({file:e.target.files[0] })   } className="file"/>
                </label>
                <button type="submit">Valider</button>
            </FormStyled>
            </>
        )
    }
}


export default Form;