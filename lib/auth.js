/**
 * Created by austin on 4/9/17.
 */
const GoogleStrategy = require('passport-google-oauth20');
const config = require('./utils/config');
const User = require('./models/user');


// Serialize and deserialize by Google UUID
function serializeUser(user, cb) {
  cb(null, user.googleUuid);
}

/**
 *
 * @param googleUuid - The Unique id provided by google
 * @param cb - Callback function to either report error or return user
 */
function deserializeUser(googleUuid, cb) {
  User.findOne({ googleUuid })
      .then((user) => {
        // Return the user with no error
        cb(null, user);
      })
      .catch((err) => {
        // Return the error
        cb(err);
      });
}

const strategy = new GoogleStrategy({
  clientID: config.auth.google.clientID,
  clientSecret: config.auth.google.clientSecret,
  callbackURL: `${config.server}/login/google/callback`,
}, (accessToken, refreshToken, profile, cb) => {
  // Should always be a success
  // If we can't find a user in our database, they must be new
  // --> create a new user with the google information
  User.findOne({ googleUuid: profile.id })
      .then((user) => {
        // Found
        cb(null, user);
      })
      .catch((err) => {
        // Todo: Check if `err` is a Not Found or another problem
        // Couldn't find --> create new
        return User.create({ googleUuid: profile.id });
      })
      .then((user) => {
        cb(null, user);
      })
      .catch((err) => {
        // Some other error?
        throw err;
      });
});

module.exports = {
  strategy,
  deserializeUser,
  serializeUser,
};
