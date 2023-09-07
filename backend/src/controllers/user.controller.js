const {User, Profile} = require('../models')
const errorHandler = require('../helpers/errorHandler.helper')

module.exports = {
    getAllUser: async (req, res) => {
        try {
            const {id} = req.user
            if(!id){
                throw Error('unauthorized')
            }
            const data = await User.findAll({
                attributes: ['username', 'email'],
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
