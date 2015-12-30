(function () {
  angular.module('like.voting').directive('votingQuestions', function () {
    return {
      restrict: 'E',
      templateUrl: 'app/templates/votingDirective/votingQuestions.html',
      controller: function ($scope, dataService, QuestionFactory, $animate, $location) {

        $scope.vote = {};

        $scope.allTraits = QuestionFactory.allTraits;

        $scope.curQuestionIndex = 0;
        $scope.curQuestion = {};

        $scope.showQuestion = function () {
          if ($scope.curQuestionIndex < $scope.allTraits.length){
            $scope.curQuestion = $scope.allTraits[$scope.curQuestionIndex];
            $scope.curQuestionIndex++;
            $scope.show = true;
          } else {
            $scope.show = false;
          }
        };
        //as soon as the voting page is load it should load the first question
        $scope.showQuestion();

        $scope.redo = function () {
          $scope.curQuestionIndex = 0;
          $scope.showQuestion();
        };

        $scope.choose = function (trait) {
          var curQuestion = $scope.curQuestion;
          $scope.vote[curQuestion.leftDBName] = 0;
          $scope.vote[curQuestion.rightDBName] = 0;
          $scope.vote[trait] = 1;
          $scope.showQuestion();
        };

        $scope.sendVotes = function (voteObj) {
          var data = {
            voteId: sessionStorage.getItem('targetUserId'),
            traits: voteObj
          };
          dataService.sendVotes(data);
          $location.path('/profile');
        };

      }//end of controller
    };
  }); 
})();
