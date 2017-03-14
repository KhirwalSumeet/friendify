var request=require('request');
var async=require('async');
var friendsApi="http://localhost:3000/api/get/friends";
var distanceApi="http://localhost:3000/api/calculate/distance";
var response= {};

/* Load error code */

var fs = require('fs');
var jsonPath = './data/messages.json';
fs.readFile(jsonPath, 'utf8', function (err, data) {
	if (err){
		throw err;
  	}
	message = JSON.parse(data);
});

exports.data=function (req, res, done) {

	/* Fetching office Coordinates from post data if specified*/

	var officeCoordinates={};
	officeCoordinates["manual"]=0;
	if(req.body.latitude && req.body.longitude){
		officeCoordinates["latitude"]=req.body.latitude;
		officeCoordinates["longitude"]=req.body.longitude;
		officeCoordinates["manual"]=1;
		if(isNaN(parseFloat(officeCoordinates["latitude"])) || isNaN(parseFloat(officeCoordinates["longitude"]))){
			response["message"]=message["496"];
			response["status"]=496;
			response["data"]="";
			res.send(response);
			return;
		}
	}	

	/* Range in which we have to search for friends */

	if(req.body.range){
		range=req.body.range;
		if(isNaN(parseFloat(range))){
			response["message"]=message["495"];
			response["status"]=495;
			response["data"]="";
			res.send(response);
			return;
		}
	}else{

		/* Throw error if range is not specified */

		response["message"]=message["491"];
		response["status"]=491;
		res.send(response);
		return;
	}
	async.waterfall([
        function(callback) {

        	/* Fetching friendlist from the friends api */

        	var friends;
        	request(friendsApi, function (error, response, body) {
				if (!error && response.statusCode == 200) {
					friends=body;
            		callback(null, friends);
				}
			});
        },        
        function(friends, callback) {
        	/* Calculating distances of each friend from the office ( in Kms ) */
        	getDistance(officeCoordinates,friends,callback);
        },
        function(friendsList, callback) {
        	if(range>=0){

        		/* if range is zero then all friends will be shown */
        		if(range)
	        		data=getFriendsWithinRange(friendsList,range);
	        	else
	        		data=friendsList;
	        	response["message"]=message["200"];
	        	response["status"]=200;
	        	response["data"]=data;
	        	res.send(response);
        	}else{
        		response["message"]=message["492"];
	        	response["status"]=492;
        	}
        }
    ], done);
	
};

function getDistance(officeCoordinates,data,callback){
	data=JSON.parse(data);
	var i=0;

	// using recursive function as request is asynchronous
	apiCallDistance(i);
	function apiCallDistance(i){
		if(i<data.length){
			request.post(distanceApi,
				{form : { "latitude": data[i]["latitude"] , "longitude":data[i]["longitude"] , "officeCoordinates":officeCoordinates}},
				function (error, response, body) {
				if (!error && response.statusCode == 200) {
					body=JSON.parse(body);
					data[i]["distance"]=body["data"];
					apiCallDistance(++i);
            		
				}
			});
		}else{
			callback(null, data);
		}
	}
}

function getFriendsWithinRange(friendsList,range){
	range=parseInt(range);

	/* Eliminating friends out of range */
	var withinRange=[];
	for(i=0;i<friendsList.length;i++){
		if(friendsList[i]["distance"]<=range)
			withinRange.push(friendsList[i]);
	}

	/* Sorting friends by their distance from office */
	withinRange.sort(function(a, b) {
	    return a["distance"] - b["distance"];
	});
	return withinRange;
}