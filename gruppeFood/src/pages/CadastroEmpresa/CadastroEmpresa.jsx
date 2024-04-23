import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Link, useSearchParams } from 'react-router-dom'
import { useAuthValue } from '../../context/AuthContext'
import { useCreateProduct } from '../../hooks/Cadastros/useDocumentos'
import { storage } from '../../Firebase/firebase'
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import './CadastroEmpresa.css'

const CadastroEmpresa = () => {
    const [ restaurante, setRestaurante ] = useState(false)
    const [ pergunta, setPergunta ] = useState(true)
    const [ nomeRestaurante, setNomeRestaurante ] = useState('')
    const [ categoria, setCategoria ] = useState('')
    const [ endereco, setEndereco ] = useState('')
    const [ horarioAtendimento, setHorarioAtendimento ] = useState('')
    const [ descricao, setDescricao ] = useState('')
    const [ fotoPerfil, setFotoPerfil ] = useState(null)
    const [ fotoBanner, setFotoBanner ] = useState(null)
    const [ loading, setLoading ] = useState(false)


    const { user } = useAuthValue()
    const { insertDocument, response } = useCreateProduct('empresa')
    const navigate = useNavigate()

    const handleEnvioRestaurante = async(e) => {
        e.preventDefault()
        setLoading(true)
        setPergunta(false)



        setLoading(false)
        setRestaurante(true)
        setPergunta(true)
    }

    const handleCadastroProduto = async(e) => {
        e.preventDefault()
        setLoading(true)

        try {
            const storageRefPerfil = ref(storage, `restaurantes/${nomeRestaurante}-logo/`);
            const storageRefBanner = ref(storage, `restaurantes/${nomeRestaurante}-banner/`);
        
            await uploadBytes(storageRefPerfil, fotoPerfil);
            const urlPerfil = await getDownloadURL(storageRefPerfil);
        
            await uploadBytes(storageRefBanner, fotoBanner);
            const urlBanner = await getDownloadURL(storageRefBanner);

            await insertDocument({
                nomeRestaurante: nomeRestaurante,
                categoria: categoria,
                endereco: endereco,
                horarioAtendimento: horarioAtendimento,
                descricao: descricao,
                fotoPerfil: urlPerfil,
                fotoBanner: urlBanner,
                createdBy: user.displayName,
                uid: user.uid
            })

        } catch (error) {
                console.error('Erro:', error);
                throw error;
        }

        setLoading(false)
        setRestaurante(true)
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
                            <input type="text" placeholder='Seu nome aqui...' onChange={(e) => setNomeRestaurante(e.target.value)}/>
                        </span>
                        <span>
                            Categoria:<br/>
                            <select className='select' onChange={(e) => setCategoria(e.target.value)} defaultValue={'Hamburguer'}>
                                <option value="Hamburguer">Hamburguer</option>
                                <option value="Japonesa">Japones</option>
                                <option value="Salgadinhos">Salgadinhos</option>
                                <option value="Pizza">Pizza</option>
                                <option value="Chines">Chines</option>
                            </select>
                        </span>
                        <span>
                            Endereço:
                            <input type="text" placeholder='Seu e-mail aqui...' onChange={(e) => setEndereco(e.target.value)} />
                        </span>
                        <span>
                            Horario de atendimento:
                            <input type="number" placeholder='Sua senha...' onChange={(e) => setHorarioAtendimento(e.target.value)} />
                        </span>
                        <span>
                            Coloque uma foto de perfil
                            <input type="file" name="profile" onChange={(e) => setFotoPerfil(e.target.files[0])}/>
                        </span>
                        <span>
                            Coloque uma foto de banner
                            <input type="file" name="banner" onChange={(e) => setFotoBanner(e.target.files[0])}/>
                        </span>
                        <span>
                            Descrição do seu lanche
                            <input type="text" placeholder='Fazemos hamburguer com amor' onChange={(e) => setDescricao(e.target.value)}/>
                        </span>
                        <button>
                            Cadastrar
                        </button>
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
                            <input type="text" placeholder='Seu e-mail aqui...'  />
                        </span>
                        <span>
                            Descrição:
                            <textarea cols="10" rows="6" />
                        </span>
                        <span>
                            Coloque uma foto do seu produto:
                            <input type="file" />
                        </span>
                        <span>
                            Preço do seu produto:
                            <input type="number" placeholder='5,00'  />
                        </span>
                        <button>
                            Cadastrar
                        </button>
                    </form>
                    {pergunta && (
                        <>
                            <p>Deseja adicionar outro produto?</p>
                            <button className='addProduto'>Sim, adicionar outro produto</button>
                        </>
                    )}
                </div>
            </section>
    )}
}

export default CadastroEmpresa
