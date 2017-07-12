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
      timeRemaining: function(task){
        // Could be done using a filter too
        if (!this.isExpired(task) && !task.isCompleted) {
          var timeDifference = (task.createdAt + 8640000 * 7) - (Date.now());
          if (timeDifference > 8640000) {
            var days = Math.floor(timeDifference / 8640000);
            if (days > 1) {
              return days + " days";
            } else {
              return days + " day";
            }
          }
          else {
            var milliseconds = parseInt((timeDifference%1000)/100)
                , seconds = parseInt((timeDifference/1000)%60)
                , minutes = parseInt((timeDifference/(1000*60))%60)
                , hours = parseInt((timeDifference/(1000*60*60))%24);

            // hours = (hours < 10) ? "0" + hours : hours;
            // minutes = (minutes < 10) ? "0" + minutes : minutes;
            // seconds = (seconds < 10) ? "0" + seconds : seconds;

            return hours + " hrs " + minutes + " mins";
          }
        }
        return "";

      },

      all: tasks
        // add: addTask
    }
  }

  angular
    .module('blocItOff')
    .factory('Task', ['$firebaseArray', Task]);
})();
