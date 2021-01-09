import { createReducer } from '@reduxjs/toolkit'
import { LOGIN, SIGNUP, LOGOUT } from '../actions/actionTypes'

const initialState = {
    token: localStorage.getItem('token'),
    isAuthenticated: false,
    user: {},
    isLoggedIn: false
}

const userReducer = createReducer(initialState, builder => {
    builder
    .addCase(LOGIN, (state, action) => {
        localStorage.setItem('token', action.data.token)
        state.isAuthenticated = true
        state.user = action.data.user
        state.token = action.data.token
        state.isLoggedIn = true
    })

    .addCase(SIGNUP, (state, action) => {
        localStorage.setItem('token', action.data.token)
        state.isAuthenticated = true
        state.user = action.data.user
        state.token = action.data.token
        state.isLoggedIn = true
    })

    .addCase(LOGOUT, state => {
        localStorage.removeItem('token')
        state.token = null
        state.isAuthenticated = false
        state.user = {}
        state.isLoggedIn = false
    })
})

export default userReducer