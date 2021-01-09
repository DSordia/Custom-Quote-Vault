import { LOADING_VAULTS, GET_VAULTS, ADD_VAULT, DELETE_VAULT,
         EDIT_VAULT_NAME, EDIT_VAULT_IMG } from './actionTypes'
import axios from 'axios'

export const initializeVaults = userID => dispatch => {
    axios.post('/api/vaults', {userID: userID})
}

export const startLoading = () => dispatch => dispatch({type: LOADING_VAULTS})

export const getVaults = userID => async dispatch => {
    const res = await axios.get(`/api/vaults/${userID}`)

    dispatch({
        type: GET_VAULTS,
        data: res.data.vaults
    })
}

export const addVault = (newVault, userID) => async (dispatch, getState) => {
    let vaults = [...getState().vaults.vaults], newVaultID = 0

    vaults.push(newVault)

    await axios.patch(`/api/vaults/${userID}`, {vaults: vaults})

    const res = await axios.get(`/api/vaults/${userID}`)

    newVaultID = res.data.vaults[res.data.vaults.length-1]._id

    dispatch({
        type: ADD_VAULT,
        data: {newVault: newVault,
               newVaultID: newVaultID}
    })
}

export const deleteVault = (vaultID, userID) => async (dispatch, getState) => {
    let vaults = [...getState().vaults.vaults]

    vaults = vaults.filter(vault => vault._id !== vaultID)

    await axios.patch(`/api/vaults/${userID}`, {vaults: vaults})
    
    dispatch({
        type: DELETE_VAULT,
        data: vaultID
    })
}

export const editVaultName = (vaultID, newVaultName, userID) => async (dispatch, getState) => {
    let vaults = [...getState().vaults.vaults]

    for (let i = 0; i < vaults.length; ++i) {
        if (vaults[i]._id === vaultID) {
            let newVault = {...vaults[i]}
            newVault.vaultName = newVaultName
            vaults[i] = newVault
            break
        }
    }
    
    await axios.patch(`/api/vaults/${userID}`, {vaults: vaults})
    
    dispatch({
        type: EDIT_VAULT_NAME,
        data: {vaultID: vaultID,
               newVaultName: newVaultName}
    })
}

export const editVaultImg = (vaultID, newVaultImg, userID) => async (dispatch, getState) => {
    let vaults = [...getState().vaults.vaults]

    for (let i = 0; i < vaults.length; ++i) {
        if (vaults[i]._id === vaultID) {
            let newVault = {...vaults[i]}
            newVault.vaultImg = newVaultImg
            vaults[i] = newVault
            break
        }
    }
    
    await axios.patch(`/api/vaults/${userID}`, {vaults: vaults})
    
    dispatch({
        type: EDIT_VAULT_IMG,
        data: {vaultID: vaultID,
               newVaultImg: newVaultImg}
    })
}