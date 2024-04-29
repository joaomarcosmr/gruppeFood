import React from 'react'
import { useEffect, useState } from 'react';
import { useResetarSenha } from '../../hooks/Autenticacao/useResetarSenha'
import './ModalEsqueciSenha.css'

const ModalEsqueciSenha = ({ isOpen, closeModal }) => {
    const { resetarSenha, loading } = useResetarSenha()

    const [mensagem, setMensagem] = useState('')
    const [email, setEmail] = useState('')

    useEffect(() => {
        const handleOutsideClick = (e) => {
            if (!e.target.closest('.modal-content-senha')) {
                closeModal();
            }
        };
  
        if (isOpen) {
            document.addEventListener('mousedown', handleOutsideClick);
        } else {
            document.removeEventListener('mousedown', handleOutsideClick);
        }
  
        return () => {
            document.removeEventListener('mousedown', handleOutsideClick);
        };
    }, [isOpen, closeModal]);

    const handleSubmitSenha = async(e) => {
        e.preventDefault()
        setMensagem('')

            try {
                await resetarSenha(email)
                setLoading(false)
                setMensagem('Um e-mail foi enviado com sucesso')
            } catch (error) {
                console.error(error)
                setMensagem('E-mail não encontrado ou não existente')
            }

    }

    if (!isOpen) return null;

  return (
    <div className='modalEsqueciSenha'>
        <div className="modal-content-senha">
            <span className='close' onClick={closeModal}> &times;</span>
            <h4>Recupere a sua senha:</h4>
            <div className="senha" >
                <form className='formRecuperacao' onSubmit={handleSubmitSenha}>
                    <span>
                        Digite seu e-mail para recuperar
                        <input type="text" placeholder='email@exemplo.com' required onChange={(e) => setEmail(e.target.value)}/>
                    </span>
                    <button className='btnVerde'>Recuperar sua conta</button>
                    {loading && (
                        <p>Carregando...</p>
                    )}
                    {mensagem.length > 0 && (
                        <p>{mensagem}</p>
                    )}
                </form>
            </div>
        </div>
    </div>
  )
}

export default ModalEsqueciSenha
