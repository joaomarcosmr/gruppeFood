import { useEffect, useState } from "react";
import { db } from '../../Firebase/firebase'
import { doc, getDoc } from "firebase/firestore";


export const useCarregaDocumentos = (docCollection, id) => {
    const [document, setDocument] = useState(null)
    const [error, setError] = useState(null)
    const [loading, setLoading] = useState(null)

    const [cancelled, setCancelled] = useState(false)

    useEffect(() => {
       const loadDocument = async () => {

            if(cancelled) return

            setLoading(true)

            try {
                const docRef = await doc(db, docCollection, id)
                const docSnap = await getDoc(docRef)

                setDocument(docSnap.data())
                setLoading(false)
            } catch (error) {
                console.log('Erro:', error.message)
                setError('Ocorreu um erro tente novamente mais tarde!')
                setLoading(false)   
            }
       }

       loadDocument()
    }, [docCollection, cancelled, id])

    useEffect(() => {
        return () => setCancelled(true)
    }, [])

    return { document, loading, error }
}