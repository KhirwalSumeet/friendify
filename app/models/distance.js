/* Office coordinates */

var officeLat = 12.9611159;
var officeLong = 77.6362214;
officeLat = 22.6141657;
officeLong = 86.1622176;
var response={};

/* Load error code */

var fs = require('fs');
var jsonPath = './data/messages.json';
fs.readFile(jsonPath, 'utf8', function (err, data) {
	if (err){
		throw err;
  	}
	messages = JSON.parse(data);
});

/* Export the calculated distance */

exports.calculate=function (req, res, next) {
	if(req.body.latitude && req.body.longitude){
		var friendLat = parseInt(req.body.latitude);
		var friendLong = parseInt(req.body.longitude);
		// Validating latitude and longitude
		if(isNaN(parseFloat(friendLong)) || isNaN(parseFloat(friendLat))){
			response["message"]=messages["494"];
			response["status"]=494;
			response["data"]="";
			res.send(response);
			return;
		}
		if(req.body.officeCoordinates){
			if(parseInt(req.body.officeCoordinates.manual)){
				officeLat = parseInt(req.body.officeCoordinates.latitude);
				officeLong = parseInt(req.body.officeCoordinates.longitude);
				if(isNaN(parseFloat(officeLong)) || isNaN(parseFloat(officeLat))){
					response["message"]=messages["496"];
					response["status"]=496;
					response["data"]="";
					res.send(response);
					return;
				}
			}
		}
		var distance = getDistance(officeLat,officeLong,friendLat,friendLong);
		response["message"]=messages["200"];;
		response["status"]=200;
		response["data"]=distance.toString();
		res.send(response);
	}else{
		response["message"]=messages["493"];
		response["status"]=493;
		response["data"]="";
		res.send(response);
	}
};

/* Used haversine formula to calculate distance.
   Reference : http://www.movable-type.co.uk/scripts/latlong.html */

// Calculate distance using haversine formula

function getDistance(lat1,lon1,lat2,lon2) {
	var radius = 6371; // Radius of the earth in km
	var degLat = deg2rad(lat2-lat1);  // deg2rad below
	var degLon = deg2rad(lon2-lon1); 
	var a = Math.sin(degLat/2) * Math.sin(degLat/2) + Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) * Math.sin(degLon/2) * Math.sin(degLon/2) ;
	var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
	var distance = radius * c; // Distance in km
	return distance;
}

// Convert angle in degress to angle in radians

function deg2rad(deg) {
	return deg * (Math.PI/180);
}
