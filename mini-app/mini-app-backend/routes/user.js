import express from 'express'

import { signin, signup, getUser, getUsers, getUsersType } from '../controllers/user.js'

const router = express.Router()

router.post('/signin', signin)
router.post('/signup', signup)
router.get('/all', getUsers)
router.get('/:id', getUser)
router.get('/all/:type', getUsersType)

export default router