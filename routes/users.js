var express = require('express')
var router = express.Router()

const User = require('../models/users')
const { checkBody } = require('../modules/checkBody')

router.post('/signup', (req, res) => {
    User.find({})
        .then(allUsersData => {
            if (!checkBody(req.body, ["name", "email", "password"])) {
                res.json({ result: false, error: 'Missing or empty fields' })
            } else if (allUsersData.some(e => e.email.toLowerCase() === req.body.email.toLowerCase())) {
                res.json({ result: false, error: 'User already exists' })
            } else {
                const newUser = new User({
                    name: req.body.name,
                    email: req.body.email,
                    password: req.body.password
                })
                newUser.save().then(newUserData => res.json({ result: true, newUser: newUserData }))
            }
        })
})


router.post('/signin', (req, res) => {
    User.find({})
        .then(allUserData => {
            if (!checkBody(req.body, ["email", "password"])) {
                res.json({ result: false, error: 'Missing or empty fields' })
            } else if ((!allUserData.some(e => e.email.toLowerCase() === req.body.email.toLowerCase() && e.password.toLowerCase() === req.body.password.toLowerCase()))) {
                res.json({ result: false, error: 'User not found' })
            } else {
                res.json({ result: true })
            }

        })
})

module.exports = router