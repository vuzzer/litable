import {render, screen} from "../../setupTests"
import HeaderComponent from "../../presentations/components/Header"
import LitablePage from "../../presentations/pages/LitablePage"

test('Should display page web', async () => { 
    //Arrange
    render(<LitablePage />)
    //Act
    await screen.findByRole('heading')
    //ASSERT
    expect(screen.getByRole("div")).toHaveTextContent('donnée en cours de chargement')
 })