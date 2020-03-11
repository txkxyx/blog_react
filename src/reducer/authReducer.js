import { SIGNIN_SUCCESS, SIGNIN_ERROR, SIGNOUT_SUCCESS, SIGNUP_SUCCESS, SIGNUP_ERROR } from '../actions/authActions';

const initState = {
    authError: null
};

const authReducer = ( state = initState, action) => {
    switch(action.type){
        case SIGNIN_ERROR:
            return {
                ...state,
                authError: 'Login failed'
            }
        case SIGNIN_SUCCESS:
            return {
                ...state,
                authError: null
            }
        case SIGNOUT_SUCCESS:
            return state;
        case SIGNUP_ERROR:
            return{
                ...state,
                authError: action.err.message
            }
        case SIGNUP_SUCCESS:
            return{
                ...state,
                authError: null
            }
        default:
            return state;
    }
}

export default authReducer;