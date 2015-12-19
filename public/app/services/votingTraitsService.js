(function () {
  angular.module('like.voting').factory('QuestionFactory', function(){

    var trait1 = {
      leftName: 'Extroversion',
      leftSubtitle: 'Out Going Like An API',
      leftPic: 'socialLeft.svg',
      rightName: 'Introversion',
      rightSubtitle: 'Meow-Low, Doing My Thing',
      rightPic: 'socialRight.svg'
    };

    var trait2 = {
      leftName: 'Thinking',
      leftSubtitle: 'Let Me Read Error Log, First',
      leftPic: 'thinking.svg',
      rightName: 'Feeling',
      rightSubtitle: 'Yeah The Bug Is Probably Here',
      rightPic: 'feeling.svg'
    };

    var trait3 = {
      leftName: 'Planning',
      leftSubtitle: "Let's Plan Out The Entire App First",
      leftPic: 'planning.png',
      rightName: 'Spontaneous',
      rightSubtitle: "Let's Change Things As We Go",
      rightPic: 'Spontaneous.png'
    };

    var trait4 = {
      leftName: 'Sensing',
      leftSubtitle: 'Backbone Is Stupid! Just Read The Source Code!',
      leftPic: 'sensing.png',
      rightName: 'Intuition',
      rightSubtitle: 'Backbone Is Stupid! It Is So Complicated!',
      rightPic: 'Intuition.png'
    };

    var trait5 = {
      leftName: 'Leadership',
      leftSubtitle: 'Everybody Chill! I Got The Vision!',
      leftPic: 'leaderLeft.svg',
      rightName: '',
      rightSubtitle: 'I Actually Bring Vision To Life!',
      rightPic: 'leaderRight.svg'
    };

    var trait6 = {
      leftName: 'Emotionality',
      leftSubtitle: "My Emotion Shouldn't not Be Your Problem",
      leftPic: 'EmotionalityLeft.svg',
      rightName: '',
      rightSubtitle: 'Experience Your Emotions At Full Range',
      rightPic: 'EmotionalityRight.svg'
    };

    // var trait7 = {
    //   leftName: 'Punctuality',
    //   leftSubtitle: 'Pin Point On Time, Pronto!',
    //   leftPic: '',
    //   rightName: '',
    //   rightSubtitle: 'Life Goes At My Pace!',
    //   rightPic: ''
    // };

    var trait8 = {
      leftName: 'Cohesiveness',
      leftSubtitle: 'Together We Can Archive More',
      leftPic: 'CohesivenessLeft.svg',
      rightName: '',
      rightSubtitle: 'Do You Actually Like Team Programming?',
      rightPic: 'CohesivenessRight.svg'
    };

    // var trait9 = {
    //   leftName: 'Candidness',
    //   leftSubtitle: 'Sharing Is How We Learn',
    //   leftPic: '',
    //   rightName: '',
    //   rightSubtitle: 'Group Harmony is More Important Than Individual Expression',
    //   rightPic: ''
    // };

    var trait10 = {
      leftName: 'Approachability',
      leftSubtitle: 'Give Me All Your Problems, I Am Ready To Help',
      leftPic: 'ApproachabilityLeft.svg',
      rightName: '',
      rightSubtitle: 'To Save You Time: Sorry, I Am Kinda Busy All The Time',
      rightPic: 'ApproachabilityRight.svg'
    };

    var trait11 = {
      leftName: 'Communication',
      leftSubtitle: 'In My Pass Life, I Was Orator',
      leftPic: 'CommunicationLeft.png',
      rightName: '',
      rightSubtitle: 'In My Pass Life, I Was a Performance Artist',
      rightPic: 'CommunicationRight.png'
    };

    var trait12 = {
      leftName: 'Critique-ability',
      leftSubtitle: 'Give Me Your Worst Criticism, I Can Take It.',
      leftPic: 'CritiqueabilityLeft.png',
      rightName: '',
      rightSubtitle: 'We Are Only Human, We Should Be Nice To Each Other.',
      rightPic: 'CritiqueabilityRight.svg'
    };

    var allTraits = [
      trait1,
      trait2,
      trait3,
      trait4,
      trait5,
      trait6,
      // trait7,
      trait8,
      // trait9,
      trait10,
      trait11,
      trait12
    ];

    return {
      allTraits: allTraits
    };

  });
})();


