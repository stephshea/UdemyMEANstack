angular.module('myApp').controller(FilmController', FilmController);


//because no empty array, module becomes a getter
function FilmController($routeParams, FilmFactory()){
    var vm = this;
    var id = $routeParams.id;
   FilmFactory(.getOneFilm(id).then(function(response) {
        vm.films= response;
    });
}