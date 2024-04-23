import React from 'react'
import { Link } from 'react-router-dom'
import './Restaurantes.css'
import { useCarregaColecoes } from '../../hooks/Cadastros/useCarregaColecoes'

const Restaurantes = () => {
  const { documents: empresas } = useCarregaColecoes('empresa')

  return (
    <>  
      {empresas && empresas.map((empresa, index) => (
        <Link to={`/restaurante/${empresa.id}`} className='linkEmpresas' key={index}>
          <div className='restaurante'>
            <div className="restauranteImg">
              <img src={empresa.fotoPerfil} alt={empresa.nomeRestaurante} />
            </div>
            <div className="restauranteInfos">
              <h3>{empresa.nomeRestaurante}</h3>
              <p>{empresa.categoria}</p>
              <span>40-50 min / R$ 5,00</span>
            </div>
          </div>
        </Link>
      ))}
    </>
  )
}

export default Restaurantes
