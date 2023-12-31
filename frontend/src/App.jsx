import './App.css'
import Header from './presentations/components/Header';
import {Routes, Route} from 'react-router-dom';
import LitablePage from './presentations/pages/LitablePage';
import AddLitablePage from './presentations/pages/AddLitablePage';
import UpdateLitablePage from './presentations/pages/UpdateLitablePage';


//Global stylesheet apply to all page or components
import "./presentations/styles/pages/Common.css"
import { home, newLitable, updateOneLitable } from './core/route';



function App() {
  return (
    <>
      <Header/>
        <Routes>
          <Route exact path={home} element={ <LitablePage/>} />
          <Route exact path={newLitable} element={<AddLitablePage/>} />
          <Route exact path={updateOneLitable} element={<UpdateLitablePage/>} />
        </Routes>
    </>
  )
}

export default App
