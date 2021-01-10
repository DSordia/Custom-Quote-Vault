import { ADD_QUOTE, DELETE_QUOTE, EDIT_QUOTE } from './actionTypes'
import axios from 'axios'

export const addQuote = (newQuote, categoryID, vaultID, userID) => async (dispatch, getState) => {
    let vaults = [...getState().vaults.vaults], newQuoteID = 0

    for (let i = 0; i < vaults.length; ++i) {
        if (vaults[i]._id === vaultID) {
            let newVault = {...vaults[i]}
            let categories = [...newVault.categories]
            for (let j = 0; j < categories.length; ++j) {
                if (categories[j]._id === categoryID) {
                    let newCategory = {...categories[j]}
                    newCategory.quotes = [...newCategory.quotes, newQuote]
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
    
    const res = await axios.get(`/api/vaults/${userID}`)
    
    for (const vault of res.data.vaults) {
        if (vault._id === vaultID) {
            for (const category of vault.categories) {
                if (category._id === categoryID) {
                    newQuoteID = category.quotes[category.quotes.length-1]._id
                    break
                }
            }
            break
        }
    }
    
    dispatch({
        type: ADD_QUOTE,
        data: {newQuote: newQuote,
               categoryID: categoryID,
               vaultID: vaultID,
               newQuoteID: newQuoteID}
    })
}

export const deleteQuote = (quoteID, categoryID, vaultID, userID) => async (dispatch, getState) => {
    let vaults = [...getState().vaults.vaults]

    for (let i = 0; i < vaults.length; ++i) {
        if (vaults[i]._id === vaultID) {
            let newVault = {...vaults[i]}
            let categories = [...newVault.categories]
            for (let j = 0; j < categories.length; ++j) {
                if (categories[j]._id === categoryID) {
                    let newCategory = {...categories[j]}
                    newCategory.quotes = newCategory.quotes.filter(quote => quote._id !== quoteID)
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
        type: DELETE_QUOTE,
        data: {quoteID: quoteID,
               categoryID: categoryID,
               vaultID: vaultID}
    })
}

export const editQuote = (quoteID, updatedQuote, categoryID, vaultID, userID) => async (dispatch, getState) => {
    let vaults = [...getState().vaults.vaults]
    
    for (let i = 0; i < vaults.length; ++i) {
        if (vaults[i]._id === vaultID) {
            let newVault = {...vaults[i]}
            let categories = [...newVault.categories]
            for (let j = 0; j < categories.length; ++j) {
                if (categories[j]._id === categoryID) {
                    let category = {...categories[j]}
                    let quotes = [...category.quotes]
                    for (let k = 0; k < quotes.length; ++k) {
                        if (quotes[k]._id === quoteID) {
                            quotes[k] = updatedQuote
                            break
                        }
                    }
                    category.quotes = quotes
                    categories[j] = category
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
        type: EDIT_QUOTE,
        data: {quoteID: quoteID,
               updatedQuote: updatedQuote,
               categoryID: categoryID,
               vaultID: vaultID}
    })
}