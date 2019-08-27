var mysql = require('mysql');


var con = mysql.createConnection({
	host: "restful-tutorial.000000000000.us-west-2.rds.amazonaws.com",
	user: "master",
	password: "putyourownpassword"
});


con.connect(function(err) {
	
	if (err) throw err;
	console.log("Connected!");

	con.query("CREATE DATABASE IF NOT EXISTS blog", function(err, result) {
	  
		if (err) throw err;
		console.log("Database created");


		var sql = "USE blog";
		con.query(sql, function(err, result) {
			
			var sql = "CREATE TABLE articles ( id INT NOT NULL AUTO_INCREMENT , title VARCHAR(100) NOT NULL , author VARCHAR(50) NOT NULL , body VARCHAR(1000) NOT NULL , url VARCHAR(200) NULL , PRIMARY KEY (id) )";
			con.query(sql, function(err, result) {
				
				if (err) throw err;
				console.log("Table created");
				
				con.end();
				
			});
			
		});

	});
  
});