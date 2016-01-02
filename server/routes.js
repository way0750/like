module.exports = function (app, util, passport) {
  // sign in and sign out
  app.post('/api/signin', function(req, res, next) {
    util.authenticateUser(req, res, next, passport);
  });

  app.post('/api/signout', util.signUserOut);

  // user profile
  app.post('/api/profile/', util.checkUsername, util.createUser);
  app.put('/api/profile/', util.isAuthorized, util.updateUser);
  app.delete('/api/profile/', util.isAuthorized, util.deleteUser);
  
  // public profile
  app.post('/api/profile/:id', util.isAuthorized, util.isVoted, util.createOrUpdateVote);
  app.get('/api/profile/:id', util.isAuthorized, util.isVoted, function (req, res) {
    profileID = req.params.id;
    var profileData = {vote: {}};
    util.getProfile(null, profileID)
        .then(function(user){
          profileData.lastName = user.dataValues.lastName;
          profileData.firstName = user.dataValues.firstName;
          profileData.gender = user.dataValues.gender;
          return util.getVoteData(profileID);
        })
        .then(function (vote) {
          profileData.isVoted = res.isVoted;
          profileData.vote = vote;
          return res.status(200).send(profileData);
        })
        .catch(function(err){
          return res.status(404).send(profileData);
        });
  });

  // all users
  app.get('/api/users', util.isAuthorized, function(req, res) {
    util.getAllProfiles()
        .then(function(users){
          res.status(200).send(users);
        })
        .catch(function(err){
          console.log('Error in api/usersF', err);
          res.sendStatus(404);
        });
  });

  // set up previewID parameter for quick preview
  app.param('previewID', function (req, res, next, id) {
    var quickPreviewObj = {};
    quickPreviewObj.justQuicky = true;
    util.getProfile(null, id)
    .then( function (user) {
      quickPreviewObj.firstName = user.dataValues.firstName;
      quickPreviewObj.lastName = user.dataValues.lastName;
      quickPreviewObj.gender = user.dataValues.gender;
      res.quick = quickPreviewObj;
      util.getVoteData(id)
      .then(function (data) {
        quickPreviewObj.vote = data;
        next();
      })
      .catch( function (err) {
        next();
      });
    })
    .catch(function () {
      res.send(404);
    });
  });

  // quick preview links
  app.get('/api/quickPreview/:previewID', function (req, res, next) {
    res.send(res.quick);
  });

  app.use('/', function( req, res ){
    console.log('at root');
    res.sendStatus(200);
  });
};
