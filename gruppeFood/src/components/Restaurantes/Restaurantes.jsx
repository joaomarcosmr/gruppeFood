import React from 'react'
import './Restaurantes.css'

const Restaurantes = () => {

  return (
    <div className='restaurante'>
      <div className="restauranteImg">
        <img src="../src/img/gokei.jpg" alt="gokei itajai" />
      </div>
      <div className="restauranteInfos">
        <h3>Gokei - itajaí</h3>
        <p>Japonesa</p>
        <span>40-50 min / R$ 5,00</span>
      </div>
    </div>
  )
}

export default Restaurantes
