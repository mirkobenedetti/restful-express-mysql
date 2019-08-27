const express = require('express')
const app = express();


var mysql = require('mysql');


var db = {
	host: "restful-tutorial.000000000000.us-west-2.rds.amazonaws.com",
	user: "master",
	password: "putyourownpassword",
	database: "blog"
}


app.post('/end-point', (req, res) => {
	
	var con = mysql.createConnection(db);
	
	con.connect(function(err) {
		
		if (err) throw err;
		console.log("Connected!");

		var title = req.param('title');
		var author = req.param('author');
		var body = req.param('body');
		var url = req.param('url');

		var sql = "INSERT INTO articles (title, author, body, url) VALUES ('" + title + "', '" + author + "', '" + body + "', '" + url + "')";
		con.query(sql, function (err, result) {
			if (err) throw err;
			res.send('Article Inserted.');
			con.end();
		});
		
	});
	
});


app.get('/end-point', (req, res) => {
	
	var con = mysql.createConnection(db);
	
	con.connect(function(err) {
		
		if (err) throw err;
		console.log("Connected!");

		var id = req.param('id');
		var where = id == 'all' ? '' : ' WHERE id = ' + id;
	  
		con.query("SELECT * FROM articles" + where, function (err, result, fields) {
			if (err) throw err;
			res.send(result);
			con.end();
		});
		
	});
	
});


app.put('/end-point', function (req, res) {
	
	var con = mysql.createConnection(db);
	
	con.connect(function(err) {

		if (err) throw err;
		console.log("Connected!");

		var id = req.param('id');

		var title = req.param('title');
		var author = req.param('author');
		var body = req.param('body');
		var url = req.param('url');
	  
		var sql = "UPDATE articles SET title = '" + title + "', author = '" + author + "', body = '" + body + "', url = '" + url + "' WHERE id = " + id;
		con.query(sql, function (err, result) {
			if (err) throw err;
			res.send(result);
			con.end();
		});
	  
	});
	
});


app.delete('/end-point', function (req, res) {

	var con = mysql.createConnection(db);
	
	con.connect(function(err) {
		
		if (err) throw err;
		console.log("Connected!");
		
		var id = req.param('id');
		
		var sql = "DELETE FROM articles WHERE id = " + id;
		con.query(sql, function (err, result) {
			if (err) throw err;
			res.send(result);
			con.end();
		});
	
	});

});


app.listen(8000, () => {
	console.log('Example app listening on port 8000!')
});