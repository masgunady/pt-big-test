const authRouter = require('express').Router()
const authContorller = require('../controllers/auth.controller')
const uploadMiddleware = require('../middlewares/upload.middleware')

authRouter.post('/register', uploadMiddleware('picture'), authContorller.userRegister)
authRouter.post('/login', authContorller.userLogin)

module.exports = authRouter