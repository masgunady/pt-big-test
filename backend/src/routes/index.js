const router = require('express').Router()

router.get('/', (req, res) => {
    return res.json({
        success: true,
        message: 'Backend is running well!'
    })
})


router.use('/auth', require('./auth.route'))
router.use('/user', require('./user.route'))


router.use('*', (request, response)=>{
    return response.status(404).json({
        success:false,
        message:'Resource not found'
    })
})

module.exports = router