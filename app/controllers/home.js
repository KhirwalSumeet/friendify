var express = require('express'),
	router = express.Router(),
	friendsList = require('../models/friendsList'),
	distance = require('../models/distance'),
	nearbyFriends = require('../models/nearbyFriends');

module.exports = function (app) {
  app.use('/', router);
};

/* To fetch the friendlist from a json file */

router.get('/api/get/friends',friendsList.data);

/* To calculate distance between 2 positions */

router.post('/api/calculate/distance',distance.calculate);

/* To get list of nearby friends by filtering data obtained from friends and distance api */

router.post('/api/get/nearbyFriends',nearbyFriends.data);