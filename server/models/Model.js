var mongoose = require('mongoose');

var ItemsSchema = new mongoose.Schema({
	defindex: Number,
	name: String
}) 


mongoose.model('items', ItemsSchema);
