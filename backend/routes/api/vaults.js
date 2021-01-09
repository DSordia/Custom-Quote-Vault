import { Router } from 'express'
import Vaults from '../../schemas/Vaults.js'

const router = Router()

//GET api/vaults/vaultid: gets vaults by user id
router.get('/:id', async (req, res) => {
    try {
        const vaults = await (Vaults.findById(req.params.id))
        if (vaults) {
            res.json(vaults)
        } else {
            res.status(400).json({doesnt_exist: true})
        }
    } catch (e) {
        res.status(400).json({error: e})
    }
})

//POST api/vaults: adds a new user to database with empty vaults
router.post('/', async (req, res) => {
    const newUser = new Vaults({_id: req.body.userID, vaults: []})

    try {
        const user = await newUser.save()
        if (user) res.json(user)
    } catch (e) {
        res.status(400).json({error: e})
    }
})

//PATCH api/vaults/userid: edits a user's list of vaults in the database
router.patch('/:id', async (req, res) => {
    try {
        const vaults = await Vaults.findByIdAndUpdate(req.params.id)
        if (vaults) {
            await vaults.updateOne({$set: req.body})
            res.json(vaults)
        }
    } catch (e) {
        res.status(400).json({error: e})
    }
})

export default router