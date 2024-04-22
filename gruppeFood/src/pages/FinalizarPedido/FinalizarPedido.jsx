import React from 'react'
import './FinalizarPedido.css'

const FinalizarPedido = () => {
  return (
    <section className='finalizarPedidoSection'>
        <div className="infoEntrega">
            <div className="entregaDados">
                <h3>Finalize seu pedido</h3>
                <input type="text"  value={"R. João Johanny de Alcântara, 214"}/>
                <p>Hoje, 50-60 minutos</p>
                <span>Frete R$5,00</span>
                <hr />
            </div>
            <div className="pagamentoDados">
                <img src="" alt="entrega" />
                <div className="textoPagamento">
                    <h4>Pagamento na entrega</h4>
                    <span>Faça o pagamento assim que receber</span>
                </div>
            </div>
            <button className='btnVerde finalizarPedido'>Finalizar Pedido</button>
        </div>
        <div className="infoPedido">
            <div className="detalhesPedidos">
                <div className="infoPedidoDetalhes">
                    <span>Seu pedido feito em</span>
                    <h3>Gokei - Itajaí</h3>
                    <p>Lanches</p>
                    <hr />
                </div>
                <div className="produtosInfoPedido">
                    <table>
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
        </div>
    </section>
  )
}

export default FinalizarPedido
