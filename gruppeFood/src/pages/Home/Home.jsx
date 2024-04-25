import React from 'react'
import { useState } from 'react'
import './Home.css'

import Restaurantes from '../../components/Restaurantes/Restaurantes'
import ComidasRecomendadas from '../../components/ComidasRecomendadas/ComidasRecomendadas'
import ModalAddCarrinho from '../../components/ModalAddCarrinho/ModalAddCarrinho'

const Home = ({setValorCarrinho, setNumItensCarrinho, setProdutoPedido, setPrecoCarrinho, setRestaurante}) => {
    const [openModal, setOpenModal] = useState(false);
    const [produtoSelecionado, setProdutoSelecionado] = useState(null);

    const abrirModal = () => {
        setOpenModal(true);
    };

    const fecharModal = () => {
        setOpenModal(false);
    };
  
  return (
    <section className='homeApp homeSection'>
        <div className="homeSearch">
            <svg className='icon' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M416 208c0 45.9-14.9 88.3-40 122.7L502.6 457.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L330.7 376c-34.4 25.2-76.8 40-122.7 40C93.1 416 0 322.9 0 208S93.1 0 208 0S416 93.1 416 208zM208 352a144 144 0 1 0 0-288 144 144 0 1 0 0 288z"/></svg>
            <input type="text" />
        </div>
        <div className="homeSessoesComida">
            <div className="cardComida">
                <div className="sessaoComida" id="hamburguer">
                    <img src="../../src/img/hamburguer.png" alt="" />
                </div>
                <span>Lanches</span>
            </div>

            <div className="cardComida">
                <div className="sessaoComida" id="pizza">
                    <img src="../../src/img/pizza.png" alt="" />
                </div>
                <span>Pizza</span>
            </div>

            <div className="cardComida">
                <div className="sessaoComida" id="japones">
                    <img src="../../src/img/sushi.png" alt="" />
                </div>
                <span>Japones</span>
            </div>

            <div className="cardComida">
                <div className="sessaoComida" id="salgadinho">
                    <img src="../../src/img/coxinha.png" alt="" />
                </div>
                <span>Salgadinho</span>
            </div>

            <div className="cardComida">
                <div className="sessaoComida" id="chines">
                    <img src="../../src/img/chines.png" alt="" />
                </div>
                <span>Chines</span>
            </div>
        </div>

        <div className="homeComidasRecomendadas">
            <div className="homeComidasInfo">
                <h3>Comidas Recomendadas</h3>
                <span>O famoso BBB - Bonito, bom e barato!</span>
            </div>
            <div className="homeComidasConteudo">
                <ComidasRecomendadas 
                    abrirModal={abrirModal} 
                    setProdutoSelecionado={setProdutoSelecionado}
                />
            </div>
        </div>

        {openModal && produtoSelecionado && (
                <ModalAddCarrinho
                    isOpen={openModal}
                    closeModal={fecharModal}
                    produto={produtoSelecionado}
                    setValorCarrinho={setValorCarrinho}
                    setNumItensCarrinho={setNumItensCarrinho}
                    setProdutoPedido={setProdutoPedido}
                    setPrecoCarrinho={setPrecoCarrinho}
                    setRestaurante={setRestaurante}
                />
            )
        }
        <div className="homeRestaurantes">
            <h3>Escolha seu restaurante favorito</h3>
            <div className="homeRestaurantesConteudo">
                <Restaurantes/>
            </div>
        </div>
    </section>
  )
}

export default Home
