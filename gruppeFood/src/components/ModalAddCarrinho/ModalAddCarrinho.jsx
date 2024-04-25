import { useState, useEffect } from 'react'
import './ModalAddCarrinho.css'

const ModalAddCarrinho = ({ isOpen, closeModal, produto, setValorCarrinho, setNumItensCarrinho, setProdutoPedido, setPrecoCarrinho, setRestaurante}) => {
    const [ numeroProdutos, setNumeroProdutos ] = useState(1)

    useEffect(() => {
        const handleOutsideClick = (e) => {
            if (!e.target.closest('.modal-content-carrinho')) {
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

    const handleCarrinho = () => {
        setRestaurante(produto.restaurante)
        setProdutoPedido(produto.nomeProduto)
        setValorCarrinho(parseInt(produto.precoProduto * numeroProdutos))
        setNumItensCarrinho(numeroProdutos)
        setPrecoCarrinho(parseFloat(produto.precoProduto))
        closeModal();
    }

    if (!isOpen || !produto) return null;

    return (
        <div className='ModalAddCarrinho'>
            <div className="modal-content-carrinho">
                <span className='close' onClick={closeModal}> &times;</span>
                <h4>{produto.nomeProduto}</h4>
                <div className="produtoInfoEditar">
                    <div className="produtoImgEditar">
                        <img src={produto.fotoProduto} alt="" />
                    </div>
                    <div className="produtoCarrinhoEditar">
                        <span className='descricaoCarrinho'>{produto.descricao}</span>
                        <hr />
                        <span>Tempo de entrega: 40-50 min</span>
                        <span className='preco'>R$ {produto.precoProduto}</span>
                        <input type="number" defaultValue={1} onChange={(e) => setNumeroProdutos(e.target.value)}/>
                        <button className='btnVerde' onClick={() => handleCarrinho()}>Adicionar ao carrinho</button>
                    </div>
                </div>
            </div>
        </div>
      )
  }

export default ModalAddCarrinho
