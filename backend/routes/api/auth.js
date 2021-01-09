import { Router } from 'express'
import bcrypt from 'bcryptjs'
import config from '../../config.js'
import jwt from 'jsonwebtoken'
import User from '../../schemas/User.js'

const JWT_SECRET = config.jwtSecret
const router = Router()

//POST api/auth: authenticates user on login
router.post('/', async (req, res) => {
    const { email, password } = req.body

    try {
        //Check if user already exists
        const user = await User.findOne({email})
        if (!user) return res.status(400).json({doesnt_exist: true})

        //Validate password
        const isMatch = await bcrypt.compare(password, user.password)
        if (!isMatch) return res.status(400).json({invalid_password: true})

        const token = jwt.sign({id: user._id}, JWT_SECRET, {expiresIn: 3600})
        if (token) res.json({token, user: {email: user.email, id: user._id}})
    } catch (e) {
        res.status(400).json({error: e})
    }
})

export default router