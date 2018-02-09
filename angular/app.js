angular.module('myApp', ['ngRoute']).config(config);
//array has dependency

function config($routeProvider) {
    $routeProvider.when('/', {
        templateUrl: 'main/main.html', 
        controller: "MainController",
        controllerAs: 'vm'
    }).when('/film/:id', {
        templateUrl:  'film/film.html',
        controller: "FilmController",
        controllerAs: 'vm'
    })    
    .otherwise({
        redirectTo: '/'
    });
}
//array for dependencies, if no dependencies, need empty array