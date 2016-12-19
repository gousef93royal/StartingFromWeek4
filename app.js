'use strict';

// Declare app level module which depends on views, and components
angular.module('myApp', [
  'ngRoute',
  'department',
    'Employees',
    'taskOfEmp',
    'dashboardModule',
  'myApp.version',
    'ui.bootstrap'
]).
config(['$locationProvider', '$routeProvider', function($locationProvider, $routeProvider) {
  $locationProvider.hashPrefix('!');

  //$routeProvider.otherwise({redirectTo: '/dep'});
}]).
 controller ('TabsCtrl',['$scope','$location',function ($scope, $location) {
    $scope.tabs = [
        { link : '#!/task', label : 'Task Module' },
        { link : '#!/dep', label : 'Departments Module' },
        { link : '#!/emp', label : 'Employees Module' },
        { link : '#!/dashboard', label : 'Dashboard Module' }
    ];

    $scope.selectedTab = $scope.tabs[0];
    $scope.setSelectedTab = function(tab) {
        $scope.selectedTab = tab;
    }

    $scope.tabClass = function(tab) {
        if ($scope.selectedTab == tab) {
            return "active";
        } else {
            return "";
        }
    }
}]);

// TabsCtrl($scope, $location) {

// }