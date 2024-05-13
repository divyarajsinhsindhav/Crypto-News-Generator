const express = require('express')
const router = express.Router()

const user = require('../controllers/user.controllers')
const genrator = require('../controllers/genrator.controllers')
const { authenticate } = require('../middleware/authantication')
const { validateLogin } = require('../middleware/validator')

router.get('/login', user.showLogin);
router.get('/register', user.showRegister);

router.get('/profile', authenticate, user.profile);

router.post('/register', user.register);
router.post('/login', validateLogin, user.login)
router.post('/logout', user.logout);

router.get('/genrator', authenticate, genrator.showGenrator)
router.post('/genrator', authenticate, genrator.genrateContent)

router.get('/history', authenticate, user.history)

router.get('/', (req, res) => {
    res.redirect('/genrator')
})

module.exports = router