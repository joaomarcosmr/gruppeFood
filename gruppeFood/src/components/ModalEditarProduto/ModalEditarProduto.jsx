import { useState, useEffect } from 'react'
import './ModalEditarProduto.css'

const ModalEditarProduto = ({ isOpen, closeModal, produto }) => {
    useEffect(() => {
        const handleOutsideClick = (e) => {
            if (!e.target.closest('.modal-content-produto')) {
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

  if(isOpen){
    return (
        <div className='ModalEditarProdutoPedidos'>
            <div className="modal-content-produto">
                <span className='close'> &times;</span>
                <h4>{produto.nomeProduto}</h4>
                <div className="produtoInfoEditar">
                    <div className="produtoImgEditar">
                        <img src={produto.fotoProduto} alt="" />
                    </div>
                    <div className="produtoCadastroEditar">
                        <form>
                            <span>
                                Nome Produto:
                                <input type="text" defaultValue={produto.nomeProduto}/>
                            </span>
                            <span>
                                Foto Produto:
                                <input type="file" />
                            </span>
                            <span>
                                Descricao Produto:
                                <textarea rows="6" defaultValue={produto.descricao}/>
                            </span>
                            <span>
                                Preço Produto:
                                <input type="text" defaultValue={`R$ ${produto.precoProduto}`}/>
                            </span>
                            <button className='btnVerde'>
                                Atualizar Produto
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
      )
  }
}

export default ModalEditarProduto
