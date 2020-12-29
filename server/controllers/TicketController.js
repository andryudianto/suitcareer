const { Event, Location, Ticket, UserTicket } = require('../models')

module.exports = class TicketController{
    static createLocation(req, res, next) {
        const { name } = req.body
        Location.create({
            name
        })
        .then(location => {
            res.status(201).json(location)
        })
        .catch(err => {
            next(err)
        })
    }

    static createEvent(req, res, next) {
        const { name, start, end, LocationId } = req.body

        Event.create({
            name, start, end, LocationId
        })
        .then(event => {
            res.status(201).json(event)
        })
        .catch(err => {
            next(err)
        })
    }

    static createTicket(req, res, next) {
        const { typeTicket, price, quota, EventId } = req.body
        Ticket.create({
            typeTicket, price, quota, EventId
        })
        .then(ticket => {
            res.status(201).json(ticket)
        })
        .catch(err => {
            next(err)
        })
    }

    static getEventIncludeLocationTicketData(req, res, next) {
        Event.findAll({
            include: [Ticket, Location]
        })
        .then(events => {
            res.status(200).json(events)
        })
        .catch(err => {
            next(err)
        })
    }

    static transactionPurchase(req, res, next) {
        const { UserId } = req.decoded.id
        const { cart } = req.body
        
        for (let i = 0; i < cart.length; i++){
            UserTicket.create({
                UserId,
                TicketId: cart[i].TicketId,
                quantity: cart[i].quantity
            })
            .then(() =>{ 
                return Ticket.decrement({
                    quota: cart[i].quantity
                }, {
                    where: {
                        id: cart[i].TicketId
                    }
                })
            })
            .then(ticket => {
                res.status(200).json({
                    message: 'checkout success'
                })
            })
            .catch(err => {
                next(err)
            })
        }
    }

    


}