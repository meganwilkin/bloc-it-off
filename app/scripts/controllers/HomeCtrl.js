(function() {
    function HomeCtrl($scope, Task) {
      this.tasks = Task.all;
      // add scope
      $scope.addTask = function() {
        Task.addTask($scope.taskText);
        $scope.taskText = "";

      }

      // this.addTask = Task.addTask
    }

    angular
        .module('blocItOff')
        .controller('HomeCtrl',['$scope', 'Task', HomeCtrl]);
})();
