import React from 'react'
import { useParams } from 'react-router-dom'
import { useCarregaDocumentos } from '../../hooks/Cadastros/useCarregaDocumentos'
import './RestaurantePage.css'

const RestaurantePage = () => {
    const { id } = useParams()
    const { document: empresa, loading, error } = useCarregaDocumentos('empresa', id)
    
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
                <span className='verde'>
                    Horário de funcionamento: {empresa.horarioAtendimento}
                </span>
                <span><svg className='icone' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512"><path d="M215.7 499.2C267 435 384 279.4 384 192C384 86 298 0 192 0S0 86 0 192c0 87.4 117 243 168.3 307.2c12.3 15.3 35.1 15.3 47.4 0zM192 128a64 64 0 1 1 0 128 64 64 0 1 1 0-128z"/></svg>Itajaí - SC</span>
            </div>
        </div>
        <div className="produtosRestaurante">
            <h3>Produtos</h3>
            <div className="sessaoProdutos">
                <div className="produtoCadastrado">
                    <div className="produtoCadastradoInfo">
                        <h3>Nome Produto</h3>
                        <span>Lorem ipsum dolor sit amet consectetur adipisicing elit. Provident repellendus voluptatem tenetur dolore culpa reiciendis consequuntur.</span>
                        <span>R$ 19,90</span>
                    </div>
                    <div className="produtoCadastradoImg">
                        <img src="" alt="foto Nome Produto" />
                    </div>
                </div>
                <div className="produtoCadastrado">
                    <div className="produtoCadastradoInfo">
                        <h3>Nome Produto</h3>
                        <span>Lorem ipsum dolor sit amet consectetur adipisicing elit. Provident repellendus voluptatem tenetur dolore culpa reiciendis consequuntur.</span>
                        <span>R$ 19,90</span>
                    </div>
                    <div className="produtoCadastradoImg">
                        <img src="" alt="foto Nome Produto" />
                    </div>
                </div>
                <div className="produtoCadastrado">
                    <div className="produtoCadastradoInfo">
                        <h3>Nome Produto</h3>
                        <span>Lorem ipsum dolor sit amet consectetur adipisicing elit. Provident repellendus voluptatem tenetur dolore culpa reiciendis consequuntur.</span>
                        <span>R$ 19,90</span>
                    </div>
                    <div className="produtoCadastradoImg">
                        <img src="" alt="foto Nome Produto" />
                    </div>
                </div>
            </div>
        </div>
      </div>
    </section>
  )
}

export default RestaurantePage
