import { useState } from 'react'
import { BrowserRouter, Routes, Route} from 'react-router-dom'
import './App.css'

// Components
import Navbar from './components/Navbar/Navbar'
import Restaurantes from './components/Restaurantes/Restaurantes'
import ComidasRecomendadas from './components/ComidasRecomendadas/ComidasRecomendadas'
import Footer from './components/Footer/Footer'
import ModalHistorico from './components/ModalHistorico/ModalHistorico'
import ModalPedido from './components/ModalPedido/ModalPedido'

// Pages
import Home from './pages/Home/Home'
import Login from './pages/Login/Login'
import Register from './pages/Registro/Register'
import Perfil from './pages/Perfil/Perfil'
import RestaurantePage from './pages/RestaurantePage/RestaurantePage'
import FinalizarPedido from './pages/FinalizarPedido/FinalizarPedido'


function App() {

  return (
    <BrowserRouter>
      <Navbar/>
      <Routes>
        <Route>
          <Route index path='/' element={<Home/>}/>
          <Route path='/login' element={<Login/>}/>
          <Route path='/register' element={<Register/>}/>
          <Route path='/perfil' element={<Perfil/>}/>
          <Route path='/restaurante' element={<RestaurantePage/>}/>
          <Route path='/checkout' element={<FinalizarPedido/>}/>
        </Route>
      </Routes>
      <Footer/>
    </BrowserRouter>
  )
}

export default App
