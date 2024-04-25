import { useState, useEffect } from 'react'
import './ModalHistorico.css'
import { useCarregaColecoes } from '../../hooks/Cadastros/useCarregaColecoes'
import { useCarregaDocumentos } from '../../hooks/Cadastros/useCarregaDocumentos'

const ModalHistorico = ({ isOpen, closeModal, uidUsuario, idPedidoAtual }) => {
    if(idPedidoAtual) {
        const { document: pedidoAtual } = useCarregaDocumentos('pedidos', idPedidoAtual)
    }

    useEffect(() => {
        const handleOutsideClick = (e) => {
            if (!e.target.closest('.modal-content-historico')) {
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

    const { documents: pedidos, loading, error } = useCarregaColecoes('pedidos', uidUsuario)

    if (!isOpen) return null;

  return (
    <div className='modalHistoricoPedidos'>
        <div className="modal-content-historico">
            <span className='close' onClick={closeModal}> &times;</span>
            <h4>Seu histórico de pedidos:</h4>
            {pedidos && pedidos.map((pedido, index) => (
                <div className="historico" key={index}>
                    <span className='dataPedido'>
                        {new Date(pedido.createdAt.seconds * 1000).toLocaleString()}
                    </span>
                    <div className='pedidoFeito'>
                        <h4>{pedido.restaurante}</h4>
                        <span className='concluido'><span className='check'>&#10003;</span> Pedido concluído Idº {pedido.id}</span>
                        <div className="detalhesPedido">
                            <table>
                                <tbody>
                                    {Object.keys(pedido).map((key, index1) => {
                                        if (isNaN(parseInt(key))) return null;
                                        const produto = pedido[key];
                                        return (
                                            <tr key={index1}>
                                                <td className='numero'>
                                                    {produto.numItensCarrinho}
                                                </td>
                                                <td className='pedido'>
                                                    {produto.produto}
                                                </td>
                                            </tr>
                                        );
                                    })}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    </div>
  )
}

export default ModalHistorico
