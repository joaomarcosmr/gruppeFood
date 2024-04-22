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
                dados.nome,
                dados.email
            )
    
            await updateProfile(
                usuario,
                { displayName: dados.nome },
                { userAddress: dados.endereco }
            )
    
            setLoading(false)
            return usuario
        } catch (error) {
            console.log(error.message)
        }
    }

    return {
        auth,
        registrarConta,
        error,
        loading
    }
}