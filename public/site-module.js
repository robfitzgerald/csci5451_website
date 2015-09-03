(function() {

  angular
    .module('site', [])
    .controller('viewController',['$http', listViewController]);

  function listViewController($http) {
    var vm = this;

    vm.assignments = [];
    vm.articles = [];
    vm.notebooks = [];
    vm.people = [];
    vm.slides = [];

    activate();

    function activate() {
      $http.get('/resources/assignments').then(function(res) { console.log('quick way') });
      call('assignments').then(function() { console.log('done getting assignments') });
      call('articles');
      call('notebooks');
      call('people');
      call('slides');
    }

    function call(endpoint) {
      return $http.get('/resources/' + endpoint)
        .then(function(res) {
          console.log(res.data);
          vm[endpoint] = res.data;
        })
    }
  }

}());

