import express from 'express'
import mongoose from 'mongoose'
import users from './backend/routes/api/users.js'
import vaults from './backend/routes/api/vaults.js'
import auth from './backend/routes/api/auth.js'
import * as path from 'path'
import { dirname } from 'path'
import { fileURLToPath } from 'url'
import dotenv from 'dotenv'
dotenv.config()

const app = express()

//Middleware
app.use(express.json())
app.use(express.urlencoded({extended: true}))

//Grab database configuration
const db = process.env.MONGO_URI

//Connect to Mongo Database
mongoose.connect(db, {useNewUrlParser: true,
                      useUnifiedTopology: true,
                      useCreateIndex: true})
.then(() => console.log('Connected to MongoDB Database.'))
.catch(err => console.log(err))

//Use Routes
app.use('/api/users', users)
app.use('/api/vaults', vaults)
app.use('/api/auth', auth)

//Default to frontend's index.html when in production
if (process.env.NODE_ENV === 'production') {
    app.use(express.static('frontend/build'))

    const __dirname = dirname(fileURLToPath(import.meta.url))

    app.get('/*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'frontend', 'build', 'index.html'))
    })
}

const PORT = process.env.PORT || 5000

app.listen(PORT, () => console.log(`Server started on port ${PORT}.`))