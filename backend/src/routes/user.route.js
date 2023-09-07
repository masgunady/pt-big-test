const userRouter = require('express').Router()
const userController = require('../controllers/user.controller')
const authMiddleware = require('../middlewares/auth.middleware')

userRouter.get('/', authMiddleware, userController.getAllUser)

module.exports = userRouter