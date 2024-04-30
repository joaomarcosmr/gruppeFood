import React, { useEffect } from 'react'
import { useState } from 'react'
import { Navigate, useNavigate } from 'react-router-dom'
import { Link } from 'react-router-dom'
import './Home.css'

import Restaurantes from '../../components/Restaurantes/Restaurantes'
import ComidasRecomendadas from '../../components/ComidasRecomendadas/ComidasRecomendadas'
import ModalAddCarrinho from '../../components/ModalAddCarrinho/ModalAddCarrinho'

const Home = ({setValorCarrinho, setNumItensCarrinho, setProdutoPedido, setPrecoCarrinho, setRestaurante}) => {
    const [openModal, setOpenModal] = useState(false);
    const [produtoSelecionado, setProdutoSelecionado] = useState(null);
    const [resultadoPesquisa, setResultadoPesquisa] = useState([])
    const [pesquisa, setPesquisa] = useState('')
    const [ativo, setAtivo] = useState(false)
    const queryParams = new URLSearchParams();
    const navigate = useNavigate()

    const abrirModal = () => {
        setOpenModal(true);
    };

    const fecharModal = () => {
        setOpenModal(false);
    };

    const handleFilter = async(e) => {
        e.preventDefault()

        navigate(`/search?${queryParams.toString()}&search=${pesquisa}`)
    }
    
    const slides = [
        { search: 'Lanches', imgSrc: '../../src/img/hamburguer.png', label: 'Lanches' },
        { search: 'Pizza', imgSrc: '../../src/img/pizza.png', label: 'Pizza' },
        { search: 'Japones', imgSrc: '../../src/img/sushi.png', label: 'Japones' },
        { search: 'Salgadinho', imgSrc: '../../src/img/coxinha.png', label: 'Salgadinho' },
        { search: 'Chines', imgSrc: '../../src/img/chines.png', label: 'Chines' }
    ];
  
  return (
    <section className='homeApp homeSection'>
        <div className="homeSearch">
            <form onSubmit={handleFilter}>
                <input type="text" placeholder='Pesquise por restaurantes' onChange={(e) => setPesquisa(e.target.value)}/>
                <button>
                    <svg className='icon' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M416 208c0 45.9-14.9 88.3-40 122.7L502.6 457.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L330.7 376c-34.4 25.2-76.8 40-122.7 40C93.1 416 0 322.9 0 208S93.1 0 208 0S416 93.1 416 208zM208 352a144 144 0 1 0 0-288 144 144 0 1 0 0 288z"/></svg>
                </button>
            </form>
        </div>
        <div className="slider-container">
            <div className="slider" >
                {slides.map((slide, index) => (
                    <div key={index}>
                        <Link to={`/search?search=${slide.search}`} className="sessaoCard">
                            <div className="cardComida">
                                <div className="sessaoComida">
                                    <img src={slide.imgSrc} alt={slide.label} />
                                </div>
                                <span>{slide.label}</span>
                            </div>
                        </Link>
                    </div>
                ))}
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
                    protudoSelecionado={produtoSelecionado}
                    setProdutoSelecionado={setProdutoSelecionado}
                    setAtivo={setAtivo}
                />
            </div>
        </div>
        <div className="homeRestaurantes">
            <h3>Escolha seu restaurante favorito</h3>
            <div className="homeRestaurantesConteudo">
                <Restaurantes
                    setAtivo={setAtivo}
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
                    ativo={ativo}
                    setAtivo={setAtivo}
                />
            )
        }
    </section>
  )
}

export default Home
