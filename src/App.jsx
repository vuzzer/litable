import './App.css'
import Form from './presentations/components/Form';
import Header from './presentations/components/Header';
import {Routes, Route,  BrowserRouter, Link} from 'react-router-dom';
import ProductPage from './presentations/pages/productPage';



function App() {
  return (
    <BrowserRouter>
      <Header/>
        <Routes>
          <Route exact path="/" element={ <ProductPage/>} />
          <Route exact path="/login" element={<Form/>} />
        </Routes>
    </BrowserRouter>
  )
}

export default App
