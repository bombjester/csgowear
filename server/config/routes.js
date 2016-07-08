var server_controller = require("./../controllers/server_controller.js");

module.exports = function(app){
	app.post('/get_name', function(req,res){
		server_controller.get_name(req,res);
	})
	app.get('/do', function(req,res){
		server_controller.script(req,res);
	})
	app.get('/getwear/:id', function(req,res){
		server_controller.getwear(req,res);
	})
	app.post('/add_message', function(req,res){
		server_controller.add_message(req,res);
	})
	app.get('/get_message', function(req,res){
		server_controller.get_message(req,res);
	})
}






