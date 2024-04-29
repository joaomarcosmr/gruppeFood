import { useEffect, useState } from 'react';
import './Search.css'
import { useCarregaColecoes } from '../../hooks/Cadastros/useCarregaColecoes';

const Search = () => {
    const queryParams = new URLSearchParams(location.search);
    const pesquisaFeita = queryParams.get('search');
    
    const { documents: resultado } = useCarregaColecoes('empresa', pesquisaFeita)

    return (
        <section className='homeApp searchSection'>
        <p>{pesquisaFeita}</p>
        <p>{resultado}</p>
        </section>
  )
}

export default Search
