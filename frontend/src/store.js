import { configureStore } from '@reduxjs/toolkit'
import thunk from 'redux-thunk'
import vaultsReducer from './reducers/vaultsReducer'
import userReducer from './reducers/userReducer'

const store = configureStore({
  reducer: {
    vaults: vaultsReducer,
    user: userReducer
  },
  middleware: [thunk]
})

export default store