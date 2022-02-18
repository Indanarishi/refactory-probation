import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

import User from '../models/user.js'

export const signin = async (req, res) => {
    const { email, password, account_type } = req.body

    try {
        const existingUser = await User.findOne({ email })

        if (!existingUser) return res.status(404).json({ message: "User doesn't exist." })

        if (account_type === 'regular') {
            const isPasswordCorrect = await bcrypt.compare(password, existingUser.password)
            if (!isPasswordCorrect) return res.status(400).json({ message: "Invalid credentials." })
        }

        const token = jwt.sign({ email: existingUser.email, id: existingUser._id }, 'test', { expiresIn: "1h" })

        res.status(200).json({ result: existingUser, token })
    } catch (error) {
        res.status(500).json({ message: "Something went wrong." })
    }
}

export const signup = async (req, res) => {
    const { email, firstName, lastName, password, imageUrl, account_type } = req.body

    try {
        const existingUser = await User.findOne({ email })

        if (existingUser) return res.status(400).json({ message: "User already exists." })

        const hashedPassword = await bcrypt.hash(password, 12)

        const result = await User.create({ email, password: hashedPassword, name: `${firstName} ${lastName}`, imageUrl, account_type })

        const token = jwt.sign({ email: result.email, id: result._id }, 'test', { expiresIn: "1h" })

        res.status(200).json({ result, token })
    } catch (err) {
        res.status(500).json({ message: "Something went wrong." })
    }
}

export const getUsers = async (req, res) => {
    try {
        const users = await User.find()

        res.status(200).json(users)
    } catch (err) {
        res.status(400).json({ message: err.message })
    }
}

export const getUser = async (req, res) => {
    const { id } = req.params

    try {
        const user = await User.findById(id)

        res.status(200).json(user)
    } catch (err) {
        console.log(err)
        res.status(400).json({ message: err.message })
    }
}

export const getUsersType = async (req, res) => {
    const { type } = req.params

    if (type === 'regular') {
        try {
            const user = await User.find({ account_type: "regular" })
    
            res.status(200).json(user)
        } catch (err) {
            console.log(err)
            res.status(400).json({ message: err.message })
        }
    } else if (type === 'google') {
        try {
            const user = await User.find({ account_type: "google" })
    
            res.status(200).json(user)
        } catch (err) {
            console.log(err)
            res.status(400).json({ message: err.message })
        }
    }
}