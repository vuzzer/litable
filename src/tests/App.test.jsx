"use strict"
import {render, test, expect, describe, screen,  beforeEach} from "./setupTests"
import {afterEach, vi, it} from "vitest"
import React from "react"
import { BrowserRouter} from "react-router-dom"
import fixtureReader from "./fixtures/fixture_reader"
import App from "../App"
import userEvent from "@testing-library/user-event"


// Fetch fake data from fixtures
const fakeData = JSON.parse(fixtureReader("litables"))



describe("tests ui LitablePage", ()=>{

    beforeEach(()=>{
        vi.setConfig({mockReset: true})
        
    })

    afterEach(()=>{
        vi.clearAllMocks()
    })

    it('Should display "donnée en cours de chargement" during loading data.', async () => { 
        //Arrange
        vi.fn().mockResolvedValue({data: vi.fn(() =>  fakeData)})
   
        render(<App/>, {wrapper: BrowserRouter})
        //Act
        const content = "donnée en cours de chargement"
        //ASSERT
        expect(screen.getByText("donnée en cours de chargement")).toBeDefined()
     })

     it('Should display AddLitablePage', async () => { 
        //Arrange
        render(<App/>, {wrapper: BrowserRouter})
        const user = userEvent.setup()
        //Act
        await user.click(screen.getByText(/Nouvelle litable/i, {selector: 'a'}) )
        //ASSERT
        expect(screen.getByText(/Ajouter une litable/i)).toBeDefined()
     })

})
