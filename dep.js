/**
 * Created by BinodNepali on 11/25/2016.
 */

angular.module('department', ['ngRoute'])

    .config(['$routeProvider', function($routeProvider) {
        $routeProvider.when('/dep', {
            templateUrl: 'dep_module/dep.html',
            controller: 'mydepartment'
        });
    }])
    .directive('myDepDirective',[function () {
        return {
            templateUrl:'dep_module/cust-dir-dep.html'
        }
    }])
    .factory('depFactory',[function () {
        var department={};
        var departmentList=[
            {"depID":1,"depName":"Researcher","empID":[1,4,3],"roomNumber":45,"phone":3602858300},
            {"depID":2,"depName":"Designer","empID":[2,3],"roomNumber":50,"phone":3602858310},
            {"depID":3,"depName":"Developer","empID":[4,1],"roomNumber":23,"phone":3602888300},
            {"depID":4,"depName":"Tester","empID":[1,2],"roomNumber":21,"phone":3602868300},
        ];
        department.Data=departmentList;
        //to check whether department is already exist
       department.depNameExist=function depNameExist (depName) {
            for (var i=0;i<departmentList.length;i++)
            {
                if (departmentList[i].depName==depName)
                {
                    return true;
                }
            }
            return false;
        }
        //return the index of select department name
       department.selectedIndex=function selectedIndex(depID) {
            for (var i=0;i<departmentList.length;i++)
            {
                if (departmentList[i].depID==depID)
                {
                    return i;
                }
            }
            return -1;
        }

        return department;
    }])
    .controller('mydepartment', ['$scope','depFactory',function($scope,depFactory) {
        $scope.departments=depFactory.Data;

        $scope.selectEdit=function (index) {
            var dep=$scope.departments[index];
            $scope.depID=dep.depID;
            $scope.depName=dep.depName;
            $scope.roomNumber=dep.roomNumber;
            $scope.phone=dep.phone;
        }

        $scope.addNewDep=function () {
        $scope.depID=$scope.departments.length+1;
        var depExist=depFactory.depNameExist($scope.depName);
        if(!depExist) {

            var dep = {
                "depID": $scope.depID,
                "depName": $scope.depName,
                "roomNumber": $scope.roomNumber,
                "phone": $scope.phone
            }
            $scope.departments.push(dep);
            $scope.depName = "";
            $scope.roomNumber="";
            $scope.phone = "";
        }
        else
        {
            window.alert("department name "+$scope.depName+" already exist");
        }

    };
        $scope.save=function () {
            var index=depFactory.selectedIndex($scope.depID);
            $scope.departments[index].depName=$scope.depName;
            $scope.departments[index].roomNumber=$scope.roomNumber
            $scope.departments[index].phone=$scope.phone;

            $scope.depName=null;
            $scope.roomNumber=null;
            $scope.phone=null;

        }

        $scope.removeDepartment=function (index) {
        var result=confirm("do you really wanna delete this??");
        if (result==true)
        {
            $scope.departments.splice(index,1);
            var newDepList=[];
            for (var i=0;i<$scope.departments.length;i++)
            {
                $scope.departments[i].depID=i+1;
                newDepList.push($scope.departments[i]);
            }
            $scope.departments=newDepList;
        }
    }
}]);