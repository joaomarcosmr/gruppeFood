import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useCarregaDocumentos } from '../../hooks/Cadastros/useCarregaDocumentos'
import './RestaurantePage.css'
import ModalAddCarrinho from '../../components/ModalAddCarrinho/ModalAddCarrinho'

const RestaurantePage = ({setValorCarrinho, setNumItensCarrinho, setProdutoPedido, setPrecoCarrinho, setRestaurante}) => {
    const { id } = useParams()
    const { document: empresa, loading, error } = useCarregaDocumentos('empresa', id)

    const [openModal, setOpenModal] = useState(false);
    const [produtoSelecionado, setProdutoSelecionado] = useState(null);
    const [ativo, setAtivo] = useState(false)

    useEffect(() => {
      if(empresa){
        const horas = new Date().getHours()
        if(horas >= empresa.horarioAtendimentoAbertura && horas <= empresa.horarioAtendimentoFechamento){
          setAtivo(true)
        } else {
          setAtivo(false)
        }
      }
    }, [empresa])

    const abrirModal = () => {
        setOpenModal(true);
    };

    const fecharModal = () => {
        setOpenModal(false);
    };
    
    if(loading){
        return (
          <>
            <div className="carregando">
              <img src="../src/img/logo.svg" alt="logo gruppe food carregando" />
            </div>
          </>
        )
    }
    
    if (!empresa) {
        return <div>Documento não encontrado.</div>;
    }

    const handleClick = (produto) => {
      abrirModal()
      setProdutoSelecionado(produto)
    }


  return (
    <section className='homeApp restaurantePage'>
      <div className="informacoesRestaurante">
        <div className="banner">
            <img src={empresa.fotoBanner} alt={empresa.nomeRestaurante} />
        </div>
        <div className="infoRestaurante">
            <div className="logoRestaurante">
                <img src={empresa.fotoPerfil} alt={empresa.nomeRestaurante} />
            </div>
            <div className='info'>
                <h2>{empresa.nomeRestaurante}</h2>
                <span style={{color: ativo ? 'green' : 'red'}}>
                    Horário de funcionamento: {empresa.horarioAtendimentoAbertura}h - {empresa.horarioAtendimentoFechamento}h - {ativo ? (
                      <span>Ativo Agora</span>
                    ) : (
                      <span>Fechado Agora</span>
                    )}
                </span>
                <span><svg className='icone' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512"><path d="M215.7 499.2C267 435 384 279.4 384 192C384 86 298 0 192 0S0 86 0 192c0 87.4 117 243 168.3 307.2c12.3 15.3 35.1 15.3 47.4 0zM192 128a64 64 0 1 1 0 128 64 64 0 1 1 0-128z"/></svg>Itajaí - SC</span>
            </div>
        </div>
        <div className="produtosRestaurante">
          <div className="textHeader">
            <h3>Produtos</h3>
          </div>
            <div className="sessaoProdutos">
            {empresa.produtos && empresa.produtos.map((produto, index) => (
                <div className="produtoCadastrado" key={index} onClick={() => handleClick(produto)}>
                    <div className="produtoCadastradoInfo">
                        <h3>{produto.nomeProduto}</h3>
                        <span>{produto.descricao}</span>
                        <span className='precoProdutoInfo'>R$ {produto.precoProduto}</span>
                    </div>
                    <div className="produtoCadastradoImg">
                        <img src={produto.fotoProduto} alt="foto Nome Produto" />
                    </div>
                </div>
            ))}
            </div>
            <ModalAddCarrinho
                isOpen={openModal}
                closeModal={fecharModal}
                produto={produtoSelecionado}
                setValorCarrinho={setValorCarrinho}
                setNumItensCarrinho={setNumItensCarrinho}
                setProdutoPedido={setProdutoPedido}
                setPrecoCarrinho={setPrecoCarrinho}
                setRestaurante={setRestaurante}
                ativo={ativo}
            />
        </div>
      </div>
    </section>
  )
}

export default RestaurantePage
