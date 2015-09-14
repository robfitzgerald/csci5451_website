(function() {

  angular.module('algoSite', []);

  angular.module('algoSite')
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

  angular.element(document).ready(function() {
    angular.bootstrap(document, ['algoSite']);
  });

}());

