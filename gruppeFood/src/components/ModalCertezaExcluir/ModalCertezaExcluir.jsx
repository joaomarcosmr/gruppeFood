import { useEffect, useState } from 'react'
import { useCarregaColecoes } from '../../hooks/Cadastros/useCarregaColecoes'
import { useCarregaDocumentos } from '../../hooks/Cadastros/useCarregaDocumentos'
import './ModalCertezaExcluir.css'
import { useDeleteProduct } from '../../hooks/Excluir/useDelete'

const ModalCertezaExcluir = ({ isOpen, closeModal, restaurante }) => {
    const { deleteDocument, response } = useDeleteProduct('empresa')
    const [loading, setLoading] = useState(false)
    const [mensagem, setMensagem] = useState('')


    useEffect(() => {
        const handleOutsideClick = (e) => {
            if (!e.target.closest('.modal-content-historico')) {
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

    const handleExcluirRestaurante = async() => {
        setMensagem('')
        setLoading(true)

        try {

            await deleteDocument(restaurante.id)
            setLoading(false)
            setMensagem('Restaurante excluido com sucesso!')

            closeModal()
        } catch (error) {
            console.error(error)
            setLoading(false)
            setMensagem(error)
        }
    }

    if (!isOpen) return null;
  return (
    <div className='modalCertezaExcluir'>
    <div className="modal-content-historico">
        <span className='close' onClick={closeModal}> &times;</span>
        <h4>Tem certeza que deseja apagar o restaurante {restaurante.nomeRestaurante}?</h4>
        <div className="opcoes">
            <button className='btnVerde' onClick={handleExcluirRestaurante}>Sim, quero apagar</button>
            <button className='btnVermelho' onClick={closeModal}>Não, cancelar</button>
        </div>
        {mensagem.length > 0 && (
            <p className='text-center'>{mensagem}</p>
        )}
        {loading && (
            <p className='text-center'>Carregando...</p>
        )}
    </div>
</div>
  )
}

export default ModalCertezaExcluir
