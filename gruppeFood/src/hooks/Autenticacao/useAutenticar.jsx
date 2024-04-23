import { useEffect, useState } from 'react'
import { db, auth } from '../../Firebase/firebase'
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile } from 'firebase/auth'
import { doc, setDoc } from 'firebase/firestore';

export const useAutenticar = () => {
    const [error, setError] = useState([])
    const [loading, setLoading] = useState(false)

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
                userAddress: dados.endereco
            });
    
            setLoading(false);
            return user;
        } catch (error) {
            setError(error.message);
            setLoading(false);
            console.error('Erro ao registrar conta:', error); 
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
            setLoading(false)
        }
    }

    const sairDaConta = async (user) => {
        
    }
    
    return {
        auth,
        logarConta,
        registrarConta,
        error,
        loading
    }
}