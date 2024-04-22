import React from 'react'
import './FinalizarPedido.css'

const FinalizarPedido = () => {
  return (
    <section className='finalizarPedidoSection'>
        <div className="infoEntrega">
            <p>Oi</p>
        </div>
        <div className="infoPedido">
            <div className="infoPedidoDetalhes">
                <span>Seu pedido feito em</span>
                <h3>Gokei - Itajaí</h3>
                <p>Lanches</p>
                <hr />
            </div>
            <div className="produtosInfoPedido">
                <table >
                    <tbody>
                        <tr>
                            <td>
                            1x
                            </td>
                            <td>
                            Produto
                            </td>
                            <td>
                            R$ 19,90
                            </td>
                            <td>&times;</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </section>
  )
}

export default FinalizarPedido
