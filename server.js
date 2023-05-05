const express = require("express");
const morgan = require('morgan')

const app = express()
const port = 3000
app.use(morgan('dev'))

const booksRouter = require('./routes/books')
const reviewsRouter = require('./routes/reviews')

app.use(express.json())
app.use('/books', booksRouter)
app.use('/books/:bookId/reviews', reviewsRouter)

app.use((err, req, res, next) => {
    res.status(err.status).send(err)
})

app.listen(port, () => {
    console.log(`Server is listening on port - ${port}`)
})
