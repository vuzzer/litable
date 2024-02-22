import './App.css'
import Header from './presentations/components/Header';
import {Routes, Route} from 'react-router-dom';
import LitablePage from './presentations/pages/LitablePage';
import AddLitablePage from './presentations/pages/AddLitablePage';
import UpdateLitablePage from './presentations/pages/UpdateLitablePage';


//Global stylesheet apply to all page or components
import "./presentations/styles/pages/Common.css"
import { home, newLitable, register, updateOneLitable } from './core/route';
import { RegisterPage } from './presentations/pages/RegisterPage';



function App() {
  return (
    <>
      <Header/>
        <Routes>
          <Route exact path={home} element={ <LitablePage/>} />
          <Route exact path={newLitable} element={<AddLitablePage/>} />
          <Route exact path={updateOneLitable} element={<UpdateLitablePage/>} />
          <Route exact path={register} element={<RegisterPage/>} />
        </Routes>
    </>
  )
}

export default App
