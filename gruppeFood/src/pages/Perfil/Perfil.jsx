import React from 'react'
import './Perfil.css'

const Perfil = () => {
  return (
    <section className='homeApp perfil'>
      <div className='perfilUsuario'>
        <img src="" alt="imagem de perfil de João Marcos" />
        <p>João Marcos</p>
      </div>
      <div className='perfilInformacoesUsuario'>
        <div className="detalhes">
            <span>
                Nome:
                <input type="text" value="João Marcos"/>
            </span>
            <span>
                Email:
                <input type="text" value="joaomarcosmr4@gmail.com" />
            </span>
            <span>
                Endereço:
                <input type="text" value="João Johanny de Alcantara, 214 - apto 306" />
            </span>
        </div>
      </div>
      <div className="perfilBotoes">
        <button className='btnVerde'>Histórico de pedidos</button>
        <button className='btn'>Voltar pro Início</button>
      </div>
    </section>
  )
}

export default Perfil
