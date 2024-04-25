import React, { useEffect, useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import './Navbar.css'
import ModalPedido from '../ModalPedido/ModalPedido'

const Navbar = ({ pedidoUsuario }) => {
    const [openModal, setOpenModal] = useState(false)
    const [valorCarrinho, setValorCarrinho] = useState(0)
    const [numItensCarrinho, setNumItensCarrinho] = useState(0)

    useEffect(() => {
        for(let i = 0; i < pedidoUsuario.length; i++){
            parseFloat(setValorCarrinho((valorCarrinho + pedidoUsuario[i].valorCarrinho)))
            setNumItensCarrinho(numItensCarrinho + parseInt(pedidoUsuario[i].numItensCarrinho))
        }
    }, [pedidoUsuario])

    const closeModal = () => {
        setOpenModal(false);
      };

        return (
            <section className='navbar'>
                <div className="navbarImage">
                    <Link to='/'>
                        <img src="../src/img/logo.svg" alt="logo gruppe food" />
                    </Link>
                </div>    
                <div className="navbarSessaoUsuario">
                    <div className="navbarEmpresa">
                        <Link to='/gerenciar-empresa'>
                        <svg className='iconeNav' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512"><path d="M48 0C21.5 0 0 21.5 0 48V464c0 26.5 21.5 48 48 48h96V432c0-26.5 21.5-48 48-48s48 21.5 48 48v80h96c26.5 0 48-21.5 48-48V48c0-26.5-21.5-48-48-48H48zM64 240c0-8.8 7.2-16 16-16h32c8.8 0 16 7.2 16 16v32c0 8.8-7.2 16-16 16H80c-8.8 0-16-7.2-16-16V240zm112-16h32c8.8 0 16 7.2 16 16v32c0 8.8-7.2 16-16 16H176c-8.8 0-16-7.2-16-16V240c0-8.8 7.2-16 16-16zm80 16c0-8.8 7.2-16 16-16h32c8.8 0 16 7.2 16 16v32c0 8.8-7.2 16-16 16H272c-8.8 0-16-7.2-16-16V240zM80 96h32c8.8 0 16 7.2 16 16v32c0 8.8-7.2 16-16 16H80c-8.8 0-16-7.2-16-16V112c0-8.8 7.2-16 16-16zm80 16c0-8.8 7.2-16 16-16h32c8.8 0 16 7.2 16 16v32c0 8.8-7.2 16-16 16H176c-8.8 0-16-7.2-16-16V112zM272 96h32c8.8 0 16 7.2 16 16v32c0 8.8-7.2 16-16 16H272c-8.8 0-16-7.2-16-16V112c0-8.8 7.2-16 16-16z"/></svg>
                        </Link>
                    </div>
                    <div className="navbarEmpresa">
                        <Link to='/cadastro-empresa'>
                        <svg className='iconeNav' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M256 80c0-17.7-14.3-32-32-32s-32 14.3-32 32V224H48c-17.7 0-32 14.3-32 32s14.3 32 32 32H192V432c0 17.7 14.3 32 32 32s32-14.3 32-32V288H400c17.7 0 32-14.3 32-32s-14.3-32-32-32H256V80z"/></svg>
                        </Link>
                    </div>
                    <div className="navbarUsuario">
                        <Link to='/login'>
                            <svg className='iconeNav' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M224 256A128 128 0 1 0 224 0a128 128 0 1 0 0 256zm-45.7 48C79.8 304 0 383.8 0 482.3C0 498.7 13.3 512 29.7 512H418.3c16.4 0 29.7-13.3 29.7-29.7C448 383.8 368.2 304 269.7 304H178.3z"/></svg>
                        </Link>
                    </div>
                    <div className="navbarCarrinho" onClick={() => setOpenModal(true)}>
                        <svg className='iconeNav' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M160 112c0-35.3 28.7-64 64-64s64 28.7 64 64v48H160V112zm-48 48H48c-26.5 0-48 21.5-48 48V416c0 53 43 96 96 96H352c53 0 96-43 96-96V208c0-26.5-21.5-48-48-48H336V112C336 50.1 285.9 0 224 0S112 50.1 112 112v48zm24 48a24 24 0 1 1 0 48 24 24 0 1 1 0-48zm152 24a24 24 0 1 1 48 0 24 24 0 1 1 -48 0z"/></svg>
                        <div className="navBarInfoCliente">
                            <span>R$ {parseFloat(valorCarrinho).toFixed(2)}</span>
                            <span>{numItensCarrinho} itens</span>
                        </div>
                        <ModalPedido
                            isOpen={openModal}
                            closeModal={() => setOpenModal(closeModal)}
                            pedidoUsuario={pedidoUsuario}
                        />
                    </div>  
                </div>
            </section>
        )
}

export default Navbar