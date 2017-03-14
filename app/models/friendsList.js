var fs = require('fs');
var jsonPath = './data/friends.json';
exports.data=function (req, res, next) {
	var friendsArray;
	fs.readFile(jsonPath, 'utf8', function (err, data) {
		if (err){
			throw err;
	  	}
		friendsArray = JSON.parse(data);
		res.send(friendsArray);
	});
};
