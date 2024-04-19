import { useState } from 'react'
import './App.css'


// Components
import Navbar from './components/Navbar/Navbar'

// Pages
import Home from './pages/Home/Home'

function App() {

  return (
    <>
      <Navbar/>
      <Home/>
    </>
  )
}

export default App
