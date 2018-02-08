var mongoose = require('mongoose');
var Hotel = mongoose.model('Hotel');

//GET all reviews for a hotel
module.exports.reviewsGetAll = function(req, res) {
        var id = req.params.hotelId;
    console.log("GET hotelId", id);
    
    Hotel
        .findById(id)
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
            res
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
    //in mongoose subdocuments like reviews are held in an array
    hotel.reviews.push({
        //sending the review object
        name: req.body.name,
        rating: parseInt(req.body.rating, 10),
        review: req.body.review
    });
    
    hotel.save(function(error, hotelUpdated) {
        //save runs on model instance, in this case model is 'hotel'
      if(error) {
          res
            .status(500)
            .json(error)
      } else {
          res
            .status(200)
            .json(hotelUpdated.reviews[hotelUpdated.reviews.length-1]);
            //getting the last review
      }
        
    });
    
};

module.exports.reviewsAddOne = function(req, res) {
        var id = req.params.hotelId;
        // var reviewId = req.params.reviewId; 
    console.log("POST review to hotelId", id);
    
    Hotel
        .findById(id)
        .select('reviews')
        
        .exec(function(error, doc) {
            //doc returns here
            var response = {
                status: 200,
                message: doc
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
