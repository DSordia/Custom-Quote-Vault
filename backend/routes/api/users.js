import { Router } from 'express'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import sendResetLink from '../../sendEmail.js'
import User from '../../schemas/User.js'
import dotenv from 'dotenv'
dotenv.config()

const JWT_SECRET = process.env.JWT_SECRET
const router = Router()

//POST api/users: adds a user on signup
router.post('/', async (req, res) => {
    const { email, password } = req.body

    try {
        //Check if user already exists
        const user = await User.findOne({email})
        if (user) return res.json({exists: true, user: user})

        //Hash password
        if (password) {
            const salt = await bcrypt.genSalt(10)
            const hash = await bcrypt.hash(password, salt)

            const newUser = new User({email, password: hash})
            const user = await newUser.save()
            
            const token = jwt.sign({id: user._id}, JWT_SECRET, {expiresIn: 3600})
            if (token) return res.json({token, user: {email: user.email, id: user._id}})
        } else {
            //If password is null, they logged in with Google for the first time
            const newUser = new User({email, password})
            const user = await newUser.save()
            if (user) return res.json({user: user})
        }
    } catch (e) {
        res.status(400).json({error: e})
    }
})

//PATCH api/users: changes a user's password
router.patch('/:id', async (req, res) => {
    const password = req.body.password
    
    try {
        //Hash password
        const salt = await bcrypt.genSalt(10)
        const hash = await bcrypt.hash(password, salt)

        req.body.password = hash

        const user = await User.findByIdAndUpdate(req.params.id)
        await user.updateOne({$set: req.body})
        res.json(user)
    } catch (e) {
        res.status(400).json({error: e})
    }
})

//GET api/users/forgot: emails password reset if email exists
router.get('/forgot', async (req, res) => {
    const email = req.query.email
    
    try {
        const users = await User.find()
        for (const user of users) {
            if (user.email === email) {
                sendResetLink(email, user._id)
                return res.json({exists: true})
            }
        }
        return res.status(400).json({doesnt_exist: true})
    } catch (e) {
        res.status(400).json({error: e})
    }
})

export default router