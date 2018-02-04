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
    var id = request.params.hotelId;
    var collection = db.collection('hotels');

    console.log("GET hotelId", id);
    
    collection
        .findOne({
            _id : ObjectId(id)
        }, function(err, doc) {
            response
                .status(200)
                .json( doc );
        });
};  

module.exports.hotelsAddOne = function(request, response) {
    console.log("POST new hotel");
    console.log(request.body);
    response
            .status(200)
            .json(request.body);
}