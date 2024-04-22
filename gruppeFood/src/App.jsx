import { useState } from 'react'
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
    <>
      <Navbar/>
      <FinalizarPedido/>
    </>
  )
}

export default App
