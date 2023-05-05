const createError = require('http-errors')

const checkBody = (req, res, next) => {
    if(!req.body) {
        next(createError(400, "Empty body"))
    }
    
    if(!req.body.comment) {
        next(createError(400, "Comment required"))
    }

    next()
}

module.exports.checkBody = checkBody