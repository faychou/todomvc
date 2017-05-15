/* ** 功能分析：
** 1、展示数据
** 2、添加任务数据
** 3、编辑任务数据
** 4、删除任务数据
** 5、切换单个任务状态
** 6、批量切换任务状态
** 7、清除已完成的功能
** 8、隐藏或显示清除按钮
** 9、显示未完成的任务数
** 10、切换不同状态任务的显示
** */

(function (angular) {
    'use strict';

    var app = angular.module('todos',[]);
    app.controller('todosControl',['$scope','$location','$window', function ($scope,$location,$window) {
        // 读取本地存储数据
        var arr = $window.localStorage.getItem('todos');
        var jsonArr = JSON.parse(arr||'[]');

        // 将生成的数据存储在本地
        $scope.storage = function () {
            var arr_arr = JSON.stringify($scope.tasks);
            $window.localStorage.setItem('todos',arr_arr);
        };

        // 功能1、展示数据
        $scope.tasks = jsonArr;

        // 功能2、添加任务数据
        $scope.add = function () {
            //不允许输入内容为空
            if(!$scope.newTask) {
                return;
            }

            //定义一个变量id记录当前新任务的id
            var id;
            if($scope.tasks.length <= 0) {
                // 如果任务集合为空，新任务id = 0；
                id = 0;
            } else {
                // 如果任务集合不为空，新任务id等于最后一个任务的id + 1
                id = $scope.tasks[$scope.tasks.length-1].id + 1;
            }
            $scope.tasks.push({name:$scope.newTask.trim(), completed:false, id:id});
            $scope.storage();
            $scope.newTask="";
        };

        // 功能3、编辑任务数据
        $scope.isEditing = -1;
        $scope.edit = function (id) {
            $scope.isEditing = id;
        };
        $scope.save = function () {
            $scope.storage();
            $scope.isEditing = -1;
        };

        // 功能4、删除任务数据
        $scope.remove = function (id) {
            for(var i = $scope.tasks.length - 1; i >= 0; i --) {
                if($scope.tasks[i].id == id) {
                    $scope.tasks.splice(i,1);
                    $scope.storage();
                    return;
                }
            }
            //$scope.tasks.splice(id,1)
        };

        // 功能5、切换单个任务状态
        $scope.toggleCompleted = function() {
            $scope.storage();
        }

        // 功能6、批量切换任务状态
        var status = true;
        $scope.toggleAll = function () {
            for(var i = 0; i < $scope.tasks.length; i ++) {
                $scope.tasks[i].completed = status;
            }
            $scope.storage();
            status = !status;
        };

        // 功能7、清除已完成的任务
        $scope.clearAll= function () {
            for(var i = $scope.tasks.length - 1; i >= 0; i --) {
                if($scope.tasks[i].completed) {
                    $scope.tasks.splice(i,1);
                }
            }
            $scope.storage();
        };
        // 功能8、隐藏或显示清除按钮
        $scope.isShow = function () {
            for(var i = $scope.tasks.length - 1; i >= 0; i --) {
                if($scope.tasks[i].completed) {
                    return true;
                }
            }
            return false;
        };

        // 功能9、显示未完成的任务数
        $scope.activeNum = function () {
            var count = 0;
            for(var i = $scope.tasks.length - 1; i >= 0; i --) {
                if(!$scope.tasks[i].completed){
                    count ++;
                }
            }
            return count;
        };

        // 功能10、切换不同状态任务的显示
        $scope.selectAll= function () {
           $scope.flag={}
        };
        $scope.selectActive= function () {
           $scope.flag={completed:false}
        };
        $scope.selectCompleted= function () {
           $scope.flag={completed:true}
        };
    }]);

})(angular);