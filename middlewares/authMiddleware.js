const jwt = require("jsonwebtoken")
const User = require('../models/userModel')
const validator = require('validator')

const JWT_SECRET = process.env.JWT_SECRET

const authMiddleware =  async (req, res, next) => {
    try{
        let token
        if(req.headers.authorization?.startWith('Bearer')){
            token = req.headers.authorization.split(' ')[1]
        }

        if(!token){
            return res.status(401).json({message: 'Not autorized, token missing'})
        }

        //Verify token
        const decoded = jwt.verify(token, JWT_SECRET)

        //Get user from token payload
        const user = await User.findById(decoded.id)
        if(!user){
            return res.status(401).json({message: 'User no longer exists'})
        }

        req.user = user
        next()

        const isPasswordOK = validator.isStrongPassword(password, {
            minLength: 6,
            minLowercase: 1,
            minUppercase: 1,
            minNumbers: 1,
            minSymbols: 1
        })

        if(!isPasswordOK){
            return res.status(400).json({message: 'Password must have 1 lower, 1 upper, 1 number, 1, symbol and muts be at least 6 characters long'})
        }

        const isEmailOK = validator.isEmail(email)

        if(!isEmailOK){
            return res.status(400).json({message: 'You must be provide a valid email'})
        }

    } catch (err) {
        return res.status(401).json({message: 'Not authorized, invalid token', error: err.message})
    }
}