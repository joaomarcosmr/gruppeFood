import React from 'react';
import './ModalPedido.css';

const ModalPedido = ({ isOpen, closeModal }) => {

    return (
      <>
      {isOpen && (
        <div className='modalPedido'>
          <div className="modal-content-pedido">
            <span className='close' onClick={closeModal}> &times;</span>
            <div className="detalhesPedido">
              <span>Seu pedido feito em</span>
              <h3>Gokei - Itajaí</h3>
              <p>Lanches</p>
              <hr />
            </div>
            <div className="produtosPedido">
              <div className="tabelaProdutos">
                <table>
                  <tbody>
                    <tr className='rowTable'>
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
              <div className="infoTotalPedido">
                <div className="totalInfo">
                  <span>Total</span>
                  <span>R$ 99,90</span>
                </div>
                <button className='btnVerde'>Fazer Pedido</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
    );
};

export default ModalPedido;
