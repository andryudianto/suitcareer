const { User } = require('../models')
const bcryptjs = require('bcryptjs')
const jwt = require('jsonwebtoken')
const createError = require('http-errors')

module.exports = class UserController{
    static register(req, res, next) {
        const { name, email, password } = req.body
        User.create({
            name, email, password
        })
        .then(user => {
            res.status(201).json(user)
        })
        .catch(err => {
            next(err)
        })
    }

    static login(req, res, next) {
        const {email, password} = req.body
        User.findOne({
            where: {
                email
            }
        })
        .then(user => {
            if (!user) {
                throw createError(400, 'email / password wrong')
            }
            const valided = bcryptjs.compareSync(password, user.password)
            if (!valided) {
                throw createError(400, 'email / password wrong')
            }
            const access_token = jwt.sign({
                id: user.id,
                email: user.email,
                name: user.name
            }, 'mswingsfour')
            res.status(200).json(access_token)
        })
        .catch(err => {
            next(err)
        })
    }
}