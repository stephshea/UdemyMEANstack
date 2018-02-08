var express = require('express');
var router = express.Router();

var ctrlHotels = require('../controllers/hotels.controllers.js');
var ctrlReviews = require('../controllers/reviews.controllers.js');

router
  .route('/hotels')
  .get(ctrlHotels.hotelsGetAll)
  .post(ctrlHotels.hotelsAddOne);
    
router
    .route('/hotels/:hotelId')
    //creating a url route for data
    .get(ctrlHotels.hotelsGetOne);
    

//Review routes
router
  .route('/hotels/:hotelId/reviews')
  .get(ctrlReviews.reviewsGetAll)
  .post(ctrlReviews.reviewsAddOne);
  
router
    .route('/hotels/:hotelId/reviews/:reviewId')
    //creating a url route for data
    .get(ctrlReviews.reviewsGetOne);
    

module.exports = router;