(function () {
  'use strict';

  angular.module(['like'])
  .factory('dataService', ['$http', function ($http) {


    var words = {
            extroversion : 'Outgoing',
            introversion : 'Individualistic',
                thinking : 'Analytical',
                 feeling : 'Intuitive',
                planning : 'Orderly',
             spontaneous : 'Spontaneous',
                  leader : 'Inspiring',
                    doEr : 'Productive',
         approachability : 'Friendly',
                loneWolf : 'Individualistic',
      verbalCommunicator : 'Verbal',
      actionCommunicator : 'Non-verbal'
    };

    var makeSentence = function (userObj, traits) {
      
      traits = traits.map(function (trait) {
        return words[trait];
      });

      var str = traits.join(', ');
      if (traits.length > 1){
        str.replace(/ (?=\w+$)/, ' and');
      }

      var gender, article;

      if (traits.length) {
        gender = userObj.gender === 1 ? 'Guy' : 'Woman';
        article = /[AEIOU]/.test(str[0]) ? 'An ' : 'A ';
        return 'In General, People Know {{' + userObj.firstName + '}} as ' + article + str + ' type of ' + gender + '.';
      } else {
        gender = userObj.gender === 1 ? 'Him' : 'Her';
        return '{{' + userObj.firstName + ' is}} Such A Mystery Because Not Enough Data To Say Anything About ' + gender + ' Yet, Such A Mystery, Such A Mystery...';
      }
    };

    var getLogedInUserData = function (userId) {
      return $http({
        method: 'GET',
        url: '/api/profile/'
      })
      .then(function (data) {
        return data;
      });
    };

    var get3HighScoreTraits = function (votes) {
      var over3Points = Object.keys(votes);
      over3Points = over3Points.filter(function (traitName) {
        return votes[traitName] > 2;
      });
      over3Points = over3Points.sort(function (trait1, trait2) {
        return votes[trait2] > votes[trait1];
      });
      return over3Points.slice(0, 3);
    };


    var getUserData = function (userId, quickie) {
      var baseUrl = quickie ? '/api/quickPreview/' : '/api/profile/';
      var url = baseUrl + userId;
      console.log('the baseUrl:', url);
      return $http({
        method: 'GET',
        url: url
      }).then(function (data) {
        var top3Traits = data.data.vote ? get3HighScoreTraits(data.data.vote) : [];
        data.data.opinion = makeSentence(data.data,top3Traits, data.data.gender);
        return data;
      })
      .catch(function (data) {
        // var data = {data: {}};
        // data.data.opinion = 'Not Enough Data To Say Anything Yet, Such A Mystery...';
        var top3Traits = data.data.vote ? get3HighScoreTraits(data.data.vote) : [];
        data.data.opinion = makeSentence(data.data,top3Traits, data.data.gender);
        console.log('caught err', data);
        return data;
      });
    };

    var getAllUsers = function (region) {
      return $http({
        method: 'GET',
        url: '/api/users'
      })
      .then(function (data) {
        return data;
      });
    };

    var sendVotes = function (voteObj) {
      return $http({
        method: 'POST',
        url: '/api/profile/' + voteObj.voteId,
        data: voteObj.traits
      });
    };

    return {
      sendVotes: sendVotes,
      getLogedInUserData: getLogedInUserData,
      getUserData: getUserData,
      getAllUsers: getAllUsers
    };
  }]);
})();
