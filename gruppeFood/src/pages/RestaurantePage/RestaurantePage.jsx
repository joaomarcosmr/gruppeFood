import React from 'react'
import './RestaurantePage.css'

const RestaurantePage = () => {
  return (
    <section className='homeApp restaurantePage'>
      <div className="informacoesRestaurante">
        <div className="banner">
            <img src="" alt="" />
        </div>
        <div className="infoRestaurante">
            <div className="logoRestaurante">
                <img src="" alt="" />
            </div>
            <div className='info'>
                <h2>Gokei - Itajai</h2>
                <span className='verde'>Horário de funcionamento: 18:00 - 22:00</span>
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
