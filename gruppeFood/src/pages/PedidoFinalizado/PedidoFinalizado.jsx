import React from 'react'
import { useState, useEffect } from 'react'
import { useCarregaDocumentos } from '../../hooks/Cadastros/useCarregaDocumentos'
import { useParams } from 'react-router-dom'
import './PedidoFinalizado.css'
import ModalHistorico from '../../components/ModalHistorico/ModalHistorico'
import { useAuthValue } from '../../context/AuthContext'

const PedidoFinalizado = () => {
    const [ statusPedido, setStatusPedido ] = useState('Confirmando seu pedido com o estabelecimento...')
    const { user } = useAuthValue()
    const uid = user.uid
    const { id } = useParams()
    const { document: pedidoAtual} = useCarregaDocumentos('pedidos', id)

    const [openModal, setOpenModal] = useState(false)

    const abrirModal = () => {
        setOpenModal(true);
      };

    const closeModal = () => {
        setOpenModal(false);
      };

    useEffect(() => {
        setTimeout(() => {
            setStatusPedido('Pedido confirmado! Estamos preparando...');
            setTimeout(() => {
                setStatusPedido('O motoboy está a caminho!');
                setTimeout(() => {
                    setStatusPedido('Seu pedido foi entregue!');
                    }, "10000");
                }, "5000");
          }, "5000");
    }, [])
  
    return (
        <section className='homeApp pedidoFinalizado'>
            <div className="pedidoRealizado">
                <h3>Seu pedido no <span style={{color: 'green'}}>{pedidoAtual && pedidoAtual.restaurante}</span> foi realizado!</h3>

                {statusPedido != 'Seu pedido foi entregue!' ? (
                    <>
                        <div className="confirmation-text">{statusPedido}</div>
                        <div className="loading-bar">
                            <div className="loading-progress"></div>
                        </div>
                    </>
                ) : (
                    <div className='resultado'>
                        <div className="confirmation-text">{statusPedido}</div>
                        <span>Obrigado pela preferência!</span>
                        <button className='btnVerde' onClick={abrirModal}>Ver histórico de pedidos</button>
                        <ModalHistorico 
                            isOpen={openModal}
                            closeModal={() => setOpenModal(closeModal)}
                            uidUsuario={uid}
                            idPedidoAtual={id}
                        />
                    </div>
                )}
            </div>
        </section>
  )
}

export default PedidoFinalizado
