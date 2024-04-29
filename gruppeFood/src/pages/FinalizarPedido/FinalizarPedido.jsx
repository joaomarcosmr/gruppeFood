import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useCreateProduct } from '../../hooks/Cadastros/useDocumentos';
import { useAuthValue } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import './FinalizarPedido.css'

const FinalizarPedido = ({ pedidoUsuario, setPedidoUsuario }) => {
    const [ loading, setLoading ] = useState(false)
    const [ endereco, setEndereco ] = useState('')
    const [subtotal, setSubtotal] = useState(0)
    const { user } = useAuthValue()
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const enderecoUsuario = queryParams.get('enderecoUser');

    const { insertDocument, response } = useCreateProduct('pedidos')
    const navigate = useNavigate()

    useEffect(() => {
        let preco = 0
        for(let i = 0; i < pedidoUsuario.length; i++){
          preco += pedidoUsuario[i].precoCarrinho * pedidoUsuario[i].numItensCarrinho
        }
        setSubtotal(preco)
      }, [pedidoUsuario])

    useEffect(() => {
        setEndereco(enderecoUsuario)
    }, [pedidoUsuario])

    const enviarPedido = async() => {
        setLoading(true)
        try {
            const pedidoFeito = await insertDocument(pedidoUsuario)
            setLoading(false)

            setPedidoUsuario([])
            navigate(`/pedido-finalizado/${pedidoFeito.id}`)
        } catch (error) {
            console.error('Erro:', error);
            throw error;
        }
        setLoading(false)
    }

    const deleteProductArray = (index) => {
        const updatedPedido = [...pedidoUsuario];
        updatedPedido.splice(index, 1);
        setPedidoUsuario(updatedPedido);
      };

  return (
    <section className='finalizarPedidoSection'>
        <div className="infoEntrega">
            <div className="entregaDados">
                <h3>Finalize seu pedido</h3>
                <div className="entregaDadosCampoTexto">
                    <svg className='iconeInput' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512"><path d="M215.7 499.2C267 435 384 279.4 384 192C384 86 298 0 192 0S0 86 0 192c0 87.4 117 243 168.3 307.2c12.3 15.3 35.1 15.3 47.4 0zM192 128a64 64 0 1 1 0 128 64 64 0 1 1 0-128z"/></svg>
                    <input type="text" placeholder='Coloque seu endereço para entrega' defaultValue={enderecoUsuario} required onChange={(e) => setEndereco(e.target.value)}/>
                </div>
                <p>Hoje, 50-60 minutos</p>
                <span className='subtotal'>Subtotal: R$ {parseFloat(subtotal).toFixed(2)}</span><br/>
                <span className='subtotal'>Frete R$ 5.00</span>
                <p className='total'>Total: R$ {parseFloat(subtotal + 5).toFixed(2)}</p>
                <hr />
            </div>
            <div className="pagamentoDados">
                <img src="../../src/img/entrega.png" alt="entrega" />
                <div className="textoPagamento">
                    <h4>Pagamento na entrega</h4>
                    <span>Faça o pagamento assim que receber</span>
                </div>
            </div>
            <button className='btnVerde finalizarPedido' onClick={() => enviarPedido()}>Finalizar Pedido</button>
            {loading && (
                <p className='text-center'>Carregando...</p>
            )}
        </div>
        <div className="infoPedido">
            <div className="detalhesPedidos">
                <div className="infoPedidoDetalhes">
                    <span>Detalhes do seu pedido</span>
                    <h3> </h3>
                    <p>Lanches</p>
                    <hr />
                </div>
                <div className="tabelaFinalizarPedido">
                    <table>
                        <tbody>
                            {pedidoUsuario && pedidoUsuario.map((produto, index) => (
                                <tr className='rowTable' key={index}>
                                    <td>
                                        {produto.numItensCarrinho}x
                                    </td>
                                    <td>
                                        {produto.produto}
                                    </td>
                                    <td>
                                        R$ {parseFloat(produto.precoCarrinho).toFixed(2)}
                                    </td><td className='close' onClick={() => deleteProductArray(index)}>&times;</td>
                                </tr>
                            ))}
                            {pedidoUsuario.length <= 0 && (
                                <tr>
                                    <td>
                                        Nenhum item aqui, volte ao menu e adicione produtos
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </section>
  )
}

export default FinalizarPedido
