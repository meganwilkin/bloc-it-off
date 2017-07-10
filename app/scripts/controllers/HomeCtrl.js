(function() {
    function HomeCtrl($scope, Task) {
      this.tasks = Task.all;

      this.filteredTasks = function () {
        var filtered = [];
        angular.forEach(this.tasks, function(taskToCheck) {
          if (this.showPriority(taskToCheck) && this.showStatus(taskToCheck)) {
            filtered.push(taskToCheck);
          }
        });
        return filtered;
      }

      // add scope
      $scope.addTask = function() {
        Task.addTask($scope.taskName, $scope.taskPriority);
        $scope.taskText = "";
        $scope.showAddTask = false;
      }

      $scope.cancelAddTask = function() {
        $scope.addTask = "";
        $scope.showAddTask = false;
      }

      $scope.cancelCurrentTask = function(task) {
        // console.log(task);
        Task.removeTask(task.$id);
      }

      $scope.completeCurrentTask = function(task) {
        Task.completeTask(task.$id);
        // console.log('hello complete');
      }

      $scope.taskStatus = function(task) {
        return Task.taskStatus(task);
      }

      $scope.isExpiring = function(task) {
        return Task.isExpiring(task);
      }

      $scope.isExpired = function(task) {
        return Task.isExpired(task);
      }

      $scope.taskPriority = "High";

      $scope.setPriority = function(priority) {
        $scope.taskPriority = priority;
      }

      $scope.showAddTask = false;

      $scope.showHighPriority = true;
      $scope.showMediumPriority = true;
      $scope.showLowPriority = true;

      $scope.showCurrentTasks = true;
      $scope.showCompletedTasks = true;
      $scope.showExpiredTasks = true;

      showPriority = function (task){
        // Lets check the priority filter here
        if (task.priority == "High" && $scope.showHighPriority == true) {
          return true;
        }

        if (task.priority == "Medium" && $scope.showMediumPriority == true) {
          return true;
        }

        if (task.priority == "Low" && $scope.showLowPriority == true) {
          return true;
        }

        return false;
      }

      showStatus = function (task){
        // Lets check the priority filter here
        if (task.isCompleted == true && $scope.showCompletedTasks == true) {
          return true;
        }

        if (Task.isExpired(task) && $scope.showExpiredTasks == true) {
          return true;
        }

        if (task.isCompleted == false && !Task.isExpired(task) && $scope.showCurrentTasks == true) {
          return true;
        }

        return false;
      }


    }

    angular
        .module('blocItOff')
        .controller('HomeCtrl',['$scope', 'Task', HomeCtrl]);
})();
