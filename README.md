To start the server, run the command - npm start

Available endpoints:  
GET    | http://localhost:3000/books  
GET    | http://localhost:3000/books/1  
POST   | http://localhost:3000/books  
PATCH  | http://localhost:3000/books/1  
GET    | http://localhost:3000/books/1/reviews  
POST   | http://localhost:3000/books/1/reviews  
DELETE | http://localhost:3000/books/1/reviews/3  

To create or update a book, use this json because id and reviews (as empty array) are generated automatically:
  
{
    "title": "Eat, Pray, Love"
}

To create a review:  
{
    "comment": "Good"
}