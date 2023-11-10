import './App.css'
import Header from './presentations/components/Header';
import {Routes, Route,  BrowserRouter, Link} from 'react-router-dom';
import LitablePage from './presentations/pages/LitablePage';
import AddLitablePage from './presentations/pages/AddLitablePage';
import UpdateLitablePage from './presentations/pages/UpdateLitablePage';

//Global stylesheet apply to all page or components
import "./presentations/pages/css/CommonStyle.css"



function App() {
  return (
    <BrowserRouter>
      <Header/>
        <Routes>
          <Route exact path="/" element={ <LitablePage/>} />
          <Route exact path="/stock" element={<AddLitablePage/>} />
          <Route exact path='/update/:id' element={<UpdateLitablePage/>} />
        </Routes>
    </BrowserRouter>
  )
}

export default App
