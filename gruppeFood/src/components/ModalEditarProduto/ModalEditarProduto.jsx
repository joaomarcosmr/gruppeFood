import { useState, useEffect } from 'react'
import { useUpdateDocument } from '../../hooks/Atualizar/useUpdateDocument'
import { useAuthValue } from '../../context/AuthContext'
import { storage } from '../../Firebase/firebase'
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import './ModalEditarProduto.css'

const ModalEditarProduto = ({ isOpen, closeModal, produto, restaurante }) => {
    const { updateDocument, response } = useUpdateDocument('empresa')
    const { user } = useAuthValue()
    
    const [produtoSelecionado, setProdutoSelecionado] = useState([])
    const [restauranteSelecionado, setRestauranteSelecionado] = useState(restaurante)

    const [loading, setLoading] = useState(false)

    const [nomeProduto, setNomeProduto] = useState('')
    const [fotoProduto, setFotoProduto] = useState(null)
    const [descricaoProduto, setDescricaoProduto] = useState('')
    const [precoProduto, setPrecoProduto] = useState(0)

    const handleUpdate = async(e) => {
        e.preventDefault()
        setLoading(true)
        const storageRef = ref(storage, `restaurantes/${nomeProduto}-logo/`);
        
        await uploadBytes(storageRef, fotoProduto);
        const urlProduto = await getDownloadURL(storageRef);


        const produtoAtualizado = {
            restaurante: restaurante.nomeRestaurante,
            nomeProduto: nomeProduto,
            descricao: descricaoProduto,
            fotoProduto: urlProduto,
            precoProduto: precoProduto,
            createdBy: user.displayName
        };

        // PAREI AQUI NA LOGICA DE ATUALIZAR TODO O PRODUTO

        setLoading(false)
    }


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
                <span className='close' onClick={closeModal}> &times;</span>
                <h4>{produto.nomeProduto}</h4>
                <div className="produtoInfoEditar">
                    <div className="produtoImgEditar">
                        <img src={produto.fotoProduto} alt="" />
                    </div>
                    <div className="produtoCadastroEditar">
                        <form onSubmit={handleUpdate}>
                            <span>
                                Nome Produto:
                                <input type="text" defaultValue={produto.nomeProduto} onChange={(e) => setNomeProduto(e.target.value)}/>
                            </span>
                            <span>
                                Foto Produto:
                                <input type="file" onChange={(e) => setFotoProduto(e.target.files[0])} />
                            </span>
                            <span>
                                Descricao Produto:
                                <textarea rows="6" defaultValue={produto.descricao} onChange={(e) => setDescricaoProduto(e.target.value)}/>
                            </span>
                            <span>
                                Preço Produto:
                                <input type="number" defaultValue={`R$ ${parseFloat(produto.precoProduto)}`} onChange={(e) => setPrecoProduto(e.target.value)}/>
                            </span>
                            {!loading ? (
                                <button className='btnVerde'>
                                    Atualizar Produto
                                </button>
                            ) : (
                                <button className='btnVerde' disabled>
                                    Carregando...
                                </button>  
                            )}
                        </form>
                            <button className='btnVermelho botao'>
                                Excluir Produto
                            </button>
                    </div>
                </div>
            </div>
        </div>
      )
  }
}

export default ModalEditarProduto
