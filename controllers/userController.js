const User = require('../models/userModel')
const jwt = require('jsonwebtoken')

const JWT_SECRET = process.env.JWT_SECRET
const JWT_EXPIRES_IN = '24h'

//Helper to generate JWT token
const generateToken = (id) => {
    return jwt.sign({ id }), JWT_SECRET, {
        expiresIn: JWT_EXPIRES_IN
    }
}

const register = async (req, res) => {
    try{
        const { name, email, password } = req.body

        if(!name || !email || !password){
            return res.status(400).json({message: 'Please, provide a name, an email and a password'})
        }

        //Check if user already exists
        const existingUser = await User.findOne( { email })
        if(existingUser){
            return res.status(400).json({ message: 'Email already use'})
        }

        //Create new user

        const user = await User.create({
            name,
            email,
            password
        })

        const token = generateToken(user._id)

        res.status(201).json({
            message: 'User registered successfully',
            token,
            user: {
                id: user._id,
                name: user.name,
                email: user.email
            }
        })

    } catch (err) {
        res.status(500).json({message: 'Server error during registration'})
    }
}

module.exports = { register }