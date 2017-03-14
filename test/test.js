var chai = require('chai');
var chaiHttp = require('chai-http');
var server = require('../app');
var should = chai.should();
chai.use(chaiHttp);

it("Fetching friends list from data/friends.json", function(done) {
	console.log(" ");
	console.log("Testing Friends List API :");
	console.log(" ");
		chai.request(server)
		.get('/api/get/friends')
		.end(function(err, res){
			res.should.have.status(200);
			done();
	});
});

it("Distance calculation when friend's location is given", function(done) {
	console.log(" ");
	console.log("Testing Distance Calculation API :");
	console.log(" ");
		chai.request(server)
		.post('/api/calculate/distance')
		.send({'latitude': 22, 'longitude': 77})
		.end(function(err, res){
			res.body.should.have.status(200);
			done();
	});
});

it("Returned status code 493 when friend's location is not given", function(done) {
		chai.request(server)
		.post('/api/calculate/distance')
		.end(function(err, res){
			res.body.should.have.status(493);
			done();
	});
});

it("Distance calculation when friend's location is given and office location is not default ", function(done) {
		chai.request(server)
		.post('/api/calculate/distance')
		.send({'latitude': 22, 'longitude': 77, "officeCoordinates":{ "manual":1, "latitude": 22, "longitude": 78}})
		.end(function(err, res){
			res.body.should.have.status(200);
			done();
	});
});

it("Returned status code 494 when friend's location is invalid", function(done) {
		chai.request(server)
		.post('/api/calculate/distance')
		.send({'latitude': 22, 'longitude': "sat", "officeCoordinates":{ "manual":1, "latitude": 22, "longitude": 78}})
		.end(function(err, res){
			res.body.should.have.status(494);
			done();
	});
});

it("Returned status code 496 when manual office location is invalid", function(done) {
		chai.request(server)
		.post('/api/calculate/distance')
		.send({'latitude': 22, 'longitude': 77, "officeCoordinates":{ "manual":1, "latitude": "same", "longitude": 78}})
		.end(function(err, res){
			res.body.should.have.status(496);
			done();
	});
});

it("Fetching nearby friends with manual office location and range specified", function(done) {
		console.log(" ");
		console.log("Testing NearBy friends API :");
		console.log(" ");
		this.slow(500);
		chai.request(server)
		.post('/api/get/nearbyFriends')
		.send({range:'100', 'latitude': 22, 'longitude': 77})
		.end(function(err, res){
			res.body.should.have.status(200);
			done();
	});
});

it("Fetching nearby friends with default office location and range specified", function(done) {
  		this.slow(500);
		chai.request(server)
		.post('/api/get/nearbyFriends')
		.send({range:'100'})
		.end(function(err, res){
			res.body.should.have.status(200);
			done();
	});
});

it("Fetching nearby friends with default office location and invalid range", function(done) {
		chai.request(server)
		.post('/api/get/nearbyFriends')
		.send({range:'sum'})
		.end(function(err, res){
			res.body.should.have.status(495);
			done();
	});
});