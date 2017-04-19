angular.module('loginDirective',[]).directive('account', function() {
  return {
    restrict: 'EA',    // EA -> element/attribute
    controller: 'NavController',
            link: function(scope){
              var templateToUse = 'templates/directives/login.html';
              if (scope.account == 'user') {
                templateToUse = 'templates/directives/user.html';
              } else if (scope.account == 'login') {
                templateToUse = 'templates/directives/login.html';
              } // etc.
              scope.myTemplate = templateToUse;
            },
            template: "<div ng-include='myTemplate'></div>"
  };
});
