import React from 'react'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useAutenticar } from '../../hooks/Autenticacao/useAutenticar'
import './Login.css'

const Login = () => {
  const [ email, setEmail] = useState('')
  const [ senha, setSenha ] = useState('')

  const { logarConta, error, loading } = useAutenticar()

  const handleSubmit = async (e) => {
    e.preventDefault()

    const dados = {
      email: email,
      senha: senha,
    }

    const usuario = await logarConta(dados)
  }

  return (
    <section className='homeApp loginSection'>
      <div className="credenciaisLogin">
        <h1>
            Entre na sua conta
        </h1>
        <span>
            Você está quase matando sua fome...
        </span>
        <form className='formLogin' onSubmit={handleSubmit}>
            <span>
                Coloque seu e-mail:
                <input type="text" placeholder='Seu e-mail aqui...' onChange={(e) => setEmail(e.target.value)}/>
            </span>
            <span>
                Sua senha:
                <input type="password" placeholder='Sua senha...' onChange={(e) => setSenha(e.target.value)}/>
            </span>
            <button>
                Entrar
            </button>
        </form>
        <Link to='/register' className='btnCadastro' >
          Cadastre Aqui
        </Link>
        <span className='esqueciASenha'>
            Se você esqueceu sua senha <a href=""><b>aperte aqui...</b></a>
        </span>
      </div>
    </section>
  )
}

export default Login
