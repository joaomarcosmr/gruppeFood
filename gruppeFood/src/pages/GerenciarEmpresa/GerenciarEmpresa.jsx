import { useEffect, useState } from 'react'
import './GerenciarEmpresa.css'
import { useCarregaColecoes } from '../../hooks/Cadastros/useCarregaColecoes'
import { useAuthValue } from '../../context/AuthContext'
import { useUpdateDocument } from '../../hooks/Atualizar/useUpdateDocument';
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import ModalEditarProduto from '../../components/ModalEditarProduto/ModalEditarProduto'
import { storage } from '../../Firebase/firebase';
import ModalCertezaExcluir from '../../components/ModalCertezaExcluir/ModalCertezaExcluir';

const GerenciarEmpresa = () => {
    const [ produto, setProduto ] = useState([])

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
    const [ mensagem, setMensagem ] = useState(false)

    const [openModal, setOpenModal] = useState(false)
    const [openModalExcluir, setOpenModalExcluir] = useState(false)
    const [produtoModal, setProdutoModal] = useState()

    const { user } = useAuthValue()
    const { documents: empresas } = useCarregaColecoes('empresa', null, user.uid)
    const { updateDocument, response } = useUpdateDocument('empresa')

    const closeModal = () => {
        setOpenModal(false);
        setOpenModalExcluir(false)
      };

    const handleClick = (index, empresa) => {
        setEmpresaAtiva(index);
        setRestaurante(empresa)
    };

    const handleClickOpcoes = (opcao) => {
        if(empresas.length > 0){
            setOpcao(opcao)
        }
    };

    const handleCadastroProduto = async(e) => {
        e.preventDefault()
        setLoading(true)
        setMensagem(false)

        if(restaurante){
            try {
                const storageRef = ref(storage, `restaurantes/${nomeProduto}-logo/`);
            
                await uploadBytes(storageRef, fotoProduto);
                const urlProduto = await getDownloadURL(storageRef);
    
                const novoProduto = {
                    restaurante: restaurante.nomeRestaurante,
                    nomeProduto: nomeProduto,
                    descricao: descricaoProduto,
                    fotoProduto: urlProduto,
                    precoProduto: precoProduto,
                    createdBy: user.displayName
                };
    
                restaurante.produtos.push(novoProduto)
                
                await updateDocument(restaurante.id, restaurante)
                
                setNomeProduto('');
                setDescricaoProduto('');
                setFotoProduto(null);
                setPrecoProduto(0)
                setLoading(false)
                setMensagem(true)
            } catch (error) {
                    console.error('Erro:', error);
                    throw error;
            }
        }

        setLoading(false)
    }

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
                    <span className='removeIcon' onClick={() => setOpenModalExcluir(true)}>&times;</span>
                    <ModalCertezaExcluir 
                        isOpen={openModalExcluir}
                        closeModal={() => setOpenModal(closeModal)}
                        restaurante={restaurante}
                    />
                </div>
            ))}
            {empresas && empresas.length <= 0 && (
                <p>Não possui empresas</p>
            )}
        </div>
      </div>
      <div className="produtosEmpresaSelecionada"> 
        <div className="titulos">
            <h3 onClick={() => handleClickOpcoes('adicionarProdutos')}>Adicionar Produtos</h3>
            <h3 onClick={() => handleClickOpcoes('editarProdutos')}>Editar Produtos</h3>
        </div>
        <div className="produtosEmpresa">
            <div className={`padrao ${!opcao ? '' : 'disable'}`}>
                <p>Selecione sua empresa, depois alguma opção acima...</p>
            </div>                
            <div className={`adicionarProdutos ${opcao === 'adicionarProdutos' ? '' : 'disable'}`}>
                <div className="editarProdutosFormRegister">
                        <h1>
                            Adicionar Produtos
                        </h1>
                        <span>
                            {restaurante.nomeRestaurante}
                        </span>
                        <form className='formRegisterGerenciarEmpresa' onSubmit={handleCadastroProduto}> 
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
                            {mensagem && (
                                <p className='sucesso'>Produto cadastrado!</p>
                            )}
                            {!loading ? (
                                <button>
                                    Adicionar Produto
                                </button>
                            ) : (
                                <button disabled>
                                    Carregando...
                                </button>  
                            )}
                        </form>
                    </div>
                </div>
            <div className={`editarProdutos ${opcao === 'editarProdutos' ? '' : 'disable'}`}>
                <div className="produtosRestauranteGerenciarEmpresa">
                    {restaurante.produtos && restaurante.produtos.map((produto, index) => (
                    <div key={index} className='produtoEditar'>
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
                    {restaurante && !restaurante.produtos && (
                        <p>Não possui produtos</p>
                    )}
                    <ModalEditarProduto
                        isOpen={openModal}
                        closeModal={() => setOpenModal(closeModal)}
                        produto={produtoModal}
                        restaurante={restaurante}
                    />
                </div>
            </div>
        </div> 
      </div> 
    </section>
  )
}

export default GerenciarEmpresa
