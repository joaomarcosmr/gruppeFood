import React from 'react'
import './Register.css'

const Register = () => {
  return (
        <section className='homeApp registerSection'>
          <div className="credenciaisRegister">
            <h1>
                Crie sua conta agora
            </h1>
            <form className='formRegister'>
                <span>
                   Seu nome:
                    <input type="text" placeholder='Seu nome aqui...' />
                </span>
                <span>
                   Seu endereço:
                    <input type="text" placeholder='Seu endereço aqui...' />
                </span>
                <span>
                    Seu e-mail:
                    <input type="text" placeholder='Seu e-mail aqui...' />
                </span>
                <span>
                    Sua senha:
                    <input type="password" placeholder='Sua senha...' />
                </span>
                <button>
                    Cadastrar
                </button>
            </form>
            <span className='esqueciASenha'>
                Se você já possui conta <a href=""><b>aperte aqui...</b></a>
            </span>
          </div>
        </section>
      )
}

export default Register
