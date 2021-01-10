import mongoose from 'mongoose'

const Schema = mongoose.Schema
const model = mongoose.model

//Vaults Schema: List of Vaults for a specific user; _id of each Vaults object in DB is the user's id
const VaultsSchema = new Schema({
  vaults: [
    {
      vaultName: String,
      vaultImg: String,
      categories: [
        {
          categoryName: String,
          categoryImg: String,
          quotes: [
            {
              body: String,
              author: String,
              quoteImg: String
            }
          ]
        }
      ]
    }
  ]
})

const Vaults = model('vaults', VaultsSchema)

export default Vaults