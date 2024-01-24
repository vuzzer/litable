import {describe, it, expect} from "vitest"
import {screen, render} from "@testing-library/react"
import App from "../App"
import { BrowserRouter, MemoryRouter } from "react-router-dom"
import { newLitable } from "../core/route"
import LitablePage from "../presentation/pages/LitablePage"


describe("App page routing with no response API", ()=>{
    it('Should call route home:/ and display LitablePage showing a msg indicating data loading', async () => { 
        //ARRANGE
        render(<App/>, {wrapper: BrowserRouter} )

        //Act

        //ASSERT
        expect(screen.getByText("donnée en cours de chargement")).toBeDefined()
     })

     it('Should call newLitable:/new route', async() => {
        // ARRANGE
        render(
            <MemoryRouter initialEntries={[newLitable]}>
                <LitablePage />
            </MemoryRouter>
        )
        // ASSERT
        expect(screen.getByText(/donnée en cours de chargement/i)).toBeDefined()
     });


})
