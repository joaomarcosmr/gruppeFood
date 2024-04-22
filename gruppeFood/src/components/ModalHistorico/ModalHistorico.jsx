import React from 'react'
import './ModalHistorico.css'

const ModalHistorico = () => {
  return (
    <div className='modalHistoricoPedidos'>
        <div className="modal-content">
            <span className='close'> &times;</span>
            <h4>Seu histórico de pedidos:</h4>
            <div className="historico">
                <span className='dataPedido'>
                    Sex, 19 abril 2024.
                </span>
                <div className='pedidoFeito'>
                    <h4>Gokei - Itajai</h4>
                    <span className='concluido'><span className='check'>&#10003;</span> Pedido concluído Nº {"id"}</span>
                    <div className="detalhesPedido">
                        <table>
                            <tbody>
                                <tr>
                                    <td className='numero'>
                                        1
                                    </td>
                                    <td className='pedido'>
                                        Temaki Roll Hot
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <button className='btnPedido btnVerde'>Refazer Pedido</button>
                </div>
            </div>
        </div>
    </div>
  )
}

export default ModalHistorico
