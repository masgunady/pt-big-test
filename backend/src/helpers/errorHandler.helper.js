const errorHandler = (response, err) => {

    if(err?.message?.includes('invalid input syntax for type integer')){
        return response.status(409).json({
            success: false,
            message: 'Invalid parameter!',
        })
    }
    if(err?.message?.includes('unauthorized')){
        return response.status(401).json({
            success: false,
            message: 'Unauthorized!',
        })
    }
    if(err?.message?.includes('wrong_credentials')){
        return response.status(401).json({
            success: false,
            message: 'wrong username or password!',
        })
    }
    if(err?.message?.includes('duplicate_email')){
        return response.status(401).json({
            success: false,
            message: 'email has been registered!',
        })
    }
    console.log(err)
    return response.status(500).json({
        success: false,
        message: 'Error: Internal server error!',
    })
}

module.exports = errorHandler 
