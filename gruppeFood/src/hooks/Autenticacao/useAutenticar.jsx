import { useEffect, useState } from 'react'
import { db, auth } from '../../Firebase/firebase'
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile } from 'firebase/auth'
import { doc, setDoc } from 'firebase/firestore';

export const useAutenticar = () => {
    const [error, setError] = useState([])
    const [loading, setLoading] = useState(false)

    const erros = [
        {erro: 'email-already', mensagem: 'O e-mail utilizado já está cadastrado'},
        {erro: 'password', mensagem: 'A senha precisa ter mais de 6 dígitos'},
        {erro: 'invalid-credential', mensagem: 'Usuário ou senha inválido'}
    ]

    const registrarConta = async (dados) => {
        setLoading(true);
        setError(null);
    
        try {
            const { user } = await createUserWithEmailAndPassword(
                auth, 
                dados.email, 
                dados.senha
            );
    
            await updateProfile(
                user, {
                displayName: dados.nome
            });

            const userRef = doc(db, 'users', user.uid);
            await setDoc(userRef, {
                userAddress: dados.endereco,
                uid: user.uid
            });
    
            setLoading(false);
            return user;
        } catch (error) {
            setError([])
            console.log(error.message)

            for(let i = 0; i < erros.length; i++){
                if(error.message.includes(erros[i].erro)){
                    setError(erros[i].mensagem)
                }
            }

            setLoading(false);
        }
    };
    

    const logarConta = async (dados) => {
        setLoading(true)
        setError(null)

        try {
            const user = await signInWithEmailAndPassword(
                auth,
                dados.email,
                dados.senha
            )
            
            setLoading(null)
        } catch (error) {
            console.log(error.message)
            setError([])

            for(let i = 0; i < erros.length; i++){
                if(error.message.includes(erros[i].erro)){
                    setError(erros[i].mensagem)
                }
            }

            setLoading(false)
        }
    }

    return {
        auth,
        logarConta,
        registrarConta,
        error,
        loading
    }
}