/* global angular*/
angular.module('meanhotel').controller('HotelController', HotelController);
//because no empty array, module becomes a getter

function HotelController($route, $routeParams, $window, hotelDataFactory) {
    var vm = this;
    var id = $routeParams.id;
    hotelDataFactory.hotelDisplay(id).then(function(response) {
      //console.log(response);
    //   vm.hotel = response.data;
    vm.hotel = response;
    vm.stars = _getStarRating(response.stars);
    });
    
    function _getStarRating(stars) {
        return new Array(stars);
    }

  vm.isLoggedIn = function() {
    if (AuthFactory.isLoggedIn) {
      return true;
    } else {
      return false;
    }
  };


vm.addReview = function() {
     var token = jwtHelper.decodeToken($window.sessionStorage.token);
    var username = token.username;
    
    var postData = {
        name: vm.name,
        rating: vm.rating,
        review: vm.review
    };
    if (vm.reviewForm.$valid) {
        hotelDataFactory.postReview(id, postData).then(function(response) {
            console.log(response.status);
            if(response.status===201) {
                $route.reload();
            }
        }).catch(function(error) {
            console.log(error);
        });
    } else {
        vm.isSubmitted = true;
    }    
  };
}

// function HotelController($http, $routeParams) {
//     var vm = this;
//     var id = $routeParams.id;
//     $http.get('api/hotels/' + id).then(function(response) {
//     vm.hotel = response;
    
//     });
    
// }