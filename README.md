# UdemyMEANstack
I believe all functionality is working except

1. when logged in review does not post though terminal says:
POST /api/hotels/5a75ac5981b9d5df6f50562b/reviews
POST review to hotelId 5a75ac5981b9d5df6f50562b

2. FIXED when login with incorrect user or pw, server crashes
users.controller.js
User.findOne({
    username: username
  }).exec(function(err, user) {
    if (!user || !password) {
      //fixed from udemy code which was if(err)
