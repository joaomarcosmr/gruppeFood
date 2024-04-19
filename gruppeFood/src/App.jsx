import { useState } from 'react'
import './App.css'

// Components
import Navbar from './components/Navbar/Navbar'
import Restaurantes from './components/Restaurantes/Restaurantes'
import ComidasRecomendadas from './components/ComidasRecomendadas/ComidasRecomendadas'
import Footer from './components/Footer/Footer'

// Pages
import Home from './pages/Home/Home'
import Login from './pages/Login/Login'
import Register from './pages/Registro/Register'

function App() {

  return (
    <>
      <Navbar/>
      <Home/>
    </>
  )
}

export default App
