var mongoose = require('mongoose');

var ItemsSchema = new mongoose.Schema({
	defindex: Number,
	name: String
}) 
var MessageSchema = new mongoose.Schema({
	name: String,
	message: String
})

mongoose.model('messages', MessageSchema);
mongoose.model('items', ItemsSchema);
