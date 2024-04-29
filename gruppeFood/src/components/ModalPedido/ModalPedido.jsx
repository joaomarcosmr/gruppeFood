import React, { useState, useEffect } from 'react';
import { useAuthValue } from '../../context/AuthContext';
import './ModalPedido.css';
import { useNavigate } from 'react-router-dom';
import { useCarregaDocumentos } from '../../hooks/Cadastros/useCarregaDocumentos';

const ModalPedido = ({ isOpen, closeModal, pedidoUsuario, setPedidoUsuario }) => {
  const [valorTotalCarrinho, setValorTotalCarrinho] = useState(0)
  const [restauranteCarrinho, setRestauranteCarrinho] = useState('')
  const [pedidoUsuarioLocal, setPedidoUsuarioLocal] = useState(pedidoUsuario);


  const { user } = useAuthValue()
  const navigate = useNavigate()
  const { document: usuario, loading, error } = useCarregaDocumentos('users', user ? user.uid : null);

  useEffect(() => {
    let preco = 0
    for(let i = 0; i < pedidoUsuario.length; i++){
      preco += pedidoUsuario[i].precoCarrinho * pedidoUsuario[i].numItensCarrinho
    }
    setValorTotalCarrinho(preco)
  }, [pedidoUsuario])

  useEffect(() => {
      const handleOutsideClick = (e) => {
          if (!e.target.closest('.modal-content-pedido')) {
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

  const handleCheckout = () => {
    setRestauranteCarrinho(pedidoUsuario[0].restaurante)
    const queryParams = new URLSearchParams();

    !user ? navigate('/login') : navigate(`/checkout?${queryParams.toString()}&enderecoUser=${usuario.userAddress}`);
    closeModal()
  }

  const deleteProductArray = (index) => {
    const updatedPedido = [...pedidoUsuario];
    updatedPedido.splice(index, 1);
    setPedidoUsuario(updatedPedido);
  };

    return (
      <>
      {isOpen && (
        <>
        {!pedidoUsuario.length > 0 ? (
          <div className='modalPedido-null'>
            <div className="modal-content-null">
              <span className='close' onClick={closeModal}> &times;</span>
              <div className="detalhesPedido-null">
                <h3>Você tem que adicionar algum produto antes!</h3>
              </div>
            </div>
          </div>
        ) : (
          <div className='modalPedido'>
            <div className="modal-content-pedido">
              <span className='close' onClick={closeModal}> &times;</span>
              <div className="detalhesPedido">
                <span>Seu pedido feito em</span>
                <h3>{pedidoUsuario.nomeRestaurante}</h3>
                <p>Lanches</p>
                <hr />
              </div>
              <div className="produtosPedido">
                <div className="tabelaProdutos">
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
                          </td>
                          <td className='close' onClick={() => deleteProductArray(index)}>&times;</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <div className="infoTotalPedido">
                  <div className="totalInfo">
                    <span>Frete</span>
                    <span>R$ 5.00</span>
                    <span className='colorVerde'>Total</span>
                    <span className='colorVerde'>R$ {parseFloat(valorTotalCarrinho + 5).toFixed(2)}</span>
                  </div>
                  <button className='btnVerde' onClick={() => handleCheckout()}>Fazer Pedido</button>
                </div>
              </div>
            </div>
          </div>
        )}
      </>
      )}
    </>
    );
};

export default ModalPedido;
