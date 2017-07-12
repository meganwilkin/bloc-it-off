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

        var sortedFiltered = [];

        sortedFiltered = filtered.sort(this.sortArray);

        return sortedFiltered;
      }

      this.sortArray = function (a,b) {
        if ($scope.sortColumn == "taskName") {
          if (a.name.toUpperCase() < b.name.toUpperCase())
            return -1 * $scope.sortOrder;
            if (a.name.toUpperCase() > b.name.toUpperCase())
              return 1 * $scope.sortOrder;
        }

        if ($scope.sortColumn == "taskPriority") {
          if ($scope.priorityToNumber(a.priority) < $scope.priorityToNumber(b.priority))
            return -1 * $scope.sortOrder;
          if ($scope.priorityToNumber(a.priority) > $scope.priorityToNumber(b.priority))
              return 1 * $scope.sortOrder;
        }

        if ($scope.sortColumn == "taskStatus") {
          if ($scope.statusToNumber(Task.taskStatus(a)) < $scope.statusToNumber(Task.taskStatus(b)))
            return -1 * $scope.sortOrder;
          if ($scope.statusToNumber(Task.taskStatus(a)) > $scope.statusToNumber(Task.taskStatus(b)))
              return 1 * $scope.sortOrder;
        }

        if ($scope.sortColumn == "taskRemaining") {
          if ($scope.remainingToNumber(a) < $scope.remainingToNumber(b))
            return -1 * $scope.sortOrder;
          if ($scope.remainingToNumber(a) > $scope.remainingToNumber(b))
            return 1 * $scope.sortOrder;
        }

        return 0;
      }

      $scope.priorityToNumber = function(priority) {
        if (priority == "High")
          return 1;
        if (priority == "Medium")
          return 2;
        return 3;
      }

      $scope.statusToNumber = function(status) {
        if (status == "Expiring")
          return 1;
        if (status == "Current")
          return 2;
        if (status == "Completed")
          return 3;
        return 4;
      }

      $scope.remainingToNumber = function(task) {
        if (task.isCompleted == true) {
          return 0;
        }
        return task.createdAt;
      }

      $scope.sortColumn = "taskName";
      $scope.sortOrder = 1;

      $scope.sortBy = function(sortColumn) {
        if ($scope.sortColumn == sortColumn) {
          $scope.sortOrder = $scope.sortOrder * -1;
        }         else {
          $scope.sortColumn = sortColumn;
          $scope.sortOrder = 1;
        }

        //console.log($scope.sortColumn + ":" + $scope.sortOrder);
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

      $scope.timeRemaining = function(task) {
        return Task.timeRemaining(task);
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
