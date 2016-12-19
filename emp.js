/**
 * Created by Yousuf on 12/12/2016.
 */
var emp = angular.module('Employees', ['ngRoute']);

emp.config(['$routeProvider', function($routeProvider) {
    $routeProvider.when('/emp', {
        templateUrl: 'emp_module/emp.html',
        controller: 'myEmp'
    });
}]);
emp.directive('myEmpDirective',[function () {
    return {
        templateUrl:'emp_module/cust-dir-emp.html'
    }
}]);
emp.factory('empFactory',[function () {
    var employee={};
    //creating employee list
    var empList=[
        {"empID":1, "empName":"Binod Nepali","depID":3,"empEmail":"b.nepali@student.fontys.nl","empCountry":"Nepal"},
        {"empID":2, "empName":"Yousuf Al Harrasi","depID":1,"empEmail":"a.harrasi@student.fontys.nl","empCountry":"Omia"},
        {"empID":3, "empName":"Yog Chaudhary","depID":2,"empEmail":"y.chaudhary@student.fontys.nl","empCountry":"Nepal"},
        {"empID":4, "empName":"S.R Giri","depID":4,"empEmail":"r.giri@student.fontys.nl","empCountry":"Nepal"},
    ];
    employee.Data=empList;
    //to check whether employee is already in the employee list
    employee.empNameExist=function empNameExist (empName) {
        for (var i=0;i<empList.length;i++)
        {
            if (empList[i].empName==empName)
            {
                return true;
            }
        }
        return false;
    }
    //returns the index of selected taskname
    employee.selectedIndex=function selectedIndex(empID) {
        for (var i=0;i<empList.length;i++)
        {
            if (empList[i].empID==empID)
            {
                return i;
            }
        }
        return -1;
    }
    return employee;
}])
emp.controller('myEmp',['$scope','empFactory',function($scope,empFactory) {
    $scope.employees=empFactory.Data;

    $scope.addEmp=function () {
        $scope.empID=$scope.employees.length+1;
        var empExist=empFactory.empNameExist($scope.empName)
        if(!empExist) {
            var emp = {
                "empID": $scope.empID,
                "empName": $scope.empName,
                "empEmail": $scope.empEmail,
                "empCountry":$scope.empCountry
            };
            $scope.employees.push(emp);
            $scope.empID = "";
            $scope.empName = "";
            $scope.empEmail = "";
            $scope.empCountry="";
        }
        else {
            window.alert("employee with name "+$scope.empName+" already exist");
        }
    }

    $scope.removeEmp=function (index) {
        var result=confirm("do you really wanna delete this??");
        if (result==true)
        {
            $scope.employees.splice(index,1);
            var newEmpList=[];
            for (var i=0;i<$scope.employees.length;i++)
            {
                $scope.employees[i].empID=i+1;
                newEmpList.push($scope.employees[i]);
            }
            $scope.tasks=newEmpList;
        }
    }

    $scope.selectEdit=function (index) {
        var emp=$scope.employees[index];
        $scope.empID = emp.empID;
        $scope.empName = emp.empName;
        $scope.empEmail = emp.empEmail;
        $scope.empCountry=emp.empCountry;
    };

    $scope.save=function () {
        var index=empFactory.selectedIndex($scope.empID);
        $scope.employees[index].empName=$scope.empName;
        $scope.employees[index].empEmail=$scope.empEmail;
        $scope.employees[index].empCountry=$scope.empCountry;
        $scope.empID = "";
        $scope.empName = "";
        $scope.empEmail = "";
        $scope.empCountry="";
    }
}]);
