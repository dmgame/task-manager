import express from 'express';
import bodyParser from 'body-parser';


var http = require('http');
var fs = require('fs');


import * as db from './utils/DataBaseUtils.js';

//инициализация геттера таска
var Task = db.getTask();

db.setUpConnection();

const app = express();

app.use( bodyParser.json() );
app.use(express.static(__dirname + '/asset'));

// redirect route from '/' to '/rating'
app.get('/', (req, res) => {
	res.redirect('http://localhost:8080/login');
});

// login
app.get('/login', (req,res) => {
	res.status(200).sendFile(__dirname + '/login.html')
});


app.get('/task', (req,res) => {
    res.status(200).sendFile(__dirname + '/index.html')
});

app.post('/alltasks', (req, res) => {
	db.listTasks().then(data => res.send(data));
});

app.get('/edit', (req,res) => {
	res.status(200).sendFile(__dirname + '/edit.html');
});

app.post('/edit', (req,res) => {
	db.createTask(req.body).then(data => res.send(data));
});

// edit task
// app.put('/YOUR_ROUTE/:id', function(req, res){
//     Task.findOneAndUpdate({_id:req.params.id}, req.body, (err, task) => {
//         res.send(task);
//     });
// });
// //СНИЗУ АЯКС ЗАПРОС СО СТРАНИЦЫ YOUR_ROUTE. Поменять его на свой реальный роут, сделать тоже самое в пут запросе сверху
// //ПОТОМ УБРАТЬ АЯКС ЗАПРОС СО СТОРОНЫ СЕРВЕРА
// $.ajax({
//     data: JSON.stringify(data),
//     type: 'PUT',
//     contentType: 'application/json',
//     url: `http://localhost:8080/YOUR_ROUTE/${taskID}`,
//     success: function(data){
//         //какие-то действия при том если поменялось
//     },
//     error: function () {
// 		//какие-то действия при том если не поменялось
//     }
//
// });




// manager or teacher authentication check
app.post('/login', (req,res) => {
	db.searchUser(req.body.login).then(data => {
		if (data == null) {
			res.sendStatus(404);
		} else
			{
				if (req.body.login == data._doc.login && req.body.password == data._doc.password) {
				 	res.send(data);
				} else {
					res.sendStatus(404);
				};
			}
		});
});

const server = app.listen(8080, () => {
	console.log("Server is up and running on port 8080");
});
