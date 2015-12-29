(function () {
  angular.module('like.voting').factory('QuestionFactory', function(){

    var trait1 = {
      leftDisplayName: 'Extroversion',
      leftDBName: 'extroversion',
      leftSubtitle: 'Out Going Like An API',
      leftPic: 'socialLeft.png',
      rightDisplayName: 'Introversion',
      rightDBName: 'introversion',
      rightSubtitle: 'Meow-Low, Doing My Thing',
      rightPic: 'socialRight.png'
    };

    var trait2 = {
      leftDisplayName: 'Thinking',
      leftDBName: 'thinking',
      leftSubtitle: 'Let Me Read Error Log, First',
      leftPic: 'thinking.png',
      rightDisplayName: 'Feeling',
      rightDBName: 'feeling',
      rightSubtitle: 'Yeah The Bug Is Probably Here',
      rightPic: 'feeling.png'
    };

    var trait3 = {
      leftDisplayName: 'Planning',
      leftDBName: 'planning',
      leftSubtitle: "Let's Plan Out The Entire App First",
      leftPic: 'planning.png',
      rightDisplayName: 'Spontaneous',
      rightDBName: 'spontaneous',
      rightSubtitle: "Let's Change Things As We Go",
      rightPic: 'Spontaneous.png'
    };

    // var trait4 = {
    //   leftDisplayName: 'Sensing',
    // leftDBName: '',
    //   leftSubtitle: 'Backbone Is Stupid! Just Read The Source Code!',
    //   leftPic: 'sensing.png',
    //   rightDisplayName: 'Intuition',
    // rightDBName: '',
    //   rightSubtitle: 'Backbone Is Stupid! It Is So Complicated!',
    //   rightPic: 'Intuition.png'
    // };

/////////////////////////////////////////////////////////////////////////////

    var trait5 = {
      leftDisplayName: 'Leader',
      leftDBName: 'leader',
      leftSubtitle: 'Everybody Chill! I Got The Vision!',
      leftPic: 'leaderLeft.png',
      rightDisplayName: 'Do-er',
      rightDBName: 'doEr',
      rightSubtitle: 'I Actually Bring Vision To Life!',
      rightPic: 'leaderRight.png'
    };  

    // var trait6 = {
    //   leftDisplayName: 'Emotionality',
    // leftDBName: '',
    //   leftSubtitle: "My Emotion Shouldn't not Be Your Problem",
    //   leftPic: 'EmotionalityLeft.svg',
    //   rightDisplayName: '',
    // rightDBName: '',
    //   rightSubtitle: 'Experience Your Emotions At Full Range',
    //   rightPic: 'EmotionalityRight.svg'
    // };

    // var trait7 = {
    //   leftDisplayName: 'Punctuality',
    // leftDBName: '',
    //   leftSubtitle: 'Pin Point On Time, Pronto!',
    //   leftPic: '',
    //   rightDisplayName: '',
    // rightDBName: '',
    //   rightSubtitle: 'Life Goes At My Pace!',
    //   rightPic: ''
    // };

    // var trait8 = {
    //   leftDisplayName: 'Cohesiveness',
    // leftDBName: '',
    //   leftSubtitle: 'Together We Can Archive More',
    //   leftPic: 'CohesivenessLeft.svg',
    //   rightDisplayName: '',
    // rightDBName: '',
    //   rightSubtitle: 'Do You Actually Like Team Programming?',
    //   rightPic: 'CohesivenessRight.svg'
    // };

    // var trait9 = {
    //   leftDisplayName: 'Candidness',
    // leftDBName: '',
    //   leftSubtitle: 'Sharing Is How We Learn',
    //   leftPic: '',
    //   rightDisplayName: '',
    // rightDBName: '',
    //   rightSubtitle: 'Group Harmony is More Important Than Individual Expression',
    //   rightPic: ''
    // };

    var trait10 = {
      leftDisplayName: 'Approachability',
      leftDBName: 'approachabilityz',
      leftSubtitle: 'Give Me All Your Problems, I Am Ready To Help',
      leftPic: 'ApproachabilityLeft.png',
      rightDisplayName: 'Lone Wolf',
      rightDBName: 'loneWolf',
      rightSubtitle: 'To Save You Time: Sorry, I Am Kinda Busy All The Time',
      rightPic: 'ApproachabilityRight.png'
    };

    var trait11 = {
      leftDisplayName: 'Verbal communicator',
      leftDBName: 'verbalCommunicator',
      leftSubtitle: 'In My Pass Life, I Was Orator',
      leftPic: 'CommunicationLeft.png',
      rightDisplayName: 'Action Communicator',
      rightDBName: 'actionCommunicator',
      rightSubtitle: 'In My Pass Life, I Was a Performance Artist',
      rightPic: 'CommunicationRight.png'
    };

    // var trait12 = {
    //   leftDisplayName: 'Critique-ability',
    // leftDBName: '',
    //   leftSubtitle: 'Give Me Your Worst Criticism, I Can Take It.',
    //   leftPic: 'CritiqueabilityLeft.png',
    //   rightDisplayName: '',
    // rightDBName: '',
    //   rightSubtitle: 'We Are Only Human, We Should Be Nice To Each Other.',
    //   rightPic: 'CritiqueabilityRight.svg'
    // };

    var allTraits = [
      trait1,
      trait2,
      trait3,
      trait5,
      trait10,
      trait11,
    ];

    return {
      allTraits: allTraits
    };

  });
})();


