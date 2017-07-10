(function() {
  function Task($firebaseArray) {
      var ref = firebase.database().ref().child("tasks");
      var tasks = $firebaseArray(ref);

      //console.log(tasks);
    return {
      addTask: function(name) {
        console.log("clicked")
        console.log(name)
        var taskData = {
            name: name,
            isCompleted: false,
            createdAt: Date.now()
        };
        tasks.$add(taskData);

      },

      all: tasks
        // add: addTask
    }
  }

  angular
    .module('blocItOff')
    .factory('Task', ['$firebaseArray', Task]);
})();
