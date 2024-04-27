import { useState, useEffect } from 'react'
import { useUpdateDocument } from '../../hooks/Atualizar/useUpdateDocument'
import { useAuthValue } from '../../context/AuthContext'
import { storage } from '../../Firebase/firebase'
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import './ModalEditarProduto.css'

const ModalEditarProduto = ({ isOpen, closeModal, produto, restaurante }) => {
    const { updateDocument, response } = useUpdateDocument('empresa')
    const { user } = useAuthValue()

    const [loading, setLoading] = useState(true)

    const [nomeProduto, setNomeProduto] = useState('')
    const [fotoProduto, setFotoProduto] = useState(null)
    const [descricaoProduto, setDescricaoProduto] = useState('')
    const [precoProduto, setPrecoProduto] = useState('')

    const [ mensagem, setMensagem ] = useState('')

    useEffect(() => {
        if (produto) {
            setNomeProduto(produto.nomeProduto);
            setDescricaoProduto(produto.descricao)
            setFotoProduto(produto.fotoProduto)
            setPrecoProduto(produto.precoProduto)
            setLoading(false)
        }
    }, [produto]); 

    const handleUpdate = async(e) => {
        e.preventDefault()
        setLoading(true)
        setMensagem('')

        try {
            console.log(produto.fotoProduto)
            if(fotoProduto != produto.fotoProduto){
                const storageRef = ref(storage, `restaurantes/${nomeProduto}-logo/`);
                
                await uploadBytes(storageRef, fotoProduto);
                const urlProduto = await getDownloadURL(storageRef);
                
                setFotoProduto(urlProduto)
            }
            console.log(produto.fotoProduto)

            // problema na atualização da foto
    
            const produtoAtualizado = {
                restaurante: restaurante.nomeRestaurante,
                nomeProduto: nomeProduto,
                descricao: descricaoProduto,
                fotoProduto: fotoProduto,
                precoProduto: precoProduto,
                createdBy: user.displayName
            };
    
            for(let i = 0; i < restaurante.produtos.length; i++){
                console.log(restaurante.produtos[i])
                if (restaurante.produtos[i].nomeProduto == produto.nomeProduto){
                    restaurante.produtos[i] = produtoAtualizado
                    break;
                }
            }

            await updateDocument(restaurante.id, restaurante)
            console.log(response)

            setMensagem('Produto atualizado!')
            setLoading(false)
        } catch (error) {
            console.error(error)
        }


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
                                <input type="text" defaultValue={nomeProduto} required onChange={(e) => setNomeProduto(e.target.value)}/>
                            </span>
                            <span>
                                Foto Produto:
                                <input type="file" onChange={(e) => setFotoProduto(e.target.files[0])} />
                            </span>
                            <span>
                                Descricao Produto:
                                <textarea rows="6" defaultValue={descricaoProduto} required onChange={(e) => setDescricaoProduto(e.target.value)}/>
                            </span>
                            <span>
                                Preço Produto:
                                <input type="number" defaultValue={`${parseInt(produto.precoProduto)}`} required onChange={(e) => setPrecoProduto(e.target.value)}/>
                            </span>
                            {mensagem &&(
                                <p className='sucessoAtualizado'>{mensagem}</p>
                            )}
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
