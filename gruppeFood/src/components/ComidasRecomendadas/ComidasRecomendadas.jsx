import React from 'react'
import './ComidasRecomendadas.css'

const ComidasRecomendadas = () => {

  return (
    <div className='comidas'>
      <div className="comidasImg">
        <img src="../src/img/produto.jpg" alt="gokei itajai" />
      </div>
      <div className="comidasInfos">
        <p>Açai 500g</p>
        <span>R$ 29,99</span>
        <p className='tempoEntrega'>50-60 min / R$ 5,00</p>
      </div>
    </div>
  )
  
}

export default ComidasRecomendadas
