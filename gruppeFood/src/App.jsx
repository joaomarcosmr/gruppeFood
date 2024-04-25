import { useState, useEffect } from 'react'
import { onAuthStateChanged } from 'firebase/auth'
import { BrowserRouter, Routes, Route} from 'react-router-dom'
import { useAutenticar } from './hooks/Autenticacao/useAutenticar'
import { AuthProvider } from './context/AuthContext'
import './App.css'

// Components
import Navbar from './components/Navbar/Navbar'
import Footer from './components/Footer/Footer'

// Pages
import Home from './pages/Home/Home'
import Login from './pages/Login/Login'
import Register from './pages/Registro/Register'
import Perfil from './pages/Perfil/Perfil'
import RestaurantePage from './pages/RestaurantePage/RestaurantePage'
import FinalizarPedido from './pages/FinalizarPedido/FinalizarPedido'
import CadastroEmpresa from './pages/CadastroEmpresa/CadastroEmpresa'
import GerenciarEmpresa from './pages/GerenciarEmpresa/GerenciarEmpresa'
import PedidoFinalizado from './pages/PedidoFinalizado/PedidoFinalizado'


function App() {
  // parte de usuario
  const [ user, setUser ] = useState(undefined)
  const { auth } = useAutenticar()
  const usuarioCarregando = user === undefined

  // parte do pedido
  const [pedido, setPedido] = useState([])
  const [produtoPedido, setProdutoPedido] = useState('')
  const [restaurante, setRestaurante] = useState('')
  const [valorCarrinho, setValorCarrinho] = useState(0)
  const [numItensCarrinho, setNumItensCarrinho] = useState(0)
  const [precoCarrinho, setPrecoCarrinho] = useState(0)

  useEffect(() => {
    if(!produtoPedido == '' || !valorCarrinho == 0 || !numItensCarrinho == 0){
      setPedido([...pedido, {
        restaurante: restaurante,
        produto: produtoPedido,
        valorCarrinho: valorCarrinho,
        numItensCarrinho: numItensCarrinho,
        precoCarrinho: precoCarrinho
      }])
    }
  },[valorCarrinho, produtoPedido])

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
        <Navbar pedidoUsuario={pedido} />
        <Routes>
          <Route index path='/' element={<Home 
              setValorCarrinho={setValorCarrinho} 
              setNumItensCarrinho={setNumItensCarrinho}
              setProdutoPedido={setProdutoPedido}
              setPrecoCarrinho={setPrecoCarrinho}
              setRestaurante={setRestaurante}
          />}/>
          <Route path='/login' element={user ? <Perfil/> : <Login/>}/>
          <Route path='/register' element={user ? <Home/> : <Register/>}/>
          <Route path='/cadastro-empresa' element={user ? <CadastroEmpresa/> : <Login/>}/>
          <Route path='/gerenciar-empresa' element={user ? <GerenciarEmpresa/> : <Login/>}/>
          <Route path='/perfil' element={!user ? <Login/> : <Register/>}/>
          <Route path='/restaurante/:id' element={<RestaurantePage
              setValorCarrinho={setValorCarrinho} 
              setNumItensCarrinho={setNumItensCarrinho}
              setProdutoPedido={setProdutoPedido}
              setPrecoCarrinho={setPrecoCarrinho}
              setRestaurante={setRestaurante}
          />}/>
          <Route path='/checkout' element={!user ? <Login/> : <FinalizarPedido />}/>
          <Route path='/pedido-finalizado/:id' element={!user ? <Login/> : <PedidoFinalizado
              // resetAll={resetAll}
          />}/>
        </Routes>
        <Footer/>
      </BrowserRouter>
    </AuthProvider>
  )
}

export default App
