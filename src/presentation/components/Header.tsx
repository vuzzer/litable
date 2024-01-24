import { Link } from "react-router-dom"
import styled from "styled-components"
import styles from '../styles/components/header.module.css'
import { home, login, newLitable, register } from "../../core/route"
import { logout } from "../../data/datasources/firebaseAuth"

const Nav = styled.nav `
    position: fixed;
    top: 0;
    height: 60px;
    width: 100vw;
    padding: 0;
    background-color: #713ABE;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
`

const Logo = styled.h1 `
font-size: 3rem;
color: white;
margin-left: 20px;
`

const HeaderComponent = () => {
    return ( 
        <>
            <Nav>
                <Link to="/"><Logo>Litable</Logo></Link>
                <div className={styles.linkGroup}>
                    <Link to={login} className={styles.link}>Se Connecter</Link>
                    <Link to={register} className={styles.link}>S'inscrire</Link>
                    <Link to={home} onClick={logout} className={styles.link}>Se dconnecter</Link>
                    <Link to={newLitable} className={styles.link}>Nouvelle Litable</Link>
                </div>
            </Nav>
        </>
    )
}

export default HeaderComponent;