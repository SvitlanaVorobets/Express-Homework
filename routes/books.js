const express = require("express")
const bookMdware = require('../middlewares/books.mdware')
const fs = require("fs")

const router = express.Router()
const filePath = "books.json"

router.get('/', (req, res) => {
    const content = fs.readFileSync(filePath,"utf8")
    const books = JSON.parse(content)
    res.json(books)
})

router.get('/:id', (req, res) => {
    const id = req.params.id
    const content = fs.readFileSync(filePath,"utf8")
    const books = JSON.parse(content)
    let book = null

    for(let item of books){
        if(item.id == id){
            book = item
            break
        }
    }

    if(book) res.send(book)
    else res.status(404).send("Book doesn't exist")
})

router.post('/', bookMdware.checkBody, (req, res) => {
    let content = fs.readFileSync(filePath,"utf8")
    const books = JSON.parse(content)

    const id = Math.max(...books.map(it => it.id))
    let book = req.body
    book.id = !id ? 1 : id + 1
    book.reviews = []

    books.push(book)
    content = JSON.stringify(books)

    fs.writeFileSync(filePath, content)
    res.send(book)
})

router.patch('/:id', bookMdware.checkBody, (req, res) => {
    const id = req.params.id
    let content = fs.readFileSync(filePath,"utf8")
    const books = JSON.parse(content)
    let book = null

    for(let item of books){
        if(item.id == id){
            book = item
            break
        }
    }

    if(book){
        book.title = req.body.title
        content = JSON.stringify(books)
        fs.writeFileSync(filePath, content)
        res.send(book)
    } else res.status(404).send("Book doesn't exist")
})

module.exports = router