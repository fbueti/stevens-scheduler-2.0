/**
 * Created by austin on 4/9/17.
 */
const passport = require('passport');
const GoogleStrategy = require('passport-google-oath20');
const User = require('./models/user');


// Serialize and deserialize by Google UUID
function serializeUser(user, cb) {
  cb(null, user.googleUuid);
}

function deserializeUser(googleUuid, cb) {
  User.findOne({googleUuid})
      .then((user) => {
        // Return the user with no error
        cb(null, user);
      })
      .catch((err) => {
        // Return the error
        cb(err);
      })
}


const strategy = new GoogleStrategy({
  clientId: '',
  clientSecret: '',
  callbackURL: ''
}, (accessToken, refreshToken, profile, cb) => {
  // Should always be a success
  // If we can't find a user in our database, they must be new
  // --> create a new use with the google information
  User.findOne({googleUuid: profile.id})
      .then((user) => {
        // Found
        cb(null, user);
      })
      .catch((err) => {
        // Couldn't find --> create new
        return User.create({ googleUuid: profile.id });
      })
      .then((user) => {
        cb(null, user);
      })
      .catch((err) => {
        // Some other error?
        throw err;
      })
});

module.exports = {
  strategy,
  deserializeUser,
  serializeUser
};