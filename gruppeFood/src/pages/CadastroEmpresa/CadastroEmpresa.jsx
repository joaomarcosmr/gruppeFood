import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Link, useSearchParams } from 'react-router-dom'
import { useAuthValue } from '../../context/AuthContext'
import { useCreateProduct } from '../../hooks/Cadastros/useDocumentos'
import { storage } from '../../Firebase/firebase'
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import './CadastroEmpresa.css'

const CadastroEmpresa = () => {
    const [ produto, setProduto ] = useState([])

    const [ nomeProduto, setNomeProduto ] = useState('')
    const [ descricaoProduto, setDescricaoProduto ] = useState('')
    const [ fotoProduto, setFotoProduto ] = useState('')
    const [ precoProduto, setPrecoProduto ] = useState('')

    const [ restaurante, setRestaurante ] = useState(false)
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

    const { user } = useAuthValue()
    const { insertDocument: insertRestaurante, response: responseEmpresa } = useCreateProduct('empresa')
    const navigate = useNavigate()

    const enviarDados = async(e) => {
        e.preventDefault()

        await insertRestaurante({
            nomeRestaurante: nomeRestaurante,
            categoria: categoria,
            endereco: endereco,
            horarioAtendimentoAbertura: horarioAtendimentoAbertura,
            horarioAtendimentoFechamento: horarioAtendimentoFechamento,
            descricao: descricao,
            fotoPerfil: fotoPerfil,
            fotoBanner: fotoBanner,
            produtos: produto,
            createdBy: user.displayName,
            uid: user.uid
        })

        navigate('/')
    }
    

    const handleEnvioRestaurante = async(e) => {
        e.preventDefault()
        setLoading(true)

        try {
            const storageRefPerfil = ref(storage, `restaurantes/${nomeRestaurante}-logo/`);
            const storageRefBanner = ref(storage, `restaurantes/${nomeRestaurante}-banner/`);
        
            await uploadBytes(storageRefPerfil, fotoPerfil);
            const urlPerfil = await getDownloadURL(storageRefPerfil);
        
            await uploadBytes(storageRefBanner, fotoBanner);
            const urlBanner = await getDownloadURL(storageRefBanner);

            setFotoPerfil(urlPerfil)
            setFotoBanner(urlBanner)
        } catch (error) {
                console.error('Erro:', error);
                throw error;
        }


        setLoading(false)
        setRestaurante(true)
        setPergunta(false)
    }

    const handleCadastroProduto = async(e) => {
        e.preventDefault()
        setLoading(true)
        setPergunta(false)

        try {
            const storageRef = ref(storage, `restaurantes/${nomeProduto}-logo/`);
        
            await uploadBytes(storageRef, fotoProduto);
            const urlProduto = await getDownloadURL(storageRef);

            setProduto([...produto, {
                nomeProduto: nomeProduto,
                descricao: descricaoProduto,
                fotoProduto: urlProduto,
                precoProduto: precoProduto,
                createdBy: user.displayName
            }]);

                
            setNomeProduto('');
            setDescricaoProduto('');
            setFotoProduto(null);
            setPrecoProduto(0)
        } catch (error) {
                console.error('Erro:', error);
                throw error;
        }

        setLoading(false)
        setPergunta(true)
    }
    
    if(!restaurante){
        return (
            <section className='homeApp cadastroEmpresa'>
                <div className="credenciaisRegister">
                    <h1>
                        Cadastre seu restaurante
                    </h1>
                    <form className='formRegister' onSubmit={handleEnvioRestaurante}>
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
                            Cadastrar Empresa
                        </button>
                        {loading && (
                            <p className='text-center'>Carregando...</p>
                        )}
                    </form>
                </div>
            </section>
          )
    } else {
        return (
            <section className='homeApp gerenciarEmpresa'>
                <div className="credenciaisRegister">
                    <h1>
                        Cadastre produtos para {nomeRestaurante}
                    </h1>
                    <form className='formRegister' onSubmit={handleCadastroProduto}> 
                        <span>
                            Nome do produto:
                            <input type="text" placeholder='Nome do seu produto...' value={nomeProduto} onChange={(e) => setNomeProduto(e.target.value)} required/>
                        </span>
                        <span>
                            Descrição:
                            <textarea cols="10" rows="6" value={descricaoProduto} onChange={(e) => setDescricaoProduto(e.target.value)}/>
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
                            Cadastrar Produto
                        </button>
                    </form>
                        <button onClick={enviarDados} className='abrirRestaurante'>
                            Abrir Restaurante
                        </button>
                    {loading && (
                            <p className='text-center'>Cadastrando...</p>
                    )}
                    {pergunta && (
                        <>
                            <p className='text-center'>Cadastrado, você pode cadastrar mais ou finalizar!</p>
                        </>
                    )}
                </div>
            </section>
    )}
}

export default CadastroEmpresa
