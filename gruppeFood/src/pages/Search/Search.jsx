import { useEffect, useState } from 'react';
import './Search.css'
import { useCarregaColecoes } from '../../hooks/Cadastros/useCarregaColecoes';

const Search = () => {
    const queryParams = new URLSearchParams(location.search);
    const pesquisaFeita = queryParams.get('search');
    const [empresas, setEmpresas] = useState([])
    
    const { documents: resultado } = useCarregaColecoes('empresa')

    useEffect(() => { 
      if(resultado){
        for(let i = 0; i < resultado.length; i++){
          if(resultado[i].nomeRestaurante === pesquisaFeita){
            console.log('oi')
          }
        }
      }
    }, [resultado])

    return (
        <section className='homeApp searchSection'>
          <div className="searchResults">
            <h3>Resultados para sua pesquisa {pesquisaFeita}</h3>
            <div className="restaurantesResultados">
              {empresas && empresas.map((empresa, index) => (
                <>
                  <p key={index}>{empresa.nomeRestaurante}</p>
                </>
              ))}
            </div>
          </div>
        </section>
  )
}

export default Search
