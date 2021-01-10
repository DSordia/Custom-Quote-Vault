import mongoose from 'mongoose'

const Schema = mongoose.Schema
const model = mongoose.model

const UserSchema = new Schema({
  email: {
    type: String,
    unique: true,
    lowercase: true,
    required: true
  },
  password: {
    type: String
  }
})

const User = model('user', UserSchema)

export default User