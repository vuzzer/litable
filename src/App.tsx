import './App.css'
import "./presentation/styles/pages/common.css"
import Header from './presentation/components/Header'
import { Route, Routes } from 'react-router-dom'
import { home, newLitable, register, updateOneLitable } from './core/route'
import {LitablePage, AddLitablePage, UpdateLitablePage, RegisterPage} from "./presentation/pages/index"


function App() {

   return (
    <>
      <Header/>
        <Routes>
          <Route  path={home} element={ <LitablePage/>} />
          <Route  path={newLitable} element={<AddLitablePage/>} />
          <Route  path={updateOneLitable} element={<UpdateLitablePage/>} />
          <Route path={register} element={<RegisterPage/>} />
        </Routes>
    </>
  )
}

export default App
