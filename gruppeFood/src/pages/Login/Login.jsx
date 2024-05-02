import React from 'react'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useAutenticar } from '../../hooks/Autenticacao/useAutenticar'
import './Login.css'
import ModalEsqueciSenha from '../../components/ModalEsqueciSenha/ModalEsqueciSenha'

const Login = () => {
  const [ email, setEmail] = useState('')
  const [ senha, setSenha ] = useState('')
  const [ mensagem, setMensagem ] = useState('')
  const [openModal, setOpenModal] = useState(false)

  const { logarConta, error, loading } = useAutenticar()
  
  const abrirModal = () => {
    setOpenModal(true);
  };

const closeModal = () => {
    setOpenModal(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault()
    setMensagem('')

    const dados = {
      email: email,
      senha: senha,
    }

    await logarConta(dados)
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
        {loading && (
              <span className='esqueciASenha'>
                  Carregando...
              </span>
          )}
          {error && (
              <p className='vermelho textoErro'>{error}</p>
          )}
          {mensagem.length > 0 ? (
              <span className='sucesso'>
                    <br/> Sucesso, redirecionando...
              </span>
          ) : (
            <span className='esqueciASenha'>
              Se você esqueceu sua senha <span onClick={abrirModal} style={{cursor: 'pointer'}}><b>aperte aqui...</b></span>
            </span>
          )}
          <ModalEsqueciSenha 
            isOpen={openModal}
            closeModal={() => setOpenModal(closeModal)}
          />

      </div>
    </section>
  )
}

export default Login
