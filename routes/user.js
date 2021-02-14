const express = require('express')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const router = express.Router()

//MongoDB Model
const User = require('../models/User')
const Post = require('../models/Post')

//Validation Import
const { registerValidation, loginValidation } = require('../validation')

// Route Register User
router.post('./register', async(req, res) => {
    // Validate User 
    const { error } = registerValidation(req.body)
    if (error) return res.status(400).send(error.details[0].message)

    //Check if User  already exists in database
    const emailExist = await User.findOne({ email: req.body.email })
    if (emailExist) return res.status(400).send('Email already exists')

    //Hash password
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(req.body.password, salt)

    //Validate and create User

    const user = new User({
        name = req.body.name,
        email = req.body.email,
        password = hashedPassword

    })

    try {
        const savedUser = await user.save()
        res.json({ name: user.name, email: user.email })
    } catch (err) {
        res.json({ message: err })
    }
})

//Route Login User
router.post('/login', async(req, res) => {
    const { error } = loginValidation(req.body)
    if (error) return res.status(400).send(error.detail[0].message)

    //Check if email exists
    const user = await User.findOne({ email: req.body.email })
    if (!user) return res.status(400).send('Email does not exist')

    //Check password
    const validPass = await bcrypt.compare(req.body.password, user.password)
    if (!validPass) return res.status(400).send('Invalid Password')

    //Create & assing token
    const token = jwt.sign({ _id: user._id }, process.env.TOKEN_SECRET)
    res.header('auth-token', token).send(token)
})

//Route Delete User
router.delete('/:uid/only', async(req, res) => {
    try {
        const removedUser = await User.remove({ _id: req.params.uid })
        res.json(removedUser)
    } catch (err) {
        res.json({ message: err })
    }
})

router.delete('/:uid/all', async(req, res) => {
    try {
        const removedUser = await User.remove({ _id: req.params.uid, get: req.body })
        const removedPosts = await Post.deleteMany({ userID: req.params.uid })
        res.json(removedUser)
        res.json(removedPosts)
    } catch (err) {
        res.json({ message: err })
    }
})

module.exports = router