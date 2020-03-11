import authReducer from './authReducer'
import articleReducers from './articleReducer'
import { combineReducers } from 'redux'
import { firestoreReducer } from 'redux-firestore'
import { firebaseReducer } from "react-redux-firebase";

const rootReducer =  combineReducers({
    auth: authReducer,
    article : articleReducers,
    firestore: firestoreReducer,
    firebase: firebaseReducer
})

export default rootReducer;