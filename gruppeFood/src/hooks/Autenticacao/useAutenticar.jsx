import { useEffect, useState } from 'react'
import { db } from '../../Firebase/firebase'
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile, signOut } from 'firebase/auth'

export const useAutenticar = () => {
    const [error, setError] = useState([])
    const [loading, setLoading] = useState(false)

    const auth = getAuth()

    const registrarConta = async (dados) => {
        setLoading(true)
        setError(null)

        try {
            const { usuario } = await createUserWithEmailAndPassword(
                auth,
                dados.email,
                dados.senha
            )
    
            await updateProfile(
                usuario,
                { displayName: dados.nome }
            )
    
            setLoading(false)
            return usuario
        } catch (error) {
            console.log(error.message)
        }
    }

    const logarConta = (dados) => {
        setLoading(true)
        setError(null)

        try {
            const user = signInWithEmailAndPassword(
                auth,
                dados.email,
                dados.senha
            )
            
            setLoading(null)
        } catch (error) {
            console.log(error.message)
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