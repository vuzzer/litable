import './App.css'
import Header from './presentations/components/Header';
import {Routes, Route,  BrowserRouter, Link} from 'react-router-dom';
import LitablePage from './presentations/pages/LitablePage';
import AddLitablePage from './presentations/pages/AddLitablePage';
//Common stylesheet
import "./presentations/pages/css/common.css"


function App() {
  return (
    <BrowserRouter>
      <Header/>
        <Routes>
          <Route exact path="/" element={ <LitablePage/>} />
          <Route exact path="/stock" element={<AddLitablePage/>} />
        </Routes>
    </BrowserRouter>
  )
}

export default App
