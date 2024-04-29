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

            if(cancelled) return

            setLoading(true)

            const collectionRef = await collection(db, docCollection)

            try {
                let q;

                if (search) {
                    q = query(
                        collectionRef,
                        where("produtos", "array-contains", search),
                        orderBy("createdAt", "desc")
                    );
                } else if (uid) {
                  q = await query(
                    collectionRef,
                    where("uid", "==", uid),
                    orderBy("createdAt", "desc")
                  );
                } else {
                  q = await query(collectionRef, orderBy("createdAt", "desc"));
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
                console.error(error)
            }
       }

       loadData()
    }, [docCollection, search, uid, cancelled])

    useEffect(() => {
        return () => setCancelled(true)
    }, [])

    return { documents, loading, error }
}