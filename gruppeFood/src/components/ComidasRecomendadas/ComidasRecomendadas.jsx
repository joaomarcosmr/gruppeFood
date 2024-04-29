import { useState, useEffect } from 'react'
import { useCarregaColecoes } from '../../hooks/Cadastros/useCarregaColecoes'
import './ComidasRecomendadas.css'

const ComidasRecomendadas = ({ abrirModal, produtoSelecionado, setProdutoSelecionado, setAtivo }) => {
  const [produtos, setProdutos] = useState([])
  const [restauranteSelecionado, setRestauranteSelecionado] = useState([])

  const { documents: restaurantes, loading, error } = useCarregaColecoes('empresa')

  useEffect(() => {
    if (restaurantes) {
      const produtosToAdd = restaurantes.flatMap(empresa => empresa.produtos || []);
      if (produtosToAdd.length > 0) {
        setProdutos(prevProdutos => [...prevProdutos.slice(0, 10 - produtosToAdd.length), ...produtosToAdd]);
      }
    }
  }, [restaurantes]);

  useEffect(() => {
    if(restauranteSelecionado){
      const horas = new Date().getHours()
      if(horas >= restauranteSelecionado.horarioAtendimentoAbertura && horas <= restauranteSelecionado.horarioAtendimentoFechamento){
        setAtivo(true)
      } else {
        setAtivo(false)
      }
    }
  }, [restauranteSelecionado])

  const handleClick = (produto) => {
    abrirModal()
    setProdutoSelecionado(produto);
    
    for(let i = 0; i < restaurantes.length; i++){
      if(restaurantes[i].nomeRestaurante == produto.restaurante){
        setRestauranteSelecionado(restaurantes[i])
      }
    }
  };
  
  return (
    <>
      {produtos && produtos.map((produto, index) => (
        <div key={index}>
          <div className='comidas' onClick={() => handleClick(produto)}>
            <div className="comidasImg">
              <img src={produto.fotoProduto} alt={produto.nomeProduto} />
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
