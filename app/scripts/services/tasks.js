(function() {
  function Task($firebaseArray) {
      var ref = firebase.database().ref().child("tasks");
      var tasks = $firebaseArray(ref);

      //console.log(tasks);
    return {
      addTask: function(name,priority) {
        console.log("clicked")
        console.log(name)
        var taskData = {
            name: name,
            priority: priority,
            isCompleted: false,
            createdAt: Date.now()
        };
        tasks.$add(taskData);

      },
      removeTask: function(taskId) {
        var taskToRemove = ref.child(taskId);
        taskToRemove.remove();
      },
      completeTask: function(taskId) {
        var taskToComplete = ref.child(taskId);
        taskToComplete.update({
          isCompleted: true
        });
      },
      taskStatus: function(task){
        //console.log(task);
        if (task.isCompleted == true) {
          return "Completed";
        }

        if (this.isExpired(task)) {
          return "Expired";
        }

        if (this.isExpiring(task)) {
          return "Expiring";
        }

        return "Current";
      },
      isExpired: function(task){
        if (task.createdAt < Date.now() - (8640000 * 7) ) {
          return true;
        }
      },
      isExpiring: function(task){
        if (task.createdAt < Date.now() - (8640000) ) {
          return true;
        }
      },

      all: tasks
        // add: addTask
    }
  }

  angular
    .module('blocItOff')
    .factory('Task', ['$firebaseArray', Task]);
})();
