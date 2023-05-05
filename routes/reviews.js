const express = require("express")
const reviewsMdware = require('../middlewares/reviews.mdware')
const fs = require("fs")

const router = express.Router({mergeParams: true})
const filePath = "books.json"

router.get('/', (req, res) => {
    const bookId = req.params.bookId

    const content = fs.readFileSync(filePath,"utf8")
    const books = JSON.parse(content)
    const book = books.find(it => it.id == bookId)

    res.json(book.reviews)
})

router.post('/', reviewsMdware.checkBody, (req, res) => {
    const bookId = req.params.bookId
    let content = fs.readFileSync(filePath,"utf8")
    const books = JSON.parse(content)
    const book = books.find(it => it.id == bookId)

    const id = Math.max(...book.reviews.map(it => it.id))
    let review = req.body
    review.id = !id ? 1 : id + 1

    book.reviews.push(review)
    content = JSON.stringify(books)

    fs.writeFileSync(filePath, content)
    res.send(review)
})

router.delete('/:reviewId', (req, res) => {
    const bookId = req.params.bookId
    const reviewId = req.params.reviewId

    let content = fs.readFileSync(filePath,"utf8")
    const books = JSON.parse(content)
    const book = books.find(it => it.id == bookId)

    const index = book.reviews.findIndex(it => it.id == reviewId)
    if(index > -1){
        const review = book.reviews.splice(index, 1)
        content = JSON.stringify(books)
        fs.writeFileSync(filePath, content)
        res.send(review)
    } else res.status(404).send("Review doesn't exist")
})

module.exports = router