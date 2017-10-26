var express = require("express");
var path= require('path');
var app = express();
var bodyParser = require("body-parser");
app.use(bodyParser.json());



require('./server/config/mongoose.js');
//WE NEED TO REQUIRE MONGOOSE BEFORE THE ROUTES!
require('./server/config/routes.js')(app);

app.use(express.static(path.join(__dirname, './client')));
app.use(express.static(path.join(__dirname, './client/static/css')));



var server = app.listen(process.env.PORT || 8000, function(){
	console.log("Connected to 8000");
})