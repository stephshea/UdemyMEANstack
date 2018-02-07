var mongoose = require('mongoose');
var Hotel = mongoose.model('Hotel');

//GET all reviews for a hotel
module.exports.reviewsGetAll = function(request, response) {
        var hotelId = request.params.hotelId;
    console.log("GET hotelId", hotelId);
    
    Hotel
        .findById(hotelId)
        .select('reviews')
        .exec(function(error, doc) {
        var response = {
            status: 200,
            message : []
        };
        if (error) {
            console.log("Error finding hotel");
            response.status = 500;
            response.message = error;
        } else if(!doc) {
            console.log("Hotel id not found in database", id);
            response.status = 404;
            response.message = {
                "message" : "Hotel ID not found " + id
            };
            } else {
                response.message = doc.reviews ? doc.reviews : [];
            }
            response
                .status(response.status)
                .json(response.message);
            });
        };
        
//GET single review for a hotel
module.exports.reviewsGetOne = function(request, response) {
      var hotelId = request.params.hotelId;
      var reviewId = request.params.reviewId; 
    console.log("GET reviewId" + reviewId + " for hotels" + hotelId);
    
    Hotel
        .findById(hotelId)
        .select('reviews')
        .exec(function(error, hotel) {
            var response = {
                status: 200,
                message: {}
            };
            if (error) {
                console.log("Error finding hotel");
                response.status = 500;
                response.message = error;
            } else if(!hotel) {
                console.log("Hotel id not found in database", id);
                response.status = 404;
                response.message = {
                    "message" : "Hotel ID not found" + id
                };
            }   else {
                //GET the review
                response.message = hotel.reviews.id(reviewId);
                //If the review doesn't exist Mongoose returns null
            if (!response.message) {
                    response.status = 404;
                    response.message = {
                        "message" : "Review ID not found" + reviewId
                    };
                }
            }
            console.log("Returned doc", hotel);
            // var review = hotel.reviews.id(reviewId);
            response
                .status(response.status)
                .json( response.message );
        });
};

var _addReview = function(req, res, hotel) {
    hotel.reviews.push({
        name: req.body.name,
        rating: parseInt(req.body.rating, 10),
        review: req.body.review
    });
    
    hotel.save(function(error, hotelUpdated) {
      if(error) {
          res
            .status(500)
            .json(error)
      } else {
          res
            .status(201)
            .json(hotelUpdated.reviews[hotelUpdated.reviews.length-1]);
      }
        
    });
    
};

module.exports.reviewsAddOne = function(req, res) {
        var hotelId = req.params.hotelId;
        var reviewId = req.params.reviewId; 
    console.log("GET reviewId" + reviewId + " for hotels" + hotelId);
    
    Hotel
        .findById(hotelId)
        .select('reviews')
        .exec(function(error, hotel) {
            var response = {
                status: 200,
                message: {}
            };
            if (error) {
                console.log("Error finding hotel");
                response.status = 500;
                response.message = error;
            } else if(!doc) {
                console.log("Hotel id not found in database", id);
                response.status = 404;
                response.message = {
                    "message" : "Hotel ID not found" + id
                };
            }  
            if (doc) {
                _addReview(req,res,doc);
            } else {
                
            res
                .status(response.status)
                .json( response.message );
            }
        });
};
