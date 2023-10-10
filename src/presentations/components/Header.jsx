import { Link } from "react-router-dom"
import styled from "styled-components"
import './css/Header.css'

const Nav = styled.nav `
    height: 60px;
    padding: 0 3rem;
    background-color: #713ABE;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
`

const Logo = styled.h1 `
font-size: 3rem;
color: white;
`

const Header = () => {
    return ( 
        <>
            <Nav>
                <Link to="/"><Logo>Litable</Logo></Link>
                <div className="link-group">
                    <Link to="/login" className="link">Se Connecter</Link>
                    <Link to="/register" className="link">S'inscrire</Link>
                    <Link to="/stock" className="link">Stocks</Link>
                </div>
            </Nav>
        </>
    )
}

export default Header;