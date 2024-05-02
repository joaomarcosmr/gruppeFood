import { useEffect, useState } from 'react';
import './Search.css'
import { useCarregaColecoes } from '../../hooks/Cadastros/useCarregaColecoes';
import { Navigate, useNavigate } from 'react-router-dom';

const Search = () => {
    const queryParams = new URLSearchParams(location.search);
    const pesquisaFeita = queryParams.get('search');
    const tipoPesquisa = queryParams.get('pesquisa');
    const [empresas, setEmpresas] = useState([])
    const navigate = useNavigate()

    const { documents: resultado } = useCarregaColecoes('empresa')

    console.log(resultado)

    useEffect(() => { 
      if(resultado && tipoPesquisa == 'categoria'){
        for(let i = 0; i < resultado.length; i++){
          if(resultado[i].categoria == pesquisaFeita){
            setEmpresas(antigoarray => [...antigoarray, resultado[i]])
          }
        }
      } else if (resultado && tipoPesquisa == 'nomeRestaurante'){
        for(let i = 0; i < resultado.length; i++){
          const aux = resultado[i].nomeRestaurante.split(' ')
          if(aux.includes(pesquisaFeita)){
            setEmpresas(antigoarray => [...antigoarray, resultado[i]])
          }
        }
      }

    }, [resultado])

    const handleEmpresa = (empresa) => {
      navigate(`/restaurante/${empresa.id}`)
    }

    return (
        <section className='homeApp searchSection'>
          <div className="searchResults">
            <h3>Resultados para sua pesquisa {pesquisaFeita}</h3>
            <div className="restaurantesResultados">
              {empresas && empresas.map((empresa, index) => (
                <div key={index} className='empresaPesquisa' onClick={() => handleEmpresa(empresa)}>
                  <div className="empresaPesquisaImg">
                    <img src={empresa.fotoPerfil} alt={empresa.nomeRestaurante} />
                  </div>
                  <div className="empresaPesquisaInfo">
                    <h3>{empresa.nomeRestaurante}</h3>
                    <p>{empresa.categoria}</p>
                    <span>40-50 min / R$ 5,00</span>
                  </div>
                </div>
              ))}
              {empresas && empresas.length <= 0 && (
                <p>Não foi possível encontrar algo com sua pesquisa "{pesquisaFeita}"</p>
              )}
            </div>
            {empresas && empresas.length > 0 && <p>Fim dos resultados.</p>}
          </div>
        </section>
  )
}

export default Search
