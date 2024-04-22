import React, { useState } from 'react'
import './Register.css'
import { Link } from 'react-router-dom'
import { useAutenticar } from '../../hooks/Autenticacao/useAutenticar/'

const Register = () => {
    const [ nome, setNome ] = useState('')
    const [ email, setEmail] = useState('')
    const [ endereco, setEndereco] = useState('')
    const [ senha, setSenha ] = useState('')
    const { registrarConta, error, loading } = useAutenticar()

    const handleSubmit = async (e) => {
        e.preventDefault()
        
        const dados = {
            nome: nome,
            email: email,
            endereco: endereco,
            senha: senha,
        }

        await registrarConta(dados)
    }

  return (
        <section className='homeApp registerSection'>
            <div className="credenciaisRegister">
                <h1>
                    Crie sua conta agora
                </h1>
                <form onSubmit={handleSubmit} className='formRegister'>
                    <span>
                        Seu nome:
                        <input type="text" placeholder='Seu nome aqui...' onChange={(e) => setNome(e.target.value)}/>
                    </span>
                    <span>
                        Seu endereço:
                        <input type="text" placeholder='Seu endereço aqui...' onChange={(e) => setEndereco(e.target.value)}/>
                    </span>
                    <span>
                        Seu e-mail:
                        <input type="text" placeholder='Seu e-mail aqui...' onChange={(e) => setEmail(e.target.value)}/>
                    </span>
                    <span>
                        Sua senha:
                        <input type="password" placeholder='Sua senha...' onChange={(e) => setSenha(e.target.value)}/>
                    </span>
                    <button>
                        Cadastrar
                    </button>
                </form>
                <span className='esqueciASenha'>
                    Se você já possui conta <Link to='/login'><b>aperte aqui...</b></Link>
                </span>
            </div>
        </section>
    )
}

export default Register
