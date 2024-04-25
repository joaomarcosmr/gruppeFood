import { useState } from 'react'
import './GerenciarEmpresa.css'
import { useCarregaColecoes } from '../../hooks/Cadastros/useCarregaColecoes'
import { useAuthValue } from '../../context/AuthContext'
import ModalEditarProduto from '../../components/ModalEditarProduto/ModalEditarProduto'

const GerenciarEmpresa = () => {
    const [empresaAtiva, setEmpresaAtiva] = useState(null);
    const [restaurante, setRestaurante] = useState([])
    const [opcao, setOpcao] = useState('')

    const [ nomeProduto, setNomeProduto ] = useState('')
    const [ descricaoProduto, setDescricaoProduto ] = useState('')
    const [ fotoProduto, setFotoProduto ] = useState('')
    const [ precoProduto, setPrecoProduto ] = useState('')

    const [ pergunta, setPergunta ] = useState(false)
    const [ nomeRestaurante, setNomeRestaurante ] = useState('')
    const [ categoria, setCategoria ] = useState('Hamburguer')
    const [ endereco, setEndereco ] = useState('')
    const [ horarioAtendimentoAbertura, setHorarioAtendimentoAbertura ] = useState(0)
    const [ horarioAtendimentoFechamento, setHorarioAtendimentoFechamento ] = useState(0)
    const [ descricao, setDescricao ] = useState('')
    const [ fotoPerfil, setFotoPerfil ] = useState(null)
    const [ fotoBanner, setFotoBanner ] = useState(null)
    const [ loading, setLoading ] = useState(false)

    const [openModal, setOpenModal] = useState(false)
    const [produtoModal, setProdutoModal] = useState()

    const closeModal = () => {
        setOpenModal(false);
      };

    const handleClick = (index, empresa) => {
        setEmpresaAtiva(index);
        setRestaurante(empresa)
    };

    const handleClickOpcoes = (opcao) => {
        setOpcao(opcao)
    };

    const { user } = useAuthValue()
    const { documents: empresas } = useCarregaColecoes('empresa', null, user.uid)

  return (
    <section className='homeApp gerenciarEmpresa'>
      <div className="empresasCadastradas">
        <h3>Gerencie aqui seus negócios</h3>
        <div className="empresaCadastrada">
            {empresas && empresas.map((empresa, index) => (
                <div 
                    className={`empresa ${index === empresaAtiva ? 'active' : ''}`}
                    key={index} 
                    onClick={() => handleClick(index, empresa)}
                >
                    <img src={empresa.fotoPerfil} alt={empresa.nomeRestaurante} />
                    <p>{empresa.nomeRestaurante}</p>
                    <span className='removeIcon'>&times;</span>
                </div>
            ))}
        </div>
      </div>
      <div className="produtosEmpresaSelecionada"> 
        <div className="titulos">
            <h3 onClick={() => handleClickOpcoes('editarNegocios')}>Editar Negócio</h3>
            <h3 onClick={() => handleClickOpcoes('adicionarProdutos')}>Adicionar Produtos</h3>
            <h3 onClick={() => handleClickOpcoes('editarProdutos')}>Editar Produtos</h3>
        </div>
        <div className="produtosEmpresa">
            <div className={`padrao ${!opcao ? '' : 'disable'}`}>
                <p>Selecione sua empresa, depois alguma opção acima...</p>
            </div>
            <div className={`editarNegocios ${opcao === 'editarNegocios' ? '' : 'disable'}`}>
                <div className="edicaoNegocio">
                    <h1>
                        Edite seu Restaurante
                    </h1>
                    <p>
                        Editando: {restaurante.nomeRestaurante}
                    </p>
                    <form className='formRegisterGerenciarEmpresa'>
                        <span>
                            Nome do restaurante:
                            <input type="text" placeholder='Seu nome aqui...' onChange={(e) => setNomeRestaurante(e.target.value)} required/>
                        </span>
                        <span>
                            Categoria:<br/>
                            <select className='select' onChange={(e) => setCategoria(e.target.value)} defaultValue={'Hamburguer'} required>
                                <option value="Hamburguer">Hamburguer</option>
                                <option value="Japonesa">Japones</option>
                                <option value="Salgadinhos">Salgadinhos</option>
                                <option value="Pizza">Pizza</option>
                                <option value="Chines">Chines</option>
                            </select>
                        </span>
                        <span>
                            Endereço:
                            <input type="text" placeholder='Seu e-mail aqui...' required onChange={(e) => setEndereco(e.target.value)} />
                        </span>
                        <span >
                            Horario de abertura:
                            <input type="number" placeholder='Horário que abre' required onChange={(e) => setHorarioAtendimentoAbertura(e.target.value)} />
                        </span>
                        <span >
                            Horario de fechamento:
                            <input type="number" placeholder='Horário que fecha' required onChange={(e) => setHorarioAtendimentoFechamento(e.target.value)} />
                        </span>
                        <span>
                            Coloque uma foto de perfil
                            <input type="file" name="profile" required onChange={(e) => setFotoPerfil(e.target.files[0])}/>
                        </span>
                        <span>
                            Coloque uma foto de banner
                            <input type="file" name="banner" required onChange={(e) => setFotoBanner(e.target.files[0])}/>
                        </span>
                        <span>
                            Descrição do seu restaurante
                            <input type="text" placeholder='Fazemos hamburguer com amor' required onChange={(e) => setDescricao(e.target.value)}/>
                        </span>
                        <button>
                            Salvar Edicoes
                        </button>
                        {loading && (
                            <p className='text-center'>Carregando...</p>
                        )}
                    </form>
                </div>
            </div>
            <div className={`adicionarProdutos ${opcao === 'adicionarProdutos' ? '' : 'disable'}`}>
                <div className="editarProdutosFormRegister">
                        <h1>
                            Adicionar Produtos
                        </h1>
                        <span>
                            {restaurante.nomeRestaurante}
                        </span>
                        <form className='formRegisterGerenciarEmpresa'> 
                            <span>
                                Nome do produto:
                                <input type="text" placeholder='Nome do seu produto...' onChange={(e) => setNomeProduto(e.target.value)} required/>
                            </span>
                            <span>
                                Descrição:
                                <textarea cols="10" rows="5" onChange={(e) => setDescricaoProduto(e.target.value)}/>
                            </span>
                            <span>
                                Coloque uma foto do seu produto:
                                <input type="file" onChange={(e) => setFotoProduto(e.target.files[0])}/>
                            </span>
                            <span>
                                Preço do seu produto:
                                <input type="number" placeholder='5,00' value={precoProduto} onChange={(e) => setPrecoProduto(e.target.value)} />
                            </span>
                            <button>
                                Adicionar Produto
                            </button>
                        </form>
                        {/* {loading && (
                                <p className='text-center'>Cadastrando...</p>
                        )}
                        {pergunta && (
                            <>
                                <p className='text-center'>Cadastrado, você pode cadastrar mais ou finalizar!</p>
                            </>
                        )} */}
                    </div>
                </div>
            <div className={`editarProdutos ${opcao === 'editarProdutos' ? '' : 'disable'}`}>
                <div className="produtosRestauranteGerenciarEmpresa">
                    {restaurante.produtos && restaurante.produtos.map((produto, index) => (
                    <div key={index} >
                        <div 
                            className="produtoCadastradoGerenciarEmpresa" 
                            onClick={() => {
                                setOpenModal(true)
                                setProdutoModal(produto)
                            }}
                        >
                            <div className="produtoCadastradoInfoGerenciarEmpresa">
                                <h3>{produto.nomeProduto}</h3>
                            </div>
                            <div className="produtoCadastradoImgGerenciarEmpresa">
                                <img src={produto.fotoProduto} alt="foto Nome Produto" />
                            </div>
                        </div>
                    </div>
                    ))}
                    <ModalEditarProduto
                        isOpen={openModal}
                        closeModal={() => setOpenModal(closeModal)}
                        produto={produtoModal}
                    />
                </div>
            </div>
        </div> 
      </div> 
    </section>
  )
}

export default GerenciarEmpresa
