angular.module('RouteControllers', [])
    .controller('NavController', function($scope, store, $rootScope) {
        $scope.user = store.get('username');
        $scope.account = 'user';
        if (!store.get('authToken'))
            $scope.account = 'login';

    })
    .controller('HomeController', function($scope, store) {
        $scope.user = store.get('username');
        $scope.username = "Welcome, " + $scope.user;
        if (!store.get('authToken'))
            $scope.username = "Burrito Bar";
    })
    .controller('MenuController', function($scope, store, $location) {
        $scope.user = store.get('username');
        if (!store.get('authToken')) {
            $location.path("/menu");
        } else {
            $location.path("/menu_discount");
        }
    })
    .controller('RegisterController', function($scope, UserAPIService, store, $location) {
 
        $scope.registrationUser = {};
        var url = "https://morning-castle-91468.herokuapp.com/";
        $scope.loading = false;
        $scope.showing =  true;
        $scope.submitForm = function() {
            if ($scope.registrationForm.$valid) {
                $scope.registrationUser.username = $scope.user.username;
                $scope.registrationUser.password = $scope.user.password;
        $scope.loading = true;
        $scope.showing = false;
                UserAPIService.callAPI(url + "accounts/register/", $scope.registrationUser).then(function(results) {
                    $scope.data = results.data;
                    if ($scope.data.username == $scope.registrationUser.username && $scope.data.password == $scope.registrationUser.password){
                        alert("You have successfully registered to Burrito Bar");
        $scope.loading = false;
        $scope.showing = true;
                        UserAPIService.callAPI(url + "accounts/api-token-auth/", $scope.data).then(function(results) {
                            $scope.token = results.data.token;
                            store.set('username', $scope.registrationUser.username);
                            store.set('authToken', $scope.token);
                            window.location.href = "/";
                        }).catch(function(err) {
                            console.log(err);
                        });
                    }
                }).catch(function(err) {
                    console.log(err)
                    alert("That email address already exists. Try again!")
                });
            }
        }
    })
    .controller('LoginController', function($scope, $location, $route, UserAPIService, store, $window) {
        var url = "https://morning-castle-91468.herokuapp.com/";

        $scope.loginUser = {};

        $scope.submitForm = function() {
            if ($scope.loginForm.$valid) {
                $scope.loginUser.username = $scope.user.username;
                $scope.loginUser.password = $scope.user.password;
                alert("Logging in!");

                UserAPIService.callAPI(url + "accounts/api-token-auth/", $scope.loginUser).then(function(results) {
                    $scope.token = results.data.token;
                    store.set('username', $scope.loginUser.username);
                    store.set('authToken', $scope.token);
                    
                    window.location.href = "/";

                }).catch(function(err) {
                    console.log(err);
                    alert("Your email or password is incorrect, try again!")
                });
            }
        };
    })
    .controller('LogoutController', function(store, $window) {
        store.remove('username');
        store.remove('authToken');
        alert("Logging out!");

        window.location.href = "/";
    })
    .controller('BookController', function($scope, store, $location) {
        $scope.submit = function() {
            if  ($scope.bookingForm.$valid) {
                $scope.heading = "Booking confirmation"
                $scope.message = "Thankyou " + $scope.firstname + ",";
                $scope.message2 = "Your booking is confirmed for:";
                $scope.g = "" + $scope.guests + " guest(s) ";
                $scope.t = "Time: " + $scope.time + "";
                $scope.d = "Date: " + $scope.date + "";
                $scope.modal = "btn btn-success";
                $scope.modal_message = "OK";
            } else {
                $scope.heading = "Oops, something's not right!"
                $scope.message2 = "Please make sure the form is completed and try again..."
                $scope.modal = "btn btn-danger";
                $scope.modal_message = "Close";
            }
        }
    });    