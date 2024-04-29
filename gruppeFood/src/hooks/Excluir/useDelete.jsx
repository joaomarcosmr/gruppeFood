import { useState, useReducer } from "react"
import { db } from '../../Firebase/firebase'
import { collection, doc, deleteDoc} from 'firebase/firestore'

const initialState = {
    loading: null,
    error: null
  }

const deleteReducer = (state, action) => {
    switch(action.type){
        case 'LOADING':
            return {loading: true, error: null}
        case 'DELETE_DOCUMENT':
            return {loading: false, error: null}
        case 'ERROR':
            return {loading: false, error: action.payload}
        default:
            return state
    }
}

export const useDeleteProduct = (docCollection) => {
    const [response, dispatch] = useReducer(deleteReducer, initialState)

    const [cancelled, setCancelled] = useState(false)

    const checkCancelledBeforeDispatch = (action) => {
        if(!cancelled){
          dispatch(action)
        }
        
        return !cancelled
    }

    const deleteDocument = async(id) => {
        if (!checkCancelledBeforeDispatch({ type: 'LOADING' })) {
            return;
        }

        try {
            const deletedDocument = await deleteDoc(doc(db, docCollection, id))

            checkCancelledBeforeDispatch({
                type: 'DELETE_DOCUMENT',
                payload: deleteDocument
            })
            return deleteDocument;
        } catch (error) {
            checkCancelledBeforeDispatch({
                type: 'ERROR',
                payload: error.message
            })
        }
    }

    return { deleteDocument, response }
}