var mongoose = require('mongoose');
// require file-system so that we can load, read, require all of the model files
var fs = require('fs');
// connect to the database
// mongoose.connect('admin:password@ds235785.mlab.com:35785/csgowear');
mongoose.connect('mongodb://admin:password@csgowear-shard-00-00.tkay1.mongodb.net:27017,csgowear-shard-00-01.tkay1.mongodb.net:27017,csgowear-shard-00-02.tkay1.mongodb.net:27017/csgowear?ssl=true&replicaSet=atlas-dlw34z-shard-0&authSource=admin&retryWrites=true&w=majority');
// specify the path to all of the models
var models_path = __dirname + '/../models'
// read all of the files in the models_path and for each one check if it is a javascript file before requiring it
fs.readdirSync(models_path).forEach(function(file) {
  if(file.indexOf('.js') > 0) {
    require(models_path + '/' + file);
  }
})
