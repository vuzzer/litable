import './App.css'
import Header from './presentations/components/Header';
import {Routes, Route,  BrowserRouter, Link} from 'react-router-dom';
import LitablePage from './presentations/pages/LitablePage';
import AddLitablePage from './presentations/pages/AddLitablePage';
import UpdateLitablePage from './presentations/pages/UpdateLitablePage';
import { Provider } from 'react-redux';
import { store } from './presentations/redux/store';

//Global stylesheet apply to all page or components
import "./presentations/pages/css/CommonStyle.css"



function App() {
  return (
    <Provider store={store}>
    <BrowserRouter>
      <Header/>
        <Routes>
          <Route exact path="/" element={ <LitablePage/>} />
          <Route exact path="/stock" element={<AddLitablePage/>} />
          <Route exact path='/update/:id' element={<UpdateLitablePage/>} />
        </Routes>
    </BrowserRouter>
    </Provider>
  )
}

export default App
