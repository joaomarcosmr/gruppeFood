import { useEffect, useState } from 'react'
import './Perfil.css'
import { useAuthValue } from '../../context/AuthContext'
import { db, auth } from '../../Firebase/firebase'
import { Link } from 'react-router-dom'
import { signOut } from "firebase/auth";

const Perfil = () => {
  const [ loading, setLoading ] = useState(false)
  const { user } = useAuthValue()

  const handleSignOut = async(e) => {
    setLoading(true)

    signOut(auth)
    .then(() => {
      console.log('saiu da conta')
    })

    setLoading(false)
  }

  return (
    <section className='homeApp perfil'>
      <div className='perfilUsuario'>
        <p>👋 Olá, {user.displayName} esse é seu perfil!</p>
      </div>
      <div className='perfilInformacoesUsuario'>
        <div className="detalhes">
            <span>
                Nome:
                <input type="text" disabled value={user.displayName}/>
            </span>
            <span>
                Email:
                <input type="text" disabled value={user.email}/>
            </span>
            <span>
                Endereço:
                <input type="text" disabled value={user.displayName}/>
            </span>
        </div>
      </div>
      <div className="perfilBotoes">
        <button className='btnVerde'>Histórico de pedidos</button>
        <Link to='/'>
          <button className='btn'>Voltar pro Início</button>
        </Link>
        <button className='btnSair' onClick={handleSignOut}>Sair da conta</button>
        {loading && (
          <p>Saindo...</p>
        )}
      </div>
    </section>
  )
}

export default Perfil
