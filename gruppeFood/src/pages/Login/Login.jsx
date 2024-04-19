import React from 'react'
import './Login.css'

const Login = () => {
  return (
    <section className='homeApp loginSection'>
      <div className="credenciaisLogin">
        <h1>
            Entre na sua conta
        </h1>
        <span>
            Você está quase matando sua fome...
        </span>
        <form className='formLogin'>
            <span>
                Coloque seu e-mail:
                <input type="text" placeholder='Seu e-mail aqui...' />
            </span>
            <span>
                Sua senha:
                <input type="password" placeholder='Sua senha...' />
            </span>
            <button>
                Entrar
            </button>
        </form>
        <span className='esqueciASenha'>
            Se você esqueceu sua senha <a href=""><b>aperte aqui...</b></a>
        </span>
      </div>
    </section>
  )
}

export default Login
