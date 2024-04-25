import { useState, useEffect } from 'react'
import { useCarregaColecoes } from '../../hooks/Cadastros/useCarregaColecoes'
import './ComidasRecomendadas.css'

const ComidasRecomendadas = ({ abrirModal, setProdutoSelecionado }) => {
  const [produtos, setProdutos] = useState([])

  const { documents: restaurantes, loading, error } = useCarregaColecoes('empresa')

  useEffect(() => {
    if (restaurantes) {
      const produtosToAdd = restaurantes.flatMap(empresa => empresa.produtos || []);
      if (produtosToAdd.length > 0) {
        setProdutos(prevProdutos => [...prevProdutos, ...produtosToAdd]);
      }
    }
  }, [restaurantes]);

  const handleClick = (produto) => {
    abrirModal()
    setProdutoSelecionado(produto);
  };
  
  return (
    <>
      {produtos && produtos.map((produto, index) => (
        <div key={index}>
          <div className='comidas' onClick={() => handleClick(produto)}>
            <div className="comidasImg">
              <img src={produto.fotoProduto} alt="gokei itajai" />
            </div>
            <div className="comidasInfos">
              <p>{produto.nomeProduto}</p>
              <span>R$ {produto.precoProduto}</span>
              <p className='tempoEntrega'>50-60 min / R$ 5,00</p>
            </div>
          </div>
        </div>
      ))}       
    </>
  )
  
}

export default ComidasRecomendadas
