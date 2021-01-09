import { ADD_CATEGORY, DELETE_CATEGORY, EDIT_CATEGORY_NAME, EDIT_CATEGORY_IMG } from './actionTypes'
import axios from 'axios'

export const addCategory = (newCategory, vaultID, userID) => async (dispatch, getState) => {
    let vaults = [...getState().vaults.vaults], newCategoryID = 0

    for (let i = 0; i < vaults.length; ++i) {
        if (vaults[i]._id === vaultID) {
            let newVault = {...vaults[i]}
            newVault.categories = [...newVault.categories, newCategory]
            vaults[i] = newVault
            break
        }
    }

    await axios.patch(`/api/vaults/${userID}`, {vaults: vaults})
    
    const res = await axios.get(`/api/vaults/${userID}`)
    
    for (const vault of res.data.vaults) {
            if (vault._id === vaultID) {
                newCategoryID = vault.categories[vault.categories.length-1]._id
                break
            }
    }

    dispatch({
        type: ADD_CATEGORY,
        data: {newCategory: newCategory,
               vaultID: vaultID,
               newCategoryID: newCategoryID}
    })
}

export const deleteCategory = (categoryID, vaultID, userID) => async (dispatch, getState) => {
    let vaults = [...getState().vaults.vaults]

    for (let i = 0; i < vaults.length; ++i) {
        if (vaults[i]._id === vaultID) {
            let newVault = {...vaults[i]}
            newVault.categories = newVault.categories.filter(category => category._id !== categoryID)
            vaults[i] = newVault
            break
        }
    }

    await axios.patch(`/api/vaults/${userID}`, {vaults: vaults})
    
    dispatch({
        type: DELETE_CATEGORY,
        data: {categoryID: categoryID,
               vaultID: vaultID}
    })
}

export const editCategoryName = (categoryID, newCategoryName, vaultID, userID) => async (dispatch, getState) => {
    let vaults = [...getState().vaults.vaults]

    for (let i = 0; i < vaults.length; ++i) {
        if (vaults[i]._id === vaultID) {
            let newVault = {...vaults[i]}
            let categories = [...newVault.categories]
            for (let j = 0; j < categories.length; ++j) {
                if (categories[j]._id === categoryID) {
                    let newCategory = {...categories[j]}
                    newCategory.categoryName = newCategoryName
                    categories[j] = newCategory
                    break
                }
            }
            newVault.categories = categories
            vaults[i] = newVault
            break
        }
    }
    
    await axios.patch(`/api/vaults/${userID}`, {vaults: vaults})
    
    dispatch({
        type: EDIT_CATEGORY_NAME,
        data: {categoryID: categoryID,
               newCategoryName: newCategoryName,
               vaultID: vaultID}
    })
}

export const editCategoryImg = (categoryID, newCategoryImg, vaultID, userID) => async (dispatch, getState) => {
    let vaults = [...getState().vaults.vaults]

    for (let i = 0; i < vaults.length; ++i) {
        if (vaults[i]._id === vaultID) {
            let newVault = {...vaults[i]}
            let categories = [...newVault.categories]
            for (let j = 0; j < categories.length; ++j) {
                if (categories[j]._id === categoryID) {
                    let newCategory = {...categories[j]}
                    newCategory.categoryImg = newCategoryImg
                    categories[j] = newCategory
                    break
                }
            }
            newVault.categories = categories
            vaults[i] = newVault
            break
        }
    }
    
    await axios.patch(`/api/vaults/${userID}`, {vaults: vaults})
    
    dispatch({
        type: EDIT_CATEGORY_IMG,
        data: {categoryID: categoryID,
               newCategoryImg: newCategoryImg,
               vaultID: vaultID}
    })
}