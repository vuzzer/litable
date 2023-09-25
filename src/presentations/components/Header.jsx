import styled from "styled-components"

const Nav = styled.nav `
    width: 100%;
    height: 60px;
    background-color: #713ABE;
    display: flex;
    flex-direction: row;
    justify-content: center;
`

const Logo = styled.h1 `
font-size: 3rem;
color: white;
`

const Header = () => {
    return ( 
        <>
            <Nav>
                <Logo>Litable</Logo>
            </Nav>
        </>
    )
}

export default Header;