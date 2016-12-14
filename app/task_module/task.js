/**
 * Created by BinodNepali on 11/25/2016.
 */

angular.module('taskOfEmp', ['ngRoute'])

    .config(['$routeProvider', function($routeProvider) {
        $routeProvider.when('/task', {
            templateUrl: 'task_module/task.html',
            controller: 'employeeTask'
        });
    }])
    .directive('myTaskDirective',[function () {
       return {
           templateUrl:'task_module/cust-dir-task.html'
       }
    }])
    .factory('taskFactory',[function () {
        var task={};
        var taskList=[
            {"taskID":1, "taskName":"Research","depID":2,"empID":[2,3],"completionDate":60},
            {"taskID":2, "taskName":"design","depID":3,"empID":[4,1],"completionDate":20},
            {"taskID":3, "taskName":"program","depID":1,"empID":[2,1],"completionDate":30},
            {"taskID":4, "taskName":"test","depID":4,"empID":[3,4],"completionDate":15},
        ];
        task.Data=taskList;
        //to check whether task is already in the task list
        task.taskNameExist= function taskNameExist (taskName) {
            for (var i=0;i<taskList.length;i++)
            {
                if (taskList[i].taskName==taskName)
                {
                    return true;
                }
            }
            return false;
        };
        //returns the index of selected taskname
        task.selectedIndex=function selectedIndex(taskID) {
            for (var i=0;i<taskList.length;i++)
            {
                if (taskList[i].taskID==taskID)
                {
                    return i;
                }
            }
            return -1;
        };

        return task;
    }])
    .controller('employeeTask', ['$scope','taskFactory',function($scope,taskFactory) {
        $scope.tasks=taskFactory.Data;

        $scope.addNewTask=function () {
            $scope.taskID=$scope.tasks.length+1;
            var taskExist=taskFactory.taskNameExist($scope.taskName)
            if(!taskExist) {
                var task = {
                    "taskID": $scope.taskID,
                    "taskName": $scope.taskName,
                    "completionDate": $scope.completionDate
                }
                $scope.tasks.push(task);
                $scope.taskID = "";
                $scope.taskName = "";
                $scope.completionDate = "";
            }
            else {
                window.alert("task name "+$scope.taskName+" already exist");
            }
        };

        $scope.removeTask=function (index) {
            var result=confirm("do you really wanna delete this??");
            if (result==true)
            {
                $scope.tasks.splice(index,1);
                var newTasklist=[];
                for (var i=0;i<$scope.tasks.length;i++)
                {
                    $scope.tasks[i].taskID=i+1;
                    newTasklist.push($scope.tasks[i]);
                }
                $scope.tasks=newTasklist;
            }
        }
        $scope.selectEdit=function (index) {
            var task=$scope.tasks[index];
            $scope.taskID=task.taskID;
            $scope.taskName=task.taskName;
            $scope.completionDate=task.completionDate;
        };
        $scope.save=function () {
            var index=taskFactory.selectedIndex($scope.taskID);
            $scope.tasks[index].taskName=$scope.taskName;
            $scope.tasks[index].completionDate=$scope.completionDate;
            $scope.taskName=null;
            $scope.completionDate=null;
        }
    }]);