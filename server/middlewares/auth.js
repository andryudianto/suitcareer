const jwt = require('jsonwebtoken')
const createError = require('http-errors')
const { User, Ticket } = require('../models')


module.exports = class Auth{
    static authentication(req, res, next) {
        try {
            const decoded = jwt.verify(req.headers.access_token, 'mswingsfour')
            if (!decoded) {
                throw createError(400, 'invalid authentication')
            }

            User.findByPk(decoded.id)
            .then(user => {
                if (!user){
                    throw createError(400, 'invalid authentication')
                }
                req.decoded = decoded
                next()
            })
        } catch (error) {
          next(error)  
        }
    }

    static checkQuotaTicket(req, res, next) {
        const { cart } = req.body
        try {
            for(let i = 0; i < cart.length; i++) {
                Ticket.findByPk({
                    where: {
                        id: cart[i].TicketId
                    }
                })
                .then(ticket => {
                    if (!ticket) {
                        throw createError(404, 'not found')
                    }
                    if(ticket.quota < 1) {
                        throw createError(400, `quota is ${ticket.quota}`)
                    }
                    if (ticket.quota < cart[i].quantity) {
                        throw createError(400, `quota is ${ticket.quota}`)
                    }
    
                })
            }
            next()
        } catch (error) {
            next(error)
        }
    }
}