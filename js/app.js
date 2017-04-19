angular.module('BurritoApp', ['ngRoute', 'RouteControllers', 'UserService', 'angular-storage', 'loginDirective', 'ui.bootstrap']); //
 
angular.module('BurritoApp').config(function($routeProvider) {

    $routeProvider.when('/', {
        templateUrl: 'templates/home.html',
        controller: 'HomeController'
    })

    $routeProvider.when('/contact', {
        templateUrl: 'templates/contact.html',
        controller: 'ContactController'
    })

    $routeProvider.when('/discount', {
        templateUrl: 'templates/discount_code.html',
        controller: 'HomeController'
    })

    $routeProvider.when('/register', {
        templateUrl: 'templates/register.html',
        controller: 'RegisterController'
    })

    .when('/todo/edit/:id', {
        templateUrl:'templates/edit-book.html',
        controller: 'EditTodoController'
    })

    $routeProvider.when('/login', {
        templateUrl: 'templates/login.html',
        controller: 'LoginController'
    })

    $routeProvider.when('/logout', {
        templateUrl: 'templates/home.html',
        controller: 'LogoutController'
    })


    $routeProvider.when('/book', {
        templateUrl: 'templates/book.html',
        controller: 'BookController'
    })


    $routeProvider.when('/menu', {
    	templateUrl: 'templates/menu.html',
    	controller: 'MenuController'
    })

    $routeProvider.when('/menu_discount', {
        templateUrl: 'templates/menu_discount.html',
        controller: 'MenuController'
    });
});