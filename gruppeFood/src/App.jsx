import { useState, useEffect } from 'react'
import { onAuthStateChanged } from 'firebase/auth'
import { BrowserRouter, Routes, Route} from 'react-router-dom'
import { useAutenticar } from './hooks/Autenticacao/useAutenticar'
import { AuthProvider } from './context/AuthContext'
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
import CadastroEmpresa from './pages/CadastroEmpresa/CadastroEmpresa'
import GerenciarEmpresa from './pages/GerenciarEmpresa/GerenciarEmpresa'


function App() {
  const [ user, setUser ] = useState(undefined)
  const { auth } = useAutenticar()
  const usuarioCarregando = user === undefined

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      setUser(user)
    })
  }, [auth])

  if(usuarioCarregando){
    return (
      <>
        <div className="carregando">
          <img src="../src/img/logo.svg" alt="logo gruppe food carregando" />
        </div>
      </>
    )
  }

  return (
    <AuthProvider value={{user}}>
      <BrowserRouter>
        <Navbar/>
        <Routes>
          <Route index path='/' element={<Home/>}/>
          <Route path='/login' element={user ? <Perfil/> : <Login/>}/>
          <Route path='/register' element={user ? <Home/> : <Register/>}/>
          <Route path='/cadastro-empresa' element={user ? <CadastroEmpresa/> : <Login/>}/>
          <Route path='/gerenciar-empresa' element={user ? <GerenciarEmpresa/> : <Login/>}/>
          <Route path='/perfil' element={!user ? <Login/> : <Register/>}/>
          <Route path='/restaurante/:id' element={<RestaurantePage/>}/>
          <Route path='/checkout' element={!user ? <Login/> : <FinalizarPedido/>}/>
        </Routes>
        <Footer/>
      </BrowserRouter>
    </AuthProvider>
  )
}

export default App
