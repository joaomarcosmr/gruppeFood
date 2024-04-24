import { useState, seEffect, useEffect } from 'react'
import { useCarregaColecoes } from '../../hooks/Cadastros/useCarregaColecoes'
import './ComidasRecomendadas.css'

const ComidasRecomendadas = () => {
  const [produtos, setProdutos] = useState([])

  const { documents: restaurantes, loading, error } = useCarregaColecoes('empresa')

  const handleProduto = () => {
    console.log('clicou')
  }

  useEffect(() => {
    if (restaurantes) {
      const produtosToAdd = restaurantes.flatMap(empresa => empresa.produtos || []);
      if (produtosToAdd.length > 0) {
        setProdutos(prevProdutos => [...prevProdutos, ...produtosToAdd]);
      }
    }
  }, [restaurantes]);
  

  console.log(produtos)
  return (
    <>
      {produtos && produtos.map((produto, index) => (
        <div className='comidas' key={index} onClick={handleProduto}>
          <div className="comidasImg">
            <img src={produto.fotoProduto} alt="gokei itajai" />
          </div>
          <div className="comidasInfos">
            <p>{produto.nomeProduto}</p>
            <span>R$ {produto.precoProduto}</span>
            <p className='tempoEntrega'>50-60 min / R$ 5,00</p>
          </div>
        </div>
      ))}
    </>
  )
  
}

export default ComidasRecomendadas
