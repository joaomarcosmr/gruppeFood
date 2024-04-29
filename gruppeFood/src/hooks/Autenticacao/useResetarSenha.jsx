import { useEffect, useState } from 'react'
import { db, auth } from '../../Firebase/firebase'
import { sendPasswordResetEmail } from 'firebase/auth'

export const useResetarSenha = () => {
    const [error, setError] = useState([])
    const [loading, setLoading] = useState(false)

    const resetarSenha = async (email) => {
        setLoading(true);
        setError(null);
    
        try {
            const enviado = await sendPasswordResetEmail(auth, email)
    
            setLoading(false);
            return enviado;
        } catch (error) {
            setError(error.message);
            setLoading(false);
            console.error('Erro ao registrar conta:', error); 
        }
    };
    
    return {
        auth,
        resetarSenha,
        error,
        loading
    }
}