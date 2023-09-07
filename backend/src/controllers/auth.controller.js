const {User, Profile} = require('../models')
const argon = require('argon2')
const jwt = require('jsonwebtoken')
const errorHandler = require('../helpers/errorHandler.helper')
const {APP_SECRET} = process.env
module.exports = {
    userRegister: async (req, res) => {
        try {
            const {email, username, fullName} = req.body
            const checkDuplicate = await User.findOne({
                where: {
                    email
                }
            })

            if(checkDuplicate){
                throw Error('duplicate_email')
            }

            const password = await argon.hash(req.body.password)
            const userData = {
                username,
                email,
                password
            }

            
            const data = await User.create(userData)

            if(req.file){
                req.body.picture = req.file.filename
            }

            const dataProfile = {
                userId: data.id,
                fullName,
                picture: req.body.picture
            }
            await Profile.create(dataProfile)


            const token = jwt.sign({
                id:data.id
            }, APP_SECRET)
            res.json({
                success: true,
                message: 'User Created',
                results: {token}
            })
        } catch (error) {
            return errorHandler(res, error)
        }
    },
    userLogin: async (req, res) => {
        try {
            const {username, password} = req.body
            const findUser = await User.findOne({
                where: {
                    username
                }
            })
            if(!findUser){
                throw Error('wrong_credentials')
            }

            const verify = await argon.verify(findUser.password, password)
            if(!verify){
                throw Error('wrong_credentials')
            }

            const token = jwt.sign({
                id:findUser.id
            }, APP_SECRET)

            return res.json({
                success: true,
                message: 'Login Success',
                results: {token}
            })
        } catch (error) {
            return errorHandler(res, error)
        }
    },
    getAllUser: async (req, res) => {
        try {
            const data = await User.findAll({
                include: [{
                    model: Profile,
                    attributes: ['fullName']
                }]
            })
            return res.json({
                success: true,
                message: 'Get All User',
                results: data
            })
        } catch (error) {
            return errorHandler(res, error)
        
        }
    }
}