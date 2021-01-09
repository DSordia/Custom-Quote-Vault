import { LOGIN, SIGNUP, LOGOUT, CLEAR_VAULTS } from './actionTypes'
import { startLoading } from './vaultActions.js'

export const login = userData => dispatch => {
    dispatch(startLoading())
    dispatch({type: LOGIN, data: userData})
}

export const signup = newUserData => dispatch => dispatch({type: SIGNUP, data: newUserData})

export const logout = dispatch => {
    dispatch({type: CLEAR_VAULTS})
    dispatch({type: LOGOUT})
}