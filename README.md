# Friendify

This project aims to search for the nearby friends based on the office location and specified range.

## Getting Started 

### Prerequisites

#### Install the stable or latest version of Node.js and npm 

```
sudo apt install nodejs npm

npm --version
3.10.10

node --version 
v6.9.3
```
#### For Production

```
npm install -g forever
```

##### Note: This npm package is used to restart server whenever it crashes. It is of utmost importance that server must stay up while in production mode.

In some distributions Node.js and npm are a little bit outdated,<br />
you can use npm itself to update Node.js and npm to the latest versions.

```
sudo npm install -g npm 
sudo npm install -g n
```
```
sudo n stable
or 
sudo n latest
```

### Setup

```
git clone https://gitlab.com/KhirwalSumeet/solution2.git 
cd solution2
npm install
```

### Run
```
npm start
```
The server is now up at http://localhost:3000/ by default, see your terminal for details.

### Available Features

In the Postman, you can run:

```
GET: http://localhost:3000/api/get/friends
```

This api endpoint will return a json object containing all the friends list.

```
POST: http://localhost:3000/api/calculate/distance
```

We have to send urlencoded form data with following fields : 
- latitude
- longitude 
- officeCoordinates.

Office coordinates is optional and we can set a default value in models/distance.js.
Default office coordinates are : 12.9611159,77.6362214 and can be changed in models/distance.js.
However, we can send office coordinates as of our choice.

```
POST: http://localhost:3000/api/get/nearbyFriends (Type : POST)
```

We have to send urlencoded form data with following fields : 
- latitude (of office , these 2 fields are optional)
- longitude (of office , these 2 fields are optional) 
- range.

If range is 0 , then the above returns all of the friends present in our database.
If range is negative, we get an error.
If range is positive , we get friendlist in a sorted order.

We can also send office coordinates monually as latitude and longitude field.

Note: Postman scripts are present in solution/postman folder
Note: MVC layout was generated using yeoman express generator.

### Errors

```
Code   :  Message
-------------------------
200    :  Api Query Successful
491    :  Please send range along with request
492    :  Please enter a valid range
493    :  Please make sure you have sent both latitude and longitude.
494    :  Please make sure you have sent correct latitude and longitude.
495    :  Please enter a valid range.
496    :  Please make sure you have sent correct latitude and longitude of your office.
```
Note: Error Messages can be changed in data/messages.json but error codes are fixed.

### Testing
```
npm install -g mocha
```
##### Running Tests :
```
mocha test/test.js 
```
### Reference :

To calculate distance, I used haversine formula : 
```
(φ1,λ1) and (φ2,λ2) are the co-ordinates of 2 locations.
Δφ=φ1-φ2
Δλ=λ1-λ2
a = sin²(Δφ/2) + cos φ1 ⋅ cos φ2 ⋅ sin²(Δλ/2)
c = 2 ⋅ atan2( √a, √(1−a) )
d = R ⋅ c
```
#### Link : http://www.movable-type.co.uk/scripts/latlong.html

### Snapshots

```
Snapshots of the above projects has been captured from Postman and pasted in snaps folder.
```