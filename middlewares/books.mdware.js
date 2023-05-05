const createError = require('http-errors')

const checkBody = (req, res, next) => {
    if(!req.body) {
        next(createError(400, "Empty body"))
    }

    if(!req.body.title) {
        next(createError(400, "Title required"))
    }

    next()
}

module.exports.checkBody = checkBody