var request = require('request');
var mongoose = require('mongoose');
var Items = mongoose.model("items");
var Messages = mongoose.model("messages");
var Skins = require('./../skins/skins.js');
var Paints = require('./../skins/paint_kit.js');
var Inv = require('./../skins/getinventory.js');
module.exports = (function() {
	return{

		get_name: function(req,res){
			
			
			var getpics = function(steamid){

				request("http://steamcommunity.com/profiles/"+ steamid + "/inventory/json/730/2", function(error, response, profiles){
				
					
					if (profiles[11] == "t"){
						var result = JSON.parse(profiles);
						res.json(result.rgDescriptions);
					}
					else if(profiles[11] == "f"){
						
						res.json("Account is Private");
					}
					else{
						res.json("Could not find account!");
					}
				})

			}
			
			
			var checkallnumbers = function(input){
				var checker = 0;

				for( var i = 0; i<= input.length; i ++){
					if(input[i] == "0" || input[i] == "1" || input[i] == "2" || input[i] == "3" || input[i] == "4" || input[i] == "5" || input[i] == "6" || input[i] == "7" || input[i] == "8" || input[i] == "9"){
						checker +=1;
					}
				}
				if(checker == input.length){
					return true;
				}
				else{
					return false;
				}
			}
			

//CHECK INPUT IF ID OR VANITY URL
			if(typeof req.body.name =="undefined"){
				res.json("Account name cannot be empty!");
			}
			else{
				if (checkallnumbers(req.body.name) == false){
				request("http://api.steampowered.com/ISteamUser/ResolveVanityURL/v0001/?key=F00F3C8ACC7B2184ED92B79D5CDB893A&vanityurl=" + req.body.name, function (error, response, body){
						var result = JSON.parse(body);
						if(result.response.success ==1){
							getpics(result.response.steamid);
							//getinventory(result.response.steamid);

						}
						else{

							res.json("Could not find account!");
								
						}
					})
 				}

	 			else{
	 				getpics(req.body.name);
	 			}
			}			
//ENDED CHECK





		},

		script: function(req,res){
			
		},
		getwear: function(req,res){
			var skinsarray = [];
			var weapons = [];
			var paintsarray = [];
			var weararray = [];
			var finalarray= [];
			var conditionarray = [];
			var rangearray = [];

			var checkallnumbers = function(input){
				var checker = 0;

				for( var i = 0; i<= input.length; i ++){
					if(input[i] == "0" || input[i] == "1" || input[i] == "2" || input[i] == "3" || input[i] == "4" || input[i] == "5" || input[i] == "6" || input[i] == "7" || input[i] == "8" || input[i] == "9"){
						checker +=1;
					}
				}
				if(checker == input.length){
					return true;
				}
				else{
					return false;
				}
			}

			var isEmpty = function(object) {
				  for(var key in object) {
				    if(object.hasOwnProperty(key)){
				      return false;
				    }
				  }
				  return true;
				}
			var getinventory = function(steamid){
			
				Items.find({}, function(err, names){
	 				if (err){
	 					console.log("error finding DB");
	 				}
	 				else{
						
						request("http://api.steampowered.com/IEconItems_730/GetPlayerItems/v0001/?key=F00F3C8ACC7B2184ED92B79D5CDB893A&SteamID="+steamid, function(error, responses, bodyz){
							
				 			var inventory = JSON.parse(bodyz);
				 			//var inventory = Inv;
				 			
				 			if (isEmpty(inventory)){
				 				res.json("api down");
				 			}
				 			else{

				 				
					 			for(x in inventory.result.items){

					 				for(y in names){
					 					if (inventory.result.items[x].defindex == names[y].defindex){
					 						
					 						weapons.push(names[y].name);
					 						//console.log(names[y].name,inventory.result.items[x].attributes[0].float_value);
					 						if(inventory.result.items[x].attributes[0].float_value % 1 != 0){
					 							inventory.result.items[x].attributes[0].float_value = 0;
					 							inventory.result.items[x].attributes[2].float_value = "No value for default";
												
					 						}
					 						//console.log(inventory.result.items[x].attributes[0].float_value);
					 						for (z in Skins){
					 							

					 							if (Skins[z].defindex == inventory.result.items[x].attributes[0].float_value){
					 								
					 								skinsarray.push(Skins[z].description_tag);
					 								weararray.push(inventory.result.items[x].attributes[2].float_value);
					 								
					 							}
					 							
					 						}

					 						
					 						
					 						
					 					}
					 				}
					 					
					 			}

					 			for (cs in skinsarray){
					 				var pushed = false;
					 				//console.log(skinsarray[cs]);
					 				for(asdf in Paints){
					 					//console.log(Object.keys(Paints[asdf])[0]);
					 					//console.log(Paints[1].PaintKit_Default_Tag);
					 					if (skinsarray[cs] == Object.keys(Paints[asdf])[0]){

					 						
					 						for (foo in Paints[asdf]){
					 							//console.log(Paints[asdf][foo]);
					 							paintsarray.push(Paints[asdf][foo]);
					 							pushed = true;
					 						}
					 						
					 					}
					 				}
					 				if (pushed == false){
					 					console.log(skinsarray[cs]);
					 					paintsarray.push("Can't find skin");
					 				}

					 			}

					 			for (index1 in weararray){
					 				if(weararray[index1] >= .44){
					 					conditionarray.push("Battle-Scarred");
					 					rangearray.push(".44-1.00");
					 				}
					 				else if (weararray[index1] >= .37){
					 					conditionarray.push("Well-Worn");
					 					rangearray.push(".37-.44");
					 				}
					 				else if (weararray[index1] >= .15){
					 					conditionarray.push("Field-Tested");
					 					rangearray.push(".15-.37");
					 				}
					 				else if (weararray[index1] >= .07){
					 					conditionarray.push("Minimal-Wear");
					 					rangearray.push(".07-.15");
					 				}
					 				else{
					 					conditionarray.push("Factory-New");
					 					rangearray.push(".00-.07");
					 				}
					 			}
					 			console.log(weapons.length, skinsarray.length, paintsarray.length, weararray.length);
					 			for (index in weapons){
					 				finalarray.push({weapon: weapons[index], skin: paintsarray[index], wear: weararray[index], condition: conditionarray[index], range: rangearray[index]});
					 			}
					 			
								res.json(finalarray);
					 		}
				 			
									 			
									 			

									 			

						})
					}		
				})
			}
			if (checkallnumbers(req.params.id) == false){
				request("http://api.steampowered.com/ISteamUser/ResolveVanityURL/v0001/?key=F00F3C8ACC7B2184ED92B79D5CDB893A&vanityurl=" + req.params.id, function (error, response, body){
						var result = JSON.parse(body);

						if(result.response.success ==1){

							getinventory(result.response.steamid);
	
						}
						else{

							res.json("Could not find account!");
								
						}
					})
			}
			else{
				getinventory(req.params.id);
			}


		},
		add_message: function(req,res){
			var message = new Messages({name: req.body.name, message: req.body.message});
			if(req.body.name == undefined || req.body.message == undefined){
				res.json("empty");
			}
			else if(req.body.name.length > 20 || req.body.message.length > 100){
				
				res.json("long");
			}
			else{
				console.log(req.body.name.length);
				message.save(function(err,result){
					if(err){
						console.log("error adding to db");
					}
					else{
						res.json(result);
					}
				})
			}
		},

		get_message: function(req,res){
			Messages.find({}, function(err,result){
				if(err){
					console.log("error finding messages from db");
				}
				else{
					res.json(result);
				}
			})
		},




	}

})();