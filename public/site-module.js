(function() {

  angular.module('algoSite', []);

  angular.module('algoSite')
    .controller('viewController',['$http', listViewController]);

  angular.module('algoSite')
    .directive('navbar', navbarDirective);

  angular.module('algoSite')
    .directive('assignmentCard', assignmentCardDirective);

  // TODO: filter to only display due dates if they are relevant (in the future)
  //angular.module('algoSite')
  //  .filter('dueDate', dueDateFilter);


  function listViewController($http) {
    var vm = this;

    vm.assignments = [];
    vm.articles = [];
    vm.notebooks = [];
    vm.people = [];
    vm.slides = [];

    activate();

    function activate() {
      call('assignments');
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

  function navbarDirective() {
    return {
      templateUrl: "partials/navbar.html"
    }
  }

  function assignmentCardDirective() {
    return {
      templateUrl: "partials/assignment.html"
    }
  }

  function dueDateFilter() {

  }

  angular.element(document).ready(function() {
    angular.bootstrap(document, ['algoSite']);
  });

}());

