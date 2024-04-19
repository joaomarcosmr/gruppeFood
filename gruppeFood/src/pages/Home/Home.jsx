import React from 'react'
import './Home.css'

const Home = () => {
  return (
    <section className='homeApp'>
        <div className="homeSearch">
            <svg className='icon' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M416 208c0 45.9-14.9 88.3-40 122.7L502.6 457.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L330.7 376c-34.4 25.2-76.8 40-122.7 40C93.1 416 0 322.9 0 208S93.1 0 208 0S416 93.1 416 208zM208 352a144 144 0 1 0 0-288 144 144 0 1 0 0 288z"/></svg>
            <input type="text" />
        </div>
        <div className="homeSessoesComida">
            <div className="cardComida">
                <div className="sessaoComida" id="hamburguer">
                    
                </div>
                <span>Restaurantes</span>
            </div>

            <div className="cardComida">
                <div className="sessaoComida" id="pizza">
                    
                </div>
                <span>Pizza</span>
            </div>

            <div className="cardComida">
                <div className="sessaoComida" id="japones">
                    
                </div>
                <span>Japones</span>
            </div>

            <div className="cardComida">
                <div className="sessaoComida" id="salgadinho">
                    
                </div>
                <span>Salgadinho</span>
            </div>

            <div className="cardComida">
                <div className="sessaoComida" id="chines">
                    
                </div>
                <span>Chines</span>
            </div>
        </div>

        <div className="homeComidasRecomendadas">
            <h3>Comidas Recomendadas</h3>
            <span>O famoso BBB - Bonito, bom e barato!</span>
            <div className="comidasRecomendadas">
                {/* map dos produtos aqui */}
            </div>
        </div>

        <div className="homeRestaurantes">
            <h3>Escolha seu restaurante favorito</h3>
            <div className="restaurantesRecomendados">
                {/* map dos produtos aqui */}
            </div>
        </div>
    </section>
  )
}

export default Home
