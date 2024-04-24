import { useEffect, useState } from "react";
import { db } from '../../Firebase/firebase'
import { collection, query, orderBy, onSnapshot, where, QuerySnapshot } from "firebase/firestore";


export const useCarregaColecoes = (docCollection, search = null, uid = null) => {
    const [documents, setDocuments] = useState(null)
    const [error, setError] = useState(null)
    const [loading, setLoading] = useState(null)

    const [cancelled, setCancelled] = useState(false)

    useEffect(() => {
       const loadData = async () => {
            let q;

            if(cancelled) return

            setLoading(true)

            const collectionRef = await collection(db, docCollection)

            try {
                
                q = await query(collectionRef, 
                    orderBy('createdAt', 'desc'))

                if (uid) {
                    q = query(q, where('uid', '==', uid));
                }

                await onSnapshot(q, (querySnapshot) => {
                    setDocuments(
                        querySnapshot.docs.map((doc) => ({
                        id: doc.id,
                        ...doc.data(),
                        }))
                    );
                });

                setLoading(false)
            } catch (error) {
                
            }
       }

       loadData()
    }, [docCollection, search, uid, cancelled])

    useEffect(() => {
        return () => setCancelled(true)
    }, [])

    return { documents, loading, error }
}