(function () {
  angular.module('like.voting').directive('votingQuestions', function () {
    return {
      restrict: 'E',
      templateUrl: 'app/templates/votingDirective/votingQuestions.html',
      controller: function ($scope, dataService, QuestionFactory) {
        $scope.animate = false;

        $scope.voteRecords = {
          voteId: 1,
          traits:{ 
            Extroversion: 1
          }
        };

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
          $scope.voteRecords.traits = {};
          $scope.curQuestionIndex = 0;
          $scope.showQuestion();
        };

        $scope.animate = {on: false};

        $scope.choose = function (trait) {
          $scope.animate.on = false;
          $scope.animate.on = true;
          var curQuestion = $scope.curQuestion;
          $scope.voteRecords.traits[curQuestion.leftName] = 0;
          $scope.voteRecords.traits[curQuestion.rightName] = 0;
          $scope.voteRecords.traits[trait] = 1;
          $scope.showQuestion();
        };

        $scope.sendVotes = function (voteObj) {
          dataService.sendVotes(voteObj);
          $scope.goToProfile();
        };

      }//end of controller
    };
  }); 
})();
