const asyncHandler = require('express-async-handler')
const bcrypt = require('bcryptjs')
const { models } = require('mongoose')
const jwt = require('jsonwebtoken')


const User = require('../models/userModel')

// @desc      Register a new user
// @route     /api/users
// @access    Public
const registerUser = asyncHandler(async(req, res) => {
    const {name,email, password } = req.body

    // Validation
    if (!name || !email || !password) {
        res.status(400)
        throw new Error("Please include all fields")
    }

    // Find if user exist with email
    const checkUserExist = await User.findOne({email})
    if (checkUserExist) {
        res.status(400)
        throw new Error('user already exist')
    }

    // Hash user password
    const salt = await bcrypt.genSalt(10)
    const hashPassword = await bcrypt.hash(password, salt)


    // Create user and save to mongo DB
    const tempUser = { name, email, password: hashPassword}
    const user = await User.create(tempUser)

    if (user) {
        res.status(201).json({userId: user._id, name: user.name, email: user.email, token: createToken(user)})
    }
    else{
        res.status(400)
        throw new Error("Invalid user data")
    }

})

// @desc       Login a user
// @route      /api/users/
// @access     Public
const loginUser = asyncHandler(async(req, res) => {
    const { body: { email, password } } = req

    const user = await User.findOne({email: email})
    const comparePassword = await bcrypt.compare(password, user.password);

    // Check user and password match
    if (user && comparePassword) {
        res.status(200).json({ userId: user._id, name: user.name, email: user.email, token: createToken(user)})
    }
    else{
        res.status(401)
        throw new Error("Invalid credentials")
    }

})

// @desc       Get current user
// @route      /api/users/getMe
// @access     Private
const getMe = asyncHandler(async(req, res) => {
    res.status(200).json(req.user) 

})

const createToken = (user) => {
    return jwt.sign({userId: user._id, name: user.name}, process.env.JWT_SECRET, {expiresIn: "30d"})
}


module.exports ={
    loginUser,
    registerUser,
    getMe
}