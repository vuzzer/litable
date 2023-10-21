import { Link } from "react-router-dom"
import styled from "styled-components"
import styles from './css/Header.module.css'

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
                    <Link to="/login" className={styles.link}>Se Connecter</Link>
                    <Link to="/register" className={styles.link}>S'inscrire</Link>
                    <Link to="/stock" className={styles.link}>Stocks</Link>
                </div>
            </Nav>
        </>
    )
}

export default HeaderComponent;