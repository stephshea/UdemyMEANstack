var dbconn = require('../data/dbconnection.js');
var ObjectId = require('mongodb').ObjectID;
var hotelData = require('../data/hotel-data.json');

module.exports.hotelsGetAll = function(request, response) {
    
    var db = dbconn.get();
    
    
    var offset = 0;
    var count = 5;
    
    var collection = db.collection('hotels');
    
    if(request.query && request.query.offset){
        offset = parseInt(request.query.offset, 10);
        //because queries come in a string, have to use parseInt
    }
    
    if(request.query && request.query.count){
        count = parseInt(request.query.count, 10);
        //because queries come in a string, have to use parseInt
    } 
    
    collection
        .find()
        .skip(offset)
        .limit(count)
        .toArray(function(err, docs){
       console.log("Found hotels", docs.length);
    response
        .status(200)
        .json(docs);   
    });
    
};      

module.exports.hotelsGetOne = function(request, response) {
    var db = dbconn.get();
    var hotelId = request.params.hotelId;
    var collection = db.collection('hotels');

    console.log("GET hotelId", hotelId);
    
    collection
        .findOne({
            _id : ObjectId(hotelId)
        }, function(err, doc) {
            response
                .status(200)
                .json( doc );
        });
};  

module.exports.hotelsAddOne = function(req, res) {
    var db = dbconn.get();
    var collection = db.collection('hotels');
    var newHotel;
    
    console.log("POST new hotel");
    
    if (req.body && req.body.name && req.body.stars) {
        newHotel = req.body;
        newHotel.stars = parseInt(req.body.stars, 10);
  
    collection.insertOne(newHotel, function(err,response) {
        console.log(response);
        console.log(response.ops);
    res
            .status(201)
            .json(response.ops);
    });
            
} else {
    console.log("Data missing from body");
    res
            .status(400)
            .json( { message : "Required data missing from body" });
}
};