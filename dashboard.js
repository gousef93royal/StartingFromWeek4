/**
 * Created by BinodNepali on 12/13/2016.
 */
angular.module('dashboardModule',['ngRoute','taskOfEmp','Employees','department'])
    .config(['$routeProvider', function($routeProvider) {
        $routeProvider.when('/dashboard', {
            templateUrl: 'dashboard_module/dashboard.html',
            controller:'myDashboardCtrl'
        });
    }])
.controller('myDashboardCtrl',['$scope','taskFactory','empFactory','depFactory',function ($scope,taskFactory,empFactory,depFactory) {
    $scope.TaskInformation=taskFactory.Data;
    $scope.EmpInformation=empFactory.Data;
    $scope.DepInformation=depFactory.Data;
}]);