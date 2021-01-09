import { createReducer } from '@reduxjs/toolkit'
import { LOADING_VAULTS, GET_VAULTS, CLEAR_VAULTS, ADD_VAULT, DELETE_VAULT, EDIT_VAULT_NAME,
         EDIT_VAULT_IMG, ADD_CATEGORY, DELETE_CATEGORY, EDIT_CATEGORY_NAME, EDIT_CATEGORY_IMG,
         ADD_QUOTE, DELETE_QUOTE, EDIT_QUOTE } from '../actions/actionTypes'

const initialState = { vaults: [], loading: false }

const vaultsReducer = createReducer(initialState, builder => {
  builder
  .addCase(LOADING_VAULTS, state => { state.loading = true })

  .addCase(CLEAR_VAULTS, state => { state.vaults = [] })

  .addCase(GET_VAULTS, (state, action) => {
    state.vaults = action.data
    state.loading = false
  })

  .addCase(ADD_VAULT, (state, action) => {
    let newVault = action.data.newVault
    newVault['_id'] = action.data.newVaultID
    state.vaults.push(newVault)
  })

  .addCase(DELETE_VAULT, (state, action) => {
    state.vaults = state.vaults.filter(vault => vault._id !== action.data)
  })

  .addCase(EDIT_VAULT_NAME, (state, action) => {
    state.vaults.forEach(vault => {
      if (vault._id === action.data.vaultID)  {
        vault.vaultName = action.data.newVaultName
        return
      }
    })
  })

  .addCase(EDIT_VAULT_IMG, (state, action) => {
    state.vaults.forEach(vault => {
      if (vault._id === action.data.vaultID)  {
        vault.vaultImg = action.data.newVaultImg
        return
      }
    })
  })

  .addCase(ADD_CATEGORY, (state, action) => {
    let newCategory = action.data.newCategory
    newCategory['_id'] = action.data.newCategoryID

    state.vaults.forEach(vault => {
      if (vault._id === action.data.vaultID)  {
        vault.categories.push(newCategory)
        return
      }
    })
  })

  .addCase(DELETE_CATEGORY, (state, action) => {
    state.vaults.forEach(vault => {
      if (vault._id === action.data.vaultID)  {
        vault.categories = vault.categories.filter(category => category._id !== action.data.categoryID)
        return
      }
    })
  })

  .addCase(EDIT_CATEGORY_NAME, (state, action) => {
    state.vaults.forEach(vault => {
      if (vault._id === action.data.vaultID)  {
        vault.categories.forEach(category => {
          if (category._id === action.data.categoryID) {
            category.categoryName = action.data.newCategoryName
            return
          }
        })
      }
    })
  })

  .addCase(EDIT_CATEGORY_IMG, (state, action) => {
    state.vaults.forEach(vault => {
      if (vault._id === action.data.vaultID)  {
        vault.categories.forEach(category => {
          if (category._id === action.data.categoryID) {
            category.categoryImg = action.data.newCategoryImg
            return
          }
        })
      }
    })
  })

  .addCase(ADD_QUOTE, (state, action) => {
    let newQuote = action.data.newQuote
    newQuote['_id'] = action.data.newQuoteID

    state.vaults.forEach(vault => {
      if (vault._id === action.data.vaultID)  {
        vault.categories.forEach(category => {
          if (category._id === action.data.categoryID) {
            category.quotes.push(newQuote)
            return
          }
        })
      }
    })
  })

  .addCase(DELETE_QUOTE, (state, action) => {
    state.vaults.forEach(vault => {
      if (vault._id === action.data.vaultID)  {
        vault.categories.forEach(category => {
          if (category._id === action.data.categoryID) {
            category.quotes = category.quotes.filter(quote => quote._id !== action.data.quoteID)
            return
          }
        })
      }
    })
  })

  .addCase(EDIT_QUOTE, (state, action) => {
    state.vaults.forEach(vault => {
      if (vault._id === action.data.vaultID)  {
        vault.categories.forEach(category => {
          if (category._id === action.data.categoryID) {
            category.quotes.forEach(quote => {
              if (quote._id === action.data.quoteID) {
                quote.body = action.data.updatedQuote.body
                quote.author = action.data.updatedQuote.author
                quote.quoteImg = action.data.updatedQuote.quoteImg
                return
              }
            })
          }
        })
      }
    })
  })
})

export default vaultsReducer