/**
 *
 **/
var express = require('express');
var app = new express();
var bodyParser = require('body-parser');
var bookId = 100;

function findBook(id){
	//console.log('id: ' + id);
	for(var i=0; i<books.length; i++){
		//console.log('books[' + i + ']: ' + books[i]);
		if(books[i].id === id){
			return books[i];
		}
	}
	return null;
}
function removeBook(id){
	var bookIndex = 0;
	for(var i=0; i<books.length; i++){
		if(books[i].id === id){
			bookIndex = i;
		}
	}
	books.splice(bookIndex, 1);
}
var allowCrossDomain = function(req, response, next){
	response.header('Access-Control-Allow-Origin', "http://127.0.0.1:8080");
	response.header('Access-Control-Allow-Methods', 'OPTIONS,GET,PUT,POST,DELETE');
	response.header('Access-Control-Allow-Headers', 'Content-Type');
	if('OPTIONS' == req.method){
		response.send(200);
	} else {
		next();
	}
};

//app.configure(function(){
//	app.use(express.bodyParser());
//	app.use(allowCrossDomain);
//});
app.use(allowCrossDomain);
app.use(bodyParser());

var books = [
	{id: 98, author: 'Stephen King', title: 'The Shining', year: 1977},
	{id: 99, author: 'George Orwell', title: 1949}
];

app.get('/books', function(request, response){
	response.header('Access-Control-Alllow-Origin', '*');
	console.log('In GET function ');
	response.json(books);
});

app.get('/books/:id', function(request, response){
	response.header('Access-Control-Allow-Origin', '*');
	console.log('Getting a book with id ' + request.params.id);
	var book = findBook(parseInt(request.params.id, 10));
	if(book === null){
		response.send(404);
	} else {
		response.json(book)
	}
});

app.post('/books/', function(request, response){
	response.header('Access-Control-Alllow-Origin', '*');
	var book = request.body;
	console.log('Saving book with the following structure ' + JSON.stringigy(book));
	book.id = bookId++;
	book.push(book);
	response.json(book);
});

app.post('/books/:id', function(request, response){
	response.header('Access-Control-Allow-Origin', '*');
	var book = request.body;
	console.log('Updating Book ' + JSON.stringify(book));
	var currentBook = findBook(parseInt(request.params.id, 10));
	if(currentBook === null){
		response.send(404);
	} else {
		//Bookをローカルに保存
		currentBook.title = book.title;
		currentBook.year = book.year;
		currentBook.author = book.author;
		response.json(book);
	}
});

app.delete('/books/:id', function(request, response){
	console.log('calling delete');
	response.header('Access-Control-Allow-Origin', '*');
	var book = findBook(parseInt(request.params.id, 10));
	if(book === null){
		console.log('Could not find book');
		response.send(404);
	} else {
		console.log('Deleting ' + request.params.id);
		removeBook(parseInt(request.params.id, 10));
		response.send(200);
	}
});

app.listen(80);

//node server.js