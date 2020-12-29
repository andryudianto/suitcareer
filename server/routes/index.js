const router = require('express').Router()
const UserController = require('../controllers/UserController')
const TicketController = require('../controllers/TicketController')
const Auth = require('../middlewares/auth')

router.post('/register', UserController.register)
router.post('/login', UserController.login)
router.post('/event/create', TicketController.createEvent)
router.post('/location/create', TicketController.createLocation)
router.post('/event/ticket/create', TicketController.createTicket)
router.get('/event/get_info', TicketController.getEventIncludeLocationTicketData)
router.post('/transaction/purchase', Auth.authentication, TicketController.transactionPurchase)

module.exports = router