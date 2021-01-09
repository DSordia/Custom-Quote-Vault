import express from 'express'
import mongoose from 'mongoose'
import config from './config.js'
import users from './routes/api/users.js'
import vaults from './routes/api/vaults.js'
import auth from './routes/api/auth.js'

const app = express()

//Middleware
app.use(express.json())

//Grab database configuration
const db = config.mongoURI

//Connect to Mongo Database
mongoose.connect(db, {useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true})
.then(() => console.log('Connected to MongoDB Database.'))
.catch(err => console.log(err))

//Use Routes
app.use('/api/users', users)
app.use('/api/vaults', vaults)
app.use('/api/auth', auth)

//Serve static assets if in production
if (process.env.NODE_ENV === 'production') {
    app.use(express.static('client/build'))

    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
    })
}

const PORT = process.env.PORT || 5000

app.listen(PORT, () => console.log(`Server started on port ${PORT}.`))