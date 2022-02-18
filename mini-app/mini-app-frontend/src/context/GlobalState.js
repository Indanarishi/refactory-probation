import { createContext, useReducer } from "react";
import AppReducer from "./AppReducer";
import * as api from '../api/index';

// Initial state
const initialState = {
    user: [],
    error: null
}

// Create Context
export const GlobalContext = createContext(initialState)

// Provider
export const GlobalProvider = ({ children }) => {
    const [state, dispatch] = useReducer(AppReducer, initialState)

    // Actions
    const signinUser = async (user, navigate) => {
        try {
            const { data } = await api.signIn(user)

            dispatch({
                type: 'SIGNIN_USER',
                payload: data
            })

            navigate('/profile')
        } catch (err) {
            // console.log(err)
            setError(err)
        }
    }

    const signupUser = async (user, navigate) => {
        try {
            const { data } = await api.signUp(user)

            dispatch({
                type: 'SIGNUP_USER',
                payload: data
            })

            navigate('/profile')
        } catch (err) {
            console.log(err)
        }
    }

    const signoutUser = () => {
        dispatch({
            type: 'SIGNOUT_USER'
        })
    }

    function setError(err) {
        dispatch({
            type: 'SET_ERROR',
            payload: err
        })
    }

    return (<GlobalContext.Provider value={{
        user: state.user,
        error: state.error,
        signinUser,
        signoutUser,
        signupUser,
        setError
    }}>
        {children}
    </GlobalContext.Provider>)
}